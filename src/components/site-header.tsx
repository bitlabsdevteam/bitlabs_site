"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BitLabsLogo } from "./bitlabs-logo";
import { useLanguage } from "./language-provider";
import { editorial, localizedPath } from "@/lib/editorial-content";
export function SiteHeader() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const copy = editorial[language];
  const path = pathname.replace(/^\/ja(?=\/|$)/, "") || "/";
  useEffect(() => {
    function key(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    }
    if (open) document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [open]);
  function links() {
    return ["/services", "/research", "/about", "/contact"].map((href, i) => (
      <Link
        key={href}
        href={localizedPath(language, href)}
        className={i === 3 ? "nav-cta" : ""}
        aria-current={
          path === href || path.startsWith(href + "/") ? "page" : undefined
        }
        onClick={() => setOpen(false)}
      >
        {copy.nav[i]}
      </Link>
    ));
  }
  return (
    <header className="site-header">
      <div className="header-inner shell">
        <Link
          href={localizedPath(language)}
          aria-label={language === "en" ? "BitLabs home" : "BitLabs ホーム"}
        >
          <BitLabsLogo />
        </Link>
        <nav
          className="desktop-nav"
          aria-label={language === "en" ? "Primary" : "メイン"}
        >
          {links()}
        </nav>
        <nav
          className="language-nav"
          aria-label={language === "en" ? "Language" : "言語"}
        >
          {(["en", "ja"] as const).map((locale) => (
            <a
              key={locale}
              href={localizedPath(locale, path)}
              hrefLang={locale}
              lang={locale}
              aria-current={language === locale ? "page" : undefined}
              onClick={(event) => {
                if (window.location.hash)
                  event.currentTarget.href =
                    localizedPath(locale, path) + window.location.hash;
                setOpen(false);
              }}
            >
              {locale === "en" ? "EN" : "日本語"}
            </a>
          ))}
        </nav>
        <button
          ref={button}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={
            language === "en"
              ? open
                ? "Close menu"
                : "Open menu"
              : open
                ? "メニューを閉じる"
                : "メニューを開く"
          }
          onClick={() => setOpen(!open)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            {open ? (
              <path d="m5 5 12 12M17 5 5 17" />
            ) : (
              <path d="M3 7h16M3 15h16" />
            )}
          </svg>
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav shell"
        hidden={!open}
        aria-label={language === "en" ? "Mobile primary" : "モバイルメイン"}
      >
        {links()}
      </nav>
    </header>
  );
}
