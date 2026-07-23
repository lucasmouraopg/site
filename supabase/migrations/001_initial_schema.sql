-- ============================================
-- Lucas Mourão - Supabase Schema
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Table: galeria_albuns
-- ============================================
CREATE TABLE galeria_albuns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo TEXT NOT NULL,
  descricao TEXT,
  categoria TEXT NOT NULL,
  cover_url TEXT,
  fotos_count INTEGER DEFAULT 0,
  status TEXT CHECK (status IN ('publicado', 'rascunho')) DEFAULT 'rascunho',
  criado_em TIMESTAMPTZ DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Table: galeria_fotos
-- ============================================
CREATE TABLE galeria_fotos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  album_id UUID NOT NULL REFERENCES galeria_albuns(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  legenda TEXT,
  ordem INTEGER DEFAULT 0,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Table: videos
-- ============================================
CREATE TABLE videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo TEXT NOT NULL,
  descricao TEXT,
  youtube_url TEXT NOT NULL,
  thumbnail_url TEXT,
  categoria TEXT NOT NULL,
  ordem INTEGER DEFAULT 0,
  status TEXT CHECK (status IN ('publicado', 'rascunho')) DEFAULT 'rascunho',
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Table: redes_sociais
-- ============================================
CREATE TABLE redes_sociais (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  plataforma TEXT NOT NULL,
  url TEXT NOT NULL,
  icone TEXT,
  ordem INTEGER DEFAULT 0,
  ativo BOOLEAN DEFAULT true,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Table: configuracoes
-- ============================================
CREATE TABLE configuracoes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chave TEXT UNIQUE NOT NULL,
  valor TEXT,
  atualizado_em TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Table: projetos
-- ============================================
CREATE TABLE projetos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  titulo TEXT NOT NULL,
  resumo TEXT,
  descricao TEXT,
  categoria TEXT NOT NULL,
  fotos TEXT[] DEFAULT '{}',
  share_text TEXT,
  ordem INTEGER DEFAULT 0,
  status TEXT CHECK (status IN ('publicado', 'rascunho')) DEFAULT 'rascunho',
  criado_em TIMESTAMPTZ DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Indexes
-- ============================================
CREATE INDEX idx_galeria_fotos_album_id ON galeria_fotos(album_id);
CREATE INDEX idx_galeria_fotos_ordem ON galeria_fotos(ordem);
CREATE INDEX idx_videos_status ON videos(status);
CREATE INDEX idx_redes_sociais_ativo ON redes_sociais(ativo);
CREATE INDEX idx_configuracoes_chave ON configuracoes(chave);

-- ============================================
-- Row Level Security (RLS)
-- ============================================
ALTER TABLE galeria_albuns ENABLE ROW LEVEL SECURITY;
ALTER TABLE galeria_fotos ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE redes_sociais ENABLE ROW LEVEL SECURITY;
ALTER TABLE configuracoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE projetos ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public can read published albums" ON galeria_albuns
  FOR SELECT USING (status = 'publicado');

CREATE POLICY "Public can read album photos" ON galeria_fotos
  FOR SELECT USING (true);

CREATE POLICY "Public can read published videos" ON videos
  FOR SELECT USING (status = 'publicado');

CREATE POLICY "Public can read active social links" ON redes_sociais
  FOR SELECT USING (ativo = true);

CREATE POLICY "Public can read settings" ON configuracoes
  FOR SELECT USING (true);

-- Authenticated users can manage all content (for admin panel)
CREATE POLICY "Authenticated users can manage albums" ON galeria_albuns
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage photos" ON galeria_fotos
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage videos" ON videos
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage social links" ON redes_sociais
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage settings" ON configuracoes
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public can read published projects" ON projetos
  FOR SELECT USING (status = 'publicado');

CREATE POLICY "Authenticated users can manage projects" ON projetos
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- Function: update_fotos_count
-- ============================================
CREATE OR REPLACE FUNCTION update_fotos_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE galeria_albuns
  SET fotos_count = (
    SELECT COUNT(*) FROM galeria_fotos WHERE album_id = NEW.album_id
  )
  WHERE id = NEW.album_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_fotos_count
  AFTER INSERT OR DELETE ON galeria_fotos
  FOR EACH ROW
  EXECUTE FUNCTION update_fotos_count();

-- ============================================
-- Function: update_timestamp
-- ============================================
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.atualizado_em = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_galeria_albuns_timestamp
  BEFORE UPDATE ON galeria_albuns
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trigger_configuracoes_timestamp
  BEFORE UPDATE ON configuracoes
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trigger_projetos_timestamp
  BEFORE UPDATE ON projetos
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();
