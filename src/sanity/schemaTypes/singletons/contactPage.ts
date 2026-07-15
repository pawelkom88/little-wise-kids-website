import { defineType, defineField } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "enquiryPanel", title: "Enquiry Panel" },
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
      type: "pagePortableText",
      group: "hero",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "enquiryPanelTitle",
      title: "Enquiry Panel Title",
      description: "Title of the panel.",
      type: "string",
      group: "enquiryPanel",
      validation: (rule) => rule.required().max(50),
    }),
    defineField({
      name: "formIntro",
      title: "Form Intro",
      description: "Text above the form.",
      type: "text",
      group: "enquiryPanel",
      validation: (rule) => rule.required().max(150),
    }),
    defineField({
      name: "enquiryPanelCtaLabel",
      title: "Enquiry Panel CTA Label",
      description: "Button text.",
      type: "string",
      group: "enquiryPanel",
      validation: (rule) => rule.required().max(30),
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
      type: "pagePortableText",
      group: "nextSteps",
      validation: (rule) => rule.required(),
    }),
    ...["stepOne", "stepTwo", "stepThree", "stepFour"].map((slot) =>
      defineField({
        name: slot,
        title: `Step ${slot.replace("step", "")}`,
        description: `Fixed content for ${slot}.`,
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
      description: "The main H2 heading.",
      type: "string",
      group: "location",
      validation: (rule) => rule.required().max(80),
    }),
  ],
});
