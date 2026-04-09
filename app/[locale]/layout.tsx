import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from "@/components/ui/sonner"
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import { type Locale } from '@/i18n/config';
import { generateMetadata as generateSEOMetadata } from '@/components/seo/metadata'
import { siteConfig } from '@/lib/site'
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

  const v2Content = await loadV2Content(requestLocale as Locale)

  return generateSEOMetadata({
    locale: requestLocale as Locale,
    title: v2Content.seo.title,
    description: v2Content.seo.description,
    image: `${siteConfig.baseUrl}/images/profile.jpg`,
  })
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;
  const requestLocale = resolveRequestLocale(locale)
  
  // Ensure that the incoming `locale` is valid
  if (!requestLocale) {
    notFound();
  }
 
  // Enable static rendering
  setRequestLocale(requestLocale);
 
  // Providing all messages to the client
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}
