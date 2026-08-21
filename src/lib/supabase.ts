import { createBrowserClient } from '@supabase/ssr';
import { GaleriaAlbum, GaleriaFoto, Video, RedeSocial, Configuracao, Projeto } from '@/types';

export type { GaleriaAlbum, GaleriaFoto, Video, RedeSocial, Configuracao, Projeto } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

// Database functions
export async function getGaleriaAlbuns() {
  const { data, error } = await supabase
    .from('galeria_albuns')
    .select('*')
    .eq('status', 'publicado')
    .order('criado_em', { ascending: false })
    .limit(100);

  if (error) throw error;
  return data as GaleriaAlbum[];
}

export async function getGaleriaFotos(albumId: string) {
  const { data, error } = await supabase
    .from('galeria_fotos')
    .select('*')
    .eq('album_id', albumId)
    .order('ordem', { ascending: true })
    .limit(500);

  if (error) throw error;
  return data as GaleriaFoto[];
}

export async function getVideos() {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('status', 'publicado')
    .order('ordem', { ascending: true })
    .limit(100);

  if (error) throw error;
  return data as Video[];
}

export async function getRedesSociais() {
  const { data, error } = await supabase
    .from('redes_sociais')
    .select('*')
    .eq('ativo', true)
    .order('ordem', { ascending: true })
    .limit(20);

  if (error) throw error;
  return data as RedeSocial[];
}

export async function getConfiguracao(chave: string) {
  const { data, error } = await supabase
    .from('configuracoes')
    .select('valor')
    .eq('chave', chave)
    .single();

  if (error) throw error;
  return data?.valor;
}

export async function getConfiguracoes(chaves: string[]) {
  const { data, error } = await supabase
    .from('configuracoes')
    .select('chave, valor')
    .in('chave', chaves)
    .limit(50);

  if (error) throw error;
  return data.reduce((acc, item) => {
    acc[item.chave] = item.valor;
    return acc;
  }, {} as { [key: string]: string });
}

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
