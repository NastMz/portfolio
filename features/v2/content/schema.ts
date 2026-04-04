import { z } from 'zod'

const v2LinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
})

const v2HeroSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  primaryCta: v2LinkSchema,
  secondaryCta: v2LinkSchema,
})

const v2SummarySchema = z.object({
  title: z.string().min(1),
  paragraphs: z.array(z.string().min(1)).min(1),
})

const v2ProjectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  href: z.string().min(1),
  stack: z.array(z.string().min(1)).min(1),
})

const v2ProjectsSchema = z.object({
  title: z.string().min(1),
  items: z.array(v2ProjectSchema).min(1),
})

const v2ContactSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  cta: v2LinkSchema,
})

const v2SeoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
})

export const v2PortfolioContentSchema = z.object({
  hero: v2HeroSchema,
  summary: v2SummarySchema,
  projects: v2ProjectsSchema,
  contact: v2ContactSchema,
  seo: v2SeoSchema,
})

export type V2PortfolioContent = z.infer<typeof v2PortfolioContentSchema>

export const validateLocaleCompleteness = (contentByLocale: Record<'en' | 'es', V2PortfolioContent>) => {
  const requiredPaths = [
    'hero.title',
    'hero.subtitle',
    'hero.primaryCta.label',
    'hero.primaryCta.href',
    'summary.title',
    'summary.paragraphs.0',
    'contact.title',
    'contact.cta.label',
    'contact.cta.href',
  ]

  for (const locale of ['en', 'es'] as const) {
    const payload = contentByLocale[locale] as unknown as Record<string, unknown>

    for (const path of requiredPaths) {
      const value = path.split('.').reduce<unknown>((acc, segment) => {
        if (acc === null || acc === undefined) {
          return undefined
        }

        if (Array.isArray(acc)) {
          return acc[Number(segment)]
        }

        if (typeof acc === 'object') {
          return (acc as Record<string, unknown>)[segment]
        }

        return undefined
      }, payload)

      if (typeof value !== 'string' || value.trim().length === 0) {
        throw new Error(`V2 content validation failed: missing required field '${path}' for locale '${locale}'`)
      }
    }
  }
}
