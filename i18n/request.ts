import { getRequestConfig } from 'next-intl/server'
import { defaultLocale } from './config'
import { isSupportedLocale } from '@/lib/locale-routing'

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale
  const activeLocale = locale && isSupportedLocale(locale) ? locale : defaultLocale

  return {
    locale: activeLocale,
    messages: (await import(`../messages/${activeLocale}.json`)).default,
  }
})
