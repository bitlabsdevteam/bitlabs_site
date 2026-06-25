"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLanguage } from "@/components/language-provider";
import { contactFormContent, type Language } from "@/lib/site-content";

function createContactSchema(language: Language) {
  const copy = contactFormContent[language];

  return z.object({
    name: z.string().min(2, copy.nameError),
    email: z.email(copy.emailError),
    company: z.string().min(2, copy.companyError),
    brief: z.string().min(20, copy.briefError),
    website: z.string().max(0, copy.honeypotError),
  });
}

type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;

function LocalizedContactForm({ language }: { language: Language }) {
  const copy = contactFormContent[language];
  const schema = useMemo(() => createContactSchema(language), [language]);
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      brief: "",
      website: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    if (values.website) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
    reset();
    setSubmitted(true);
  };

  return (
    <form className="surface-card grid gap-5 p-6 md:p-8" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm text-[color:var(--muted-ink)]">
          {copy.nameLabel}
          <input
            className="field-control rounded-xl px-4 py-3 outline-none transition-colors"
            {...register("name")}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name ? <span className="text-xs text-[color:var(--danger)]">{errors.name.message}</span> : null}
        </label>

        <label className="grid gap-1.5 text-sm text-[color:var(--muted-ink)]">
          {copy.emailLabel}
          <input
            className="field-control rounded-xl px-4 py-3 outline-none transition-colors"
            {...register("email")}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? <span className="text-xs text-[color:var(--danger)]">{errors.email.message}</span> : null}
        </label>
      </div>

      <label className="grid gap-1.5 text-sm text-[color:var(--muted-ink)]">
        {copy.companyLabel}
        <input
          className="field-control rounded-xl px-4 py-3 outline-none transition-colors"
          {...register("company")}
          aria-invalid={Boolean(errors.company)}
        />
        {errors.company ? <span className="text-xs text-[color:var(--danger)]">{errors.company.message}</span> : null}
      </label>

      <label className="grid gap-1.5 text-sm text-[color:var(--muted-ink)]">
        {copy.briefLabel}
        <textarea
          className="field-control min-h-32 rounded-xl px-4 py-3 outline-none transition-colors"
          {...register("brief")}
          aria-invalid={Boolean(errors.brief)}
        />
        {errors.brief ? <span className="text-xs text-[color:var(--danger)]">{errors.brief.message}</span> : null}
      </label>

      <input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...register("website")} />

      <button
        type="submit"
        disabled={isSubmitting}
        className="button-primary mt-1 w-full px-5 py-3.5 text-sm font-medium disabled:opacity-70"
      >
        {isSubmitting ? copy.submitBusy : copy.submitIdle}
      </button>

      {submitted ? <p className="text-center text-sm text-[color:var(--accent)]">{copy.success}</p> : null}

      <p className="text-center text-xs text-[color:var(--muted-ink)]">{copy.helper}</p>
    </form>
  );
}

export function ContactForm() {
  const { language } = useLanguage();

  return <LocalizedContactForm key={language} language={language} />;
}
