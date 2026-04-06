import { z } from 'zod'
import type { Locale } from '@/i18n/config'
import portfolioV2En from '@/data/v2/portfolio-en.json'
import portfolioV2Es from '@/data/v2/portfolio-es.json'

const v2SeoContentSchema = z.object({
  seo: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  }),
})

export type V2SeoContent = z.infer<typeof v2SeoContentSchema>

const parsedContentByLocale = {
  en: v2SeoContentSchema.parse(portfolioV2En),
  es: v2SeoContentSchema.parse(portfolioV2Es),
} satisfies Record<'en' | 'es', V2SeoContent>

export const loadV2Content = async (locale: Locale): Promise<V2SeoContent> => {
  return parsedContentByLocale[locale]
}
