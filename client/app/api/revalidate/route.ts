import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { CONTENT_TAGS, type ContentTag } from "@/sanity/fetch";

/**
 * Sanity webhook → revalidate cached content for the published document's type.
 * Webhook setup: POST, projection `{_type}`, header `Authorization: Bearer <SANITY_REVALIDATE_SECRET>`.
 */
export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return Response.json({ message: "Revalidation not configured" }, { status: 500 });
  }

  const auth = request.headers.get("authorization") ?? "";
  if (!safeEqual(auth, `Bearer ${secret}`)) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { _type?: unknown } | null;
  const type = body?._type;
  if (typeof type !== "string" || !CONTENT_TAGS.includes(type as ContentTag)) {
    return Response.json({ message: "Unknown or missing _type" }, { status: 400 });
  }

  revalidateTag(type, "max");
  return Response.json({ revalidated: type });
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}
