'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase, GaleriaAlbum, GaleriaFoto } from '@/lib/supabase';
import { adicionarFotosAlbum, excluirFotoAlbum, atualizarCapaAlbum } from '../../../actions';

export default function FotosAlbumPage() {
  const params = useParams();
  const albumId = params.id as string;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [album, setAlbum] = useState<GaleriaAlbum | null>(null);
  const [fotos, setFotos] = useState<GaleriaFoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [error, setError] = useState('');

  const fetchData = async () => {
    const { data: albumData } = await supabase
      .from('galeria_albuns')
      .select('*')
      .eq('id', albumId)
      .single();

    if (albumData) setAlbum(albumData);

    const { data: fotosData } = await supabase
      .from('galeria_fotos')
      .select('*')
      .eq('album_id', albumId)
      .order('ordem', { ascending: true });

    if (fotosData) setFotos(fotosData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData(); // eslint-disable-line react-hooks/set-state-in-effect
  }, [albumId]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError('');
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
      await fetchData();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer upload.');
    } finally {
      setUploading(false);
      setUploadProgress('');
    }
  };

  const handleDelete = async (fotoId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta foto?')) return;
    const result = await excluirFotoAlbum(fotoId);
    if (result?.error) {
      alert(result.error);
    } else {
      await fetchData();
    }
  };

  const handleSetCapa = async (fotoUrl: string) => {
    const result = await atualizarCapaAlbum(albumId, fotoUrl);
    if (result?.error) {
      alert(result.error);
    } else {
      await fetchData();
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <Link href="/admin/galeria" className="text-sm text-blue-600 hover:underline mb-1 block">
            ← Voltar para Galeria
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Fotos: {album?.titulo || 'Álbum'}
          </h1>
          <p className="text-sm text-gray-500">{fotos.length} foto(s) neste álbum</p>
        </div>
        <div className="flex gap-3">
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
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {uploading ? uploadProgress || 'Enviando...' : 'Adicionar Fotos'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6 text-sm">
          {error}
        </div>
      )}

      {fotos.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="mb-4">Nenhuma foto neste álbum.</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Enviar primeira foto
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {fotos.map((foto) => (
            <div key={foto.id} className="bg-white rounded-lg shadow overflow-hidden group">
              <div className="relative aspect-square bg-gray-100">
                <img
                  src={foto.url}
                  alt={foto.legenda || ''}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => handleSetCapa(foto.url)}
                    className="px-3 py-1 bg-white text-gray-800 text-xs font-semibold rounded-md hover:bg-blue-50"
                    title="Definir como capa"
                  >
                    Capa
                  </button>
                  <button
                    onClick={() => handleDelete(foto.id)}
                    className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-md hover:bg-red-700"
                    title="Excluir foto"
                  >
                    Excluir
                  </button>
                </div>
                {album?.cover_url === foto.url && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-blue-600 text-white text-[10px] font-semibold rounded-full">
                    CAPA
                  </span>
                )}
              </div>
              {foto.legenda && (
                <div className="p-2">
                  <p className="text-xs text-gray-500 truncate">{foto.legenda}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
