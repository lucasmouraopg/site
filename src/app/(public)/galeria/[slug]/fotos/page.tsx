import Link from 'next/link';
import { getAlbumById, getFotosByAlbum } from '@/lib/supabase-public';
import type { GaleriaAlbum, GaleriaFoto } from '@/lib/supabase-public';
import FotosGrid from '@/app/(public)/galeria/fotos/FotosGrid';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AlbumFotosPage({ params }: PageProps) {
  const { slug } = await params;

  let album: GaleriaAlbum | null = null;
  let fotos: GaleriaFoto[] = [];

  try {
    album = await getAlbumById(slug);

    if (album) {
      fotos = await getFotosByAlbum(album.id);
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
        <p className="text-gray-500 mb-10">{fotos.length} {fotos.length === 1 ? 'foto' : 'fotos'}</p>

        {fotos.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p>Nenhuma foto publicada neste álbum.</p>
          </div>
        ) : (
          <FotosGrid fotos={fotos} />
        )}
      </div>
    </section>
  );
}
