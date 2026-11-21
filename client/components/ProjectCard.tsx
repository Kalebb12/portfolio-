import Link from "next/link";
import type { FeaturedProjectsQueryResult } from "@/sanity/types";
import { SanityImage } from "./SanityImage";
import { Tag } from "./Tag";

type Project = FeaturedProjectsQueryResult[number];

export function ProjectCard({ project, eager }: { project: Project; eager?: boolean }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[18px] border-2 border-fg bg-bg transition-colors duration-200 hover:bg-surface">
      <SanityImage
        image={project.img}
        sizes="(min-width: 1100px) 535px, (min-width: 768px) 50vw, 100vw"
        className="aspect-video w-full border-b-2 border-fg object-cover"
        eager={eager}
      />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-extrabold">
          {/* Stretched link: the whole card is clickable, one tab stop. */}
          <Link href={`/projects/${project.slug}`} className="underline-offset-4 decoration-2 after:absolute after:inset-0 group-hover:underline">
            {project.title}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-muted">{project.des}</p>
        {(project.stack?.length ?? 0) > 0 && (
          <ul className="mt-auto flex flex-wrap gap-2 pt-2" aria-label="Stack">
            {project.stack!.slice(0, 5).map((item) => (
              <li key={item}>
                <Tag>{item}</Tag>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
