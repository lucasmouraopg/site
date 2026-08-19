import Link from 'next/link';
import { getAlbumById, getVideosByAlbum } from '@/lib/supabase-server';
import type { GaleriaAlbum, Video } from '@/lib/supabase-server';
import VideosGrid from '@/app/(public)/galeria/videos/VideosGrid';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AlbumVideosPage({ params }: PageProps) {
  const { slug } = await params;

  let album: GaleriaAlbum | null = null;
  let videos: Video[] = [];

  try {
    album = await getAlbumById(slug);

    if (album) {
      videos = await getVideosByAlbum(album.id);
    }
  } catch {
    // not found
  }

  if (!album) {
    return (
      <section className="py-16 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/galeria" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-8">
            ← Voltar à Galeria
          </Link>
          <div className="text-center py-20 text-gray-400">
            <p>Álbum não encontrado.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href={`/galeria/${album.id}`} className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-8">
          ← Voltar ao álbum
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{album.titulo}</h1>
        <p className="text-gray-500 mb-10">{videos.length} {videos.length === 1 ? 'vídeo' : 'vídeos'}</p>

        {videos.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p>Nenhum vídeo publicado ainda.</p>
          </div>
        ) : (
          <VideosGrid videos={videos} />
        )}
      </div>
    </section>
  );
}
