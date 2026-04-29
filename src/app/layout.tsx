import type { Metadata } from "next";
import { LanguageProvider } from "@/components/language-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BitLabs | Deep AI and LLM Systems",
    template: "%s | BitLabs",
  },
  description:
    "BitLabs is a Tokyo-based AI R&D and engineering company building deep AI, LLM systems, production AI agents, inference systems, and secure enterprise AI deployments.",
  metadataBase: new URL("https://bitlabs.site"),
  keywords: [
    "BitLabs",
    "Deep AI",
    "LLM development",
    "LLM integration",
    "Production AI agents",
    "Agentic AI applications",
    "AI agent development",
    "Inference engineering",
    "GPU parallelism",
    "AI consulting",
    "AI R&D",
    "LLM fine-tuning",
    "SLM development",
    "enterprise AI",
    "Tokyo Japan",
  ],
  openGraph: {
    title: "BitLabs",
    description: "Production AI agents, inference engineering, and secure enterprise AI deployment.",
    url: "https://bitlabs.site",
    siteName: "BitLabs",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://bitlabs.site",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
