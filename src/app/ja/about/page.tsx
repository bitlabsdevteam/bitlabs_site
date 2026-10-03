import { AboutPage } from "@/components/editorial-pages";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("ja", "about");
export default function Page() {
  return <AboutPage locale="ja" />;
}
