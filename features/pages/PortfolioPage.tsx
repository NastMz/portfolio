import { getMessages } from "next-intl/server";
import type { Locale } from "@/i18n/config";
import { PortfolioTemplate } from "@/components/templates/PortfolioTemplate";
import { PortfolioMessagesShape } from "@/components/organisms/sections/types";
import { getCanonicalRoutePath, type CanonicalRouteKey } from "@/lib/site";

interface PortfolioPageProps {
  locale: Locale;
  routeKey?: CanonicalRouteKey;
}

type NavAnchor =
  | "#overview"
  | "#systems"
  | "#artifacts"
  | "#decision-log"
  | "#stack"
  | "#contact";

const canonicalNavAnchors: NavAnchor[] = [
  "#overview",
  "#systems",
  "#artifacts",
  "#decision-log",
  "#stack",
  "#contact",
];

function resolvePortfolioMessagesShape(messages: unknown): PortfolioMessagesShape {
  const payload = messages as { Portfolio?: PortfolioMessagesShape };

  if (!payload?.Portfolio) {
    throw new Error("Missing 'Portfolio' messages payload for portfolio experience");
  }

  return payload.Portfolio;
}

function resolveCanonicalNav(items: any[]): any[] {
  const byHref = new Map(items.map((item) => [item.href, item]));

  return canonicalNavAnchors.map((href) => {
    const item = byHref.get(href);

    if (!item) {
      throw new Error(`Missing canonical portfolio navigation item for ${href}`);
    }

    return item;
  });
}

export async function PortfolioPage({
  locale,
  routeKey = "home",
}: PortfolioPageProps) {
  const messages = await getMessages();
  const copy = resolvePortfolioMessagesShape(messages);
  const canonicalSidebarNav = resolveCanonicalNav(copy.sidebar.nav);
  const targetLocale: Locale = locale === "en" ? "es" : "en";
  const localeSwitchHref = getCanonicalRoutePath(targetLocale, routeKey);
  const localeSwitchCode = targetLocale.toUpperCase();
  const cvHref =
    locale === "es"
      ? "/cv/CV_Kevin_Martinez_ES.pdf"
      : "/cv/CV_Kevin_Martinez_EN.pdf";

  return (
    <PortfolioTemplate
      locale={locale}
      routeKey={routeKey}
      copy={copy}
      canonicalSidebarNav={canonicalSidebarNav}
      localeSwitchHref={localeSwitchHref}
      localeSwitchCode={localeSwitchCode}
      cvHref={cvHref}
    />
  );
}
