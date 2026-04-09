import type { Metadata } from 'next'
import {
  CANONICAL_ROUTE_PATHS,
  getCanonicalRouteKey,
  siteConfig,
  getProfileImageUrl,
  getLocalizedAlternates,
  getCanonicalUrl,
  type CanonicalRoutePath,
} from '@/lib/site'
import type { Locale } from '@/i18n/config'

export interface MetadataParams {
  locale: Locale
  title: string
  description: string
  image?: string
  noindex?: boolean
  routePath?: CanonicalRoutePath
}

export function generateMetadata(params: MetadataParams): Metadata {
  const {
    locale,
    title,
    description,
    image = getProfileImageUrl(),
    noindex = false,
    routePath = CANONICAL_ROUTE_PATHS.home,
  } = params

  const routeKey = getCanonicalRouteKey(routePath)
  const canonicalUrl = getCanonicalUrl(locale, routeKey)

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
      index: !noindex,
      follow: !noindex,
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
      languages: getLocalizedAlternates(routeKey),
    },
  }
}

export function generateStructuredData(params: {
  locale: Locale
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

  if (projects.length === 0) {
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
