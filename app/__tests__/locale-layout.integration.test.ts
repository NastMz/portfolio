import type { ReactNode } from "react";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

const { getMessagesMock, notFoundMock, setRequestLocaleMock } = vi.hoisted(
  () => ({
    getMessagesMock: vi.fn(),
    notFoundMock: vi.fn(() => {
      throw new Error("NEXT_NOT_FOUND");
    }),
    setRequestLocaleMock: vi.fn(),
  }),
);

vi.mock("next-intl", () => ({
  NextIntlClientProvider: ({ children }: { children: ReactNode }) =>
    createElement("mock-next-intl-provider", null, children),
}));

vi.mock("next-intl/server", () => ({
  getMessages: getMessagesMock,
  setRequestLocale: setRequestLocaleMock,
}));

vi.mock("next/navigation", () => ({
  notFound: notFoundMock,
}));

vi.mock("@/components/theme-provider", () => ({
  ThemeProvider: ({ children }: { children: ReactNode }) =>
    createElement("mock-theme-provider", null, children),
}));

vi.mock("@/components/atoms/ui/sonner", () => ({
  Toaster: () => createElement("mock-toaster"),
}));

vi.mock("@/features/content/loaders", () => ({
  loadPortfolioContent: vi.fn(),
}));

import LocaleLayout from "@/app/[locale]/layout";

describe("locale layout integration", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("keeps the locale shell without a top-level intl client provider or message payload", async () => {
    const markup = renderToStaticMarkup(
      await LocaleLayout({
        children: createElement("div", null, "portfolio-shell"),
        params: Promise.resolve({ locale: "en" }),
      }),
    );

    expect(setRequestLocaleMock).toHaveBeenCalledWith("en");
    expect(getMessagesMock).not.toHaveBeenCalled();
    expect(markup).not.toContain("mock-next-intl-provider");
    expect(markup).toContain("mock-theme-provider");
    expect(markup).toContain("mock-toaster");
    expect(markup).toContain("portfolio-shell");
  });

  it("still rejects unsupported locales before rendering the shell", async () => {
    await expect(
      LocaleLayout({
        children: createElement("div", null, "portfolio-shell"),
        params: Promise.resolve({ locale: "fr" }),
      }),
    ).rejects.toThrow("NEXT_NOT_FOUND");

    expect(notFoundMock).toHaveBeenCalledTimes(1);
    expect(setRequestLocaleMock).not.toHaveBeenCalled();
  });
});
