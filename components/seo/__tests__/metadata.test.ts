import { afterEach, describe, expect, it } from 'vitest'
import { generateMetadata } from '@/components/seo/metadata'

const ORIGINAL_ENV = { ...process.env }

describe('metadata rollout policy', () => {
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV }
  })

  it('sets v2 routes to noindex during coexistence (root=v1)', () => {
    process.env.NEXT_PUBLIC_ROOT_VERSION = 'v1'

    const cases = ['/v2', '/v2/projects', '/v2/contact'] as const

    for (const routePath of cases) {
      const metadata = generateMetadata({
        locale: 'en',
        version: 'v2',
        title: 'V2 title',
        description: 'V2 description',
        routePath,
      })

      const robots = metadata.robots as { index?: boolean }
      expect(robots.index).toBe(false)
      expect(metadata.alternates?.canonical).toBeDefined()
      expect(String(metadata.alternates?.canonical)).toContain(`/en${routePath}`)
    }
  })

  it('canonicalizes v2 to locale root after cutover (root=v2)', () => {
    process.env.NEXT_PUBLIC_ROOT_VERSION = 'v2'

    const cases = ['/v2', '/v2/projects', '/v2/contact'] as const

    for (const routePath of cases) {
      const metadata = generateMetadata({
        locale: 'es',
        version: 'v2',
        title: 'Titulo',
        description: 'Descripcion',
        routePath,
      })

      const robots = metadata.robots as { index?: boolean }
      expect(robots.index).toBe(true)
      expect(String(metadata.alternates?.canonical)).toMatch(/\/es$/)

      const languages = metadata.alternates?.languages as Record<string, string>
      expect(languages.es).toMatch(/\/es$/)
      expect(languages.en).toMatch(/\/en$/)
    }
  })
})
