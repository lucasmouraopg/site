import Link from 'next/link';
import { getAllVideos } from '@/lib/supabase-server';
import type { Video } from '@/lib/supabase-server';
import VideosGrid from './VideosGrid';

export default async function VideosPage() {
  let videos: Video[] = [];

  try {
    videos = await getAllVideos();
  } catch {
    videos = [];
  }

  return (
    <section className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/galeria" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-8">
          ← Voltar a Galeria
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Todos os Videos</h1>
        <p className="text-gray-500 mb-10">{videos.length} {videos.length === 1 ? 'video' : 'videos'} publicados.</p>

        {videos.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p>Nenhum video publicado ainda.</p>
          </div>
        ) : (
          <VideosGrid videos={videos} />
        )}
      </div>
    </section>
  );
}
