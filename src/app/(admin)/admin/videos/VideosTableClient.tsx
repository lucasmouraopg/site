'use client';

import { useRouter } from 'next/navigation';
import { Video } from '@/lib/supabase';
import { excluirVideo, toggleStatusVideo } from '../actions';

export default function VideosTableClient({ videos }: { videos: Video[] }) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este vídeo?')) return;
    await excluirVideo(id);
    router.refresh();
  };

  const handleToggleStatus = async (id: string) => {
    await toggleStatusVideo(id);
    router.refresh();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Vídeos</h1>
        <a href="/admin/videos/novo"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Novo Vídeo
        </a>
      </div>

      {videos.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
          Nenhum vídeo encontrado.
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
              {videos.map((video) => (
                <tr key={video.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{video.titulo}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{video.categoria}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                      video.status === 'publicado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>{video.status === 'publicado' ? 'Publicado' : 'Rascunho'}</span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button
                      onClick={() => handleToggleStatus(video.id)}
                      className={`mr-4 text-xs font-semibold ${
                        video.status === 'publicado' ? 'text-yellow-600 hover:text-yellow-900' : 'text-green-600 hover:text-green-900'
                      }`}
                    >
                      {video.status === 'publicado' ? 'Ocultar' : 'Publicar'}
                    </button>
                    <a href={`/admin/videos/${video.id}/edit`} className="text-blue-600 hover:text-blue-900 mr-4">
                      Editar
                    </a>
                    <button onClick={() => handleDelete(video.id)} className="text-red-600 hover:text-red-900">
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
