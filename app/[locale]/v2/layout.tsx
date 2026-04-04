import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { type Locale } from '@/i18n/config'
import { generateMetadata as generateSEOMetadata } from '@/components/seo/metadata'
import { loadV2Content } from '@/features/v2/content/loaders'
import { getRouteVersionPolicy } from '@/lib/site-config'
import { resolveRequestLocale } from '@/lib/locale-routing'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const requestLocale = resolveRequestLocale(locale)

  if (!requestLocale) {
    return {}
  }

  const policy = getRouteVersionPolicy()

  if (!policy.exposeV2Path && policy.rootVersion === 'v1') {
    return {}
  }

  const content = await loadV2Content(requestLocale as Locale)

  return generateSEOMetadata({
    locale: requestLocale as Locale,
    version: 'v2',
    title: content.seo.title,
    description: content.seo.description,
  })
}

export default async function V2Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const requestLocale = resolveRequestLocale(locale)

  if (!requestLocale) {
    notFound()
  }

  const policy = getRouteVersionPolicy()

  if (!policy.exposeV2Path && policy.rootVersion === 'v1') {
    notFound()
  }

  setRequestLocale(requestLocale)

  return <>{children}</>
}
