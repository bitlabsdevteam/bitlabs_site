"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { useMotionPreferences } from "@/components/motion-preferences";

type AnimatedHeroTitleProps = {
  text: string;
  className?: string;
  language?: "en" | "ja";
};

type TitleToken = {
  value: string;
  kind: "cluster" | "whitespace";
  keepTogether?: boolean;
  clusterIndex?: number;
};

const INITIAL_REVEAL_BASE_MS = 1320;
const LOOP_ACTIVE_MS = 1180;
const LOOP_DELAYS_MS = [6200, 6900, 7600] as const;

function splitEnglishTokens(text: string): TitleToken[] {
  const characters = Array.from(text);
  const tokens: TitleToken[] = [];
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

      tokens.push({ value: whitespace, kind: "whitespace" });
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

      tokens.push({ value: word, kind: "cluster", keepTogether: true });
      continue;
    }

    tokens.push({ value: character, kind: "cluster" });
    index += 1;
  }

  return tokens;
}

function splitJapaneseTokens(text: string): TitleToken[] {
  const tokens: TitleToken[] = [];
  const segmenter =
    typeof Intl !== "undefined" && "Segmenter" in Intl
      ? new Intl.Segmenter("ja", { granularity: "grapheme" })
      : null;
  const segments = segmenter
    ? Array.from(segmenter.segment(text), ({ segment }) => segment)
    : Array.from(text);

  for (const segment of segments) {
    if (/\s/u.test(segment)) {
      tokens.push({ value: segment, kind: "whitespace" });
      continue;
    }

    tokens.push({ value: segment, kind: "cluster" });
  }

  return tokens;
}

function tokenizeTitle(text: string, language: "en" | "ja") {
  const rawTokens = language === "ja" ? splitJapaneseTokens(text) : splitEnglishTokens(text);
  let clusterIndex = 0;

  return rawTokens.map((token) => {
    if (token.kind === "whitespace") {
      return token;
    }

    const indexedToken = {
      ...token,
      clusterIndex,
    };
    clusterIndex += 1;
    return indexedToken;
  });
}

function buildLoopSelection(totalClusters: number, cycle: number) {
  if (totalClusters === 0) {
    return [];
  }

  const windowSize = Math.min(totalClusters, Math.max(2, Math.ceil(totalClusters * 0.18)));
  const start = (cycle * 3) % totalClusters;

  return Array.from({ length: windowSize }, (_, offset) => (start + offset) % totalClusters);
}

export function AnimatedHeroTitle({
  text,
  className,
  language = "en",
}: AnimatedHeroTitleProps) {
  const { reduced: prefersReducedMotion } = useMotionPreferences();

  if (prefersReducedMotion) {
    return (
      <h1
        className={className}
        data-testid="animated-hero-title"
        data-hero-language={language}
        data-hero-motion="reduced"
        data-hero-phase="settled"
        data-hero-loop-state="idle"
        data-hero-cycle="0"
      >
        {text}
      </h1>
    );
  }

  return (
    <AnimatedHeroTitleMotion
      key={`${language}:${text}`}
      text={text}
      className={className}
      language={language}
    />
  );
}

