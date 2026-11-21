"use client";

import { useState } from "react";
import type { AllProjectsQueryResult } from "@/sanity/types";
import { ProjectCard } from "./ProjectCard";

type Category = NonNullable<AllProjectsQueryResult[number]["category"]>;

// Product first: web work leads, ML/quant stay low-key.
const LABELS: Record<Category, string> = {
  product: "Product",
  security: "Security",
  quant: "Quant",
  ml: "ML",
};

export function ProjectFilter({ projects }: { projects: AllProjectsQueryResult }) {
  const [active, setActive] = useState<Category | "all">("all");

  // Only offer categories that actually have published projects.
  const present = (Object.keys(LABELS) as Category[]).filter((c) =>
    projects.some((p) => p.category === c),
  );
  const shown = active === "all" ? projects : projects.filter((p) => p.category === active);

  const chip = (value: Category | "all", label: string) => (
    <li key={value}>
      <button
        type="button"
        aria-pressed={active === value}
        onClick={() => setActive(value)}
        className="rounded-sm border-2 border-fg px-3 py-1.5 text-sm font-semibold transition-colors duration-200 hover:bg-surface aria-pressed:bg-accent aria-pressed:text-on-accent"
      >
        {label}
      </button>
    </li>
  );

  return (
    <>
      {present.length > 1 && (
        <ul className="mb-8 flex flex-wrap gap-2" aria-label="Filter by category">
          {chip("all", "All")}
          {present.map((c) => chip(c, LABELS[c]))}
        </ul>
      )}
      <div className="grid gap-6 md:grid-cols-2">
        {shown.map((project, i) => (
          <ProjectCard key={project._id} project={project} eager={i === 0} />
        ))}
      </div>
    </>
  );
}
