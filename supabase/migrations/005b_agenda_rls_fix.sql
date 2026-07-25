-- ============================================
-- Fix: Admin full access to agenda (SELECT all statuses)
-- ============================================

CREATE POLICY "Admin All Access" ON agenda
  FOR ALL USING (auth.uid() = '7855f56b-16dc-474d-8fb8-44ef9e1072d8');
