"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  cinematicEase,
  cinematicRevealDistance,
} from "@/components/cinematic-motion";

type LandingScrollFadeProps = {
  children: React.ReactNode;
  className?: string;
};

export function LandingScrollFade({ children, className }: LandingScrollFadeProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`relative ${className ?? ""}`.trim()}
      initial={prefersReducedMotion ? false : { opacity: 0, y: cinematicRevealDistance }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.95, ease: cinematicEase }}
    >
      {children}
    </motion.div>
  );
}
