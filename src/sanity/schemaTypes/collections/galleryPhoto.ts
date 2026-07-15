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
      description: "The photo to display in the gallery.",
      type: "contentImage" 
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
      name: "displayOrder",
      title: "Display Order",
      description: "Lower numbers appear first.",
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
});
