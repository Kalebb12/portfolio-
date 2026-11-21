import { sanityFetch } from "@/sanity/fetch";
import { profileQuery, socialLinksQuery } from "@/sanity/queries";
import { Container } from "./Container";
import { SocialLinks } from "./SocialLinks";

/** Inverted ink band: wordmark + social icons. */
export async function SiteFooter() {
  const [profile, links] = await Promise.all([
    sanityFetch({ query: profileQuery, tags: ["profile"] }),
    sanityFetch({ query: socialLinksQuery, tags: ["socialLinks"] }),
  ]);
  const first = profile?.name?.split(/\s+/)[0];

  return (
    <footer className="mt-auto bg-fg text-bg">
      <Container className="flex flex-wrap items-center justify-between gap-6 py-8">
        {first && <p className="text-xl font-bold sm:text-2xl">&lt; {first} /&gt;</p>}
        <SocialLinks links={links} inverse />
      </Container>
    </footer>
  );
}
