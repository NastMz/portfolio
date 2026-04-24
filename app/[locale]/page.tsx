import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { PortfolioPage } from "@/features/pages/PortfolioPage";
import { resolveRequestLocale } from "@/lib/locale-routing";

export default async function Portfolio({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = resolveRequestLocale(locale);

  if (!resolvedLocale) {
    notFound();
  }

  setRequestLocale(resolvedLocale);

  return <PortfolioPage locale={resolvedLocale} />;
}
