"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/writing", label: "Writing" },
  { href: "/#contact", label: "Contact" },
];

/** Plain links; `pathname` marks the current section. Also the Suspense fallback (pathname = null). */
export function NavList({ pathname }: { pathname: string | null }) {
  return (
    <ul className="flex gap-4 text-[15px] font-semibold sm:gap-5 sm:text-base md:gap-7 md:text-lg">
      {nav.map((item) => {
        const exact = pathname === item.href;
        const active = exact || !!pathname?.startsWith(`${item.href}/`);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={exact ? "page" : undefined}
              className={`underline-offset-8 decoration-2 transition-colors duration-200 hover:text-ink-soft ${active ? "underline" : ""}`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function NavLinks() {
  return <NavList pathname={usePathname()} />;
}
