import { defineType, defineField } from "sanity";
import { BookIcon } from "@sanity/icons/Book";

export const policyDocument = defineType({
  name: "policyDocument",
  title: "Policy Document",
  type: "document",
  icon: BookIcon,
  fields: [
    defineField({
      name: "title",
      title: "Policy Title",
      description: "The name of the policy document.",
      type: "string",
      validation: (rule) => [
        rule.required().error("Policy title is required."),
        rule.max(80).warning("Keep the title under 80 characters.")
      ],
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      description: "A brief description of what this policy covers.",
      type: "text",
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "file",
      title: "Policy File",
      description: "Upload the PDF document here.",
      type: "file",
      options: { accept: "application/pdf" },
      validation: (rule) => [
        rule.required().error("A policy file is required."),
        rule.custom((fileValue) => {
          if (!fileValue || !fileValue.asset) return true; // Let required() handle this
          return true; // We can't synchronously validate asset MIME type here without fetching the asset document, but we will add seed/import validation. Actually Sanity file schema handles accept on upload.
        })
      ],
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      description: "Controls the order of policies on the Parents page. Lower numbers appear first.",
      type: "number",
      initialValue: 50,
      validation: (rule) => rule.required().integer(),
    }),
    defineField({
      name: "lastReviewed",
      title: "Last Reviewed Date",
      description: "The date this policy was last updated or reviewed.",
      type: "date",
      validation: (rule) => rule.required().error("Review date is required."),
    }),
  ],
  preview: {
    select: { title: "title", date: "lastReviewed" },
    prepare(selection) {
      const { title, date } = selection;
      return {
        title,
        subtitle: date ? `Reviewed: ${date}` : "Not reviewed yet",
      };
    },
  },
  orderings: [
    {
      title: "Display Order, Asc",
      name: "orderAsc",
      by: [{ field: "displayOrder", direction: "asc" }],
    },
  ],
});
