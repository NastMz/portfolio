import portfolioEn from '@/data/v2/portfolio-en.json'
import portfolioEs from '@/data/v2/portfolio-es.json'
import { describe, expect, it } from 'vitest'
import { v2PortfolioContentSchema, validateLocaleCompleteness } from '@/features/v2/content/schema'
import { v2RouteManifest } from '@/features/v2/content/sections'

describe('v2 content schema', () => {
  it('accepts complete EN/ES payloads', () => {
    const parsedEn = v2PortfolioContentSchema.parse(portfolioEn)
    const parsedEs = v2PortfolioContentSchema.parse(portfolioEs)

    expect(parsedEn.hero.title.length).toBeGreaterThan(0)
    expect(parsedEs.hero.title.length).toBeGreaterThan(0)
    expect(parsedEn.caseStudy.outcome.length).toBeGreaterThan(0)
    expect(parsedEs.decisionLog.length).toBeGreaterThan(0)
    expect(v2RouteManifest.projects.includes('caseStudy')).toBe(true)
    expect(v2RouteManifest.contact.includes('contact')).toBe(true)
    expect(() => validateLocaleCompleteness({ en: parsedEn, es: parsedEs })).not.toThrow()
  })

  it('fails completeness validation when a required translation is missing', () => {
    const parsedEn = v2PortfolioContentSchema.parse(portfolioEn)
    const parsedEs = v2PortfolioContentSchema.parse(portfolioEs)

    const brokenEs = {
      ...parsedEs,
      contact: {
          ...parsedEs.contact,
          cta: {
            ...parsedEs.contact.cta,
            label: '',
          },
      },
    }

    expect(() => validateLocaleCompleteness({ en: parsedEn, es: brokenEs })).toThrow(
      "V2 content validation failed: missing required field 'contact.cta.label' for locale 'es'",
    )
  })

  it('fails validation with field-level diagnostics for required narrative sections', () => {
    const brokenEn = {
      ...portfolioEn,
      caseStudy: {
        ...portfolioEn.caseStudy,
        challenge: '',
      },
    }

    const result = v2PortfolioContentSchema.safeParse(brokenEn)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.path.join('.')).toBe('caseStudy.challenge')
    }
  })
})
