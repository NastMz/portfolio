import { describe, expect, it } from 'vitest'
import robots from '@/app/robots'
import sitemap from '@/app/sitemap'
import { generateStaticParams } from '@/app/[locale]/layout'
import { getLocaleStaticParams } from '@/lib/locale-routing'
import * as ContactPageModule from '@/app/[locale]/contact/page'
import * as HomePageModule from '@/app/[locale]/page'
import * as ProjectsPageModule from '@/app/[locale]/projects/page'

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
    expect(urls).not.toContain('https://kevin-martinez-portfolio-alpha.vercel.app')
    expect(urls.some((url) => url.includes('/v2'))).toBe(false)
    expect(urls.some((url) => url.includes('/legacy'))).toBe(false)
  })

  it('publishes the canonical locale static params contract from the shared locale helper', async () => {
    const params = await generateStaticParams()

    expect(getLocaleStaticParams()).toEqual([
      { locale: 'en' },
      { locale: 'es' },
    ])
    expect(params).toEqual([
      { locale: 'en' },
      { locale: 'es' },
    ])
  })

  it('keeps canonical child routes on the parent locale static params contract', () => {
    expect('generateStaticParams' in HomePageModule).toBe(false)
    expect('generateStaticParams' in ProjectsPageModule).toBe(false)
    expect('generateStaticParams' in ContactPageModule).toBe(false)
  })
})
