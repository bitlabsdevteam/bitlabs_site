"use client";

import { ContactForm } from "@/components/contact-form";
import { FadeIn } from "@/components/fade-in";
import { useLanguage } from "@/components/language-provider";
import { aboutContent, contactContent } from "@/lib/site-content";

export function AboutContent() {
  const { language } = useLanguage();
  const copy = aboutContent[language];
  const contact = contactContent[language];

  const profileItems = [
    { label: copy.companyNameLabel, value: copy.companyName },
    { label: copy.ceoLabel, value: copy.ceo },
    { label: copy.establishedLabel, value: copy.established },
    { label: copy.addressLabel, value: copy.address },
    { label: copy.capitalLabel, value: copy.capital },
  ];

  return (
    <div className="space-y-10 py-6 md:space-y-12 md:py-10">
      {/* Page heading sitting above the two cards. */}
      <FadeIn>
        <header className="space-y-4">
          <p className="eyebrow">{contact.eyebrow}</p>
          <h1 className="max-w-4xl text-4xl leading-[1.08] md:text-6xl">{contact.title}</h1>
          <p className="max-w-2xl text-base leading-8 text-[color:var(--muted-ink)] md:text-lg">
            {contact.body}
          </p>
        </header>
      </FadeIn>

      {/* Company profile and contact form sit on the same line (two
          top-aligned columns). */}
      <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Company profile */}
        <FadeIn>
          <section className="surface-card p-7 md:p-9">
            <div className="space-y-2 border-b border-[color:var(--line)] pb-5">
              <p className="eyebrow">{copy.profileLabel}</p>
              <h2 className="text-2xl leading-tight md:text-3xl">{copy.profileTitle}</h2>
            </div>
            <dl className="divide-y divide-[color:var(--line)]">
              {profileItems.map((item, index) => (
                <div
                  key={item.label}
                  className={`grid gap-1 py-4 md:grid-cols-[10rem_1fr] md:gap-6 ${index === 0 ? "pt-5" : ""}`}
                >
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted-ink)] md:pt-1">
                    {item.label}
                  </dt>
                  <dd className="m-0 max-w-2xl text-[15px] leading-7 text-[color:var(--ink)] md:text-base">
                    {item.value}
                  </dd>
                </div>
              ))}
              <div className="grid gap-2 py-4 md:grid-cols-[10rem_1fr] md:gap-6">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted-ink)] md:pt-1">
                  {copy.banksLabel}
                </dt>
                <dd className="m-0 max-w-2xl">
                  <ul className="flex flex-wrap gap-2.5">
                    {copy.banks.map((bank) => (
                      <li
                        key={bank}
                        className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-2 text-[13px] leading-none text-[color:var(--ink)]"
                      >
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="h-3.5 w-3.5 shrink-0 text-[color:var(--muted-ink)]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        >
                          <path d="M3 9.5 12 4l9 5.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M4.5 10v8.5M9 10v8.5M15 10v8.5M19.5 10v8.5" strokeLinecap="round" />
                          <path d="M3 19.5h18" strokeLinecap="round" />
                        </svg>
                        {bank}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </section>
        </FadeIn>

        {/* Contact form */}
        <FadeIn delay={0.1}>
          <section id="contact-form" className="space-y-4">
            <ContactForm />
            <p className="text-center text-xs text-[color:var(--muted-ink)]">
              {contact.responseLabel}: {contact.responseTime}
            </p>
          </section>
        </FadeIn>
      </div>
    </div>
  );
}
