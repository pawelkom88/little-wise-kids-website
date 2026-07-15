import { defineType, defineField } from "sanity";

export const strictImage = defineType({
  name: "strictImage",
  title: "Featured Image",
  type: "image",
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: "altText",
      title: "Alternative Text",
      description:
        "Required. Describe the image for visually impaired users. This image cannot be marked as decorative.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption (Optional)",
      description: "A visible caption to display below the image.",
      type: "string",
    }),
  ],
});
