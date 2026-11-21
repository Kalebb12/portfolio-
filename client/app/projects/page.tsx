import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ProjectFilter } from "@/components/ProjectFilter";
import { SectionHeading } from "@/components/SectionHeading";
import { sanityFetch } from "@/sanity/fetch";
import { allProjectsQuery } from "@/sanity/queries";

export const metadata: Metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const projects = await sanityFetch({ query: allProjectsQuery, tags: ["projects"] });

  return (
    <section aria-labelledby="projects-heading" className="py-16 pb-24">
      <Container>
        <SectionHeading as="h1" id="projects-heading" lead="My" strong="Projects" className="mb-8" />
        {projects.length > 0 ? (
          <ProjectFilter projects={projects} />
        ) : (
          <p className="text-muted">No projects published yet.</p>
        )}
      </Container>
    </section>
  );
}
