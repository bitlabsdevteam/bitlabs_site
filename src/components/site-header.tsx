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
    <header className="sticky top-0 z-40 border-b border-[color:var(--line)]/80 bg-[color:rgba(6,8,11,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-center justify-between gap-3 px-4 py-4 md:gap-4 md:px-8">
        <Link href="/" aria-label={homeAriaLabel} className="inline-flex items-center">
          <BitLabsLogo />
        </Link>
        <div className="flex w-full flex-col items-stretch gap-3 md:w-auto md:flex-row md:flex-wrap md:items-center md:justify-end">
          <div className="-mx-1 overflow-x-auto pb-1 md:mx-0 md:overflow-visible md:pb-0">
            <nav className="relative flex min-w-max items-center gap-1 rounded-full border border-[color:var(--line)] bg-[color:rgba(18,22,27,0.88)] p-1.5 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
              {localizedNavLinks.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative shrink-0 rounded-full px-3 py-1.5 transition-colors md:px-4 ${
                      active ? "text-[color:var(--ink)]" : "text-[color:var(--muted-ink)] hover:text-[color:var(--ink)]"
                    }`}
                  >
                    {active ? (
                      <motion.span
                        layoutId="active-nav-pill"
                        className="absolute inset-0 -z-10 rounded-full border border-[color:rgba(208,186,150,0.14)] bg-[color:rgba(208,186,150,0.14)]"
                        transition={{ type: "spring", stiffness: 450, damping: 38 }}
                      />
                    ) : null}
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div
            className="flex w-fit items-center gap-1 self-start rounded-full border border-[color:var(--line)] bg-[color:rgba(18,22,27,0.92)] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] md:self-auto"
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
                      ? "bg-[color:var(--accent)] text-[color:var(--graphite)]"
                      : "text-[color:var(--muted-ink)] hover:bg-[color:rgba(208,186,150,0.14)] hover:text-[color:var(--ink)]"
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
