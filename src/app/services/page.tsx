import type { Metadata } from "next";
import { ServicesContent } from "@/components/page-content/services-content";

export const metadata: Metadata = {
  title: "Services",
  description: "BitLabs services across AI agents, enterprise AI architecture, model training, and secure deployment.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
