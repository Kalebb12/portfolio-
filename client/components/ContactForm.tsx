import type { SocialLinksQueryResult } from "@/sanity/types";
import { SocialLinks } from "./SocialLinks";

// Formspree form URL (https://formspree.io/f/<id>). Server-only env var, read at build time.
const endpoint = process.env.FORMSPREE_ENDPOINT;

const field =
  "w-full rounded border-[1.4px] border-fg bg-bg px-6 py-4 transition-colors duration-200 placeholder:text-muted hover:border-ink-soft hover:bg-surface";

/** The previous portfolio's contact form (Formspree). Labels are visually hidden; placeholders carry the prompt. */
export function ContactForm({ links }: { links: SocialLinksQueryResult }) {
  // No endpoint configured: don't render a form that can't send. Social links still work.
  if (!endpoint) return <SocialLinks links={links} />;

  return (
    <form action={endpoint} method="POST" className="flex w-full flex-col gap-5 xl:max-w-125">
      <label className="sr-only" htmlFor="cf-name">Your name</label>
      <input id="cf-name" name="name" type="text" required autoComplete="name" placeholder="Your name" className={`${field} h-14`} />

      <label className="sr-only" htmlFor="cf-email">Email</label>
      <input id="cf-email" name="email" type="email" required autoComplete="email" placeholder="Email" className={`${field} h-14`} />

      <label className="sr-only" htmlFor="cf-site">Your website (optional)</label>
      <input id="cf-site" name="website" type="url" autoComplete="url" placeholder="Your website (if it exists, https://)" className={`${field} h-14`} />

      <label className="sr-only" htmlFor="cf-message">How can I help?</label>
      <textarea id="cf-message" name="message" required rows={5} placeholder="How can I help?*" className={`${field} h-35 resize-none`} />

      {/* Formspree honeypot: bots fill it, people never see it. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          className="h-14 rounded-sm border border-fg bg-fg px-5 font-semibold text-bg transition-colors duration-200 hover:border-ink-soft hover:bg-ink-soft active:bg-bg active:text-fg"
        >
          Get In Touch
        </button>
        <SocialLinks links={links} />
      </div>
    </form>
  );
}
