import { defineType, defineField } from "sanity";

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
    defineField({ name: "heroTitle", title: "Hero Title", type: "string", group: "hero" }),
    defineField({ name: "heroParagraphs", title: "Hero Paragraphs", type: "constrainedPortableText", group: "hero" }),

    defineField({ name: "operatingHoursTitle", title: "Operating Hours Title", type: "string", group: "operatingHours" }),
    defineField({ name: "operatingHoursParagraphs", title: "Operating Hours Paragraphs", type: "constrainedPortableText", group: "operatingHours" }),
    defineField({ name: "minAttendancePanelTitle", title: "Min Attendance Panel Title", type: "string", group: "operatingHours" }),
    defineField({ name: "minAttendancePanelCopy", title: "Min Attendance Panel Copy", type: "text", group: "operatingHours" }),

    defineField({ name: "nutritionTitle", title: "Nutrition Title", type: "string", group: "nutrition" }),
    defineField({ name: "nutritionParagraphs", title: "Nutrition Paragraphs", type: "constrainedPortableText", group: "nutrition" }),
    defineField({ name: "nutritionChecklist", title: "Nutrition Checklist", type: "array", of: [{ type: "string" }], group: "nutrition" }),
    defineField({ name: "freshlyPreparedHeading", title: "Freshly Prepared Heading", type: "string", group: "nutrition" }),
    defineField({ name: "chefNote", title: "Chef Note", type: "text", group: "nutrition" }),

    defineField({ name: "typicalDayTitle", title: "Typical Day Title", type: "string", group: "typicalDay" }),
    defineField({ name: "typicalDayLeadText", title: "Typical Day Lead Text", type: "text", group: "typicalDay" }),
    defineField({
      name: "dailyRhythm",
      title: "Daily Rhythm",
      type: "object",
      group: "typicalDay",
      fields: [
        defineField({ name: "welcomeAndFreePlay", title: "Welcome & Free Play", type: "text" }),
        defineField({ name: "learningAndExploration", title: "Learning & Exploration", type: "text" }),
        defineField({ name: "morningSnack", title: "Morning Snack", type: "text" }),
        defineField({ name: "outdoorAdventures", title: "Outdoor Adventures", type: "text" }),
        defineField({ name: "lunch", title: "Lunch", type: "text" }),
        defineField({ name: "restAndQuietTime", title: "Rest & Quiet Time", type: "text" }),
        defineField({ name: "afternoonPlayAndHome", title: "Afternoon Play & Home", type: "text" }),
      ]
    }),

    defineField({ name: "contactPanelTitle", title: "Contact Panel Title", type: "string", group: "contactPanel" }),
    defineField({ name: "contactPanelCopy", title: "Contact Panel Copy", type: "text", group: "contactPanel" }),
    defineField({ name: "contactPanelCtaLabel", title: "Contact Panel CTA Label", type: "string", group: "contactPanel" }),
  ],
});
