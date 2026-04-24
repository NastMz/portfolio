import { createElement } from "react";

export interface ParsedNavLabel {
  technical: string;
  human?: string;
}

export function parseNavLabel(label: string): ParsedNavLabel {
  const [technical, human] = label.split("//").map((part) => part.trim());

  return {
    technical,
    human: human && human.length > 0 ? `// ${human}` : undefined,
  };
}

export function renderNavLabel(
  label: string,
  className?: string,
  humanClassName?: string,
) {
  const parsed = parseNavLabel(label);

  return createElement(
    "span",
    { className },
    createElement("span", { className: "block" }, parsed.technical),
    parsed.human
      ? createElement(
          "span",
          {
            className: `block normal-case tracking-normal ${humanClassName ?? "text-zinc-500"}`,
          },
          parsed.human,
        )
      : null,
  );
}

export function renderMetadataLabel(label: string) {
  const normalized = label
    .replace(/\/\//g, "")
    .replace(/^\[|\]$/g, "")
    .trim()
    .toLowerCase();

  return `// source: [${normalized}]`;
}
