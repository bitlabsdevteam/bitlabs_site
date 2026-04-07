import type { Metadata } from "next";
import { FadeIn } from "@/components/fade-in";
import { researchTracks } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Research",
  description: "Current BitLabs research tracks in SLMs, fine-tuning methods, and agentic reliability.",
};

export default function ResearchPage() {
  return (
    <div className="space-y-14">
      <FadeIn>
        <section className="space-y-4">
          <p className="eyebrow">Research</p>
          <h1 className="max-w-5xl text-5xl leading-[1.05] md:text-7xl">Applied research that survives production constraints.</h1>
          <p className="max-w-3xl text-lg leading-8 text-[color:var(--muted-ink)]">
            The BitLabs research program focuses on methods that translate directly into secure and reliable enterprise
            AI systems.
          </p>
        </section>
      </FadeIn>

      <FadeIn delay={0.08}>
        <ul className="grid gap-4 md:grid-cols-2">
          {researchTracks.map((track) => (
            <li key={track} className="surface-card p-6 text-sm leading-7">
              {track}
            </li>
          ))}
        </ul>
      </FadeIn>

      <FadeIn delay={0.13}>
        <section className="surface-card space-y-6 p-7 md:p-10">
          <div className="space-y-2">
            <p className="eyebrow">Reliability</p>
            <h2 className="text-4xl md:text-5xl">Evaluation and guardrails are integrated into each research cycle.</h2>
          </div>
          <div className="grid gap-3 text-sm text-[color:var(--muted-ink)] md:grid-cols-3">
            <p className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-4">
              Structured evaluation suites across quality, latency, and safety metrics.
            </p>
            <p className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-4">
              Reliability checks for tool use, planning behavior, and operational failure modes.
            </p>
            <p className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-4">
              Governance-aligned release criteria before system rollout to production.
            </p>
          </div>
          <p className="text-sm leading-7 text-[color:var(--muted-ink)]">
            Some research engagements are confidential and cannot be disclosed publicly.
          </p>
        </section>
      </FadeIn>
    </div>
  );
}
