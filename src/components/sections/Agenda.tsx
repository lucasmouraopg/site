'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Compromisso {
  id: string;
  titulo: string;
  descricao: string | null;
  data_hora: string;
  local: string | null;
}

export default function Agenda() {
  const [compromissos, setCompromissos] = useState<Compromisso[]>([]);
  const [loading, setLoading] = useState(true);

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

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="h-6 bg-gray-200 rounded w-48 mb-6 animate-pulse" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-2">Próximos Eventos</h3>
      <p className="text-gray-500 text-sm mb-6">Acompanhe a agenda de compromissos.</p>

      {compromissos.length === 0 ? (
        <p className="text-gray-400 text-sm py-4">Nenhum evento programado no momento.</p>
      ) : (
        <div className="space-y-4">
          {compromissos.map((item) => (
            <div
              key={item.id}
              className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 text-sm">{item.titulo}</h4>
                  <p className="text-xs text-blue-600 mt-0.5 capitalize">{formatDate(item.data_hora)}</p>
                  {item.local && (
                    <p className="text-xs text-gray-400 mt-0.5">{item.local}</p>
                  )}
                  {item.descricao && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.descricao}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
