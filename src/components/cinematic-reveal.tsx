"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cinematicEase } from "@/components/cinematic-motion";

export type RevealDirection = "left" | "right" | "up" | "down";

type CinematicRevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Direction the content flies in from. */
  direction?: RevealDirection;
  /** Travel distance in px (horizontal for left/right, vertical for up/down). */
  distance?: number;
  /** Animation duration in seconds. */
  duration?: number;
  /** Stagger delay in seconds. */
  delay?: number;
  /**
   * Re-run the fly-in every time the element enters the viewport (scroll up
   * AND down). When false the reveal plays only once.
   */
  repeat?: boolean;
  /** Portion of the element that must be visible before revealing. */
  amount?: number;
};

function hiddenState(direction: RevealDirection, distance: number) {
  switch (direction) {
    case "left":
      return { opacity: 0, x: -distance, rotateY: 12, z: -80 };
    case "right":
      return { opacity: 0, x: distance, rotateY: -12, z: -80 };
    case "down":
      return { opacity: 0, y: distance, rotateX: -8, z: -60 };
    case "up":
    default:
      return { opacity: 0, y: distance, rotateX: 8, z: -60 };
  }
}

export function CinematicReveal({
  children,
  className,
  direction = "up",
  distance = 120,
  duration = 0.9,
  delay = 0,
  repeat = true,
  amount = 0.25,
}: CinematicRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const variants: Variants = {
    hidden: hiddenState(direction, distance),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      z: 0,
      rotateX: 0,
      rotateY: 0,
      transition: { duration, delay, ease: cinematicEase },
    },
  };

  return (
    <motion.div
      className={["cinematic-reveal", className].filter(Boolean).join(" ")}
      style={{ transformPerspective: 1400, transformStyle: "preserve-3d" }}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, amount }}
    >
      {children}
    </motion.div>
  );
}
