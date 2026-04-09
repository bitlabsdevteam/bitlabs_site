"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type AnimatedHeroTitleProps = {
  text: string;
  className?: string;
};

type TitleSegment = {
  text: string;
  preserveWhitespace?: boolean;
  keepTogether?: boolean;
};

function splitTitleSegments(text: string): TitleSegment[] {
  const characters = Array.from(text);
  const segments: TitleSegment[] = [];
  let index = 0;

  while (index < characters.length) {
    const character = characters[index];

    if (/\s/u.test(character)) {
      let whitespace = character;
      index += 1;

      while (index < characters.length && /\s/u.test(characters[index])) {
        whitespace += characters[index];
        index += 1;
      }

      segments.push({ text: whitespace, preserveWhitespace: true });
      continue;
    }

    if (/[\p{Script=Latin}\p{N}]/u.test(character)) {
      let word = character;
      index += 1;

      while (index < characters.length && /[\p{Script=Latin}\p{N}'’-]/u.test(characters[index])) {
        word += characters[index];
        index += 1;
      }

      while (index < characters.length && /[.,;:!?)]/u.test(characters[index])) {
        word += characters[index];
        index += 1;
      }

      segments.push({ text: word, keepTogether: true });
      continue;
    }

    segments.push({ text: character });
    index += 1;
  }

  return segments;
}

export function AnimatedHeroTitle({ text, className }: AnimatedHeroTitleProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const segments = splitTitleSegments(text);
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
        {(() => {
          let characterIndex = 0;

          return segments.map((segment, segmentIndex) => {
            if (segment.preserveWhitespace) {
              characterIndex += Array.from(segment.text).length;
              return (
                <span key={`space-${segmentIndex}`} className="whitespace-pre">
                  {segment.text}
                </span>
              );
            }

            const wordCharacters = Array.from(segment.text);
            const wrapperClassName = segment.keepTogether ? "inline-block whitespace-nowrap" : undefined;

            return (
              <span key={`segment-${segmentIndex}`} className={wrapperClassName}>
                {wordCharacters.map((character) => {
                  const index = characterIndex;
                  characterIndex += 1;

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
            );
          });
        })()}
      </span>
    </h1>
  );
}
