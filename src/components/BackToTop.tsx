'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

import { cn } from '@/lib/utils';

const FORM_FIELDS = 'input, textarea, select';

export default function BackToTop() {
  const [scrolledDown, setScrolledDown] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolledDown(window.scrollY > 640);
    // Enquanto um campo está em edição (teclado virtual aberto), o botão sai do caminho.
    const onFocusIn = (event: FocusEvent) =>
      setEditing(event.target instanceof Element && event.target.matches(FORM_FIELDS));
    const onFocusOut = () => setEditing(false);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
    };
  }, []);

  const visible = scrolledDown && !editing;

  return (
    <a
      href="#inicio"
      aria-label="Voltar ao início da página"
      // `invisible` também retira o link da ordem de tabulação quando ele não aparece.
      className={cn(
        'surface-dark fixed right-4 z-40 flex size-11 items-center justify-center rounded-full border border-white/15 bg-ink-950/90 text-on-dark shadow-lg transition-opacity duration-200 hover:border-brand-blue hover:text-brand-blue-light',
        'bottom-[calc(1rem+env(safe-area-inset-bottom))]',
        visible ? 'visible opacity-100' : 'invisible opacity-0',
      )}
    >
      <ArrowUp aria-hidden="true" className="size-5" />
    </a>
  );
}
