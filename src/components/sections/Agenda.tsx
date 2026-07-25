'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import Modal from '@/components/ui/Modal';

interface Compromisso {
  id: string;
  titulo: string;
  descricao: string | null;
  data_hora: string;
  local: string | null;
}

function formatDateTime(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDateShort(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function CardContent({ item }: { item: Compromisso }) {
  return (
    <>
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <p className="text-xs text-blue-600 font-semibold capitalize">{formatDateShort(item.data_hora)}</p>
          <p className="text-xs text-gray-400">{formatTime(item.data_hora)}</p>
        </div>
      </div>
      <h3 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors line-clamp-2">
        {item.titulo}
      </h3>
      {item.local && (
        <p className="text-xs text-gray-400 mt-1.5 line-clamp-1">{item.local}</p>
      )}
    </>
  );
}

export default function Agenda() {
  const [compromissos, setCompromissos] = useState<Compromisso[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Compromisso | null>(null);

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
    const fetchEventos = async () => {
      const { data } = await supabase
        .from('agenda')
        .select('id, titulo, descricao, data_hora, local')
        .eq('status', 'publicado')
        .gte('data_hora', new Date().toISOString())
        .order('data_hora', { ascending: true })
        .limit(5);

      if (data) setCompromissos(data);
      setLoading(false);
    };

    fetchEventos();
  }, []);

  if (loading) {
    return (
      <section id="agenda" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 bg-gray-200 rounded w-48 mb-8 animate-pulse" />
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-shrink-0 w-72 h-40 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="agenda" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 uppercase text-center">
            Agenda
          </h2>
        </motion.div>

        {compromissos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-400 text-sm">Nenhum compromisso agendado no momento.</p>
          </div>
        ) : (
          <>
            {/* Desktop: horizontal grid */}
            <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {compromissos.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className="text-left bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                  <CardContent item={item} />
                </button>
              ))}
            </div>

            {/* Mobile: Embla carousel */}
            <div className="lg:hidden relative">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-4">
                  {compromissos.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelected(item)}
                      className="flex-none w-[calc(100%-16px)] text-left bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                    >
                      <CardContent item={item} />
                    </button>
                  ))}
                </div>
              </div>

              {compromissos.length > 1 && (
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
      </div>

      {/* Modal de detalhes */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selected.titulo}</h3>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-gray-700 capitalize">{formatDateTime(selected.data_hora)}</p>
              </div>

              {selected.local && (
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-sm text-gray-700">{selected.local}</p>
                </div>
              )}

              {selected.descricao && (
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                    {selected.descricao}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
