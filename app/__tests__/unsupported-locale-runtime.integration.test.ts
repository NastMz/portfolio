import { afterEach, describe, expect, it, vi } from 'vitest'

const ORIGINAL_ENV = { ...process.env }
const { notFoundMock, redirectMock, setRequestLocaleMock } = vi.hoisted(() => {
  return {
    notFoundMock: vi.fn(() => {
      throw new Error('NEXT_NOT_FOUND')
    }),
    redirectMock: vi.fn((target: string) => {
      throw new Error(`NEXT_REDIRECT:${target}`)
    }),
    setRequestLocaleMock: vi.fn(),
  }
})

vi.mock('next/navigation', () => ({
  notFound: notFoundMock,
  redirect: redirectMock,
}))

vi.mock('next-intl/server', () => ({
  setRequestLocale: setRequestLocaleMock,
}))

import RootLocalePage from '@/app/[locale]/page'
import LegacyLocalePage from '@/app/[locale]/legacy/page'
import VersionedLocalePage from '@/app/[locale]/v2/page'
import VersionedProjectsPage from '@/app/[locale]/v2/projects/page'
import VersionedContactPage from '@/app/[locale]/v2/contact/page'

describe('unsupported locale runtime behavior', () => {
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV }
    vi.clearAllMocks()
  })

  it('rejects unsupported locale at route level by default', async () => {
    delete process.env.NEXT_PUBLIC_UNSUPPORTED_LOCALE_BEHAVIOR

    await expect(
      RootLocalePage({
        params: Promise.resolve({ locale: 'fr' }),
      }),
    ).rejects.toThrow('NEXT_NOT_FOUND')

    expect(notFoundMock).toHaveBeenCalledTimes(1)
  })

  it('preserves fallback-default behavior on the canonical locale root', async () => {
    process.env.NEXT_PUBLIC_UNSUPPORTED_LOCALE_BEHAVIOR = 'fallback-default'

    const result = await RootLocalePage({
      params: Promise.resolve({ locale: 'fr' }),
    })

    expect(notFoundMock).not.toHaveBeenCalled()
    expect(setRequestLocaleMock).toHaveBeenCalledWith('en')
    expect(result).toBeDefined()
  })

  it('redirects legacy and versioned routes to canonical locale paths', async () => {
    await expect(
      LegacyLocalePage({
        params: Promise.resolve({ locale: 'en' }),
      }),
    ).rejects.toThrow('NEXT_REDIRECT:/en')

    await expect(
      VersionedLocalePage({
        params: Promise.resolve({ locale: 'es' }),
      }),
    ).rejects.toThrow('NEXT_REDIRECT:/es')

    await expect(
      VersionedProjectsPage({
        params: Promise.resolve({ locale: 'en' }),
      }),
    ).rejects.toThrow('NEXT_REDIRECT:/en/projects')

    await expect(
      VersionedContactPage({
        params: Promise.resolve({ locale: 'es' }),
      }),
    ).rejects.toThrow('NEXT_REDIRECT:/es/contact')

    expect(redirectMock).toHaveBeenNthCalledWith(1, '/en')
    expect(redirectMock).toHaveBeenNthCalledWith(2, '/es')
    expect(redirectMock).toHaveBeenNthCalledWith(3, '/en/projects')
    expect(redirectMock).toHaveBeenNthCalledWith(4, '/es/contact')
  })

  it('redirects unsupported locales through the configured fallback locale on retired routes', async () => {
    process.env.NEXT_PUBLIC_UNSUPPORTED_LOCALE_BEHAVIOR = 'fallback-default'

    await expect(
      LegacyLocalePage({
        params: Promise.resolve({ locale: 'fr' }),
      }),
    ).rejects.toThrow('NEXT_REDIRECT:/en')

    await expect(
      VersionedProjectsPage({
        params: Promise.resolve({ locale: 'fr' }),
      }),
    ).rejects.toThrow('NEXT_REDIRECT:/en/projects')

    expect(redirectMock).toHaveBeenNthCalledWith(1, '/en')
    expect(redirectMock).toHaveBeenNthCalledWith(2, '/en/projects')
  })
})
