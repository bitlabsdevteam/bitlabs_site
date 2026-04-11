import type { Metadata } from "next";
import { AboutContent } from "@/components/page-content/about-content";

export const metadata: Metadata = {
  title: "About",
  description: "Company profile and registration details for BitLabs.",
};

export default function AboutPage() {
  return <AboutContent />;
}
