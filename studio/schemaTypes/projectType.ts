import { defineField, defineType } from "sanity";

export const projectType = defineType({
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
    }),
    defineField({
      name: "preview_url",
      type: "url",
    }),
    defineField({
      name: "des",
      type: "text",
      validation: (rule) => rule.required(),
    })

  ]
})