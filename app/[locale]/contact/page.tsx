import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { type Locale } from '@/i18n/config'
import { generateMetadata as generateSEOMetadata } from '@/components/seo/metadata'
import { loadV2Content } from '@/features/v2/content/loaders'
import { V2ContactPage } from '@/features/v2/pages/V2ContactPage'
import { CANONICAL_ROUTE_PATHS } from '@/lib/site'
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
    title: content.seo.title,
    description: content.seo.description,
    routePath: CANONICAL_ROUTE_PATHS.contact,
  })
}

export default async function ContactPage({
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

  return <V2ContactPage locale={requestLocale as Locale} />
}
