import { defineField, defineType } from "sanity";

const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

export const hoursNutritionPage = defineType({
  name: "hoursNutritionPage",
  title: "Hours & Nutrition Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "operatingHours", title: "Operating Hours" },
    { name: "nutrition", title: "Nutrition" },
    { name: "nurseryChef", title: "Nursery Chef" },
    { name: "typicalDay", title: "Typical Day" },
  ],
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      description: "Optional small text above the title.",
      type: "string",
      group: "hero",
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: "heroTitleLineOne",
      title: "Hero Title — Line One",
      type: "string",
      group: "hero",
      validation: (rule) => rule.required().max(50),
    }),
    defineField({
      name: "heroTitleLineTwo",
      title: "Hero Title — Line Two",
      type: "string",
      group: "hero",
      validation: (rule) => rule.required().max(50),
    }),
    defineField({
      name: "heroParagraphs",
      title: "Hero Paragraphs",
      type: "pagePortableText",
      group: "hero",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "operatingHoursLabel",
      title: "Operating Hours Label",
      type: "string",
      group: "operatingHours",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "operatingHoursHeading",
      title: "Operating Hours Heading",
      type: "string",
      group: "operatingHours",
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: "operatingHoursParagraphs",
      title: "Operating Hours Copy",
      description:
        "Use the approved Operating Hours copy from the website content brief.",
      type: "pagePortableText",
      group: "operatingHours",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "minAttendancePanelTitle",
      title: "Minimum Attendance Title",
      type: "string",
      group: "operatingHours",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "minAttendancePanelCopy",
      title: "Minimum Attendance Copy",
      type: "text",
      rows: 3,
      group: "operatingHours",
      validation: (rule) => rule.required().max(260),
    }),
    defineField({
      name: "availabilityCtaLabel",
      title: "Availability CTA Label",
      type: "string",
      group: "operatingHours",
      validation: (rule) => rule.required().max(55),
    }),

    defineField({
      name: "nutritionLabel",
      title: "Nutrition Label",
      type: "string",
      group: "nutrition",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "nutritionHeading",
      title: "Nutrition Heading",
      type: "string",
      group: "nutrition",
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: "nutritionStatement",
      title: "Nutrition Feature Statement",
      description:
        "Short statement displayed prominently. Keep it grounded in the approved copy.",
      type: "string",
      group: "nutrition",
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: "nutritionParagraphs",
      title: "Nutrition Copy",
      description: "Use the approved Nutrition copy from the content brief.",
      type: "pagePortableText",
      group: "nutrition",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "nutritionChecklist",
      title: "Nutrition Highlights",
      description:
        "Five short phrases derived directly from the approved Nutrition copy.",
      type: "array",
      group: "nutrition",
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
              name: "text",
              title: "Text",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required().max(240),
            }),
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        },
      ],
      validation: (rule) => rule.required().min(5).max(5),
    }),

    defineField({
      name: "nurseryChefLabel",
      title: "Nursery Chef Label",
      type: "string",
      group: "nurseryChef",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "freshlyPreparedHeading",
      title: "Nursery Chef Heading",
      type: "string",
      group: "nurseryChef",
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: "chefNote",
      title: "Nursery Chef Copy",
      description:
        "Use the approved Nursery Chef paragraph from the content brief.",
      type: "text",
      rows: 6,
      group: "nurseryChef",
      validation: (rule) => rule.required().max(700),
    }),
    defineField({
      name: "chefHighlights",
      title: "Nursery Chef Highlights",
      description:
        "Three short phrases taken directly from the approved Nursery Chef copy.",
      type: "array",
      group: "nurseryChef",
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
              name: "text",
              title: "Text",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required().max(240),
            }),
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        },
      ],
      validation: (rule) => rule.required().min(3).max(3),
    }),
    defineField({
      name: "dietaryContactCopy",
      title: "Dietary Contact Copy",
      type: "text",
      rows: 3,
      group: "nurseryChef",
      validation: (rule) => rule.required().max(260),
    }),
    defineField({
      name: "dietaryContactCtaLabel",
      title: "Dietary Contact CTA Label",
      type: "string",
      group: "nurseryChef",
      validation: (rule) => rule.required().max(40),
    }),

    defineField({
      name: "typicalDayLabel",
      title: "Typical Day Label",
      type: "string",
      group: "typicalDay",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "typicalDayHeading",
      title: "Typical Day Heading",
      type: "string",
      group: "typicalDay",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "typicalDayLead",
      title: "Typical Day Lead",
      type: "text",
      group: "typicalDay",
      validation: (rule) => rule.required().max(180),
    }),
    ...[
      "welcomeAndFreePlay",
      "learningAndExploration",
      "morningSnack",
      "outdoorAdventures",
      "lunch",
      "restAndQuietTime",
      "afternoonPlayAndHome",
    ].map((slot) =>
      defineField({
        name: slot,
        title: slot
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (character) => character.toUpperCase()),
        description: `Existing scroll-driven timeline slot for ${slot}.`,
        type: "object",
        group: "typicalDay",
        fields: [
          defineField({
            name: "startTime",
            type: "string",
            title: "Start Time",
            description: "24-hour time, for example 08:00.",
            validation: (rule) =>
              rule
                .required()
                .regex(timeRegex)
                .error("Must be a valid 24-hour time in HH:MM format."),
          }),
          defineField({
            name: "endTime",
            type: "string",
            title: "End Time",
            description: "24-hour time, for example 09:00.",
            validation: (rule) =>
              rule
                .required()
                .regex(timeRegex)
                .error("Must be a valid 24-hour time in HH:MM format."),
          }),
          defineField({
            name: "title",
            type: "string",
            title: "Title",
            validation: (rule) => rule.required().max(55),
          }),
          defineField({
            name: "description",
            type: "text",
            title: "Description",
            validation: (rule) => rule.required().max(220),
          }),
        ],
        validation: (rule) =>
          rule.required().custom(
            (
              value:
                | {
                    startTime?: string;
                    endTime?: string;
                  }
                | undefined,
            ) => {
              if (
                value?.startTime &&
                value?.endTime &&
                value.endTime <= value.startTime
              ) {
                return "End time must be later than start time.";
              }

              return true;
            },
          ),
      }),
    ),
  ],
});
