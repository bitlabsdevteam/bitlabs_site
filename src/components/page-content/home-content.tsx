"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ApproachFlowVisual } from "@/components/approach-flow-visual";
import { AnimatedHeroTitle } from "@/components/animated-hero-title";
import { LandingScrollFade } from "@/components/landing-scroll-fade";
import { CinematicReveal } from "@/components/cinematic-reveal";
import { SectionParallax } from "@/components/section-parallax";
import { useLanguage } from "@/components/language-provider";
import {
  homeContent,
  labCapabilities,
  productionProofs,
  services,
  systemMapSteps,
} from "@/lib/site-content";

const LandingCinematicScene = dynamic(
  () =>
    import("@/components/landing-cinematic-scene").then(
      (module) => module.LandingCinematicScene,
    ),
  { ssr: false },
);

const labBackground = (
  <>
    <span className="section-parallax-orb section-parallax-orb-teal section-parallax-orb-lab-left" />
    <span className="section-parallax-orb section-parallax-orb-amber section-parallax-orb-lab-right" />
    <span className="section-parallax-grid section-parallax-grid-lab" />
  </>
);

const labMidground = (
  <div className="section-parallax-rails section-parallax-rails-lab">
    <span />
    <span />
    <span />
  </div>
);

const systemBackground = (
  <>
    <span className="section-parallax-grid section-parallax-grid-system" />
    <span className="section-parallax-orb section-parallax-orb-teal section-parallax-orb-system-left" />
    <span className="section-parallax-orb section-parallax-orb-violet section-parallax-orb-system-right" />
  </>
);

const systemMidground = (
  <div className="section-parallax-pulseband">
    <span />
    <span />
  </div>
);

const proofBackground = (
  <>
    <span className="section-parallax-orb section-parallax-orb-amber section-parallax-orb-proof-left" />
    <span className="section-parallax-orb section-parallax-orb-teal section-parallax-orb-proof-right" />
    <span className="section-parallax-grid section-parallax-grid-proof" />
  </>
);

const proofMidground = (
  <div className="section-parallax-rails section-parallax-rails-proof">
    <span />
    <span />
    <span />
    <span />
  </div>
);

