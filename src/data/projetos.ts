export interface Projeto {
  slug: string;
  titulo: string;
  resumo: string;
  descricao: string;
  categoria: string;
  fotos: string[];
  shareText: string;
}

export const projetos: Projeto[] = [
  {
    slug: 'portinho',
    titulo: 'Revitalização do Portinho',
    resumo: 'Mais vida, mais lazer e beleza para todos!',
    descricao:
      'O projeto de revitalização do Portinho transformou um espaço antes degradado em um dos pontos turísticos mais admirados de Praia Grande. Com investimento em infraestrutura, paisagismo e acessibilidade, a região ganhou nova vida, atraindo moradores e turistas que agora desfrutam de uma área de lazer segura, bonita e integrada ao restante da orla da cidade.',
    categoria: 'Infraestrutura',
    fotos: ['/assets/images/projetos/portinho-1.jpg'],
    shareText:
      'SE LIGA NO PROJETO Revitalização do Portinho QUE O LUCAS MOURÃO LIDEROU AQUI NA PG',
  },
  {
    slug: 'pronto-atendimento-pet',
    titulo: 'Pronto Atendimento PET',
    resumo: 'Cuidado rápido e gratuito para os PETS.',
    descricao:
      'O Pronto Atendimento PET foi criado para oferecer atendimento de emergência e primeiros socorros aos animais de estimação dos moradores de Praia Grande. O projeto garante cuidado rápido, gratuito e humanizado, preenchendo uma lacuna importante na infraestrutura municipal e demonstrando o compromisso da gestão com o bem-estar de todas as formas de vida na cidade.',
    categoria: 'Social',
    fotos: ['/assets/images/projetos/pet-1.jpg'],
    shareText:
      'SE LIGA NO PROJETO Pronto Atendimento PET QUE O LUCAS MOURÃO LIDEROU AQUI NA PG',
  },
  {
    slug: 'maratona-internacional',
    titulo: '1ª Maratona Internacional',
    resumo: 'Praia Grande no ritmo do mundo.',
    descricao:
      'A primeira Maratona Internacional de Praia Grande posicionou a cidade no mapa do esporte mundial. O evento reuniu atletas de diversos países e estados, gerando turismo, visibilidade e orgulho para a população. além de promover a prática de atividades físicas e o estilo de vida saudável entre os moradores.',
    categoria: 'Esporte',
    fotos: ['/assets/images/projetos/maratona-1.jpg'],
    shareText:
      'SE LIGA NO PROJETO 1ª Maratona Internacional QUE O LUCAS MOURÃO LIDEROU AQUI NA PG',
  },
  {
    slug: 'abrigo-solidario',
    titulo: 'Abrigo Solidário',
    resumo: 'Cuidado e Acolhimento que transformam vidas!',
    descricao:
      'O Abrigo Solidário é um projeto de assistência social que oferece abrigo, alimentação e acompanhamento a pessoas em situação de vulnerabilidade. O projeto humaniza o atendimento e promove a inclusão social, contribuindo diretamente para a redução da marginalidade e da marginalização na cidade.',
    categoria: 'Social',
    fotos: ['/assets/images/projetos/abrigo-1.jpg'],
    shareText:
      'SE LIGA NO PROJETO Abrigo Solidário QUE O LUCAS MOURÃO LIDEROU AQUI NA PG',
  },
  {
    slug: 'parque-ribeiropolis',
    titulo: 'Parque Ribeirópolis',
    resumo: 'Lazer, natureza e bem-estar para todos!',
    descricao:
      'O Parque Ribeirópolis é um espaço de lazer e convivência que oferece áreas verdes, quadras esportivas, brinquedos e equipamentos para prática de atividades físicas. O projeto valoriza a qualidade de vida dos moradores e fortalece o senso de comunidade, tornando-se um dos principais pontos de encontro da cidade.',
    categoria: 'Lazer',
    fotos: ['/assets/images/projetos/parque-1.jpg'],
    shareText:
      'SE LIGA NO PROJETO Parque Ribeirópolis QUE O LUCAS MOURÃO LIDEROU AQUI NA PG',
  },
  {
    slug: 'estacao-verao',
    titulo: 'Estação Verão',
    resumo: '450 mil pessoas reunidas em diversão e energia!',
    descricao:
      'A Estação Verão é o maior evento de entretenimento da região, atraindo mais de 450 mil pessoas ao longo dos meses de verão. Com shows, atrações culturais, gastronomia e atividades para todas as idades, o evento gera economia, emprego e uma identidade cultural forte para Praia Grande.',
    categoria: 'Eventos',
    fotos: ['/assets/images/projetos/verao-1.jpg'],
    shareText:
      'SE LIGA NO PROJETO Estação Verão QUE O LUCAS MOURÃO LIDEROU AQUI NA PG',
  },
];

export function getProjetoBySlug(slug: string): Projeto | undefined {
  return projetos.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return projetos.map((p) => p.slug);
}
