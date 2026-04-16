import type { Metadata } from "next";
import { ContactContent } from "@/components/page-content/contact-content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact BitLabs about AI agents, model customization, research, and enterprise deployment.",
};

export default function ContactPage() {
  return <ContactContent />;
}
