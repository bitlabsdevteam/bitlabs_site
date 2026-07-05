"use client";

import { Cpu, Network, Server, Gauge } from "lucide-react";
import { AnimatedHero } from "@/components/ui/animated-hero";
import RadialOrbitalTimeline, {
  type TimelineItem,
} from "@/components/ui/radial-orbital-timeline";
import { IntegrationHero } from "@/components/ui/integration-hero";
import { HomeExpertise } from "@/components/page-content/home-expertise";
import { SectionParallax } from "@/components/section-parallax";
import { useLanguage } from "@/components/language-provider";
import { homeContent, homePlatforms, labCapabilities } from "@/lib/site-content";

// Icon per pillar, matched to the order of `labCapabilities`:
// models / agents & RAG / production / evals.
const pillarIcons = [Cpu, Network, Server, Gauge];

export function HomeContent() {
  const { language } = useLanguage();
  const copy = homeContent[language];
  const platformsCopy = homePlatforms[language];

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

      <HomeExpertise />

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
