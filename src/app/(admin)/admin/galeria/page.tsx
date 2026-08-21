import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { GaleriaAlbum } from '@/lib/supabase';
import GaleriaTableClient from './GaleriaTableClient';

async function getAlbuns(): Promise<GaleriaAlbum[]> {
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
    .from('galeria_albuns')
    .select('*')
    .order('criado_em', { ascending: false })
    .limit(500);

  return (data ?? []) as GaleriaAlbum[];
}

export default async function GaleriaPage() {
  const albuns = await getAlbuns();
  return <GaleriaTableClient albuns={albuns} />;
}
