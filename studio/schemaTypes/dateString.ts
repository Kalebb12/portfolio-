import { defineField, type DocumentRule } from "sanity";

/** "YYYY" or "YYYY-MM". Plain strings so a year alone is allowed; they sort correctly as text. */
export const DATE_PATTERN = /^\d{4}(-(0[1-9]|1[0-2]))?$/;

export const dateStringField = (name: string, title: string, required = true, hint = "") =>
  defineField({
    name,
    title,
    type: "string",
    description: `Year or year-month, e.g. "2026" or "2026-07".${hint ? ` ${hint}` : ""}`,
    validation: (rule) => {
      const r = rule.regex(DATE_PATTERN, { name: "YYYY or YYYY-MM" });
      return required ? r.required() : r;
    },
  });

/** Document-level rule: seeded drafts contain "TODO" placeholders; block publishing until they're replaced. */
export const noTodoPlaceholders = (rule: DocumentRule) =>
  rule.custom((doc) =>
    JSON.stringify(doc ?? {}).includes("TODO") ? "Replace every TODO placeholder before publishing." : true,
  );
