import { createClient } from '@supabase/supabase-js';
import type { GaleriaAlbum, GaleriaFoto, Video, RedeSocial, Configuracao, Projeto } from '@/types';

export type { GaleriaAlbum, GaleriaFoto, Video, RedeSocial, Configuracao, Projeto };

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export async function getProjetos(): Promise<Projeto[]> {
  const { data, error } = await supabase
    .from('projetos')
    .select('*')
    .eq('status', 'publicado')
    .order('ordem', { ascending: true })
    .limit(100);

  if (error) throw error;
  return (data ?? []) as Projeto[];
}

export async function getProjetoBySlug(slug: string): Promise<Projeto> {
  try {
    const { data, error } = await supabase
      .from('projetos')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data as Projeto;
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

export async function getAllProjetoSlugs(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('projetos')
      .select('slug')
      .eq('status', 'publicado')
      .limit(100);

    if (error) throw error;
    if (data && data.length > 0) return data.map((p) => p.slug);
  } catch {}

  const { getAllSlugs } = await import('@/data/projetos');
  return getAllSlugs();
}

export async function getGaleriaAlbuns(): Promise<GaleriaAlbum[]> {
  const { data, error } = await supabase
    .from('galeria_albuns')
    .select('*')
    .eq('status', 'publicado')
    .order('criado_em', { ascending: false })
    .limit(100);

  if (error) throw error;
  return data as GaleriaAlbum[];
}

export async function getAlbumById(id: string): Promise<GaleriaAlbum | null> {
  const { data } = await supabase
    .from('galeria_albuns')
    .select('*')
    .eq('id', id)
    .single();
  return data as GaleriaAlbum | null;
}

export async function getFotosByAlbum(albumId: string) {
  const { data } = await supabase
    .from('galeria_fotos')
    .select('*')
    .eq('album_id', albumId)
    .order('ordem', { ascending: true })
    .limit(500);
  return data ?? [];
}

export async function getVideosByAlbum(albumId: string) {
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
  const { data } = await supabase
    .from('galeria_fotos')
    .select('*')
    .order('criado_em', { ascending: false })
    .limit(200);
  return data ?? [];
}

export async function getAllVideos() {
  const { data } = await supabase
    .from('videos')
    .select('*')
    .eq('status', 'publicado')
    .order('ordem', { ascending: true })
    .limit(100);
  return data ?? [];
}

export async function getCompromissos() {
  const { data } = await supabase
    .from('agenda')
    .select('id, titulo, descricao, data_hora, local, status')
    .eq('status', 'publicado')
    .order('data_hora', { ascending: true })
    .limit(50);
  return data ?? [];
}
