import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  Button,
  Card,
  DecisionCard,
  DocCard,
  MetricPanel,
  Nav,
  SectionShell,
  SignalBadge,
  SystemSideNav,
  V2ShellPanel,
  V2ShellSectionHeader,
  SystemTopBar,
  TerminalInput,
} from "@/features/v2/ui";

const tokenRegex = /var\(--([a-z0-9-]+)\)/gi;

const extractTokenNames = (markup: string): string[] => {
  const matches = markup.matchAll(tokenRegex);
  return [...matches].map((entry) => entry[1]);
};

describe("v2 token compliance in UI primitives", () => {
  it("uses only v2 token namespace in primitive styles", () => {
    const markup = [
      renderToStaticMarkup(createElement(Button, null, "Primary")),
      renderToStaticMarkup(createElement(Card, null, "Card content")),
      renderToStaticMarkup(
        createElement(DocCard, { title: "Doc card" }, "Doc body"),
      ),
      renderToStaticMarkup(
        createElement(DecisionCard, {
          title: "Decision",
          context: "Context",
          decision: "Decision made",
          tradeoff: "Tradeoff accepted",
        }),
      ),
      renderToStaticMarkup(createElement(SignalBadge, null, "signal: info")),
      renderToStaticMarkup(
        createElement(TerminalInput, { label: "Availability", value: "Open" }),
      ),
      renderToStaticMarkup(
        createElement(MetricPanel, {
          label: "delivery",
          value: "Quality gate",
          detail: "metadata · e2e",
        }),
      ),
      renderToStaticMarkup(
        createElement(Nav, {
          locale: "en",
          localeLabel: "Switch locale",
          items: [
            { label: "Summary", href: "#summary" },
            { label: "Projects", href: "#projects" },
          ],
        }),
      ),
      renderToStaticMarkup(
        createElement(
          SectionShell,
          { id: "summary", title: "Summary", subtitle: "Subtitle" },
          "Child",
        ),
      ),
      renderToStaticMarkup(
        createElement(SystemSideNav, {
          title: "Sections",
          items: [{ label: "Hero", href: "#hero" }],
        }),
      ),
      renderToStaticMarkup(
        createElement(SystemTopBar, {
          title: "OPS",
          routeLabel: "Route: Home",
          localeSwitchLabel: "Switch locale",
          localeHref: "/es",
          links: [{ label: "Home", href: "/en" }],
        }),
      ),
      renderToStaticMarkup(
        createElement(V2ShellSectionHeader, {
          title: "Artifacts",
          alias: "// SHIP LOG",
          sourceLabel: "// source: [build_log]",
          aside: "[TERMINAL_NODE: 03]",
        }),
      ),
      renderToStaticMarkup(
        createElement(
          V2ShellPanel,
          {
            label: "[RECORD]",
            tone: "muted",
          },
          "Panel body",
        ),
      ),
    ].join("\n");

    const tokens = extractTokenNames(markup);

    expect(tokens.length).toBeGreaterThan(0);
    expect(tokens.every((token) => token.startsWith("v2-"))).toBe(true);
    expect(markup).not.toContain("rounded-full");
    expect(markup).not.toContain("rounded-md");
  });
});
