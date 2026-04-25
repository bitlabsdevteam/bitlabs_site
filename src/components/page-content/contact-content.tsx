"use client";

import { ContactForm } from "@/components/contact-form";
import { FadeIn } from "@/components/fade-in";
import { useLanguage } from "@/components/language-provider";
import { contactContent, footerContent } from "@/lib/site-content";

export function ContactContent() {
  const { language } = useLanguage();
  const copy = contactContent[language];
  const footer = footerContent[language];
  const consultationAreas =
    language === "en"
      ? ["AI agent workflows", "LLM or SLM adaptation", "Enterprise AI architecture", "Secure deployment planning"]
      : ["AIエージェント活用", "LLM・SLM適応", "エンタープライズAI設計", "セキュアな導入計画"];

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_1.15fr] md:items-start">
      <FadeIn>
        <section className="lab-section space-y-7">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="text-5xl leading-[1.05] md:text-6xl">{copy.title}</h1>
          <p className="text-lg leading-8 text-[color:var(--muted-ink)]">{copy.body}</p>
          <div className="production-timeline">
            {consultationAreas.map((area, index) => (
              <article key={area} className="production-step">
                <p className="proof-kicker">{String(index + 1).padStart(2, "0")}</p>
                <p>{area}</p>
              </article>
            ))}
          </div>
          <div className="surface-card space-y-2 p-5 text-sm leading-7 text-[color:var(--muted-ink)]">
            <p>
              {copy.emailLabel}: {footer.email}
            </p>
            <p>
              {copy.locationLabel}: {footer.location}
            </p>
            <p>
              {copy.responseLabel}: {copy.responseTime}
            </p>
          </div>
        </section>
      </FadeIn>
      <FadeIn delay={0.08}>
        <ContactForm />
      </FadeIn>
    </div>
  );
}
