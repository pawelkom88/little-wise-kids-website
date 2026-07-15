import { defineType, defineField } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "formSection", title: "Form Section" },
    { name: "nextSteps", title: "Next Steps" },
    { name: "location", title: "Location" },
  ],
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      description: "Optional small text above title.",
      type: "string",
      group: "hero",
      validation: (rule) => rule.max(30),
    }),
    defineField({
      name: "heroTitleLineOne",
      title: "Hero Title - Line One",
      description: "First line of main heading.",
      type: "string",
      group: "hero",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "heroTitleLineTwo",
      title: "Hero Title - Line Two",
      description: "Second line of main heading.",
      type: "string",
      group: "hero",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "heroParagraphs",
      title: "Hero Paragraphs",
      description: "Main introductory paragraphs.",
      type: "minimalPortableText",
      group: "hero",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "sectionLabel",
      title: "Section Label",
      description: "e.g. 'Get in Touch'",
      type: "string",
      group: "formSection",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "sectionHeading",
      title: "Section Heading",
      description: "e.g. 'Send Us a Message'",
      type: "string",
      group: "formSection",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "introduction",
      title: "Introduction",
      description: "Introductory paragraph above the form.",
      type: "minimalPortableText",
      group: "formSection",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "nextStepsLabel",
      title: "Next Steps Label",
      description: "The eyebrow label.",
      type: "string",
      group: "nextSteps",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "nextStepsHeading",
      title: "Next Steps Heading",
      description: "The main H2 heading.",
      type: "string",
      group: "nextSteps",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "nextStepsParagraphs",
      title: "Next Steps Paragraphs",
      description: "Text for this section.",
      type: "minimalPortableText",
      group: "nextSteps",
      validation: (rule) => rule.required(),
    }),
    ...["receiveEnquiryStep", "getInTouchStep", "helpWithNextStepsStep"].map((slot) =>
      defineField({
        name: slot,
        title: slot === "receiveEnquiryStep" ? "Step: Receive Enquiry" : slot === "getInTouchStep" ? "Step: Get in Touch" : "Step: Help With Next Steps",
        description: `Fixed content for the '${slot}' step. Step numbering is automatic.`,
        type: "object",
        group: "nextSteps",
        fields: [
          defineField({
            name: "title",
            type: "string",
            title: "Title",
            validation: (rule) => rule.required().max(60),
          }),
          defineField({
            name: "description",
            type: "text",
            title: "Description",
            validation: (rule) => rule.required().max(150),
          }),
        ],
        validation: (rule) => rule.required(),
      })
    ),
    
    defineField({
      name: "locationLabel",
      title: "Location Section Label",
      description: "The eyebrow label.",
      type: "string",
      group: "location",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "locationHeading",
      title: "Location Section Heading",
      description: "The main H2 heading. Note: the actual address, opening days, and hours shown in this section are pulled automatically from Business Details.",
      type: "string",
      group: "location",
      validation: (rule) => rule.required().max(80),
    }),
  ],
});
