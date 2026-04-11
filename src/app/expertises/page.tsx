import type { Metadata } from "next";
import { ExpertisesContent } from "@/components/page-content/expertises-content";

export const metadata: Metadata = {
  title: "Expertises",
  description:
    "BitLabs expertise in solving sophisticated business problems with AI and designing 5D-parallel model systems.",
};

export default function ExpertisesPage() {
  return <ExpertisesContent />;
}
