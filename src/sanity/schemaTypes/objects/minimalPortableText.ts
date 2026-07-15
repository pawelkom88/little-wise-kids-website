import { defineType } from "sanity";

export const minimalPortableText = defineType({
  name: "minimalPortableText",
  title: "Minimal Content",
  description: "Basic paragraph text.",
  type: "array",
  of: [
    {
      type: "block",
      styles: [{ title: "Normal", value: "normal" }],
      lists: [],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [],
      },
      of: [{ type: "inlineBusinessDetail" }],
    },
  ],
});
