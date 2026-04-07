import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { FadeIn } from "@/components/fade-in";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact BitLabs to discuss AI consulting, R&D, and deployment programs.",
};

export default function ContactPage() {
  return (
    <div className="grid gap-8 md:grid-cols-[1fr_1.15fr] md:items-start">
      <FadeIn>
        <section className="space-y-5">
          <p className="eyebrow">Contact</p>
          <h1 className="text-5xl leading-[1.05] md:text-6xl">Tell us what you need to build.</h1>
          <p className="text-lg leading-8 text-[color:var(--muted-ink)]">
            Share your business context, constraints, and expected outcomes. We will respond with an initial delivery
            approach.
          </p>
          <div className="surface-card space-y-2 p-5 text-sm leading-7 text-[color:var(--muted-ink)]">
            <p>Email: hello@bitlabs.site</p>
            <p>Location: Tokyo, Japan</p>
            <p>Typical response time: within 1 business day.</p>
          </div>
        </section>
      </FadeIn>
      <FadeIn delay={0.08}>
        <ContactForm />
      </FadeIn>
    </div>
  );
}
