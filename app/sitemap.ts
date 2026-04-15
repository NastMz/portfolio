import type { MetadataRoute } from "next";
import { getCanonicalSitemapEntries } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const priorityByRoute = {
    home: 1,
    projects: 0.8,
    contact: 0.8,
  } as const;

  return getCanonicalSitemapEntries().map(({ routeKey, url }) => ({
    url,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: priorityByRoute[routeKey],
  }));
}
