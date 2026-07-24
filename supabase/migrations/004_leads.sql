-- ============================================
-- Tabela de Leads (Captação de Contatos)
-- ============================================

CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  email TEXT,
  bairro TEXT,
  cidade TEXT,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- RLS Policies
-- ============================================

-- Public can INSERT (formulário na landing page)
CREATE POLICY leads_insert_public
  ON leads FOR INSERT
  WITH CHECK (true);

-- Only admin can SELECT
CREATE POLICY leads_select_admin
  ON leads FOR SELECT
  USING (auth.uid() = '7855f56b-16dc-474d-8fb8-44ef9e1072d8');

-- Only admin can DELETE
CREATE POLICY leads_delete_admin
  ON leads FOR DELETE
  USING (auth.uid() = '7855f56b-16dc-474d-8fb8-44ef9e1072d8');

-- ============================================
-- Enable RLS
-- ============================================

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- ============================================
-- Indexes
-- ============================================

CREATE INDEX idx_leads_criado_em ON leads(criado_em DESC);
