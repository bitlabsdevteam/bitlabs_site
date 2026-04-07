"use client";

import Link from "next/link";
import { AdamChatWidget } from "@/components/adam-chat-widget";
import { LandingScrollFade } from "@/components/landing-scroll-fade";
import { ParallelismHeroVisual } from "@/components/parallelism-hero-visual";
import { useLanguage } from "@/components/language-provider";
import { homeContent, services } from "@/lib/site-content";

export function HomeContent() {
  const { language } = useLanguage();
  const copy = homeContent[language];
  const localizedServices = services[language];

  return (
    <div className="space-y-20 md:space-y-24">
      <LandingScrollFade>
        <section className="surface-card relative overflow-hidden px-6 py-12 md:px-12 md:py-16">
          <div
            className="pointer-events-none absolute -right-14 top-[-8rem] h-60 w-60 rounded-full bg-[color:var(--accent-soft)] blur-2xl"
            aria-hidden
          />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.15fr_1fr]">
            <div className="space-y-7">
              <p className="eyebrow">{copy.location}</p>
              <h1 className="max-w-5xl text-5xl leading-[1.03] md:text-7xl">{copy.heroTitle}</h1>
              <p className="max-w-3xl text-lg leading-8 text-[color:var(--muted-ink)] md:text-xl">{copy.heroBody}</p>
              <div className="flex flex-wrap gap-3">
                <AdamChatWidget />
                <Link
                  href="/services"
                  className="rounded-full border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-6 py-3 text-sm font-medium transition-colors hover:bg-[color:var(--accent-soft)]"
                >
                  {copy.secondaryCta}
                </Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-[1.75rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] shadow-[0_30px_70px_-45px_rgba(16,23,20,0.72)]">
              <ParallelismHeroVisual />
            </div>
          </div>
        </section>
      </LandingScrollFade>

      <LandingScrollFade>
        <section className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
            <article className="surface-card space-y-3 p-6 md:p-7">
              <p className="eyebrow">{copy.missionLabel}</p>
              <p className="book-display max-w-2xl text-2xl leading-tight md:text-3xl">{copy.missionBody}</p>
              <p className="text-sm italic text-[color:var(--muted-ink)]">{copy.missionAttribution}</p>
            </article>
            <article className="surface-card space-y-3 p-6 md:p-7">
              <p className="eyebrow">{copy.visionLabel}</p>
              <p className="book-display max-w-2xl text-2xl leading-tight md:text-3xl">{copy.visionBody}</p>
              <p className="text-sm italic text-[color:var(--muted-ink)]">{copy.visionAttribution}</p>
            </article>
          </div>
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="eyebrow">{copy.capabilitiesLabel}</p>
              <h2 className="text-4xl md:text-5xl">{copy.capabilitiesTitle}</h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {localizedServices.map((item) => (
              <article key={item.title} className="surface-card p-6 md:p-7">
                <h3 className="text-2xl leading-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--muted-ink)]">{item.delivery}</p>
              </article>
            ))}
          </div>
        </section>
      </LandingScrollFade>

      <LandingScrollFade>
        <section className="surface-card grid gap-6 p-7 md:grid-cols-[1.15fr_1fr] md:p-10">
          <div className="space-y-3">
            <p className="eyebrow">{copy.securityLabel}</p>
            <h2 className="text-4xl md:text-5xl">{copy.securityTitle}</h2>
            <p className="leading-8 text-[color:var(--muted-ink)]">{copy.securityBody}</p>
          </div>
          <ul className="grid gap-3 text-sm text-[color:var(--muted-ink)]">
            {copy.securityPoints.map((point) => (
              <li key={point} className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-4">
                {point}
              </li>
            ))}
          </ul>
        </section>
      </LandingScrollFade>
    </div>
  );
}
