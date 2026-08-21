'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import type { GaleriaFoto, Video } from '@/lib/supabase';
import Modal from '@/components/ui/Modal';

interface Props {
  albumId: string;
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

export default function AlbumDetail({ albumId, fotos, videos }: Props) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [videoModal, setVideoModal] = useState<Video | null>(null);

  const [fotosRef, fotosApi] = useEmblaCarousel({ loop: false, align: 'start' });
  const [canFotosPrev, setCanFotosPrev] = useState(false);
  const [canFotosNext, setCanFotosNext] = useState(true);

  const [videosRef, videosApi] = useEmblaCarousel({ loop: false, align: 'start' });
  const [canVideosPrev, setCanVideosPrev] = useState(false);
  const [canVideosNext, setCanVideosNext] = useState(true);

  const scrollFotosPrev = useCallback(() => fotosApi?.scrollPrev(), [fotosApi]);
  const scrollFotosNext = useCallback(() => fotosApi?.scrollNext(), [fotosApi]);
  const scrollVideosPrev = useCallback(() => videosApi?.scrollPrev(), [videosApi]);
  const scrollVideosNext = useCallback(() => videosApi?.scrollNext(), [videosApi]);

  const onSelectFotos = useCallback(() => {
    if (!fotosApi) return;
    setCanFotosPrev(fotosApi.canScrollPrev());
    setCanFotosNext(fotosApi.canScrollNext());
  }, [fotosApi]);

  const onSelectVideos = useCallback(() => {
    if (!videosApi) return;
    setCanVideosPrev(videosApi.canScrollPrev());
    setCanVideosNext(videosApi.canScrollNext());
  }, [videosApi]);

  useEffect(() => {
    if (!fotosApi) return;
    fotosApi.on('select', onSelectFotos);
    fotosApi.on('reInit', onSelectFotos);
    onSelectFotos(); // eslint-disable-line react-hooks/set-state-in-effect
  }, [fotosApi, onSelectFotos]);

  useEffect(() => {
    if (!videosApi) return;
    videosApi.on('select', onSelectVideos);
    videosApi.on('reInit', onSelectVideos);
    onSelectVideos(); // eslint-disable-line react-hooks/set-state-in-effect
  }, [videosApi, onSelectVideos]);

  if (fotos.length === 0 && videos.length === 0) {
    return <p className="text-gray-400 text-sm py-8">Nenhum conteúdo neste álbum ainda.</p>;
  }

  return (
    <>
      {/* ===== FOTOS CAROUSEL ===== */}
      {fotos.length > 0 && (
        <div className="mb-14">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Fotos</h2>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl" ref={fotosRef}>
              <div className="flex gap-4">
                {fotos.map((foto) => (
                  <button
                    key={foto.id}
                    onClick={() => setLightboxSrc(foto.url)}
                    className="flex-none w-64 h-48 rounded-xl overflow-hidden bg-gray-100 group cursor-pointer"
                  >
                    <Image
                      src={foto.url}
                      alt={foto.legenda || ''}
                      width={256}
                      height={192}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </button>
                ))}
              </div>
            </div>

            {fotos.length > 1 && (
              <>
                <button
                  onClick={scrollFotosPrev}
                  disabled={!canFotosPrev}
                  className={`absolute -left-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-lg border border-gray-200 transition-all duration-200 hover:scale-110 ${
                    !canFotosPrev ? 'opacity-30 cursor-default hover:scale-100' : 'cursor-pointer'
                  }`}
                >
                  <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={scrollFotosNext}
                  disabled={!canFotosNext}
                  className={`absolute -right-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-lg border border-gray-200 transition-all duration-200 hover:scale-110 ${
                    !canFotosNext ? 'opacity-30 cursor-default hover:scale-100' : 'cursor-pointer'
                  }`}
                >
                  <svg className="w-4 h-4 text-gray-700 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          <div className="mt-6">
            <Link
              href={`/galeria/${albumId}/fotos`}
              className="inline-block px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              TODAS AS FOTOS
            </Link>
          </div>
        </div>
      )}

      {/* ===== VIDEOS CAROUSEL ===== */}
      {videos.length > 0 && (
        <div className="mb-14">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Vídeos</h2>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl" ref={videosRef}>
              <div className="flex gap-4">
                {videos.map((video) => {
                  const ytId = extractYouTubeId(video.youtube_url);
                  return (
                    <button
                      key={video.id}
                      onClick={() => setVideoModal(video)}
                      className="flex-none w-80 text-left group cursor-pointer"
                    >
                      <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 relative">
                        {ytId ? (
                          <Image
                            src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
                            alt={video.titulo}
                            width={320}
                            height={180}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-gray-400 text-sm">Vídeo indisponível</span>
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center group-hover:bg-black/80 transition-colors">
                            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm mt-2 group-hover:text-blue-600 transition-colors">
                        {video.titulo}
                      </h3>
                    </button>
                  );
                })}
              </div>
            </div>

            {videos.length > 1 && (
              <>
                <button
                  onClick={scrollVideosPrev}
                  disabled={!canVideosPrev}
                  className={`absolute -left-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-lg border border-gray-200 transition-all duration-200 hover:scale-110 ${
                    !canVideosPrev ? 'opacity-30 cursor-default hover:scale-100' : 'cursor-pointer'
                  }`}
                >
                  <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={scrollVideosNext}
                  disabled={!canVideosNext}
                  className={`absolute -right-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-lg border border-gray-200 transition-all duration-200 hover:scale-110 ${
                    !canVideosNext ? 'opacity-30 cursor-default hover:scale-100' : 'cursor-pointer'
                  }`}
                >
                  <svg className="w-4 h-4 text-gray-700 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          <div className="mt-6">
            <Link
              href={`/galeria/${albumId}/videos`}
              className="inline-block px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              TODOS OS VÍDEOS
            </Link>
          </div>
        </div>
      )}

      {/* ===== LIGHTBOX (FOTOS) ===== */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white z-10"
            onClick={() => setLightboxSrc(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={lightboxSrc}
            alt="Foto ampliada"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      )}

      {/* ===== VIDEO MODAL ===== */}
      <Modal isOpen={!!videoModal} onClose={() => setVideoModal(null)}>
        {videoModal && (
          <div className="p-1">
            {(() => {
              const ytId = extractYouTubeId(videoModal.youtube_url);
              return ytId ? (
                <div className="aspect-video rounded-xl overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
                    title={videoModal.titulo}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="aspect-video rounded-xl bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Vídeo indisponível</span>
                </div>
              );
            })()}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">{videoModal.titulo}</h3>
              {videoModal.descricao && (
                <p className="text-sm text-gray-500 mt-1">{videoModal.descricao}</p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
