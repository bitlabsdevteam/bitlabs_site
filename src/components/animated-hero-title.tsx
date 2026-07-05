"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

// Per-character typing cadence and the pauses around the keep-it-alive loop.
const TYPE_STEP_MS = 28;
const ERASE_STEP_MS = 22;
const LOOP_DELAYS_MS = [6200, 6900, 7600] as const;
const LOOP_HOLD_MS = 520;

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
  // Annotate every token with its starting character offset and exploded
  // characters so the caret can advance one character at a time during render.
  const layout = useMemo(() => {
    const lengths = tokens.map((token) => Array.from(token.value).length);
    const entries = tokens.map((token, i) => ({
      token,
      characters: Array.from(token.value),
      start: lengths.slice(0, i).reduce((sum, length) => sum + length, 0),
    }));
    return { entries, totalChars: lengths.reduce((sum, length) => sum + length, 0) };
  }, [tokens]);
  const totalChars = layout.totalChars;
  // Length of the trailing word, used as the bounded chunk the loop retypes.
  const trailingChars = useMemo(() => {
    for (let i = tokens.length - 1; i >= 0; i -= 1) {
      if (tokens[i].kind === "cluster") {
        return Array.from(tokens[i].value).length;
      }
    }
    return 0;
  }, [tokens]);

  const [typed, setTyped] = useState(0);
  const [settled, setSettled] = useState(totalChars === 0);
  const [active, setActive] = useState(false);
  const [cycle, setCycle] = useState(0);

  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (totalChars === 0) {
      return;
    }

    const pending = timers.current;
    let frame = 0;
    const clearAll = () => {
      for (const id of pending) {
        window.clearTimeout(id);
        window.clearInterval(id);
      }
      pending.length = 0;
      if (frame) window.cancelAnimationFrame(frame);
    };

    // Drive `typed` toward a target from `from`, paced by elapsed wall-clock time
    // rather than tick count, so a busy main thread (e.g. WebGL init) self-corrects
    // instead of stalling the caret.
    const animateTo = (from: number, target: number, stepMs: number, done: () => void) => {
      const start = performance.now();
      const distance = Math.abs(target - from);
      const direction = target >= from ? 1 : -1;
      const tick = (now: number) => {
        const steps = Math.min(distance, Math.floor((now - start) / stepMs));
        setTyped(from + direction * steps);
        if (steps >= distance) {
          done();
          return;
        }
        frame = window.requestAnimationFrame(tick);
      };
      frame = window.requestAnimationFrame(tick);
    };

    // Keep-it-alive: erase the trailing word and retype it, on a gentle cadence.
    const scheduleLoop = (cycleIndex: number) => {
      const delay = LOOP_DELAYS_MS[cycleIndex % LOOP_DELAYS_MS.length];
      const id = window.setTimeout(() => {
        setActive(true);
        setCycle(cycleIndex + 1);
        const eraseTarget = Math.max(0, totalChars - Math.max(1, trailingChars));

        animateTo(totalChars, eraseTarget, ERASE_STEP_MS, () => {
          const hold = window.setTimeout(() => {
            animateTo(eraseTarget, totalChars, TYPE_STEP_MS, () => {
              setActive(false);
              scheduleLoop(cycleIndex + 1);
            });
          }, LOOP_HOLD_MS);
          pending.push(hold);
        });
      }, delay);
      pending.push(id);
    };

    animateTo(0, totalChars, TYPE_STEP_MS, () => {
      setSettled(true);
      scheduleLoop(0);
    });

    return clearAll;
  }, [totalChars, trailingChars]);

  const phase = settled ? "settled" : "revealing";
  const loopState = !settled ? "revealing" : active ? "active" : "idle";

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
        {/* Invisible full-text copy reserves the final wrapped box so the
            headline never shifts layout while it types. */}
        <span className="animated-hero-title__sizer">{text}</span>
        <span className="animated-hero-title__text">
          {layout.entries.map(({ token, characters, start }, index) => {
            if (token.kind === "whitespace") {
              return (
                <span
                  key={`space-${index}`}
                  className="animated-hero-title__whitespace whitespace-pre"
                  data-typed={start < typed ? "true" : "false"}
                >
                  {token.value}
                </span>
              );
            }

            const clusterIndex = token.clusterIndex ?? 0;
            const clusterClassName = token.keepTogether
              ? "animated-hero-title__cluster animated-hero-title__cluster--grouped"
              : "animated-hero-title__cluster";

            return (
              <span
                key={`cluster-${clusterIndex}`}
                className={clusterClassName}
                data-cluster-text={token.value}
              >
                {characters.map((character, charIndex) => (
                  <span
                    key={charIndex}
                    className="animated-hero-title__char"
                    data-typed={start + charIndex < typed ? "true" : "false"}
                  >
                    {character}
                  </span>
                ))}
              </span>
            );
          })}
          <span className="animated-hero-title__caret" aria-hidden="true" />
        </span>
      </span>
    </h1>
  );
}
