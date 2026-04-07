"use client";

import { FadeIn } from "@/components/fade-in";
import { useLanguage } from "@/components/language-provider";
import { deliverySteps, services, servicesPageContent } from "@/lib/site-content";

export function ServicesContent() {
  const { language } = useLanguage();
  const copy = servicesPageContent[language];
  const localizedServices = services[language];
  const localizedSteps = deliverySteps[language];

  return (
    <div className="space-y-14">
      <FadeIn>
        <section className="space-y-4">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="max-w-5xl text-5xl leading-[1.05] md:text-7xl">{copy.title}</h1>
          <p className="max-w-3xl text-lg leading-8 text-[color:var(--muted-ink)]">{copy.body}</p>
        </section>
      </FadeIn>

      <FadeIn delay={0.08}>
        <section className="grid gap-5 md:grid-cols-2">
          {localizedServices.map((service) => (
            <article key={service.title} className="surface-card p-6 md:p-7">
              <h2 className="text-3xl leading-tight">{service.title}</h2>
              <p className="mt-4 text-sm font-medium tracking-wide text-[color:var(--ink)]">{copy.problemLabel}</p>
              <p className="text-sm leading-7 text-[color:var(--muted-ink)]">{service.problem}</p>
              <p className="mt-4 text-sm font-medium tracking-wide text-[color:var(--ink)]">{copy.deliveryLabel}</p>
              <p className="text-sm leading-7 text-[color:var(--muted-ink)]">{service.delivery}</p>
              <p className="mt-4 text-sm font-medium tracking-wide text-[color:var(--ink)]">{copy.outcomeLabel}</p>
              <p className="text-sm leading-7 text-[color:var(--muted-ink)]">{service.outcome}</p>
            </article>
          ))}
        </section>
      </FadeIn>

      <FadeIn delay={0.14}>
        <section className="surface-card space-y-6 p-7 md:p-10">
          <div className="space-y-2">
            <p className="eyebrow">{copy.processLabel}</p>
            <h2 className="text-4xl md:text-5xl">{copy.processTitle}</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {localizedSteps.map((step) => (
              <article key={step.phase} className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--muted-ink)]">{step.phase}</p>
                <p className="mt-2 text-sm leading-7 text-[color:var(--muted-ink)]">{step.detail}</p>
              </article>
            ))}
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
