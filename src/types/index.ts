// Database types (canonical source)
export interface GaleriaAlbum {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  cover_url: string;
  fotos_count: number;
  status: 'publicado' | 'rascunho';
  criado_em: string;
}

export interface GaleriaFoto {
  id: string;
  album_id: string;
  url: string;
  legenda: string;
  ordem: number;
}

export interface Video {
  id: string;
  titulo: string;
  descricao: string;
  youtube_url: string;
  thumbnail_url: string;
  album_id: string | null;
  categoria: string;
  ordem: number;
  status: 'publicado' | 'rascunho';
  criado_em: string;
}

export interface RedeSocial {
  id: string;
  plataforma: string;
  url: string;
  icone: string;
  ordem: number;
  ativo: boolean;
}

export interface Configuracao {
  id: string;
  chave: string;
  valor: string;
  atualizado_em: string;
}

export interface Projeto {
  id: string;
  slug: string;
  titulo: string;
  resumo: string;
  descricao: string;
  categoria: string;
  fotos: string[];
  share_text: string;
  ordem: number;
  status: 'publicado' | 'rascunho';
  criado_em: string;
  atualizado_em: string;
}
