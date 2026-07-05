import type { Metadata } from "next";
import { CareerContent } from "@/components/page-content/career-content";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "BitLabs is expanding its Tokyo AI lab. We're hiring AI Engineers and AI Researchers who are passionate about building and training production AI systems.",
};

export default function CareerPage() {
  return <CareerContent />;
}
