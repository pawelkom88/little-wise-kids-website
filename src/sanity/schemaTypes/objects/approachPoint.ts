import { defineType } from "sanity";

export const approachPoint = defineType({
  name: "approachPoint",
  title: "Approach Paragraph",
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
});
