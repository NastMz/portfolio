import type { Locale } from "@/i18n/config";
import { PortfolioPage } from "./PortfolioPage";

interface ProjectsPageProps {
  locale: Locale;
}

export async function ProjectsPage({ locale }: ProjectsPageProps) {
  return <PortfolioPage locale={locale} routeKey="projects" />;
}
