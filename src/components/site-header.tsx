"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { BitLabsLogo } from "@/components/bitlabs-logo";
import { useLanguage } from "@/components/language-provider";
import { navLinks } from "@/lib/site-content";

const languageOptions = [
  { value: "en" as const, label: "ENG" },
  { value: "ja" as const, label: "JP" },
];

function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage } = useLanguage();
  const languageMenuLabel = language === "en" ? "Select language" : "言語を選択";

  return (
    <div
      className="flex w-fit items-center gap-1 rounded-full border border-[color:var(--line)] bg-[color:rgba(18,22,27,0.92)] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
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
            className={`rounded-full px-3 ${compact ? "py-2" : "py-1.5"} text-xs font-semibold tracking-[0.16em] transition-colors ${
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
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          <line x1="4" y1="4" x2="16" y2="16" />
          <line x1="16" y1="4" x2="4" y2="16" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="17" y2="6" />
          <line x1="3" y1="10" x2="17" y2="10" />
          <line x1="3" y1="14" x2="17" y2="14" />
        </>
      )}
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const localizedNavLinks = navLinks[language];
  const homeAriaLabel = language === "en" ? "BitLabs home" : "BitLabs ホーム";

  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const mobileNavId = useId();

  const openLabel = language === "en" ? "Open menu" : "メニューを開く";
  const closeLabel = language === "en" ? "Close menu" : "メニューを閉じる";
  // The menu is dismissed via each link's onClick, the backdrop, and Escape.

  // Escape closes the menu and returns focus to the toggle button.
  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--line)]/80 bg-[color:rgba(6,8,11,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between gap-3 px-4 py-4 md:gap-4 md:px-8">
        <Link href="/" aria-label={homeAriaLabel} className="inline-flex items-center">
          <BitLabsLogo />
        </Link>

        {/* Desktop: horizontal pill nav + language toggle */}
        <div className="hidden items-center gap-4 md:flex md:flex-wrap md:justify-end">
          <nav className="relative flex items-center gap-1 rounded-full border border-[color:var(--line)] bg-[color:rgba(18,22,27,0.88)] p-1.5 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
            {localizedNavLinks.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative shrink-0 rounded-full px-4 py-1.5 transition-colors ${
                    active
                      ? "text-[color:var(--ink)]"
                      : "text-[color:var(--muted-ink)] hover:text-[color:var(--ink)]"
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
          <LanguageToggle />
        </div>

        {/* Mobile: language toggle + hamburger disclosure button */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle compact />
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-controls={mobileNavId}
            aria-label={menuOpen ? closeLabel : openLabel}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:rgba(18,22,27,0.92)] text-[color:var(--ink)] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-colors hover:bg-[color:rgba(208,186,150,0.14)]"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {/* Mobile disclosure panel: vertical, full-width tap targets */}
      <AnimatePresence>
        {menuOpen ? (
          <>
            {/* Backdrop closes the menu on outside tap. */}
            <motion.button
              type="button"
              aria-hidden="true"
              tabIndex={-1}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-30 cursor-default bg-[color:rgba(3,4,5,0.4)] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.18 }}
            />
            <motion.nav
              id={mobileNavId}
              className="relative z-40 border-t border-[color:var(--line)] bg-[color:rgba(6,8,11,0.96)] px-4 pb-4 pt-2 backdrop-blur-xl md:hidden"
              initial={reduceMotion ? false : { opacity: 0, height: 0 }}
              animate={reduceMotion ? {} : { opacity: 1, height: "auto" }}
              exit={reduceMotion ? {} : { opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}
            >
              <ul className="flex flex-col gap-1">
                {localizedNavLinks.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setMenuOpen(false)}
                        className={`flex min-h-[48px] items-center rounded-xl border px-4 text-base transition-colors ${
                          active
                            ? "border-[color:rgba(208,186,150,0.24)] bg-[color:rgba(208,186,150,0.12)] text-[color:var(--ink)]"
                            : "border-transparent text-[color:var(--muted-ink)] hover:bg-[color:rgba(255,255,255,0.04)] hover:text-[color:var(--ink)]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
