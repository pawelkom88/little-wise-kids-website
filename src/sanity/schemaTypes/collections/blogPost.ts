import { defineType, defineField } from "sanity";
import { DocumentIcon } from "@sanity/icons/Document";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "publicationStatus",
      title: "Publication status",
      type: "string",
      initialValue: "draft",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      description: "The title of the blog post.",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "The URL path for the post. Generate from the title.",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      description: "The publish date and time of the post. Sorted by Published Date.",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Feature this post",
      description:
        "Turn this on to display the post in the featured position on the Blog page.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "category",
      title: "Category",
      description: "The category the post belongs to.",
      type: "string",
      options: {
        list: [
          { title: "Childcare News", value: "nursery-news" },
          { title: "Early Learning", value: "early-learning" },
          { title: "Parenting Tips", value: "parenting-tips" },
          { title: "Nutrition", value: "nutrition" },
          { title: "Community", value: "community" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description: "Short summary for the blog card.",
      type: "text",
      validation: (rule) => rule.required().max(150),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      description: "The main image used for the post header and thumbnail cards.",
      type: "strictImage",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body Content",
      description: "The main content of the post.",
      type: "blogPortableText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "authorName",
      title: "Author Name",
      description: "The name of the author or reviewer for this post.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "authorRole",
      title: "Author Role",
      description: "The role of the author (e.g. 'Setting Manager').",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      date: "publishedAt",
      media: "featuredImage",
    },
    prepare(selection) {
      const { title, subtitle, date, media } = selection;
      return {
        title,
        subtitle: `${subtitle} | ${date ? new Date(date).toLocaleDateString() : ""}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Published Date, Old",
      name: "publishedAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
  ],
});
