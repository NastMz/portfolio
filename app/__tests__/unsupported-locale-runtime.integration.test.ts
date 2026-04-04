import { afterEach, describe, expect, it, vi } from 'vitest'

const ORIGINAL_ENV = { ...process.env }
const { notFoundMock, setRequestLocaleMock } = vi.hoisted(() => {
  return {
    notFoundMock: vi.fn(() => {
      throw new Error('NEXT_NOT_FOUND')
    }),
    setRequestLocaleMock: vi.fn(),
  }
})

vi.mock('next/navigation', () => ({
  notFound: notFoundMock,
}))

vi.mock('next-intl/server', () => ({
  setRequestLocale: setRequestLocaleMock,
}))

import RootLocalePage from '@/app/[locale]/page'
import V2Layout from '@/app/[locale]/v2/layout'

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

  it('falls back to default locale in v2 route layout when configured', async () => {
    process.env.NEXT_PUBLIC_UNSUPPORTED_LOCALE_BEHAVIOR = 'fallback-default'
    process.env.NEXT_PUBLIC_EXPOSE_V2_PATH = 'true'

    const result = await V2Layout({
      children: null,
      params: Promise.resolve({ locale: 'fr' }),
    })

    expect(notFoundMock).not.toHaveBeenCalled()
    expect(setRequestLocaleMock).toHaveBeenCalledWith('en')
    expect(result).toBeDefined()
  })
})
