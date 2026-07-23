-- ============================================
-- Security Fix: Replace deprecated auth.role() with auth.uid()
-- ============================================

-- Drop old policies
DROP POLICY IF EXISTS "Authenticated users can manage albums" ON galeria_albuns;
DROP POLICY IF EXISTS "Authenticated users can manage photos" ON galeria_fotos;
DROP POLICY IF EXISTS "Authenticated users can manage videos" ON videos;
DROP POLICY IF EXISTS "Authenticated users can manage social links" ON redes_sociais;
DROP POLICY IF EXISTS "Authenticated users can manage settings" ON configuracoes;
DROP POLICY IF EXISTS "Authenticated users can manage projects" ON projetos;

-- Recreate with auth.uid() IS NOT NULL (correct Supabase pattern)
CREATE POLICY "Authenticated users can manage albums" ON galeria_albuns
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can manage photos" ON galeria_fotos
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can manage videos" ON videos
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can manage social links" ON redes_sociais
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can manage settings" ON configuracoes
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can manage projects" ON projetos
  FOR ALL USING (auth.uid() IS NOT NULL);

-- ============================================
-- Security Fix: Restrict configuracoes write access
-- ============================================
-- Drop the public read policy for configuracoes
DROP POLICY IF EXISTS "Public can read settings" ON configuracoes;

-- Only allow authenticated users to read settings (admin-only)
CREATE POLICY "Authenticated users can read settings" ON configuracoes
  FOR SELECT USING (auth.uid() IS NOT NULL);
