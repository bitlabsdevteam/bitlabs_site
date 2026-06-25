"use client";

import { FadeIn } from "@/components/fade-in";
import { useLanguage } from "@/components/language-provider";
import { services, servicesPageContent } from "@/lib/site-content";

export function ServicesContent() {
  const { language } = useLanguage();
  const copy = servicesPageContent[language];
  const localizedServices = services[language];

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
                <h2>{service.title}</h2>
              </div>
              <p>{service.summary}</p>
            </article>
          ))}
        </section>
      </FadeIn>
    </div>
  );
}
