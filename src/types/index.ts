// Site types
export interface SiteConfig {
  heroHeadline: string;
  heroSubheadline: string;
  heroCta: string;
  heroImageDesktop: string;
  heroImageMobile: string;
  bioTitle: string;
  bioText: string;
  bioImage: string;
  bioCta: string;
  whatsappLink: string;
  instagramLink: string;
  facebookLink: string;
  tiktokLink: string;
  linkedinLink: string;
  siteLink: string;
}

// Weather types
export interface WeatherData {
  city: string;
  temp: number;
  description: string;
  icon: string;
}

// Gallery types
export interface Album {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  cover_url: string;
  fotos_count: number;
  fotos: Foto[];
}

export interface Foto {
  id: string;
  url: string;
  legenda: string;
}

// Video types
export interface VideoItem {
  id: string;
  titulo: string;
  descricao: string;
  youtube_url: string;
  thumbnail_url: string;
  categoria: string;
}

// Timeline types
export interface TimelineItem {
  id: string;
  empresa: string;
  cargo: string;
  descricao: string;
  imagem_url: string;
  logo_url: string;
  ano_inicio: string;
  ano_fim: string;
}
