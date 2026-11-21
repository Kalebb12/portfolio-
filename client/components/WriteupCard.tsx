import Link from "next/link";
import type { AllWriteupsQueryResult } from "@/sanity/types";
import { Tag } from "./Tag";

type Writeup = AllWriteupsQueryResult[number];

export const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function WriteupCard({ writeup }: { writeup: Writeup }) {
  return (
    <article className="group relative rounded border-2 border-fg p-6 transition-colors duration-200 hover:bg-fg hover:text-bg">
      <time dateTime={writeup.publishedAt} className="font-mono text-xs text-muted group-hover:text-muted-inverse">
        {dateFormat.format(new Date(writeup.publishedAt))}
      </time>
      <h3 className="mt-2 text-lg font-bold">
        {/* Stretched link: whole card clickable, one tab stop. */}
        <Link href={`/writing/${writeup.slug}`} className="underline-offset-4 decoration-2 after:absolute after:inset-0 group-hover:underline">
          {writeup.title}
        </Link>
      </h3>
      {writeup.summary && <p className="mt-2 text-sm leading-relaxed text-muted group-hover:text-muted-inverse">{writeup.summary}</p>}
      {(writeup.tags?.length ?? 0) > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
          {writeup.tags!.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
