import { defineType, defineField } from "sanity";

export const businessDetails = defineType({
  name: "businessDetails",
  title: "Business Details",
  type: "document",
  groups: [
    { name: "contact", title: "Contact Info" },
    { name: "hours", title: "Hours & Attendance" },
    { name: "other", title: "Other Details" },
  ],
  fields: [
    defineField({
      name: "organizationName",
      title: "Organization Name",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "publicEmail",
      title: "Public Email",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "primaryPhone",
      title: "Primary Phone",
      type: "object",
      group: "contact",
      fields: [
        defineField({ name: "label", type: "string", title: "Label" }),
        defineField({ name: "number", type: "string", title: "Number" }),
      ],
    }),
    defineField({
      name: "secondaryPhone",
      title: "Secondary Phone",
      type: "object",
      group: "contact",
      fields: [
        defineField({ name: "label", type: "string", title: "Label" }),
        defineField({ name: "number", type: "string", title: "Number" }),
      ],
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      group: "contact",
    }),
    defineField({
      name: "openingDays",
      title: "Opening Days",
      type: "string",
      group: "hours",
    }),
    defineField({
      name: "openingTime",
      title: "Opening Time",
      type: "string",
      group: "hours",
      description: "e.g., 08:00",
    }),
    defineField({
      name: "closingTime",
      title: "Closing Time",
      type: "string",
      group: "hours",
      description: "e.g., 18:00",
    }),
    defineField({
      name: "morningSessionEnd",
      title: "Morning Session End",
      type: "string",
      group: "hours",
      description: "e.g., 13:00",
    }),
    defineField({
      name: "afternoonSessionStart",
      title: "Afternoon Session Start",
      type: "string",
      group: "hours",
      description: "e.g., 13:00",
    }),
    defineField({
      name: "weeksOpen",
      title: "Weeks Open",
      type: "string",
      group: "hours",
    }),
    defineField({
      name: "minimumAttendance",
      title: "Minimum Attendance",
      type: "string",
      group: "hours",
    }),
    defineField({
      name: "ageRange",
      title: "Age Range",
      type: "string",
      group: "other",
    }),
    defineField({
      name: "languages",
      title: "Languages",
      type: "string",
      group: "other",
    }),
    defineField({
      name: "socialUrls",
      title: "Social URLs",
      type: "array",
      of: [{ type: "url" }],
      group: "other",
    }),
    defineField({
      name: "availabilityMessage",
      title: "Availability Message",
      type: "string",
      group: "other",
    }),
    defineField({
      name: "footerBusinessCopy",
      title: "Footer Business Copy",
      type: "text",
      group: "other",
    }),
  ],
});
