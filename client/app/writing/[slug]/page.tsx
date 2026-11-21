import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { PortableText } from "@/components/PortableText";
import { Tag } from "@/components/Tag";
import { dateFormat } from "@/components/WriteupCard";
import { sanityFetch } from "@/sanity/fetch";
import { writeupBySlugQuery, writeupSlugsQuery } from "@/sanity/queries";

type Params = PageProps<"/writing/[slug]">["params"];

// Cache Components needs ≥1 param at build time; the placeholder 404s.
export async function generateStaticParams() {
  const slugs = await sanityFetch({ query: writeupSlugsQuery, tags: ["writeup"] });
  return slugs.length > 0 ? slugs.map((slug) => ({ slug })) : [{ slug: "__placeholder__" }];
}

const getWriteup = (slug: string) =>
  sanityFetch({ query: writeupBySlugQuery, params: { slug }, tags: ["writeup"] });

export async function generateMetadata({ params }: PageProps<"/writing/[slug]">): Promise<Metadata> {
  const writeup = await getWriteup((await params).slug);
  return writeup ? { title: writeup.title, description: writeup.summary ?? undefined } : { title: "Page not found" };
}

// Synchronous page so the shell renders instantly; slug-dependent content streams in.
export default function WriteupPage({ params }: PageProps<"/writing/[slug]">) {
  return (
    <Suspense fallback={<WriteupFallback />}>
      <WriteupDetails params={params} />
    </Suspense>
  );
}

/** Static placeholder: no shimmer (motion rules), just reserves the header space. */
function WriteupFallback() {
  return (
    <div className="py-16" aria-busy="true" aria-label="Loading write-up">
      <Container width="content">
        <div className="h-4 w-24 rounded bg-surface" />
        <div className="mt-4 h-10 w-2/3 rounded bg-surface" />
      </Container>
    </div>
  );
}

async function WriteupDetails({ params }: { params: Params }) {
  const writeup = await getWriteup((await params).slug);
  if (!writeup) notFound();

  return (
    <article className="py-16 pb-24">
      <Container width="content">
        <header className="mb-12">
          <time dateTime={writeup.publishedAt} className="font-mono text-xs text-muted">
            {dateFormat.format(new Date(writeup.publishedAt))}
          </time>
          <h1 className="mt-3 text-[28px] font-extrabold leading-tight tracking-[-0.02em] sm:text-5xl">{writeup.title}</h1>
          {writeup.summary && <p className="mt-4 text-lg leading-relaxed text-muted">{writeup.summary}</p>}
          {(writeup.tags?.length ?? 0) > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tags">
              {writeup.tags!.map((tag) => (
                <li key={tag}>
                  <Tag>{tag}</Tag>
                </li>
              ))}
            </ul>
          )}
        </header>

        {(writeup.body?.length ?? 0) > 0 && <PortableText value={writeup.body!} />}

        <footer className="mt-16 border-t border-border pt-6 text-sm">
          <Link href="/writing" className="text-muted transition-colors duration-200 hover:text-fg">
            All writing
          </Link>
        </footer>
      </Container>
    </article>
  );
}
