import { defineType } from "sanity";

export const blogPortableText = defineType({
  name: "blogPortableText",
  title: "Blog Content",
  description: "Rich text for blog articles.",
  type: "array",
  of: [
    {
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
      ],
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
              {
                name: "blank",
                title: "Open in new tab",
                type: "boolean",
                initialValue: true,
              },
            ],
          },
          {
            name: "internalLink",
            type: "object",
            title: "Internal Link",
            fields: [
              {
                name: "reference",
                type: "reference",
                title: "Reference",
                to: [
                  { type: "homePage" },
                  { type: "aboutPage" },
                  { type: "multilingualPage" },
                  { type: "hoursNutritionPage" },
                  { type: "parentsPage" },
                  { type: "galleryPage" },
                  { type: "contactPage" },
                  { type: "blogPage" },
                  { type: "blogPost" }
                ],
                validation: (rule) => rule.required(),
              },
            ],
          },
        ],
      },
      of: [{ type: "inlineBusinessDetail" }],
    },
    { type: "contentImage" },
  ],
});
