'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Configuracao } from '@/lib/supabase';
import { atualizarConfiguracao } from '../actions';

export default function ConfigFormClient({ configs }: { configs: Configuracao[] }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const handleUpdate = async (id: string, valor: string) => {
    setSaving(true);
    await atualizarConfiguracao(id, valor);
    setSaving(false);
    router.refresh();
  };

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
                  maxLength={2000}
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
