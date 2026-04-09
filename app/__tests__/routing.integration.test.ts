import { describe, expect, it } from 'vitest'
import robots from '@/app/robots'
import sitemap from '@/app/sitemap'

describe('canonical routing seo integration', () => {
  it('keeps robots focused on crawl infrastructure paths only', () => {
    const rules = robots().rules
    const disallow = Array.isArray(rules) ? [] : (rules.disallow as string[])

    expect(disallow).toEqual(['/api/', '/.next/'])
  })

  it('publishes only canonical locale routes in sitemap output', () => {
    const urls = sitemap().map((entry) => entry.url)

    expect(urls).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/\/en$/),
        expect.stringMatching(/\/es$/),
        expect.stringMatching(/\/en\/projects$/),
        expect.stringMatching(/\/es\/projects$/),
        expect.stringMatching(/\/en\/contact$/),
        expect.stringMatching(/\/es\/contact$/),
      ]),
    )
    expect(urls.some((url) => url.includes('/v2'))).toBe(false)
    expect(urls.some((url) => url.includes('/legacy'))).toBe(false)
  })
})
