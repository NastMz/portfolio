import { afterEach, describe, expect, it } from 'vitest'
import { siteConfig } from '@/lib/site'
import { generateMetadata as generateLocaleMetadata } from '@/app/[locale]/layout'
import { generateMetadata as generateProjectsMetadata } from '@/app/[locale]/projects/page'
import { generateMetadata as generateContactMetadata } from '@/app/[locale]/contact/page'

const ORIGINAL_ENV = { ...process.env }

describe('canonical metadata policy', () => {
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV }
  })

  it('serves v2 metadata on the locale homepage without rollout branching', async () => {
    process.env.NEXT_PUBLIC_ROOT_VERSION = 'v1'
    process.env.NEXT_PUBLIC_EXPOSE_V2_PATH = 'false'
    process.env.NEXT_PUBLIC_ALLOW_LEGACY_PATH = 'true'

    const metadata = await generateLocaleMetadata({
      params: Promise.resolve({ locale: 'en' }),
    })

    expect(metadata.title).toBe('Kevin Martinez | Portfolio v2')
    expect(metadata.description).toBe(
      'Portfolio v2 of Kevin Martinez: backend engineering, modular architecture, and production-grade delivery.',
    )
    expect(String(metadata.alternates?.canonical)).toBe(`${siteConfig.baseUrl}/en`)
    expect(metadata.robots).toEqual({ index: true, follow: true })

    const languages = metadata.alternates?.languages as Record<string, string>
    expect(languages).toEqual({
      en: `${siteConfig.baseUrl}/en`,
      es: `${siteConfig.baseUrl}/es`,
      'x-default': `${siteConfig.baseUrl}/en`,
    })
  })

  it('publishes canonical projects and contact metadata only on non-versioned locale routes', async () => {
    const projectsMetadata = await generateProjectsMetadata({
      params: Promise.resolve({ locale: 'es' }),
    })
    const contactMetadata = await generateContactMetadata({
      params: Promise.resolve({ locale: 'en' }),
    })

    expect(String(projectsMetadata.alternates?.canonical)).toBe(`${siteConfig.baseUrl}/es/projects`)
    expect(projectsMetadata.robots).toEqual({ index: true, follow: true })

    const projectLanguages = projectsMetadata.alternates?.languages as Record<string, string>
    expect(projectLanguages).toEqual({
      en: `${siteConfig.baseUrl}/en/projects`,
      es: `${siteConfig.baseUrl}/es/projects`,
      'x-default': `${siteConfig.baseUrl}/en/projects`,
    })

    expect(String(contactMetadata.alternates?.canonical)).toBe(`${siteConfig.baseUrl}/en/contact`)

    const contactLanguages = contactMetadata.alternates?.languages as Record<string, string>
    expect(contactLanguages).toEqual({
      en: `${siteConfig.baseUrl}/en/contact`,
      es: `${siteConfig.baseUrl}/es/contact`,
      'x-default': `${siteConfig.baseUrl}/en/contact`,
    })
  })

  it('keeps unsupported locale fallback unchanged for SEO entry points when fallback-default is enabled', async () => {
    process.env.NEXT_PUBLIC_UNSUPPORTED_LOCALE_BEHAVIOR = 'fallback-default'

    const localeMetadata = await generateLocaleMetadata({
      params: Promise.resolve({ locale: 'fr' }),
    })
    const projectsMetadata = await generateProjectsMetadata({
      params: Promise.resolve({ locale: 'fr' }),
    })
    const contactMetadata = await generateContactMetadata({
      params: Promise.resolve({ locale: 'fr' }),
    })

    expect(String(localeMetadata.alternates?.canonical)).toBe(`${siteConfig.baseUrl}/en`)
    expect(localeMetadata.title).toBe('Kevin Martinez | Portfolio v2')

    const localeLanguages = localeMetadata.alternates?.languages as Record<string, string>
    expect(localeLanguages).toEqual({
      en: `${siteConfig.baseUrl}/en`,
      es: `${siteConfig.baseUrl}/es`,
      'x-default': `${siteConfig.baseUrl}/en`,
    })

    expect(String(projectsMetadata.alternates?.canonical)).toBe(`${siteConfig.baseUrl}/en/projects`)
    expect(projectsMetadata.title).toBe('Kevin Martinez | Portfolio v2')

    const projectLanguages = projectsMetadata.alternates?.languages as Record<string, string>
    expect(projectLanguages).toEqual({
      en: `${siteConfig.baseUrl}/en/projects`,
      es: `${siteConfig.baseUrl}/es/projects`,
      'x-default': `${siteConfig.baseUrl}/en/projects`,
    })

    expect(String(contactMetadata.alternates?.canonical)).toBe(`${siteConfig.baseUrl}/en/contact`)
    expect(contactMetadata.title).toBe('Kevin Martinez | Portfolio v2')

    const contactLanguages = contactMetadata.alternates?.languages as Record<string, string>
    expect(contactLanguages).toEqual({
      en: `${siteConfig.baseUrl}/en/contact`,
      es: `${siteConfig.baseUrl}/es/contact`,
      'x-default': `${siteConfig.baseUrl}/en/contact`,
    })
  })

  it('keeps projects and contact metadata independent from retired version flags', async () => {
    process.env.NEXT_PUBLIC_ROOT_VERSION = 'v1'
    process.env.NEXT_PUBLIC_EXPOSE_V2_PATH = 'false'
    process.env.NEXT_PUBLIC_ALLOW_LEGACY_PATH = 'true'

    const projectsMetadata = await generateProjectsMetadata({
      params: Promise.resolve({ locale: 'en' }),
    })
    const contactMetadata = await generateContactMetadata({
      params: Promise.resolve({ locale: 'es' }),
    })

    expect(projectsMetadata.title).toBe('Kevin Martinez | Portfolio v2')
    expect(projectsMetadata.description).toBe(
      'Portfolio v2 of Kevin Martinez: backend engineering, modular architecture, and production-grade delivery.',
    )
    expect(String(projectsMetadata.alternates?.canonical)).toBe(`${siteConfig.baseUrl}/en/projects`)

    expect(contactMetadata.title).toBe('Kevin Martinez | Portafolio v2')
    expect(contactMetadata.description).toBe(
      'Portafolio v2 de Kevin Martinez: ingeniería backend, arquitectura modular y entregas productivas.',
    )
    expect(String(contactMetadata.alternates?.canonical)).toBe(`${siteConfig.baseUrl}/es/contact`)
  })
})
