'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { editarCompromisso } from '../../../actions';

interface Compromisso {
  id: string;
  titulo: string;
  descricao: string | null;
  data_hora: string;
  local: string | null;
  status: string;
}

export default function EditarCompromissoPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataHora, setDataHora] = useState('');
  const [local, setLocal] = useState('');
  const [status, setStatus] = useState('rascunho');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      const { data } = await supabase.from('agenda').select('*').eq('id', id).single();
      if (data) {
        setTitulo(data.titulo);
        setDescricao(data.descricao || '');
        const dt = new Date(data.data_hora);
        const localDt = new Date(dt.getTime() - dt.getTimezoneOffset() * 60000);
        setDataHora(localDt.toISOString().slice(0, 16));
        setLocal(data.local || '');
        setStatus(data.status);
      }
      setLoading(false);
    };
    fetchItem();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const result = await editarCompromisso(id, {
        titulo,
        descricao,
        data_hora: new Date(dataHora).toISOString(),
        local,
        status,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/admin/agenda');
        return;
      }
    } catch {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <Link href="/admin/agenda" className="text-sm text-blue-600 hover:underline mb-4 block">
        ← Voltar para Agenda
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Editar Compromisso</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
          <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required maxLength={200}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} rows={4} maxLength={2000}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Data e Hora *</label>
          <input type="datetime-local" value={dataHora} onChange={(e) => setDataHora(e.target.value)} required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Local</label>
          <input type="text" value={local} onChange={(e) => setLocal(e.target.value)} maxLength={200}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="rascunho">Rascunho</option>
            <option value="publicado">Publicado</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
            {saving ? 'Salvando...' : 'Salvar'}
          </button>
          <button type="button" onClick={() => router.push('/admin/agenda')}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
