"use client";

import { ShieldCheck, Cpu, Workflow } from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { FadeIn } from "@/components/fade-in";
import { SectionParallax } from "@/components/section-parallax";
import { useLanguage } from "@/components/language-provider";
import { expertiseAreas, expertisePageContent } from "@/lib/site-content";

// Icon per area, matched to the order of `expertiseAreas`:
// enterprise architecture / inference engineering / agents & RAG.
const areaIcons: LucideIcon[] = [ShieldCheck, Cpu, Workflow];

// Staggered vertical drift per column so the middle card floats a touch
// deeper than its neighbours as the section scrolls past.
const areaDrift: [number, number][] = [
  [40, -40],
  [68, -68],
  [40, -40],
];

export function HomeExpertise() {
  const { language } = useLanguage();
  const copy = expertisePageContent[language];
  const areas = expertiseAreas[language];

  return (
    <section className="home-expertise" aria-labelledby="home-expertise-title">
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-base font-semibold uppercase tracking-[0.32em] text-[color:var(--accent)] sm:text-lg md:text-xl">
              {copy.eyebrow}
            </p>
            <h2
              id="home-expertise-title"
              className="mt-4 text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl"
            >
              {copy.title}
            </h2>
            <p className="mt-4 text-muted-foreground md:text-xl">{copy.body}</p>
          </div>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {areas.map((area, index) => {
            const Icon = areaIcons[index] ?? ShieldCheck;
            return (
              <SectionParallax
                key={area.title}
                className="home-expertise-parallax"
                contentY={areaDrift[index] ?? [40, -40]}
              >
                <FadeIn delay={index * 0.08} className="h-full">
                  <article className="home-expertise-card flex h-full flex-col items-start gap-4 rounded-2xl border bg-black/30 p-6 shadow-lg backdrop-blur-lg">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-secondary text-secondary-foreground">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-xl font-bold leading-tight tracking-tight text-card-foreground md:text-2xl">
                        {area.title}
                      </h3>
                      <p className="mt-3 text-base leading-8 text-muted-foreground md:text-lg">{area.summary}</p>
                    </div>
                  </article>
                </FadeIn>
              </SectionParallax>
            );
          })}
        </div>
      </div>
    </section>
  );
}
