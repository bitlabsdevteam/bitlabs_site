import type { Metadata } from "next";
import { ExpertisesContent } from "@/components/page-content/expertises-content";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "BitLabs expertise across enterprise AI architecture, pre-training, fine-tuning, inference engineering, and production AI systems.",
};

export default function ExpertisesPage() {
  return <ExpertisesContent />;
}
