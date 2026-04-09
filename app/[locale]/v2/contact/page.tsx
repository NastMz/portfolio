import { notFound, redirect } from 'next/navigation'
import { resolveRequestLocale } from '@/lib/locale-routing'
import { getCanonicalRoutePath } from '@/lib/site'

export default async function V2ContactRoute({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const requestLocale = resolveRequestLocale(locale)

  if (!requestLocale) {
    notFound()
  }

  redirect(getCanonicalRoutePath(requestLocale, 'contact'))
}
