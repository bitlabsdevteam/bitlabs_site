"use client";

import { FadeIn } from "@/components/fade-in";
import { useLanguage } from "@/components/language-provider";
import { aboutContent, homeContent, principles, teamStrengths } from "@/lib/site-content";

export function AboutContent() {
  const { language } = useLanguage();
  const copy = aboutContent[language];
  const homeCopy = homeContent[language];
  const localizedStrengths = teamStrengths[language];
  const localizedPrinciples = principles[language];
  const strengthsLabel = language === "en" ? "Team Strengths" : "チームの強み";
  const strengthsTitle = language === "en" ? "Research depth matched with delivery discipline." : "研究の深さと、導入までやり切る実装規律。";
  const principlesTitle = language === "en" ? "How BitLabs works." : "BitLabsの進め方。";
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

      <FadeIn delay={0.12}>
        <section className="grid gap-5 md:grid-cols-[1.05fr_0.95fr]">
          <article className="surface-card space-y-5 p-7 md:p-9">
            <div className="space-y-2">
              <p className="eyebrow">{homeCopy.missionLabel}</p>
              <h2 className="text-3xl leading-tight md:text-4xl">{homeCopy.missionBody}</h2>
            </div>
            <p className="text-sm leading-7 text-[color:var(--muted-ink)]">{homeCopy.visionBody}</p>
          </article>

          <article className="surface-card space-y-5 p-7 md:p-9">
            <div className="space-y-2">
              <p className="eyebrow">{strengthsLabel}</p>
              <h2 className="text-3xl leading-tight md:text-4xl">{strengthsTitle}</h2>
            </div>
            <ul className="grid gap-3 text-sm text-[color:var(--muted-ink)]">
              {localizedStrengths.map((item) => (
                <li key={item} className="rounded-2xl border border-[color:var(--line)] bg-[color:rgba(18,22,27,0.92)] p-4">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </section>
      </FadeIn>

      <FadeIn delay={0.16}>
        <section className="surface-card space-y-5 p-7 md:p-9">
          <div className="space-y-2 border-b border-[color:var(--line)] pb-5">
            <p className="eyebrow">{language === "en" ? "Working Principles" : "行動原則"}</p>
            <h2 className="max-w-3xl text-3xl leading-tight md:text-4xl">{principlesTitle}</h2>
          </div>
          <div className="expertise-matrix">
            {localizedPrinciples.map((item) => (
              <article key={item} className="expertise-cell">
                <p className="proof-kicker">{language === "en" ? "Principle" : "原則"}</p>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
