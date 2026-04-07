import Link from "next/link";
import { AdamChatWidget } from "@/components/adam-chat-widget";
import { FadeIn } from "@/components/fade-in";
import { ParallelismHeroVisual } from "@/components/parallelism-hero-visual";
import { services } from "@/lib/site-content";

export default function Home() {
  return (
    <div className="space-y-20 md:space-y-24">
      <FadeIn>
        <section className="surface-card relative overflow-hidden px-6 py-12 md:px-12 md:py-16">
          <div
            className="pointer-events-none absolute -right-14 top-[-8rem] h-60 w-60 rounded-full bg-[color:var(--accent-soft)] blur-2xl"
            aria-hidden
          />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.15fr_1fr]">
            <div className="space-y-7">
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
            </div>
            <div className="overflow-hidden rounded-[1.75rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] shadow-[0_30px_70px_-45px_rgba(16,23,20,0.72)]">
              <ParallelismHeroVisual />
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.15}>
        <section className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
            <article className="surface-card space-y-3 p-6 md:p-7">
              <p className="eyebrow">Mission</p>
              <p className="book-display max-w-2xl text-2xl leading-tight md:text-3xl">
                To translate advanced AI research into secure, dependable systems that create tangible business value.
              </p>
              <p className="text-sm italic text-[color:var(--muted-ink)]">- by David Bong, CEO of BitLabs</p>
            </article>
            <article className="surface-card space-y-3 p-6 md:p-7">
              <p className="eyebrow">Vision</p>
              <p className="book-display max-w-2xl text-2xl leading-tight md:text-3xl">
                To shape a future where robust, advanced, and secure LLM systems are built on serious research and
                delivered with real-world discipline.
              </p>
              <p className="text-sm italic text-[color:var(--muted-ink)]">- by David Bong, CEO of BitLabs</p>
            </article>
          </div>
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

      <FadeIn delay={0.2}>
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

    </div>
  );
}
