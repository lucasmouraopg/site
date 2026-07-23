'use server';

import { createAdminClient } from '@/lib/supabase-admin';
import { revalidatePath } from 'next/cache';

function getAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Admin credentials not configured');
  return createAdminClient();
}

function sanitize(value: string): string {
  return value.replace(/[<>]/g, '').trim().slice(0, 5000);
}

function validateSlug(slug: string): string {
  return slug
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 200);
}

function validateYouTubeUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ['youtube.com', 'www.youtube.com', 'youtu.be'].includes(parsed.hostname);
  } catch {
    return false;
  }
}

// ============================================
// Projetos
// ============================================

export async function criarProjeto(formData: {
  titulo: string;
  slug: string;
  resumo: string;
  descricao: string;
  categoria: string;
  share_text: string;
  status: string;
}) {
  const supabase = getAdmin();

  const titulo = sanitize(formData.titulo);
  const slug = validateSlug(formData.slug || formData.titulo);
  const resumo = sanitize(formData.resumo);
  const descricao = sanitize(formData.descricao);
  const categoria = sanitize(formData.categoria);
  const share_text = sanitize(formData.share_text);
  const status = formData.status === 'publicado' ? 'publicado' : 'rascunho';

  if (!titulo || !slug || !categoria) {
    return { error: 'Campos obrigatórios não preenchidos.' };
  }

  const { error } = await supabase.from('projetos').insert({
    titulo,
    slug,
    resumo,
    descricao,
    categoria,
    share_text,
    status,
  });

  if (error) {
    return { error: 'Erro ao salvar projeto.' };
  }

  revalidatePath('/admin/projetos');
  revalidatePath('/');
  return { success: true };
}

export async function excluirProjeto(id: string) {
  const supabase = getAdmin();
  const { error } = await supabase.from('projetos').delete().eq('id', id);
  if (error) return { error: 'Erro ao excluir projeto.' };
  revalidatePath('/admin/projetos');
  revalidatePath('/');
  return { success: true };
}

export async function toggleStatusProjeto(id: string, currentStatus: string) {
  const supabase = getAdmin();
  const newStatus = currentStatus === 'publicado' ? 'rascunho' : 'publicado';
  const { error } = await supabase.from('projetos').update({ status: newStatus }).eq('id', id);
  if (error) return { error: 'Erro ao atualizar status.' };
  revalidatePath('/admin/projetos');
  revalidatePath('/');
  return { success: true };
}

// ============================================
// Galeria
// ============================================

export async function criarAlbum(formData: {
  titulo: string;
  descricao: string;
  categoria: string;
  status: string;
}) {
  const supabase = getAdmin();

  const titulo = sanitize(formData.titulo);
  const descricao = sanitize(formData.descricao);
  const categoria = sanitize(formData.categoria);
  const status = formData.status === 'publicado' ? 'publicado' : 'rascunho';

  if (!titulo || !categoria) {
    return { error: 'Campos obrigatórios não preenchidos.' };
  }

  const { error } = await supabase.from('galeria_albuns').insert({
    titulo,
    descricao,
    categoria,
    status,
  });

  if (error) return { error: 'Erro ao salvar álbum.' };
  revalidatePath('/admin/galeria');
  return { success: true };
}

export async function excluirAlbum(id: string) {
  const supabase = getAdmin();
  const { error } = await supabase.from('galeria_albuns').delete().eq('id', id);
  if (error) return { error: 'Erro ao excluir álbum.' };
  revalidatePath('/admin/galeria');
  return { success: true };
}

// ============================================
// Videos
// ============================================

export async function criarVideo(formData: {
  titulo: string;
  descricao: string;
  youtube_url: string;
  categoria: string;
  status: string;
}) {
  const supabase = getAdmin();

  const titulo = sanitize(formData.titulo);
  const descricao = sanitize(formData.descricao);
  const youtube_url = formData.youtube_url.trim();
  const categoria = sanitize(formData.categoria);
  const status = formData.status === 'publicado' ? 'publicado' : 'rascunho';

  if (!titulo || !categoria || !validateYouTubeUrl(youtube_url)) {
    return { error: 'Campos obrigatórios inválidos.' };
  }

  const { error } = await supabase.from('videos').insert({
    titulo,
    descricao,
    youtube_url,
    categoria,
    status,
  });

  if (error) return { error: 'Erro ao salvar vídeo.' };
  revalidatePath('/admin/videos');
  return { success: true };
}

export async function excluirVideo(id: string) {
  const supabase = getAdmin();
  const { error } = await supabase.from('videos').delete().eq('id', id);
  if (error) return { error: 'Erro ao excluir vídeo.' };
  revalidatePath('/admin/videos');
  return { success: true };
}

// ============================================
// Configuracoes
// ============================================

export async function atualizarConfiguracao(id: string, valor: string) {
  const supabase = getAdmin();
  const sanitized = sanitize(valor);
  const { error } = await supabase.from('configuracoes').update({ valor: sanitized }).eq('id', id);
  if (error) return { error: 'Erro ao salvar configuração.' };
  revalidatePath('/admin/configuracoes');
  return { success: true };
}
