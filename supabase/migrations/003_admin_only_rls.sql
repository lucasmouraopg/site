-- ============================================
-- Security Fix 3: Restrict RLS to specific admin user
-- ============================================

-- Drop permissive policies
DROP POLICY IF EXISTS "Authenticated users can manage albums" ON galeria_albuns;
DROP POLICY IF EXISTS "Authenticated users can manage photos" ON galeria_fotos;
DROP POLICY IF EXISTS "Authenticated users can manage videos" ON videos;
DROP POLICY IF EXISTS "Authenticated users can manage social links" ON redes_sociais;
DROP POLICY IF EXISTS "Authenticated users can manage settings" ON configuracoes;
DROP POLICY IF EXISTS "Authenticated users can manage projects" ON projetos;
DROP POLICY IF EXISTS "Authenticated users can read settings" ON configuracoes;

-- Recreate with admin-only access (specific UUID)
CREATE POLICY "Admin can manage albums" ON galeria_albuns
  FOR ALL USING (auth.uid() = '7855f56b-16dc-474d-8fb8-44ef9e1072d8');

CREATE POLICY "Admin can manage photos" ON galeria_fotos
  FOR ALL USING (auth.uid() = '7855f56b-16dc-474d-8fb8-44ef9e1072d8');

CREATE POLICY "Admin can manage videos" ON videos
  FOR ALL USING (auth.uid() = '7855f56b-16dc-474d-8fb8-44ef9e1072d8');

CREATE POLICY "Admin can manage social links" ON redes_sociais
  FOR ALL USING (auth.uid() = '7855f56b-16dc-474d-8fb8-44ef9e1072d8');

CREATE POLICY "Admin can manage settings" ON configuracoes
  FOR ALL USING (auth.uid() = '7855f56b-16dc-474d-8fb8-44ef9e1072d8');

CREATE POLICY "Admin can manage projects" ON projetos
  FOR ALL USING (auth.uid() = '7855f56b-16dc-474d-8fb8-44ef9e1072d8');

-- Admin can read settings (for admin panel)
CREATE POLICY "Admin can read settings" ON configuracoes
  FOR SELECT USING (auth.uid() = '7855f56b-16dc-474d-8fb8-44ef9e1072d8');

-- Public can read published projects (unchanged)
-- Public can read published albums (unchanged)
-- Public can read album photos (unchanged)
-- Public can read published videos (unchanged)
-- Public can read active social links (unchanged)
