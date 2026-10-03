import type { MetadataRoute } from "next";
import { localizedPath, pagePaths } from "@/lib/editorial-content";
import { publishedResearch } from "@/lib/research";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...Object.values(pagePaths),
    ...publishedResearch.map((e) => `/research/${e.slug}`),
  ];
  return paths.flatMap((path) =>
    (["en", "ja"] as const).map((locale) => ({
      url: `https://bitlabs.site${localizedPath(locale, path)}`,
      alternates: {
        languages: {
          en: `https://bitlabs.site${path}`,
          ja: `https://bitlabs.site${localizedPath("ja", path)}`,
        },
      },
    })),
  );
}
