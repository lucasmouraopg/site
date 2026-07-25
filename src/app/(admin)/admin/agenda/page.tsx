'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { excluirCompromisso, toggleStatusCompromisso } from '../actions';

interface Compromisso {
  id: string;
  titulo: string;
  descricao: string | null;
  data_hora: string;
  local: string | null;
  status: string;
  criado_em: string;
}

export default function AgendaPage() {
  const [compromissos, setCompromissos] = useState<Compromisso[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompromissos();
  }, []);

  const fetchCompromissos = async () => {
    const { data } = await supabase
      .from('agenda')
      .select('*')
      .order('data_hora', { ascending: false });

    if (data) setCompromissos(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este compromisso?')) return;
    await excluirCompromisso(id);
    fetchCompromissos();
  };

  const handleToggleStatus = async (id: string) => {
    await toggleStatusCompromisso(id);
    fetchCompromissos();
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Agenda de Eventos</h1>
        <Link href="/admin/agenda/novo"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Novo Compromisso
        </Link>
      </div>

      {compromissos.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
          Nenhum compromisso cadastrado. Crie o primeiro!
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data/Hora</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Local</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {compromissos.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.titulo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(item.data_hora)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.local || '—'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === 'publicado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>{item.status === 'publicado' ? 'Publicado' : 'Rascunho'}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleToggleStatus(item.id)}
                      className={`mr-4 text-xs font-semibold ${
                        item.status === 'publicado' ? 'text-yellow-600 hover:text-yellow-900' : 'text-green-600 hover:text-green-900'
                      }`}
                    >
                      {item.status === 'publicado' ? 'Ocultar' : 'Publicar'}
                    </button>
                    <a href={`/admin/agenda/${item.id}/edit`} className="text-blue-600 hover:text-blue-900 mr-4">
                      Editar
                    </a>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
