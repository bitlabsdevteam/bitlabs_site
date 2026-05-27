"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { cinematicSpring } from "@/components/cinematic-motion";
import {
  type MotionQuality,
  useMotionPreferences,
} from "@/components/motion-preferences";

type OffsetRange = [number, number];

type SectionParallaxProps = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  background?: React.ReactNode;
  midground?: React.ReactNode;
  foreground?: React.ReactNode;
  reduced?: boolean;
  quality?: MotionQuality;
  scrollProgress?: number;
  backgroundY?: OffsetRange;
  midgroundY?: OffsetRange;
  contentY?: OffsetRange;
  foregroundY?: OffsetRange;
};

function scaleRange(range: OffsetRange, scale: number): OffsetRange {
  return [range[0] * scale, range[1] * scale];
}

export function SectionParallax({
  children,
  className,
  contentClassName,
  background,
  midground,
  foreground,
  reduced: explicitReduced,
  quality: explicitQuality,
  scrollProgress,
  backgroundY = [-72, 72],
  midgroundY = [-36, 36],
  contentY = [24, -24],
  foregroundY = [16, -16],
}: SectionParallaxProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { reduced: motionReduced, quality } = useMotionPreferences(
    explicitReduced,
    explicitQuality,
  );
  const reduced = motionReduced || prefersReducedMotion;
  const multiplier = reduced ? 0 : quality === "mobile" ? 0.42 : 1;
  const manualProgress = useMotionValue(scrollProgress ?? 0);
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "end start"],
  });
  const progress = typeof scrollProgress === "number" ? manualProgress : scrollYProgress;
  const smoothProgress = useSpring(progress, cinematicSpring);

  useEffect(() => {
    if (typeof scrollProgress !== "number") {
      return;
    }

    const clamped = Math.max(0, Math.min(1, scrollProgress));
    manualProgress.set(clamped);
  }, [manualProgress, scrollProgress]);

  const backgroundOffset = useSpring(
    useTransform(smoothProgress, [0, 1], scaleRange(backgroundY, multiplier)),
    cinematicSpring,
  );
  const midgroundOffset = useSpring(
    useTransform(smoothProgress, [0, 1], scaleRange(midgroundY, multiplier)),
    cinematicSpring,
  );
  const contentOffset = useSpring(
    useTransform(smoothProgress, [0, 1], scaleRange(contentY, multiplier)),
    cinematicSpring,
  );
  const foregroundOffset = useSpring(
    useTransform(smoothProgress, [0, 1], scaleRange(foregroundY, multiplier)),
    cinematicSpring,
  );

  return (
    <div
      ref={rootRef}
      className={["section-parallax", className].filter(Boolean).join(" ")}
      data-motion-quality={quality}
      data-reduced-motion={reduced ? "true" : "false"}
    >
      {background ? (
        <motion.div
          className="section-parallax-layer section-parallax-layer-background"
          aria-hidden
          style={reduced ? undefined : { y: backgroundOffset }}
        >
          {background}
        </motion.div>
      ) : null}

      {midground ? (
        <motion.div
          className="section-parallax-layer section-parallax-layer-midground"
          aria-hidden
          style={reduced ? undefined : { y: midgroundOffset }}
        >
          {midground}
        </motion.div>
      ) : null}

      <motion.div
        className={["section-parallax-content", contentClassName].filter(Boolean).join(" ")}
        style={reduced ? undefined : { y: contentOffset }}
      >
        {children}
      </motion.div>

      {foreground ? (
        <motion.div
          className="section-parallax-layer section-parallax-layer-foreground"
          aria-hidden
          style={reduced ? undefined : { y: foregroundOffset }}
        >
          {foreground}
        </motion.div>
      ) : null}
    </div>
  );
}
