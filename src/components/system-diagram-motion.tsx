"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useMotionPreferences } from "./motion-preferences";

/** Keep the figure in normal flow; only its internal layers move. */
export function SystemDiagramMotion({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  const figure = useRef<HTMLElement>(null);
  const { reduced } = useMotionPreferences();

  useEffect(() => {
    const element = figure.current;
    if (!element || reduced) return;

    let visible = false;
    let frame = 0;
    let x = 0;
    let y = 0;
    let scroll = 0;
    let targetX = 0;
    let targetY = 0;
    let targetScroll = 0;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    function render() {
      frame = 0;
      x += (targetX - x) * 0.09;
      y += (targetY - y) * 0.09;
      scroll += (targetScroll - scroll) * 0.09;
      element!.style.setProperty("--diagram-turn", `${x * 4}deg`);
      element!.style.setProperty("--diagram-tilt", `${y * -3}deg`);
      element!.style.setProperty("--diagram-scroll", `${scroll}px`);
      if (
        Math.abs(targetX - x) +
          Math.abs(targetY - y) +
          Math.abs(targetScroll - scroll) >
        0.005
      )
        schedule();
    }

    function schedule() {
      if (visible && !document.hidden && !frame)
        frame = requestAnimationFrame(render);
    }

    function measure() {
      if (!visible || document.hidden) return;
      const rect = element!.getBoundingClientRect();
      const progress =
        (window.innerHeight / 2 - rect.top - rect.height / 2) /
        (window.innerHeight / 2 + rect.height / 2);
      targetScroll = Math.max(-1, Math.min(1, progress)) * 10;
      schedule();
    }

    function pointer(event: PointerEvent) {
      if (!finePointer.matches || event.pointerType === "touch") return;
      const rect = element!.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      schedule();
    }

    function resetPointer() {
      targetX = targetY = 0;
      schedule();
    }

    function updateActivity() {
      element!.dataset.active = String(visible && !document.hidden);
      if (visible && !document.hidden) measure();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updateActivity();
    });
    observer.observe(element);
    element.addEventListener("pointermove", pointer, { passive: true });
    element.addEventListener("pointerleave", resetPointer);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    document.addEventListener("visibilitychange", updateActivity);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      element.removeEventListener("pointermove", pointer);
      element.removeEventListener("pointerleave", resetPointer);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      document.removeEventListener("visibilitychange", updateActivity);
      delete element.dataset.active;
      for (const variable of [
        "--diagram-turn",
        "--diagram-tilt",
        "--diagram-scroll",
      ])
        element.style.removeProperty(variable);
    };
  }, [reduced]);

  return (
    <figure
      ref={figure}
      className="system-diagram"
      aria-label={label}
      data-reduced-motion={reduced}
    >
      {children}
    </figure>
  );
}
