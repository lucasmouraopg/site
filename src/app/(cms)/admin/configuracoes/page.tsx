'use client';

import { useEffect, useState } from 'react';
import { supabase, Configuracao } from '@/lib/supabase';

export default function ConfiguracoesPage() {
  const [configs, setConfigs] = useState<Configuracao[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchConfigs();
  }, []);

  const fetchConfigs = async () => {
    const { data } = await supabase
      .from('configuracoes')
      .select('*')
      .order('chave');

    if (data) setConfigs(data);
    setLoading(false);
  };

  const handleUpdate = async (id: string, valor: string) => {
    setSaving(true);
    await supabase
      .from('configuracoes')
      .update({ valor })
      .eq('id', id);
    setSaving(false);
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Configurações</h1>

      <div className="bg-white shadow rounded-lg p-6">
        {configs.length === 0 ? (
          <p className="text-gray-500 text-center">Nenhuma configuração encontrada.</p>
        ) : (
          <div className="space-y-4">
            {configs.map((config) => (
              <div key={config.id} className="flex items-center gap-4">
                <label className="w-48 text-sm font-medium text-gray-700">{config.chave}</label>
                <input
                  type="text"
                  defaultValue={config.valor || ''}
                  onBlur={(e) => handleUpdate(config.id, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            ))}
          </div>
        )}
        {saving && <p className="mt-4 text-sm text-gray-500">Salvando...</p>}
      </div>
    </div>
  );
}
