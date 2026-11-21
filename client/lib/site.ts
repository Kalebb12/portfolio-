// Public origin for absolute URLs (sitemap, robots, metadataBase).
// Set NEXT_PUBLIC_SITE_URL in production; Vercel's production domain is the fallback.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");
