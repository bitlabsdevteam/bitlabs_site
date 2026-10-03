import Link from "next/link";
import { editorial, localizedPath, type Locale } from "@/lib/editorial-content";
import { BitLabsLogo } from "./bitlabs-logo";
export function SiteFooter({ locale }: { locale: Locale }) {
  const c = editorial[locale];
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <div>
            <Link href={localizedPath(locale)} aria-label="BitLabs">
              <BitLabsLogo />
            </Link>
            <p>{c.footer}</p>
          </div>
          <nav aria-label={locale === "en" ? "Footer" : "フッター"}>
            {["/services", "/research", "/about", "/contact", "/career"].map(
              (p, i) => (
                <Link key={p} href={localizedPath(locale, p)}>
                  {i === 4
                    ? locale === "en"
                      ? "Careers"
                      : "採用情報"
                    : c.nav[i]}
                </Link>
              ),
            )}
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Bit Labs株式会社</span>
          <a href="mailto:david@bitlabs.site">david@bitlabs.site</a>
          <span>Tokyo, Japan</span>
        </div>
      </div>
    </footer>
  );
}
