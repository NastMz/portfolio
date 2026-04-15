import './globals.css'
import '@/features/v2/tokens/tokens.css'
import type { ReactNode } from 'react'
import { IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google'
import { headers } from 'next/headers'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { resolveDocumentLocaleHeader } from '@/lib/locale-routing'

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-ibm-plex-sans',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const requestHeaders = await headers()
  const activeLocale = resolveDocumentLocaleHeader(requestHeaders.get('x-locale'))

  return (
    <html lang={activeLocale} suppressHydrationWarning>
      <body className={`${ibmPlexSans.variable} ${jetBrainsMono.variable}`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
