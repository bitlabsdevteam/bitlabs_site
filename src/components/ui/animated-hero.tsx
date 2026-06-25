"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useMotionPreferences } from "@/components/motion-preferences";
import { cn } from "@/lib/utils";

type AnimatedHeroProps = {
  /** Eyebrow badge above the headline (e.g. the lab location). */
  eyebrow?: string;
  /** Static lead-in of the headline, rendered before the rotating word. */
  prefix: string;
  /** Words that cycle in the highlighted slot of the headline. */
  rotating: string[];
  /** Supporting paragraph under the headline. */
  subtitle: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

// How long each rotating word stays before the next swaps in.
const ROTATE_MS = 2200;

export function AnimatedHero({
  eyebrow,
  prefix,
  rotating,
  subtitle,
  primaryCta,
  secondaryCta,
}: AnimatedHeroProps) {
  const { reduced } = useMotionPreferences();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || rotating.length < 2) return;
    const id = window.setTimeout(() => {
      setIndex((current) => (current + 1) % rotating.length);
    }, ROTATE_MS);
    return () => window.clearTimeout(id);
  }, [index, reduced, rotating.length]);

  // The longest word reserves the slot width so the headline never reflows.
  const widestWord = rotating.reduce(
    (widest, word) => (word.length > widest.length ? word : widest),
    "",
  );

  return (
    <section
      id="hero"
      className="relative mx-auto w-full overflow-hidden rounded-b-xl px-6 md:px-8"
    >
      {/* Editorial grid backdrop, masked to a soft radial fade. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-[640px] opacity-70
        bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)]
        bg-[size:6rem_5rem]
        [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_60%,transparent_110%)]"
      />

      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-8 py-28 text-center lg:py-40">
        {eyebrow && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/[0.03] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            {eyebrow}
          </motion.div>
        )}

        <div className="flex flex-col gap-5">
          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
            className="text-balance text-4xl font-semibold leading-[1.05] tracking-tighter text-foreground sm:text-6xl md:text-7xl"
          >
            <span className="block">{prefix}</span>
            <span className="relative mt-1 flex w-full justify-center overflow-hidden md:pb-3 md:pt-1">
              {/* Invisible sizer reserves the widest word's box. */}
              <span aria-hidden="true" className="invisible font-semibold">
                {widestWord}
              </span>
              {rotating.map((word, wordIndex) => (
                <motion.span
                  key={word}
                  aria-hidden={index === wordIndex ? undefined : true}
                  className="absolute font-semibold text-[var(--accent)]"
                  initial={{ opacity: 0, y: reduced ? 0 : "-100%" }}
                  transition={
                    reduced ? { duration: 0 } : { type: "spring", stiffness: 50 }
                  }
                  animate={
                    index === wordIndex
                      ? { y: 0, opacity: 1 }
                      : { y: index > wordIndex ? "-150%" : "150%", opacity: 0 }
                  }
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="mx-auto max-w-2xl text-balance text-lg leading-relaxed tracking-tight text-muted-foreground md:text-xl"
          >
            {subtitle}
          </motion.p>
        </div>

        {(primaryCta || secondaryCta) && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            {primaryCta && (
              <HeroLink
                href={primaryCta.href}
                className="border-transparent bg-foreground text-background hover:scale-[1.03] hover:shadow-xl"
              >
                {primaryCta.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
              </HeroLink>
            )}
            {secondaryCta && (
              <HeroLink
                href={secondaryCta.href}
                className="border-foreground/15 bg-transparent text-foreground hover:bg-foreground/[0.04]"
              >
                {secondaryCta.label}
                <ArrowDown className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-y-0.5" />
              </HeroLink>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}

function HeroLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-base font-medium shadow-sm transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      {children}
    </a>
  );
}
