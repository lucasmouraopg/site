import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import AgendaTableClient from './AgendaTableClient';

interface Compromisso {
  id: string;
  titulo: string;
  descricao: string | null;
  data_hora: string;
  local: string | null;
  status: string;
  criado_em: string;
}

async function getCompromissos(): Promise<Compromisso[]> {
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
    .from('agenda')
    .select('*')
    .order('data_hora', { ascending: false })
    .limit(500);

  return (data ?? []) as Compromisso[];
}

export default async function AgendaPage() {
  const compromissos = await getCompromissos();
  return <AgendaTableClient compromissos={compromissos} />;
}
