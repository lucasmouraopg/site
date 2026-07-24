import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termos de Uso | Lucas Mourão',
  description:
    'Termos de Uso do site lucasmourao.com.br — Condições gerais de uso do site institucional.',
};

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-8"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Voltar
        </Link>

        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Termos de Uso
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            Última atualização: 23 de julho de 2026.
          </p>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
            <p>
              Bem-vindo ao site{' '}
              <a
                href="https://www.lucasmourao.com.br"
                className="text-blue-600 hover:underline"
              >
                lucasmourao.com.br
              </a>
              . Ao acessar e utilizar este site, você concorda com os presentes
              Termos de Uso. Caso não concorde com algum dos termos aqui
              apresentados, recomendamos que não utilize o site.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8">
              1. Objeto
            </h2>
            <p>
              O site{' '}
              <a
                href="https://www.lucasmourao.com.br"
                className="text-blue-600 hover:underline"
              >
                lucasmourao.com.br
              </a>{' '}
              é uma plataforma institucional de caráter informativo, destinada a
              apresentar a trajetória política e pública de Lucas Mourão,
              candidato a Deputado Estadual por São Paulo nas eleições de 2026,
              bem como os projetos desenvolvidos em favor da comunidade de Praia
              Grande.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8">
              2. Aceitação dos Termos
            </h2>
            <p>
              O uso do site implica na aceitação integral e irrestrita dos
              presentes Termos de Uso. O sebastian mourão reserva-se o direito
              de alterar estes termos a qualquer momento, sendo responsabilidade
              do usuário verificar periodicamente as condições vigentes.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8">
              3. Propriedade Intelectual
            </h2>
            <p>
              Todo o conteúdo disponibilizado neste site — incluindo, mas não se
              limitando a textos, imagens, gráficos, logotipos, ícones, vídeos e
              código-fonte — é de propriedade de Lucas Mourão ou de terceiros
              que autorizaram seu uso, sendo protegido pelas leis de propriedade
              intelectual da República Federativa do Brasil.
            </p>
            <p>
              É vedada a reprodução, distribuição, modificação, transmissão ou
              qualquer forma de exploração do conteúdo, total ou parcialmente,
              para quaisquer fins, sem autorização prévia e expressa.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8">
              4. Uso do Site
            </h2>
            <p>
              O usuário se compromete a utilizar o site em conformidade com a
              legislação brasileira e os presentes Termos. É proibido o uso do
              site para:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Qualquer finalidade ilícita, contrária à boa-fé, à ordem pública
                ou às boas práticas;
              </li>
              <li>
                Praticar atos que causem danos a terceiros ou que comprometam a
                integridade do site;
              </li>
              <li>
                Introduzir vírus, worm, trojan ou qualquer software malicioso
                que possa comprometer o funcionamento do site;
              </li>
              <li>
                Tentar acessar, manipular ou alterar sistemas, redes ou dados
                sem autorização;
              </li>
              <li>
                Utilizar o site para fins publicitários não autorizados, incluindo
                envio de spam ou comunicações em massa.
              </li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mt-8">
              5. Links Externos
            </h2>
            <p>
              O site pode conter links para sites de terceiros. Esses links são
              fornecidos apenas para conveniência do usuário, e Lucas Mourão não
              se responsabiliza pelo conteúdo, práticas de privacidade ou
              funcionamento de sites externos. O acesso a sites de terceiros é
              por conta e risco do usuário.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8">
              6. Disponibilidade e Manutenção
            </h2>
            <p>
              O site é disponibilizado &quot;como está&quot; (as is) e &quot;conforme
              disponível&quot; (as available). Lucas Mourão não garante a
              disponibilidade ininterrupta do site e reserva-se o direito de
              realizá-lo temporariamente para manutenções programadas ou
              imprevistas, sem aviso prévio.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8">
              7. Isenção de Responsabilidade
            </h2>
            <p>
              Na máxima extensão permitida pela legislação aplicável, Lucas
              Mourão não será responsável por quaisquer danos diretos, indiretos,
              incidentais, especiais ou consequenciais decorrentes do uso ou
              impossibilidade de uso do site, incluindo mas não se limitando a
              perda de dados, interrupção de negócios ou outros prejuízos
              econômicos.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8">
              8. Proteção de Dados
            </h2>
            <p>
              O tratamento de dados pessoais no site é regido pela nossa{' '}
              <Link
                href="/privacidade"
                className="text-blue-600 hover:underline"
              >
                Política de Privacidade
              </Link>
              , em conformidade com a Lei Geral de Proteção de Dados (Lei nº
              13.709/2018). Ao utilizar o site, você também concorda com as
              práticas descritas na Política de Privacidade.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8">
              9. Foro e Legislação Aplicável
            </h2>
            <p>
              Os presentes Termos de Uso são regidos pela legislação da República
              Federativa do Brasil. Fica eleito o foro da Comarca de Praia
              Grande, Estado de São Paulo, para dirimir quaisquer questões
              oriundas da interpretação ou execução destes termos, com renúncia
              expressa a qualquer outro, por mais privilegiado que seja.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8">
              10. Alterações nestes Termos
            </h2>
            <p>
              Lucas Mourão reserva-se o direito de modificar estes Termos de Uso a
              qualquer momento, sem aviso prévio. As alterações entrarão em vigor
              imediatamente após a publicação na página do site. O uso contínuo
              do site após as alterações constitui aceitação das novas condições.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8">
              11. Contato
            </h2>
            <p>
              Em caso de dúvidas sobre estes Termos de Uso, entre em contato
              pelo e-mail:{' '}
              <a
                href="mailto:contato@lucasmourao.com.br"
                className="text-blue-600 hover:underline"
              >
                contato@lucasmourao.com.br
              </a>
            </p>

            <div className="bg-gray-50 rounded-xl p-6 mt-8">
              <p className="text-sm text-gray-600">
                <strong>Última atualização:</strong> Estes Termos de Uso foram
                atualizados em 23 de julho de 2026.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
