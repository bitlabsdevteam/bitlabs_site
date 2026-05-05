"use client";

import Link from "next/link";
import { AdamChatWidget } from "@/components/adam-chat-widget";
import { ApproachFlowVisual } from "@/components/approach-flow-visual";
import { AnimatedHeroTitle } from "@/components/animated-hero-title";
import { LandingCinematicScene } from "@/components/landing-cinematic-scene";
import { LandingScrollFade } from "@/components/landing-scroll-fade";
import { useLanguage } from "@/components/language-provider";
import { homeContent, labCapabilities, productionProofs, services } from "@/lib/site-content";

export function HomeContent() {
  const { language } = useLanguage();
  const copy = homeContent[language];
  const localizedServices = services[language];
  const localizedCapabilities = labCapabilities[language];
  const localizedProofs = productionProofs[language];

  return (
    <div className="cinematic-home">
      <div className="landing-cinema-background" aria-hidden>
        <LandingCinematicScene />
      </div>

      <LandingScrollFade>
        <section className="cinematic-hero">
          <div className="cinematic-hero-content">
            <p className="eyebrow">{copy.location}</p>
            <AnimatedHeroTitle
              text={copy.heroTitle}
              className="cinematic-hero-title max-w-5xl text-5xl leading-[1.03] md:text-7xl"
            />
            <p className="max-w-3xl text-lg leading-8 text-[color:var(--muted-ink)] md:text-xl">{copy.heroBody}</p>
            <p className="cinematic-hero-statement">
              <span>{copy.heroStatementLabel}</span>
              {copy.heroStatement}
            </p>
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

          <div className="cinematic-hero-readout" aria-hidden>
            <span>Transformer layers</span>
            <span>Attention heads</span>
            <span>Residual streams</span>
          </div>
        </section>
      </LandingScrollFade>

      <div className="cinematic-scroll-track">
        <LandingScrollFade>
          <section className="cinematic-section cinematic-section-lab grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="space-y-4">
              <p className="eyebrow">{copy.labLabel}</p>
              <h2 className="max-w-3xl text-4xl leading-tight md:text-5xl">{copy.labTitle}</h2>
              <p className="max-w-2xl leading-8 text-[color:var(--muted-ink)]">{copy.labBody}</p>
            </div>
            <div className="expertise-matrix cinematic-depth-grid">
              {localizedCapabilities.map((item) => (
                <article key={item.title} className="expertise-cell cinematic-depth-card">
                  <p className="proof-kicker">{item.label}</p>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </section>
        </LandingScrollFade>

        <LandingScrollFade>
          <section className="cinematic-section cinematic-approach">
            <div className="cinematic-section-glint" aria-hidden />
            <div className="relative grid gap-8 lg:grid-cols-[0.96fr_1.04fr] lg:items-start">
              <div className="space-y-5">
                <div className="space-y-3">
                  <p className="eyebrow">{copy.approachLabel}</p>
                  <h2 className="max-w-3xl text-4xl md:text-5xl">{copy.approachTitle}</h2>
                  <p className="max-w-2xl leading-8 text-[color:var(--muted-ink)]">{copy.approachBody}</p>
                </div>

                <div className="grid gap-3">
                  {copy.approachSteps.map((step) => (
                    <article key={step.phase} className="cinematic-process-card">
                      <div className="flex items-center justify-between gap-3">
                        <p className="eyebrow">{step.phase}</p>
                        <span>{step.marker}</span>
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
          <section className="cinematic-section cinematic-proof grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-start">
            <div className="space-y-4">
              <p className="eyebrow">{copy.productionLabel}</p>
              <h2 className="max-w-xl text-4xl leading-tight md:text-5xl">{copy.productionTitle}</h2>
              <p className="leading-8 text-[color:var(--muted-ink)]">{copy.productionBody}</p>
            </div>
            <div className="production-timeline cinematic-timeline">
              {localizedProofs.map((item) => (
                <article key={item.label} className="production-step cinematic-timeline-step">
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
          <section className="cinematic-section cinematic-services space-y-6">
            <div className="space-y-2">
              <p className="eyebrow">{copy.capabilitiesLabel}</p>
              <h2 className="max-w-4xl text-4xl leading-tight md:text-5xl">{copy.capabilitiesTitle}</h2>
            </div>
            <div className="service-ledger cinematic-ledger">
              {localizedServices.map((item) => (
                <article key={item.title} className="ledger-row cinematic-ledger-row">
                  <h3 className="text-2xl leading-tight">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--muted-ink)]">{item.delivery}</p>
                </article>
              ))}
            </div>
          </section>
        </LandingScrollFade>

        <LandingScrollFade>
          <section className="cinematic-section cinematic-security grid gap-6 md:grid-cols-[1.15fr_1fr]">
            <div className="space-y-3">
              <p className="eyebrow">{copy.securityLabel}</p>
              <h2 className="text-4xl md:text-5xl">{copy.securityTitle}</h2>
              <p className="leading-8 text-[color:var(--muted-ink)]">{copy.securityBody}</p>
            </div>
            <ul className="grid gap-3 text-sm text-[color:var(--muted-ink)]">
              {copy.securityPoints.map((point) => (
                <li key={point} className="cinematic-security-point">
                  {point}
                </li>
              ))}
            </ul>
          </section>
        </LandingScrollFade>
      </div>
    </div>
  );
}
