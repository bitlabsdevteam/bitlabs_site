"use client";

import Link from "next/link";
import { Cpu, Network, Server, Gauge, Wrench } from "lucide-react";
import { AnimatedHero } from "@/components/ui/animated-hero";
import RadialOrbitalTimeline, {
  type TimelineItem,
} from "@/components/ui/radial-orbital-timeline";
import { IntegrationHero } from "@/components/ui/integration-hero";
import { HomeExpertise } from "@/components/page-content/home-expertise";
import { CinematicReveal } from "@/components/cinematic-reveal";
import { SectionParallax } from "@/components/section-parallax";
import { useLanguage } from "@/components/language-provider";
import {
  homeContent,
  homePlatforms,
  labCapabilities,
  researchLabNotes,
  systemMapSteps,
} from "@/lib/site-content";

// Icon per pillar, matched to the order of `labCapabilities`:
// models / agents & RAG / production / evals / harness.
const pillarIcons = [Cpu, Network, Server, Gauge, Wrench];

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

export function HomeContent() {
  const { language } = useLanguage();
  const copy = homeContent[language];
  const platformsCopy = homePlatforms[language];
  const localizedSystemMap = systemMapSteps[language];
  const localizedResearchNotes = researchLabNotes[language];

  // Map the capability pillars onto the orbital constellation. Each node
  // links to the others, so models, agents, production, and evals read as
  // one connected stack.
  const capabilities = labCapabilities[language];
  const timelineData: TimelineItem[] = capabilities.map((item, index) => {
    const id = index + 1;
    return {
      id,
      title: item.title,
      date: item.label,
      content: item.body,
      category: item.label.split("/").pop()?.trim() ?? item.title,
      icon: pillarIcons[index] ?? Cpu,
      relatedIds: capabilities.map((_, i) => i + 1).filter((n) => n !== id),
      status: "completed" as const,
      energy: 100 - index * 16,
    };
  });

  return (
    <div className="cinematic-home">
      <div className="home-hero-bleed">
        <AnimatedHero
          eyebrow={copy.location}
          prefix={copy.heroPrefix}
          rotating={copy.heroRotating}
          subtitle={copy.heroBody}
          primaryCta={{ label: copy.primaryCta, href: "/about#contact-form" }}
          secondaryCta={{ label: copy.secondaryCta, href: "#capabilities" }}
        />
      </div>

      <section
        id="capabilities"
        className="scroll-mt-24 py-12"
        aria-labelledby="capabilities-title"
      >
        <div className="container mx-auto px-4 md:px-6">
          <SectionParallax contentClassName="mx-auto max-w-3xl text-center" contentY={[48, -48]}>
            <h2
              id="capabilities-title"
              className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl"
            >
              {copy.labTitle}
            </h2>
            <p className="mt-4 text-muted-foreground md:text-xl">{copy.labBody}</p>
          </SectionParallax>
        </div>

        <RadialOrbitalTimeline
          timelineData={timelineData}
          className="mt-4 h-[68vh] min-h-[560px] rounded-3xl"
        />
      </section>

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
      </div>

      <HomeExpertise />

      <div className="cinematic-scroll-track">
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

        <CinematicReveal direction="right">
          <section className="cinematic-section cinematic-section-lab space-y-8" aria-labelledby="home-research-title">
            <div className="grid gap-6 md:grid-cols-[0.82fr_1.18fr] md:items-end">
              <div className="space-y-3">
                <p className="eyebrow">{copy.researchLabel}</p>
                <h2 id="home-research-title" className="max-w-3xl text-3xl leading-tight md:text-4xl">
                  {copy.researchTitle}
                </h2>
              </div>
              <p className="max-w-3xl leading-8 text-[color:var(--muted-ink)]">{copy.researchBody}</p>
            </div>

            <div className="expertise-matrix cinematic-depth-grid">
              {localizedResearchNotes.map((note) => (
                <article
                  key={note.label}
                  className="expertise-cell cinematic-depth-card cinematic-hover-plane"
                >
                  <p className="proof-kicker">{note.label}</p>
                  <h3>{note.title}</h3>
                  <p>{note.signal}</p>
                </article>
              ))}
            </div>

            <div>
              <Link href="/research" className="button-secondary px-6 py-3 text-sm font-medium">
                {copy.researchCtaLabel}
              </Link>
            </div>
          </section>
        </CinematicReveal>
      </div>

      <IntegrationHero
        eyebrow={platformsCopy.eyebrow}
        title={platformsCopy.title}
        body={platformsCopy.body}
        ctaLabel={platformsCopy.ctaLabel}
        ctaHref="/about#contact-form"
        platforms={platformsCopy.platforms}
      />
    </div>
  );
}
