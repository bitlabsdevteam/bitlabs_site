import type { Metadata, Viewport } from "next";
import { LanguageProvider } from "@/components/language-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BitLabs | Tokyo AI Research and Engineering",
    template: "%s | BitLabs",
  },
  description:
    "BitLabs is a Tokyo-based AI research and engineering lab focused on pre-training, fine-tuning, inference stack design, agentic systems, and secure deployment.",
  metadataBase: new URL("https://bitlabs.site"),
  keywords: [
    "BitLabs",
    "AI research lab",
    "LLM pre-training",
    "LLM fine-tuning",
    "SLM development",
    "inference stack design",
    "production AI agents",
    "agentic AI applications",
    "AI agent development",
    "Enterprise AI architecture",
    "Inference engineering",
    "GPU parallelism",
    "AI consulting",
    "AI R&D",
    "proprietary model training",
    "data sovereignty",
    "enterprise AI",
    "Tokyo Japan",
  ],
  openGraph: {
    title: "BitLabs",
    description:
      "Pre-training, fine-tuning, inference engineering, agentic systems, and secure deployment from Tokyo.",
    url: "https://bitlabs.site",
    siteName: "BitLabs",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://bitlabs.site",
  },
};

// Mobile rendering baseline: device-width scaling with zoom left enabled for
// accessibility, and a theme color so iOS Safari / Android Chrome browser
// chrome matches the dark editorial surface.
// Dark-only site: theme color matches the black editorial surface.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Dark-only: the `dark` class is fixed on <html> (no theme switching).
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <body className="flex min-h-screen flex-col bg-[color:var(--paper)] text-[color:var(--ink)] antialiased">
        <LanguageProvider>
          <div className="page-grain" aria-hidden />
          <SiteHeader />
          <main className="relative mx-auto w-full max-w-[1180px] flex-1 px-5 pb-24 pt-14 md:px-8 md:pt-20">{children}</main>
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
