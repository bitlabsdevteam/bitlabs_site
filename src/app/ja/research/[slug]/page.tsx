import { notFound } from "next/navigation";
import { ResearchDetail } from "@/components/editorial-pages";
import { publishedResearch } from "@/lib/research";
import { pageMetadata } from "@/lib/metadata";
export const dynamicParams = false;
export function generateStaticParams() {
  return publishedResearch.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = publishedResearch.find((e) => e.slug === slug);
  if (!entry) notFound();
  const c = entry.content.ja;
  return pageMetadata("ja", "research", {
    title: c.title,
    description: c.summary,
    path: `/research/${slug}`,
  });
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = publishedResearch.find((e) => e.slug === slug);
  if (!entry) notFound();
  return <ResearchDetail locale="ja" entry={entry} />;
}
