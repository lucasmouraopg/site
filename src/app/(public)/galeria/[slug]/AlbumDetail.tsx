'use client';

import { useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { GaleriaFoto, Video } from '@/lib/supabase';

interface Props {
  fotos: GaleriaFoto[];
  videos: Video[];
}

function extractYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === 'youtu.be') return parsed.pathname.slice(1);
    return parsed.searchParams.get('v');
  } catch {
    return null;
  }
}

export default function AlbumDetail({ fotos, videos }: Props) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [fotosRef, fotosApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [videosRef, videosApi] = useEmblaCarousel({ loop: true, align: 'start' });

  return (
    <>
      {/* Fotos Section */}
      {fotos.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Fotos</h2>
          <div className="overflow-hidden rounded-2xl" ref={fotosRef}>
            <div className="flex gap-4">
              {fotos.map((foto) => (
                <button
                  key={foto.id}
                  onClick={() => setLightboxSrc(foto.url)}
                  className="flex-shrink-0 w-64 h-48 rounded-xl overflow-hidden bg-gray-100 group"
                >
                  <img
                    src={foto.url}
                    alt={foto.legenda || ''}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => fotosApi?.scrollPrev()}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => fotosApi?.scrollNext()}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <a
            href="/galeria/fotos"
            className="inline-block mt-4 px-6 py-2 border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            VEJA TODAS AS FOTOS
          </a>
        </div>
      )}

      {/* Videos Section */}
      {videos.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Videos</h2>
          <div className="overflow-hidden rounded-2xl" ref={videosRef}>
            <div className="flex gap-4">
              {videos.map((video) => {
                const ytId = extractYouTubeId(video.youtube_url);
                return (
                  <div key={video.id} className="flex-shrink-0 w-80">
                    {ytId ? (
                      <div className="aspect-video rounded-xl overflow-hidden bg-gray-100">
                        <iframe
                          src={`https://www.youtube.com/embed/${ytId}`}
                          title={video.titulo}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <div className="aspect-video rounded-xl bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">Video indisponivel</span>
                      </div>
                    )}
                    <h3 className="font-semibold text-gray-900 text-sm mt-2">{video.titulo}</h3>
                    {video.descricao && (
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{video.descricao}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => videosApi?.scrollPrev()}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => videosApi?.scrollNext()}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <a
            href="/galeria/videos"
            className="inline-block mt-4 px-6 py-2 border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            VEJA TODOS OS VIDEOS
          </a>
        </div>
      )}

      {fotos.length === 0 && videos.length === 0 && (
        <p className="text-gray-400 text-sm py-8">Nenhum conteudo neste album ainda.</p>
      )}

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightboxSrc(null)}
        >
          <img
            src={lightboxSrc}
            alt="Foto ampliada"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white"
            onClick={() => setLightboxSrc(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
