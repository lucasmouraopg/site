'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase, GaleriaAlbum } from '@/lib/supabase';
import { editarAlbum } from '../../../actions';

export default function EditarAlbumPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [status, setStatus] = useState<'publicado' | 'rascunho'>('rascunho');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchAlbum = async () => {
      const { data } = await supabase.from('galeria_albuns').select('*').eq('id', id).single();
      if (data) {
        setTitulo(data.titulo);
        setDescricao(data.descricao || '');
        setCategoria(data.categoria);
        setStatus(data.status);
      }
      setLoading(false);
    };
    fetchAlbum();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');

    try {
      const result = await editarAlbum(id, { titulo, descricao, categoria, status });

      if (result?.error) {
        setErrorMsg(result.error);
      } else {
        router.push('/admin/galeria');
        return;
      }
    } catch {
      setErrorMsg('Erro de conexão. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <Link href="/admin/galeria" className="text-sm text-blue-600 hover:underline mb-4 block">
        ← Voltar para Galeria
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Editar Álbum</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
            <input type="text" required value={titulo} maxLength={200}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} rows={3} maxLength={2000}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoria *</label>
              <select required value={categoria} onChange={(e) => setCategoria(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="">Selecione...</option>
                <option value="Eventos">Eventos</option>
                <option value="Social">Social</option>
                <option value="Infraestrutura">Infraestrutura</option>
                <option value="Esporte">Esporte</option>
                <option value="Lazer">Lazer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as 'publicado' | 'rascunho')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="rascunho">Rascunho</option>
                <option value="publicado">Publicado</option>
              </select>
            </div>
          </div>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {errorMsg}
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            Cancelar
          </button>
          <button type="submit" disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
            {saving ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
}
