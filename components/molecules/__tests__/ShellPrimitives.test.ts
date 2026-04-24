import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ShellPanel } from "../ShellPanel";
import { ShellSectionHeader } from "../ShellSectionHeader";

describe(" shell primitives", () => {
  it("renders section headers with title, alias, source label, and aside metadata", () => {
    const markup = renderToStaticMarkup(
      createElement(ShellSectionHeader, {
        title: "Case Studies",
        alias: "// REAL SYSTEMS, REAL DECISIONS",
        sourceLabel: "// source: [expandable_archive]",
        aside: "[ENTRY_POINT: SYSTEMS]",
      }),
    );

    expect(markup).toContain("CASE STUDIES");
    expect(markup).toContain("// REAL SYSTEMS, REAL DECISIONS");
    expect(markup).toContain("// source: [expandable_archive]");
    expect(markup).toContain("[ENTRY_POINT: SYSTEMS]");
    expect(markup).toContain('data-shell-section-header="true"');
  });

  it("renders framed panels with label and tone metadata without changing body content", () => {
    const markup = renderToStaticMarkup(
      createElement(
        ShellPanel,
        {
          label: "[RECORD]",
          tone: "accent",
        },
        createElement("p", null, "Preserved panel body"),
      ),
    );

    expect(markup).toContain("[RECORD]");
    expect(markup).toContain("Preserved panel body");
    expect(markup).toContain('data-shell-panel="accent"');
  });
});
