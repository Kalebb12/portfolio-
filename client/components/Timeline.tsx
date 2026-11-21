import type { CSSProperties } from "react";
import type { TimelineQueryResult } from "@/sanity/types";
import { Tag } from "./Tag";

type Card = {
  id: string;
  sortKey: string;
  when: string;
  kind: string;
  title: string;
  where: string;
  role?: string | null;
  result?: string | null;
  summary?: string | null;
  tags?: string[] | null;
  link?: string | null;
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-07" → "Jul 2026", "2026" → "2026". Anything else (e.g. a draft placeholder) → "". */
function formatDate(value: string | null | undefined) {
  if (!value || !/^\d{4}(-\d{2})?$/.test(value)) return "";
  const [year, month] = value.split("-");
  return month ? `${MONTHS[Number(month) - 1]} ${year}` : year;
}

// Draft preview only: published entries can't contain "TODO" (Studio validation blocks it).
const TODO = /\s*\(?TODO\b[^)]*\)?/g;
const clean = (v: string | null | undefined) => (v ? v.replace(TODO, "").trim() || null : null);
const cleanList = (list: string[] | null | undefined) =>
  list?.map(clean).filter((x): x is string => !!x) ?? null;

const newestFirst = (a: { sortKey: string }, b: { sortKey: string }) => b.sortKey.localeCompare(a.sortKey);

/** Cards = all experience + featured hackathons. The rest become a compact list. */
function split({ hackathons, experience }: TimelineQueryResult) {
  const hackathonCards: Card[] = hackathons
    .filter((h) => h.featured)
    .map((h) => ({
      id: h._id,
      sortKey: formatDate(h.date) ? h.date : "",
      when: formatDate(h.date),
      kind: "Hackathon",
      title: clean(h.project) ?? "",
      where: clean(h.event) ?? "",
      role: clean(h.role),
      result: clean(h.result),
      summary: clean(h.summary),
      tags: cleanList(h.stack),
      link: clean(h.link),
    }));
  const experienceCards: Card[] = experience.map((e) => {
    const start = formatDate(e.startDate);
    const end = e.endDate ? formatDate(e.endDate) : "Present";
    return {
      id: e._id,
      sortKey: start ? e.startDate : "",
      when: start && end ? `${start} – ${end}` : start,
      kind: e.type ?? "Experience",
      title: clean(e.title) ?? "",
      where: clean(e.organization) ?? "",
      summary: clean(e.summary),
      tags: cleanList(e.tags),
    };
  });
  const more = hackathons
    .filter((h) => !h.featured)
    .map((h) => ({
      id: h._id,
      sortKey: formatDate(h.date) ? h.date : "",
      when: formatDate(h.date),
      title: clean(h.project) ?? "",
      where: clean(h.event) ?? "",
      result: clean(h.result),
      link: clean(h.link),
    }))
    .sort(newestFirst);

  return { cards: [...experienceCards, ...hackathonCards].sort(newestFirst), more };
}

/**
 * Pinned "stacking cards": the heading stays put under the header while each card scrolls up
 * and sticks a little lower than the one before it. The page pins the About illustration beside it.
 * CSS `position: sticky` only, no scroll JS.
 */
export function Timeline({ data, headingId }: { data: TimelineQueryResult; headingId: string }) {
  const { cards, more } = split(data);

  return (
    <div className="flex flex-col gap-6">
      {/* Pinned heading (all sizes); the cards stick just below it. */}
      <div className="sticky top-[6.5rem] z-10 -mx-4 bg-bg px-4 py-3 sm:-mx-6 sm:px-6 md:top-20 lg:mx-0 lg:px-0">
        <h2 id={headingId} className="text-[28px] font-normal leading-tight tracking-[-0.02em] md:text-5xl lg:text-4xl xl:text-5xl">
          Hackathons &amp; <span className="font-extrabold">Experience</span>
        </h2>
      </div>

      <div>
        {/* Stacking cards: each sticks 14px lower than the previous one. */}
        <ol className="pb-4">
          {cards.map((card, i) => (
            <li
              key={card.id}
              style={{ "--i": i } as CSSProperties}
              className="sticky top-[calc(13rem+var(--i)*14px)] mb-6 md:top-[calc(11rem+var(--i)*14px)] lg:top-[calc(10.5rem+var(--i)*14px)] xl:top-[calc(11rem+var(--i)*14px)]"
            >
              {/* Fixed height per breakpoint: a shorter card must fully cover the one stuck beneath it. */}
              <article className="flex h-[25rem] flex-col gap-4 overflow-hidden rounded-[18px] border-2 border-fg bg-bg p-6 shadow-[0_-8px_24px_-12px_rgb(0_0_0/0.25)] sm:h-[21rem] sm:p-8 lg:h-[22rem]">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-3xl font-extrabold leading-none sm:text-4xl" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="flex flex-wrap justify-end gap-2 text-right font-mono text-xs text-muted">
                    <span className="rounded-sm border border-fg px-1.5 py-0.5 text-fg">{card.kind}</span>
                    {card.when && <span className="py-0.5">{card.when}</span>}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-extrabold leading-snug sm:text-2xl">
                    {card.link ? (
                      <a href={card.link} target="_blank" rel="noopener noreferrer" className="underline-offset-4 decoration-2 hover:underline">
                        {card.title}
                      </a>
                    ) : (
                      card.title
                    )}
                  </h3>
                  <p className="mt-1 text-muted">{card.where}</p>
                </div>
                {(card.role || card.result) && (
                  <p className="flex flex-wrap items-center gap-2 text-sm font-semibold">
                    {card.role}
                    {card.result && <span className="whitespace-nowrap rounded-sm bg-fg px-1.5 py-0.5 text-bg">{card.result}</span>}
                  </p>
                )}
                {card.summary && <p className="line-clamp-3 text-sm leading-relaxed text-muted">{card.summary}</p>}
                {(card.tags?.length ?? 0) > 0 && (
                  <ul className="mt-auto flex max-h-[3.75rem] flex-wrap gap-2 overflow-hidden pt-2" aria-label="Stack">
                    {card.tags!.map((tag) => (
                      <li key={tag}>
                        <Tag>{tag}</Tag>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </li>
          ))}
        </ol>

        {/* The rest: one compact line each. */}
        {more.length > 0 && (
          <div className="reveal mt-10">
            <h3 className="mb-4 font-extrabold">More hackathons</h3>
            <ul className="divide-y divide-border border-y border-border">
              {more.map((h) => (
                <li key={h.id} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3">
                  <p>
                    <span className="font-semibold">
                      {h.link ? (
                        <a href={h.link} target="_blank" rel="noopener noreferrer" className="underline-offset-4 decoration-2 hover:underline">
                          {h.title}
                        </a>
                      ) : (
                        h.title
                      )}
                    </span>
                    <span className="text-muted"> · {h.where}</span>
                    {h.result && <span className="ml-2 inline-block whitespace-nowrap rounded-sm bg-fg px-1.5 py-0.5 text-xs font-semibold text-bg">{h.result}</span>}
                  </p>
                  {h.when && <span className="font-mono text-xs text-muted">{h.when}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
