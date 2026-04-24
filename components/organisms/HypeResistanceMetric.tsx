"use client";

import { useEffect, useMemo, useState } from "react";

interface HypeResistanceMetricProps {
  initialValue?: number;
}

interface HypeResistanceSnapshot {
  value: number;
  status: HypeResistanceStatus;
  previousStatus: ThresholdStatus;
}

type ThresholdStatus = "NOMINAL" | "STABLE" | "FLUCTUATING" | "DEGRADED";
type HypeResistanceStatus = ThresholdStatus | "RECOVERED";

const BASE_VALUE = 99.98;
const MIN_VALUE = 99.9;
const MAX_VALUE = 100;
const MIN_INTERVAL_MS = 6000;
const INTERVAL_WINDOW_MS = 6000;
const VARIATION_STEPS = [0.01, 0.02, 0.03] as const;

function getThresholdStatus(value: number): ThresholdStatus {
  if (value >= 99.98) {
    return "NOMINAL";
  }

  if (value >= 99.96) {
    return "STABLE";
  }

  if (value >= 99.93) {
    return "FLUCTUATING";
  }

  return "DEGRADED";
}

function clampValue(value: number) {
  return Math.min(MAX_VALUE, Math.max(MIN_VALUE, Number(value.toFixed(2))));
}

function getNextDelay(randomValue: number = Math.random()) {
  return MIN_INTERVAL_MS + Math.floor(randomValue * (INTERVAL_WINDOW_MS + 1));
}

function getVariationMagnitude(randomValue: number = Math.random()) {
  return (
    VARIATION_STEPS[Math.floor(randomValue * VARIATION_STEPS.length)] ??
    VARIATION_STEPS[0]
  );
}

function getVariationDirection(
  currentValue: number,
  randomValue: number = Math.random(),
) {
  if (currentValue <= 99.92) {
    return randomValue < 0.85 ? 1 : -1;
  }

  if (currentValue >= 99.99) {
    return randomValue < 0.75 ? -1 : 1;
  }

  if (currentValue > BASE_VALUE) {
    return randomValue < 0.6 ? -1 : 1;
  }

  if (currentValue < BASE_VALUE) {
    return randomValue < 0.6 ? 1 : -1;
  }

  return randomValue < 0.5 ? -1 : 1;
}

export function createInitialHypeResistanceSnapshot(
  initialValue: number = BASE_VALUE,
): HypeResistanceSnapshot {
  const normalizedValue = clampValue(initialValue);
  const status = getThresholdStatus(normalizedValue);

  return {
    value: normalizedValue,
    status,
    previousStatus: status,
  };
}

export function getNextHypeResistanceSnapshot(
  currentSnapshot: HypeResistanceSnapshot,
  randoms: [number, number] = [Math.random(), Math.random()],
): HypeResistanceSnapshot {
  if (currentSnapshot.status === "RECOVERED") {
    const nominalValue = clampValue(
      Math.max(BASE_VALUE, currentSnapshot.value),
    );

    return {
      value: nominalValue,
      status: getThresholdStatus(nominalValue),
      previousStatus: getThresholdStatus(nominalValue),
    };
  }

  const [directionRandom, magnitudeRandom] = randoms;
  const magnitude = getVariationMagnitude(magnitudeRandom);
  const direction = getVariationDirection(
    currentSnapshot.value,
    directionRandom,
  );
  const nextValue = clampValue(currentSnapshot.value + direction * magnitude);
  const thresholdStatus = getThresholdStatus(nextValue);

  if (
    currentSnapshot.previousStatus === "DEGRADED" &&
    thresholdStatus !== "DEGRADED"
  ) {
    return {
      value: nextValue,
      status: "RECOVERED",
      previousStatus: thresholdStatus,
    };
  }

  return {
    value: nextValue,
    status: thresholdStatus,
    previousStatus: thresholdStatus,
  };
}

function formatMetric(snapshot: HypeResistanceSnapshot) {
  return `${snapshot.value.toFixed(2)}% [${snapshot.status}]`;
}

export function HypeResistanceMetric({
  initialValue = BASE_VALUE,
}: HypeResistanceMetricProps) {
  const [snapshot, setSnapshot] = useState(() =>
    createInitialHypeResistanceSnapshot(initialValue),
  );

  useEffect(() => {
    setSnapshot(createInitialHypeResistanceSnapshot(initialValue));
  }, [initialValue]);

  useEffect(() => {
    let timeoutId: number | undefined;

    const scheduleNextTick = () => {
      timeoutId = window.setTimeout(() => {
        setSnapshot((currentSnapshot) =>
          getNextHypeResistanceSnapshot(currentSnapshot),
        );
        scheduleNextTick();
      }, getNextDelay());
    };

    scheduleNextTick();

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  const reservedWidth = useMemo(
    () =>
      formatMetric({
        value: 100,
        status: "FLUCTUATING",
        previousStatus: "FLUCTUATING",
      }).length + 1,
    [],
  );

  return (
    <span
      className="inline-block min-w-0 tabular-nums"
      style={{ minWidth: `${reservedWidth}ch` }}
    >
      {formatMetric(snapshot)}
    </span>
  );
}

export {
  BASE_VALUE as HYPE_RESISTANCE_BASE_VALUE,
  MIN_INTERVAL_MS as HYPE_RESISTANCE_MIN_INTERVAL_MS,
  INTERVAL_WINDOW_MS as HYPE_RESISTANCE_INTERVAL_WINDOW_MS,
};
