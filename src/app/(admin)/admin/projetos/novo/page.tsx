'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { criarProjeto } from '../../actions';

export default function NovoProjetoPage() {
  const router = useRouter();
  const [titulo, setTitulo] = useState('');
  const [slug, setSlug] = useState('');
  const [resumo, setResumo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [shareText, setShareText] = useState('');
  const [status, setStatus] = useState<'publicado' | 'rascunho'>('rascunho');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSlugChange = (value: string) => {
    const slugified = value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setSlug(slugified);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const result = await criarProjeto({
        titulo,
        slug,
        resumo,
        descricao,
        categoria,
        share_text: shareText,
        status,
      });

      if (result?.error) {
        setErrorMsg(result.error);
      } else {
        router.push('/admin/projetos');
        return;
      }
    } catch {
      setErrorMsg('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Novo Projeto</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
            <input type="text" required value={titulo} maxLength={200}
              onChange={(e) => { setTitulo(e.target.value); handleSlugChange(e.target.value); }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL) *</label>
            <input type="text" required value={slug} onChange={(e) => setSlug(e.target.value)} maxLength={200}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono text-sm" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Resumo *</label>
            <input type="text" required value={resumo} onChange={(e) => setResumo(e.target.value)} maxLength={500}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição *</label>
            <textarea required value={descricao} onChange={(e) => setDescricao(e.target.value)} rows={5} maxLength={5000}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoria *</label>
              <select required value={categoria} onChange={(e) => setCategoria(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="">Selecione...</option>
                <option value="Infraestrutura">Infraestrutura</option>
                <option value="Social">Social</option>
                <option value="Esporte">Esporte</option>
                <option value="Lazer">Lazer</option>
                <option value="Eventos">Eventos</option>
                <option value="Saúde">Saúde</option>
                <option value="Educação">Educação</option>
                <option value="Segurança">Segurança</option>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Texto para Compartilhamento</label>
            <input type="text" value={shareText} onChange={(e) => setShareText(e.target.value)} maxLength={500}
              placeholder="Texto que aparecerá ao compartilhar nas redes sociais"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
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
          <button type="submit" disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
}
