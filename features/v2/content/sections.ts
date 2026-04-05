export type V2SectionId =
  | 'hero'
  | 'identity'
  | 'principles'
  | 'projects'
  | 'caseStudy'
  | 'decisionLog'
  | 'stackProtocols'
  | 'notes'
  | 'contact'

export type V2RouteKey = 'home' | 'projects' | 'contact'

export type V2RouteManifest = Readonly<Record<V2RouteKey, readonly V2SectionId[]>>

/**
 * Route composition matrix for v2 narrative pages.
 *
 * home: full storyline
 * projects: delivery and decision-focused subset
 * contact: identity and contact-focused subset
 */
export const v2RouteManifest: V2RouteManifest = {
  home: ['hero', 'identity', 'principles', 'projects', 'caseStudy', 'decisionLog', 'stackProtocols', 'notes', 'contact'],
  projects: ['hero', 'projects', 'caseStudy', 'decisionLog'],
  contact: ['hero', 'identity', 'notes', 'contact'],
}

export const getRouteManifest = (route: V2RouteKey): readonly V2SectionId[] => {
  return v2RouteManifest[route]
}
