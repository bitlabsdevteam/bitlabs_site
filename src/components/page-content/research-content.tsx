"use client";

import { FadeIn } from "@/components/fade-in";
import { useLanguage } from "@/components/language-provider";
import { researchContent, researchTracks } from "@/lib/site-content";

export function ResearchContent() {
  const { language } = useLanguage();
  const copy = researchContent[language];
  const localizedTracks = researchTracks[language];

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
        <ul className="grid gap-4 md:grid-cols-2">
          {localizedTracks.map((track) => (
            <li key={track} className="surface-card p-6 text-sm leading-7">
              {track}
            </li>
          ))}
        </ul>
      </FadeIn>

      <FadeIn delay={0.13}>
        <section className="surface-card space-y-6 p-7 md:p-10">
          <div className="space-y-2">
            <p className="eyebrow">{copy.reliabilityLabel}</p>
            <h2 className="text-4xl md:text-5xl">{copy.reliabilityTitle}</h2>
          </div>
          <div className="grid gap-3 text-sm text-[color:var(--muted-ink)] md:grid-cols-3">
            {copy.reliabilityPoints.map((point) => (
              <p key={point} className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-4">
                {point}
              </p>
            ))}
          </div>
          <p className="text-sm leading-7 text-[color:var(--muted-ink)]">{copy.note}</p>
        </section>
      </FadeIn>
    </div>
  );
}
