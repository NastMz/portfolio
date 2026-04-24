import type { Locale } from "@/i18n/config";
import { PortfolioPage } from "./PortfolioPage";

interface ContactPageProps {
  locale: Locale;
}

export async function ContactPage({ locale }: ContactPageProps) {
  return <PortfolioPage locale={locale} routeKey="contact" />;
}
