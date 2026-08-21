import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import LeadsTableClient from './LeadsTableClient';

interface Lead {
  id: string;
  nome: string;
  whatsapp: string;
  email: string | null;
  bairro: string | null;
  cidade: string | null;
  criado_em: string;
}

async function getLeads(): Promise<Lead[]> {
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
    .from('leads')
    .select('*')
    .order('criado_em', { ascending: false })
    .limit(500);

  return (data ?? []) as Lead[];
}

export default async function LeadsPage() {
  const leads = await getLeads();
  return <LeadsTableClient leads={leads} />;
}
