import type { MetadataRoute } from 'next';
import { projetos } from '@/data/projetos';
import { getGaleriaAlbuns } from '@/lib/supabase-server';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lucasmourao.com.br';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/galeria`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/galeria/fotos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/galeria/videos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/agenda`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/redes-sociais`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/projetos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacidade`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/termos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  const projetoPages: MetadataRoute.Sitemap = projetos.map((projeto) => ({
    url: `${baseUrl}/projetos/${projeto.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  let galeriaPages: MetadataRoute.Sitemap = [];
  try {
    const albuns = await getGaleriaAlbuns();
    galeriaPages = albuns.map((album) => ({
      url: `${baseUrl}/galeria/${album.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch {
    // fallback: no dynamic album pages
  }

  return [...staticPages, ...projetoPages, ...galeriaPages];
}
