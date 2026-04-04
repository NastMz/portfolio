import { afterEach, describe, expect, it } from 'vitest'
import { getRouteVersionPolicy, getVersionPath } from '@/lib/site-config'
import { resolveRequestLocale } from '@/lib/locale-routing'

const ORIGINAL_ENV = { ...process.env }

describe('site rollout policy resolver', () => {
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV }
  })

  it('defaults to v1 root with v2 path exposed and legacy disabled', () => {
    delete process.env.NEXT_PUBLIC_ROOT_VERSION
    delete process.env.NEXT_PUBLIC_EXPOSE_V2_PATH
    delete process.env.NEXT_PUBLIC_ALLOW_LEGACY_PATH

    expect(getRouteVersionPolicy()).toEqual({
      rootVersion: 'v1',
      exposeV2Path: true,
      allowLegacyPath: false,
    })
  })

  it('resolves explicit v2 cutover flags', () => {
    process.env.NEXT_PUBLIC_ROOT_VERSION = 'v2'
    process.env.NEXT_PUBLIC_EXPOSE_V2_PATH = 'false'
    process.env.NEXT_PUBLIC_ALLOW_LEGACY_PATH = 'true'

    expect(getRouteVersionPolicy()).toEqual({
      rootVersion: 'v2',
      exposeV2Path: false,
      allowLegacyPath: true,
    })
  })

  it('resolves legacy route path contract', () => {
    expect(getVersionPath('en', 'legacy')).toBe('/en/legacy')
  })
})

describe('unsupported locale behavior', () => {
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV }
  })

  it('returns null for unsupported locale by default', () => {
    delete process.env.NEXT_PUBLIC_UNSUPPORTED_LOCALE_BEHAVIOR
    expect(resolveRequestLocale('fr')).toBeNull()
  })

  it('falls back to default locale when configured', () => {
    process.env.NEXT_PUBLIC_UNSUPPORTED_LOCALE_BEHAVIOR = 'fallback-default'
    expect(resolveRequestLocale('fr')).toBe('en')
  })
})
