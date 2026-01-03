import { defineField, defineType } from "sanity";

export const SocialLinkType = defineType({
  name: "socialLinks",
  title: "Social Links",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "url",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icon",
      type: "string",
      validation: (rule) => rule.required(),
    })
  ],
})