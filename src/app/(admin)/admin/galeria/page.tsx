'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase, GaleriaAlbum } from '@/lib/supabase';
import { excluirAlbum, toggleStatusAlbum } from '../actions';


export default function GaleriaPage() {
  const [albuns, setAlbuns] = useState<GaleriaAlbum[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAlbuns = async () => {
    const { data } = await supabase
      .from('galeria_albuns')
      .select('*')
      .order('criado_em', { ascending: false })
      .limit(500);

    if (data) setAlbuns(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAlbuns(); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este álbum?')) return;
    await excluirAlbum(id);
    fetchAlbuns();
  };

  const handleToggleStatus = async (id: string) => {
    await toggleStatusAlbum(id);
    fetchAlbuns();
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Galeria de Fotos</h1>
        <Link href="/admin/galeria/novo"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Novo Álbum
        </Link>
      </div>

      {albuns.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
          Nenhum álbum encontrado. Crie o primeiro!
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fotos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {albuns.map((album) => (
                <tr key={album.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{album.titulo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{album.categoria}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{album.fotos_count}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      album.status === 'publicado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>{album.status === 'publicado' ? 'Publicado' : 'Rascunho'}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleToggleStatus(album.id)}
                      className={`mr-3 text-xs font-semibold ${
                        album.status === 'publicado' ? 'text-yellow-600 hover:text-yellow-900' : 'text-green-600 hover:text-green-900'
                      }`}
                    >
                      {album.status === 'publicado' ? 'Ocultar' : 'Publicar'}
                    </button>
                    <a href={`/admin/galeria/${album.id}/fotos`} className="text-green-600 hover:text-green-900 mr-3">
                      Fotos
                    </a>
                    <a href={`/admin/galeria/${album.id}/edit`} className="text-blue-600 hover:text-blue-900 mr-3">
                      Editar
                    </a>
                    <button onClick={() => handleDelete(album.id)} className="text-red-600 hover:text-red-900">
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
