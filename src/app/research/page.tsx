import type { Metadata } from "next";
import { ResearchContent } from "@/components/page-content/research-content";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research areas at BitLabs across pre-training, fine-tuning, inference engineering, data sovereignty, evaluation, and reliability for agentic systems.",
};

export default function ResearchPage() {
  return <ResearchContent />;
}
