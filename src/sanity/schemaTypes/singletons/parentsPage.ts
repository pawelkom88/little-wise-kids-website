import { defineType, defineField } from "sanity";

const sectionLabelValidation = (rule: import("sanity").StringRule) =>
  rule.required().max(50);

const sectionHeadingValidation = (rule: import("sanity").StringRule) =>
  rule.required().max(100);

export const parentsPage = defineType({
  name: "parentsPage",
  title: "Parents' Information",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "startingSchool", title: "Starting School" },
    { name: "feesFunding", title: "Fees & Funding" },
    { name: "howFundingWorks", title: "How Funding Works" },
    { name: "fundingSupport", title: "Funding Support" },
    { name: "taxFree", title: "Tax-Free Childcare" },
    { name: "weeklyFees", title: "Weekly Fees" },
    { name: "subsidyFaqs", title: "Childcare Support FAQs" },
    { name: "partnership", title: "Partnership With Families" },
    { name: "settlingIn", title: "Settling In" },
    { name: "policies", title: "Policies" },
  ],
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      description: "Optional small text above the page title.",
      type: "string",
      group: "hero",
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: "heroTitleLineOne",
      title: "Hero Title — Line One",
      type: "string",
      group: "hero",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "heroTitleLineTwo",
      title: "Hero Title — Line Two",
      type: "string",
      group: "hero",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "heroParagraphs",
      title: "Hero Paragraphs",
      type: "pagePortableText",
      group: "hero",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "startingSchoolLabel",
      title: "Starting School Label",
      type: "string",
      group: "startingSchool",
      validation: sectionLabelValidation,
    }),
    defineField({
      name: "startingSchoolHeading",
      title: "Starting School Heading",
      type: "string",
      group: "startingSchool",
      validation: sectionHeadingValidation,
    }),
    defineField({
      name: "startingSchoolParagraphs",
      title: "Starting School Paragraphs",
      type: "pagePortableText",
      group: "startingSchool",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "schoolSupportHeading",
      title: "School Support List Heading",
      type: "string",
      group: "startingSchool",
      validation: sectionHeadingValidation,
    }),
    defineField({
      name: "schoolSupport",
      title: "School Support Items",
      description: "The six ways Little Wise Kids supports school readiness.",
      type: "array",
      group: "startingSchool",
      of: [{ type: "string", validation: (rule) => rule.required().max(120) }],
      validation: (rule) => rule.required().length(6),
    }),

    defineField({
      name: "feesFundingLabel",
      title: "Fees & Funding Label",
      type: "string",
      group: "feesFunding",
      validation: sectionLabelValidation,
    }),
    defineField({
      name: "feesFundingHeading",
      title: "Fees & Funding Heading",
      type: "string",
      group: "feesFunding",
      validation: sectionHeadingValidation,
    }),
    defineField({
      name: "feesFundingParagraphs",
      title: "Fees & Funding Paragraphs",
      type: "pagePortableText",
      group: "feesFunding",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "howFundingWorksLabel",
      title: "How Funding Works Label",
      type: "string",
      group: "howFundingWorks",
      validation: sectionLabelValidation,
    }),
    defineField({
      name: "howFundingWorksHeading",
      title: "How Funding Works Heading",
      type: "string",
      group: "howFundingWorks",
      validation: sectionHeadingValidation,
    }),
    defineField({
      name: "howFundingWorksParagraphs",
      title: "How Funding Works Paragraphs",
      type: "pagePortableText",
      group: "howFundingWorks",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fundingExamplesHeading",
      title: "Funding Examples Heading",
      type: "string",
      group: "howFundingWorks",
      validation: sectionHeadingValidation,
    }),
    defineField({
      name: "fundingExamples",
      title: "Current Funding Examples",
      description:
        "Illustrative stretched-funding calculations. Review these whenever funding rules change.",
      type: "array",
      group: "howFundingWorks",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "entitlement",
              title: "Entitlement",
              type: "string",
              validation: (rule) => rule.required().max(80),
            }),
            defineField({
              name: "equivalent",
              title: "Equivalent Across 51 Weeks",
              type: "string",
              validation: (rule) => rule.required().max(160),
            }),
          ],
          preview: {
            select: { title: "entitlement", subtitle: "equivalent" },
          },
        },
      ],
      validation: (rule) => rule.required().length(2),
    }),
    defineField({
      name: "fundingAdditionalFeesNote",
      title: "Additional Fees Note",
      type: "text",
      rows: 3,
      group: "howFundingWorks",
      validation: (rule) => rule.required().max(400),
    }),

    defineField({
      name: "fundingSupportLabel",
      title: "Funding Support Label",
      type: "string",
      group: "fundingSupport",
      validation: sectionLabelValidation,
    }),
    defineField({
      name: "fundingSupportHeading",
      title: "Funding Support Heading",
      type: "string",
      group: "fundingSupport",
      validation: sectionHeadingValidation,
    }),
    defineField({
      name: "fundingSupportParagraphs",
      title: "Funding Support Paragraphs",
      type: "pagePortableText",
      group: "fundingSupport",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fundingGuidanceUrl",
      title: "Government Childcare Guidance URL",
      type: "url",
      group: "fundingSupport",
      validation: (rule) =>
        rule
          .required()
          .uri({ scheme: ["https"] })
          .error("Use a secure HTTPS URL."),
    }),

    defineField({
      name: "taxFreeLabel",
      title: "Tax-Free Childcare Label",
      type: "string",
      group: "taxFree",
      validation: sectionLabelValidation,
    }),
    defineField({
      name: "taxFreeHeading",
      title: "Tax-Free Childcare Heading",
      type: "string",
      group: "taxFree",
      validation: sectionHeadingValidation,
    }),
    defineField({
      name: "taxFreeParagraphs",
      title: "Tax-Free Childcare Paragraphs",
      type: "pagePortableText",
      group: "taxFree",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "taxFreeGuidanceUrl",
      title: "Tax-Free Childcare Guidance URL",
      type: "url",
      group: "taxFree",
      validation: (rule) =>
        rule
          .required()
          .uri({ scheme: ["https"] })
          .error("Use a secure HTTPS URL."),
    }),

    defineField({
      name: "weeklyFeesLabel",
      title: "Weekly Fees Label",
      type: "string",
      group: "weeklyFees",
      validation: sectionLabelValidation,
    }),
    defineField({
      name: "weeklyFeesHeading",
      title: "Weekly Fees Heading",
      type: "string",
      group: "weeklyFees",
      validation: sectionHeadingValidation,
    }),
    defineField({
      name: "weeklyFeesParagraphs",
      title: "Weekly Fees Paragraphs",
      type: "pagePortableText",
      group: "weeklyFees",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "weeklyFeesFactors",
      title: "Factors Affecting Weekly Fees",
      type: "array",
      group: "weeklyFees",
      of: [{ type: "string", validation: (rule) => rule.required().max(80) }],
      validation: (rule) => rule.required().length(3),
    }),
    ...[
      ["fullDayRate", "Full-Day Rate"],
      ["halfDayRate", "Half-Day Rate"],
      ["fundedHourDeductions", "Funded-Hour Deductions"],
      ["additionalCharges", "Additional Charges"],
      ["exampleWeeklyCosts", "Example Weekly Costs"],
    ].map(([name, title]) =>
      defineField({
        name,
        title,
        description: "Editable current information displayed in the fee table.",
        type: "string",
        group: "weeklyFees",
        validation: (rule) => rule.required().max(120),
      }),
    ),

    defineField({
      name: "subsidyFaqsLabel",
      title: "Childcare Support FAQs Label",
      type: "string",
      group: "subsidyFaqs",
      validation: sectionLabelValidation,
    }),
    defineField({
      name: "subsidyFaqsHeading",
      title: "Childcare Support FAQs Heading",
      type: "string",
      group: "subsidyFaqs",
      validation: sectionHeadingValidation,
    }),
    defineField({
      name: "subsidyFaqsParagraphs",
      title: "Childcare Support FAQs Introduction",
      type: "pagePortableText",
      group: "subsidyFaqs",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subsidyFaqs",
      title: "Childcare Support FAQs",
      type: "array",
      group: "subsidyFaqs",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (rule) => rule.required().max(140),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 4,
              validation: (rule) => rule.required().max(600),
            }),
          ],
          preview: { select: { title: "question", subtitle: "answer" } },
        },
      ],
      validation: (rule) => rule.required().length(5),
    }),

    defineField({
      name: "partnershipLabel",
      title: "Partnership Label",
      type: "string",
      group: "partnership",
      validation: sectionLabelValidation,
    }),
    defineField({
      name: "partnershipHeading",
      title: "Partnership Heading",
      type: "string",
      group: "partnership",
      validation: sectionHeadingValidation,
    }),
    defineField({
      name: "partnershipParagraphs",
      title: "Partnership Paragraphs",
      type: "pagePortableText",
      group: "partnership",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "partnershipHighlights",
      title: "Partnership Highlights",
      description: "Three concise summaries drawn from the partnership copy.",
      type: "array",
      group: "partnership",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required().max(60),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required().max(240),
            }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
      validation: (rule) => rule.required().length(3),
    }),

    defineField({
      name: "settlingInLabel",
      title: "Settling In Label",
      type: "string",
      group: "settlingIn",
      validation: sectionLabelValidation,
    }),
    defineField({
      name: "settlingInHeading",
      title: "Settling In Heading",
      type: "string",
      group: "settlingIn",
      validation: sectionHeadingValidation,
    }),
    defineField({
      name: "settlingInParagraphs",
      title: "Settling In Paragraphs",
      type: "pagePortableText",
      group: "settlingIn",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "settlingPartnershipHeading",
      title: "Partnership From the First Day Heading",
      type: "string",
      group: "settlingIn",
      validation: sectionHeadingValidation,
    }),
    defineField({
      name: "settlingPartnershipParagraphs",
      title: "Partnership From the First Day Paragraphs",
      type: "pagePortableText",
      group: "settlingIn",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "settlingStrategiesHeading",
      title: "Transition Strategies Heading",
      type: "string",
      group: "settlingIn",
      validation: sectionHeadingValidation,
    }),
    defineField({
      name: "settlingStrategiesIntro",
      title: "Transition Strategies Introduction",
      type: "text",
      rows: 3,
      group: "settlingIn",
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: "settlingStrategies",
      title: "Flexible Transition Strategies",
      type: "array",
      group: "settlingIn",
      of: [{ type: "string", validation: (rule) => rule.required().max(120) }],
      validation: (rule) => rule.required().length(6),
    }),

    defineField({
      name: "policiesHeading",
      title: "Policies Heading",
      type: "string",
      group: "policies",
      validation: sectionHeadingValidation,
    }),
    defineField({
      name: "policiesIntro",
      title: "Policies Introduction",
      type: "pagePortableText",
      group: "policies",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "policiesSupportingNote",
      title: "Policies Supporting Note",
      description:
        "Supporting text beside the Sanity-managed policy document list.",
      type: "text",
      rows: 4,
      group: "policies",
      validation: (rule) => rule.required().max(300),
    }),
  ],
});
