import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { V2SectionNavigation } from "@/features/v2/ui/V2SectionNavigation";

const tokensPath = resolve(__dirname, "../../tokens/tokens.css");

describe("V2SectionNavigation", () => {
  it("keeps the version info affordance local and removes the Material Symbols dependency", () => {
    const markup = renderToStaticMarkup(
      createElement(V2SectionNavigation, {
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
          version: "v2.1.4",
        },
      }),
    );
    const tokensCss = readFileSync(tokensPath, "utf8");

    expect(markup).toContain("v2.1.4");
    expect(markup).toContain("<svg");
    expect(markup).not.toContain("material-symbols-outlined");
    expect(tokensCss).not.toContain("Material+Symbols");
    expect(tokensCss).not.toContain(".material-symbols-outlined");
  });
});
