import { defineField, defineType } from "sanity";

/** Singleton: one document with _id "profile". Social links live in `socialLinks`. */
export const ProfileType = defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "headline",
      type: "string",
      description: "One line shown in the hero.",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({ name: "bio", type: "text", rows: 5 }),
    defineField({
      name: "stack",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Tools you work with, in the order to show them (About section).",
    }),
    defineField({
      name: "cv",
      title: "CV",
      type: "file",
      options: { accept: "application/pdf" },
    }),
  ],
});
