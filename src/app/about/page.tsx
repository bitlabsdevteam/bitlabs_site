import type { Metadata } from "next";
import { AboutContent } from "@/components/page-content/about-content";

export const metadata: Metadata = {
  title: "About",
  description: "Company profile for BitLabs, a Tokyo-based AI R&D and engineering company.",
};

export default function AboutPage() {
  return <AboutContent />;
}
