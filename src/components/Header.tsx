'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

import BrandLogo from './BrandLogo';
import { WhatsAppIcon } from './icons';
import { buttonVariants } from './ui/button';
import { siteConfig, whatsappUrl } from '@/config/site';
import { cn } from '@/lib/utils';

// Links absolutos ("/#...") funcionam tanto na página inicial quanto em outras páginas.
const NAV_ITEMS = [
  { href: '/#services', label: 'Soluções' },
  { href: '/#como-trabalhamos', label: 'Como trabalhamos' },
  { href: '/#about', label: 'Equipe' },
  { href: '/#perguntas', label: 'Dúvidas' },
  { href: '/#contact', label: 'Contato' },
];

const MENU_ID = 'menu-principal-movel';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback((returnFocus: boolean) => {
    setIsMenuOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';

    // Torna o restante da página inerte: o foco fica restrito ao cabeçalho e ao menu.
    const madeInert: HTMLElement[] = [];
    for (const element of Array.from(document.body.children)) {
      if (
        element instanceof HTMLElement &&
        !element.contains(headerRef.current) &&
        !element.inert
      ) {
        element.inert = true;
        madeInert.push(element);
      }
    }

    panelRef.current?.querySelector<HTMLElement>('a')?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu(true);
        return;
      }
      // Mantém o Tab circulando entre o cabeçalho e o menu enquanto ele está aberto.
      if (event.key !== 'Tab' || !headerRef.current) return;
      const focusable = Array.from(
        headerRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      ).filter((element) => element.getClientRects().length > 0);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement;
      if (event.shiftKey && (current === first || !headerRef.current.contains(current))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (current === last || !headerRef.current.contains(current))) {
        event.preventDefault();
        first.focus();
      }
    };
    const desktop = window.matchMedia('(min-width: 64rem)');
    const onBreakpoint = () => {
      if (desktop.matches) closeMenu(false);
    };

    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onBreakpoint);

    return () => {
      root.style.overflow = previousOverflow;
      madeInert.forEach((element) => {
        element.inert = false;
      });
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onBreakpoint);
    };
  }, [isMenuOpen, closeMenu]);

  return (
    <header
      ref={headerRef}
      className="surface-dark fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink-950/95 text-on-dark backdrop-blur supports-[backdrop-filter]:bg-ink-950/85"
    >
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <a
          href="/#inicio"
          aria-label={`${siteConfig.name}, ir para o início`}
          className="-m-1 rounded-lg p-1"
          onClick={() => isMenuOpen && closeMenu(false)}
        >
          <BrandLogo />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded text-[0.9375rem] font-medium text-on-dark-muted transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: 'sm' }), 'hidden sm:inline-flex')}
          >
            <WhatsAppIcon />
            Falar com a equipe
            <span className="sr-only"> pelo WhatsApp (abre em nova aba)</span>
          </a>

          {/* Atalho compacto para o WhatsApp em telas pequenas. */}
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Conversar pelo WhatsApp (abre em nova aba)"
            className="inline-flex size-11 items-center justify-center rounded-xl text-on-dark hover:bg-white/10 sm:hidden"
          >
            <WhatsAppIcon className="size-5" />
          </a>

          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-xl text-on-dark hover:bg-white/10 lg:hidden"
            aria-expanded={isMenuOpen}
            aria-controls={MENU_ID}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
            <span className="sr-only">{isMenuOpen ? 'Fechar menu' : 'Abrir menu'}</span>
          </button>
        </div>
      </div>

      <div
        ref={panelRef}
        id={MENU_ID}
        hidden={!isMenuOpen}
        className="h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-white/10 bg-ink-950 lg:hidden"
      >
        <nav aria-label="Principal (celular)" className="container-site py-6">
          <ul className="divide-y divide-white/10">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex min-h-14 items-center text-lg font-semibold text-on-dark hover:text-brand-blue-light"
                  onClick={() => closeMenu(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: 'lg' }), 'mt-8 w-full')}
            onClick={() => closeMenu(false)}
          >
            <WhatsAppIcon />
            Conversar pelo WhatsApp
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
          <p className="mt-4 text-center text-sm text-on-dark-muted">{siteConfig.contact.businessHours}</p>
        </nav>
      </div>
    </header>
  );
}
