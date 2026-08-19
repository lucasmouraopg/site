'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createAdminClient } from '@/lib/supabase-admin';
import { revalidatePath } from 'next/cache';

function getAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Admin credentials not configured');
  return createAdminClient();
}

async function requireAuth() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) throw new Error('Supabase not configured');

  const cookieStore = await cookies();

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
    },
  });

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    throw new Error('Não autenticado');
  }
  return user;
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

function isValidUUID(str: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
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
  try { await requireAuth(); } catch { return { error: 'Não autenticado.' }; }
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
  try { await requireAuth(); } catch { return { error: 'Não autenticado.' }; }
  if (!isValidUUID(id)) return { error: 'ID inválido.' };

  const supabase = getAdmin();
  const { error } = await supabase.from('projetos').delete().eq('id', id);
  if (error) return { error: 'Erro ao excluir projeto.' };
  revalidatePath('/admin/projetos');
  revalidatePath('/');
  return { success: true };
}

export async function toggleStatusProjeto(id: string) {
  try { await requireAuth(); } catch { return { error: 'Não autenticado.' }; }
  if (!isValidUUID(id)) return { error: 'ID inválido.' };

  const supabase = getAdmin();

  const { data: projeto, error: fetchError } = await supabase
    .from('projetos')
    .select('status')
    .eq('id', id)
    .single();

  if (fetchError || !projeto) return { error: 'Projeto não encontrado.' };

  const newStatus = projeto.status === 'publicado' ? 'rascunho' : 'publicado';
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
  try { await requireAuth(); } catch { return { error: 'Não autenticado.' }; }
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
  try { await requireAuth(); } catch { return { error: 'Não autenticado.' }; }
  if (!isValidUUID(id)) return { error: 'ID inválido.' };

  const supabase = getAdmin();
  const { error } = await supabase.from('galeria_albuns').delete().eq('id', id);
  if (error) return { error: 'Erro ao excluir álbum.' };
  revalidatePath('/admin/galeria');
  return { success: true };
}

export async function toggleStatusAlbum(id: string) {
  try { await requireAuth(); } catch { return { error: 'Não autenticado.' }; }
  if (!isValidUUID(id)) return { error: 'ID inválido.' };

  const supabase = getAdmin();

  const { data: album, error: fetchError } = await supabase
    .from('galeria_albuns')
    .select('status')
    .eq('id', id)
    .single();

  if (fetchError || !album) return { error: 'Álbum não encontrado.' };

  const newStatus = album.status === 'publicado' ? 'rascunho' : 'publicado';
  const { error } = await supabase.from('galeria_albuns').update({ status: newStatus }).eq('id', id);
  if (error) return { error: 'Erro ao atualizar status.' };
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
  album_id: string;
  categoria: string;
  status: string;
}) {
  try { await requireAuth(); } catch { return { error: 'Não autenticado.' }; }
  const supabase = getAdmin();

  const titulo = sanitize(formData.titulo);
  const descricao = sanitize(formData.descricao);
  const youtube_url = formData.youtube_url.trim();
  const categoria = sanitize(formData.categoria);
  const status = formData.status === 'publicado' ? 'publicado' : 'rascunho';

  if (!titulo || !categoria || !validateYouTubeUrl(youtube_url)) {
    return { error: 'Campos obrigatórios inválidos.' };
  }

  if (!formData.album_id || !isValidUUID(formData.album_id)) {
    return { error: 'Selecione um álbum válido.' };
  }

  const { error } = await supabase.from('videos').insert({
    titulo,
    descricao,
    youtube_url,
    album_id: formData.album_id,
    categoria,
    status,
  });

  if (error) return { error: 'Erro ao salvar vídeo.' };
  revalidatePath('/admin/videos');
  return { success: true };
}

export async function excluirVideo(id: string) {
  try { await requireAuth(); } catch { return { error: 'Não autenticado.' }; }
  if (!isValidUUID(id)) return { error: 'ID inválido.' };

  const supabase = getAdmin();
  const { error } = await supabase.from('videos').delete().eq('id', id);
  if (error) return { error: 'Erro ao excluir vídeo.' };
  revalidatePath('/admin/videos');
  return { success: true };
}

