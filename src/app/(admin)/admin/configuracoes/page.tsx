import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Configuracao } from '@/lib/supabase';
import ConfigFormClient from './ConfigFormClient';

async function getConfigs(): Promise<Configuracao[]> {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set() {},
        remove() {},
      },
    }
  );

  const { data } = await supabase
    .from('configuracoes')
    .select('*')
    .order('chave')
    .limit(500);

  return (data ?? []) as Configuracao[];
}

export default async function ConfiguracoesPage() {
  const configs = await getConfigs();
  return <ConfigFormClient configs={configs} />;
}
