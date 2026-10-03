import { HomePage } from "@/components/editorial-pages";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("ja", "home");
export default function Page() {
  return <HomePage locale="ja" />;
}
