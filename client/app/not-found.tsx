import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section aria-labelledby="nf-heading" className="py-24 pb-32">
      <Container width="content">
        <p className="inline-block rounded-sm bg-fg px-1.5 font-mono text-sm text-bg">404</p>
        <h1 id="nf-heading" className="mt-3 text-[28px] font-extrabold tracking-[-0.02em] md:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-muted">That URL doesn&apos;t match anything here. It may have been moved or unpublished.</p>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <li>
            <Link href="/" className="font-semibold underline underline-offset-4 decoration-2">
              Home
            </Link>
          </li>
          <li>
            <Link href="/projects" className="font-semibold underline underline-offset-4 decoration-2">
              Projects
            </Link>
          </li>
          <li>
            <Link href="/writing" className="font-semibold underline underline-offset-4 decoration-2">
              Writing
            </Link>
          </li>
        </ul>
      </Container>
    </section>
  );
}
