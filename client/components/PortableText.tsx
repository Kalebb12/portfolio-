import { Children, type ReactNode } from "react";
import { PortableText as PT, type PortableTextComponents } from "@portabletext/react";
import katex from "katex";
import "katex/dist/katex.min.css";
import type { ProjectBySlugQueryResult } from "@/sanity/types";
import { SanityImage } from "./SanityImage";

type Body = NonNullable<NonNullable<ProjectBySlugQueryResult>["body"]>;
type BodyImage = Extract<Body[number], { _type: "image" }>;
type BodyCode = Extract<Body[number], { _type: "code" }>;

// $$display$$ or $inline$. Inline needs no space inside the delimiters and no
// digit after the closing $, so "costs $5 and $10" stays plain text.
const MATH = /\$\$([^$]+?)\$\$|\$(?!\s)([^$\n]+?)(?<!\s)\$(?!\d)/g;

function renderMath(text: string): ReactNode {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(MATH)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const display = m[1] !== undefined;
    const html = katex.renderToString(m[1] ?? m[2], { displayMode: display, throwOnError: false });
    out.push(<span key={m.index} className={display ? "block overflow-x-auto" : undefined} dangerouslySetInnerHTML={{ __html: html }} />);
    last = m.index + m[0].length;
  }
  if (last === 0) return text;
  out.push(text.slice(last));
  return out;
}

/** Math in plain spans only; a formula split across marks (e.g. half-bold) stays raw. */
const withMath = (children: ReactNode) =>
  Children.map(children, (c) => (typeof c === "string" ? renderMath(c) : c));

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{withMath(children)}</p>,
    // The page owns the h1, so body headings start at h2.
    h1: ({ children }) => <h2>{withMath(children)}</h2>,
    h2: ({ children }) => <h2>{withMath(children)}</h2>,
    h3: ({ children }) => <h3>{withMath(children)}</h3>,
    h4: ({ children }) => <h4>{withMath(children)}</h4>,
    h5: ({ children }) => <h4>{withMath(children)}</h4>,
    h6: ({ children }) => <h4>{withMath(children)}</h4>,
    blockquote: ({ children }) => <blockquote>{withMath(children)}</blockquote>,
  },
  listItem: ({ children }) => <li>{withMath(children)}</li>,
  marks: {
    link: ({ value, children }) => {
      const external = /^https?:\/\//.test(value?.href ?? "");
      return (
        <a href={value?.href} {...(external && { target: "_blank", rel: "noopener noreferrer" })}>
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: BodyImage }) => (
      <figure>
        <SanityImage image={value} sizes="(min-width: 720px) 672px, 100vw" className="w-full rounded-lg border border-border" />
        {value.caption && <figcaption>{value.caption}</figcaption>}
      </figure>
    ),
    code: ({ value }: { value: BodyCode }) => (
      <figure>
        {value.filename && <figcaption className="font-mono">{value.filename}</figcaption>}
        <pre data-language={value.language}>
          <code>{value.code}</code>
        </pre>
      </figure>
    ),
  },
};

/** Sanity blockContent → semantic HTML. Styled by `.prose-body` in globals.css. */
export function PortableText({ value }: { value: Body }) {
  return (
    <div className="prose-body">
      <PT value={value} components={components} />
    </div>
  );
}
