import { HomePage } from "@/components/editorial-pages";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("en", "home");
export default function Page() {
  return <HomePage locale="en" />;
}
