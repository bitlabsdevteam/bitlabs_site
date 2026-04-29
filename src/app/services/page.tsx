import type { Metadata } from "next";
import { ServicesContent } from "@/components/page-content/services-content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "BitLabs services for production AI agents, MVP development, enterprise AI architecture, model adaptation, and secure deployment.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
