'use client';

import type { ReactNode } from 'react';

import type { Interest } from '@/lib/contact';
import { selectInterest } from '@/lib/interest-events';

interface InterestLinkProps {
  interest: Interest;
  className?: string;
  children: ReactNode;
}

// Leva até o contato e pré-seleciona o interesse no formulário.
// Sem JavaScript, continua funcionando como link para a seção de contato.
export default function InterestLink({ interest, className, children }: InterestLinkProps) {
  return (
    <a href="#contact" className={className} onClick={() => selectInterest(interest)}>
      {children}
    </a>
  );
}
