import type { Metadata } from "next";
import {
  editorial,
  localizedPath,
  pagePaths,
  type Locale,
  type PageKey,
} from "./editorial-content";
export function pageMetadata(
  locale: Locale,
  page: PageKey,
  detail?: { title: string; description: string; path: string },
): Metadata {
  const c = editorial[locale];
  const titles: Record<PageKey, string> = {
    home:
      locale === "en"
        ? "AI Research & Engineering in Tokyo"
        : "東京のAI研究開発・エンジニアリング",
    services: c.nav[0],
    research: c.nav[1],
    about: c.nav[2],
    contact: locale === "en" ? "Contact" : "お問い合わせ",
    career: locale === "en" ? "Careers" : "採用情報",
  };
  const descriptions: Record<PageKey, string> = {
    home: c.intro,
    services: c.servicesIntro,
    research: c.researchIntro,
    about: c.aboutIntro,
    contact: c.contactIntro,
    career:
      locale === "en"
        ? "Explore AI engineering and research roles at BitLabs in Tokyo."
        : "東京のBitLabsでAIエンジニア・AIリサーチャーとして働く。",
  };
  const title = detail?.title ?? titles[page];
  const description = detail?.description ?? descriptions[page];
  const path = detail?.path ?? pagePaths[page];
  return {
    metadataBase: new URL("https://bitlabs.site"),
    title,
    description,
    alternates: {
      canonical: localizedPath(locale, path),
      languages: {
        en: localizedPath("en", path),
        ja: localizedPath("ja", path),
        "x-default": path,
      },
    },
    openGraph: {
      title: `${title} | BitLabs`,
      description,
      siteName: "BitLabs",
      locale: locale === "ja" ? "ja_JP" : "en_US",
      alternateLocale: locale === "ja" ? "en_US" : "ja_JP",
      url: localizedPath(locale, path),
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "BitLabs — AI research and engineering, Tokyo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | BitLabs`,
      description,
      images: ["/opengraph-image"],
    },
  };
}
export const baseMetadata: Metadata = {
  metadataBase: new URL("https://bitlabs.site"),
  title: { default: "BitLabs", template: "%s | BitLabs" },
  keywords: [
    "BitLabs",
    "AI consulting",
    "AI R&D",
    "AI agents",
    "LLM fine-tuning",
    "SLM development",
    "enterprise AI",
    "Tokyo Japan",
  ],
};
