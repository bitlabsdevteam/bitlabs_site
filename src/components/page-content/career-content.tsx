"use client";

import { ApplicationForm } from "@/components/application-form";
import { FadeIn } from "@/components/fade-in";
import { useLanguage } from "@/components/language-provider";
import { careerContent } from "@/lib/site-content";

export function CareerContent() {
  const { language } = useLanguage();
  const copy = careerContent[language];

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
        <section className="lab-section space-y-6">
          <div className="space-y-2">
            <p className="eyebrow">{copy.whyLabel}</p>
            <h2 className="max-w-3xl text-3xl leading-tight md:text-4xl">{copy.whyTitle}</h2>
          </div>
          <ul className="grid gap-4 md:grid-cols-2">
            {copy.whyPoints.map((point) => (
              <li
                key={point}
                className="surface-card p-5 text-[15px] leading-7 text-[color:var(--ink)] md:text-base"
              >
                {point}
              </li>
            ))}
          </ul>
        </section>
      </FadeIn>

      <FadeIn delay={0.14}>
        <section className="lab-section space-y-7">
          <div className="grid gap-4 md:grid-cols-[0.82fr_1.18fr] md:items-end">
            <div className="space-y-2">
              <p className="eyebrow">{copy.rolesLabel}</p>
              <h2 className="max-w-3xl text-3xl leading-tight md:text-4xl">{copy.rolesTitle}</h2>
            </div>
            <p className="max-w-3xl leading-8 text-[color:var(--muted-ink)]">{copy.rolesBody}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {copy.roles.map((role) => (
              <article key={role.title} className="surface-card flex h-full flex-col gap-5 p-7 md:p-8">
                <div className="space-y-2 border-b border-[color:var(--line)] pb-5">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted-ink)]">
                    <span>{role.type}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{role.location}</span>
                  </div>
                  <h3 className="text-2xl leading-tight">{role.title}</h3>
                  <p className="text-[15px] leading-7 text-[color:var(--muted-ink)] md:text-base">
                    {role.summary}
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted-ink)]">
                    {copy.focusLabel}
                  </p>
                  <ul className="space-y-2.5">
                    {role.focus.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[15px] leading-7 text-[color:var(--ink)] md:text-base"
                      >
                        <span aria-hidden="true" className="mt-3 h-1 w-1 shrink-0 rounded-full bg-[color:var(--accent)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.2}>
        <section id="apply" className="lab-section space-y-6">
          <div className="space-y-4">
            <p className="eyebrow">{copy.applyLabel}</p>
            <h2 className="max-w-3xl text-3xl leading-tight md:text-4xl">{copy.applyTitle}</h2>
            <p className="max-w-2xl text-[15px] leading-7 text-[color:var(--muted-ink)] md:text-base">
              {copy.applyBody}
            </p>
          </div>
          <div className="max-w-2xl">
            <ApplicationForm />
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
