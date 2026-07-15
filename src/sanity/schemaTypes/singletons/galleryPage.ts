import { defineType, defineField } from "sanity";

export const galleryPage = defineType({
  name: "galleryPage",
  title: "Gallery Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "gallery", title: "Gallery Intro" },
    { name: "finalCta", title: "Final CTA" },
  ],
  fields: [
    defineField({ name: "heroTitle", title: "Hero Title", type: "string", group: "hero" }),
    defineField({ name: "heroParagraphs", title: "Hero Paragraphs", type: "constrainedPortableText", group: "hero" }),
    defineField({ name: "heroCtaLabel", title: "Hero CTA Label", type: "string", group: "hero" }),

    defineField({ name: "galleryIntroTitle", title: "Gallery Intro Title", type: "string", group: "gallery" }),
    defineField({ name: "galleryIntro", title: "Gallery Intro", type: "text", group: "gallery" }),

    defineField({ name: "finalCtaHeading", title: "Final CTA Heading", type: "string", group: "finalCta" }),
    defineField({ name: "finalCtaCopy", title: "Final CTA Copy", type: "text", group: "finalCta" }),
    defineField({ name: "finalCtaLabel", title: "Final CTA Label", type: "string", group: "finalCta" }),
  ],
});
