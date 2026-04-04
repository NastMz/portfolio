import portfolioV2En from '@/data/v2/portfolio-en.json'
import portfolioV2Es from '@/data/v2/portfolio-es.json'
import type { Locale } from '@/i18n/config'
import {
  v2PortfolioContentSchema,
  validateLocaleCompleteness,
  type V2PortfolioContent,
} from './schema'

const parsedContentByLocale = {
  en: v2PortfolioContentSchema.parse(portfolioV2En),
  es: v2PortfolioContentSchema.parse(portfolioV2Es),
} satisfies Record<'en' | 'es', V2PortfolioContent>

validateLocaleCompleteness(parsedContentByLocale)

export const loadAllV2Content = async (): Promise<Record<'en' | 'es', V2PortfolioContent>> => {
  return parsedContentByLocale
}

export const loadV2Content = async (locale: Locale): Promise<V2PortfolioContent> => {
  return parsedContentByLocale[locale]
}
