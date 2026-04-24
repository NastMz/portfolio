"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "input",
  "select",
  "textarea",
  "summary",
  "label[for]",
  '[role="button"]',
  '[role="link"]',
  "[data-trace-id]",
].join(",");

const VALID_STATES = ["loaded", "resolved", "inspected"] as const;

type TraceState = (typeof VALID_STATES)[number];
type TracePhase = "idle" | "typing" | "holding" | "fading";

const TYPING_DURATION_MS = 150;
const HOLD_DURATION_MS = 2000;
const FADE_DURATION_MS = 180;
const RECENT_REPEAT_GUARD_MS = 180;

function isTraceState(value: string | null): value is TraceState {
  return VALID_STATES.includes(value as TraceState);
}

function normalizeTraceToken(value: string): string {
  const normalized = value
    .trim()
    .replace(/^#/, "")
    .replace(/^\//, "")
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[^a-z0-9]+/gi, "_")
    .replace(/^_+|_+$/g, "")
    .toUpperCase();

  if (!normalized) {
    return "NODE";
  }

  return normalized.slice(0, 20);
}

function resolveTraceId(target: Element): string {
  const interactiveTarget = target.closest<HTMLElement>(INTERACTIVE_SELECTOR);

  if (!interactiveTarget) {
    return "NODE";
  }

  const dataId = interactiveTarget.dataset.traceId;

  if (dataId) {
    return normalizeTraceToken(dataId);
  }

  const href = interactiveTarget.getAttribute("href");

  if (href) {
    if (href.startsWith("#")) {
      return normalizeTraceToken(href);
    }

    const pathname = href.split(/[?#]/)[0];
    const lastSegment = pathname.split("/").filter(Boolean).pop();

    if (lastSegment) {
      return normalizeTraceToken(lastSegment);
    }
  }

  const candidate =
    interactiveTarget.getAttribute("aria-label") ??
    interactiveTarget.getAttribute("title") ??
    interactiveTarget.getAttribute("name") ??
    interactiveTarget.getAttribute("id") ??
    interactiveTarget.textContent;

  return normalizeTraceToken(candidate ?? "NODE");
}

function resolveTraceState(target: Element): TraceState {
  const interactiveTarget = target.closest<HTMLElement>(INTERACTIVE_SELECTOR);

  if (!interactiveTarget) {
    return "inspected";
  }

  const explicitState = interactiveTarget.dataset.traceState;

  if (explicitState && isTraceState(explicitState)) {
    return explicitState;
  }

  if (
    interactiveTarget.matches("input, select, textarea, summary, label[for]")
  ) {
    return "inspected";
  }

  if (interactiveTarget.matches('button, [role="button"]')) {
    return "loaded";
  }

  return "resolved";
}

export function HoverTrace() {
  const [message, setMessage] = useState("");
  const [visibleMessage, setVisibleMessage] = useState("");
  const [phase, setPhase] = useState<TracePhase>("idle");
  const timeoutRefs = useRef<number[]>([]);
  const activeTargetRef = useRef<HTMLElement | null>(null);
  const lastSignatureRef = useRef("");
  const lastTimestampRef = useRef(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (!mediaQuery.matches) {
      return;
    }

    const clearTraceTimers = () => {
      timeoutRefs.current.forEach((timeoutId) =>
        window.clearTimeout(timeoutId),
      );
      timeoutRefs.current = [];
    };

    const runTrace = (target: HTMLElement) => {
      const traceId = resolveTraceId(target);
      const traceState = resolveTraceState(target);
      const nextMessage = `TRACE: [${traceId}] → [${traceState}]`;
      const signature = `${traceId}:${traceState}`;
      const now = window.performance.now();

      if (
        signature === lastSignatureRef.current &&
        now - lastTimestampRef.current < RECENT_REPEAT_GUARD_MS
      ) {
        return;
      }

      lastSignatureRef.current = signature;
      lastTimestampRef.current = now;

      clearTraceTimers();
      setMessage(nextMessage);
      setVisibleMessage(reducedMotionQuery.matches ? nextMessage : "");
      setPhase(reducedMotionQuery.matches ? "holding" : "typing");

      if (reducedMotionQuery.matches) {
        timeoutRefs.current.push(
          window.setTimeout(() => setPhase("fading"), HOLD_DURATION_MS),
          window.setTimeout(
            () => setPhase("idle"),
            HOLD_DURATION_MS + FADE_DURATION_MS,
          ),
        );

        return;
      }

      const totalCharacters = nextMessage.length;
      const typingStepMs = Math.max(
        22,
        Math.floor(TYPING_DURATION_MS / Math.max(totalCharacters, 1)),
      );

      for (let index = 1; index <= totalCharacters; index += 1) {
        timeoutRefs.current.push(
          window.setTimeout(() => {
            setVisibleMessage(nextMessage.slice(0, index));
          }, index * typingStepMs),
        );
      }

      timeoutRefs.current.push(
        window.setTimeout(() => setPhase("holding"), TYPING_DURATION_MS),
        window.setTimeout(
          () => setPhase("fading"),
          TYPING_DURATION_MS + HOLD_DURATION_MS,
        ),
        window.setTimeout(
          () => setPhase("idle"),
          TYPING_DURATION_MS + HOLD_DURATION_MS + FADE_DURATION_MS,
        ),
      );
    };

    const handlePointerOver = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>(
        INTERACTIVE_SELECTOR,
      );

      if (!target) {
        activeTargetRef.current = null;
        return;
      }

      if (activeTargetRef.current === target) {
        return;
      }

      activeTargetRef.current = target;
      runTrace(target);
    };

    const handlePointerLeave = () => {
      activeTargetRef.current = null;
    };

    const handleFocusIn = (event: FocusEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>(
        INTERACTIVE_SELECTOR,
      );

      if (!target) {
        return;
      }

      runTrace(target);
    };

    document.addEventListener("pointerover", handlePointerOver, {
      passive: true,
    });
    document.addEventListener("pointerleave", handlePointerLeave, {
      passive: true,
    });
    document.addEventListener("focusin", handleFocusIn);

    return () => {
      clearTraceTimers();
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, []);

  return (
    <div aria-hidden="true" className="-hover-trace" data-phase={phase}>
      <span className="-hover-trace__message">
        {phase === "idle" ? "" : visibleMessage || message}
      </span>
    </div>
  );
}
