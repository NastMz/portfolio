import { describe, expect, it } from "vitest";
import {
  CANONICAL_ROUTE_PATHS,
  getCanonicalRoutePath,
  getCanonicalUrl,
  getLocalizedAlternates,
  getProfileImageUrl,
  siteConfig,
} from "@/lib/site";

describe("canonical site helpers", () => {
  it("builds canonical locale paths from a single route map", () => {
    expect(CANONICAL_ROUTE_PATHS).toEqual({
      home: "",
      projects: "/projects",
      contact: "/contact",
    });

    expect(getCanonicalRoutePath("en", "home")).toBe("/en");
    expect(getCanonicalRoutePath("es", "projects")).toBe("/es/projects");
    expect(getCanonicalRoutePath("en", "contact")).toBe("/en/contact");
  });

  it("generates absolute canonical urls, alternates, and image urls without version helpers", () => {
    expect(getCanonicalUrl("en", "projects")).toBe(
      `${siteConfig.baseUrl}/en/projects`,
    );
    expect(getProfileImageUrl("/images/custom.jpg")).toBe(
      `${siteConfig.baseUrl}/images/custom.jpg`,
    );
    expect(getLocalizedAlternates("contact")).toEqual({
      en: `${siteConfig.baseUrl}/en/contact`,
      es: `${siteConfig.baseUrl}/es/contact`,
      "x-default": `${siteConfig.baseUrl}/en/contact`,
    });
  });
});
