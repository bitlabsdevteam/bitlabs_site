"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLanguage } from "./language-provider";
import { contactFormContent } from "@/lib/site-content";
import type { Locale } from "@/lib/editorial-content";
const DRAFT_KEY = "bitlabs-contact-draft-v1";
const empty = { name: "", email: "", company: "", brief: "", website: "" };
function createSchema(locale: Locale) {
  const c = contactFormContent[locale],
    max =
      locale === "en"
        ? "Please shorten this field."
        : "文字数を減らしてください。";
  return z.object({
    name: z.string().trim().min(2, c.nameError).max(200, max),
    email: z.email(c.emailError),
    company: z.string().trim().min(2, c.companyError).max(200, max),
    brief: z.string().trim().min(20, c.briefError).max(4000, max),
    website: z.string().max(0, c.honeypotError),
  });
}
type Values = typeof empty;
function LocalizedContactForm({ locale }: { locale: Locale }) {
  const c = contactFormContent[locale],
    ja = locale === "ja";
  const schema = useMemo(() => createSchema(locale), [locale]);
  const [status, setStatus] = useState<
    "idle" | "success" | "error" | "invalid"
  >("idle");
  const {
    register,
    handleSubmit,
    reset,
    subscribe,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: empty });
  useEffect(() => {
    try {
      const stored = JSON.parse(sessionStorage.getItem(DRAFT_KEY) || "null");
      if (stored && typeof stored === "object") {
        const draft = { ...empty };
        for (const key of ["name", "email", "company", "brief"] as const)
          if (typeof stored[key] === "string")
            draft[key] = stored[key].slice(
              0,
              key === "brief" ? 4000 : key === "email" ? 320 : 200,
            );
        reset(draft);
      }
    } catch {
      /* Storage may be disabled; the form still works. */
    }
    const unsubscribe = subscribe({
      formState: { values: true },
      callback: ({ values }) => {
        try {
          const { name, email, company, brief } = values;
          sessionStorage.setItem(
            DRAFT_KEY,
            JSON.stringify({ name, email, company, brief }),
          );
        } catch {
          /* Keep draft in the live form when storage is unavailable. */
        }
      },
    });
    return unsubscribe;
  }, [reset, subscribe]);
  async function onSubmit(values: Values) {
    setStatus("idle");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        signal: AbortSignal.timeout(20000),
      });
      if (!response.ok) {
        setStatus(response.status === 400 ? "invalid" : "error");
        return;
      }
      reset(empty);
      try {
        sessionStorage.removeItem(DRAFT_KEY);
      } catch {
        /* Optional storage. */
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }
  function field(name: "name" | "email" | "company" | "brief", label: string) {
    const id = `contact-${name}`,
      error = errors[name];
    const props = {
      ...register(name),
      id,
      required: true,
      "aria-invalid": Boolean(error),
      "aria-describedby":
        [error ? `${id}-error` : "", name === "brief" ? "brief-hint" : ""]
          .filter(Boolean)
          .join(" ") || undefined,
      className: "field-control",
    };
    return (
      <div className="form-field">
        <label htmlFor={id}>{label}</label>
        {name === "brief" ? (
          <textarea {...props} maxLength={4000} rows={6} />
        ) : (
          <input
            {...props}
            type={name === "email" ? "email" : "text"}
            autoComplete={name === "company" ? "organization" : name}
            maxLength={name === "email" ? 320 : 200}
          />
        )}
        {name === "brief" ? (
          <p id="brief-hint" className="form-hint">
            {ja
              ? "20〜4,000文字。目標、対象の業務、制約などをご記入ください。"
              : "20–4,000 characters. Include your goal, workflow, and constraints."}
          </p>
        ) : null}
        {error ? (
          <p id={`${id}-error`} className="field-error">
            {error.message}
          </p>
        ) : null}
      </div>
    );
  }
  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit(onSubmit, () => setStatus("invalid"))}
      noValidate
      aria-busy={isSubmitting}
    >
      <p className="form-hint">
        {ja ? "すべて必須項目です。" : "All fields are required."}
      </p>
      <fieldset disabled={isSubmitting}>
        <legend className="sr-only">
          {ja ? "お問い合わせ内容" : "Inquiry details"}
        </legend>
        <div className="form-row">
          {field("name", c.nameLabel)}
          {field("email", c.emailLabel)}
        </div>
        {field("company", c.companyLabel)}
        {field("brief", c.briefLabel)}
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="button-primary"
        >
          {isSubmitting ? c.submitBusy : c.submitIdle}
        </button>
      </fieldset>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={`form-message ${status === "error" || status === "invalid" ? "error" : ""}`}
      >
        {isSubmitting
          ? c.submitBusy
          : status === "success"
            ? c.success
            : status === "error"
              ? c.error
              : status === "invalid"
                ? ja
                  ? "入力内容をご確認のうえ、もう一度送信してください。"
                  : "Please check your details and submit again."
                : ""}
      </div>
      <p className="form-hint">
        {ja
          ? "入力途中の内容は、このタブのセッション中に保存されます。送信が完了すると削除されます。"
          : "Your unsent draft is kept for this tab’s session and cleared after successful submission."}
      </p>
    </form>
  );
}
export function ContactForm() {
  const { language } = useLanguage();
  return <LocalizedContactForm key={language} locale={language} />;
}
