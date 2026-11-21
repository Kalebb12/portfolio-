import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { PortableText } from "@/components/PortableText";
import { SanityImage } from "@/components/SanityImage";
import { Tag } from "@/components/Tag";
import { sanityFetch } from "@/sanity/fetch";
import { projectBySlugQuery, projectSlugsQuery } from "@/sanity/queries";

// Cache Components needs ≥1 param at build time; the placeholder 404s.
export async function generateStaticParams() {
  const slugs = await sanityFetch({ query: projectSlugsQuery, tags: ["projects"] });
  return slugs.length > 0 ? slugs.map((slug) => ({ slug })) : [{ slug: "__placeholder__" }];
}

const getProject = (slug: string) =>
  sanityFetch({ query: projectBySlugQuery, params: { slug }, tags: ["projects"] });

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = await getProject((await params).slug);
  return project ? { title: project.title, description: project.des } : { title: "Page not found" };
}

// The page itself stays synchronous so the shell (header, footer, fallback)
// renders instantly on navigation; the slug-dependent part streams in.
export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  return (
    <Suspense fallback={<ProjectFallback />}>
      <ProjectDetails params={params} />
    </Suspense>
  );
}

/** Static placeholder: no shimmer (motion rules), just reserves the header space. */
function ProjectFallback() {
  return (
    <div className="py-16" aria-busy="true" aria-label="Loading project">
      <Container width="content">
        <div className="h-10 w-2/3 rounded bg-surface" />
        <div className="mt-4 h-6 w-full rounded bg-surface" />
      </Container>
    </div>
  );
}

async function ProjectDetails({ params }: { params: PageProps<"/projects/[slug]">["params"] }) {
  const project = await getProject((await params).slug);
  if (!project) notFound();

  const meta = [project.role, project.event, project.year?.toString()].filter(Boolean);
  const links = [
    { href: project.preview_url, label: "Live site" },
    { href: project.github_url, label: "Source" },
    { href: project.video_url, label: "Demo video" },
  ].filter((l): l is { href: string; label: string } => Boolean(l.href));

  return (
    <article className="py-16 pb-24">
      <Container width="content">
        <header>
          <h1 className="text-[28px] font-extrabold leading-tight tracking-[-0.02em] sm:text-5xl">{project.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{project.des}</p>
          {meta.length > 0 && (
            <p className="mt-4 font-mono text-xs text-muted">{meta.join(" · ")}</p>
          )}
          {links.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-fg inline-flex h-10 items-center rounded-sm border border-fg px-4 font-semibold transition-colors duration-200 hover:bg-fg hover:text-bg">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </header>
      </Container>

      <Container className="my-12">
        <SanityImage
          image={project.img}
          sizes="(min-width: 1100px) 1052px, 100vw"
          className="w-full rounded-[18px] border-2 border-fg"
          eager
        />
      </Container>

      <Container width="content" className="space-y-10">
        {(project.stack?.length ?? 0) > 0 && (
          <section aria-labelledby="stack-heading">
            <h2 id="stack-heading" className="mb-3 text-sm font-medium text-muted">Stack</h2>
            <ul className="flex flex-wrap gap-2">
              {project.stack!.map((item) => (
                <li key={item}><Tag>{item}</Tag></li>
              ))}
            </ul>
          </section>
        )}
        {(project.highlights?.length ?? 0) > 0 && (
          <section aria-labelledby="highlights-heading">
            <h2 id="highlights-heading" className="mb-3 text-xl font-extrabold">Highlights</h2>
            <ul className="list-disc space-y-2 pl-5 leading-relaxed text-muted marker:text-fg">
              {project.highlights!.map((h) => <li key={h}>{h}</li>)}
            </ul>
          </section>
        )}
        {(project.body?.length ?? 0) > 0 && <PortableText value={project.body!} />}
      </Container>
    </article>
  );
}
