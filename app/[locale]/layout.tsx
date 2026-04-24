import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/atoms/ui/sonner";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { generateMetadata as generateSEOMetadata } from "@/components/seo/metadata";
import { siteConfig } from "@/lib/site";
import { loadPortfolioContent } from "@/features/content/loaders";
import {
  getLocaleStaticParams,
  resolveRequestLocale,
} from "@/lib/locale-routing";

export function generateStaticParams() {
  return getLocaleStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const requestLocale = resolveRequestLocale(locale);

  if (!requestLocale) {
    notFound();
  }

  const portfolioContent = await loadPortfolioContent(requestLocale);

  return generateSEOMetadata({
    locale: requestLocale,
    title: portfolioContent.seo.title,
    description: portfolioContent.seo.description,
    image: `${siteConfig.baseUrl}/images/profile.jpg`,
  });
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const requestLocale = resolveRequestLocale(locale);

  if (!requestLocale) {
    notFound();
  }

  setRequestLocale(requestLocale);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster />
    </ThemeProvider>
  );
}
