import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  children?: ReactNode;
  tone?: 'light' | 'dark';
  className?: string;
}

export default function SectionHeading({
  id,
  eyebrow,
  title,
  children,
  tone = 'light',
  className,
}: SectionHeadingProps) {
  const isDark = tone === 'dark';
  return (
    <div className={cn('max-w-3xl', className)}>
      <p className={isDark ? 'eyebrow-dark' : 'eyebrow'}>{eyebrow}</p>
      <h2
        id={id}
        className={cn(
          'mt-3 text-[1.75rem] font-bold leading-tight sm:text-4xl',
          isDark ? 'text-white' : 'text-fg',
        )}
      >
        {title}
      </h2>
      {children && (
        <div
          className={cn(
            'mt-4 space-y-3 text-base leading-relaxed sm:text-lg',
            isDark ? 'text-on-dark-muted' : 'text-fg-muted',
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
