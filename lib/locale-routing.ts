import { defaultLocale, locales, type Locale } from '@/i18n/config'

export const supportedLocales = locales

export type SupportedLocale = Locale

export const isSupportedLocale = (value: string): value is SupportedLocale => {
  return supportedLocales.includes(value as SupportedLocale)
}

export const resolveRequestLocale = (locale: string): SupportedLocale | null => {
  return isSupportedLocale(locale) ? locale : null
}

export const resolveDocumentLocaleHeader = (locale: string | null | undefined): SupportedLocale => {
  return locale && isSupportedLocale(locale) ? locale : defaultLocale
}

export const getDocumentLocale = (pathname: string | null): SupportedLocale => {
  if (!pathname) {
    return defaultLocale
  }

  const [, segment] = pathname.split('/')

  return resolveDocumentLocaleHeader(segment)
}
