import { defineType, defineField } from "sanity";

export const contentImage = defineType({
  name: "contentImage",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "isDecorative",
      title: "Is this image purely decorative?",
      description:
        "Check this box if the image does not add any meaningful context. This hides it from screen readers.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "altText",
      title: "Image description",
      description:
        "Required if the image is not decorative. Describe the activity or information shown for someone who cannot see the image. Do not begin with “Image of”.",
      type: "string",
      hidden: ({ parent }) => parent?.isDecorative,
      validation: (rule) =>
        rule.custom((altText, context) => {
          const parent = context.parent as { isDecorative?: boolean };
          if (!parent?.isDecorative && !altText) {
            return "Image description is required for non-decorative images.";
          }
          return true;
        }),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      description: "An optional visible caption to display below the image.",
      type: "string",
    }),
  ],
});
