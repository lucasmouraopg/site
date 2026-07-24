'use client';

import type { Video } from '@/lib/supabase';

interface Props {
  videos: Video[];
}

function extractYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === 'youtu.be') return parsed.pathname.slice(1);
    return parsed.searchParams.get('v');
  } catch {
    return null;
  }
}

export default function VideosGrid({ videos }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {videos.map((video) => {
        const ytId = extractYouTubeId(video.youtube_url);
        return (
          <div key={video.id}>
            {ytId ? (
              <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100">
                <iframe
                  src={`https://www.youtube.com/embed/${ytId}`}
                  title={video.titulo}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="aspect-video rounded-2xl bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Video indisponivel</span>
              </div>
            )}
            <h3 className="font-semibold text-gray-900 mt-3">{video.titulo}</h3>
            {video.descricao && (
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{video.descricao}</p>
            )}
            <span className="inline-block mt-2 text-[10px] font-semibold uppercase tracking-wider text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {video.categoria}
            </span>
          </div>
        );
      })}
    </div>
  );
}
