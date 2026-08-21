import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Video } from '@/lib/supabase';
import VideosTableClient from './VideosTableClient';

async function getVideos(): Promise<Video[]> {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set() {},
        remove() {},
      },
    }
  );

  const { data } = await supabase
    .from('videos')
    .select('*')
    .order('ordem', { ascending: true })
    .limit(500);

  return (data ?? []) as Video[];
}

export default async function VideosPage() {
  const videos = await getVideos();
  return <VideosTableClient videos={videos} />;
}
