import portfolioV2En from '@/data/v2/portfolio-en.json'
import portfolioV2Es from '@/data/v2/portfolio-es.json'
import type { Locale } from '@/i18n/config'
import {
  v2PortfolioContentSchema,
  validateLocaleCompleteness,
  type V2PortfolioContent,
} from './schema'
import { getRouteManifest, type V2RouteKey, type V2SectionId } from './sections'

const parsedContentByLocale = {
  en: v2PortfolioContentSchema.parse(portfolioV2En),
  es: v2PortfolioContentSchema.parse(portfolioV2Es),
} satisfies Record<'en' | 'es', V2PortfolioContent>

validateLocaleCompleteness(parsedContentByLocale)

type V2SectionPayloadById = {
  [K in V2SectionId]: V2PortfolioContent[K]
}

export type V2RouteSection = {
  [K in V2SectionId]: {
    id: K
    payload: V2SectionPayloadById[K]
  }
}[V2SectionId]

const sectionExtractors: { [K in V2SectionId]: (content: V2PortfolioContent) => V2PortfolioContent[K] } = {
  hero: (content) => content.hero,
  identity: (content) => content.identity,
  principles: (content) => content.principles,
  projects: (content) => content.projects,
  caseStudy: (content) => content.caseStudy,
  decisionLog: (content) => content.decisionLog,
  stackProtocols: (content) => content.stackProtocols,
  notes: (content) => content.notes,
  contact: (content) => content.contact,
}

export const loadAllV2Content = async (): Promise<Record<'en' | 'es', V2PortfolioContent>> => {
  return parsedContentByLocale
}

export const loadV2Content = async (locale: Locale): Promise<V2PortfolioContent> => {
  return parsedContentByLocale[locale]
}

export const buildRouteSections = <R extends V2RouteKey>(
  route: R,
  content: V2PortfolioContent,
): V2RouteSection[] => {
  return getRouteManifest(route).map((id) => {
    const payload = sectionExtractors[id](content)
    return { id, payload } as V2RouteSection
  })
}
