import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "./env";

/** Read-only, public client. Server-side only; caching is handled by Next ('use cache'). */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

/**
 * LOCAL design preview only: reads unpublished drafts when SANITY_PREVIEW_DRAFTS=true and a
 * viewer token is set (server-only env, never NEXT_PUBLIC). Null otherwise, so production
 * keeps reading published content.
 */
const readToken = process.env.SANITY_READ_TOKEN;
export const draftsClient =
  process.env.SANITY_PREVIEW_DRAFTS === "true" && readToken
    ? createClient({ projectId, dataset, apiVersion, useCdn: false, token: readToken, perspective: "drafts" })
    : null;
