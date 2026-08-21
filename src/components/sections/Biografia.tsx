'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, AnimatePresence } from 'motion/react';

const bioPhotos = [
  '/assets/images/bio/LUCAS1.PNG',
  '/assets/images/bio/LUCASCRIANCA.PNG',
  '/assets/images/bio/LUCASCOMAVO.PNG',
];

const allPhotos = [...bioPhotos, ...bioPhotos];

function ArrowButton({
  direction,
  onClick,
  disabled,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 shadow-lg border border-gray-200 transition-all duration-200 hover:bg-white hover:scale-110 ${
        direction === 'left' ? '-left-5' : '-right-5'
      } ${disabled ? 'opacity-30 cursor-default hover:scale-100' : 'cursor-pointer'}`}
    >
      <svg
        className={`w-4 h-4 text-gray-700 ${direction === 'right' ? 'rotate-180' : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
}

function Lightbox({
  src,
  onClose,
}: {
  src: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <motion.img
        src={src}
        alt="Foto ampliada"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>
  );
}

export default function Biografia() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

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
    <section id="biografia" className="py-20 bg-white">
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
            Raízes que moldam um novo tempo
          </h2>
        </motion.div>

        {/* Top row: Photo left + Text right — equal height */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch mb-12">
          {/* Photo - Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex"
          >
            <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/images/bio/LUCAS1.PNG"
                alt="Lucas Mourão"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Text - Right */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex"
          >
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed self-center">
              <p>
                <strong className="text-gray-900">Formação Acadêmica:</strong>{' '}
                Lucas cresceu e estudou em Praia Grande no Colégio Universo na
                Ocian. Além disso, possui formação em Administração de Empresas
                pela Universidade Mackenzie, onde desenvolveu uma base sólida em
                gestão e estratégica. Essa experiência enriqueceu sua visão e
                contribuíram para sua atuação em transformações urbanas em Praia
                Grande.
              </p>

              <p>
                Alberto Mourão construiu uma trajetória de liderança consolidada,
                sendo prefeito por seis mandatos e eleito deputado federal em
                três ocasiões, sempre com números expressivos e grande apoio
                popular. O prefeito ao lado de sua esposa Maruca, que faz um
                trabalho social marcado pelo acolhimento, pela sensibilidade e
                pelo compromisso com a população de Praia Grande.
              </p>

              <p>
                Lucas Mourão segue esse legado tendo seus avós como seu maior
                exemplo, de que servir ao próximo é um compromisso diário,
                construído com respeito, empatia e dedicação ao desenvolvimento
                de Praia Grande. Com olhar estratégico e compromisso público, ele
                busca ampliar essa atuação para todo o estado, levando a
                experiência e o compromisso familiar para um impacto ainda maior.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom row: Photo carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative px-6"
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {allPhotos.map((src, i) => (
                <div
                  key={i}
                  className="flex-none w-[calc(50%-12px)] sm:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] cursor-pointer"
                  onClick={() => setLightboxSrc(src)}
                >
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <Image
                      src={src}
                      alt="Galeria Biografia"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ArrowButton direction="left" onClick={scrollPrev} disabled={!canScrollPrev} />
          <ArrowButton direction="right" onClick={scrollNext} disabled={!canScrollNext} />
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxSrc && (
          <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
