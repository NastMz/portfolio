import { MetadataRoute } from 'next'
import { locales } from '@/i18n/config'
import { siteConfig } from '@/lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const localeRoutes = locales.flatMap((locale) => [
    {
      url: `${siteConfig.baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
  ])

  return [
    {
      url: siteConfig.baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    ...localeRoutes,
  ]
}
