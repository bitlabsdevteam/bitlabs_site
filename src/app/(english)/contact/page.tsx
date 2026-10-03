import { ContactPage } from "@/components/editorial-pages";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("en", "contact");
export default function Page() {
  return <ContactPage locale="en" />;
}
