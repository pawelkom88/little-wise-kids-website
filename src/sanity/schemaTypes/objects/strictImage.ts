import { defineType, defineField } from "sanity";

export const strictImage = defineType({
  name: "strictImage",
  title: "Featured Image",
  type: "image",
  options: { hotspot: true },
  validation: (rule) => rule.required().assetRequired(),
  fields: [
    defineField({
      name: "altText",
      title: "Image description",
      description: "Required. Describe the activity or information shown for someone who cannot see the image. Do not begin with “Image of”.",
      type: "string",
      validation: (rule) =>
        rule.required().error("Image description is required."),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      description: "An optional visible caption.",
      type: "string",
    }),
  ],
});
