import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/content";
import { SITE, SUBJECT_ORDER } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE.url}/` },
    { url: `${SITE.url}/pdf/` },
    ...SUBJECT_ORDER.map((s) => ({ url: `${SITE.url}/${s}/` })),
    ...getArticles().map((a) => ({ url: `${SITE.url}/${a.subject}/${a.slug}/`, lastModified: a.updated })),
  ];
}
