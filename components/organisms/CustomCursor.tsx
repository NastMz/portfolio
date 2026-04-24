"use client";

import { useEffect, useRef } from "react";

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
  '[data-cursor="interactive"]',
].join(",");

export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (!mediaQuery.matches) {
      return;
    }

    const root = rootRef.current;
    const halo = haloRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;

    if (!root || !halo || !ring || !dot) {
      return;
    }

    const route = root.closest(".portfolio-route");

    let frame = 0;
    let isVisible = false;
    let isInteractive = false;
    let isPressed = false;
    let variant = "default";
    let pointerX = 0;
    let pointerY = 0;
    let haloX = 0;
    let haloY = 0;
    let ringX = 0;
    let ringY = 0;

    const syncClasses = () => {
      root.dataset.visible = isVisible ? "true" : "false";
      root.dataset.interactive = isInteractive ? "true" : "false";
      root.dataset.pressed = isPressed ? "true" : "false";
      root.dataset.variant = variant;
    };

    const render = () => {
      const reducedMotion = reducedMotionQuery.matches;
      const nextHaloX = reducedMotion
        ? pointerX
        : haloX + (pointerX - haloX) * 0.12;
      const nextHaloY = reducedMotion
        ? pointerY
        : haloY + (pointerY - haloY) * 0.12;
      const nextRingX = reducedMotion
        ? pointerX
        : ringX + (pointerX - ringX) * 0.36;
      const nextRingY = reducedMotion
        ? pointerY
        : ringY + (pointerY - ringY) * 0.36;

      haloX = nextHaloX;
      haloY = nextHaloY;
      ringX = nextRingX;
      ringY = nextRingY;

      halo.style.transform = `translate3d(${nextHaloX}px, ${nextHaloY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${nextRingX}px, ${nextRingY}px, 0) translate(-50%, -50%)`;
      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;

      if (
        !reducedMotion &&
        (Math.abs(pointerX - haloX) > 0.1 ||
          Math.abs(pointerY - haloY) > 0.1 ||
          Math.abs(pointerX - ringX) > 0.1 ||
          Math.abs(pointerY - ringY) > 0.1)
      ) {
        frame = window.requestAnimationFrame(render);
        return;
      }

      frame = 0;
    };

    const scheduleRender = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const cursorTarget = (event.target as Element | null)?.closest(
        "[data-cursor]",
      );

      pointerX = event.clientX;
      pointerY = event.clientY;
      isVisible = true;
      isInteractive = Boolean(
        (event.target as Element | null)?.closest(INTERACTIVE_SELECTOR),
      );
      variant =
        cursorTarget?.getAttribute("data-cursor") ??
        (isInteractive ? "interactive" : "default");
      route?.setAttribute("data-cursor-ready", "true");
      syncClasses();
      scheduleRender();
    };

    const handlePointerLeave = () => {
      isVisible = false;
      isInteractive = false;
      isPressed = false;
      variant = "default";
      syncClasses();
    };

    const handlePointerDown = () => {
      isPressed = true;
      syncClasses();
    };

    const handlePointerUp = () => {
      isPressed = false;
      syncClasses();
    };

    syncClasses();

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerdown", handlePointerDown, {
      passive: true,
    });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("blur", handlePointerLeave);
    document.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("blur", handlePointerLeave);
      document.removeEventListener("mouseleave", handlePointerLeave);
      route?.removeAttribute("data-cursor-ready");
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="custom-cursor"
      data-interactive="false"
      data-variant="default"
      data-pressed="false"
      data-visible="false"
    >
      <span ref={haloRef} className="custom-cursor__halo" />
      <span ref={ringRef} className="custom-cursor__ring" />
      <span ref={dotRef} className="custom-cursor__dot" />
    </div>
  );
}
