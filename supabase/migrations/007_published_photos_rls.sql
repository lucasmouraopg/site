-- ============================================
-- Security Fix 7: Public SELECT for published album photos
-- ============================================
-- The existing "Admin can manage photos" policy (003) uses FOR ALL,
-- which blocks public reads. We need a separate public SELECT policy
-- that only allows reading photos belonging to published albums.

-- Drop existing SELECT coverage from FOR ALL if needed, then add public SELECT
CREATE POLICY "Public can view published album photos"
  ON galeria_fotos FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM galeria_albuns
      WHERE galeria_albuns.id = galeria_fotos.album_id
        AND galeria_albuns.status = 'publicado'
    )
  );

-- ============================================
-- Security Fix 7b: Leads INSERT rate-limit defense
-- ============================================
-- The leads_insert_public policy already exists (004).
-- Upstash rate limiting in /api/leads provides server-side protection.
-- No schema change needed — just documenting the defense-in-depth layers:
--   Layer 1: Upstash rate limit in /api/leads (1 req/30s per IP)
--   Layer 2: RLS INSERT policy (allows any authenticated or anonymous INSERT)
--   Layer 3: NOT NULL constraints prevent empty spam rows
