import Hero from '@/components/sections/Hero';
import Biografia from '@/components/sections/Biografia';
import PraiaGrande from '@/components/sections/PraiaGrande';
import RedesSociais from '@/components/sections/RedesSociais';
import { getProjetos } from '@/lib/supabase';

export default async function Home() {
  const projetos = await getProjetos();

  return (
    <>
      <Hero />
      <Biografia />
      <PraiaGrande projetos={projetos} />
      <RedesSociais />
    </>
  );
}
