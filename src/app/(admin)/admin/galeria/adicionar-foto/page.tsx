'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { adicionarFotosAlbum } from '../../actions';

export default function AdicionarFotoPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [albuns, setAlbuns] = useState<{ id: string; titulo: string }[]>([]);
  const [albumId, setAlbumId] = useState('');
  const [loadingAlbuns, setLoadingAlbuns] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchAlbuns = async () => {
      const { data } = await supabase
        .from('galeria_albuns')
        .select('id, titulo')
        .order('titulo', { ascending: true });
      if (data) setAlbuns(data);
      setLoadingAlbuns(false);
    };
    fetchAlbuns();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !albumId) return;

    setUploading(true);
    setError('');
    setSuccess('');
    setUploadProgress(`Enviando ${files.length} foto(s)...`);

    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error || 'Erro no upload');

      setUploadProgress('Salvando no banco de dados...');

      const result = await adicionarFotosAlbum(
        albumId,
        uploadData.photos.map((p: { url: string }) => ({ url: p.url }))
      );

      if (result?.error) throw new Error(result.error);

      if (fileInputRef.current) fileInputRef.current.value = '';
      setSuccess(`${files.length} foto(s) adicionada(s) com sucesso!`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer upload.');
    } finally {
      setUploading(false);
      setUploadProgress('');
    }
  };

  if (loadingAlbuns) return <div>Carregando...</div>;

  return (
    <div>
      <Link href="/admin/galeria" className="text-sm text-blue-600 hover:underline mb-4 block">
        ← Voltar para Galeria
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Adicionar Foto</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="max-w-md">
          <label className="block text-sm font-medium text-gray-700 mb-1">Álbum de Destino *</label>
          <select
            required
            value={albumId}
            onChange={(e) => setAlbumId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Selecione um álbum...</option>
            {albuns.map((album) => (
              <option key={album.id} value={album.id}>{album.titulo}</option>
            ))}
          </select>
        </div>

        {albumId && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 font-semibold"
            >
              {uploading ? uploadProgress || 'Enviando...' : 'Selecionar Fotos'}
            </button>
            <p className="mt-2 text-sm text-gray-500">Selecione uma ou mais imagens do seu computador.</p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
            {success}
            <button
              onClick={() => router.push(`/admin/galeria/${albumId}/fotos`)}
              className="ml-2 underline font-semibold"
            >
              Ver álbum →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
