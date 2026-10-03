import { ContactPage } from "@/components/editorial-pages";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("ja", "contact");
export default function Page() {
  return <ContactPage locale="ja" />;
}
