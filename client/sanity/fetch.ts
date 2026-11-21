import type { QueryParams } from "@sanity/client";
import { cacheLife, cacheTag } from "next/cache";
import { client, draftsClient } from "./client";

/** Cache tags = Sanity document types. The revalidate webhook sends `_type`. */
export const CONTENT_TAGS = ["projects", "writeup", "profile", "socialLinks", "hackathon", "experience"] as const;
export type ContentTag = (typeof CONTENT_TAGS)[number];

type Options<Q extends string> = {
  query: Q;
  params?: QueryParams;
  tags: ContentTag[];
  /** Read drafts when the local preview flag is on (see draftsClient). Ignored otherwise. */
  drafts?: boolean;
};

/**
 * Cached GROQ fetch. Result type comes from TypeGen via the query string.
 * Cached for days; publishing in Sanity revalidates by tag (see /api/revalidate).
 */
export async function sanityFetch<const Q extends string>({ query, params = {}, tags, drafts }: Options<Q>) {
  "use cache";
  const reader = drafts && draftsClient ? draftsClient : client;
  if (reader === client) cacheLife("days");
  else cacheLife("minutes"); // draft preview: refresh often ("seconds" would make the page dynamic)
  cacheTag(...tags);
  return reader.fetch(query, params);
}
