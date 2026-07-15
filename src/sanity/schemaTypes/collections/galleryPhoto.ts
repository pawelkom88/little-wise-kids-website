import { defineType, defineField } from "sanity";
import { ImageIcon } from "@sanity/icons";

export const galleryPhoto = defineType({
  name: "galleryPhoto",
  title: "Gallery Photo",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({ name: "internalTitle", title: "Internal Title", type: "string" }),
    defineField({ name: "image", title: "Image", type: "contentImage" }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Outdoor Learning Experience", value: "outdoor-learning-experience" },
          { title: "Indoor Learning Experience", value: "indoor-learning-experience" },
          { title: "Language Immersion", value: "language-immersion" },
          { title: "Nutrition and Mealtimes", value: "nutrition-and-mealtimes" },
          { title: "Creative Play", value: "creative-play" },
          { title: "Sensory Exploration", value: "sensory-exploration" },
          { title: "Nature and Gardening", value: "nature-and-gardening" },
          { title: "Celebrations and Community", value: "celebrations-and-community" }
        ]
      }
    }),
    defineField({ name: "showOnHomepage", title: "Show On Homepage", type: "boolean" }),
    defineField({ name: "displayOrder", title: "Display Order", type: "number" }),
  ],
});
