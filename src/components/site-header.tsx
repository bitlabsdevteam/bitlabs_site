"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/site-content";
import { motion } from "framer-motion";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--line)]/70 bg-[color:var(--surface)]/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link href="/" className="inline-flex items-center gap-2 font-serif text-[1.36rem] tracking-[-0.03em] text-[color:var(--ink)]">
          <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--accent)]" aria-hidden />
          BitLabs
        </Link>
        <nav className="relative flex items-center gap-1 rounded-full border border-[color:var(--line)] bg-[color:var(--surface-strong)]/60 p-1.5 text-sm">
          {navLinks.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-3 py-1.5 transition-colors md:px-4 ${active ? "text-[color:var(--ink)]" : "text-[color:var(--muted-ink)] hover:text-[color:var(--ink)]"}`}
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
      </div>
    </header>
  );
}
