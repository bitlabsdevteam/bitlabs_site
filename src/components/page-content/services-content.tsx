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
            <h1 className="max-w-5xl text-4xl leading-[1.08] md:text-6xl">{copy.title}</h1>
          </div>
          <p className="max-w-3xl text-base leading-8 text-[color:var(--muted-ink)] md:text-lg">{copy.body}</p>
        </section>
      </FadeIn>

      <FadeIn delay={0.08}>
        <section className="buyer-services-stack">
          {localizedServices.map((service) => (
            <article key={service.title} className="buyer-service-card">
              <div className="buyer-service-heading">
                <p className="proof-kicker">{copy.problemLabel}</p>
                <h2>{service.title}</h2>
              </div>

              <div className="buyer-service-grid">
                <div className="buyer-service-cell">
                  <p className="proof-kicker">{copy.problemLabel}</p>
                  <p>{service.problem}</p>
                </div>
                <div className="buyer-service-cell">
                  <p className="proof-kicker">{copy.responseLabel}</p>
                  <p>{service.response}</p>
                </div>
                <div className="buyer-service-cell buyer-service-outcome">
                  <p className="proof-kicker">{copy.outcomeLabel}</p>
                  <p>{service.outcome}</p>
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
            <h2 className="text-3xl md:text-4xl">{copy.processTitle}</h2>
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
