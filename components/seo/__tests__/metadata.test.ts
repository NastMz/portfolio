import { afterEach, describe, expect, it, vi } from "vitest";
import { siteConfig } from "@/lib/site";

const { notFoundMock } = vi.hoisted(() => ({
  notFoundMock: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

vi.mock("next/navigation", () => ({
  notFound: notFoundMock,
}));

import { generateMetadata as generateLocaleMetadata } from "@/app/[locale]/layout";
import { generateMetadata as generateProjectsMetadata } from "@/app/[locale]/projects/page";
import { generateMetadata as generateContactMetadata } from "@/app/[locale]/contact/page";

const ORIGINAL_ENV = { ...process.env };

describe("canonical metadata policy", () => {
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
    vi.clearAllMocks();
  });

  it("serves portfolio metadata on the locale homepage", async () => {
    const metadata = await generateLocaleMetadata({
      params: Promise.resolve({ locale: "en" }),
    });

    expect(metadata.title).toBe("Kevin Martinez | Portfolio");
    expect(metadata.description).toBe(
      "Portfolio of Kevin Martinez: backend engineering, modular architecture, and production-grade delivery.",
    );
    expect(String(metadata.alternates?.canonical)).toBe(
      `${siteConfig.baseUrl}/en`,
    );
    expect(metadata.robots).toEqual({ index: true, follow: true });

    const languages = metadata.alternates?.languages as Record<string, string>;
    expect(languages).toEqual({
      en: `${siteConfig.baseUrl}/en`,
      es: `${siteConfig.baseUrl}/es`,
      "x-default": `${siteConfig.baseUrl}/en`,
    });
  });

  it("publishes canonical projects and contact metadata", async () => {
    const projectsMetadata = await generateProjectsMetadata({
      params: Promise.resolve({ locale: "es" }),
    });
    const contactMetadata = await generateContactMetadata({
      params: Promise.resolve({ locale: "en" }),
    });

    expect(String(projectsMetadata.alternates?.canonical)).toBe(
      `${siteConfig.baseUrl}/es/projects`,
    );
    expect(projectsMetadata.robots).toEqual({ index: true, follow: true });

    const projectLanguages = projectsMetadata.alternates?.languages as Record<
      string,
      string
    >;
    expect(projectLanguages).toEqual({
      en: `${siteConfig.baseUrl}/en/projects`,
      es: `${siteConfig.baseUrl}/es/projects`,
      "x-default": `${siteConfig.baseUrl}/en/projects`,
    });

    expect(String(contactMetadata.alternates?.canonical)).toBe(
      `${siteConfig.baseUrl}/en/contact`,
    );

    const contactLanguages = contactMetadata.alternates?.languages as Record<
      string,
      string
    >;
    expect(contactLanguages).toEqual({
      en: `${siteConfig.baseUrl}/en/contact`,
      es: `${siteConfig.baseUrl}/es/contact`,
      "x-default": `${siteConfig.baseUrl}/en/contact`,
    });
  });

  it("rejects unsupported locales before canonical metadata is emitted", async () => {
    await expect(
      generateLocaleMetadata({
        params: Promise.resolve({ locale: "fr" }),
      }),
    ).rejects.toThrow("NEXT_NOT_FOUND");

    await expect(
      generateProjectsMetadata({
        params: Promise.resolve({ locale: "fr" }),
      }),
    ).rejects.toThrow("NEXT_NOT_FOUND");

    await expect(
      generateContactMetadata({
        params: Promise.resolve({ locale: "fr" }),
      }),
    ).rejects.toThrow("NEXT_NOT_FOUND");

    expect(notFoundMock).toHaveBeenCalledTimes(3);
  });
});
