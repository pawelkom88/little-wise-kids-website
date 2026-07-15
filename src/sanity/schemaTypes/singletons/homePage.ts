import { defineType, defineField } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "valuesIntro", title: "Values Intro" },
    { name: "valuesDifference", title: "Values Difference" },
    { name: "visit", title: "Visit" },
    { name: "faq", title: "FAQ" },
    { name: "gallery", title: "Gallery Intro" },
  ],
  fields: [
    defineField({ name: "heroTitleFragments", title: "Title Fragments", type: "array", of: [{ type: "string" }], group: "hero" }),
    defineField({ name: "heroSubtitle", title: "Subtitle", type: "string", group: "hero" }),
    defineField({ name: "heroParagraphs", title: "Paragraphs", type: "constrainedPortableText", group: "hero" }),
    defineField({ name: "primaryCtaLabel", title: "Primary CTA Label", type: "string", group: "hero" }),
    defineField({ name: "secondaryCtaLabel", title: "Secondary CTA Label", type: "string", group: "hero" }),
    defineField({
      name: "childCentredFeature",
      title: "Child-Centred Feature",
      type: "object",
      group: "hero",
      fields: [
        defineField({ name: "title", type: "string", title: "Title" }),
        defineField({ name: "description", type: "text", title: "Description" })
      ]
    }),
    defineField({
      name: "playToLearnFeature",
      title: "Play-to-Learn Feature",
      type: "object",
      group: "hero",
      fields: [
        defineField({ name: "title", type: "string", title: "Title" }),
        defineField({ name: "description", type: "text", title: "Description" })
      ]
    }),
    defineField({
      name: "nurturingEnvironmentFeature",
      title: "Nurturing Environment Feature",
      type: "object",
      group: "hero",
      fields: [
        defineField({ name: "title", type: "string", title: "Title" }),
        defineField({ name: "description", type: "text", title: "Description" })
      ]
    }),
    defineField({ name: "valuesIntroTitleFragments", title: "Values Intro Title Fragments", type: "array", of: [{ type: "string" }], group: "valuesIntro" }),
    defineField({ name: "valuesIntroParagraphs", title: "Values Intro Paragraphs", type: "constrainedPortableText", group: "valuesIntro" }),
    defineField({ name: "valuesDifferenceTitle", title: "Values Difference Title", type: "string", group: "valuesDifference" }),
    defineField({
      name: "screenFreeCard",
      title: "Screen-Free Card",
      type: "object",
      group: "valuesDifference",
      fields: [defineField({ name: "title", type: "string" }), defineField({ name: "description", type: "text" })]
    }),
    defineField({
      name: "multilingualCard",
      title: "Multilingual Card",
      type: "object",
      group: "valuesDifference",
      fields: [defineField({ name: "title", type: "string" }), defineField({ name: "description", type: "text" })]
    }),
    defineField({
      name: "nutritionCard",
      title: "Nutrition Card",
      type: "object",
      group: "valuesDifference",
      fields: [defineField({ name: "title", type: "string" }), defineField({ name: "description", type: "text" })]
    }),
    defineField({
      name: "natureCard",
      title: "Nature Card",
      type: "object",
      group: "valuesDifference",
      fields: [defineField({ name: "title", type: "string" }), defineField({ name: "description", type: "text" })]
    }),
    defineField({
      name: "communityCard",
      title: "Community Card",
      type: "object",
      group: "valuesDifference",
      fields: [defineField({ name: "title", type: "string" }), defineField({ name: "description", type: "text" })]
    }),
    defineField({
      name: "childLedCard",
      title: "Child-Led Card",
      type: "object",
      group: "valuesDifference",
      fields: [defineField({ name: "title", type: "string" }), defineField({ name: "description", type: "text" })]
    }),
    defineField({ name: "visitTitleFragments", title: "Visit Title Fragments", type: "array", of: [{ type: "string" }], group: "visit" }),
    defineField({ name: "visitParagraphs", title: "Visit Paragraphs", type: "constrainedPortableText", group: "visit" }),
    defineField({ name: "visitCtaLabel", title: "Visit CTA Label", type: "string", group: "visit" }),
    defineField({ name: "visitImage", title: "Visit Image", type: "contentImage", group: "visit" }),
    defineField({ name: "testimonialQuote", title: "Testimonial Quote", type: "text", group: "visit" }),
    defineField({ name: "testimonialAttribution", title: "Testimonial Attribution", type: "string", group: "visit" }),
    defineField({ name: "faqTitleFragments", title: "FAQ Title Fragments", type: "array", of: [{ type: "string" }], group: "faq" }),
    defineField({ name: "faqIntro", title: "FAQ Intro", type: "text", group: "faq" }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      group: "faq",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", type: "string", title: "Question" }),
            defineField({ name: "answer", type: "text", title: "Answer" })
          ]
        }
      ]
    }),
    defineField({ name: "helpPanelTitle", title: "Help Panel Title", type: "string", group: "faq" }),
    defineField({ name: "helpPanelCopy", title: "Help Panel Copy", type: "text", group: "faq" }),
    defineField({ name: "helpPanelCtaLabel", title: "Help Panel CTA Label", type: "string", group: "faq" }),
    defineField({ name: "galleryIntroTitle", title: "Gallery Intro Title", type: "string", group: "gallery" }),
    defineField({ name: "galleryIntro", title: "Gallery Intro", type: "text", group: "gallery" }),
  ],
});
