import { describe, expect, it } from "vitest";
import {
  HYPE_RESISTANCE_BASE_VALUE,
  createInitialHypeResistanceSnapshot,
  getNextHypeResistanceSnapshot,
} from "@/features/v2/ui/V2HypeResistanceMetric";

describe("V2HypeResistanceMetric helpers", () => {
  it("starts at the nominal baseline", () => {
    expect(createInitialHypeResistanceSnapshot()).toEqual({
      value: HYPE_RESISTANCE_BASE_VALUE,
      status: "NOMINAL",
      previousStatus: "NOMINAL",
    });
  });

  it("applies bounded two-decimal variations", () => {
    const nextSnapshot = getNextHypeResistanceSnapshot(
      createInitialHypeResistanceSnapshot(),
      [0.2, 0.99],
    );

    expect(nextSnapshot.value).toBe(99.95);
    expect(nextSnapshot.status).toBe("FLUCTUATING");
  });

  it("emits a recovered state when leaving degraded mode", () => {
    const recoveredSnapshot = getNextHypeResistanceSnapshot(
      {
        value: 99.92,
        status: "DEGRADED",
        previousStatus: "DEGRADED",
      },
      [0.1, 0.99],
    );

    expect(recoveredSnapshot.value).toBe(99.95);
    expect(recoveredSnapshot.status).toBe("RECOVERED");
    expect(recoveredSnapshot.previousStatus).toBe("FLUCTUATING");
  });

  it("returns to nominal after the optional recovery step", () => {
    const stabilizedSnapshot = getNextHypeResistanceSnapshot({
      value: 99.98,
      status: "RECOVERED",
      previousStatus: "STABLE",
    });

    expect(stabilizedSnapshot.value).toBe(99.98);
    expect(stabilizedSnapshot.status).toBe("NOMINAL");
    expect(stabilizedSnapshot.previousStatus).toBe("NOMINAL");
  });
});
