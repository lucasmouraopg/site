import Link from 'next/link';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

async function getStats() {
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

  const [projetos, albuns, fotos, videos, leads, agenda] = await Promise.all([
    supabase.from('projetos').select('*', { count: 'exact', head: true }),
    supabase.from('galeria_albuns').select('*', { count: 'exact', head: true }),
    supabase.from('galeria_fotos').select('*', { count: 'exact', head: true }),
    supabase.from('videos').select('*', { count: 'exact', head: true }),
    supabase.from('leads').select('*', { count: 'exact', head: true }),
    supabase.from('agenda').select('*', { count: 'exact', head: true }),
  ]);

  return {
    projetos: projetos.count || 0,
    albuns: albuns.count || 0,
    fotos: fotos.count || 0,
    videos: videos.count || 0,
    leads: leads.count || 0,
    agenda: agenda.count || 0,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Projetos</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">{stats.projetos}</p>
          <Link href="/admin/projetos" className="mt-4 inline-block text-sm text-blue-600 hover:underline">
            Gerenciar →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Álbuns</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">{stats.albuns}</p>
          <Link href="/admin/galeria" className="mt-4 inline-block text-sm text-blue-600 hover:underline">
            Gerenciar →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Fotos</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">{stats.fotos}</p>
          <Link href="/admin/galeria" className="mt-4 inline-block text-sm text-blue-600 hover:underline">
            Gerenciar →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Vídeos</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">{stats.videos}</p>
          <Link href="/admin/videos" className="mt-4 inline-block text-sm text-blue-600 hover:underline">
            Gerenciar →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Leads</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">{stats.leads}</p>
          <Link href="/admin/leads" className="mt-4 inline-block text-sm text-blue-600 hover:underline">
            Gerenciar →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Agenda</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">{stats.agenda}</p>
          <Link href="/admin/agenda" className="mt-4 inline-block text-sm text-blue-600 hover:underline">
            Gerenciar →
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Ações Rápidas</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/galeria/novo"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Novo Álbum
          </Link>
          <Link
            href="/admin/galeria/adicionar-foto"
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Adicionar Foto
          </Link>
          <Link
            href="/admin/videos/novo"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Novo Vídeo
          </Link>
          <Link
            href="/admin/agenda/novo"
            className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
          >
            Novo Compromisso
          </Link>
        </div>
      </div>
    </div>
  );
}
