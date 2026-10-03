import { ServicesPage } from "@/components/editorial-pages";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("en", "services");
export default function Page() {
  return <ServicesPage locale="en" />;
}
