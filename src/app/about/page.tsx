import type { Metadata } from "next";
import { AboutContent } from "@/components/page-content/about-content";

export const metadata: Metadata = {
  title: "About",
  description: "Company profile, mission, and operating principles for BitLabs.",
};

export default function AboutPage() {
  return <AboutContent />;
}
