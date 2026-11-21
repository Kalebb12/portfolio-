import { defineArrayMember, defineField, defineType } from "sanity";

/** Shared Portable Text for project case studies and write-ups. */
export const BlockContentType = defineType({
  name: "blockContent",
  title: "Block content",
  type: "array",
  of: [
    defineArrayMember({ type: "block" }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({ name: "caption", type: "string" }),
      ],
    }),
    defineArrayMember({
      type: "code",
      options: {
        withFilename: true,
        languageAlternatives: [
          { title: "Python", value: "python" },
          { title: "TypeScript", value: "typescript" },
          { title: "SQL", value: "sql" },
          { title: "Shell", value: "sh" },
          { title: "Plain text", value: "text" },
        ],
      },
    }),
  ],
});
