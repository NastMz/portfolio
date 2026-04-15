import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { V2PortfolioPage } from "@/features/v2/pages/V2PortfolioPage";
import { resolveRequestLocale } from "@/lib/locale-routing";

export default async function Portfolio({
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

  return <V2PortfolioPage locale={requestLocale} routeKey="home" />;
}
