import { ResearchPage } from "@/components/editorial-pages";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("en", "research");
export default function Page() {
  return <ResearchPage locale="en" />;
}
