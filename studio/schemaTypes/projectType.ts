import { defineField, defineType } from "sanity";

export const ProjectType = defineType({
  name: "projects",
  title: "Projects",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "github_url",
      type: "url",
    }),
    defineField({
      name: "img",
      type: "image",
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Describe the image for screen readers.",
        }),
      ],
    }),
    defineField({
      name: "preview_url",
      type: "url",
    }),
    defineField({
      name: "des",
      title: "Summary",
      type: "text",
      rows: 3,
      validation: (rule) => [
        rule.required(),
        rule.max(160).warning("Keep the summary under 160 characters."),
      ],
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Quant", value: "quant" },
          { title: "Product", value: "product" },
          { title: "Security", value: "security" },
          { title: "ML", value: "ml" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
    }),
    defineField({
      name: "featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Lower numbers appear first among featured projects.",
    }),
    defineField({
      name: "role",
      type: "string",
      description: 'e.g. "Team lead, 5 people"',
    }),
    defineField({
      name: "event",
      type: "string",
      description: "Hackathon or sponsor, if any.",
    }),
    defineField({
      name: "year",
      type: "number",
      validation: (rule) => rule.integer().min(2000).max(2100),
    }),
    defineField({
      name: "stack",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "highlights",
      type: "array",
      of: [{ type: "string" }],
      description: "Concrete, technical points. One per item.",
    }),
    defineField({
      name: "video_url",
      title: "Video URL",
      type: "url",
    }),
    defineField({
      name: "body",
      title: "Case study",
      type: "blockContent",
    }),
  ],
  orderings: [
    {
      title: "Featured order",
      name: "orderAsc",
      by: [
        { field: "featured", direction: "desc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
})