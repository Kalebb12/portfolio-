import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

type ImageSource = Parameters<typeof builder.image>[0];

/** urlFor(img).width(800).url() — auto=format serves WebP/AVIF where supported. */
export function urlFor(source: ImageSource) {
  return builder.image(source).auto("format");
}
