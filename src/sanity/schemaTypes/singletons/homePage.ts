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
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      description: "Optional small text above the main title.",
      type: "string",
      group: "hero",
      validation: (rule) =>
        rule.max(30).warning("Keep the eyebrow very short."),
    }),
    defineField({
      name: "heroHeading",
      title: "Hero Heading",
      description: "The main heading on the homepage. Colours and line breaks are applied automatically.",
      type: "object",
      group: "hero",
      fields: [
        defineField({ name: "introduction", type: "string", title: "Introduction Text", description: "e.g. 'Welcome to'" }),
        defineField({ name: "purplePhrase", type: "string", title: "Purple Phrase", description: "e.g. 'Little'" }),
        defineField({ name: "greenPhrase", type: "string", title: "Green Phrase", description: "e.g. 'Wise'" }),
        defineField({ name: "bluePhrase", type: "string", title: "Blue Phrase", description: "e.g. 'Kids'" }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      description:
        "Appears directly below the main heading. One welcoming sentence.",
      type: "string",
      group: "hero",
      validation: (rule) => [
        rule.required().error("Required."),
        rule.max(110).warning("Keep this short so it wraps cleanly on mobile."),
      ],
    }),
    defineField({
      name: "heroParagraphs",
      title: "Hero Paragraphs",
      description: "The main introductory paragraphs. No headings allowed.",
      type: "minimalPortableText",
      group: "hero",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "primaryCtaLabel",
      title: "Primary CTA Label",
      description: "The text on the main action button.",
      type: "string",
      group: "hero",
      validation: (rule) => rule.required().max(30),
    }),
    defineField({
      name: "secondaryCtaLabel",
      title: "Secondary CTA Label",
      description: "The text on the secondary action button.",
      type: "string",
      group: "hero",
      validation: (rule) => rule.required().max(30),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      description: "The large image displayed in the hero section.",
      type: "contentImage",
      group: "hero",
      validation: (rule) => rule.required().assetRequired().error("A hero image is required."),
    }),
    defineField({
      name: "multilingualFeature",
      title: "Multilingual Feature",
      description: "The first feature slot below the hero.",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "title",
          type: "string",
          title: "Title",
          validation: (rule) => rule.required().max(40),
        }),
        defineField({
          name: "description",
          type: "text",
          title: "Description",
          validation: (rule) =>
            [rule.required(), rule.max(120).warning("Keep description concise.")],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "childCentredFeature",
      title: "Child-Centred Feature",
      description: "The second feature slot below the hero.",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "title",
          type: "string",
          title: "Title",
          validation: (rule) => rule.required().max(40),
        }),
        defineField({
          name: "description",
          type: "text",
          title: "Description",
          validation: (rule) =>
            [rule.required(), rule.max(120).warning("Keep description concise.")],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "playToLearnFeature",
      title: "Play to Learn Feature",
      description: "The third feature slot below the hero.",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "title",
          type: "string",
          title: "Title",
          validation: (rule) => rule.required().max(40),
        }),
        defineField({
          name: "description",
          type: "text",
          title: "Description",
          validation: (rule) =>
            [rule.required(), rule.max(120).warning("Keep description concise.")],
        }),
      ],
      validation: (rule) => rule.required(),
    }),

    // Values Intro
    defineField({
      name: "valuesIntroHeading",
      title: "Values Intro Heading",
      description:
        "The multicoloured heading structure for the Values section.",
      type: "object",
      group: "valuesIntro",
      fields: [
        defineField({
          name: "prefix",
          type: "string",
          title: "Prefix Text",
          description: "e.g. 'Where '",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "purplePhrase",
          type: "string",
          title: "Purple Phrase",
          description: "e.g. 'Feel Safe,'",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "greenPhrase",
          type: "string",
          title: "Green Phrase",
          description: "e.g. 'Seen'",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "connector",
          type: "string",
          title: "Connector Text",
          description: "e.g. 'and'",
          initialValue: " ",
        }),
        defineField({
          name: "bluePhrase",
          type: "string",
          title: "Blue Phrase",
          description: "e.g. 'Celebrated'",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "valuesIntroParagraphs",
      title: "Values Intro Paragraphs",
      description: "The paragraphs explaining your core values.",
      type: "minimalPortableText",
      group: "valuesIntro",
      validation: (rule) => rule.required(),
    }),

    // Values Difference
    defineField({
      name: "valuesDifferenceTitle",
      title: "Values Difference Section Title",
      description: "The title above the six values cards.",
      type: "string",
      group: "valuesDifference",
      validation: (rule) => rule.required().max(50),
    }),
    // 6 fixed cards
    ...[
      "screenFreeCard",
      "multilingualCard",
      "indoorOutdoorCard",
      "childLedCard",
      "nutritionCard",
      "familySettingCard",
    ].map((cardName) =>
      defineField({
        name: cardName,
        title: `${cardName.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}`,
        description: `Fixed slot for the ${cardName} section. Icon and colour are code-owned.`,
        type: "object",
        group: "valuesDifference",
        fields: [
          defineField({
            name: "title",
            type: "string",
            title: "Title",
            validation: (rule) => rule.required().max(40),
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

    // Visit
    defineField({
      name: "visitHeading",
      title: "Visit Heading",
      description: "The heading for the visit section. The accented phrase styling is applied automatically.",
      type: "object",
      group: "visit",
      fields: [
        defineField({ name: "lineOnePrefix", type: "string", title: "Line One Prefix", description: "e.g. 'Come See the'" }),
        defineField({ name: "accentedPhrase", type: "string", title: "Accented Phrase", description: "e.g. 'Magic'" }),
        defineField({ name: "lineTwo", type: "string", title: "Line Two", description: "e.g. 'for Yourself'" }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "visitParagraphs",
      title: "Visit Paragraphs",
      description: "Text encouraging parents to book a visit.",
      type: "minimalPortableText",
      group: "visit",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "visitCtaLabel",
      title: "Visit CTA Label",
      description: "Text on the button to book a visit.",
      type: "string",
      group: "visit",
      validation: (rule) => rule.required().max(30),
    }),
    defineField({
      name: "visitImage",
      title: "Visit Section Image",
      description: "Image shown alongside the visit text.",
      type: "contentImage",
      group: "visit",
      validation: (rule) =>
        rule.required().assetRequired().error("An image is required here."),
    }),
    defineField({
      name: "testimonialQuote",
      title: "Testimonial Quote",
      description:
        "A quote from a parent. Do not include quote marks, they are added automatically.",
      type: "text",
      group: "visit",
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: "testimonialAttribution",
      title: "Testimonial Attribution",
      description: "The name of the person who gave the quote.",
      type: "string",
      group: "visit",
      validation: (rule) => rule.required().max(60),
    }),

    // FAQ
    defineField({
      name: "faqHeading",
      title: "FAQ Heading",
      description: "The heading for the FAQ section. The accented phrase styling is applied automatically.",
      type: "object",
      group: "faq",
      fields: [
        defineField({ name: "prefix", type: "string", title: "Prefix", description: "e.g. 'Got'" }),
        defineField({ name: "accentedPhrase", type: "string", title: "Accented Phrase", description: "e.g. 'Questions?'" }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "faqIntro",
      title: "FAQ Introduction",
      description: "Short introductory text for the FAQ section.",
      type: "text",
      group: "faq",
      validation: (rule) => rule.required().max(150),
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      description: "List of frequently asked questions.",
      type: "array",
      group: "faq",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "question",
              type: "string",
              title: "Question",
              validation: (rule) => rule.required().max(100),
            }),
            defineField({
              name: "answer",
              type: "faqPortableText",
              title: "Answer",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "question" },
          },
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "helpPanelTitle",
      title: "Help Panel Title",
      description: "Title for the contact help panel below FAQs.",
      type: "string",
      group: "faq",
      validation: (rule) => rule.required().max(50),
    }),
    defineField({
      name: "helpPanelCopy",
      title: "Help Panel Copy",
      description: "Text inside the help panel.",
      type: "text",
      group: "faq",
      validation: (rule) => rule.required().max(150),
    }),
    defineField({
      name: "helpPanelCtaLabel",
      title: "Help Panel CTA Label",
      description: "Button text for the help panel.",
      type: "string",
      group: "faq",
      validation: (rule) => rule.required().max(30),
    }),

    // Gallery Intro
    defineField({
      name: "galleryIntroTitle",
      title: "Gallery Intro Title",
      description: "Title above the homepage gallery snippet.",
      type: "string",
      group: "gallery",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "galleryIntro",
      title: "Gallery Introduction",
      description: "Text below the gallery title.",
      type: "text",
      group: "gallery",
      validation: (rule) => rule.required().max(150),
    }),
  ],
});
