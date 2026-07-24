import Link from 'next/link';
import { getGaleriaAlbuns, type GaleriaAlbum } from '@/lib/supabase';

export default async function GaleriaPage() {
  let albuns: GaleriaAlbum[] = [];
  try {
    albuns = await getGaleriaAlbuns();
  } catch {
    albuns = [];
  }

  return (
    <section className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-8"
        >
          ← Voltar
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Galeria</h1>
        <p className="text-gray-500 mb-10">Acompanhe os eventos e ações da nossa campanha.</p>

        {albuns.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p>Nenhum álbum publicado ainda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {albuns.map((album) => (
              <Link
                key={album.id}
                href={`/galeria/${album.id}`}
                className="group"
              >
                <div className="relative h-56 rounded-2xl overflow-hidden bg-gray-100 mb-4">
                  {album.cover_url ? (
                    <img
                      src={album.cover_url}
                      alt={album.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
                      <svg className="w-16 h-16 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="bg-black/60 text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full">
                      {album.categoria}
                    </span>
                  </div>
                </div>
                <h2 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {album.titulo}
                </h2>
                {album.descricao && (
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{album.descricao}</p>
                )}
                <p className="text-xs text-gray-400 mt-2">
                  {album.fotos_count} {album.fotos_count === 1 ? 'foto' : 'fotos'}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
