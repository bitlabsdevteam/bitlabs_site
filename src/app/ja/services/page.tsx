import { ServicesPage } from "@/components/editorial-pages";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("ja", "services");
export default function Page() {
  return <ServicesPage locale="ja" />;
}
