import Image from 'next/image';

import { cn } from '@/lib/utils';

// Símbolo (PNG gerado a partir de src/assets/logo.svg) + marca textual.
// O SVG original vetorizado pesa ~82 kB comprimido; o next/image serve o PNG em WebP
// nas versões 1x e 2x do tamanho exibido.
export default function BrandLogo({ size = 'md' }: { size?: 'md' | 'lg' }) {
  const isLarge = size === 'lg';
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image
        src="/logo-carvacode.png"
        alt=""
        width={isLarge ? 42 : 34}
        height={isLarge ? 40 : 32}
        className={isLarge ? 'h-10 w-auto' : 'h-8 w-auto'}
      />
      <span className={cn('brand-wordmark', isLarge ? 'text-2xl' : 'text-xl')}>
        Carva<span className="brand-wordmark-code">Code</span>
      </span>
    </span>
  );
}
