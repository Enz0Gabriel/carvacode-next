import { CalendarClock, PackageSearch, PlugZap, UserRound } from 'lucide-react';

import SectionHeading from './SectionHeading';

// Situações ilustrativas. Não são projetos entregues nem casos de clientes.
const EXAMPLES = [
  {
    icon: PackageSearch,
    title: 'Acompanhamento de pedidos',
    situation:
      'Clientes perguntam a todo momento em que etapa está o pedido, e a equipe responde um por um.',
    solution:
      'Uma área onde o cliente consulta o andamento, atualizada pela equipe em um painel interno.',
  },
  {
    icon: UserRound,
    title: 'Portal de clientes',
    situation:
      'Documentos e solicitações circulam por e-mail e WhatsApp, e fica difícil encontrar o histórico.',
    solution:
      'Um portal com acesso individual, onde cada cliente encontra seus documentos e abre solicitações.',
  },
  {
    icon: CalendarClock,
    title: 'Agendamentos',
    situation:
      'Horários são marcados por telefone ou mensagem, com risco de conflito e de esquecimento.',
    solution:
      'Uma agenda online com regras de disponibilidade e confirmação, consultada pela equipe em um só lugar.',
  },
  {
    icon: PlugZap,
    title: 'Integração entre ferramentas',
    situation:
      'A mesma informação é digitada em duas ou três ferramentas, como loja virtual, planilha e sistema financeiro.',
    solution:
      'Uma integração que leva os dados de uma ferramenta para outra e registra o que foi enviado.',
  },
];

export default function Examples() {
  return (
    <section id="exemplos" aria-labelledby="exemplos-titulo" className="section-y bg-surface-muted">
      <div className="container-site">
        <SectionHeading
          id="exemplos-titulo"
          eyebrow="Exemplos de aplicação"
          title="Situações em que um software sob medida pode ajudar"
        >
          <p>
            Os exemplos abaixo são ilustrativos: mostram o tipo de problema que podemos analisar
            com você. Não representam projetos entregues nem clientes da CarvaCode.
          </p>
        </SectionHeading>

        <ul className="mt-10 grid gap-5 sm:mt-12 md:grid-cols-2 lg:gap-6">
          {EXAMPLES.map((example) => (
            <li key={example.title} className="rounded-2xl border border-line bg-white p-5 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-brand-blue-ink">
                  <example.icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="text-lg font-semibold text-fg">{example.title}</h3>
              </div>
              <dl className="mt-5 space-y-4">
                <div>
                  <dt className="text-sm font-semibold text-fg">Situação</dt>
                  <dd className="mt-1 leading-relaxed text-fg-muted">{example.situation}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-fg">Possível solução</dt>
                  <dd className="mt-1 leading-relaxed text-fg-muted">{example.solution}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
