import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateMetadata as generateSEOMetadata } from "@/components/seo/metadata";
import { loadPortfolioContent } from "@/features/content/loaders";
import { ProjectsPage as ProjectsFeaturePage } from "@/features/pages/ProjectsPage";
import { CANONICAL_ROUTE_PATHS } from "@/lib/site";
import { resolveRequestLocale } from "@/lib/locale-routing";

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

  const content = await loadPortfolioContent(requestLocale);

  return generateSEOMetadata({
    locale: requestLocale,
    title: content.seo.title,
    description: content.seo.description,
    routePath: CANONICAL_ROUTE_PATHS.projects,
  });
}

export default async function Projects({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const requestLocale = resolveRequestLocale(locale);

  if (!requestLocale) {
    notFound();
  }

  setRequestLocale(requestLocale);

  return <ProjectsFeaturePage locale={requestLocale} />;
}
