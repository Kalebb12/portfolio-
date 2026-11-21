type LoaderArgs = { src: string; width: number; quality?: number };

/** next/image loader: Sanity's CDN resizes and converts; anything else is served as-is. */
export default function sanityImageLoader({ src, width, quality }: LoaderArgs) {
  if (!src.startsWith("https://cdn.sanity.io/")) return src;

  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  url.searchParams.set("fit", "max");
  url.searchParams.set("auto", "format");
  return url.toString();
}
