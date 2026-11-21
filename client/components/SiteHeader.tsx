import { Suspense } from "react";
import Link from "next/link";
import { cvDownloadUrl } from "@/lib/cv";
import { sanityFetch } from "@/sanity/fetch";
import { profileQuery } from "@/sanity/queries";
import { Container } from "./Container";
import { NavLinks, NavList } from "./NavLinks";

/** Old-portfolio header: "< Caleb >", nav, ink Resume button. Nav drops to its own row on phones. */
export async function SiteHeader() {
  const profile = await sanityFetch({ query: profileQuery, tags: ["profile"] });
  const first = profile?.name?.split(/\s+/)[0] ?? "Home";

  const nav = (
    // usePathname suspends on routes with request-time params; fallback = same links, none active.
    <Suspense fallback={<NavList pathname={null} />}>
      <NavLinks />
    </Suspense>
  );

  return (
    // Calm frosted glass: 75% page colour + blur. Opaque fallback where backdrop-filter is unsupported.
    // 75% keeps ink text ≥ 11:1 even while scrolling over the black projects band.
    <header className="sticky top-0 z-20 border-b border-fg/10 bg-bg supports-[backdrop-filter]:bg-bg/75 supports-[backdrop-filter]:backdrop-blur-xl supports-[backdrop-filter]:backdrop-saturate-150">
      <Container className="flex h-16 items-center justify-between gap-4 md:h-20">
        <Link href="/" aria-label="Home" className="shrink-0 text-2xl font-bold md:text-3xl">
          &lt; {first} &gt;
        </Link>
        <nav aria-label="Main" className="hidden md:block">
          {nav}
        </nav>
        <div className="flex items-center">
          {profile?.cvUrl && (
            <a
              href={cvDownloadUrl(profile.cvUrl, profile.name)}
              className="flex items-center gap-2 rounded-sm border border-fg bg-fg px-3 py-2 font-semibold text-bg transition-colors duration-200 hover:border-ink-soft hover:bg-ink-soft active:bg-bg active:text-fg"
            >
              Resume
              {/* Download-document icon. */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                <path d="M14 3v5h5M12 12v6M9 15l3 3 3-3" />
              </svg>
            </a>
          )}
        </div>
      </Container>
      <nav aria-label="Main (mobile)" className="border-t border-fg/10 md:hidden">
        <Container className="py-2">{nav}</Container>
      </nav>
    </header>
  );
}
