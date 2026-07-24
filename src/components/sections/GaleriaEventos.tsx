'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { supabase, GaleriaAlbum } from '@/lib/supabase';

export default function GaleriaEventos() {
  const [albuns, setAlbuns] = useState<GaleriaAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' });

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
      <section className="py-16 bg-white">
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

  if (albuns.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Galeria de Eventos
          </h2>
          <Link
            href="/galeria"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Ver todas →
          </Link>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {albuns.map((album) => (
              <Link
                key={album.id}
                href={`/galeria#${album.id}`}
                className="flex-shrink-0 w-72 group"
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
        </div>
      </div>
    </section>
  );
}
