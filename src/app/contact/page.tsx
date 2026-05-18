import type { Metadata } from "next";
import { ContactContent } from "@/components/page-content/contact-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact BitLabs about enterprise AI architecture, pre-training, fine-tuning, inference stack design, research, and sovereign deployment.",
};

export default function ContactPage() {
  return <ContactContent />;
}
