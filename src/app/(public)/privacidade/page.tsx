import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade | Lucas Mourão',
  description:
    'Política de Privacidade do site lucasmourao.com.br — Transparência no tratamento de dados pessoais conforme a LGPD.',
};

export default function PrivacidadePage() {
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
            Política de Privacidade
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            Última atualização: 23 de julho de 2026.
          </p>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
            <p>
              A sua privacidade é importante para nós. É política do Lucas Mourão
              respeitar a sua privacidade em relação a qualquer informação sua
              que possamos coletar no site{' '}
              <a
                href="https://www.lucasmourao.com.br"
                className="text-blue-600 hover:underline"
              >
                lucasmourao.com.br
              </a>{' '}
              e outros sites que possuímos e operamos.
            </p>

            <p>
              Solicitamos informações pessoais apenas quando realmente
              precisamos delas para lhe fornecer um serviço. Fazemo-lo por
              meios justos e legais, com o seu conhecimento e consentimento.
              Também informamos por que estamos coletando e como será usado.
            </p>

            <p>
              Apenas retemos as informações coletadas pelo tempo necessário para
              fornecer o serviço solicitado. Quando armazenamos dados, protegemos
              dentro de meios comercialmente aceitáveis para evitar perdas e
              roubos, bem como acesso, divulgação, cópia, uso ou modificação não
              autorizados.
            </p>

            <p>
              Não compartilhamos informações de identificação pessoal publicamente
              ou com terceiros, exceto quando exigido por lei.
            </p>

            <p>
              O nosso site pode ter links para sites externos que não são
              operados por nós. Esteja ciente de que não temos controle sobre o
              conteúdo e práticas desses sites, e não podemos aceitar
              responsabilidade por suas respectivas políticas de privacidade.
            </p>

            <p>
              O uso continuado do nosso site será considerado como aceitação das
              nossas práticas em relação à privacidade e informações pessoais.
              Se você tiver alguma dúvida sobre como os dados de usuários e
              visitantes são tratados pelo site{' '}
              <a
                href="https://www.lucasmourao.com.br"
                className="text-blue-600 hover:underline"
              >
                lucasmourao.com.br
              </a>{' '}
              ou outros documentos, entre em contato conosco.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8">
              Compromisso do Usuário
            </h2>

            <p>
              O usuário se compromete a fazer uso adequado dos conteúdos e da
              informação oferecidos no site, em conformidade com a legislação
              brasileira, e se compromete a não utilizar o site para:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                Praticar quaisquer atos ilícitos, contrários à boa-fé, à ordem
                pública ou às boas práticas, causando danos aos direitos de
                terceiros.
              </li>
              <li>
                Divulgar conteúdo de caráter discriminatório, preconceituoso,
                obsceno, ameaçador ou de terror.
              </li>
              <li>
                Realizar ações para obter e/ou utilizar conteúdos ilícitos,
                violando direitos de propriedade intelectual.
              </li>
              <li>
                Utilizar o site para enviar comunicações de caráter publicitário
                não autorizado (spam).
              </li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mt-8">
              Cookies e Tecnologias de Rastreamento
            </h2>

            <p>
              O site{' '}
              <a
                href="https://www.lucasmourao.com.br"
                className="text-blue-600 hover:underline"
              >
                lucasmourao.com.br
              </a>{' '}
              pode utilizar cookies e tecnologias semelhantes para melhorar a
              experiência do usuário, analytics e funcionalidade. O uso de cookies
              é realizado em conformidade com a Lei Geral de Proteção de Dados
              (Lei nº 13.709/2018).
            </p>

            <p>
              O Consentimento do titular dos dados será obtido de forma clara e
              acessível antes do uso de qualquer cookie não essencial, conforme
              Art. 7º, IX e Art. 8º da LGPD.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8">
              Direitos do Titular dos Dados (LGPD)
            </h2>

            <p>
              Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018),
              você, como titular dos dados, tem direito a:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Confirmação da existência de tratamento</strong> — direito
                de saber se seus dados estão sendo tratados.
              </li>
              <li>
                <strong>Acesso aos dados</strong> — direito de acessar seus dados
                pessoais armazenados.
              </li>
              <li>
                <strong>Correção de dados incompletos ou desatualizados</strong> —
                direito de solicitar a correção de dados incorretos.
              </li>
              <li>
                <strong>Anonimização, bloqueio ou eliminação</strong> — direito
                de solicitar a remoção de dados desnecessários.
              </li>
              <li>
                <strong>Portabilidade dos dados</strong> — direito de solicitar a
                transferência de seus dados a outro fornecedor.
              </li>
              <li>
                <strong>Eliminação dos dados tratados com consentimento</strong> —
                direito de solicitar a exclusão de seus dados.
              </li>
              <li>
                <strong>Informação sobre compartilhamento</strong> — direito de
                saber com quem seus dados foram compartilhados.
              </li>
              <li>
                <strong>Revogação do consentimento</strong> — direito de revogar
                o consentimento a qualquer momento.
              </li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mt-8">
              Coleta e Uso de Dados
            </h2>

            <p>
              Os dados pessoais são coletados apenas com o consentimento do
              titular, conforme Art. 7º, I da LGPD. Não realizamos coleta de dados
              sem o consentimento do titular, exceto nas hipóteses previstas no
              Art. 7º, II a IX da LGPD.
            </p>

            <p>
              Não realizamos decisões automatizadas com base em dados pessoais que
              produzam efeitos jurídicos ou significativos para os titulares, sem
              supervisão humana adequada. Caso esse tipo de tratamento seja
              necessário, será solicitado consentimento específico, conforme Art.
              20 da LGPD.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8">
              Retenção de Dados
            </h2>

            <p>
              Os dados pessoais serão retidos apenas pelo tempo necessário para
              cumprir as finalidades para as quais foram coletados, salvo quando
              houver obrigação legal ou regulatória de retenção, conforme Art. 16
              da LGPD.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8">
              Segurança dos Dados
            </h2>

            <p>
              São adotadas medidas de segurança, técnicas e administrativas aptas
              a proteger os dados pessoais de acessos não autorizados e de
              situações acidentais ou ilícitas de destruição, perda, alteração,
              comunicação ou qualquer forma de tratamento inadequado ou ilícito,
              conforme Art. 46 da LGPD.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8">
              Transferência Internacional de Dados
            </h2>

            <p>
              O site{' '}
              <a
                href="https://www.lucasmourao.com.br"
                className="text-blue-600 hover:underline"
              >
                lucasmourao.com.br
              </a>{' '}
              pode utilizar serviços de terceiros localizados fora do país, como
              provedores de hospedagem, analytics ou serviços de nuvem. Nesses
              casos, a transferência internacional de dados será realizada em
              conformidade com os requisitos da LGPD (Art. 33 a 36), garantindo
              proteção adequada.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8">
              Conformidade com TSE e Justiça Eleitoral
            </h2>

            <p>
              O site{' '}
              <a
                href="https://www.lucasmourao.com.br"
                className="text-blue-600 hover:underline"
              >
                lucasmourao.com.br
              </a>{' '}
              opera em estrita conformidade com as normas do Tribunal Superior
              Eleitoral (TSE) e da Justiça Eleitoral, especialmente em relação
              à transparência na utilização de ferramentas de inteligência
              artificial, conforme as Resoluções nº 23.610/2019 e nº 23.611/2019,
              e suas alterações posteriores.
            </p>

            <p>
              Nenhum conteúdo gerado por inteligência artificial é utilizado
              sem a devida identificação e supervisão humana, conforme exigido
              pela legislação eleitoral vigente.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8">
              Canais de Comunicação e Exercício de Direitos
            </h2>

            <p>
              Para exercer seus direitos como titular dos dados ou esclarecer
              dúvidas sobre esta Política de Privacidade, entre em contato pelo
              e-mail:{' '}
              <a
                href="mailto:contato@lucasmourao.com.br"
                className="text-blue-600 hover:underline"
              >
                contato@lucasmourao.com.br
              </a>
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8">
              Mudanças nesta Política
            </h2>

            <p>
              Reservamo-nos o direito de modificar esta Política de Privacidade a
              qualquer momento, visando sempre a conformidade com a legislação
              vigente e a proteção dos direitos dos titulares de dados. Qualquer
              alteração será publicada nesta página com a data de atualização
              atualizada.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8">
              Legislação Aplicável
            </h2>

            <p>
              Para todas as questões relativas à interpretação e aplicação desta
              Política de Privacidade, será aplicada a legislação da República
              Federativa do Brasil.
            </p>

            <div className="bg-gray-50 rounded-xl p-6 mt-8">
              <p className="text-sm text-gray-600">
                <strong>Última atualização:</strong> Esta Política de Privacidade
                foi atualizada em 23 de julho de 2026.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
