import createMiddleware from 'next-intl/middleware'
import { NextResponse, type NextRequest } from 'next/server'
import { locales, defaultLocale } from './i18n/config'
import { getDocumentLocale } from './lib/locale-routing'

const localeMiddleware = createMiddleware({
  locales,
  defaultLocale,
})

export function appendLocaleHeader(response: NextResponse, request: NextRequest): NextResponse {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-locale', getDocumentLocale(request.nextUrl.pathname))

  const localeHeaderResponse = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  localeHeaderResponse.headers.forEach((value, key) => {
    response.headers.set(key, value)
  })

  return response
}

export default function proxy(request: NextRequest): NextResponse {
  const response = localeMiddleware(request)

  return appendLocaleHeader(response, request)
}

export const config = {
  matcher: ['/', '/(en|es)/:path*']
}
