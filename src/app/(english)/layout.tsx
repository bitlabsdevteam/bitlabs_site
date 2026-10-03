import { SiteLayout } from "@/components/site-layout";
import { baseMetadata } from "@/lib/metadata";
export const metadata = baseMetadata;
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#181a19",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteLayout locale="en">{children}</SiteLayout>;
}
