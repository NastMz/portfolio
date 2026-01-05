import { Metadata } from 'next'
import { siteConfig, getProfileImageUrl } from '@/lib/site-config'

export interface MetadataParams {
  locale: string
  title: string
  description: string
  image?: string
  noindex?: boolean
}

export function generateMetadata(params: MetadataParams): Metadata {
  const {
    locale,
    title,
    description,
    image = getProfileImageUrl(),
    noindex = false,
  } = params

  const url = `${siteConfig.baseUrl}/${locale}`

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
    robots: noindex ? 'noindex, nofollow' : 'index, follow',
    openGraph: {
      type: 'website',
      locale,
      url,
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
      languages: {
        en: `${siteConfig.baseUrl}/en`,
        es: `${siteConfig.baseUrl}/es`,
        'x-default': `${siteConfig.baseUrl}/en`,
      },
    },
  }
}

export function generateStructuredData(params: {
  locale: string
  name: string
  title: string
  description: string
  image: string
  email: string
  github: string
  linkedin: string
  location: string
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
  } = params

  return {
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
}
