import './globals.css';

import type { Metadata, Viewport } from "next";
import { Inter, Manrope, Sora } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-brand",
  display: "swap",
  weight: ["600", "700", "800"],
});

const siteUrl = "https://www.carvacodeweb.com";
const title = "CarvaCode - Desenvolvimento de Sites, Sistemas e Apps";
const description =
  "Desenvolvemos sites, sistemas web e aplicativos sob medida, com interface moderna, backend bem estruturado e base preparada para manutenção e evolução.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "CarvaCode",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: "#0c1216",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${sora.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
