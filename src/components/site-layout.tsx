import { IBM_Plex_Sans, Noto_Sans_JP } from "next/font/google";
import { LanguageProvider } from "./language-provider";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import type { Locale } from "@/lib/editorial-content";
import "@/app/globals.css";
const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});
const noto = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-noto",
  display: "swap",
  preload: false,
});
export function SiteLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  return (
    <html lang={locale} className={`dark ${plex.variable} ${noto.variable}`}>
      <body>
        <LanguageProvider language={locale}>
          <a className="skip-link" href="#main-content">
            {locale === "en" ? "Skip to content" : "本文へ移動"}
          </a>
          <SiteHeader />
          <main id="main-content" className="shell" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter locale={locale} />
        </LanguageProvider>
      </body>
    </html>
  );
}
