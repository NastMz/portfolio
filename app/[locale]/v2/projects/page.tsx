import { notFound, permanentRedirect } from 'next/navigation'
import { resolveRequestLocale } from '@/lib/locale-routing'
import { getCanonicalRoutePath } from '@/lib/site'

export default async function V2ProjectsRoute({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const requestLocale = resolveRequestLocale(locale)

  if (!requestLocale) {
    notFound()
  }

  permanentRedirect(getCanonicalRoutePath(requestLocale, 'projects'))
}
