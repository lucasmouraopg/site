import Link from 'next/link';
import { getAllFotos } from '@/lib/supabase-server';
import type { GaleriaFoto } from '@/lib/supabase-server';
import FotosGrid from './FotosGrid';

export default async function FotosPage() {
  let fotos: GaleriaFoto[] = [];

  try {
    fotos = await getAllFotos();
  } catch {
    fotos = [];
  }

  return (
    <section className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/galeria" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-8">
          ← Voltar a Galeria
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Todas as Fotos</h1>
        <p className="text-gray-500 mb-10">{fotos.length} {fotos.length === 1 ? 'foto' : 'fotos'} no acervo.</p>

        {fotos.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p>Nenhuma foto publicada ainda.</p>
          </div>
        ) : (
          <FotosGrid fotos={fotos} />
        )}
      </div>
    </section>
  );
}
