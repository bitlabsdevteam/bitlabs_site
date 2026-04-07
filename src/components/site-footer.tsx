"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { footerContent } from "@/lib/site-content";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-current">
        <path d="M4.98 3.5a2.5 2.5 0 1 0 .02 5 2.5 2.5 0 0 0-.02-5ZM3 9h4v12H3V9Zm7 0h3.84v1.71h.06c.53-1 1.83-2.06 3.77-2.06C21.7 8.65 23 11.1 23 14.23V21h-4v-5.99c0-1.43-.03-3.26-1.99-3.26-2 0-2.31 1.55-2.31 3.16V21h-4V9Z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-current">
        <path d="M18.24 2H21l-6.6 7.54L22 22h-5.95l-4.66-6.1L6.05 22H3.3l7.05-8.06L2 2h6.1l4.2 5.55L18.24 2Zm-1.03 18h1.8L7.12 3.9H5.2L17.2 20Z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-current">
        <path d="M12 .5A12 12 0 0 0 8.2 23.9c.6.1.82-.26.82-.58v-2.04c-3.34.73-4.04-1.62-4.04-1.62-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.84 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.66-.31-5.46-1.34-5.46-5.95 0-1.31.47-2.39 1.23-3.24-.12-.31-.53-1.56.12-3.26 0 0 1-.32 3.3 1.24a11.46 11.46 0 0 1 6 0c2.3-1.56 3.3-1.24 3.3-1.24.65 1.7.24 2.95.12 3.26.77.85 1.23 1.93 1.23 3.24 0 4.63-2.8 5.64-5.48 5.94.43.37.82 1.1.82 2.22v3.3c0 .32.21.7.83.58A12 12 0 0 0 12 .5Z" />
      </svg>
    ),
  },
];

export function SiteFooter() {
  const { language } = useLanguage();
  const copy = footerContent[language];

  return (
    <footer className="mt-24 border-t border-[color:var(--line)] bg-[color:var(--surface)]/85">
      <div className="mx-auto grid w-full max-w-[1180px] gap-7 px-5 py-12 text-sm text-[color:var(--muted-ink)] md:grid-cols-[1fr_auto] md:items-end md:px-8">
        <div className="space-y-3">
          <p className="font-serif text-2xl tracking-[-0.03em] text-[color:var(--ink)]">BitLabs</p>
          <p className="max-w-xl leading-7">{copy.summary}</p>
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={copy.socialAriaLabel(social.name)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:var(--surface-strong)] text-[color:var(--muted-ink)] transition-colors hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--ink)]"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
        <div className="space-y-2 md:text-right">
          <p>{copy.location}</p>
          <p>{copy.email}</p>
          <p>
            {new Date().getFullYear()} BitLabs. {copy.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
