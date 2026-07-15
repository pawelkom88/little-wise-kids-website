import { defineType, defineField } from "sanity";

export const blogPage = defineType({
  name: "blogPage",
  title: "Blog Index Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "latestArticles", title: "Latest Articles" },
  ],
  fields: [
    defineField({ name: "heroTitle", title: "Hero Title", type: "string", group: "hero" }),
    defineField({ name: "heroParagraphs", title: "Hero Paragraphs", type: "constrainedPortableText", group: "hero" }),

    defineField({ name: "latestArticlesEyebrow", title: "Latest Articles Eyebrow", type: "string", group: "latestArticles" }),
    defineField({ name: "latestArticlesHeading", title: "Latest Articles Heading", type: "string", group: "latestArticles" }),
    defineField({ name: "latestArticlesIntro", title: "Latest Articles Intro", type: "text", group: "latestArticles" }),
  ],
});
