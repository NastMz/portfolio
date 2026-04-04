import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'
import { getRouteVersionPolicy } from '@/lib/site-config'
import { locales } from '@/i18n/config'

export default function robots(): MetadataRoute.Robots {
  const policy = getRouteVersionPolicy()
  const v2Disallow =
    policy.rootVersion === 'v1'
      ? locales.flatMap((locale) => [`/${locale}/v2`, `/${locale}/v2/projects`, `/${locale}/v2/contact`])
      : []

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/.next/', ...v2Disallow],
    },
    sitemap: `${siteConfig.baseUrl}/sitemap.xml`,
  }
}
