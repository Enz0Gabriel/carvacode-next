import './globals.css';

import type { Metadata, Viewport } from 'next';
import { Inter, Manrope, Sora } from 'next/font/google';

import { siteConfig } from '@/config/site';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Títulos: apenas os pesos usados.
const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  weight: ['600', '700'],
});

// Marca textual "CarvaCode".
const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['600', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: '/',
    siteName: siteConfig.name,
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
  themeColor: '#0c1216',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${sora.variable} ${manrope.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="sr-only rounded-lg bg-white px-4 py-3 font-semibold text-ink-950 shadow-lg focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60]"
        >
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
