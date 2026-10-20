import BrandLogo from './BrandLogo';
import { mailtoUrl, siteConfig, telUrl, whatsappUrl } from '@/config/site';

const NAV_LINKS = [
  { href: '/#services', label: 'Soluções' },
  { href: '/#exemplos', label: 'Exemplos' },
  { href: '/#como-trabalhamos', label: 'Como trabalhamos' },
  { href: '/#about', label: 'Equipe' },
  { href: '/#perguntas', label: 'Dúvidas' },
  { href: '/#contact', label: 'Contato' },
];

const linkClass = 'rounded text-on-dark-muted transition-colors hover:text-white hover:underline hover:underline-offset-4';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="rodape" className="surface-dark border-t border-white/10 bg-ink-950 text-on-dark">
      <div className="container-site py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1.2fr)]">
          <div>
            <a href="/#inicio" aria-label={`${siteConfig.name}, ir para o início`} className="-m-1 inline-block rounded-lg p-1">
              <BrandLogo size="lg" />
            </a>
            <p className="mt-4 max-w-sm leading-relaxed text-on-dark-muted">
              Desenvolvimento de software sob medida: sites, sistemas web, aplicativos, integrações e
              automações.
            </p>
          </div>

          <nav aria-labelledby="rodape-navegacao">
            <h2 id="rodape-navegacao" className="font-sans text-sm font-semibold uppercase tracking-wide text-white">
              Navegação
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-sans text-sm font-semibold uppercase tracking-wide text-white">Contato</h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={mailtoUrl} className={`${linkClass} break-words`}>
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a href={telUrl} className={linkClass}>
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Conversar pelo WhatsApp
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
              <li className="text-on-dark-muted">{siteConfig.contact.businessHours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {siteConfig.name}</p>
          <a href="/privacidade" className={linkClass}>
            Política de privacidade
          </a>
        </div>
      </div>
    </footer>
  );
}
