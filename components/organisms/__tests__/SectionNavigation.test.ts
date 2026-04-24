import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SectionNavigation } from "../SectionNavigation";

const tokensPath = resolve(__dirname, "../../../features/tokens/tokens.css");

describe("SectionNavigation", () => {
  it("keeps the version info affordance local and removes the Material Symbols dependency", () => {
    const markup = renderToStaticMarkup(
      createElement(SectionNavigation, {
        brandTitle: "Kevin Martinez",
        sidebarNavLabel: "Sidebar navigation",
        mobileNavLabel: "Mobile navigation",
        copy: {
          monitorTitle: "monitor",
          monitorItems: [{ label: "mode", value: "canonical" }],
          nav: [
            { label: "overview // summary", href: "#overview" },
            { label: "systems // architecture", href: "#systems" },
            { label: "contact // connect", href: "#contact" },
          ],
          throughputTitle: "throughput",
          throughputLatestLog: "stable",
          version: ".1.4",
        },
      }),
    );
    const tokensCss = readFileSync(tokensPath, "utf8");

    expect(markup).toContain(".1.4");
    expect(markup).toContain("<svg");
    expect(markup).not.toContain("material-symbols-outlined");
    expect(tokensCss).not.toContain("Material+Symbols");
    expect(tokensCss).not.toContain(".material-symbols-outlined");
  });
});