export async function toggleStatusVideo(id: string) {
  try { await requireAuth(); } catch { return { error: 'Não autenticado.' }; }
  if (!isValidUUID(id)) return { error: 'ID inválido.' };

  const supabase = getAdmin();

  const { data: video, error: fetchError } = await supabase
    .from('videos')
    .select('status')
    .eq('id', id)
    .single();

  if (fetchError || !video) return { error: 'Vídeo não encontrado.' };

  const newStatus = video.status === 'publicado' ? 'rascunho' : 'publicado';
  const { error } = await supabase.from('videos').update({ status: newStatus }).eq('id', id);
  if (error) return { error: 'Erro ao atualizar status.' };
  revalidatePath('/admin/videos');
  return { success: true };
}

// ============================================
// Configuracoes
// ============================================

export async function atualizarConfiguracao(id: string, valor: string) {
  try { await requireAuth(); } catch { return { error: 'Não autenticado.' }; }
  if (!isValidUUID(id)) return { error: 'ID inválido.' };

  const supabase = getAdmin();
  const sanitized = sanitize(valor);
  const { error } = await supabase.from('configuracoes').update({ valor: sanitized }).eq('id', id);
  if (error) return { error: 'Erro ao salvar configuração.' };
  revalidatePath('/admin/configuracoes');
  return { success: true };
}

// ============================================
// Leads (Captação) — Rate Limiting via IP
// ============================================

const leadRateLimit = new Map<string, { count: number; resetAt: number }>();
const LEAD_MAX_SUBMISSIONS = 3;
const LEAD_WINDOW_MS = 60 * 60 * 1000; // 1 hora

function checkLeadRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = leadRateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    leadRateLimit.set(ip, { count: 1, resetAt: now + LEAD_WINDOW_MS });
    return true;
  }

  if (entry.count >= LEAD_MAX_SUBMISSIONS) {
    return false;
  }

  entry.count++;
  return true;
}

export async function criarLead(formData: {
  nome: string;
  whatsapp: string;
  email: string;
  bairro: string;
  cidade: string;
  ip?: string;
}) {
  const ip = formData.ip || 'unknown';
  if (!checkLeadRateLimit(ip)) {
    return { error: 'Limite de envios atingido. Tente novamente mais tarde.' };
  }

  const nome = sanitize(formData.nome);
  const whatsapp = sanitize(formData.whatsapp);
  const email = sanitize(formData.email);
  const bairro = sanitize(formData.bairro);
  const cidade = sanitize(formData.cidade);

  if (!nome || !whatsapp) {
    return { error: 'Nome e WhatsApp são obrigatórios.' };
  }

  if (nome.length > 200 || whatsapp.length > 20) {
    return { error: 'Dados excedem o tamanho permitido.' };
  }

  const supabase = getAdmin();
  const { error } = await supabase.from('leads').insert({
    nome,
    whatsapp,
    email: email || null,
    bairro: bairro || null,
    cidade: cidade || null,
  });

  if (error) return { error: 'Erro ao salvar lead.' };
  return { success: true };
}

export async function excluirLead(id: string) {
  try { await requireAuth(); } catch { return { error: 'Não autenticado.' }; }
  if (!isValidUUID(id)) return { error: 'ID inválido.' };

  const supabase = getAdmin();
  const { error } = await supabase.from('leads').delete().eq('id', id);
  if (error) return { error: 'Erro ao excluir lead.' };
  revalidatePath('/admin/leads');
  return { success: true };
}

// ============================================
// Agenda (Eventos)
// ============================================

export async function criarCompromisso(formData: {
  titulo: string;
  descricao: string;
  data_hora: string;
  local: string;
  status: string;
}) {
  try { await requireAuth(); } catch { return { error: 'Não autenticado.' }; }
  const supabase = getAdmin();

  const titulo = sanitize(formData.titulo);
  const descricao = sanitize(formData.descricao);
  const local = sanitize(formData.local);
  const status = formData.status === 'publicado' ? 'publicado' : 'rascunho';

  if (!titulo || !formData.data_hora) {
    return { error: 'Título e data/hora são obrigatórios.' };
  }

  const { error } = await supabase.from('agenda').insert({
    titulo,
    descricao: descricao || null,
    data_hora: formData.data_hora,
    local: local || null,
    status,
  });

  if (error) return { error: 'Erro ao salvar compromisso.' };
  revalidatePath('/admin/agenda');
  revalidatePath('/');
  return { success: true };
}

