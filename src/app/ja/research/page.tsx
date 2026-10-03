import { ResearchPage } from "@/components/editorial-pages";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("ja", "research");
export default function Page() {
  return <ResearchPage locale="ja" />;
}
