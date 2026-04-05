import { Metadata } from 'next'
import {
  siteConfig,
  getProfileImageUrl,
  getCanonicalUrl,
  getLocalizedAlternates,
  getRouteVersionPolicy,
  type PortfolioVersion,
} from '@/lib/site-config'
import type { Locale } from '@/i18n/config'
import { defaultLocale, locales } from '@/i18n/config'

export interface MetadataParams {
  locale: Locale
  title: string
  description: string
  image?: string
  noindex?: boolean
  version?: PortfolioVersion
  routePath?: `/${string}`
}

export function generateMetadata(params: MetadataParams): Metadata {
  const {
    locale,
    title,
    description,
    image = getProfileImageUrl(),
    noindex = false,
    version = 'v1',
    routePath,
  } = params

  const policy = getRouteVersionPolicy()

  const effectiveNoIndex =
    noindex ||
    (version === 'v2' && policy.rootVersion === 'v1') ||
    (version === 'v1' && policy.rootVersion === 'v2') ||
    version === 'legacy'

  const shouldCanonicalizeToRoot =
    policy.rootVersion === 'v2' && (version === 'v2' || version === 'legacy')

  const canonicalVersion: PortfolioVersion = version === 'legacy' ? 'v2' : version
  const canonicalUrl = shouldCanonicalizeToRoot
    ? `${siteConfig.baseUrl}/${locale}`
    : routePath
      ? `${siteConfig.baseUrl}/${locale}${routePath}`
      : getCanonicalUrl(locale, canonicalVersion)

  const alternateVersion: PortfolioVersion = shouldCanonicalizeToRoot
    ? 'v1'
    : version === 'v2'
      ? 'v2'
      : 'v1'

  const localizedRouteAlternates = routePath
    ? {
        ...Object.fromEntries(locales.map((localeOption) => [localeOption, `${siteConfig.baseUrl}/${localeOption}${routePath}`])),
        'x-default': `${siteConfig.baseUrl}/${defaultLocale}${routePath}`,
      }
    : undefined

  return {
    title,
    description,
    keywords: [
      'Kevin Martinez',
      '.NET developer',
      'backend developer',
      'software engineer',
      'C#',
      'portfolio',
    ],
    authors: [{ name: 'Kevin Martinez' }],
    creator: 'Kevin Martinez',
    publisher: 'Kevin Martinez',
    robots: {
      index: !effectiveNoIndex,
      follow: !effectiveNoIndex,
    },
    openGraph: {
      type: 'website',
      locale,
      url: canonicalUrl,
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: shouldCanonicalizeToRoot
        ? getLocalizedAlternates(alternateVersion)
        : localizedRouteAlternates ?? getLocalizedAlternates(alternateVersion),
    },
  }
}

export function generateStructuredData(params: {
  locale: Locale
  version?: 'v1' | 'v2'
  name: string
  title: string
  description: string
  image: string
  email: string
  github: string
  linkedin: string
  location: string
  projects?: Array<{
    name: string
    description: string
    url: string
  }>
}) {
  const {
    locale,
    version = 'v1',
    name,
    title,
    description,
    image,
    email,
    github,
    linkedin,
    location,
    projects = [],
  } = params

  const personData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle: title,
    description,
    image,
    email,
    url: `${siteConfig.baseUrl}/${locale}`,
    sameAs: [github, linkedin],
    location: {
      '@type': 'Place',
      name: location,
    },
  }

  if (version === 'v1') {
    return personData
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      personData,
      {
        '@type': 'ItemList',
        itemListElement: projects.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'CreativeWork',
            name: project.name,
            description: project.description,
            url: project.url,
          },
        })),
      },
    ],
  }
}
