import { z } from "zod";
import type { Locale } from "@/i18n/config";
import portfolioEn from "@/data/portfolio/portfolio-en.json";
import portfolioEs from "@/data/portfolio/portfolio-es.json";

const portfolioSeoContentSchema = z.object({
  seo: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  }),
});

export type PortfolioSeoContent = z.infer<typeof portfolioSeoContentSchema>;

const parsedContentByLocale = {
  en: portfolioSeoContentSchema.parse(portfolioEn),
  es: portfolioSeoContentSchema.parse(portfolioEs),
} satisfies Record<"en" | "es", PortfolioSeoContent>;

export const loadPortfolioContent = async (
  locale: Locale,
): Promise<PortfolioSeoContent> => {
  return parsedContentByLocale[locale];
};
