import type { MetadataRoute } from 'next';
import { projetos } from '@/data/projetos';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lucasmourao.com.br';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
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

  return [...staticPages, ...projetoPages];
}
