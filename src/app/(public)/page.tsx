import Hero from '@/components/sections/Hero';
import Biografia from '@/components/sections/Biografia';
import PraiaGrande from '@/components/sections/PraiaGrande';
import GaleriaEventos from '@/components/sections/GaleriaEventos';
import RedesSociais from '@/components/sections/RedesSociais';
import Agenda from '@/components/sections/Agenda';
import Newsletter from '@/components/sections/Newsletter';
import { getProjetos } from '@/lib/supabase';

export default async function Home() {
  const projetos = await getProjetos();

  return (
    <>
      <Hero />
      <Biografia />
      <PraiaGrande projetos={projetos} />
      {/* TODO: Seção de Notícias — reservado para futuro */}
      <GaleriaEventos />
      <RedesSociais />
      <Agenda />
      <Newsletter />
    </>
  );
}
