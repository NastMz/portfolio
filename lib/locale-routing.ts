import { defaultLocale, locales, type Locale } from '@/i18n/config'

export type UnsupportedLocaleBehavior = 'not-found' | 'fallback-default'

export const getUnsupportedLocaleBehavior = (): UnsupportedLocaleBehavior => {
  return process.env.NEXT_PUBLIC_UNSUPPORTED_LOCALE_BEHAVIOR === 'fallback-default'
    ? 'fallback-default'
    : 'not-found'
}

export const resolveRequestLocale = (locale: string): Locale | null => {
  if (locales.includes(locale as Locale)) {
    return locale as Locale
  }

  if (getUnsupportedLocaleBehavior() === 'fallback-default') {
    return defaultLocale
  }

  return null
}
