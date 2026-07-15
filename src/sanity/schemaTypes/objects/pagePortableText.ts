import { defineType } from "sanity";

export const pagePortableText = defineType({
  name: "pagePortableText",
  title: "Page Content",
  description: "Paragraph text with lists and links.",
  type: "array",
  of: [
    {
      type: "block",
      styles: [{ title: "Normal", value: "normal" }],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "External Link",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
                validation: (rule) => rule.required(),
              },
            ],
          },
        ],
      },
    },
  ],
});
