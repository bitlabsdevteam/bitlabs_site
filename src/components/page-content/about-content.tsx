"use client";

import { FadeIn } from "@/components/fade-in";
import { useLanguage } from "@/components/language-provider";
import { aboutContent, principles, teamStrengths } from "@/lib/site-content";

export function AboutContent() {
  const { language } = useLanguage();
  const copy = aboutContent[language];
  const localizedStrengths = teamStrengths[language];
  const localizedPrinciples = principles[language];

  return (
    <div className="space-y-14">
      <FadeIn>
        <section className="space-y-4">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="max-w-5xl text-5xl leading-[1.05] md:text-7xl">{copy.title}</h1>
          <p className="max-w-3xl text-lg leading-8 text-[color:var(--muted-ink)]">{copy.body}</p>
        </section>
      </FadeIn>

      <FadeIn delay={0.08}>
        <section className="surface-card space-y-6 p-7 md:p-10">
          <div className="space-y-2">
            <p className="eyebrow">{copy.strengthsLabel}</p>
            <h2 className="text-4xl md:text-5xl">{copy.strengthsTitle}</h2>
          </div>
          <ul className="grid gap-3 text-sm leading-7 text-[color:var(--muted-ink)] md:grid-cols-2">
            {localizedStrengths.map((item) => (
              <li key={item} className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-4">
                {item}
              </li>
            ))}
          </ul>
        </section>
      </FadeIn>

      <FadeIn delay={0.14}>
        <section className="grid gap-5 md:grid-cols-2">
          <article className="surface-card p-7 md:p-8">
            <p className="eyebrow">{copy.missionLabel}</p>
            <h2 className="mt-3 text-4xl">{copy.missionTitle}</h2>
            <p className="mt-4 leading-8 text-[color:var(--muted-ink)]">{copy.missionBody}</p>
          </article>
          <article className="surface-card p-7 md:p-8">
            <p className="eyebrow">{copy.principlesLabel}</p>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-[color:var(--muted-ink)]">
              {localizedPrinciples.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>
      </FadeIn>
    </div>
  );
}
