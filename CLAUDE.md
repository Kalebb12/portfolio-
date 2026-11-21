# CLAUDE.md — Caleb John Portfolio

## Who this is for
Personal portfolio of Caleb John: Year 3 Mathematics, University of Lagos (grad 2028), CGPA 4.21/5.
Self-taught fullstack developer. Target: **Summer 2027 web dev / software engineering internships.**
Positioning: *a web developer who ships production systems, with a mathematician's rigour.*
- **The site is about web dev.** Shipped products, frontend craft, APIs, integrations, system design, performance, teamwork. Hero, featured work and copy all lead with this.
- **ML and quant are side skills, kept low-key.** Mention them briefly (e.g. a line in the about section, a category filter, the odd write-up) as *applying my maths*, never as the headline or a dedicated section.
- Tone: an engineer's portfolio, not a researcher's. Concrete, technical, no buzzwords.

## Working style (follow strictly)
- Short code, small steps. One component or one change per step.
- After each change, explain in 2–3 lines what the code does and why.
- Propose a plan before multi-file changes; wait for approval.
- Be blunt. If a request is a bad design/engineering decision, say so and suggest the better option.
- Never invent project facts, metrics, links or results. If content is missing, leave a clear `TODO` and tell me.
- Check installed package versions in `package.json` before using an API. Don't add dependencies without asking.

## Repo layout
> Verify with `ls` before assuming.
- `client/` — Next.js 16 (App Router, TypeScript, Tailwind v4, `cacheComponents` on). Read `client/AGENTS.md` and the bundled docs in `client/node_modules/next/dist/docs/` before using Next APIs.
- `studio/` — Sanity Studio v5 (schemas in `studio/schemaTypes`).
- Types: run `npm run typegen` in `studio/` → writes `client/sanity/types.ts`.

## Content: Sanity is the source of truth
- **Projects are hosted in Sanity (Content Lake) and entered by me in the live Studio.** Don't seed, migrate, edit, reorder or delete content. Build the frontend to render whatever is published, and handle empty states gracefully.
- Existing schemas and documents are the source of truth. Only *propose* schema changes; never rename or delete fields that existing documents use.
- Connection details come from env vars (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, optional `NEXT_PUBLIC_SANITY_API_VERSION`; Studio uses `SANITY_STUDIO_*`). Never hardcode them. Never commit tokens. If the site's URL isn't in the Sanity project's CORS origins, tell me.
- **All project, write-up and profile content comes from Sanity.** Never hardcode project data in components.
- Fetch with GROQ through the existing client in `client/sanity/client.ts`. Queries use `defineQuery` (from `groq`) so TypeGen types them.
- Cache content with `'use cache'` + `cacheTag`, revalidated on publish. Don't fetch on the client.
- Images via `urlFor` (`client/sanity/image.ts`) + `next/image`, with explicit `sizes`.
- Schema changes go in `studio/` and must stay backward compatible with existing documents.

### Schemas (as implemented)
**projects** (document type name is `projects`)
- `title`, `slug`, `des` (summary, ≤ 160 chars warning), `category`: `quant` | `product` | `security` | `ml`
- `featured` (boolean), `order` (number): featured projects sort by `order`
- `role`, `event` (optional), `year`, `stack` (string array), `highlights` (string array)
- `github_url`, `preview_url`, `video_url` (all optional)
- `img` (image with `alt`), `body` (`blockContent`: text, images with alt, code blocks)

**writeup** (technical notes, mostly web/engineering; occasional ML or applied maths)
- `title`, `slug`, `publishedAt`, `summary`, `tags`, `body` (`blockContent`; LaTeX written inline as `$...$`)

**profile** (singleton, `_id: "profile"`)
- `name`, `headline`, `bio`, `stack` (string array, About section), `cv` (file). Social links come from `socialLinks` documents.

**hackathon**
- `project`, `event`, `date` ("YYYY" or "YYYY-MM" string), `role`, `summary`, `stack`, `result`, `link`, `featured` (featured hackathons get a stacking card; the rest go in the compact list)

**experience**
- `title`, `organization`, `type` (Full-time | Part-time | Internship | Freelance | Education), `startDate`, `endDate` (empty = Present; same date format), `summary`, `tags`

Hackathon and experience documents were seeded (2026-11-21, on request) as **unpublished drafts** with `TODO` placeholders. A document-level validation rule blocks publishing any of them while a `TODO` remains.
Local draft preview: with `SANITY_PREVIEW_DRAFTS=true` + a viewer `SANITY_READ_TOKEN` in `client/.env.local`, the home timeline reads drafts (`draftsClient`, `sanityFetch({ drafts: true })`) and hides TODO fields. Never set these in production.

