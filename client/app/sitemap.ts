import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/fetch";
import { sitemapQuery } from "@/sanity/queries";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { projects, writeups } = await sanityFetch({ query: sitemapQuery, tags: ["projects", "writeup"] });

  const pages = ["", "/projects", "/writing"].map((path) => ({ url: `${siteUrl}${path}` }));
  const docs = [
    ...projects.map((p) => ({ url: `${siteUrl}/projects/${p.slug}`, lastModified: p._updatedAt })),
    ...writeups.map((w) => ({ url: `${siteUrl}/writing/${w.slug}`, lastModified: w._updatedAt })),
  ];
  return [...pages, ...docs];
}