export function HomeContent() {
  const { language } = useLanguage();
  const copy = homeContent[language];
  const localizedServices = services[language];
  const localizedCapabilities = labCapabilities[language];
  const localizedProofs = productionProofs[language];
  const localizedSystemMap = systemMapSteps[language];

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
              className="cinematic-hero-title max-w-5xl text-4xl leading-[1.05] md:text-6xl"
              language={language}
            />
            <p className="max-w-3xl text-base leading-8 text-[color:var(--muted-ink)] md:text-lg">{copy.heroBody}</p>
            <p className="cinematic-hero-statement">
              <span>{copy.heroStatementLabel}</span>
              {copy.heroStatement}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/expertises"
                className="button-secondary px-6 py-3 text-sm font-medium"
              >
                {copy.secondaryCta}
              </Link>
            </div>

            <div className="cinematic-hero-readout" aria-hidden>
              {copy.heroReadout.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <aside className="cinematic-hero-panel" aria-label={copy.heroHighlightsLabel}>
            <p className="eyebrow">{copy.heroHighlightsLabel}</p>
            <div className="cinematic-hero-panel-grid">
              {copy.heroHighlights.map((item) => (
                <article
                  key={item.label}
                  className="cinematic-hero-card cinematic-hover-plane"
                >
                  <p className="proof-kicker">{item.label}</p>
                  <h2>{item.value}</h2>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </aside>
        </section>
      </LandingScrollFade>

      <div className="cinematic-scroll-track">
        <CinematicReveal direction="up">
          <section className="cinematic-section cinematic-fullstack">
            <div className="cinematic-section-glint" aria-hidden />
            <div className="fullstack-header">
              <p className="eyebrow">{copy.fullStackLabel}</p>
              <h2 className="fullstack-title">{copy.fullStackTitle}</h2>
              <p className="fullstack-lead">{copy.fullStackLead}</p>
            </div>

            <div className="fullstack-grid">
              <div className="fullstack-contrast">
                <article className="fullstack-contrast-card fullstack-contrast-wrapper cinematic-hover-plane">
                  <p className="proof-kicker">{copy.fullStackWrapperLabel}</p>
                  <p>{copy.fullStackWrapperBody}</p>
                </article>
                <article className="fullstack-contrast-card fullstack-contrast-bitlabs cinematic-hover-plane">
                  <p className="proof-kicker">{copy.fullStackBitlabsLabel}</p>
                  <p>{copy.fullStackBitlabsBody}</p>
                </article>
              </div>

              <div className="fullstack-stack" aria-label={copy.fullStackLayersLabel}>
                <p className="proof-kicker fullstack-stack-label">{copy.fullStackLayersLabel}</p>
                {copy.fullStackLayers.map((layer) => (
                  <article
                    key={layer.tier}
                    className="fullstack-layer cinematic-hover-plane"
                  >
                    <p className="fullstack-layer-tier">{layer.tier}</p>
                    <h3 className="fullstack-layer-title">{layer.title}</h3>
                    <p className="fullstack-layer-body">{layer.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </CinematicReveal>

        <CinematicReveal direction="left">
          <SectionParallax
            className="cinematic-section-parallax cinematic-section-parallax-lab"
            background={labBackground}
            midground={labMidground}
            contentY={[26, -20]}
            midgroundY={[-42, 42]}
            backgroundY={[-78, 78]}
          >
            <section className="cinematic-section cinematic-section-lab grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="space-y-4">
                <p className="eyebrow">{copy.labLabel}</p>
                <h2 className="max-w-3xl text-3xl leading-tight md:text-4xl">{copy.labTitle}</h2>
                <p className="max-w-2xl leading-8 text-[color:var(--muted-ink)]">{copy.labBody}</p>
              </div>
              <div className="expertise-matrix cinematic-depth-grid">
                {localizedCapabilities.map((item) => (
                  <article
                    key={item.title}
                    className="expertise-cell cinematic-depth-card cinematic-hover-plane"
                  >
                    <p className="proof-kicker">{item.label}</p>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            </section>
          </SectionParallax>
        </CinematicReveal>

        <CinematicReveal direction="right">
          <SectionParallax
            className="cinematic-section-parallax cinematic-section-parallax-system"
            background={systemBackground}
            midground={systemMidground}
            contentY={[18, -18]}
            midgroundY={[-28, 32]}
            backgroundY={[-62, 62]}
          >
            <section className="cinematic-section cinematic-approach">
              <div className="cinematic-section-glint" aria-hidden />
              <div className="mb-8 grid gap-6 md:grid-cols-[0.82fr_1.18fr] md:items-end">
                <div className="space-y-3">
                  <p className="eyebrow">{copy.systemMapLabel}</p>
                  <h2 className="max-w-3xl text-3xl leading-tight md:text-4xl">{copy.systemMapTitle}</h2>
                </div>
                <p className="max-w-3xl leading-8 text-[color:var(--muted-ink)]">{copy.systemMapBody}</p>
              </div>

              <div className="system-map" aria-label={copy.systemMapTitle}>
                <div className="system-map-rail" aria-hidden />
                {localizedSystemMap.map((step) => (
                  <article
                    key={step.label}
                    className="system-map-node cinematic-hover-plane"
                  >
                    <p className="proof-kicker">{step.label}</p>
                    <h3>{step.title}</h3>
                  </article>
                ))}
              </div>
            </section>
          </SectionParallax>
        </CinematicReveal>

        <CinematicReveal direction="left">
          <section className="cinematic-section cinematic-approach">
            <div className="cinematic-section-glint" aria-hidden />
            <div className="relative grid gap-8 lg:grid-cols-[0.96fr_1.04fr] lg:items-start">
              <div className="space-y-5">
                <div className="space-y-3">
                  <p className="eyebrow">{copy.approachLabel}</p>
                  <h2 className="max-w-3xl text-3xl md:text-4xl">{copy.approachTitle}</h2>
                  <p className="max-w-2xl leading-8 text-[color:var(--muted-ink)]">{copy.approachBody}</p>
                </div>

                <div className="grid gap-3">
                  {copy.approachSteps.map((step) => (
                    <article
                      key={step.phase}
                      className="cinematic-process-card cinematic-hover-plane"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="eyebrow">{step.phase}</p>
                        <span>{step.marker}</span>
                      </div>
                      <h3 className="mt-3 text-xl leading-tight">{step.title}</h3>
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
        </CinematicReveal>

        <CinematicReveal direction="right">
          <SectionParallax
            className="cinematic-section-parallax cinematic-section-parallax-proof"
            background={proofBackground}
            midground={proofMidground}
            contentY={[22, -16]}
            midgroundY={[-32, 28]}
            backgroundY={[-58, 58]}
          >
            <section className="cinematic-section cinematic-proof grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-start">
              <div className="space-y-4">
                <p className="eyebrow">{copy.productionLabel}</p>
                <h2 className="max-w-xl text-3xl leading-tight md:text-4xl">{copy.productionTitle}</h2>
                <p className="leading-8 text-[color:var(--muted-ink)]">{copy.productionBody}</p>
              </div>
              <div className="production-timeline cinematic-timeline">
                {localizedProofs.map((item) => (
                  <article
                    key={item.label}
                    className="production-step cinematic-timeline-step cinematic-hover-plane"
                  >
                    <div>
                      <p className="proof-kicker">{item.label}</p>
                      <h3>{item.value}</h3>
                    </div>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            </section>
          </SectionParallax>
        </CinematicReveal>

        <CinematicReveal direction="left">
          <section className="cinematic-section cinematic-services space-y-6">
            <div className="space-y-2">
              <p className="eyebrow">{copy.capabilitiesLabel}</p>
              <h2 className="max-w-4xl text-3xl leading-tight md:text-4xl">{copy.capabilitiesTitle}</h2>
            </div>
            <div className="service-ledger cinematic-ledger">
              {localizedServices.map((item) => (
                <article
                  key={item.title}
                  className="ledger-row cinematic-ledger-row cinematic-hover-plane"
                >
                  <h3 className="text-xl leading-tight">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--muted-ink)]">{item.problem}</p>
                </article>
              ))}
            </div>
          </section>
        </CinematicReveal>

        <CinematicReveal direction="right">
          <section className="cinematic-section cinematic-security grid gap-6 md:grid-cols-[1.15fr_1fr]">
            <div className="space-y-3">
              <p className="eyebrow">{copy.securityLabel}</p>
              <h2 className="text-3xl md:text-4xl">{copy.securityTitle}</h2>
              <p className="leading-8 text-[color:var(--muted-ink)]">{copy.securityBody}</p>
            </div>
            <ul className="grid gap-3 text-sm text-[color:var(--muted-ink)]">
              {copy.securityPoints.map((point) => (
                <li
                  key={point}
                  className="cinematic-security-point cinematic-hover-plane"
                >
                  {point}
                </li>
              ))}
            </ul>
          </section>
        </CinematicReveal>
      </div>
    </div>
  );
}
