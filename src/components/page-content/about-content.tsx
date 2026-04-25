"use client";

import { FadeIn } from "@/components/fade-in";
import { useLanguage } from "@/components/language-provider";
import { aboutContent, principles, teamStrengths } from "@/lib/site-content";

export function AboutContent() {
  const { language } = useLanguage();
  const copy = aboutContent[language];
  const localizedPrinciples = principles[language];
  const localizedStrengths = teamStrengths[language];
  const principleLabel = language === "en" ? "Principle" : "原則";
  const capabilityLabel = language === "en" ? "Capability" : "専門性";
  const profileItems = [
    { label: copy.companyNameLabel, value: copy.companyName },
    { label: copy.ceoLabel, value: copy.ceo },
    { label: copy.establishedLabel, value: copy.established },
    { label: copy.addressLabel, value: copy.address },
    { label: copy.capitalLabel, value: copy.capital },
  ];

  return (
    <div className="space-y-12">
      <FadeIn>
        <section className="lab-hero relative overflow-hidden px-6 py-9 md:px-10 md:py-11">
          <div className="lab-grid-overlay" aria-hidden />
          <div className="relative space-y-4">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1 className="max-w-4xl text-4xl leading-[1.08] md:text-6xl">{copy.title}</h1>
            <p className="max-w-2xl text-base leading-7 text-[color:var(--muted-ink)] md:text-lg">{copy.body}</p>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.08}>
        <section className="lab-section grid gap-8 md:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-3">
            <p className="eyebrow">{language === "en" ? "Working Principles" : "行動原則"}</p>
            <h2 className="max-w-xl text-4xl leading-tight md:text-5xl">
              {language === "en" ? "Disciplined AI work for high-accountability environments." : "説明責任が求められる環境のための、規律あるAI実装。"}
            </h2>
          </div>
          <div className="production-timeline">
            {localizedPrinciples.map((principle, index) => (
              <article key={principle} className="production-step">
                <p className="proof-kicker">
                  {principleLabel} {String(index + 1).padStart(2, "0")}
                </p>
                <p>{principle}</p>
              </article>
            ))}
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.12}>
        <section className="lab-section grid gap-8 md:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-3">
            <p className="eyebrow">{language === "en" ? "Team Strength" : "チームの強み"}</p>
            <h2 className="max-w-xl text-4xl leading-tight md:text-5xl">
              {language === "en" ? "The expertise clients should feel immediately." : "訪問者に伝えるべき専門性。"}
            </h2>
          </div>
          <div className="expertise-matrix">
            {localizedStrengths.map((strength, index) => (
              <article key={strength} className="expertise-cell">
                <p className="proof-kicker">
                  {String(index + 1).padStart(2, "0")} / {capabilityLabel}
                </p>
                <p>{strength}</p>
              </article>
            ))}
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.16}>
        <section className="surface-card space-y-5 p-7 md:p-9">
          <div className="space-y-2 border-b border-[color:var(--line)] pb-5">
            <p className="eyebrow">{copy.profileLabel}</p>
            <h2 className="max-w-3xl text-3xl leading-tight md:text-4xl">{copy.profileTitle}</h2>
          </div>
          <dl className="divide-y divide-[color:var(--line)]">
            {profileItems.map((item, index) => (
              <div
                key={item.label}
                className={`grid gap-1 py-4 md:grid-cols-[12.5rem_1fr] md:gap-6 ${index === 0 ? "pt-0" : ""}`}
              >
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted-ink)] md:pt-1">
                  {item.label}
                </dt>
                <dd className="m-0 max-w-2xl text-[15px] leading-7 text-[color:var(--ink)] md:text-base">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </FadeIn>
    </div>
  );
}
