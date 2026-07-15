import { defineType, defineField } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "location", title: "Location" },
    { name: "message", title: "Message Form" },
    { name: "nextSteps", title: "Next Steps" },
  ],
  fields: [
    defineField({ name: "heroTitle", title: "Hero Title", type: "string", group: "hero" }),
    defineField({ name: "heroParagraphs", title: "Hero Paragraphs", type: "constrainedPortableText", group: "hero" }),

    defineField({ name: "locationHeading", title: "Location Heading", type: "string", group: "location" }),
    defineField({ name: "locationCopy", title: "Location Copy", type: "text", group: "location" }),

    defineField({ name: "messageIntroTitle", title: "Message Intro Title", type: "string", group: "message" }),
    defineField({ name: "messageIntro", title: "Message Intro", type: "text", group: "message" }),

    defineField({ name: "nextStepsTitle", title: "Next Steps Title", type: "string", group: "nextSteps" }),
    defineField({
      name: "nextSteps",
      title: "Next Steps",
      type: "array",
      group: "nextSteps",
      validation: Rule => Rule.max(3),
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", title: "Title" }),
            defineField({ name: "description", type: "text", title: "Description" })
          ]
        }
      ]
    }),
  ],
});
