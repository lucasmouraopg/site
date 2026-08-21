'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'motion/react';
import type { Projeto } from '@/lib/supabase';

interface PraiaGrandeProps {
  projetos: Projeto[];
}

export default function PraiaGrande({ projetos }: PraiaGrandeProps) {
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
    onSelect(); // eslint-disable-line react-hooks/set-state-in-effect
  }, [emblaApi, onSelect]);

  return (
    <section id="praia-grande" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 uppercase text-center">
            Praia Grande
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Conheça os projetos que transformaram nossa cidade
          </p>
        </motion.div>

        {/* Projects */}
        {projetos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="text-gray-500 text-lg">Nenhum projeto publicado no momento.</p>
          </motion.div>
        ) : (
          <>
            {/* Desktop: grid */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-8">
              {projetos.map((projeto, index) => (
                <motion.div
                  key={projeto.slug}
                  className="h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/projetos/${projeto.slug}`} className="block h-full">
                    <div className="h-full flex flex-col group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                      <div className="relative aspect-[4/3] overflow-hidden shrink-0">
                        <Image
                          src={projeto.fotos[0]}
                          alt={projeto.titulo}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                            {projeto.categoria}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {projeto.titulo}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">{projeto.resumo}</p>
                        <div className="mt-auto flex items-center text-blue-600 font-semibold text-sm">
                          <span>Saiba mais</span>
                          <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile: Embla carousel */}
            <div className="lg:hidden relative">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-4">
                  {projetos.map((projeto) => (
                    <Link
                      key={projeto.slug}
                      href={`/projetos/${projeto.slug}`}
                      className="flex-none w-[calc(100%-16px)] group"
                    >
                      <div className="h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg">
                        <div className="relative aspect-[4/3] overflow-hidden shrink-0">
                          <Image
                            src={projeto.fotos[0]}
                            alt={projeto.titulo}
                            fill
                            sizes="100vw"
                            className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                              {projeto.categoria}
                            </span>
                          </div>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {projeto.titulo}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4">{projeto.resumo}</p>
                          <div className="mt-auto flex items-center text-blue-600 font-semibold text-sm">
                            <span>Saiba mais</span>
                            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {projetos.length > 1 && (
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
            href="/projetos"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Veja todos os projetos
          </Link>
        </div>
      </div>
    </section>
  );
}
