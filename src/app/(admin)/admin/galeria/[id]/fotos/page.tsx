import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { GaleriaAlbum, GaleriaFoto } from '@/lib/supabase';
import FotosManagerClient from './FotosManagerClient';

async function getAlbumData(albumId: string) {
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

  const { data: album } = await supabase
    .from('galeria_albuns')
    .select('*')
    .eq('id', albumId)
    .single();

  const { data: fotos } = await supabase
    .from('galeria_fotos')
    .select('*')
    .eq('album_id', albumId)
    .order('ordem', { ascending: true })
    .limit(500);

  return {
    album: (album ?? null) as GaleriaAlbum | null,
    fotos: (fotos ?? []) as GaleriaFoto[],
  };
}

export default async function FotosAlbumPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: albumId } = await params;
  const { album, fotos } = await getAlbumData(albumId);
  return <FotosManagerClient albumId={albumId} album={album} fotos={fotos} />;
}
