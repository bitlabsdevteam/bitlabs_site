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
        <section className="lab-section grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div className="space-y-4">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1 className="max-w-5xl text-5xl leading-[1.05] md:text-7xl">{copy.title}</h1>
          </div>
          <p className="max-w-3xl text-lg leading-8 text-[color:var(--muted-ink)]">{copy.body}</p>
        </section>
      </FadeIn>

      <FadeIn delay={0.08}>
        <section className="service-ledger">
          {localizedServices.map((service) => (
            <article key={service.title} className="ledger-row">
              <div>
                <p className="proof-kicker">{copy.deliveryLabel}</p>
                <h2 className="mt-3 text-3xl leading-tight">{service.title}</h2>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--ink)]">
                    {copy.problemLabel}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[color:var(--muted-ink)]">{service.problem}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--ink)]">
                    {copy.deliveryLabel}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[color:var(--muted-ink)]">{service.delivery}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--ink)]">
                    {copy.outcomeLabel}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[color:var(--muted-ink)]">{service.outcome}</p>
                </div>
              </div>
            </article>
          ))}
        </section>
      </FadeIn>

      <FadeIn delay={0.14}>
        <section className="lab-section grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-2">
            <p className="eyebrow">{copy.processLabel}</p>
            <h2 className="text-4xl md:text-5xl">{copy.processTitle}</h2>
          </div>
          <div className="production-timeline">
            {localizedSteps.map((step) => (
              <article key={step.phase} className="production-step">
                <p className="proof-kicker">{step.phase}</p>
                <p>{step.detail}</p>
              </article>
            ))}
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
