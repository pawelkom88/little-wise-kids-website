import { defineType, defineField } from "sanity";

export const inlineBusinessDetail = defineType({
  name: "inlineBusinessDetail",
  title: "Business Detail Token",
  type: "object",
  description: "Inserts a dynamic value from the Business Details (e.g. age range or opening hours).",
  fields: [
    defineField({
      name: "field",
      title: "Business Detail",
      type: "string",
      description: "Select which business detail to display here.",
      options: {
        list: [
          { title: "Organisation Name", value: "organisationName" },
          { title: "Age Range", value: "ageRange" },
          { title: "Languages", value: "languages" },
          { title: "Opening Days", value: "openingDays" },
          { title: "Opening Hours", value: "openingHours" },
          { title: "Weeks Open", value: "weeksOpen" },
          { title: "Public Email", value: "publicEmail" },
          { title: "Primary Phone", value: "primaryPhone" },
          { title: "Full Address", value: "fullAddress" },
          { title: "Short Location", value: "shortLocation" },
        ],
        layout: "dropdown",
      },
      validation: (rule) => rule.required().error("A business detail field is required."),
    }),
  ],
  preview: {
    select: {
      field: "field",
    },
    prepare(selection) {
      const fieldNames: Record<string, string> = {
        organisationName: "Organisation Name",
        ageRange: "Age Range",
        languages: "Languages",
        openingDays: "Opening Days",
        openingHours: "Opening Hours",
        weeksOpen: "Weeks Open",
        publicEmail: "Public Email",
        primaryPhone: "Primary Phone",
        fullAddress: "Full Address",
        shortLocation: "Short Location",
      };
      return {
        title: `[${fieldNames[selection.field as string] || "Unknown field"}]`,
      };
    },
  },
});
