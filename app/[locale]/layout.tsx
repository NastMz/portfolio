import type { Metadata, Viewport } from 'next'
import '../globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from "@/components/ui/sonner"
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import { locales } from '@/i18n/config';
import { getPersonalInfo } from '@/lib/portfolio-data'
import { generateMetadata as generateSEOMetadata } from '@/components/seo/metadata'
import { siteConfig } from '@/lib/site-config'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  if (!locales.includes(locale as any)) {
    return {}
  }

  const personalInfo = getPersonalInfo(locale)

  const descriptions: Record<string, string> = {
    en: `${personalInfo.name} - ${personalInfo.title}. Full stack .NET backend developer with expertise in C#, ASP.NET Core, and cloud technologies. Explore my portfolio and projects.`,
    es: `${personalInfo.name} - ${personalInfo.title}. Desarrollador backend full stack especializado en C#, ASP.NET Core y tecnologías en la nube. Explora mi portafolio y proyectos.`,
  }

  const titles: Record<string, string> = {
    en: `${personalInfo.name} - ${personalInfo.title} | Portfolio`,
    es: `${personalInfo.name} - ${personalInfo.title} | Portafolio`,
  }

  return generateSEOMetadata({
    locale,
    title: titles[locale] || titles['en'],
    description: descriptions[locale] || descriptions['en'],
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
  
  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }
 
  // Enable static rendering
  setRequestLocale(locale);
 
  // Providing all messages to the client
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
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
