import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface Compromisso {
  id: string;
  titulo: string;
  descricao: string | null;
  data_hora: string;
  local: string | null;
  status: string;
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

async function getCompromissos(): Promise<Compromisso[]> {
  const { data } = await supabase
    .from('agenda')
    .select('id, titulo, descricao, data_hora, local, status')
    .eq('status', 'publicado')
    .order('data_hora', { ascending: true })
    .limit(50);

  return data ?? [];
}

export default async function AgendaPage() {
  const compromissos = await getCompromissos();

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-8"
        >
          ← Voltar
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Agenda</h1>
        <p className="text-gray-500 mb-10">Confira os compromissos e eventos agendados.</p>

        {compromissos.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p>Nenhum compromisso agendado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {compromissos.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 font-semibold capitalize">
                      {new Date(item.data_hora).toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' })}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(item.data_hora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <h2 className="font-semibold text-gray-900 mb-1">{item.titulo}</h2>
                {item.local && (
                  <p className="text-sm text-gray-500 mb-2">{item.local}</p>
                )}
                {item.descricao && (
                  <p className="text-sm text-gray-400 line-clamp-3">{item.descricao}</p>
                )}
                <p className="text-xs text-gray-300 mt-3">{formatDateTime(item.data_hora)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
