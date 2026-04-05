import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { type Locale } from '@/i18n/config'
import { notFound } from 'next/navigation'
import { V2PortfolioPage } from '@/features/v2/pages/V2PortfolioPage'
import { generateMetadata as generateSEOMetadata } from '@/components/seo/metadata'
import { loadV2Content } from '@/features/v2/content/loaders'
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

  const content = await loadV2Content(requestLocale as Locale)

  return generateSEOMetadata({
    locale: requestLocale as Locale,
    version: 'v2',
    title: content.seo.title,
    description: content.seo.description,
    routePath: '/v2',
  })
}

export default async function PortfolioV2({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const requestLocale = resolveRequestLocale(locale)

  if (!requestLocale) {
    notFound()
  }

  setRequestLocale(requestLocale)

  return <V2PortfolioPage locale={requestLocale as Locale} routeKey="home" />
}
