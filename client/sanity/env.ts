function required(name: string, value: string | undefined): string {
  if (!value) throw new Error(`Missing env var ${name}. Copy .env.example to .env.local.`);
  return value;
}

// NEXT_PUBLIC_* must be read with literal property access so Next can inline them.
export const projectId = required(
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
);
export const dataset = required("NEXT_PUBLIC_SANITY_DATASET", process.env.NEXT_PUBLIC_SANITY_DATASET);

// Pinned date: bump deliberately, never compute it.
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-02-06";
