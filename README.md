# Caleb John — Portfolio

Personal portfolio: a Next.js site with content managed in Sanity.

## Layout

- `client/`: the site. Next.js 16 (App Router, TypeScript, Tailwind v4, Cache Components).
- `studio/`: Sanity Studio v5. Schemas live in `studio/schemaTypes`.
- `CLAUDE.md`: project conventions, content model and design rules.

## Getting started

```bash
# Site
cd client
cp .env.example .env.local   # fill in the Sanity project ID/dataset etc.
npm install
npm run dev                  # http://localhost:3000

# Studio
cd studio
cp .env.example .env.local
npm install
npm run dev                  # http://localhost:3333
```

Regenerate TypeScript types after a schema change: `cd studio && npm run typegen` (writes `client/sanity/types.ts`).

## Environment (client)

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` | Sanity project to read from |
| `SANITY_REVALIDATE_SECRET` | Bearer secret for the Sanity publish webhook (`/api/revalidate`) |
| `NEXT_PUBLIC_SITE_URL` | Public origin for the sitemap and robots.txt |
| `FORMSPREE_ENDPOINT` | Formspree URL for the contact form (no form without it) |
| `SANITY_READ_TOKEN`, `SANITY_PREVIEW_DRAFTS` | **Local only.** Show unpublished drafts in the home timeline. Never set in production. |

## Deploying

Deploy `client/` as a Next.js app (set the hosting project's root directory to `client`) with the environment variables above, minus the local-only ones.
