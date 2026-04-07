import type { Metadata } from "next";
import { ContactContent } from "@/components/page-content/contact-content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact BitLabs about AI consulting, research, and enterprise deployment support.",
};

export default function ContactPage() {
  return <ContactContent />;
}
