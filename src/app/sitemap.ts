import type { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';

// Datas da última alteração real de conteúdo de cada página.
// Atualize ao mudar o texto da página correspondente.
const CONTENT_UPDATED = {
  home: '2026-10-20',
  privacy: '2026-10-20',
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: CONTENT_UPDATED.home,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/privacidade`,
      lastModified: CONTENT_UPDATED.privacy,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
