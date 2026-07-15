import { defineType, defineField } from "sanity";

export const blogPage = defineType({
  name: "blogPage",
  title: "Blog Page",
  type: "document",
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      description: "Optional small text above title.",
      type: "string",
      validation: (rule) => rule.max(30),
    }),
    defineField({
      name: "heroTitleLineOne",
      title: "Hero Title - Line One",
      description: "First line of main heading.",
      type: "string",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "heroTitleLineTwo",
      title: "Hero Title - Line Two",
      description: "Second line of main heading.",
      type: "string",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "heroParagraphs",
      title: "Hero Paragraphs",
      description: "Main introductory paragraphs.",
      type: "pagePortableText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "latestArticlesEyebrow",
      title: "Latest Articles Eyebrow",
      description: "Optional small text above the articles grid.",
      type: "string",
      validation: (rule) => rule.max(30),
    }),
    defineField({
      name: "latestArticlesHeading",
      title: "Latest Articles Heading",
      description: "Heading for the latest articles grid.",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "latestArticlesIntroduction",
      title: "Latest Articles Introduction",
      description: "Optional introduction text before the articles.",
      type: "pagePortableText",
    }),
  ],
});
