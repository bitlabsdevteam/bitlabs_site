import type { Metadata } from "next";
import { AboutContent } from "@/components/page-content/about-content";

export const metadata: Metadata = {
  title: "About & Contact",
  description:
    "Company profile and contact for BitLabs, a Tokyo-based AI research and engineering lab. Get in touch about model training, inference, and AI agents.",
};

export default function AboutPage() {
  return <AboutContent />;
}
