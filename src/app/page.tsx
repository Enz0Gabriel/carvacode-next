import BackToTop from '@/components/BackToTop';
import Contact from '@/components/Contact';
import Examples from '@/components/Examples';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Process from '@/components/Process';
import Solutions from '@/components/Solutions';
import Team from '@/components/Team';
import { siteConfig } from '@/config/site';

// Dados estruturados apenas com informações públicas e verdadeiras da empresa.
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo-carvacode.png`,
  description: siteConfig.description,
  email: siteConfig.contact.email,
  telephone: siteConfig.contact.phoneE164,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phoneE164,
    availableLanguage: ['pt-BR'],
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <Solutions />
        <Examples />
        <Process />
        <Team />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