export async function excluirCompromisso(id: string) {
  try { await requireAuth(); } catch { return { error: 'Não autenticado.' }; }
  if (!isValidUUID(id)) return { error: 'ID inválido.' };

  const supabase = getAdmin();
  const { error } = await supabase.from('agenda').delete().eq('id', id);
  if (error) return { error: 'Erro ao excluir compromisso.' };
  revalidatePath('/admin/agenda');
  revalidatePath('/');
  return { success: true };
}

export async function toggleStatusCompromisso(id: string) {
  try { await requireAuth(); } catch { return { error: 'Não autenticado.' }; }
  if (!isValidUUID(id)) return { error: 'ID inválido.' };

  const supabase = getAdmin();

  const { data: compromisso, error: fetchError } = await supabase
    .from('agenda')
    .select('status')
    .eq('id', id)
    .single();

  if (fetchError || !compromisso) return { error: 'Compromisso não encontrado.' };

  const newStatus = compromisso.status === 'publicado' ? 'rascunho' : 'publicado';
  const { error } = await supabase.from('agenda').update({ status: newStatus }).eq('id', id);
  if (error) return { error: 'Erro ao atualizar status.' };
  revalidatePath('/admin/agenda');
  revalidatePath('/');
  return { success: true };
}

// ============================================
// Galeria Fotos
// ============================================

export async function adicionarFotosAlbum(
  albumId: string,
  fotos: { url: string; legenda?: string }[]
) {
  try { await requireAuth(); } catch { return { error: 'Não autenticado.' }; }
  if (!isValidUUID(albumId)) return { error: 'ID do álbum inválido.' };

  const supabase = getAdmin();

  const { data: existing, error: countError } = await supabase
    .from('galeria_fotos')
    .select('ordem', { count: 'exact' })
    .eq('album_id', albumId)
    .order('ordem', { ascending: false })
    .limit(1);

  if (countError) return { error: 'Erro ao verificar fotos existentes.' };

  const startOrder = existing && existing.length > 0 ? existing[0].ordem + 1 : 0;

  const rows = fotos.map((foto, i) => ({
    album_id: albumId,
    url: foto.url,
    legenda: foto.legenda ? sanitize(foto.legenda) : null,
    ordem: startOrder + i,
  }));

  const { error } = await supabase.from('galeria_fotos').insert(rows);
  if (error) return { error: 'Erro ao salvar fotos.' };

  revalidatePath(`/admin/galeria/${albumId}/fotos`);
  revalidatePath('/admin/galeria');
  return { success: true };
}

export async function excluirFotoAlbum(fotoId: string) {
  try { await requireAuth(); } catch { return { error: 'Não autenticado.' }; }
  if (!isValidUUID(fotoId)) return { error: 'ID inválido.' };

  const supabase = getAdmin();

  const { data: foto, error: fetchError } = await supabase
    .from('galeria_fotos')
    .select('album_id')
    .eq('id', fotoId)
    .single();

  if (fetchError || !foto) return { error: 'Foto não encontrada.' };

  const { error } = await supabase.from('galeria_fotos').delete().eq('id', fotoId);
  if (error) return { error: 'Erro ao excluir foto.' };

  revalidatePath(`/admin/galeria/${foto.album_id}/fotos`);
  revalidatePath('/admin/galeria');
  return { success: true };
}

export async function atualizarCapaAlbum(albumId: string, coverUrl: string) {
  try { await requireAuth(); } catch { return { error: 'Não autenticado.' }; }
  if (!isValidUUID(albumId)) return { error: 'ID inválido.' };

  const supabase = getAdmin();
  const { error } = await supabase
    .from('galeria_albuns')
    .update({ cover_url: coverUrl })
    .eq('id', albumId);

  if (error) return { error: 'Erro ao atualizar capa.' };
  revalidatePath(`/admin/galeria/${albumId}/fotos`);
  revalidatePath('/admin/galeria');
  return { success: true };
}

