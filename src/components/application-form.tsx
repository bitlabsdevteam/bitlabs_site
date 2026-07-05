"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLanguage } from "@/components/language-provider";
import { applicationFormContent, careerContent, type Language } from "@/lib/site-content";

const MAX_RESUME_SIZE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function createApplicationSchema(language: Language) {
  const copy = applicationFormContent[language];

  return z.object({
    name: z.string().min(2, copy.nameError),
    email: z.email(copy.emailError),
    role: z.string().min(2, copy.roleError),
    message: z.string().min(20, copy.messageError),
    website: z.string().max(0, copy.honeypotError),
    resume: z
      .custom<FileList>()
      .optional()
      .refine((files) => !files || files.length === 0 || files[0].size <= MAX_RESUME_SIZE_BYTES, copy.resumeError)
      .refine(
        (files) => !files || files.length === 0 || ACCEPTED_RESUME_TYPES.includes(files[0].type),
        copy.resumeError,
      ),
  });
}

type ApplicationFormValues = z.infer<ReturnType<typeof createApplicationSchema>>;

function LocalizedApplicationForm({ language }: { language: Language }) {
  const copy = applicationFormContent[language];
  const roles = careerContent[language].roles;
  const schema = useMemo(() => createApplicationSchema(language), [language]);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = async (values: ApplicationFormValues) => {
    if (values.website) {
      return;
    }

    setSubmitError(false);

    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("role", values.role);
      formData.append("message", values.message);
      formData.append("website", values.website);

      if (values.resume && values.resume.length > 0) {
        formData.append("resume", values.resume[0]);
      }

      const response = await fetch("/api/application", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to send application.");
      }

      reset();
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    }
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
        {copy.roleLabel}
        <select
          className="field-control rounded-xl px-4 py-3 outline-none transition-colors"
          defaultValue=""
          {...register("role")}
          aria-invalid={Boolean(errors.role)}
        >
          <option value="" disabled>
            {copy.rolePlaceholder}
          </option>
          {roles.map((role) => (
            <option key={role.title} value={role.title}>
              {role.title}
            </option>
          ))}
        </select>
        {errors.role ? <span className="text-xs text-[color:var(--danger)]">{errors.role.message}</span> : null}
      </label>

      <label className="grid gap-1.5 text-sm text-[color:var(--muted-ink)]">
        {copy.messageLabel}
        <textarea
          className="field-control min-h-32 rounded-xl px-4 py-3 outline-none transition-colors"
          {...register("message")}
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message ? <span className="text-xs text-[color:var(--danger)]">{errors.message.message}</span> : null}
      </label>

      <label className="grid gap-1.5 text-sm text-[color:var(--muted-ink)]">
        {copy.resumeLabel}
        <input
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="field-control rounded-xl px-4 py-3 outline-none transition-colors file:mr-3 file:rounded-lg file:border-0 file:bg-[color:var(--accent)] file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-[#090b0d]"
          {...register("resume")}
          aria-invalid={Boolean(errors.resume)}
        />
        {errors.resume ? (
          <span className="text-xs text-[color:var(--danger)]">{errors.resume.message}</span>
        ) : (
          <span className="text-xs text-[color:var(--muted-ink)]">{copy.resumeHint}</span>
        )}
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
      {submitError ? <p className="text-center text-sm text-[color:var(--danger)]">{copy.error}</p> : null}

      <p className="text-center text-xs text-[color:var(--muted-ink)]">{copy.helper}</p>
    </form>
  );
}

export function ApplicationForm() {
  const { language } = useLanguage();

  return <LocalizedApplicationForm key={language} language={language} />;
}
