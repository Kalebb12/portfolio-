import type { Metadata } from "next";
import { Geist_Mono, Sora } from "next/font/google";
import { siteUrl } from "@/lib/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { sanityFetch } from "@/sanity/fetch";
import { profileQuery } from "@/sanity/queries";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const profile = await sanityFetch({ query: profileQuery, tags: ["profile"] });
  // Generic fallback until the profile document is published.
  const name = profile?.name ?? "Portfolio";

  return {
    metadataBase: new URL(siteUrl),
    title: { default: name, template: `%s · ${name}` },
    description: profile?.headline,
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sora.variable} ${geistMono.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-bg focus:border-2 focus:border-fg focus:px-3 focus:py-2 focus:text-fg"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
