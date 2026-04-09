"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type AnimatedHeroTitleProps = {
  text: string;
  className?: string;
};

export function AnimatedHeroTitle({ text, className }: AnimatedHeroTitleProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const characters = Array.from(text);
  const animationKey = `${prefersReducedMotion ? "reduced" : "full"}:${text}`;

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const candidateIndices = Array.from(text).flatMap((character, index) =>
      /[\p{L}\p{N}]/u.test(character) ? [index] : [],
    );

    if (candidateIndices.length === 0) {
      return;
    }

    let pulseTimer: number | undefined;
    let resetTimer: number | undefined;

    const runPulse = () => {
      const selectionSize = Math.min(
        candidateIndices.length,
        Math.max(1, Math.floor(Math.random() * 3) + 1),
      );
      const nextIndices = [...candidateIndices];

      for (let index = nextIndices.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [nextIndices[index], nextIndices[swapIndex]] = [nextIndices[swapIndex], nextIndices[index]];
      }

      setActiveIndices(nextIndices.slice(0, selectionSize));

      resetTimer = window.setTimeout(() => {
        setActiveIndices([]);
      }, 320);

      pulseTimer = window.setTimeout(runPulse, 420 + Math.random() * 900);
    };

    pulseTimer = window.setTimeout(runPulse, 220);

    return () => {
      if (pulseTimer) {
        window.clearTimeout(pulseTimer);
      }

      if (resetTimer) {
        window.clearTimeout(resetTimer);
      }
    };
  }, [animationKey]);

  if (prefersReducedMotion) {
    return <h1 className={className}>{text}</h1>;
  }

  return (
    <h1 className={className} aria-label={text}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {characters.map((character, index) => {
          if (character === " ") {
            return <span key={`space-${index}`} className="inline-block w-[0.28em]" />;
          }

          return (
            <motion.span
              key={`${character}-${index}`}
              className="inline-block will-change-[opacity]"
              animate={{ opacity: activeIndices.includes(index) ? 0.16 : 1 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
            >
              {character}
            </motion.span>
          );
        })}
      </span>
    </h1>
  );
}
