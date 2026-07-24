'use client';

import Agenda from './Agenda';
import FormularioLeads from './FormularioLeads';

export default function CaptacaoEngajamento() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Fique Por Dentro
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Acompanhe nossa agenda de compromissos e entre em contato para transformar a Baixada Santista.
          </p>
        </div>

        {/* Mobile: stacked — Leads first, Agenda second */}
        {/* Desktop: 2 columns — Agenda left, Leads right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="order-2 md:order-1">
            <Agenda />
          </div>
          <div className="order-1 md:order-2">
            <FormularioLeads />
          </div>
        </div>
      </div>
    </section>
  );
}
