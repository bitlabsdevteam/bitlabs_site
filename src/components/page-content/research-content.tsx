"use client";

import { FadeIn } from "@/components/fade-in";
import { useLanguage } from "@/components/language-provider";
import { researchContent, researchTracks } from "@/lib/site-content";

export function ResearchContent() {
  const { language } = useLanguage();
  const copy = researchContent[language];
  const localizedTracks = researchTracks[language];
  const trackLabel = language === "en" ? "Research Track" : "研究領域";
  const checkLabel = language === "en" ? "Check" : "検証";

  return (
    <div className="space-y-14">
      <FadeIn>
        <section className="lab-section grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div className="space-y-4">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1 className="max-w-5xl text-5xl leading-[1.05] md:text-7xl">{copy.title}</h1>
          </div>
          <p className="max-w-3xl text-lg leading-8 text-[color:var(--muted-ink)]">{copy.body}</p>
        </section>
      </FadeIn>

      <FadeIn delay={0.08}>
        <section className="expertise-matrix">
          {localizedTracks.map((track, index) => (
            <article key={track} className="expertise-cell">
              <p className="proof-kicker">
                {String(index + 1).padStart(2, "0")} / {trackLabel}
              </p>
              <p>{track}</p>
            </article>
          ))}
        </section>
      </FadeIn>

      <FadeIn delay={0.13}>
        <section className="lab-section grid gap-8 md:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-2">
            <p className="eyebrow">{copy.reliabilityLabel}</p>
            <h2 className="text-4xl md:text-5xl">{copy.reliabilityTitle}</h2>
          </div>
          <div className="space-y-6">
            <div className="production-timeline">
              {copy.reliabilityPoints.map((point, index) => (
                <article key={point} className="production-step">
                  <p className="proof-kicker">
                    {checkLabel} {String(index + 1).padStart(2, "0")}
                  </p>
                  <p>{point}</p>
                </article>
              ))}
            </div>
            <p className="text-sm leading-7 text-[color:var(--muted-ink)]">{copy.note}</p>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
