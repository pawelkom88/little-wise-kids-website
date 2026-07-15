import { defineType, defineField } from "sanity";

export const thankYouPage = defineType({
  name: "thankYouPage",
  title: "Thank You Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "nextSteps", title: "Next Steps" },
  ],
  fields: [
    defineField({ name: "heroEyebrow", title: "Hero Eyebrow", type: "string", group: "hero" }),
    defineField({ name: "heroTitleFragments", title: "Hero Title Fragments", type: "array", of: [{ type: "string" }], group: "hero" }),
    defineField({ name: "heroConfirmationParagraph", title: "Confirmation Paragraph", type: "text", group: "hero" }),

    defineField({ name: "nextStepsEyebrow", title: "Next Steps Eyebrow", type: "string", group: "nextSteps" }),
    defineField({ name: "nextStepsHeading", title: "Next Steps Heading", type: "string", group: "nextSteps" }),
    defineField({ name: "nextStepsBody", title: "Next Steps Body", type: "text", group: "nextSteps" }),
    defineField({ name: "primaryCtaLabel", title: "Primary CTA Label", type: "string", group: "nextSteps" }),
    defineField({ name: "secondaryCtaLabel", title: "Secondary CTA Label", type: "string", group: "nextSteps" }),
  ],
});
