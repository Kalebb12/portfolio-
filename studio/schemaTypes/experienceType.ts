import { defineField, defineType } from "sanity";
import { dateStringField, noTodoPlaceholders } from "./dateString";

/** Work, freelance and education entries for the home timeline. */
export const ExperienceType = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "organization", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "type",
      type: "string",
      options: {
        list: ["Full-time", "Part-time", "Internship", "Freelance", "Education"],
        layout: "radio",
        direction: "horizontal",
      },
    }),
    dateStringField("startDate", "Start date"),
    dateStringField("endDate", "End date", false, "Leave empty if ongoing."),
    defineField({
      name: "summary",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(220).warning("Keep it to one or two sentences."),
    }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
  ],
  validation: (rule) => noTodoPlaceholders(rule),
  orderings: [{ title: "Newest first", name: "startDesc", by: [{ field: "startDate", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "organization" } },
});
