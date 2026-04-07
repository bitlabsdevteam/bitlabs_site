import type { Metadata } from "next";
import { FadeIn } from "@/components/fade-in";
import { deliverySteps, services } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Services",
  description: "BitLabs services across AI agents, enterprise AI, model training, and secure cloud deployment.",
};

export default function ServicesPage() {
  return (
    <div className="space-y-14">
      <FadeIn>
        <section className="space-y-4">
          <p className="eyebrow">Services</p>
          <h1 className="max-w-5xl text-5xl leading-[1.05] md:text-7xl">From architecture through production operations.</h1>
          <p className="max-w-3xl text-lg leading-8 text-[color:var(--muted-ink)]">
            BitLabs delivers end-to-end AI programs, blending research methods with enterprise implementation and
            deployment reliability.
          </p>
        </section>
      </FadeIn>

      <FadeIn delay={0.08}>
        <section className="grid gap-5 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.title} className="surface-card p-6 md:p-7">
              <h2 className="text-3xl leading-tight">{service.title}</h2>
              <p className="mt-4 text-sm font-medium tracking-wide text-[color:var(--ink)]">Problem</p>
              <p className="text-sm leading-7 text-[color:var(--muted-ink)]">{service.problem}</p>
              <p className="mt-4 text-sm font-medium tracking-wide text-[color:var(--ink)]">Delivery</p>
              <p className="text-sm leading-7 text-[color:var(--muted-ink)]">{service.delivery}</p>
              <p className="mt-4 text-sm font-medium tracking-wide text-[color:var(--ink)]">Outcome</p>
              <p className="text-sm leading-7 text-[color:var(--muted-ink)]">{service.outcome}</p>
            </article>
          ))}
        </section>
      </FadeIn>

      <FadeIn delay={0.14}>
        <section className="surface-card space-y-6 p-7 md:p-10">
          <div className="space-y-2">
            <p className="eyebrow">Delivery Model</p>
            <h2 className="text-4xl md:text-5xl">A delivery framework designed for measurable outcomes.</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {deliverySteps.map((step) => (
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
