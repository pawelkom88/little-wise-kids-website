import { defineType } from "sanity";

export const faqPortableText = defineType({
  name: "faqPortableText",
  title: "FAQ Portable Text",
  type: "array",
  of: [
    {
      title: "Block",
      type: "block",
      styles: [{ title: "Normal", value: "normal" }],
      lists: [], // No lists
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [], // No arbitrary links
      },
      of: [{ type: "inlineBusinessDetail" }],
    },
  ],
});