// ============================================
// Edição (UPDATE)
// ============================================

export async function editarProjeto(
  id: string,
  formData: {
    titulo: string;
    slug: string;
    resumo: string;
    descricao: string;
    categoria: string;
    share_text: string;
    status: string;
  }
) {
  try { await requireAuth(); } catch { return { error: 'Não autenticado.' }; }
  if (!isValidUUID(id)) return { error: 'ID inválido.' };

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

  const { error } = await supabase
    .from('projetos')
    .update({ titulo, slug, resumo, descricao, categoria, share_text, status })
    .eq('id', id);

  if (error) return { error: 'Erro ao atualizar projeto.' };
  revalidatePath('/admin/projetos');
  revalidatePath('/');
  return { success: true };
}

export async function editarAlbum(
  id: string,
  formData: {
    titulo: string;
    descricao: string;
    categoria: string;
    status: string;
  }
) {
  try { await requireAuth(); } catch { return { error: 'Não autenticado.' }; }
  if (!isValidUUID(id)) return { error: 'ID inválido.' };

  const supabase = getAdmin();

  const titulo = sanitize(formData.titulo);
  const descricao = sanitize(formData.descricao);
  const categoria = sanitize(formData.categoria);
  const status = formData.status === 'publicado' ? 'publicado' : 'rascunho';

  if (!titulo || !categoria) {
    return { error: 'Campos obrigatórios não preenchidos.' };
  }

  const { error } = await supabase
    .from('galeria_albuns')
    .update({ titulo, descricao, categoria, status })
    .eq('id', id);

  if (error) return { error: 'Erro ao atualizar álbum.' };
  revalidatePath('/admin/galeria');
  return { success: true };
}

export async function editarVideo(
  id: string,
  formData: {
    titulo: string;
    descricao: string;
    youtube_url: string;
    album_id: string;
    categoria: string;
    status: string;
  }
) {
  try { await requireAuth(); } catch { return { error: 'Não autenticado.' }; }
  if (!isValidUUID(id)) return { error: 'ID inválido.' };

  const supabase = getAdmin();

  const titulo = sanitize(formData.titulo);
  const descricao = sanitize(formData.descricao);
  const youtube_url = formData.youtube_url.trim();
  const categoria = sanitize(formData.categoria);
  const status = formData.status === 'publicado' ? 'publicado' : 'rascunho';

  if (!titulo || !categoria || !validateYouTubeUrl(youtube_url)) {
    return { error: 'Campos obrigatórios inválidos.' };
  }

  if (!formData.album_id || !isValidUUID(formData.album_id)) {
    return { error: 'Selecione um álbum válido.' };
  }

  const { error } = await supabase
    .from('videos')
    .update({ titulo, descricao, youtube_url, album_id: formData.album_id, categoria, status })
    .eq('id', id);

  if (error) return { error: 'Erro ao atualizar vídeo.' };
  revalidatePath('/admin/videos');
  return { success: true };
}

export async function editarCompromisso(
  id: string,
  formData: {
    titulo: string;
    descricao: string;
    data_hora: string;
    local: string;
    status: string;
  }
) {
  try { await requireAuth(); } catch { return { error: 'Não autenticado.' }; }
  if (!isValidUUID(id)) return { error: 'ID inválido.' };

  const supabase = getAdmin();

  const titulo = sanitize(formData.titulo);
  const descricao = sanitize(formData.descricao);
  const local = sanitize(formData.local);
  const status = formData.status === 'publicado' ? 'publicado' : 'rascunho';

  if (!titulo || !formData.data_hora) {
    return { error: 'Título e data/hora são obrigatórios.' };
  }

  const { error } = await supabase
    .from('agenda')
    .update({
      titulo,
      descricao: descricao || null,
      data_hora: formData.data_hora,
      local: local || null,
      status,
    })
    .eq('id', id);

  if (error) return { error: 'Erro ao atualizar compromisso.' };
  revalidatePath('/admin/agenda');
  revalidatePath('/');
  return { success: true };
}
