import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Container } from "@/components/Container";
import { HeroDecor } from "@/components/HeroDecor";
import { SanityImage } from "@/components/SanityImage";
import { SectionHeading } from "@/components/SectionHeading";
import { Tag } from "@/components/Tag";
import { Timeline } from "@/components/Timeline";
import { sanityFetch } from "@/sanity/fetch";
import {
  featuredProjectsQuery,
  profileQuery,
  socialLinksQuery,
  timelineQuery,
} from "@/sanity/queries";

const primaryBtn =
  "inline-flex h-12 items-center rounded-sm border border-fg bg-fg px-5 font-semibold text-bg transition-colors duration-200 hover:border-ink-soft hover:bg-ink-soft active:bg-bg active:text-fg";
const secondaryBtn =
  "inline-flex h-12 items-center rounded-sm border border-fg px-5 font-semibold transition-colors duration-200 hover:bg-fg hover:text-bg";

export default async function Home() {
  const [profile, links, projects, timeline] = await Promise.all([
    sanityFetch({ query: profileQuery, tags: ["profile"] }),
    sanityFetch({ query: socialLinksQuery, tags: ["socialLinks"] }),
    sanityFetch({ query: featuredProjectsQuery, tags: ["projects"] }),
    sanityFetch({ query: timelineQuery, tags: ["hackathon", "experience"], drafts: true }),
  ]);
  const hasTimeline = timeline.hackathons.length + timeline.experience.length > 0;
  const hasAbout = !!profile?.bio || (profile?.stack?.length ?? 0) > 0;

  return (
    <>
      {/* Hero: name as a poster (first word solid, the rest outlined), one-line positioning, two CTAs. */}
      <section className="relative overflow-hidden py-12 sm:py-16 xl:py-24">
        <HeroDecor />
        <Container className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <Image
            src="/hero.png"
            alt=""
            width={889}
            height={596}
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1100px) 500px, (min-width: 1024px) 45vw, 100vw"
            className="hero-in mx-auto w-full max-w-[300px] [--d:350ms] sm:max-w-lg lg:order-2 lg:max-w-none"
          />
          <div className="flex flex-col">
            <h1 className="hero-in text-[clamp(4.5rem,25vw,8.5rem)] font-extrabold leading-[0.95] tracking-[-0.045em]">
              {(profile?.name ?? "Portfolio").split(/\s+/).map((word, i) => (
                <span key={i} className={`block ${i > 0 ? "text-outline" : ""}`}>
                  {word}
                </span>
              ))}
            </h1>
            {profile?.headline && (
              <p className="hero-in mt-8 flex items-start gap-4 text-xl [--d:150ms] font-semibold tracking-[-0.01em] sm:mt-10 sm:text-2xl">
                <span aria-hidden="true" className="mt-[0.7em] h-[3px] w-10 shrink-0 bg-fg sm:w-14" />
                {profile.headline}
              </p>
            )}
            <div className="hero-in mt-8 flex flex-wrap gap-4 [--d:250ms] sm:mt-10">
              <a href="#work" className={primaryBtn}>
                View projects
              </a>
              <a href="#contact" className={secondaryBtn}>
                Contact
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Projects: the four best (featured, by order). Black band, numbered alternating rows. */}
      {projects.length > 0 && (
        <section id="work" aria-labelledby="work-heading" className="scroll-mt-28 bg-fg py-10 text-bg sm:py-16 md:scroll-mt-20">
          <Container className="flex flex-col items-center gap-7 lg:gap-5">
            <SectionHeading id="work-heading" lead="My" strong="Projects" className="reveal" />
            <ol className="w-full">
              {projects.map((project, i) => (
                <li
                  key={project._id}
                  className={`reveal flex flex-col items-center gap-5 py-5 xl:gap-10 ${i % 2 ? "lg:flex-row-reverse" : "lg:flex-row"}`}
                >
                  <SanityImage
                    image={project.img}
                    sizes="(min-width: 1100px) 560px, (min-width: 1024px) 50vw, 100vw"
                    className="aspect-[2/1] w-full rounded-[18px] object-cover lg:w-1/2"
                  />
                  <div className="flex w-full flex-col gap-6 lg:w-1/2">
                    <p className="text-2xl font-extrabold lg:text-5xl" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-xl font-extrabold lg:text-[32px] lg:leading-tight xl:font-bold">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="transition-colors duration-200 hover:text-muted-inverse"
                      >
                        {project.title}
                      </Link>
                    </h3>
                    <p className="text-muted-inverse lg:text-justify">{project.des}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link
              href="/projects"
              className="reveal mt-4 inline-flex h-12 items-center rounded-sm border border-bg px-5 font-semibold transition-colors duration-200 hover:bg-bg hover:text-fg"
            >
              All projects
            </Link>
          </Container>
        </section>
      )}

      {/* Hackathons & experience, then About, in one section. Desktop: the About illustration (and
          counts) stay pinned on the left while the experience cards stack on the right, then scroll
          away together with the end of About. Mobile: the illustration sits above About. */}
      {(hasTimeline || hasAbout) && (
        <section
          id="experience"
          aria-label="Hackathons, experience and about"
          className="scroll-mt-28 py-10 sm:py-16 md:scroll-mt-20"
        >
          <Container className="lg:grid lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
            <div className="hidden lg:block">
              <div className="sticky top-28">
                <Image
                  src="/profile.png"
                  alt=""
                  width={530}
                  height={572}
                  sizes="(min-width: 1100px) 400px, 35vw"
                  className="w-full"
                />
                {hasTimeline && (
                  <dl className="mt-8 flex gap-10">
                    <div>
                      <dt className="font-mono text-xs uppercase text-muted">Hackathons</dt>
                      <dd className="text-5xl font-extrabold">{String(timeline.hackathons.length).padStart(2, "0")}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-xs uppercase text-muted">Roles</dt>
                      <dd className="text-5xl font-extrabold">{String(timeline.experience.length).padStart(2, "0")}</dd>
                    </div>
                  </dl>
                )}
              </div>
            </div>

            <div>
              {hasTimeline && <Timeline data={timeline} headingId="experience-heading" />}

              {hasAbout && (
                <section id="about" aria-labelledby="about-heading" className={`reveal ${hasTimeline ? "mt-20 sm:mt-28" : ""}`}>
                  <Image
                    src="/profile.png"
                    alt=""
                    width={530}
                    height={572}
                    sizes="80vw"
                    className="mx-auto mb-8 w-full max-w-xs lg:hidden"
                  />
                  <SectionHeading id="about-heading" lead="About" strong="Me" className="mb-6" />
                  {profile?.bio && (
                    <div className="flex flex-col gap-5 text-muted">
                      {profile.bio.split(/\n{2,}/).map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                  )}
                  {(profile?.stack?.length ?? 0) > 0 && (
                    <div className="mt-8">
                      <h3 className="mb-3 font-extrabold">Stack</h3>
                      <ul className="flex flex-wrap gap-2">
                        {profile!.stack!.map((item) => (
                          <li key={item}>
                            <Tag>{item}</Tag>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* Contact CTA: form left, pitch right (pitch first on mobile), as on the old site. */}
      <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-28 border-t border-border py-10 sm:py-16 md:scroll-mt-20">
        <Container className="flex flex-col-reverse items-center justify-center gap-10 xl:flex-row xl:items-start xl:justify-between">
          <div className="reveal flex w-full flex-1 py-5">
            <ContactForm links={links} />
          </div>
          <div className="reveal flex w-full flex-1 flex-col gap-4 py-5 xl:p-5">
            <h2 id="contact-heading" className="text-[28px] font-extrabold leading-tight tracking-[-0.02em] md:text-5xl">
              Let&apos;s <span className="text-outline">talk</span> for
              <br /> something special
            </h2>
            <p className="text-muted">Have a role or a project in mind? Send me a message and I&apos;ll get back to you.</p>
          </div>
        </Container>
      </section>
    </>
  );
}
