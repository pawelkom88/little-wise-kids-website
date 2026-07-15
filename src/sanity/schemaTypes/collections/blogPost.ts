import { defineType, defineField } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text" }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Nursery News", value: "nursery-news" },
          { title: "Early Learning", value: "early-learning" },
          { title: "Parenting Tips", value: "parenting-tips" },
          { title: "Nutrition", value: "nutrition" },
          { title: "Community", value: "community" }
        ]
      }
    }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({ name: "featured", title: "Featured", type: "boolean" }),
    defineField({ name: "featuredImage", title: "Featured Image", type: "strictImage" }),
    defineField({ name: "body", title: "Body", type: "constrainedPortableText" }),
  ],
});
