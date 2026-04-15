import type { Locale } from "@/i18n/config";
import { V2PortfolioPage } from "./V2PortfolioPage";

interface V2ProjectsPageProps {
  locale: Locale;
}

export async function V2ProjectsPage({ locale }: V2ProjectsPageProps) {
  return <V2PortfolioPage locale={locale} routeKey="projects" />;
}
