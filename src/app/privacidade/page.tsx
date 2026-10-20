import type { Metadata } from 'next';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { mailtoUrl, siteConfig } from '@/config/site';

const description =
  'Como a CarvaCode usa os dados enviados pelo formulário de contato, por e-mail e pelo WhatsApp.';

export const metadata: Metadata = {
  title: 'Política de privacidade',
  description,
  alternates: { canonical: '/privacidade' },
  openGraph: {
    title: `Política de privacidade | ${siteConfig.name}`,
    description,
    url: '/privacidade',
    siteName: siteConfig.name,
    locale: 'pt_BR',
    type: 'website',
  },
};

const LAST_UPDATED = '20 de outubro de 2026';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <div className="surface-dark bg-ink-950 text-on-dark">
          <div className="container-site pb-12 pt-[calc(var(--header-height)+3rem)]">
            <p className="eyebrow-dark">Privacidade</p>
            <h1 className="mt-3 text-[2rem] font-bold leading-tight text-white sm:text-4xl">
              Política de privacidade
            </h1>
            <p className="mt-4 text-on-dark-muted">Última atualização: {LAST_UPDATED}</p>
          </div>
        </div>

        <article className="container-site section-y">
          <div className="max-w-3xl space-y-10 text-lg leading-relaxed text-fg-muted [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-fg [&_strong]:text-fg">
            <p>
              Esta página explica, de forma direta, quais dados a {siteConfig.name} recebe por este
              site e como eles são usados.
            </p>

            <section className="space-y-3">
              <h2>Quais dados recebemos</h2>
              <p>
                Pelo formulário de contato: <strong>nome</strong>, <strong>e-mail</strong> e a{' '}
                <strong>mensagem</strong> que você escrever. Telefone, interesse e faixa de
                orçamento são opcionais e só são enviados se você os preencher.
              </p>
              <p>
                Se você preferir falar pelo WhatsApp, por e-mail ou por telefone, recebemos as
                informações que você mesmo enviar por esses canais.
              </p>
            </section>

            <section className="space-y-3">
              <h2>Para que usamos</h2>
              <p>
                Para responder ao seu contato, entender a sua necessidade e conversar sobre um
                possível projeto, incluindo o envio de proposta quando fizer sentido.
              </p>
            </section>

            <section className="space-y-3">
              <h2>Como o envio funciona</h2>
              <p>
                Ao enviar o formulário, os dados seguem para o servidor deste site, que os encaminha
                por e-mail à caixa de atendimento da equipe. Esse envio usa o serviço de e-mail
                Resend, e a caixa de atendimento é hospedada no Gmail (Google). O site não grava as
                mensagens em banco de dados.
              </p>
              <p>
                Para limitar envios automáticos em sequência, o endereço IP de quem envia o
                formulário é usado temporariamente, apenas em memória no servidor.
              </p>
              <p>
                Ao clicar em um botão de WhatsApp, você é levado ao WhatsApp, e a conversa segue as
                regras e a política de privacidade desse serviço.
              </p>
            </section>

            <section className="space-y-3">
              <h2>Cookies e ferramentas de análise</h2>
              <p>
                Este site não usa cookies de rastreamento nem ferramentas de análise de navegação.
                Como qualquer site, a hospedagem pode registrar dados técnicos de acesso, como
                endereço IP e navegador, para funcionamento e segurança.
              </p>
            </section>

            <section className="space-y-3">
              <h2>Por quanto tempo guardamos</h2>
              <p>
                As mensagens ficam na caixa de e-mail da equipe enquanto forem úteis para o
                atendimento e para o histórico da conversa comercial.
              </p>
            </section>

            <section className="space-y-3">
              <h2>Seus direitos</h2>
              <p>
                Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode pedir
                para confirmar se temos dados seus, acessá-los, corrigi-los ou excluí-los. Basta
                escrever para{' '}
                <a href={mailtoUrl} className="font-semibold text-brand-blue-ink underline underline-offset-4">
                  {siteConfig.contact.email}
                </a>
                .
              </p>
            </section>

            <p>
              <a href="/" className="font-semibold text-brand-blue-ink underline underline-offset-4">
                Voltar para a página inicial
              </a>
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
