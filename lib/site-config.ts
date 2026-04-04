/**
 * Configuración centralizada de URLs y constantes SEO
 */

import { defaultLocale, locales, type Locale } from '@/i18n/config'

export type PortfolioVersion = 'v1' | 'v2' | 'legacy'

export interface RouteVersionPolicy {
  rootVersion: 'v1' | 'v2'
  exposeV2Path: boolean
  allowLegacyPath: boolean
}

const toBoolean = (value: string | undefined, fallback: boolean): boolean => {
  if (value === undefined) {
    return fallback
  }

  const normalized = value.trim().toLowerCase()
  return normalized === '1' || normalized === 'true' || normalized === 'yes' || normalized === 'on'
}

const resolveRootVersion = (): RouteVersionPolicy['rootVersion'] => {
  const value = process.env.NEXT_PUBLIC_ROOT_VERSION
  return value === 'v2' ? 'v2' : 'v1'
}

export const siteConfig = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://kevin-martinez-portfolio-alpha.vercel.app',
  profileImagePath: '/images/profile.jpg',
} as const

export const getRouteVersionPolicy = (): RouteVersionPolicy => ({
  rootVersion: resolveRootVersion(),
  exposeV2Path: toBoolean(process.env.NEXT_PUBLIC_EXPOSE_V2_PATH, true),
  allowLegacyPath: toBoolean(process.env.NEXT_PUBLIC_ALLOW_LEGACY_PATH, false),
})

export const getVersionPath = (locale: Locale, version: PortfolioVersion): string => {
  if (version === 'v2') {
    return `/${locale}/v2`
  }

  if (version === 'legacy') {
    return `/${locale}/legacy`
  }

  return `/${locale}`
}

export const getCanonicalUrl = (locale: Locale, version: PortfolioVersion): string => {
  return `${siteConfig.baseUrl}${getVersionPath(locale, version)}`
}

export const getLocalizedAlternates = (version: PortfolioVersion = 'v1') => {
  const languageAlternates = Object.fromEntries(
    locales.map((locale) => [locale, getCanonicalUrl(locale, version)]),
  ) as Record<Locale, string>

  return {
    ...languageAlternates,
    'x-default': getCanonicalUrl(defaultLocale, version),
  }
}

export const getProfileImageUrl = (customPath?: string) => {
  const path = customPath || siteConfig.profileImagePath
  return `${siteConfig.baseUrl}${path}`
}
