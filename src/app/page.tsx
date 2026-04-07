import Link from "next/link";
import { AdamChatWidget } from "@/components/adam-chat-widget";
import { FadeIn } from "@/components/fade-in";
import { researchTracks, services } from "@/lib/site-content";

export default function Home() {
  return (
    <div className="space-y-20 md:space-y-24">
      <FadeIn>
        <section className="surface-card relative overflow-hidden px-6 py-12 md:px-12 md:py-16">
          <div
            className="pointer-events-none absolute -right-14 top-[-8rem] h-60 w-60 rounded-full bg-[color:var(--accent-soft)] blur-2xl"
            aria-hidden
          />
          <div className="relative space-y-7">
            <p className="eyebrow">Tokyo, Japan</p>
            <h1 className="max-w-5xl text-5xl leading-[1.03] md:text-7xl">
              Enterprise AI systems with research depth and delivery discipline.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-[color:var(--muted-ink)] md:text-xl">
              BitLabs helps organizations design, build, and deploy practical AI across agents, model systems, and
              secure cloud environments.
            </p>
            <div className="flex flex-wrap gap-3">
              <AdamChatWidget />
              <Link
                href="/services"
                className="rounded-full border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-6 py-3 text-sm font-medium transition-colors hover:bg-[color:var(--accent-soft)]"
              >
                Explore Services
              </Link>
            </div>
            <p className="text-sm text-[color:var(--muted-ink)]">Adam is our Agentic RAG chatbot for user enquiries.</p>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.1}>
        <section className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="eyebrow">Capabilities</p>
              <h2 className="text-4xl md:text-5xl">Built for real operating conditions.</h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {services.map((item) => (
              <article key={item.title} className="surface-card p-6 md:p-7">
                <h3 className="text-2xl leading-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--muted-ink)]">{item.delivery}</p>
              </article>
            ))}
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.15}>
        <section className="surface-card grid gap-6 p-7 md:grid-cols-[1.15fr_1fr] md:p-10">
          <div className="space-y-3">
            <p className="eyebrow">Security and Deployment</p>
            <h2 className="text-4xl md:text-5xl">Security architecture is part of the first draft, not a retrofit.</h2>
            <p className="leading-8 text-[color:var(--muted-ink)]">
              We design deployment models with access boundaries, controlled integrations, and governance checkpoints
              aligned to enterprise risk standards.
            </p>
          </div>
          <ul className="grid gap-3 text-sm text-[color:var(--muted-ink)]">
            <li className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-4">
              Private infrastructure-aware solution design
            </li>
            <li className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-4">
              Policy-driven rollout and data handling boundaries
            </li>
            <li className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-4">
              Model deployment patterns for regulated environments
            </li>
          </ul>
        </section>
      </FadeIn>

      <FadeIn delay={0.2}>
        <section className="space-y-6">
          <div className="space-y-2">
            <p className="eyebrow">Research Highlight</p>
            <h2 className="text-4xl md:text-5xl">Research tracks connected to production reliability.</h2>
          </div>
          <ul className="grid gap-4 md:grid-cols-2">
            {researchTracks.map((track) => (
              <li key={track} className="surface-card p-5 text-sm leading-7">
                {track}
              </li>
            ))}
          </ul>
          <Link
            href="/research"
            className="inline-flex rounded-full border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-5 py-2.5 text-sm font-medium transition-colors hover:bg-[color:var(--accent-soft)]"
          >
            View Research
          </Link>
        </section>
      </FadeIn>
    </div>
  );
}
