'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Projeto } from '@/lib/supabase';

interface PraiaGrandeProps {
  projetos: Projeto[];
}

export default function PraiaGrande({ projetos }: PraiaGrandeProps) {
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

        {/* Projects Grid */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden shrink-0">
                    <div
                      className="w-full h-full bg-cover bg-center bg-no-repeat transform group-hover:scale-105 transition-transform duration-500"
                      style={{
                        backgroundImage: `url(${projeto.fotos[0]})`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                        {projeto.categoria}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {projeto.titulo}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {projeto.resumo}
                    </p>

                    {/* CTA - Agora com mt-auto para empurrar pro final */}
                    <div className="mt-auto flex items-center text-blue-600 font-semibold text-sm">
                      <span>Saiba mais</span>
                      <svg
                        className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}