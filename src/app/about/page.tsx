import type { Metadata } from "next";
import { AboutContent } from "@/components/page-content/about-content";

export const metadata: Metadata = {
  title: "About",
  description: "Company profile for BitLabs, a Tokyo-based AI research and engineering lab.",
};

export default function AboutPage() {
  return <AboutContent />;
}
