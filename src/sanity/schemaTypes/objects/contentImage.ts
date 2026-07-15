import { defineType, defineField } from "sanity";

export const contentImage = defineType({
  name: "contentImage",
  title: "Image",
  type: "image",
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: "isDecorative",
      title: "Is this image purely decorative?",
      description:
        "Check this box if the image does not add any meaningful context or information. This will hide it from screen readers.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "altText",
      title: "Alternative Text",
      description:
        "Required if the image is not decorative. Describe the image for visually impaired users.",
      type: "string",
      hidden: ({ parent }) => parent?.isDecorative,
      validation: (rule) =>
        rule.custom((altText, context) => {
          const parent = context.parent as any;
          if (!parent?.isDecorative && !altText) {
            return "Alternative text is required for non-decorative images.";
          }
          return true;
        }),
    }),
    defineField({
      name: "caption",
      title: "Caption (Optional)",
      description: "A visible caption to display below the image.",
      type: "string",
    }),
  ],
});
