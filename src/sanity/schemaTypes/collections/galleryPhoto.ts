import { defineType, defineField } from "sanity";
import { ImageIcon } from "@sanity/icons/Image";

export const galleryPhoto = defineType({
  name: "galleryPhoto",
  title: "Gallery Photo",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "internalTitle",
      title: "Internal Title",
      description: "For internal CMS organization only. E.g., 'Messy play Aug 2026'.",
      type: "string",
    }),
    defineField({ 
      name: "image", 
      title: "Image", 
      description: "The photo to display in the gallery. Alt text is strictly required.",
      type: "strictImage",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "category",
      title: "Category",
      description: "The category for this photo in the gallery.",
      type: "string",
      options: {
        list: [
          {
            title: "Outdoor Learning Experience",
            value: "outdoor-learning-experience",
          },
          {
            title: "Indoor Learning Experience",
            value: "indoor-learning-experience",
          },
          { title: "Language Immersion", value: "language-immersion" },
          {
            title: "Nutrition and Mealtimes",
            value: "nutrition-and-mealtimes",
          },
          { title: "Creative Play", value: "creative-play" },
          { title: "Sensory Exploration", value: "sensory-exploration" },
          { title: "Nature and Gardening", value: "nature-and-gardening" },
          {
            title: "Celebrations and Community",
            value: "celebrations-and-community",
          },
        ],
      },
    }),
    defineField({
      name: "showOnHomepage",
      title: "Show On Homepage",
      description: "Toggle to feature this photo on the home page gallery preview.",
      type: "boolean",
    }),
    defineField({
      name: "homepageDisplayOrder",
      title: "Homepage Display Order",
      description: "Lower numbers appear first on the homepage gallery.",
      type: "number",
    }),
    defineField({
      name: "publicCaption",
      title: "Public Caption",
      description: "Visible caption shown to visitors. Leave blank to hide the label entirely.",
      type: "string",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "displayOrder",
      title: "Gallery Page Display Order",
      description: "Lower numbers appear first on the full Gallery page.",
      type: "number",
    }),
    defineField({
      name: "showOnAboutPage",
      title: "Show On About Page",
      description: "Toggle to feature this photo in the About page activity gallery.",
      type: "boolean",
    }),
    defineField({
      name: "aboutPageDisplayOrder",
      title: "About Page Display Order",
      description: "Lower numbers appear first on the About page gallery.",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "internalTitle",
      subtitle: "category",
      media: "image",
    },
  },
  orderings: [
    {
      title: "Category, then Title",
      name: "categoryAsc",
      by: [
        { field: "category", direction: "asc" },
        { field: "internalTitle", direction: "asc" },
      ],
    },
  ],
});
