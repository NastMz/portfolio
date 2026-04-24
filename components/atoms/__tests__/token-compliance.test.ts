import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Button } from "../Button";
import { Card } from "../Card";
import { DecisionCard } from "@/components/molecules/DecisionCard";
import { DocCard } from "@/components/molecules/DocCard";
import { MetricPanel } from "@/components/molecules/MetricPanel";
import { Nav } from "@/components/molecules/Nav";
import { SectionShell } from "@/components/molecules/SectionShell";
import { SignalBadge } from "../SignalBadge";
import { SystemSideNav } from "@/components/organisms/SystemSideNav";
import { ShellPanel } from "@/components/molecules/ShellPanel";
import { ShellSectionHeader } from "@/components/molecules/ShellSectionHeader";
import { SystemTopBar } from "@/components/organisms/SystemTopBar";

import { TerminalInput } from "../TerminalInput";

const tokenRegex = /var\(--([a-z0-9-]+)\)/gi;

const extractTokenNames = (markup: string): string[] => {
  const matches = markup.matchAll(tokenRegex);
  return [...matches].map((entry) => entry[1]);
};

describe(" token compliance in UI primitives", () => {
  it("uses only  token namespace in primitive styles", () => {
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
        createElement(ShellSectionHeader, {
          title: "Artifacts",
          alias: "// SHIP LOG",
          sourceLabel: "// source: [build_log]",
          aside: "[TERMINAL_NODE: 03]",
        }),
      ),
      renderToStaticMarkup(
        createElement(
          ShellPanel,
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
    expect(tokens.every((token) => token.startsWith("portfolio-"))).toBe(true);
    expect(markup).not.toContain("rounded-full");
    expect(markup).not.toContain("rounded-md");
  });
});
