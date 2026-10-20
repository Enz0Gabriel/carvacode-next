import { ArrowRight, Check } from 'lucide-react';

import InterestLink from './InterestLink';
import SectionHeading from './SectionHeading';
import { SOLUTIONS } from '@/content/solutions';

export default function Solutions() {
  return (
    <section id="services" aria-labelledby="solucoes-titulo" className="section-y bg-surface">
      <div className="container-site">
        <SectionHeading id="solucoes-titulo" eyebrow="Soluções" title="O que podemos desenvolver para a sua empresa">
          <p>
            Organizamos o trabalho pelo que você precisa resolver. A parte técnica, como servidor,
            banco de dados, integrações e publicação, é planejada junto com a solução, e o que entra
            em cada projeto fica definido na proposta.
          </p>
        </SectionHeading>

        <ul className="mt-10 grid gap-5 sm:mt-12 md:grid-cols-2 lg:gap-6">
          {SOLUTIONS.map((solution) => (
            <li
              key={solution.id}
              id={solution.id}
              className="flex flex-col rounded-2xl border border-line bg-white p-5 sm:p-8"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue-ink">
                <solution.icon aria-hidden="true" className="size-6" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-fg">{solution.title}</h3>
              <p className="mt-2 leading-relaxed text-fg-muted">{solution.description}</p>

              <ul className="mt-5 space-y-2.5" aria-label={`O que pode incluir: ${solution.title}`}>
                {solution.items.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.9375rem] leading-snug text-fg">
                    <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-blue-ink" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6">
                <div className="border-t border-line pt-5">
                  <InterestLink
                    interest={solution.interest}
                    className="group inline-flex items-center gap-2 rounded font-semibold text-brand-blue-ink hover:underline hover:underline-offset-4"
                  >
                    {solution.cta}
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                    />
                  </InterestLink>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
