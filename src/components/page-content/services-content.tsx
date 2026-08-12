"use client";

import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { useLanguage } from "@/components/language-provider";
import { serviceClusters, services, servicesPageContent } from "@/lib/site-content";

export function ServicesContent() {
  const { language } = useLanguage();
  const copy = servicesPageContent[language];
  const localizedServices = services[language];
  const clusters = serviceClusters[language];

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

      {clusters.map((cluster, clusterIndex) => (
        <FadeIn key={cluster.title} delay={0.08 + clusterIndex * 0.04}>
          <section className="space-y-6" aria-label={cluster.title}>
            <div className="service-cluster-header">
              <p className="eyebrow">{cluster.label}</p>
              <h2 className="text-3xl leading-tight md:text-4xl">{cluster.title}</h2>
              <p className="leading-8 text-[color:var(--muted-ink)]">{cluster.lead}</p>
            </div>

            <div className="buyer-services-stack">
              {cluster.serviceIndexes.map((serviceIndex) => {
                const service = localizedServices[serviceIndex];
                if (!service) return null;
                return (
                  <article key={service.title} className="buyer-service-card">
                    <div className="buyer-service-heading">
                      <h3>{service.title}</h3>
                    </div>
                    <div>
                      <p>{service.summary}</p>
                      {service.tags && (
                        <ul className="service-tags">
                          {service.tags.map((tag) => (
                            <li key={tag} className="service-tag">
                              {tag}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </FadeIn>
      ))}

      <FadeIn delay={0.12}>
        <section className="lab-section grid gap-6 md:grid-cols-[1.1fr_auto] md:items-center">
          <div className="space-y-3">
            <h2 className="max-w-3xl text-3xl leading-tight md:text-4xl">{copy.ctaTitle}</h2>
            <p className="max-w-2xl leading-8 text-[color:var(--muted-ink)]">{copy.ctaBody}</p>
          </div>
          <div>
            <Link href="/about#contact-form" className="button-primary px-6 py-3 text-sm font-medium">
              {copy.ctaLabel}
            </Link>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
