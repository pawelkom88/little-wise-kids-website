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
      description: "The eyebrow label, e.g. 'Our setting'.",
      type: "string",
      group: "location",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "locationHeading",
      title: "Location Section Heading",
      description: "The main H2 heading, e.g. 'Find Little Wise Kids in Easton, Bristol'.",
      type: "string",
      group: "location",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "locationLead",
      title: "Location Lead Paragraph",
      description: "Introductory paragraph for the location section.",
      type: "text",
      group: "location",
    }),
    defineField({
      name: "welcomeHeading",
      title: "Welcome Box Heading",
      description: "e.g. 'We can’t wait to welcome you.'",
      type: "string",
      group: "location",
    }),
    defineField({
      name: "welcomeText",
      title: "Welcome Box Text",
      description: "e.g. 'If you need any help finding us, just give us a call.'",
      type: "string",
      group: "location",
    }),
    ...["findBuildingStep", "turnStreetStep", "lookForSignStep"].map((slot) =>
      defineField({
        name: slot,
        title: slot === "findBuildingStep" ? "Step 1: Find Building" : slot === "turnStreetStep" ? "Step 2: Turn Into Street" : "Step 3: Look For Sign",
        description: `Content for the '${slot}' step in the location guide.`,
        type: "object",
        group: "location",
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
          defineField({
            name: "alt",
            type: "string",
            title: "Image Alt Text",
            description: "Descriptive alt text for the step image.",
          }),
        ],
      })
    ),
  ],
});