function AnimatedHeroTitleMotion({
  text,
  className,
  language,
}: AnimatedHeroTitleProps & { language: "en" | "ja" }) {
  const tokens = useMemo(() => tokenizeTitle(text, language), [language, text]);
  const clusterCount = useMemo(
    () => tokens.filter((token) => token.kind === "cluster").length,
    [tokens],
  );
  const [phase, setPhase] = useState<"revealing" | "settled">(
    clusterCount === 0 ? "settled" : "revealing",
  );
  const [activeClusters, setActiveClusters] = useState<number[]>([]);
  const [cycle, setCycle] = useState(0);
  const [sweepKey, setSweepKey] = useState(1);
  const [sweepMode, setSweepMode] = useState<"full" | "partial">("full");

  useEffect(() => {
    if (clusterCount === 0) {
      return;
    }

    const timers: number[] = [];
    const initialDuration = INITIAL_REVEAL_BASE_MS + Math.min(clusterCount * 36, 840);

    const scheduleLoop = (cycleIndex: number) => {
      const delay = LOOP_DELAYS_MS[cycleIndex % LOOP_DELAYS_MS.length];

      timers.push(
        window.setTimeout(() => {
          setCycle(cycleIndex + 1);
          setActiveClusters(buildLoopSelection(clusterCount, cycleIndex));
          setSweepMode("partial");
          setSweepKey((current) => current + 1);

          timers.push(
            window.setTimeout(() => {
              setActiveClusters([]);
              scheduleLoop(cycleIndex + 1);
            }, LOOP_ACTIVE_MS),
          );
        }, delay),
      );
    };

    timers.push(
      window.setTimeout(() => {
        setPhase("settled");
        scheduleLoop(0);
      }, initialDuration),
    );

    return () => {
      for (const timer of timers) {
        window.clearTimeout(timer);
      }
    };
  }, [clusterCount]);

  const loopState = phase === "revealing" ? "revealing" : activeClusters.length > 0 ? "active" : "idle";

  return (
    <h1
      className={className}
      aria-label={text}
      data-testid="animated-hero-title"
      data-hero-language={language}
      data-hero-motion="dynamic"
      data-hero-phase={phase}
      data-hero-loop-state={loopState}
      data-hero-cycle={String(cycle)}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="animated-hero-title__visual">
        <span className="animated-hero-title__text">
          {tokens.map((token, index) => {
            if (token.kind === "whitespace") {
              return (
                <span
                  key={`space-${index}`}
                  className="animated-hero-title__whitespace whitespace-pre"
                >
                  {token.value}
                </span>
              );
            }

            const clusterIndex = token.clusterIndex ?? 0;
            const tokenDelay = clusterIndex * 0.055;
            const isActive = activeClusters.includes(clusterIndex);
            const clusterStyle = {
              "--hero-delay": `${tokenDelay}s`,
            } as CSSProperties;
            const clusterClassName = token.keepTogether
              ? "animated-hero-title__cluster animated-hero-title__cluster--grouped"
              : "animated-hero-title__cluster";

            return (
              <span
                key={`cluster-${clusterIndex}`}
                className={clusterClassName}
                style={clusterStyle}
                data-cluster-text={token.value}
                data-cluster-active={isActive ? "true" : "false"}
              >
                <motion.span
                  className="animated-hero-title__cluster-base"
                  initial={{ opacity: 0.16, filter: "blur(14px)", y: 14 }}
                  animate={
                    isActive
                      ? {
                          opacity: [1, 0.86, 1],
                          y: [0, -1.5, 0],
                          transition: { duration: 0.84, ease: [0.2, 1, 0.36, 1] },
                        }
                      : phase === "revealing"
                        ? {
                            opacity: 1,
                            filter: "blur(0px)",
                            y: 0,
                            transition: {
                              delay: tokenDelay,
                              duration: 1.15,
                              ease: [0.22, 1, 0.36, 1],
                            },
                          }
                        : {
                            opacity: 1,
                            filter: "blur(0px)",
                            y: 0,
                            transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
                          }
                  }
                >
                  {token.value}
                </motion.span>
                <motion.span
                  className="animated-hero-title__cluster-ghost"
                  initial={{ opacity: 0.72, filter: "blur(22px)", x: -8, y: 8 }}
                  animate={
                    isActive
                      ? {
                          opacity: [0.08, 0.38, 0.12],
                          x: [0, 2, -0.5, 0],
                          y: [0, -1, 0.5, 0],
                          filter: ["blur(4px)", "blur(12px)", "blur(5px)"],
                          transition: { duration: 1.02, ease: [0.18, 1, 0.3, 1] },
                        }
                      : phase === "revealing"
                        ? {
                            opacity: [0.72, 0.18, 0.06],
                            x: [-8, -1, 0],
                            y: [8, 1, 0],
                            filter: ["blur(22px)", "blur(11px)", "blur(4px)"],
                            transition: {
                              delay: tokenDelay * 0.9,
                              duration: 1.4,
                              ease: [0.18, 1, 0.3, 1],
                            },
                          }
                        : {
                            opacity: 0.07,
                            x: 0,
                            y: 0,
                            filter: "blur(4px)",
                            transition: { duration: 0.58, ease: [0.18, 1, 0.3, 1] },
                          }
                  }
                >
                  {token.value}
                </motion.span>
                <motion.span
                  className="animated-hero-title__cluster-echo"
                  initial={{ opacity: 0.36, filter: "blur(26px)", x: 10, y: -7 }}
                  animate={
                    isActive
                      ? {
                          opacity: [0.05, 0.24, 0.06],
                          x: [0, -1.5, 0.4, 0],
                          y: [0, 1, -0.4, 0],
                          filter: ["blur(5px)", "blur(15px)", "blur(7px)"],
                          transition: { duration: 1.08, ease: [0.18, 1, 0.3, 1] },
                        }
                      : phase === "revealing"
                        ? {
                            opacity: [0.3, 0.12, 0.03],
                            x: [10, 2, 0],
                            y: [-7, -1, 0],
                            filter: ["blur(26px)", "blur(12px)", "blur(5px)"],
                            transition: {
                              delay: tokenDelay * 0.92 + 0.04,
                              duration: 1.52,
                              ease: [0.18, 1, 0.3, 1],
                            },
                          }
                        : {
                            opacity: 0.03,
                            x: 0,
                            y: 0,
                            filter: "blur(5px)",
                            transition: { duration: 0.58, ease: [0.18, 1, 0.3, 1] },
                          }
                  }
                >
                  {token.value}
                </motion.span>
              </span>
            );
          })}
        </span>

        <motion.span
          key={`hero-mask-${sweepMode}-${sweepKey}`}
          className="animated-hero-title__mask"
          initial={{
            opacity: sweepMode === "full" ? 0.56 : 0.3,
            x: sweepMode === "full" ? "-18%" : "12%",
          }}
          animate={{
            opacity: [sweepMode === "full" ? 0.56 : 0.3, 0.18, 0],
            x: "112%",
          }}
          transition={{
            duration: sweepMode === "full" ? 1.82 : 1.24,
            ease: [0.18, 1, 0.3, 1],
          }}
        />
        <motion.span
          key={`hero-sweep-${sweepMode}-${sweepKey}`}
          className="animated-hero-title__sweep"
          initial={{
            opacity: sweepMode === "full" ? 0.88 : 0.46,
            x: sweepMode === "full" ? "-20%" : "14%",
          }}
          animate={{
            opacity: [sweepMode === "full" ? 0.88 : 0.46, 0.24, 0],
            x: "115%",
          }}
          transition={{
            duration: sweepMode === "full" ? 1.56 : 1.08,
            ease: [0.18, 1, 0.3, 1],
          }}
        />
      </span>
    </h1>
  );
}
