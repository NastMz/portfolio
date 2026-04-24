"use client";

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  BOOT_STORAGE_KEY,
  BOOT_REPLAY_EVENT,
} from "@/components/organisms/boot.constants";

const BOOT_LINES = [
  "[SYS_CORE: v23.07]",
  "INITIALIZING...",
  "LOADING MODULES...",
  "identity",
  "systems",
  "decision_log",
  "stack",
  "STATUS: OK",
  "ACCESS LEVEL: VERIFIED",
  "ENTERING INTERFACE...",
] as const;

const LINE_REVEAL_MS = 100;
const LINE_ANIMATION_MS = 120;
const POST_LINES_PAUSE_MS = 300;
const FADE_DURATION_MS = 260;
const REDUCED_MOTION_REPLAY_MS = 700;
const FADE_START_MS =
  (BOOT_LINES.length - 1) * LINE_REVEAL_MS +
  LINE_ANIMATION_MS +
  POST_LINES_PAUSE_MS;
const BOOT_TOTAL_MS = FADE_START_MS + FADE_DURATION_MS;

type BootPhase = "booting" | "fading" | "done";

function hasReducedMotion() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getBootSeenInSession() {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return window.sessionStorage.getItem(BOOT_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function persistBootSeenInSession() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.setItem(BOOT_STORAGE_KEY, "true");
  } catch {
    // Ignore storage errors and continue without persistence.
  }
}

function getInitialBootPhase(): BootPhase {
  if (hasReducedMotion() || getBootSeenInSession()) {
    return "done";
  }

  return "booting";
}

interface BootOverlayProps {
  children: ReactNode;
}

export function BootOverlay({ children }: BootOverlayProps) {
  const [phase, setPhase] = useState<BootPhase>(getInitialBootPhase);
  const initialPhaseRef = useRef(phase);
  const reducedMotionRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  const bootStyles = useMemo(
    () =>
      ({
        "--boot-line-duration": `${LINE_ANIMATION_MS}ms`,
        "--boot-fade-duration": `${FADE_DURATION_MS}ms`,
      }) as CSSProperties,
    [],
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mediaQuery.matches;

    const clearSequenceTimers = () => {
      timersRef.current.forEach((timer) => {
        window.clearTimeout(timer);
      });

      timersRef.current = [];
    };

    const startSequence = (mode: "full" | "reduced") => {
      clearSequenceTimers();
      setPhase("booting");

      if (mode === "reduced") {
        timersRef.current = [
          window.setTimeout(() => {
            setPhase("done");
          }, REDUCED_MOTION_REPLAY_MS),
        ];

        return;
      }

      timersRef.current = [
        window.setTimeout(() => {
          setPhase("fading");
        }, FADE_START_MS),
        window.setTimeout(() => {
          setPhase("done");
        }, BOOT_TOTAL_MS),
      ];
    };

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      reducedMotionRef.current = event.matches;
    };

    const handleReplay = () => {
      persistBootSeenInSession();
      startSequence(reducedMotionRef.current ? "reduced" : "full");
    };

    if (initialPhaseRef.current === "booting") {
      persistBootSeenInSession();
      startSequence("full");
    }

    mediaQuery.addEventListener("change", handleReducedMotionChange);
    window.addEventListener(BOOT_REPLAY_EVENT, handleReplay);

    return () => {
      clearSequenceTimers();
      mediaQuery.removeEventListener("change", handleReducedMotionChange);
      window.removeEventListener(BOOT_REPLAY_EVENT, handleReplay);
    };
  }, []);

  const shouldRenderOverlay = phase !== "done";
  const isContentVisible = phase === "fading" || phase === "done";
  const contentClassName = useMemo(
    () =>
      [
        "transition-opacity ease-linear",
        isContentVisible
          ? "opacity-100"
          : "opacity-0 pointer-events-none select-none",
      ].join(" "),
    [isContentVisible],
  );

  return (
    <>
      <div
        aria-hidden={shouldRenderOverlay}
        className={contentClassName}
        style={{ transitionDuration: `${FADE_DURATION_MS}ms` }}
      >
        {children}
      </div>

      {shouldRenderOverlay ? (
        <div
          aria-hidden="true"
          className="boot-overlay"
          data-phase={phase}
          style={bootStyles}
        >
          <div className="boot-overlay__frame">
            {BOOT_LINES.map((line, index) => (
              <p
                key={line}
                className="boot-overlay__line"
                style={{ animationDelay: `${index * LINE_REVEAL_MS}ms` }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
