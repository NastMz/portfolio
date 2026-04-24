import { afterEach, describe, expect, it, vi } from "vitest";

const { notFoundMock, setRequestLocaleMock } =
  vi.hoisted(() => {
    return {
      notFoundMock: vi.fn(() => {
        throw new Error("NEXT_NOT_FOUND");
      }),
      setRequestLocaleMock: vi.fn(),
    };
  });

vi.mock("next/navigation", () => ({
  notFound: notFoundMock,
}));

vi.mock("next-intl/server", () => ({
  setRequestLocale: setRequestLocaleMock,
}));

import RootLocalePage from "@/app/[locale]/page";

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
    expect(setRequestLocaleMock).not.toHaveBeenCalled();
  });

  it("accepts supported locales and sets request locale", async () => {
    // Note: PortfolioPage will fail rendering because we are not mocking its dependencies here,
    // but the route component itself should call setRequestLocale.
    try {
      await RootLocalePage({
        params: Promise.resolve({ locale: "en" }),
      });
    } catch {
      // Expected render error if not fully mocked, but we check the logic before that.
    }

    expect(setRequestLocaleMock).toHaveBeenCalledWith("en");
  });
});
