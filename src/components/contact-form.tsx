"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.email("Please enter a valid work email."),
  company: z.string().min(2, "Please enter your company name."),
  brief: z.string().min(20, "Please provide at least 20 characters."),
  website: z.string().max(0, "Invalid submission."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
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
    <form
      className="surface-card grid gap-4 p-6 md:p-7"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <label className="grid gap-1 text-sm text-[color:var(--muted-ink)]">
        Name
        <input
          className="rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-4 py-3 text-[color:var(--ink)] outline-none transition-colors focus:border-[color:var(--accent)]"
          {...register("name")}
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name ? <span className="text-xs text-red-700">{errors.name.message}</span> : null}
      </label>

      <label className="grid gap-1 text-sm text-[color:var(--muted-ink)]">
        Work Email
        <input
          className="rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-4 py-3 text-[color:var(--ink)] outline-none transition-colors focus:border-[color:var(--accent)]"
          {...register("email")}
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email ? <span className="text-xs text-red-700">{errors.email.message}</span> : null}
      </label>

      <label className="grid gap-1 text-sm text-[color:var(--muted-ink)]">
        Company
        <input
          className="rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-4 py-3 text-[color:var(--ink)] outline-none transition-colors focus:border-[color:var(--accent)]"
          {...register("company")}
          aria-invalid={Boolean(errors.company)}
        />
        {errors.company ? <span className="text-xs text-red-700">{errors.company.message}</span> : null}
      </label>

      <label className="grid gap-1 text-sm text-[color:var(--muted-ink)]">
        Project Brief
        <textarea
          className="min-h-32 rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-4 py-3 text-[color:var(--ink)] outline-none transition-colors focus:border-[color:var(--accent)]"
          {...register("brief")}
          aria-invalid={Boolean(errors.brief)}
        />
        {errors.brief ? <span className="text-xs text-red-700">{errors.brief.message}</span> : null}
      </label>

      <input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...register("website")} />

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 rounded-full bg-[color:var(--ink)] px-5 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 disabled:opacity-70"
      >
        {isSubmitting ? "Sending..." : "Discuss Your AI Project"}
      </button>

      {submitted ? (
        <p className="text-sm text-[color:var(--accent)]">Message received. We typically respond within 1 business day.</p>
      ) : null}

      <p className="text-xs text-[color:var(--muted-ink)]">
        Anti-spam protections include a honeypot field. For production, add Turnstile or hCaptcha and connect to a
        secure server action/API.
      </p>
    </form>
  );
}
