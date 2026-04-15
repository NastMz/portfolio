import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { tmpdir } from "node:os";
import { afterEach, describe, expect, it } from "vitest";

const projectRoot = resolve(__dirname, "../..");
const scriptPath = resolve(
  projectRoot,
  "scripts/check-v2-performance-gate.mjs",
);

const tempDirectories: string[] = [];

function runPerformanceGate(metricsPath?: string) {
  return execFileSync("node", [scriptPath], {
    cwd: projectRoot,
    env: {
      ...process.env,
      ...(metricsPath ? { V2_PERF_METRICS_PATH: metricsPath } : {}),
    },
    encoding: "utf8",
  });
}

function createMetricsFixture(
  routes: Record<string, { lcp: number; cls: number; inp: number }>,
) {
  const tempDirectory = mkdtempSync(resolve(tmpdir(), "portfolio-perf-gate-"));
  const fixturePath = resolve(tempDirectory, "metrics.json");

  tempDirectories.push(tempDirectory);
  writeFileSync(fixturePath, JSON.stringify({ routes }, null, 2));

  return fixturePath;
}

afterEach(() => {
  while (tempDirectories.length > 0) {
    const tempDirectory = tempDirectories.pop();

    if (tempDirectory) {
      rmSync(tempDirectory, { force: true, recursive: true });
    }
  }
});

describe("v2 performance gate script", () => {
  it("passes when the canonical portfolio routes stay within budget", () => {
    const output = runPerformanceGate();

    expect(output).toContain(
      "Performance gate passed for canonical portfolio routes",
    );
  });

  it("blocks when a canonical route breaches budget thresholds with route-specific output", () => {
    expect(() => {
      runPerformanceGate("reports/performance/v2-route-metrics-breach.json");
    }).toThrowError(/\/en: LCP 3200ms exceeds 2500ms/i);
  });

  it("fails alignment when fixture keys drift from canonical routes", () => {
    const staleFixturePath = createMetricsFixture({
      "/en/v2": { lcp: 2200, cls: 0.06, inp: 180 },
      "/en/projects": { lcp: 2300, cls: 0.07, inp: 190 },
      "/en/contact": { lcp: 2100, cls: 0.05, inp: 170 },
    });

    expect(() => {
      runPerformanceGate(staleFixturePath);
    }).toThrowError(/route alignment/i);
  });
});
