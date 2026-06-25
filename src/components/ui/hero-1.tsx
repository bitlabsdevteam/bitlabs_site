"use client"

import { ArrowRight } from "lucide-react"
import TextTypewriter from "@/components/ui/the-typewriter"

interface HeroProps {
  title: string
  subtitle: string
  ctaLabel?: string
  ctaHref?: string
}

export function Hero({
  title,
  subtitle,
  ctaLabel = "Explore Now",
  ctaHref = "#",
}: HeroProps) {
  return (
    <section
      id="hero"
      className="relative mx-auto w-full pt-40 px-6 text-center md:px-8
      min-h-[calc(100vh-40px)] overflow-hidden
      bg-[linear-gradient(to_bottom,#fff,#ffffff_50%,#e8e8e8_88%)]
      dark:bg-[linear-gradient(to_bottom,#000,#0000_30%,#898e8e_78%,#ffffff_99%_50%)]
      rounded-b-xl"
    >
      {/* Grid BG */}
      <div
        className="absolute -z-10 inset-0 opacity-80 h-[600px] w-full
        bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)]
        dark:bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)]
        bg-[size:6rem_5rem]
        [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
      />

      {/* Radial Accent */}
      <div
        className="absolute left-1/2 top-[calc(100%-90px)] lg:top-[calc(100%-150px)]
        h-[500px] w-[700px] md:h-[500px] md:w-[1100px] lg:h-[750px] lg:w-[140%]
        -translate-x-1/2 rounded-[100%] border-[#B48CDE] bg-white dark:bg-black
        bg-[radial-gradient(closest-side,#fff_82%,#000000)]
        dark:bg-[radial-gradient(closest-side,#000_82%,#ffffff)]
        animate-fade-up"
      />

      {/* Title: typewriter glitch effect over the gradient headline.
          aria-label keeps the accessible name stable while the visible text
          types/glitches; the typewriter itself is aria-hidden. */}
      <h1
        aria-label={title}
        className="animate-fade-in -translate-y-4 text-balance
        bg-gradient-to-br from-black from-30% to-black/40
        bg-clip-text py-6 text-5xl font-semibold leading-none tracking-tighter
        text-transparent opacity-0 sm:text-6xl md:text-7xl lg:text-8xl
        dark:from-white dark:to-white/40"
      >
        <span aria-hidden="true">
          <TextTypewriter duration={3}>{title}</TextTypewriter>
        </span>
      </h1>

      {/* Subtitle */}
      <p
        className="animate-fade-in mb-12 -translate-y-4 text-balance
        text-lg tracking-tight text-gray-600 dark:text-gray-400
        opacity-0 md:text-xl"
      >
        {subtitle}
      </p>

      {/* CTA: pill with a shine sweep + arrow slide on hover.
          bg-foreground/text-background keeps it high-contrast in both themes. */}
      {ctaLabel && (
        <div className="z-20 mt-[-20px] flex justify-center">
          <a
            href={ctaHref}
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-foreground/10 bg-foreground px-8 py-3.5 text-base font-medium text-background shadow-md transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span className="relative z-10">{ctaLabel}</span>
            <ArrowRight
              className="relative z-10 h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
              aria-hidden="true"
            />
            {/* Diagonal shine that sweeps across on hover. */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-background/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
          </a>
        </div>
      )}

      {/* Bottom Fade */}
      <div
        className="animate-fade-up relative mt-32 opacity-0 [perspective:2000px]
        after:absolute after:inset-0 after:z-50
        after:[background:linear-gradient(to_top,hsl(var(--background))_10%,transparent)]"
      />
    </section>
  )
}
