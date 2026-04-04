import { afterEach, describe, expect, it } from 'vitest'
import robots from '@/app/robots'
import sitemap from '@/app/sitemap'

const ORIGINAL_ENV = { ...process.env }

describe('route coexistence integration', () => {
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV }
  })

  it('keeps v2 routes disallowed in robots before cutover', () => {
    process.env.NEXT_PUBLIC_ROOT_VERSION = 'v1'

    const rules = robots().rules
    const disallow = Array.isArray(rules) ? [] : (rules.disallow as string[])

    expect(disallow).toEqual(
      expect.arrayContaining([
        '/en/v2',
        '/es/v2',
        '/en/v2/projects',
        '/es/v2/projects',
        '/en/v2/contact',
        '/es/v2/contact',
      ]),
    )
  })

  it('omits v2 routes from sitemap before cutover and includes them after cutover', () => {
    process.env.NEXT_PUBLIC_ROOT_VERSION = 'v1'
    const coexistenceUrls = sitemap().map((entry) => entry.url)
    expect(coexistenceUrls.some((url) => url.includes('/v2'))).toBe(false)

    process.env.NEXT_PUBLIC_ROOT_VERSION = 'v2'
    const cutoverUrls = sitemap().map((entry) => entry.url)

    expect(cutoverUrls).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/\/en\/v2$/),
        expect.stringMatching(/\/en\/v2\/projects$/),
        expect.stringMatching(/\/en\/v2\/contact$/),
      ]),
    )
  })
})
