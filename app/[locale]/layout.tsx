import type { Metadata, Viewport } from 'next'
import '../globals.css'
import '@/features/v2/tokens/tokens.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from "@/components/ui/sonner"
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import { type Locale } from '@/i18n/config';
import { getPersonalInfo } from '@/lib/portfolio-data'
import { generateMetadata as generateSEOMetadata } from '@/components/seo/metadata'
import { siteConfig, getRouteVersionPolicy } from '@/lib/site-config'
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

  const personalInfo = getPersonalInfo(requestLocale)
  const policy = getRouteVersionPolicy()

  if (policy.rootVersion === 'v2') {
    const v2Content = await loadV2Content(requestLocale as Locale)

    return generateSEOMetadata({
      locale: requestLocale as Locale,
      version: 'v2',
      title: v2Content.seo.title,
      description: v2Content.seo.description,
    })
  }

  const descriptions: Record<string, string> = {
    en: `${personalInfo.name} - ${personalInfo.title}. Full stack .NET backend developer with expertise in C#, ASP.NET Core, and cloud technologies. Explore my portfolio and projects.`,
    es: `${personalInfo.name} - ${personalInfo.title}. Desarrollador backend full stack especializado en C#, ASP.NET Core y tecnologías en la nube. Explora mi portafolio y proyectos.`,
  }

  const titles: Record<string, string> = {
    en: `${personalInfo.name} - ${personalInfo.title} | Portfolio`,
    es: `${personalInfo.name} - ${personalInfo.title} | Portafolio`,
  }

  return generateSEOMetadata({
    locale: requestLocale as Locale,
    version: 'v1',
    title: titles[requestLocale] || titles['en'],
    description: descriptions[requestLocale] || descriptions['en'],
    image: personalInfo.profileImage
      ? `${siteConfig.baseUrl}${personalInfo.profileImage}`
      : undefined,
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
    <html lang={requestLocale} suppressHydrationWarning>
      <body>
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
      </body>
    </html>
  )
}
