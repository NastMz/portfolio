import type { MetadataRoute } from 'next'
import { locales } from '@/i18n/config'
import { siteConfig, CANONICAL_ROUTE_PATHS } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const priorityByRoute = {
    home: 1,
    projects: 0.8,
    contact: 0.8,
  } as const

  const localizedRoutes = locales.flatMap((locale) =>
    Object.entries(CANONICAL_ROUTE_PATHS).map(([routeKey, routePath]) => ({
      url: `${siteConfig.baseUrl}/${locale}${routePath}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: priorityByRoute[routeKey as keyof typeof priorityByRoute],
    })),
  )

  return [
    {
      url: siteConfig.baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    ...localizedRoutes,
  ]
}
