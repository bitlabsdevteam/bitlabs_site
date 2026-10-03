import { CareerPage } from "@/components/editorial-pages";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("en", "career");
export default function Page() {
  return <CareerPage locale="en" />;
}
