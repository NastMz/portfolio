import type { ReactNode } from "react";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import enMessages from "@/messages/en.json";

const { getMessagesMock } = vi.hoisted(() => ({
  getMessagesMock: vi.fn(),
}));

vi.mock("next-intl/server", () => ({
  getMessages: getMessagesMock,
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    scroll: _scroll,
    ...props
  }: {
    children: ReactNode;
    href: string;
    scroll?: boolean;
  }) => createElement("a", { href, ...props }, children),
}));

vi.mock("@/features/v2/ui/V2BootOverlay", () => ({
  V2BootOverlay: ({ children }: { children: ReactNode }) =>
    createElement("mock-boot-overlay", null, children),
}));

vi.mock("@/features/v2/ui/V2CustomCursor", () => ({
  V2CustomCursor: () => createElement("mock-custom-cursor"),
}));

vi.mock("@/features/v2/ui/V2HoverTrace", () => ({
  V2HoverTrace: () => createElement("mock-hover-trace"),
}));

vi.mock("@/features/v2/ui/V2HypeResistanceMetric", () => ({
  V2HypeResistanceMetric: () =>
    createElement("mock-hype-resistance", null, "97"),
}));

vi.mock("@/features/v2/ui/V2SectionNavigation", () => ({
  V2SectionNavigation: () => createElement("mock-section-navigation"),
}));

vi.mock("@/features/v2/ui/V2SystemStateDrift", () => ({
  V2SystemStateDrift: ({ initialState }: { initialState: string }) =>
    createElement("mock-system-state", null, initialState),
}));

vi.mock("@/features/v2/ui/V2BootReplayTitle", () => ({
  V2BootReplayTitle: ({ label }: { label: string }) =>
    createElement("mock-boot-replay-title", null, label),
}));

vi.mock("@/features/v2/ui/V2ContactTerminalForm", () => ({
  V2ContactTerminalForm: () => createElement("mock-contact-terminal-form"),
}));

import { V2PortfolioPage } from "@/features/v2/pages/V2PortfolioPage";

describe("V2PortfolioPage composition refinement", () => {
  afterEach(() => {
    vi.clearAllMocks();
    getMessagesMock.mockResolvedValue(enMessages);
  });

  it("keeps the hero content contract while reframing it as the shell entry point", async () => {
    getMessagesMock.mockResolvedValue(enMessages);

    const markup = renderToStaticMarkup(
      await V2PortfolioPage({ locale: "en", routeKey: "home" }),
    );

    expect(markup).toContain('data-shell-entry="true"');
    expect(markup).toContain("Kevin Martínez");
    expect(markup).toContain("Software Engineer");
    expect(markup).toContain("CASE_STUDIES");
    expect(markup).toContain("INITIATE_CONTACT");
    expect(markup).toContain("DOWNLOAD_CV");
    expect(markup).toContain('href="#systems"');
    expect(markup).toContain('href="#contact"');
    expect(markup).toContain('href="/cv/CV_Kevin_Martinez_EN.pdf"');
    expect(markup).toContain("[ENTRY_POINT: HOME]");
    expect(markup.match(/<h1[\s>]/g)?.length ?? 0).toBe(1);
  });

  it("reframes overview, systems, and downstream sections with shared shell chrome while preserving anchors", async () => {
    getMessagesMock.mockResolvedValue(enMessages);

    const markup = renderToStaticMarkup(
      await V2PortfolioPage({ locale: "en", routeKey: "home" }),
    );

    expect(markup).toContain('id="overview"');
    expect(markup).toContain('id="systems"');
    expect(markup).toContain('id="stack"');
    expect(markup).toContain('data-shell-section-header="true"');
    expect(markup).toContain('data-shell-panel="accent"');
    expect(markup).toContain('data-shell-panel="muted"');
    expect(markup).toContain("Practical Architecture");
    expect(markup).toContain("[CORE_MANIFESTO]");
    expect(markup).toContain("Case Studies");
    expect(markup).toContain("ARTIFACTS");
    expect(markup).toContain("Buffer Overflow");
  });

  it("keeps systems, artifacts, stack, notes, and contact contracts intact after the shell reframing", async () => {
    getMessagesMock.mockResolvedValue(enMessages);

    const markup = renderToStaticMarkup(
      await V2PortfolioPage({ locale: "en", routeKey: "contact" }),
    );

    expect(markup).toContain('id="projects"');
    expect(markup).toContain('id="case-study"');
    expect(markup).toContain('id="artifacts"');
    expect(markup).toContain('id="decision-log"');
    expect(markup).toContain('id="stack-evaluation"');
    expect(markup).toContain('id="notes"');
    expect(markup).toContain('id="contact"');
    expect(markup).toContain('open=""');
    expect(markup).toContain("PROBLEM");
    expect(markup).toContain("DECISION");
    expect(markup).toContain("mock-contact-terminal-form");
  });
});
