import { describe, expect, it, vi } from "vitest";
import {
  RECOVERABLE_LOG_SEQUENCE,
  getNextSidebarLogState,
  getStableRotationsUntilSequence,
} from "../SidebarRotatingLog";

describe("SidebarRotatingLog helpers", () => {
  it("keeps recoverable warnings at low frequency", () => {
    expect(getStableRotationsUntilSequence(0)).toBe(6);
    expect(getStableRotationsUntilSequence(0.99)).toBe(10);
  });

  it("plays the recoverable warning sequence and resolves it before resuming normal logs", () => {
    const logs = [
      "LATEST_LOG: 200 OK - /api/health",
      "LATEST_LOG: EVENT BUS ACK - portfolio.rendered",
    ];

    const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0);

    const incidentStart = getNextSidebarLogState(
      {
        activeIndex: 0,
        currentLog: logs[0],
        pendingSequence: [],
        stableRotationsUntilSequence: 1,
      },
      logs,
    );

    expect(incidentStart.currentLog).toBe(RECOVERABLE_LOG_SEQUENCE[0]);
    expect(incidentStart.pendingSequence).toEqual(
      RECOVERABLE_LOG_SEQUENCE.slice(1),
    );

    const transientFailure = getNextSidebarLogState(incidentStart, logs);
    expect(transientFailure.currentLog).toBe(
      "LATEST_LOG: WARN - transient_failure",
    );

    const resolved = getNextSidebarLogState(transientFailure, logs);
    expect(resolved.currentLog).toBe("LATEST_LOG: OK - retry_resolved");
    expect(resolved.pendingSequence).toEqual([]);

    const normalRotation = getNextSidebarLogState(resolved, logs);
    expect(normalRotation.currentLog).toBe(logs[0]);

    randomSpy.mockRestore();
  });
});
