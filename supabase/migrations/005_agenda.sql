-- ============================================
-- Tabela de Agenda (Eventos e Compromissos)
-- ============================================

CREATE TABLE agenda (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo TEXT NOT NULL,
  descricao TEXT,
  data_hora TIMESTAMPTZ NOT NULL,
  local TEXT,
  status TEXT CHECK (status IN ('publicado', 'rascunho')) DEFAULT 'rascunho',
  criado_em TIMESTAMPTZ DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- RLS Policies
-- ============================================

-- Public can SELECT only published events
CREATE POLICY agenda_select_public
  ON agenda FOR SELECT
  USING (status = 'publicado');

-- Only admin can INSERT/UPDATE/DELETE
CREATE POLICY agenda_insert_admin
  ON agenda FOR INSERT
  WITH CHECK (auth.uid() = '7855f56b-16dc-474d-8fb8-44ef9e1072d8');

CREATE POLICY agenda_update_admin
  ON agenda FOR UPDATE
  USING (auth.uid() = '7855f56b-16dc-474d-8fb8-44ef9e1072d8');

CREATE POLICY agenda_delete_admin
  ON agenda FOR DELETE
  USING (auth.uid() = '7855f56b-16dc-474d-8fb8-44ef9e1072d8');

-- ============================================
-- Enable RLS
-- ============================================

ALTER TABLE agenda ENABLE ROW LEVEL SECURITY;

-- ============================================
-- Indexes
-- ============================================

CREATE INDEX idx_agenda_data_hora ON agenda(data_hora DESC);
CREATE INDEX idx_agenda_status ON agenda(status);

-- ============================================
-- Trigger: auto-update atualizado_em
-- ============================================

CREATE TRIGGER update_agenda_timestamp
  BEFORE UPDATE ON agenda
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();
