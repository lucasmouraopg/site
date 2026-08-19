import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProjetoBySlug, getAllProjetoSlugs } from '@/lib/supabase-server';
import ProjetoContent from '@/components/sections/ProjetoContent';

export async function generateStaticParams() {
  const slugs = await getAllProjetoSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const projeto = await getProjetoBySlug(slug);
    return {
      title: `${projeto.titulo} | Lucas Mourão`,
      description: projeto.resumo,
      openGraph: {
        title: projeto.titulo,
        description: projeto.resumo,
        type: 'article',
      },
    };
  } catch {
    return { title: 'Projeto não encontrado' };
  }
}

export default async function ProjetoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projeto = await getProjetoBySlug(slug).catch(() => null);
  if (!projeto) notFound();
  return <ProjetoContent projeto={projeto} />;
}
