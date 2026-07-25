'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { supabase, GaleriaAlbum } from '@/lib/supabase';

export default function GaleriaEventos() {
  const [albuns, setAlbuns] = useState<GaleriaAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const fetchAlbuns = async () => {
      const { data } = await supabase
        .from('galeria_albuns')
        .select('*')
        .eq('status', 'publicado')
        .order('criado_em', { ascending: false })
        .limit(10);

      if (data) setAlbuns(data);
      setLoading(false);
    };

    fetchAlbuns();
  }, []);

  if (loading) {
    return (
      <section id="galeria" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 bg-gray-200 rounded w-64 mb-8 animate-pulse" />
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-shrink-0 w-72 h-48 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="galeria" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          GALERIA
        </h2>

        {albuns.length === 0 ? (
          <p className="text-gray-400 text-sm">Nenhum álbum publicado no momento.</p>
        ) : (
          <>
            {/* Desktop: grid */}
            <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {albuns.map((album) => (
                <Link
                  key={album.id}
                  href={`/galeria/${album.id}`}
                  className="group"
                >
                  <div className="relative h-48 rounded-2xl overflow-hidden bg-gray-100 mb-3">
                    {album.cover_url ? (
                      <img
                        src={album.cover_url}
                        alt={album.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
                        <svg className="w-12 h-12 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-black/60 text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full">
                        {album.categoria}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                    {album.titulo}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {album.fotos_count} {album.fotos_count === 1 ? 'foto' : 'fotos'}
                  </p>
                </Link>
              ))}
            </div>

            {/* Mobile: Embla carousel */}
            <div className="lg:hidden relative">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-4">
                  {albuns.map((album) => (
                    <Link
                      key={album.id}
                      href={`/galeria/${album.id}`}
                      className="flex-none w-[calc(100%-16px)] group"
                    >
                      <div className="relative h-56 rounded-2xl overflow-hidden bg-gray-100 mb-3">
                        {album.cover_url ? (
                          <img
                            src={album.cover_url}
                            alt={album.titulo}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
                            <svg className="w-12 h-12 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        <div className="absolute bottom-3 left-3">
                          <span className="bg-black/60 text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full">
                            {album.categoria}
                          </span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                        {album.titulo}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {album.fotos_count} {album.fotos_count === 1 ? 'foto' : 'fotos'}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {albuns.length > 1 && (
                <>
                  <button
                    onClick={scrollPrev}
                    disabled={!canScrollPrev}
                    className={`absolute -left-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-lg border border-gray-200 transition-all duration-200 hover:bg-white hover:scale-110 ${
                      !canScrollPrev ? 'opacity-30 cursor-default hover:scale-100' : 'cursor-pointer'
                    }`}
                  >
                    <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={scrollNext}
                    disabled={!canScrollNext}
                    className={`absolute -right-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-lg border border-gray-200 transition-all duration-200 hover:bg-white hover:scale-110 ${
                      !canScrollNext ? 'opacity-30 cursor-default hover:scale-100' : 'cursor-pointer'
                    }`}
                  >
                    <svg className="w-4 h-4 text-gray-700 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </>
        )}

        {/* CTA Button */}
        <div className="text-center mt-10">
          <Link
            href="/galeria"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Veja todos os álbuns
          </Link>
        </div>
      </div>
    </section>
  );
}
