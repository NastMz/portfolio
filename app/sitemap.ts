import { MetadataRoute } from 'next'
import { locales } from '@/i18n/config'
import { siteConfig, getRouteVersionPolicy } from '@/lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const policy = getRouteVersionPolicy()

  const localeRoutes = locales.flatMap((locale) => [
    {
      url: `${siteConfig.baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
  ])

  const v2Routes =
    policy.rootVersion === 'v2'
      ? locales.flatMap((locale) => [
          {
            url: `${siteConfig.baseUrl}/${locale}/v2`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
          },
          {
            url: `${siteConfig.baseUrl}/${locale}/v2/projects`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
          },
          {
            url: `${siteConfig.baseUrl}/${locale}/v2/contact`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
          },
        ])
      : []

  return [
    {
      url: siteConfig.baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    ...localeRoutes,
    ...v2Routes,
  ]
}
