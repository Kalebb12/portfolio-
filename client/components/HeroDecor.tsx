import type { CSSProperties, ReactNode } from "react";

/**
 * Decorative layer behind the hero: dev icons and design marks drifting slowly.
 * aria-hidden, pointer-events off, sits under the content; still under prefers-reduced-motion.
 * Positions are per breakpoint so nothing covers the name, tagline or buttons.
 */
type Item = {
  icon: ReactNode;
  /** Position + visibility classes (mobile first). */
  at: string;
  /** Bordered "UI chip" tile vs bare line icon. */
  tile?: boolean;
  size?: number;
  rotate?: number;
  delay?: number;
  duration?: number;
};

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const Code = () => (
  <svg viewBox="0 0 24 24" {...stroke}>
    <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
  </svg>
);
const Braces = () => (
  <svg viewBox="0 0 24 24" {...stroke}>
    <path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1M16 3h1a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-1" />
  </svg>
);
const Terminal = () => (
  <svg viewBox="0 0 24 24" {...stroke}>
    <path d="m5 8 4 4-4 4M12 17h7" />
  </svg>
);
const Branch = () => (
  <svg viewBox="0 0 24 24" {...stroke}>
    <circle cx="6" cy="5" r="2" />
    <circle cx="6" cy="19" r="2" />
    <circle cx="18" cy="8" r="2" />
    <path d="M6 7v10M18 10c0 4-6 3-11 7" />
  </svg>
);
const Cursor = () => (
  <svg viewBox="0 0 24 24" {...stroke}>
    <path d="m4 3 7 17 2.5-7L21 10.5 4 3Z" fill="currentColor" />
  </svg>
);
const PenTool = () => (
  <svg viewBox="0 0 24 24" {...stroke}>
    <path d="M3 21c4-1 7-4 9-9" />
    <circle cx="12" cy="12" r="2" />
    <path d="m14 10 6-6M17 4h3v3" />
    <rect x="2" y="19" width="3" height="3" />
  </svg>
);
const Hash = () => (
  <svg viewBox="0 0 24 24" {...stroke}>
    <path d="M5 9h15M4 15h15M10 3 8 21M16 3l-2 18" />
  </svg>
);
const Dots = () => (
  <svg viewBox="0 0 40 40" fill="currentColor">
    {Array.from({ length: 16 }, (_, i) => (
      <circle key={i} cx={5 + (i % 4) * 10} cy={5 + Math.floor(i / 4) * 10} r="1.6" />
    ))}
  </svg>
);
const Squiggle = () => (
  <svg viewBox="0 0 60 16" {...stroke} strokeWidth={2.25}>
    <path d="M2 8c5-8 9-8 14 0s9 8 14 0 9-8 14 0 9 8 14 0" />
  </svg>
);
const Ring = () => (
  <svg viewBox="0 0 24 24" {...stroke}>
    <circle cx="12" cy="12" r="9" strokeDasharray="3 3" />
  </svg>
);

const items: Item[] = [
  // Mobile: around the illustration's sides. Desktop: in the gap between text and illustration.
  { icon: <Code />, tile: true, at: "left-[3%] top-[3%] lg:left-[45%] lg:top-[14%]", rotate: -8, delay: 0 },
  { icon: <Braces />, tile: true, at: "right-[3%] top-[9%] lg:right-[2%] lg:top-[6%]", rotate: 6, delay: 1.2 },
  { icon: <Terminal />, tile: true, at: "left-[4%] top-[25%] lg:left-[47%] lg:top-auto lg:bottom-[16%]", rotate: 5, delay: 2.1 },
  { icon: <Cursor />, at: "right-[5%] top-[28%] lg:right-auto lg:left-[53%] lg:top-[48%]", size: 26, rotate: -6, delay: 0.6 },
  { icon: <Branch />, at: "hidden sm:block lg:right-[4%] lg:bottom-[10%] sm:right-[6%] sm:bottom-[12%]", size: 34, rotate: 0, delay: 1.8 },
  { icon: <PenTool />, at: "hidden lg:block lg:left-[37%] lg:top-[4%]", size: 32, rotate: 10, delay: 2.7 },
  { icon: <Hash />, at: "hidden lg:block lg:left-[60%] lg:top-[5%]", size: 26, rotate: -12, delay: 3.3 },
  { icon: <Dots />, at: "hidden md:block md:right-[18%] md:top-[3%]", size: 44, delay: 0.9, duration: 11 },
  { icon: <Squiggle />, at: "hidden md:block md:right-[10%] md:top-[53%] lg:right-auto lg:top-auto lg:left-[37%] lg:bottom-[4%]", size: 64, delay: 1.5, duration: 10 },
  { icon: <Ring />, at: "hidden lg:block lg:right-[40%] lg:bottom-[6%]", size: 30, delay: 2.4, duration: 12 },
];

export function HeroDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none">
      {items.map((item, i) => (
        <span
          key={i}
          className={`hero-float absolute ${item.at}`}
          style={
            {
              "--r": `${item.rotate ?? 0}deg`,
              animationDelay: `${item.delay ?? 0}s`,
              animationDuration: `${item.duration ?? 8}s`,
            } as CSSProperties
          }
        >
          {item.tile ? (
            <span className="grid size-11 place-items-center rounded-lg border-2 border-fg bg-bg shadow-[3px_3px_0_var(--color-fg)] sm:size-12">
              <span className="block size-5 sm:size-6">{item.icon}</span>
            </span>
          ) : (
            <span className="block text-fg/70" style={{ width: item.size ?? 28, height: item.size ?? 28 }}>
              {item.icon}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
