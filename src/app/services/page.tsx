import type { Metadata } from "next";
import { ServicesContent } from "@/components/page-content/services-content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "BitLabs services for agentic systems, enterprise AI architecture, pre-training, fine-tuning, inference stack design, and secure deployment.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
