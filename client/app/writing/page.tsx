import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { WriteupCard } from "@/components/WriteupCard";
import { sanityFetch } from "@/sanity/fetch";
import { allWriteupsQuery } from "@/sanity/queries";

export const metadata: Metadata = { title: "Writing" };

export default async function WritingPage() {
  const writeups = await sanityFetch({ query: allWriteupsQuery, tags: ["writeup"] });

  return (
    <section aria-labelledby="writing-heading" className="py-16 pb-24">
      <Container width="content">
        <SectionHeading as="h1" id="writing-heading" lead="My" strong="Writing" className="mb-8" />
        {writeups.length > 0 ? (
          <ul className="space-y-4">
            {writeups.map((w) => (
              <li key={w._id}>
                <WriteupCard writeup={w} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No write-ups published yet.</p>
        )}
      </Container>
    </section>
  );
}
