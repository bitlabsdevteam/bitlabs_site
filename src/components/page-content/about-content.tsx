"use client";

import { FadeIn } from "@/components/fade-in";
import { useLanguage } from "@/components/language-provider";
import { aboutContent } from "@/lib/site-content";

export function AboutContent() {
  const { language } = useLanguage();
  const copy = aboutContent[language];
  const profileItems = [
    { label: copy.companyNameLabel, value: copy.companyName },
    { label: copy.ceoLabel, value: copy.ceo },
    { label: copy.establishedLabel, value: copy.established },
    { label: copy.addressLabel, value: copy.address },
    { label: copy.capitalLabel, value: copy.capital },
  ];

  return (
    <div className="space-y-12">
      <FadeIn>
        <section className="surface-card relative overflow-hidden px-6 py-9 md:px-10 md:py-11">
          <div
            className="pointer-events-none absolute left-[-3rem] top-[-2rem] h-36 w-36 rounded-full bg-[color:var(--accent-soft)]/70 blur-3xl"
            aria-hidden
          />
          <div className="relative space-y-4">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1 className="max-w-4xl text-4xl leading-[1.08] md:text-6xl">{copy.title}</h1>
            <p className="max-w-2xl text-base leading-7 text-[color:var(--muted-ink)] md:text-lg">{copy.body}</p>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.08}>
        <section className="surface-card space-y-5 p-7 md:p-9">
          <div className="space-y-2 border-b border-[color:var(--line)] pb-5">
            <p className="eyebrow">{copy.profileLabel}</p>
            <h2 className="max-w-3xl text-3xl leading-tight md:text-4xl">{copy.profileTitle}</h2>
          </div>
          <dl className="divide-y divide-[color:var(--line)]">
            {profileItems.map((item, index) => (
              <div
                key={item.label}
                className={`grid gap-1 py-4 md:grid-cols-[12.5rem_1fr] md:gap-6 ${index === 0 ? "pt-0" : ""}`}
              >
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted-ink)] md:pt-1">
                  {item.label}
                </dt>
                <dd className="m-0 max-w-2xl text-[15px] leading-7 text-[color:var(--ink)] md:text-base">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </FadeIn>
    </div>
  );
}
