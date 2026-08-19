import Link from 'next/link';
import { getAlbumById, getFotosByAlbum, getVideosByAlbum } from '@/lib/supabase-server';
import type { GaleriaAlbum, GaleriaFoto, Video } from '@/lib/supabase-server';
import AlbumDetail from './AlbumDetail';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AlbumPage({ params }: PageProps) {
  const { slug } = await params;

  let album: GaleriaAlbum | null = null;
  let fotos: GaleriaFoto[] = [];
  let videos: Video[] = [];

  try {
    album = await getAlbumById(slug);

    if (album) {
      fotos = await getFotosByAlbum(album.id);
      videos = await getVideosByAlbum(album.id);
    }
  } catch {
    // album not found
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
        <Link href="/galeria" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-8">
          ← Voltar à Galeria
        </Link>

        <div className="mb-8">
          <span className="bg-blue-50 text-blue-700 text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
            {album.categoria}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">{album.titulo}</h1>
          {album.descricao && (
            <p className="text-gray-500 mt-2 max-w-2xl">{album.descricao}</p>
          )}
        </div>

        <AlbumDetail albumId={album.id} fotos={fotos} videos={videos} />
      </div>
    </section>
  );
}
