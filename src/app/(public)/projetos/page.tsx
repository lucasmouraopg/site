import Link from 'next/link';
import { getProjetos, type Projeto } from '@/lib/supabase';

export default async function ProjetosPage() {
  let projetos: Projeto[] = [];
  try {
    projetos = await getProjetos();
  } catch {
    projetos = [];
  }

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-8"
        >
          ← Voltar
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Projetos</h1>
        <p className="text-gray-500 mb-10">Conheça os projetos que transformaram Praia Grande.</p>

        {projetos.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p>Nenhum projeto publicado ainda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projetos.map((projeto) => (
              <Link
                key={projeto.slug}
                href={`/projetos/${projeto.slug}`}
                className="group"
              >
                <div className="h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden shrink-0">
                    <div
                      className="w-full h-full bg-cover bg-center bg-no-repeat transform group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url(${projeto.fotos[0]})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                        {projeto.categoria}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {projeto.titulo}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4">{projeto.resumo}</p>
                    <div className="mt-auto flex items-center text-blue-600 font-semibold text-sm">
                      <span>Saiba mais</span>
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
