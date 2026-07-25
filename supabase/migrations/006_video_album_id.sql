-- Adiciona coluna album_id na tabela videos para vincular video a um album da galeria
ALTER TABLE videos ADD COLUMN album_id UUID REFERENCES galeria_albuns(id) ON DELETE SET NULL;
CREATE INDEX idx_videos_album_id ON videos(album_id);
