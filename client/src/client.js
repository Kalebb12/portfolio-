import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "x5hb03j1",
  dataset: "production",
  useCdn: false,
  apiVersion: "2026-01-01",
});
