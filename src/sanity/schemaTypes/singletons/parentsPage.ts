import { defineType, defineField } from "sanity";

export const parentsPage = defineType({
  name: "parentsPage",
  title: "Parents' Info Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "startingSchool", title: "Starting School" },
    { name: "feesFunding", title: "Fees & Funding" },
    { name: "partnership", title: "Partnership" },
    { name: "settlingIn", title: "Settling In" },
    { name: "policies", title: "Policies" },
  ],
  fields: [
    // Hero
    defineField({ name: "heroTitle", title: "Hero Title", type: "string", group: "hero" }),
    defineField({ name: "heroParagraphs", title: "Hero Paragraphs", type: "constrainedPortableText", group: "hero" }),
    
    // Starting School
    defineField({ name: "startingSchoolTitle", title: "Starting School Title", type: "string", group: "startingSchool" }),
    defineField({ name: "startingSchoolParagraphs", title: "Starting School Paragraphs", type: "constrainedPortableText", group: "startingSchool" }),
    defineField({ name: "schoolSupport", title: "School Support", type: "array", of: [{ type: "string" }], group: "startingSchool" }),

    // Fees & Funding
    defineField({ name: "feesFundingTitle", title: "Fees & Funding Title", type: "string", group: "feesFunding" }),
    defineField({ name: "feesFundingParagraphs", title: "Fees & Funding Paragraphs", type: "constrainedPortableText", group: "feesFunding" }),

    defineField({ name: "howFundingWorksTitle", title: "How Funding Works Title", type: "string", group: "feesFunding" }),
    defineField({ name: "howFundingWorksParagraphs", title: "How Funding Works Paragraphs", type: "constrainedPortableText", group: "feesFunding" }),
    defineField({
      name: "fundingExamples",
      title: "Funding Examples",
      type: "array",
      group: "feesFunding",
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

    defineField({ name: "fundingSupportTitle", title: "Funding Support Title", type: "string", group: "feesFunding" }),
    defineField({ name: "fundingSupportParagraphs", title: "Funding Support Paragraphs", type: "constrainedPortableText", group: "feesFunding" }),

    defineField({ name: "taxFreeTitle", title: "Tax-Free Title", type: "string", group: "feesFunding" }),
    defineField({ name: "taxFreeParagraphs", title: "Tax-Free Paragraphs", type: "constrainedPortableText", group: "feesFunding" }),

    defineField({ name: "weeklyFeesTitle", title: "Weekly Fees Title", type: "string", group: "feesFunding" }),
    defineField({ name: "weeklyFeesParagraphs", title: "Weekly Fees Paragraphs", type: "constrainedPortableText", group: "feesFunding" }),
    defineField({
      name: "feeRows",
      title: "Fee Rows",
      type: "array",
      group: "feesFunding",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", title: "Label" }),
            defineField({ name: "value", type: "string", title: "Value" })
          ]
        }
      ]
    }),

    defineField({
      name: "subsidyFaqs",
      title: "Subsidy FAQs",
      type: "array",
      group: "feesFunding",
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

    // Partnership
    defineField({ name: "partnershipTitle", title: "Partnership Title", type: "string", group: "partnership" }),
    defineField({ name: "partnershipParagraphs", title: "Partnership Paragraphs", type: "constrainedPortableText", group: "partnership" }),

    // Settling In
    defineField({ name: "settlingInTitle", title: "Settling In Title", type: "string", group: "settlingIn" }),
    defineField({ name: "settlingInParagraphs", title: "Settling In Paragraphs", type: "constrainedPortableText", group: "settlingIn" }),
    defineField({ name: "partnershipText", title: "Partnership Text", type: "text", group: "settlingIn" }),
    defineField({ name: "settlingStrategies", title: "Settling Strategies", type: "array", of: [{ type: "string" }], group: "settlingIn" }),

    // Policies
    defineField({ name: "policiesHeading", title: "Policies Heading", type: "string", group: "policies" }),
    defineField({ name: "policiesIntroduction", title: "Policies Introduction", type: "text", group: "policies" }),
    defineField({ name: "policiesSupportingNote", title: "Policies Supporting Note", type: "text", group: "policies" }),
  ],
});
