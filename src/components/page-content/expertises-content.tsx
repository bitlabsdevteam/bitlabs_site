"use client";

import { FadeIn } from "@/components/fade-in";
import { useLanguage } from "@/components/language-provider";
import { expertiseAreas, expertisePageContent } from "@/lib/site-content";

export function ExpertisesContent() {
  const { language } = useLanguage();
  const copy = expertisePageContent[language];
  const localizedAreas = expertiseAreas[language];
  const controlLayerLabel = language === "en" ? "Control Layer" : "統制レイヤー";

  return (
    <div className="space-y-14">
      <FadeIn>
        <section className="lab-hero relative overflow-hidden px-6 py-10 md:px-10 md:py-12">
          <div className="lab-grid-overlay" aria-hidden />
          <div className="relative space-y-4">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1 className="max-w-5xl text-5xl leading-[1.05] md:text-7xl">{copy.title}</h1>
            <p className="max-w-3xl text-lg leading-8 text-[color:var(--muted-ink)]">{copy.body}</p>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.08}>
        <section className="grid gap-5 md:grid-cols-2">
          <article className="surface-card space-y-5 p-6 md:p-7">
            <div className="space-y-2">
              <p className="eyebrow">{copy.advisoryLabel}</p>
              <h2 className="text-3xl leading-tight md:text-4xl">{copy.advisoryTitle}</h2>
            </div>
            <p className="text-sm leading-7 text-[color:var(--muted-ink)] md:text-base">{copy.advisoryBody}</p>
            <div className="space-y-4">
              <h3 className="text-2xl leading-tight">{localizedAreas[0].title}</h3>
              <p className="text-sm leading-7 text-[color:var(--muted-ink)]">{localizedAreas[0].summary}</p>
              <ul className="grid gap-3 text-sm text-[color:var(--muted-ink)]">
                {localizedAreas[0].points.map((point) => (
                  <li key={point} className="rounded-2xl border border-[color:var(--line)] bg-[color:rgba(18,22,27,0.92)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <article className="surface-card space-y-5 p-6 md:p-7">
            <div className="space-y-2">
              <p className="eyebrow">{copy.parallelismLabel}</p>
              <h2 className="text-3xl leading-tight md:text-4xl">{copy.parallelismTitle}</h2>
            </div>
            <p className="text-sm leading-7 text-[color:var(--muted-ink)] md:text-base">{copy.parallelismBody}</p>
            <div className="space-y-4">
              <h3 className="text-2xl leading-tight">{localizedAreas[1].title}</h3>
              <p className="text-sm leading-7 text-[color:var(--muted-ink)]">{localizedAreas[1].summary}</p>
              <ul className="grid gap-3 text-sm text-[color:var(--muted-ink)]">
                {localizedAreas[1].points.map((point) => (
                  <li key={point} className="rounded-2xl border border-[color:var(--line)] bg-[color:rgba(18,22,27,0.92)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </section>
      </FadeIn>

      <FadeIn delay={0.14}>
        <section className="lab-section grid gap-8 md:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-3">
            <p className="eyebrow">{copy.frameworkLabel}</p>
            <h2 className="max-w-4xl text-4xl md:text-5xl">{copy.frameworkTitle}</h2>
            <p className="max-w-4xl text-sm leading-7 text-[color:var(--muted-ink)] md:text-base">{copy.frameworkBody}</p>
          </div>
          <div className="expertise-matrix">
            {copy.frameworkPoints.map((point) => (
              <article key={point} className="expertise-cell">
                <p className="proof-kicker">{controlLayerLabel}</p>
                <p>{point}</p>
              </article>
            ))}
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
