import { defineType, defineField } from "sanity";

const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

export const hoursNutritionPage = defineType({
  name: "hoursNutritionPage",
  title: "Hours & Nutrition Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "operatingHours", title: "Operating Hours" },
    { name: "nutrition", title: "Nutrition" },
    { name: "typicalDay", title: "Typical Day" },
    { name: "contactPanel", title: "Contact Panel" },
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
      name: "operatingHoursHeading",
      title: "Operating Hours Heading",
      description: "The main H2 heading.",
      type: "string",
      group: "operatingHours",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "operatingHoursParagraphs",
      title: "Operating Hours Paragraphs",
      description: "Text for this section.",
      type: "pagePortableText",
      group: "operatingHours",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "minAttendancePanelTitle",
      title: "Minimum Attendance Panel Title",
      description: "Title of the highlighted panel.",
      type: "string",
      group: "operatingHours",
      validation: (rule) => rule.required().max(50),
    }),
    defineField({
      name: "minAttendancePanelCopy",
      title: "Minimum Attendance Panel Copy",
      description: "Text in the highlighted panel.",
      type: "text",
      group: "operatingHours",
      validation: (rule) => rule.required().max(150),
    }),
    defineField({
      name: "nutritionHeading",
      title: "Nutrition Heading",
      description: "The main H2 heading.",
      type: "string",
      group: "nutrition",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "nutritionParagraphs",
      title: "Nutrition Paragraphs",
      description: "Text for this section.",
      type: "pagePortableText",
      group: "nutrition",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "nutritionChecklist",
      title: "Nutrition Checklist",
      description: "Bulleted checklist items.",
      type: "array",
      group: "nutrition",
      of: [{ type: "string", validation: (rule) => rule.required().max(80) }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "freshlyPreparedHeading",
      title: "Freshly Prepared Heading",
      description: "Heading for the chef note.",
      type: "string",
      group: "nutrition",
      validation: (rule) => rule.required().max(50),
    }),
    defineField({
      name: "chefNote",
      title: "Chef Note",
      description: "Text from the chef.",
      type: "text",
      group: "nutrition",
      validation: (rule) => rule.required().max(550),
    }),
    defineField({
      name: "typicalDayHeading",
      title: "Typical Day Heading",
      description: "The main H2 heading.",
      type: "string",
      group: "typicalDay",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "typicalDayLead",
      title: "Typical Day Lead Text",
      description: "Intro text for the timeline.",
      type: "text",
      group: "typicalDay",
      validation: (rule) => rule.required().max(150),
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
        title: `${slot.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}`,
        description: `Fixed daily rhythm slot for ${slot}.`,
        type: "object",
        group: "typicalDay",
        fields: [
          defineField({
            name: "startTime",
            type: "string",
            title: "Start Time",
            description: "24-hour time (e.g. 08:00)",
            validation: (rule) =>
              rule
                .required()
                .regex(timeRegex)
                .error("Must be a valid 24-hour time (HH:MM)."),
          }),
          defineField({
            name: "endTime",
            type: "string",
            title: "End Time",
            description: "24-hour time (e.g. 09:00)",
            validation: (rule) =>
              rule
                .required()
                .regex(timeRegex)
                .error("Must be a valid 24-hour time (HH:MM)."),
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
          rule
            .required()
            .custom(
              (value: { startTime?: string; endTime?: string } | undefined) => {
                if (value?.startTime && value?.endTime) {
                  if (value.endTime <= value.startTime) {
                    return "End time must be later than start time.";
                  }
                }
                return true;
              }
            ),
      })
    )
  ],
});
