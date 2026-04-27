"use client";

import Link from "next/link";
import { AdamChatWidget } from "@/components/adam-chat-widget";
import { ApproachFlowVisual } from "@/components/approach-flow-visual";
import { AnimatedHeroTitle } from "@/components/animated-hero-title";
import { LandingScrollFade } from "@/components/landing-scroll-fade";
import { TransformerModelHeroVisual } from "@/components/transformer-model-hero-visual";
import { useLanguage } from "@/components/language-provider";
import { homeContent, labCapabilities, productionProofs, services } from "@/lib/site-content";

export function HomeContent() {
  const { language } = useLanguage();
  const copy = homeContent[language];
  const localizedServices = services[language];
  const localizedCapabilities = labCapabilities[language];
  const localizedProofs = productionProofs[language];

  return (
    <div className="space-y-20 md:space-y-24">
      <LandingScrollFade>
        <section className="lab-hero relative overflow-hidden px-6 py-12 md:px-12 md:py-16">
          <div className="lab-grid-overlay" aria-hidden />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.15fr_1fr]">
            <div className="space-y-7">
              <p className="eyebrow">{copy.location}</p>
              <AnimatedHeroTitle
                text={copy.heroTitle}
                className="max-w-5xl text-5xl leading-[1.03] md:text-7xl"
              />
              <p className="max-w-3xl text-lg leading-8 text-[color:var(--muted-ink)] md:text-xl">{copy.heroBody}</p>
              <div className="hero-statement-card max-w-3xl">
                <p className="eyebrow">{copy.heroStatementLabel}</p>
                <p className="book-display mt-3 text-2xl leading-tight md:text-[2rem]">
                  {copy.heroStatement}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <AdamChatWidget launcherLabel={copy.primaryCta} />
                <Link
                  href="/expertises"
                  className="button-secondary px-6 py-3 text-sm font-medium"
                >
                  {copy.secondaryCta}
                </Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-[1.45rem] border border-[color:rgba(244,238,228,0.12)] bg-[color:var(--graphite)] shadow-[0_34px_80px_-48px_rgba(0,0,0,0.96)]">
              <TransformerModelHeroVisual />
            </div>
          </div>
        </section>
      </LandingScrollFade>

      <LandingScrollFade>
        <section className="lab-section grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-4">
            <p className="eyebrow">{copy.labLabel}</p>
            <h2 className="max-w-3xl text-4xl leading-tight md:text-5xl">{copy.labTitle}</h2>
            <p className="max-w-2xl leading-8 text-[color:var(--muted-ink)]">{copy.labBody}</p>
          </div>
          <div className="expertise-matrix">
            {localizedCapabilities.map((item) => (
              <article key={item.title} className="expertise-cell">
                <p className="proof-kicker">{item.label}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>
      </LandingScrollFade>

      <LandingScrollFade>
        <section className="surface-card relative overflow-hidden px-6 py-8 md:px-10 md:py-10">
          <div
            className="pointer-events-none absolute -left-10 bottom-[-4rem] h-44 w-44 rounded-full bg-[color:var(--accent-soft)]/70 blur-3xl"
            aria-hidden
          />
          <div className="relative grid gap-8 lg:grid-cols-[0.96fr_1.04fr] lg:items-start">
            <div className="space-y-5">
              <div className="space-y-3">
                <p className="eyebrow">{copy.approachLabel}</p>
                <h2 className="max-w-3xl text-4xl md:text-5xl">{copy.approachTitle}</h2>
                <p className="max-w-2xl leading-8 text-[color:var(--muted-ink)]">{copy.approachBody}</p>
              </div>

              <div className="grid gap-3">
                {copy.approachSteps.map((step) => (
                  <article
                    key={step.phase}
                    className="rounded-[1.4rem] border border-[color:var(--line)] bg-[color:rgba(18,22,27,0.88)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="eyebrow">{step.phase}</p>
                      <span className="rounded-full border border-[color:var(--line)] bg-[color:rgba(255,255,255,0.03)] px-3 py-1 text-[11px] tracking-[0.14em] text-[color:var(--muted-ink)] uppercase">
                        {step.marker}
                      </span>
                    </div>
                    <h3 className="mt-3 text-2xl leading-tight">{step.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[color:var(--muted-ink)]">{step.body}</p>
                  </article>
                ))}
              </div>
            </div>

            <ApproachFlowVisual
              steps={copy.approachSteps}
              visualLabel={copy.approachVisualLabel}
              visualValue={copy.approachVisualValue}
              outcomeLabel={copy.approachOutcomeLabel}
              outcomeTitle={copy.approachOutcomeTitle}
              outcomeBody={copy.approachOutcomeBody}
            />
          </div>
        </section>
      </LandingScrollFade>

      <LandingScrollFade>
        <section className="lab-section grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-start">
          <div className="space-y-4">
            <p className="eyebrow">{copy.productionLabel}</p>
            <h2 className="max-w-xl text-4xl leading-tight md:text-5xl">{copy.productionTitle}</h2>
            <p className="leading-8 text-[color:var(--muted-ink)]">{copy.productionBody}</p>
          </div>
          <div className="production-timeline">
            {localizedProofs.map((item) => (
              <article key={item.label} className="production-step">
                <div>
                  <p className="proof-kicker">{item.label}</p>
                  <h3>{item.value}</h3>
                </div>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>
      </LandingScrollFade>

      <LandingScrollFade>
        <section className="space-y-6">
          <div className="space-y-2">
            <p className="eyebrow">{copy.capabilitiesLabel}</p>
            <h2 className="max-w-4xl text-4xl leading-tight md:text-5xl">{copy.capabilitiesTitle}</h2>
          </div>
          <div className="service-ledger">
            {localizedServices.map((item) => (
              <article key={item.title} className="ledger-row">
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
              <li key={point} className="rounded-2xl border border-[color:var(--line)] bg-[color:rgba(18,22,27,0.92)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                {point}
              </li>
            ))}
          </ul>
        </section>
      </LandingScrollFade>
    </div>
  );
}
