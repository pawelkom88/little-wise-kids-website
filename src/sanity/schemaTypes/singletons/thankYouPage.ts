import { defineType, defineField } from "sanity";

export const thankYouPage = defineType({
  name: "thankYouPage",
  title: "Thank You Page",
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
      name: "primaryCtaLabel",
      title: "Primary CTA Label",
      description: "Text for the 'Return Home' button.",
      type: "string",
      validation: (rule) => rule.required().max(30),
    }),
    defineField({
      name: "secondaryCtaLabel",
      title: "Secondary CTA Label",
      description: "Text for the secondary CTA button.",
      type: "string",
      validation: (rule) => rule.required().max(30),
    }),
    defineField({
      name: "nextStepsEyebrow",
      title: "Next Steps Eyebrow",
      description: "Optional small text above the next steps heading.",
      type: "string",
      validation: (rule) => rule.max(30),
    }),
    defineField({
      name: "nextStepsHeading",
      title: "Next Steps Heading",
      description: "The main heading for the next steps section.",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "nextStepsBody",
      title: "Next Steps Body",
      description: "The paragraphs explaining the next steps.",
      type: "pagePortableText",
      validation: (rule) => rule.required(),
    }),
  ],
});
