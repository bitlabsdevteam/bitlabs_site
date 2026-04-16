import type { Metadata } from "next";
import { ExpertisesContent } from "@/components/page-content/expertises-content";

export const metadata: Metadata = {
  title: "Expertises",
  description:
    "BitLabs expertise across AI system design, agent architecture, and 5D-parallel model systems.",
};

export default function ExpertisesPage() {
  return <ExpertisesContent />;
}
