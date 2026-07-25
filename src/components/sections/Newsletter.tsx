'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from '@/components/ui/Modal';
import FormularioLeads from './FormularioLeads';

export default function Newsletter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="py-12 bg-gradient-to-r from-blue-50 to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center text-center gap-4"
          >
            <div className="text-center">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 uppercase text-center">
                NEWSLETTER
              </h2>
              <p className="text-gray-500 text-sm md:text-base">
                Receba em primeira mão as notícias sobre Praia Grande e a pré-campanha de Lucas Mourão
              </p>
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="flex-shrink-0 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Inscreva-se
            </button>
          </motion.div>
        </div>
      </section>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-6 md:p-8">
          <FormularioLeads />
        </div>
      </Modal>
    </>
  );
}
