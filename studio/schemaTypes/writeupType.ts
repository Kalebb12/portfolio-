import { defineField, defineType } from "sanity";

/** Technical write-ups. LaTeX is written inline as $...$ / $$...$$ in body text. */
export const WriteupType = defineType({
  name: "writeup",
  title: "Write-ups",
  type: "document",
  description:
    "Technical write-ups: mostly web and software engineering, occasionally ML or applied maths.",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(160).warning("Keep the summary under 160 characters."),
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({ name: "body", type: "blockContent" }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
