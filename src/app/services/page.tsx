import type { Metadata } from "next";
import { ServicesContent } from "@/components/page-content/services-content";

export const metadata: Metadata = {
  title: "Services",
  description: "BitLabs services across AI agents, AI consulting for SMEs, model training, and secure cloud deployment.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
