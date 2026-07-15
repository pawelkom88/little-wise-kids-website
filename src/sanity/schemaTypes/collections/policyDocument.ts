import { defineType, defineField } from "sanity";
import { MasterDetailIcon } from "@sanity/icons";

export const policyDocument = defineType({
  name: "policyDocument",
  title: "Policy Document",
  type: "document",
  icon: MasterDetailIcon,
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "file", title: "File (PDF)", type: "file", options: { accept: ".pdf" } }),
    defineField({ name: "shortDescription", title: "Short Description", type: "text" }),
    defineField({ name: "displayOrder", title: "Display Order", type: "number" }),
    defineField({ name: "lastReviewed", title: "Last Reviewed", type: "date" }),
  ],
});
