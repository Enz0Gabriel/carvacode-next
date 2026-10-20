import { ChevronDown } from 'lucide-react';

import SectionHeading from './SectionHeading';

const QUESTIONS = [
  {
    question: 'Preciso saber explicar a parte técnica?',
    answer:
      'Não. Basta contar o que você precisa resolver e como o trabalho acontece hoje. Transformar isso em requisitos técnicos faz parte do nosso trabalho.',
  },
  {
    question: 'Vocês fazem apenas sites ou também sistemas e aplicativos?',
    answer:
      'Desenvolvemos sites, sistemas web, portais e aplicativos, além de APIs, integrações e automações. Muitas vezes essas partes fazem parte de um mesmo projeto.',
  },
  {
    question: 'Como é definido o valor do projeto?',
    answer:
      'O valor depende do escopo. Depois de entender a necessidade, definimos com você o que entra no projeto e enviamos uma proposta. No formulário, informar uma faixa de orçamento é opcional.',
  },
  {
    question: 'Quanto tempo leva para ficar pronto?',
    answer:
      'Depende do tamanho e da complexidade do que será construído. O prazo é estimado na proposta, depois que o escopo estiver definido.',
  },
  {
    question: 'Vocês trabalham em sistemas que já existem?',
    answer:
      'Podemos avaliar. Na primeira conversa entendemos o sistema atual e o que precisa mudar, para decidir com você se faz mais sentido evoluir o que existe ou construir uma nova parte.',
  },
  {
    question: 'O que acontece depois da publicação?',
    answer:
      'O projeto pode continuar com ajustes, manutenção e novas funcionalidades. A forma dessa continuidade é combinada com você.',
  },
  {
    question: 'Como é o primeiro contato?',
    answer:
      'Você pode chamar no WhatsApp ou enviar o formulário desta página. Respondemos em horário comercial para entender melhor a necessidade e combinar os próximos passos.',
  },
];

export default function Faq() {
  return (
    <section id="perguntas" aria-labelledby="perguntas-titulo" className="section-y bg-surface">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <SectionHeading id="perguntas-titulo" eyebrow="Perguntas frequentes" title="Dúvidas comuns antes de começar">
            <p>
              Não encontrou sua dúvida?{' '}
              <a href="#contact" className="font-semibold text-brand-blue-ink underline underline-offset-4">
                Fale com a equipe
              </a>
              .
            </p>
          </SectionHeading>

          <div className="divide-y divide-line border-y border-line">
            {QUESTIONS.map((item) => (
              <details key={item.question} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded py-5 text-left font-semibold text-fg [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>
                  <ChevronDown
                    aria-hidden="true"
                    className="size-5 shrink-0 text-fg-muted transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="-mt-1 pb-5 pr-9 leading-relaxed text-fg-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
