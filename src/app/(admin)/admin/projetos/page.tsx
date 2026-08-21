import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Projeto } from '@/lib/supabase';
import ProjetosTableClient from './ProjetosTableClient';

async function getProjetos(): Promise<Projeto[]> {
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
    .from('projetos')
    .select('*')
    .order('ordem', { ascending: true })
    .limit(500);

  return (data ?? []) as Projeto[];
}

export default async function ProjetosAdminPage() {
  const projetos = await getProjetos();
  return <ProjetosTableClient projetos={projetos} />;
}
