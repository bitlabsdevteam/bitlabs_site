"use client";

import { motion, useReducedMotion } from "framer-motion";

type LandingScrollFadeProps = {
  children: React.ReactNode;
  className?: string;
};

export function LandingScrollFade({ children, className }: LandingScrollFadeProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`relative ${className ?? ""}`.trim()}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
