import ContactPanel from './ContactPanel';
import SectionHeading from './SectionHeading';

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contato-titulo"
      className="surface-dark section-y bg-ink-950 text-on-dark"
    >
      <div className="container-site">
        <SectionHeading
          id="contato-titulo"
          tone="dark"
          eyebrow="Contato"
          title="Conte o que você precisa resolver"
        >
          <p>
            Escreva do seu jeito, sem termos técnicos. Respondemos para entender melhor a
            necessidade e combinar os próximos passos.
          </p>
        </SectionHeading>

        <ContactPanel />
      </div>
    </section>
  );
}
