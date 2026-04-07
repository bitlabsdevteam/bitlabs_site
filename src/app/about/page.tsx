import type { Metadata } from "next";
import { FadeIn } from "@/components/fade-in";
import { principles, teamStrengths } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "About",
  description: "BitLabs company profile, mission, and operating principles.",
};

export default function AboutPage() {
  return (
    <div className="space-y-14">
      <FadeIn>
        <section className="space-y-4">
          <p className="eyebrow">About</p>
          <h1 className="max-w-5xl text-5xl leading-[1.05] md:text-7xl">Tokyo-based AI builders for enterprise-critical systems.</h1>
          <p className="max-w-3xl text-lg leading-8 text-[color:var(--muted-ink)]">
            BitLabs is an AI R&D and consulting company with expertise across agent solutions, model systems, and
            secure delivery for production environments.
          </p>
        </section>
      </FadeIn>

      <FadeIn delay={0.08}>
        <section className="surface-card space-y-6 p-7 md:p-10">
          <div className="space-y-2">
            <p className="eyebrow">Team Strengths</p>
            <h2 className="text-4xl md:text-5xl">Technical depth with delivery reliability.</h2>
          </div>
          <ul className="grid gap-3 text-sm leading-7 text-[color:var(--muted-ink)] md:grid-cols-2">
            {teamStrengths.map((item) => (
              <li key={item} className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-4">
                {item}
              </li>
            ))}
          </ul>
        </section>
      </FadeIn>

      <FadeIn delay={0.14}>
        <section className="grid gap-5 md:grid-cols-2">
          <article className="surface-card p-7 md:p-8">
            <p className="eyebrow">Mission</p>
            <h2 className="mt-3 text-4xl">Practical AI that improves daily business operations.</h2>
            <p className="mt-4 leading-8 text-[color:var(--muted-ink)]">
              We help people and businesses solve daily problems with secure, reliable AI systems that produce
              measurable growth.
            </p>
          </article>
          <article className="surface-card p-7 md:p-8">
            <p className="eyebrow">Working Principles</p>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-[color:var(--muted-ink)]">
              {principles.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>
      </FadeIn>
    </div>
  );
}
