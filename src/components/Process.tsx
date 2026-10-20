import SectionHeading from './SectionHeading';

const STEPS = [
  {
    title: 'Entendimento da necessidade',
    text: 'Conversamos sobre o problema, quem vai usar e como o trabalho é feito hoje. Você não precisa chegar com termos técnicos.',
  },
  {
    title: 'Definição do escopo',
    text: 'Organizamos o que entra na primeira versão, o que pode ficar para depois e quais integrações serão necessárias.',
  },
  {
    title: 'Proposta',
    text: 'Apresentamos a proposta com escopo, etapas, prazo estimado e investimento para você avaliar.',
  },
  {
    title: 'Desenvolvimento com validações',
    text: 'Construímos em etapas e mostramos o andamento para você testar e pedir ajustes antes da publicação.',
  },
  {
    title: 'Publicação',
    text: 'Colocamos o software no ar, configuramos o ambiente e conferimos o funcionamento com você.',
  },
  {
    title: 'Continuidade',
    text: 'Depois da publicação, o projeto pode seguir com ajustes, manutenção e novas funcionalidades, conforme combinado.',
  },
];

export default function Process() {
  return (
    <section id="como-trabalhamos" aria-labelledby="processo-titulo" className="section-y bg-surface">
      <div className="container-site">
        <SectionHeading id="processo-titulo" eyebrow="Como trabalhamos" title="Do primeiro contato ao software em uso">
          <p>
            Cada projeto passa pelas mesmas etapas. O ritmo e o tamanho de cada uma dependem do que
            precisa ser construído.
          </p>
        </SectionHeading>

        <ol className="mt-10 grid gap-x-6 gap-y-8 sm:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="flex gap-4 border-t border-line pt-6">
              <span
                aria-hidden="true"
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink-950 font-display text-sm font-semibold text-white"
              >
                {index + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-fg">
                  <span className="sr-only">Etapa {index + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2 leading-relaxed text-fg-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
