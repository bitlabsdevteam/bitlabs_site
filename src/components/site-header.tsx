"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { BitLabsLogo } from "@/components/bitlabs-logo";
import { useLanguage } from "@/components/language-provider";
import { navLinks } from "@/lib/site-content";

const languageOptions = [
  { value: "en" as const, label: "ENG" },
  { value: "ja" as const, label: "JP" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const localizedNavLinks = navLinks[language];
  const homeAriaLabel = language === "en" ? "BitLabs home" : "BitLabs ホーム";
  const languageMenuLabel = language === "en" ? "Select language" : "言語を選択";

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--line)]/70 bg-[color:var(--surface)]/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link href="/" aria-label={homeAriaLabel} className="inline-flex items-center">
          <BitLabsLogo />
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-3">
          <nav className="relative flex items-center gap-1 rounded-full border border-[color:var(--line)] bg-[color:var(--surface-strong)]/60 p-1.5 text-sm">
            {localizedNavLinks.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-3 py-1.5 transition-colors md:px-4 ${
                    active ? "text-[color:var(--ink)]" : "text-[color:var(--muted-ink)] hover:text-[color:var(--ink)]"
                  }`}
                >
                  {active ? (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-[color:var(--accent-soft)]"
                      transition={{ type: "spring", stiffness: 450, damping: 38 }}
                    />
                  ) : null}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div
            className="flex items-center gap-1 rounded-full border border-[color:var(--line)] bg-[color:var(--surface-strong)]/75 p-1"
            role="group"
            aria-label={languageMenuLabel}
          >
            {languageOptions.map((option) => {
              const active = language === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setLanguage(option.value)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.16em] transition-colors ${
                    active
                      ? "bg-[color:var(--ink)] text-white"
                      : "text-[color:var(--muted-ink)] hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--ink)]"
                  }`}
                  aria-pressed={active}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
