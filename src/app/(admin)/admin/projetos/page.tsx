'use client';

import { useEffect, useState } from 'react';
import { supabase, Projeto } from '@/lib/supabase';
import { excluirProjeto, toggleStatusProjeto } from '../actions';


export default function ProjetosAdminPage() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjetos = async () => {
    const { data } = await supabase
      .from('projetos')
      .select('*')
      .order('ordem', { ascending: true });

    if (data) setProjetos(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjetos(); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este projeto?')) return;
    await excluirProjeto(id);
    fetchProjetos();
  };

  const handleToggleStatus = async (id: string) => {
    await toggleStatusProjeto(id);
    fetchProjetos();
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Projetos</h1>
        <a
          href="/admin/projetos/novo"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Novo Projeto
        </a>
      </div>

      {projetos.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
          Nenhum projeto encontrado.
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoria</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projetos.map((projeto) => (
                <tr key={projeto.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{projeto.titulo}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{projeto.categoria}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                      projeto.status === 'publicado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>{projeto.status === 'publicado' ? 'Publicado' : 'Rascunho'}</span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button
                      onClick={() => handleToggleStatus(projeto.id)}
                      className={`mr-4 text-xs font-semibold ${
                        projeto.status === 'publicado' ? 'text-yellow-600 hover:text-yellow-900' : 'text-green-600 hover:text-green-900'
                      }`}
                    >
                      {projeto.status === 'publicado' ? 'Ocultar' : 'Publicar'}
                    </button>
                    <a href={`/admin/projetos/${projeto.id}/edit`} className="text-blue-600 hover:text-blue-900 mr-4">
                      Editar
                    </a>
                    <button onClick={() => handleDelete(projeto.id)} className="text-red-600 hover:text-red-900">
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
