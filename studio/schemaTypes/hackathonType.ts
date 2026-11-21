import { defineField, defineType } from "sanity";
import { dateStringField, noTodoPlaceholders } from "./dateString";

/** One hackathon entry, shown in the home "Hackathons & Experience" timeline. */
export const HackathonType = defineType({
  name: "hackathon",
  title: "Hackathons",
  type: "document",
  fields: [
    defineField({ name: "project", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "event", type: "string", validation: (rule) => rule.required() }),
    dateStringField("date", "Date"),
    defineField({ name: "role", type: "string", description: 'e.g. "Team Lead (5-person team)"' }),
    defineField({
      name: "summary",
      type: "text",
      rows: 3,
      validation: (rule) => [rule.required(), rule.max(220).warning("Keep it to one or two sentences.")],
    }),
    defineField({ name: "stack", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({
      name: "result",
      type: "string",
      description: 'Placement or outcome, e.g. "1st place" or "Selected for Track 2". Leave empty if none.',
    }),
    defineField({ name: "link", type: "url", description: "Repo, demo or write-up." }),
    defineField({
      name: "featured",
      type: "boolean",
      initialValue: false,
      description: "Featured hackathons get a full card on the home page; the rest appear in a compact list.",
    }),
  ],
  validation: (rule) => noTodoPlaceholders(rule),
  orderings: [{ title: "Newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: { select: { title: "project", subtitle: "event" } },
});
