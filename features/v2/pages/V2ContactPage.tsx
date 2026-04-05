import type { Locale } from '@/i18n/config'
import { V2PortfolioPage } from './V2PortfolioPage'

interface V2ContactPageProps {
  locale: Locale
}

export async function V2ContactPage({ locale }: V2ContactPageProps) {
  return <V2PortfolioPage locale={locale} routeKey="home" />
}
