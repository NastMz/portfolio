import { defaultLocale, locales, type Locale } from '@/i18n/config'

export const siteConfig = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://kevin-martinez-portfolio-alpha.vercel.app',
  profileImagePath: '/images/profile.jpg',
} as const

export const CANONICAL_ROUTE_PATHS = {
  home: '',
  projects: '/projects',
  contact: '/contact',
} as const

export type CanonicalRouteKey = keyof typeof CANONICAL_ROUTE_PATHS
export type CanonicalRoutePath = (typeof CANONICAL_ROUTE_PATHS)[CanonicalRouteKey]

const canonicalRouteKeyByPath: Record<CanonicalRoutePath, CanonicalRouteKey> = {
  '': 'home',
  '/projects': 'projects',
  '/contact': 'contact',
}

export const getCanonicalRouteKey = (
  routePath: CanonicalRoutePath = CANONICAL_ROUTE_PATHS.home,
): CanonicalRouteKey => {
  return canonicalRouteKeyByPath[routePath]
}

export const getCanonicalRoutePath = (locale: Locale, routeKey: CanonicalRouteKey): string => {
  return `/${locale}${CANONICAL_ROUTE_PATHS[routeKey]}`
}

export const getCanonicalUrl = (locale: Locale, routeKey: CanonicalRouteKey): string => {
  return `${siteConfig.baseUrl}${getCanonicalRoutePath(locale, routeKey)}`
}

export const getLocalizedAlternates = (routeKey: CanonicalRouteKey = 'home') => {
  const languageAlternates = Object.fromEntries(
    locales.map((locale) => [locale, getCanonicalUrl(locale, routeKey)]),
  ) as Record<Locale, string>

  return {
    ...languageAlternates,
    'x-default': getCanonicalUrl(defaultLocale, routeKey),
  }
}

export const getProfileImageUrl = (customPath?: string) => {
  const path = customPath || siteConfig.profileImagePath
  return `${siteConfig.baseUrl}${path}`
}
