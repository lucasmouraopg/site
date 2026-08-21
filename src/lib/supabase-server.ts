import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export type { GaleriaAlbum, GaleriaFoto, Video, RedeSocial, Configuracao, Projeto } from '@/types';

async function createCookieClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component — ignore
          }
        },
      },
    }
  );
}

export async function getProjetos() {
  const supabase = await createCookieClient();
  const { data, error } = await supabase
    .from('projetos')
    .select('*')
    .eq('status', 'publicado')
    .order('ordem', { ascending: true })
    .limit(100);

  if (error) throw error;
  return (data ?? []) as import('./supabase').Projeto[];
}

export async function getProjetoBySlug(slug: string) {
  const supabase = await createCookieClient();
  try {
    const { data, error } = await supabase
      .from('projetos')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data as import('./supabase').Projeto;
  } catch {
    const { getProjetoBySlug: getLocal } = await import('@/data/projetos');
    const p = getLocal(slug);
    if (!p) throw new Error('Projeto não encontrado');
    return {
      id: p.slug,
      slug: p.slug,
      titulo: p.titulo,
      resumo: p.resumo,
      descricao: p.descricao,
      categoria: p.categoria,
      fotos: p.fotos,
      share_text: p.shareText,
      ordem: 0,
      status: 'publicado' as const,
      criado_em: '',
      atualizado_em: '',
    };
  }
}

export async function getAllProjetoSlugs() {
  try {
    const supabase = await createCookieClient();
    const { data, error } = await supabase
      .from('projetos')
      .select('slug')
      .eq('status', 'publicado')
      .limit(100);

    if (error) throw error;
    if (data && data.length > 0) return data.map((p) => p.slug);
  } catch (e) {
    console.warn('[supabase-server] getAllProjetoSlugs fallback to local data:', e);
  }

  const { getAllSlugs } = await import('@/data/projetos');
  return getAllSlugs();
}

export async function getGaleriaAlbuns() {
  const supabase = await createCookieClient();
  const { data, error } = await supabase
    .from('galeria_albuns')
    .select('*')
    .eq('status', 'publicado')
    .order('criado_em', { ascending: false })
    .limit(100);

  if (error) throw error;
  return data as import('./supabase').GaleriaAlbum[];
}

export async function getCompromissos() {
  const supabase = await createCookieClient();
  const { data } = await supabase
    .from('agenda')
    .select('id, titulo, descricao, data_hora, local, status')
    .eq('status', 'publicado')
    .order('data_hora', { ascending: true })
    .limit(50);

  return data ?? [];
}

export async function getAlbumById(slug: string) {
  const supabase = await createCookieClient();
  const { data } = await supabase
    .from('galeria_albuns')
    .select('*')
    .eq('id', slug)
    .single();
  return data as import('./supabase').GaleriaAlbum | null;
}

export async function getFotosByAlbum(albumId: string) {
  const supabase = await createCookieClient();
  const { data } = await supabase
    .from('galeria_fotos')
    .select('*')
    .eq('album_id', albumId)
    .order('ordem', { ascending: true })
    .limit(500);
  return data ?? [];
}

export async function getVideosByAlbum(albumId: string) {
  const supabase = await createCookieClient();
  const { data } = await supabase
    .from('videos')
    .select('*')
    .eq('album_id', albumId)
    .eq('status', 'publicado')
    .order('ordem', { ascending: true })
    .limit(500);
  return data ?? [];
}

export async function getAllFotos() {
  const supabase = await createCookieClient();
  const { data } = await supabase
    .from('galeria_fotos')
    .select('*')
    .order('criado_em', { ascending: false })
    .limit(200);
  return data ?? [];
}

export async function getAllVideos() {
  const supabase = await createCookieClient();
  const { data } = await supabase
    .from('videos')
    .select('*')
    .eq('status', 'publicado')
    .order('ordem', { ascending: true })
    .limit(100);
  return data ?? [];
}
