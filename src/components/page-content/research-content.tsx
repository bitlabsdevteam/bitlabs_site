"use client";

import { FadeIn } from "@/components/fade-in";
import { useLanguage } from "@/components/language-provider";
import { researchContent, researchLabNotes } from "@/lib/site-content";

export function ResearchContent() {
  const { language } = useLanguage();
  const copy = researchContent[language];
  const localizedLabNotes = researchLabNotes[language];
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
        <section className="lab-section space-y-7">
          <div className="grid gap-4 md:grid-cols-[0.82fr_1.18fr] md:items-end">
            <div className="space-y-2">
              <p className="eyebrow">{copy.labLabel}</p>
              <h2 className="max-w-3xl text-4xl leading-tight md:text-5xl">{copy.labTitle}</h2>
            </div>
            <p className="max-w-3xl leading-8 text-[color:var(--muted-ink)]">{copy.note}</p>
          </div>

          <div className="research-note-grid">
            {localizedLabNotes.map((note) => (
              <article key={note.label} className="research-note-card">
                <div>
                  <p className="proof-kicker">{note.label}</p>
                  <h3>{note.title}</h3>
                </div>
                <dl>
                  <div>
                    <dt>{copy.focusLabel}</dt>
                    <dd>{note.focus}</dd>
                  </div>
                  <div>
                    <dt>{copy.methodLabel}</dt>
                    <dd>{note.method}</dd>
                  </div>
                  <div>
                    <dt>{copy.signalLabel}</dt>
                    <dd>{note.signal}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.12}>
        <section className="lab-section grid gap-8 md:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-2">
            <p className="eyebrow">{copy.inferenceLabel}</p>
            <h2 className="text-4xl md:text-5xl">{copy.inferenceTitle}</h2>
          </div>
          <div className="space-y-6">
            <div className="production-timeline">
              {copy.inferencePoints.map((point, index) => (
                <article key={point} className="production-step">
                  <p className="proof-kicker">
                    {checkLabel} {String(index + 1).padStart(2, "0")}
                  </p>
                  <p>{point}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.2}>
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
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
