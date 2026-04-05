import { z } from 'zod'
import { type V2SectionId, v2RouteManifest } from './sections'

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

const v2IdentitySchema = z.object({
  title: z.string().min(1),
  role: z.string().min(1),
  location: z.string().min(1),
  paragraphs: z.array(z.string().min(1)).min(1),
  availability: z.string().min(1),
})

const v2PrincipleSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  statement: z.string().min(1),
  signal: z.string().min(1),
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

const v2CaseStudySchema = z.object({
  title: z.string().min(1),
  context: z.string().min(1),
  challenge: z.string().min(1),
  approach: z.array(z.string().min(1)).min(1),
  outcome: z.array(z.string().min(1)).min(1),
})

const v2DecisionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  context: z.string().min(1),
  decision: z.string().min(1),
  tradeoff: z.string().min(1),
})

const v2StackProtocolSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  intent: z.string().min(1),
  rules: z.array(z.string().min(1)).min(1),
})

const v2NoteSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  body: z.string().min(1),
})

const v2ContactSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  cta: v2LinkSchema,
  channels: z.array(v2LinkSchema).min(1),
})

const v2SeoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
})

export const v2PortfolioContentSchema = z.object({
  hero: v2HeroSchema,
  identity: v2IdentitySchema,
  principles: z.array(v2PrincipleSchema).min(1),
  projects: v2ProjectsSchema,
  caseStudy: v2CaseStudySchema,
  decisionLog: z.array(v2DecisionSchema).min(1),
  stackProtocols: z.array(v2StackProtocolSchema).min(1),
  notes: z.array(v2NoteSchema).min(1),
  contact: v2ContactSchema,
  seo: v2SeoSchema,
  systemChrome: z
    .object({
      topBarTitle: z.string().min(1),
      sideNavTitle: z.string().min(1),
    })
    .optional(),
})

export type V2PortfolioContent = z.infer<typeof v2PortfolioContentSchema>

const requiredSectionIds: readonly V2SectionId[] = [
  'hero',
  'identity',
  'principles',
  'projects',
  'caseStudy',
  'decisionLog',
  'stackProtocols',
  'notes',
  'contact',
]

const validateSchemaInvariants = () => {
  const validSections = new Set<V2SectionId>(requiredSectionIds)

  for (const [route, sections] of Object.entries(v2RouteManifest)) {
    for (const section of sections) {
      if (!validSections.has(section)) {
        throw new Error(`Invalid v2 route manifest: section '${section}' is not part of the content schema (${route})`)
      }
    }
  }

  if (!v2RouteManifest.projects.includes('caseStudy')) {
    throw new Error("Invalid v2 route manifest: projects route must include 'caseStudy'")
  }

  if (!v2RouteManifest.contact.includes('contact')) {
    throw new Error("Invalid v2 route manifest: contact route must include 'contact'")
  }
}

validateSchemaInvariants()

export const validateLocaleCompleteness = (contentByLocale: Record<'en' | 'es', V2PortfolioContent>) => {
  const requiredPaths = [
    'hero.title',
    'hero.subtitle',
    'hero.primaryCta.label',
    'hero.primaryCta.href',
    'identity.title',
    'identity.paragraphs.0',
    'principles.0.title',
    'projects.title',
    'projects.items.0.title',
    'caseStudy.title',
    'decisionLog.0.title',
    'stackProtocols.0.title',
    'notes.0.title',
    'contact.title',
    'contact.cta.label',
    'contact.cta.href',
    'contact.channels.0.label',
    'seo.title',
    'seo.description',
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
