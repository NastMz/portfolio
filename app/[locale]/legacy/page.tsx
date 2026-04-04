import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { type Locale } from '@/i18n/config'
import { getRouteVersionPolicy } from '@/lib/site-config'
import { V1PortfolioPage } from '@/features/v1/pages/V1PortfolioPage'
import { resolveRequestLocale } from '@/lib/locale-routing'

export default async function LegacyPortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const requestLocale = resolveRequestLocale(locale)

  if (!requestLocale) {
    notFound()
  }

  const policy = getRouteVersionPolicy()

  if (!policy.allowLegacyPath) {
    notFound()
  }

  setRequestLocale(requestLocale)

  return <V1PortfolioPage locale={requestLocale as Locale} />
}
