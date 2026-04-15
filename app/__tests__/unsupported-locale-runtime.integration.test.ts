import { afterEach, describe, expect, it, vi } from "vitest";

const { notFoundMock, permanentRedirectMock, setRequestLocaleMock } =
  vi.hoisted(() => {
    return {
      notFoundMock: vi.fn(() => {
        throw new Error("NEXT_NOT_FOUND");
      }),
      permanentRedirectMock: vi.fn((target: string) => {
        throw new Error(`NEXT_PERMANENT_REDIRECT:${target}`);
      }),
      setRequestLocaleMock: vi.fn(),
    };
  });

vi.mock("next/navigation", () => ({
  notFound: notFoundMock,
  permanentRedirect: permanentRedirectMock,
}));

vi.mock("next-intl/server", () => ({
  setRequestLocale: setRequestLocaleMock,
}));

import RootLocalePage from "@/app/[locale]/page";
import LegacyLocalePage from "@/app/[locale]/legacy/page";
import VersionedLocalePage from "@/app/[locale]/v2/page";
import VersionedProjectsPage from "@/app/[locale]/v2/projects/page";
import VersionedContactPage from "@/app/[locale]/v2/contact/page";

describe("unsupported locale runtime behavior", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("rejects unsupported locale at route level by default", async () => {
    await expect(
      RootLocalePage({
        params: Promise.resolve({ locale: "fr" }),
      }),
    ).rejects.toThrow("NEXT_NOT_FOUND");

    expect(notFoundMock).toHaveBeenCalledTimes(1);
  });

  it("rejects unsupported locales before retired and versioned redirects resolve", async () => {
    await expect(
      LegacyLocalePage({
        params: Promise.resolve({ locale: "fr" }),
      }),
    ).rejects.toThrow("NEXT_NOT_FOUND");

    await expect(
      VersionedLocalePage({
        params: Promise.resolve({ locale: "fr" }),
      }),
    ).rejects.toThrow("NEXT_NOT_FOUND");

    await expect(
      VersionedProjectsPage({
        params: Promise.resolve({ locale: "fr" }),
      }),
    ).rejects.toThrow("NEXT_NOT_FOUND");

    await expect(
      VersionedContactPage({
        params: Promise.resolve({ locale: "fr" }),
      }),
    ).rejects.toThrow("NEXT_NOT_FOUND");

    expect(notFoundMock).toHaveBeenCalledTimes(4);
    expect(permanentRedirectMock).not.toHaveBeenCalled();
  });

  it("permanently redirects legacy and versioned routes to canonical locale paths", async () => {
    await expect(
      LegacyLocalePage({
        params: Promise.resolve({ locale: "en" }),
      }),
    ).rejects.toThrow("NEXT_PERMANENT_REDIRECT:/en");

    await expect(
      VersionedLocalePage({
        params: Promise.resolve({ locale: "es" }),
      }),
    ).rejects.toThrow("NEXT_PERMANENT_REDIRECT:/es");

    await expect(
      VersionedProjectsPage({
        params: Promise.resolve({ locale: "en" }),
      }),
    ).rejects.toThrow("NEXT_PERMANENT_REDIRECT:/en/projects");

    await expect(
      VersionedContactPage({
        params: Promise.resolve({ locale: "es" }),
      }),
    ).rejects.toThrow("NEXT_PERMANENT_REDIRECT:/es/contact");

    expect(permanentRedirectMock).toHaveBeenNthCalledWith(1, "/en");
    expect(permanentRedirectMock).toHaveBeenNthCalledWith(2, "/es");
    expect(permanentRedirectMock).toHaveBeenNthCalledWith(3, "/en/projects");
    expect(permanentRedirectMock).toHaveBeenNthCalledWith(4, "/es/contact");
    expect(setRequestLocaleMock).not.toHaveBeenCalled();
  });
});