**socialLinks**
- `title`, `url`, `icon`

### Do NOT include
Ideas, applications or unbuilt plans. No interview/screening claims (e.g. "passed Optiver screen").

## Pages
- `/`, in this order: nav; hero (name as a poster: first name solid, surname outlined; the Sanity headline after a short ink rule; "View projects" + "Contact" buttons; illustration); "My Projects" (ink band, the 4 best = featured by `order`, max 4); "Hackathons & Experience" (`Timeline`: pinned heading + CSS-sticky stacking cards for all experience and featured hackathons, newest first, fixed card height per breakpoint so stacked cards never peek; non-featured hackathons in a compact "More hackathons" list; hidden while nothing is published) and About (bio + `profile.stack`) share ONE section: on desktop the About illustration (`profile.png`) + hackathon/role counts stay pinned in a left column while the cards stack on the right, then scroll away with the end of About; on mobile the illustration sits above About; contact CTA (`ContactForm`, the old site's form, posts to Formspree via the `FORMSPREE_ENDPOINT` env var; without it only social links render); footer.
- `/projects`: all projects, filter by category
- `/projects/[slug]`: case study
- `/writing` + `/writing/[slug]`: technical write-ups
- `/cv`: link/download

## Design system
- Theme: the previous portfolio's design (the old Vite `client/`, removed from this repo but in git history before the Next.js move), **light only**: no dark mode, no theme toggle (removed on request, because OS dark mode inverted the white/black section rhythm). Tokens live in `globals.css`; never hardcode colours in components.
  - Palette: bg `#ffffff`, surface `#f4f4f5` (zinc-100), border `#e4e4e7`, ink `#000000`, muted `#71717a` (zinc-500), `ink-soft` `#404040` (hover on ink buttons/links).
  - Page rhythm: white page; black bands (`bg-fg text-bg`) only for the home "My Projects" section and the footer, with `text-muted-inverse` (`#a1a1aa`; zinc-500 fails AA on black) for secondary text.
- Headings: `SectionHeading` ("My **Projects**": light lead word + extra-bold key word). `.text-outline` (outline scales with font size) for the outlined surname in the hero.
- Buttons: ink fill or ink outline, `rounded-sm`, swap fill on hover. Social links: square bordered icon buttons (`SocialLinks`, inline SVGs, no icon library).
- Illustrations: `public/hero.png` (hero) and `public/profile.png` (pinned beside experience + about), black on transparent.
- Fonts: Sora (text, via `next/font/google`), Geist Mono (numbers, code, tags).
- Width: 720px max for prose, 1100px max for grids.
- Spacing generous; whitespace over decoration.
- Show, don't tell: product screenshots, short demo clips, architecture diagrams, code snippets; charts where the work is quantitative.
- Motion (all CSS, in `globals.css`; everything is skipped under `prefers-reduced-motion`):
  - `.hero-in`: staggered fade-up of the hero on load (600ms, `--d` delay).
  - `.hero-float` (`HeroDecor`): ~10 dev icons / design marks (code, braces, terminal, git branch, cursor, pen tool, hash, dot grid, squiggle, ring) drifting ±10px on 8–12s loops. `aria-hidden`, behind content, per-breakpoint positions kept clear of the name, tagline and buttons (4 on mobile, 7 tablet, 10 desktop).
  - `.reveal`: scroll-driven fade + rise (`animation-timeline: view()`), no-op where unsupported. Never on sticky elements (stacking cards, pinned headings/illustration).
  - Hover: colour/fill swaps only.
- **Banned:** gradients, glassmorphism (one exception, on request: the sticky header is calm frosted glass, `bg-bg/75` + `backdrop-blur-xl`; keep it ≥ 75% opaque so ink text stays readable over the black band), gradient blobs, emoji, skill bars/percentages, stock photos, generic "passionate developer" copy, testimonials (the old site's were fabricated).

## Quality bar
- Mobile-first; test at 375px. Must be fast on a slow Nigerian 3G/4G connection.
- Lighthouse ≥ 95 performance and accessibility on the home page.
- Semantic HTML, alt text from Sanity, visible focus states, keyboard navigable.
- `npm run build` and lint must pass before saying a step is done.

- After any UI change, use the Playwright MCP to open http://localhost:3000,
  screenshot at 375px and 1280px widths, and check the result against the
  design rules before saying it's done.
