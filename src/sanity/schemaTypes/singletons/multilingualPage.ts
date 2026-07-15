import { defineType, defineField } from "sanity";

export const multilingualPage = defineType({
  name: "multilingualPage",
  title: "Multilingual Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "philosophy", title: "Philosophy" },
    { name: "languageConnection", title: "Language Connection" },
    { name: "eyfs", title: "EYFS" },
    { name: "screenFree", title: "Screen-Free" },
  ],
  fields: [
    defineField({ name: "heroTitle", title: "Hero Title", type: "string", group: "hero" }),
    defineField({ name: "heroParagraphs", title: "Hero Paragraphs", type: "constrainedPortableText", group: "hero" }),
    
    defineField({ name: "philosophyTitle", title: "Philosophy Title", type: "string", group: "philosophy" }),
    defineField({ name: "philosophyParagraphs", title: "Philosophy Paragraphs", type: "constrainedPortableText", group: "philosophy" }),
    defineField({ name: "childrenEnjoyHeading", title: "Children Enjoy Heading", type: "string", group: "philosophy" }),
    defineField({ name: "philosophyPoints", title: "Philosophy Points", type: "array", of: [{ type: "string" }], group: "philosophy" }),

    defineField({ name: "languageConnectionTitle", title: "Language Connection Title", type: "string", group: "languageConnection" }),
    defineField({ name: "languageConnectionParagraphs", title: "Language Connection Paragraphs", type: "constrainedPortableText", group: "languageConnection" }),
    defineField({ name: "languageConnectionImage", title: "Language Connection Image", type: "contentImage", group: "languageConnection" }),

    defineField({ name: "eyfsTitle", title: "EYFS Title", type: "string", group: "eyfs" }),
    defineField({ name: "eyfsParagraphs", title: "EYFS Paragraphs", type: "constrainedPortableText", group: "eyfs" }),
    defineField({
      name: "eyfsAreas",
      title: "EYFS Areas",
      type: "object",
      group: "eyfs",
      fields: [
        defineField({ name: "communicationAndLanguage", title: "Communication and Language", type: "text" }),
        defineField({ name: "physicalDevelopment", title: "Physical Development", type: "text" }),
        defineField({ name: "personalSocialEmotional", title: "Personal, Social and Emotional Development", type: "text" }),
        defineField({ name: "literacy", title: "Literacy", type: "text" }),
        defineField({ name: "mathematics", title: "Mathematics", type: "text" }),
        defineField({ name: "understandingTheWorld", title: "Understanding the World", type: "text" }),
        defineField({ name: "expressiveArtsAndDesign", title: "Expressive Arts and Design", type: "text" }),
      ]
    }),

    defineField({ name: "screenFreeTitle", title: "Screen-Free Title", type: "string", group: "screenFree" }),
    defineField({ name: "screenFreeParagraphs", title: "Screen-Free Paragraphs", type: "constrainedPortableText", group: "screenFree" }),
    defineField({ name: "screenFreeBenefits", title: "Screen-Free Benefits", type: "array", of: [{ type: "string" }], group: "screenFree" }),
    defineField({ name: "screenFreeClosingNote", title: "Closing Note", type: "text", group: "screenFree" }),
  ],
});
