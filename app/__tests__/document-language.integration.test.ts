import { describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { NextRequest, NextResponse } from "next/server";

vi.mock("next-intl/middleware", () => ({
  default: vi.fn(() =>
    vi.fn((request: NextRequest) =>
      NextResponse.next({ request: { headers: request.headers } }),
    ),
  ),
}));

const { headersMock } = vi.hoisted(() => ({
  headersMock: vi.fn(),
}));

vi.mock("next/headers", () => ({
  headers: headersMock,
}));

vi.mock("next/font/google", () => ({
  IBM_Plex_Sans: vi.fn(() => ({ variable: "font-ibm-plex-sans" })),
  JetBrains_Mono: vi.fn(() => ({ variable: "font-jetbrains-mono" })),
}));

vi.mock("@vercel/analytics/next", () => ({
  Analytics: () => null,
}));

vi.mock("@vercel/speed-insights/next", () => ({
  SpeedInsights: () => null,
}));

import { appendLocaleHeader } from "@/middleware";
import RootLayout from "@/app/layout";

describe("document language propagation", () => {
  it("sets the locale header in middleware for supported locale segments", () => {
    const englishResponse = appendLocaleHeader(
      NextResponse.next(),
      new NextRequest("https://example.com/en/projects"),
    );
    const spanishResponse = appendLocaleHeader(
      NextResponse.next(),
      new NextRequest("https://example.com/es/contact"),
    );

    expect(englishResponse.headers.get("x-middleware-request-x-locale")).toBe(
      "en",
    );
    expect(spanishResponse.headers.get("x-middleware-request-x-locale")).toBe(
      "es",
    );
  });

  it("keeps the default entry locale for the bare root path", () => {
    const response = appendLocaleHeader(
      NextResponse.next(),
      new NextRequest("https://example.com/"),
    );

    expect(response.headers.get("x-middleware-request-x-locale")).toBe("en");
  });

  it("renders html lang from the propagated locale header", async () => {
    headersMock.mockResolvedValue(new Headers({ "x-locale": "en" }));

    const englishMarkup = renderToStaticMarkup(
      await RootLayout({ children: createElement("div", null, "english") }),
    );

    headersMock.mockResolvedValue(new Headers({ "x-locale": "es" }));

    const spanishMarkup = renderToStaticMarkup(
      await RootLayout({ children: createElement("div", null, "spanish") }),
    );

    headersMock.mockResolvedValue(new Headers());

    const rootMarkup = renderToStaticMarkup(
      await RootLayout({ children: createElement("div", null, "root") }),
    );

    expect(englishMarkup).toContain('<html lang="en"');
    expect(spanishMarkup).toContain('<html lang="es"');
    expect(rootMarkup).toContain('<html lang="en"');
  });

  it("keeps root html lang driven by the x-locale header after locale tree changes", async () => {
    headersMock.mockResolvedValue(new Headers({ "x-locale": "es" }));

    const markup = renderToStaticMarkup(
      await RootLayout({
        children: createElement(
          "main",
          { "data-tree": "locale-shell" },
          "shell",
        ),
      }),
    );

    expect(markup).toContain('<html lang="es"');
    expect(markup).toContain('data-tree="locale-shell"');
  });
});
