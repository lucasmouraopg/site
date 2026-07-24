import Hero from '@/components/sections/Hero';
import Biografia from '@/components/sections/Biografia';
import GaleriaEventos from '@/components/sections/GaleriaEventos';
import PraiaGrande from '@/components/sections/PraiaGrande';
import RedesSociais from '@/components/sections/RedesSociais';
import CaptacaoEngajamento from '@/components/sections/CaptacaoEngajamento';
import { getProjetos } from '@/lib/supabase';

export default async function Home() {
  const projetos = await getProjetos();

  return (
    <>
      <Hero />
      <Biografia />
      <GaleriaEventos />
      <PraiaGrande projetos={projetos} />
      <RedesSociais />
      <CaptacaoEngajamento />
    </>
  );
}
