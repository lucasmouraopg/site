'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { GaleriaFoto } from '@/lib/supabase';

interface Props {
  fotos: GaleriaFoto[];
}

export default function FotosGrid({ fotos }: Props) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {fotos.map((foto) => (
          <button
            key={foto.id}
            onClick={() => setLightboxSrc(foto.url)}
            className="aspect-square rounded-xl overflow-hidden bg-gray-100 group"
          >
            <Image
              src={foto.url}
              alt={foto.legenda || ''}
              width={400}
              height={400}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </button>
        ))}
      </div>

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
