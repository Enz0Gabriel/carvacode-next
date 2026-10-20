// Informações públicas da CarvaCode usadas em toda a interface e nos metadados.
// Altere aqui para atualizar o site inteiro. Não coloque segredos neste arquivo:
// ele é importado por componentes que rodam no navegador.

const whatsappNumber = '5511959766136';

export const siteConfig = {
  name: 'CarvaCode',
  url: 'https://www.carvacodeweb.com',
  title: 'CarvaCode | Sites, sistemas web e aplicativos sob medida',
  description:
    'Desenvolvimento de software sob medida para empresas: sites, sistemas web, portais, aplicativos, integrações e automações. Conte sua necessidade e converse com a equipe.',
  contact: {
    email: 'contato@carvacodeweb.com',
    phoneDisplay: '(11) 95976-6136',
    phoneInternational: '+55 11 95976-6136',
    phoneE164: '+5511959766136',
    whatsappNumber,
    businessHours: 'Segunda a sexta, das 9h às 18h',
  },
  defaultWhatsAppMessage:
    'Olá! Vim pelo site da CarvaCode e gostaria de conversar sobre um projeto.',
} as const;

export function whatsappUrl(message: string = siteConfig.defaultWhatsAppMessage): string {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const mailtoUrl = `mailto:${siteConfig.contact.email}`;
export const telUrl = `tel:${siteConfig.contact.phoneE164}`;
