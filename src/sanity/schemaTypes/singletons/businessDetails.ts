import { defineType, defineField } from "sanity";

export const businessDetails = defineType({
  name: "businessDetails",
  title: "Business Details",
  type: "document",
  validation: (rule) => [
    rule.custom((value: import("sanity").SanityDocument | undefined) => {
      if (!value) return true;
      const paths: Array<{path: string[], message: string}> = [];
      const fields = value as Record<string, string | number | Record<string, number> | undefined>;
      if (typeof fields.openingTime === 'string' && typeof fields.closingTime === 'string' && fields.openingTime >= fields.closingTime) {
        paths.push({ path: ['closingTime'], message: "Closing time must be after opening time." });
      }
      if (typeof fields.morningSessionEnd === 'string' && typeof fields.afternoonSessionStart === 'string' && fields.morningSessionEnd > fields.afternoonSessionStart) {
        paths.push({ path: ['afternoonSessionStart'], message: "Afternoon session cannot start before morning session ends." });
      }
      const ageRange = fields.ageRange as Record<string, number> | undefined;
      if (ageRange && typeof ageRange.minimum === 'number' && typeof ageRange.maximum === 'number') {
        if (ageRange.minimum > ageRange.maximum) {
          paths.push({ path: ['ageRange', 'maximum'], message: "Age range maximum must be greater than or equal to minimum." });
        }
      }
      if (fields.openingTime && fields.closingTime && fields.morningSessionEnd) {
        if (fields.morningSessionEnd < fields.openingTime || fields.morningSessionEnd > fields.closingTime) {
          paths.push({ path: ['morningSessionEnd'], message: "Morning session end must be within opening hours." });
        }
      }
      if (fields.openingTime && fields.closingTime && fields.afternoonSessionStart) {
        if (fields.afternoonSessionStart < fields.openingTime || fields.afternoonSessionStart > fields.closingTime) {
          paths.push({ path: ['afternoonSessionStart'], message: "Afternoon session start must be within opening hours." });
        }
      }
      return paths.length > 0 ? paths : true;
    }),
  ],
  groups: [
    { name: "contact", title: "Contact Info" },
    { name: "hours", title: "Hours & Attendance" },
    { name: "other", title: "Other Details" },
  ],
  fields: [
    defineField({
      name: "organizationName",
      title: "Organisation name",
      description: "The official name of the setting.",
      type: "string",
      group: "contact",
      validation: (rule) =>
        rule.required().error("Organisation name is required."),
    }),
    defineField({
      name: "legalName",
      title: "Legal Name",
      description: "The official legal name for the business (used for Schema).",
      type: "string",
      group: "contact",
      validation: (rule) => rule.required().error("Legal name is required."),
    }),
    defineField({
      name: "publicEmail",
      title: "Public Email",
      description: "The primary email address for public enquiries.",
      type: "string",
      group: "contact",
      validation: (rule) =>
        rule.required().email().error("A valid email is required."),
    }),
    defineField({
      name: "primaryPhone",
      title: "Primary Telephone Number",
      description: "The main contact number for the setting.",
      type: "object",
      group: "contact",
      fields: [
        defineField({
          name: "label",
          type: "string",
          title: "Label",
          description: "e.g. Main Office",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "number",
          type: "string",
          title: "Number",
          description: "E.g., +441171234567. Must be canonical UK format.",
          validation: (rule) =>
                rule.regex(/^\+44\d{10}$/, { name: "UK Canonical format" }).error("Must match ^\\+44\\d{10}$ format (e.g. +441171234567)."),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "secondaryPhone",
      title: "Secondary Telephone Number",
      description:
        "An optional secondary contact number, e.g. for emergencies.",
      type: "object",
      group: "contact",
      fields: [
        defineField({
          name: "label",
          type: "string",
          title: "Label",
          description: "e.g. Emergency",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "number",
          type: "string",
          title: "Number",
          description: "E.g., +447700900000. Must be canonical UK format.",
          validation: (rule) =>
                rule.regex(/^\+44\d{10}$/, { name: "UK Canonical format" }).error("Must match ^\\+44\\d{10}$ format (e.g. +447700900000)."),
        }),
      ],
      validation: (rule) =>
        rule.custom((fields) => {
          if (fields && ((fields.label && !fields.number) || (!fields.label && fields.number))) {
            return "Both label and number must be provided if using a secondary phone.";
          }
          return true;
        }),
    }),
    defineField({
      name: "address",
      title: "Address",
      description: "The physical address of the setting.",
      type: "object",
      group: "contact",
      fields: [
        defineField({
          name: "organisation",
          type: "string",
          title: "Organisation",
          description: "e.g. Little Wise Kids",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "line1",
          type: "string",
          title: "Address Line 1",
          validation: (rule) => rule.required(),
        }),
        defineField({ name: "line2", type: "string", title: "Address Line 2" }),
        defineField({
          name: "city",
          type: "string",
          title: "City",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "postcode",
          type: "string",
          title: "Postcode",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "shortLocation",
          type: "string",
          title: "Short Location",
          description: "e.g. Easton, Bristol",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "mapUrl",
          type: "url",
          title: "Map URL",
          description: "Google Maps link",
          validation: (rule) =>
            rule.required().uri({ scheme: ["https"] }),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "latitude",
      title: "Latitude",
      description: "Numeric latitude for structured data.",
      type: "number",
      group: "contact",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "longitude",
      title: "Longitude",
      description: "Numeric longitude for structured data.",
      type: "number",
      group: "contact",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "approvedAreaServed",
      title: "Approved Area Served",
      description: "Short unique location strings for structured data, e.g. 'Easton, Bristol'.",
      type: "array",
      of: [{ type: "string" }],
      group: "contact",
    }),
    defineField({
      name: "openingDays",
      title: "Opening Days",
      description:
        "A short string summarising the opening days, e.g. 'Monday to Friday'.",
      type: "string",
      group: "hours",
      validation: (rule) => rule.required().error("Opening days are required."),
    }),
    defineField({
      name: "openingTime",
      title: "Opening Time",
      type: "string",
      group: "hours",
      description: "24-hour format, e.g., 07:30",
      validation: (rule) =>
        rule
          .required()
          .regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/)
          .error("Must be a valid 24-hour time (HH:MM)."),
    }),
    defineField({
      name: "closingTime",
      title: "Closing Time",
      type: "string",
      group: "hours",
      description: "24-hour format, e.g., 18:00",
      validation: (rule) =>
        rule
          .required()
          .regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/)
          .error("Must be a valid 24-hour time (HH:MM)."),
    }),
    defineField({
      name: "morningSessionEnd",
      title: "Morning Session End",
      type: "string",
      group: "hours",
      description: "24-hour format, e.g., 13:00",
      validation: (rule) =>
        rule
          .required()
          .regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/)
          .error("Must be a valid 24-hour time (HH:MM)."),
    }),
    defineField({
      name: "afternoonSessionStart",
      title: "Afternoon Session Start",
      type: "string",
      group: "hours",
      description: "24-hour format, e.g., 13:00",
      validation: (rule) =>
        rule
          .required()
          .regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/)
          .error("Must be a valid 24-hour time (HH:MM)."),
    }),
    defineField({
      name: "weeksOpen",
      title: "Weeks Open",
      description:
        "Numeric value representing the number of weeks the setting is open per year.",
      type: "number",
      group: "hours",
      validation: (rule) => rule.required().integer().min(1).max(52),
    }),
    defineField({
      name: "minimumAttendanceDays",
      title: "Minimum Attendance (Days)",
      description:
        "Numeric value representing the minimum days a child must attend.",
      type: "number",
      group: "hours",
      validation: (rule) => rule.required().integer().min(1).max(7),
    }),
    defineField({
      name: "ageRange",
      title: "Age Range",
      description: "The age range accepted.",
      type: "object",
      group: "other",
      fields: [
        defineField({
          name: "minimum",
          type: "number",
          title: "Minimum Age (Years)",
          validation: (rule) => rule.required().min(0),
        }),
        defineField({
          name: "maximum",
          type: "number",
          title: "Maximum Age (Years)",
          validation: (rule) => rule.required().min(0),
        }),
        defineField({
          name: "displayOverride",
          type: "string",
          title: "Display Override (Optional)",
          description: "Overrides the default 'X to Y years' display.",
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "languages",
      title: "Languages",
      description: "Add the languages spoken in the setting.",
      type: "array",
      of: [
        {
          type: "string",
          validation: (rule) =>
            [rule.required(), rule.max(30).warning("Keep language names concise.")],
        },
      ],
      group: "other",
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .unique()
          .error("At least one language is required and they must be unique."),
    }),
    defineField({
      name: "social",
      title: "Social Profiles",
      description: "Links to official social media profiles.",
      type: "object",
      group: "other",
      fields: [
        defineField({
          name: "facebookUrl",
          type: "url",
          title: "Facebook URL",
          description: "Optional.",
          validation: (rule) => rule.uri({ scheme: ["https"] }),
        }),
        defineField({
          name: "instagramUrl",
          type: "url",
          title: "Instagram URL",
          description: "Optional.",
          validation: (rule) => rule.uri({ scheme: ["https"] }),
        }),
      ],
    }),
    defineField({
      name: "availabilityMessage",
      title: "Availability Message",
      description:
        "A short message about current place availability. E.g. 'We are currently accepting registrations for 2027.'",
      type: "string",
      group: "other",
      validation: (rule) =>
        [rule.required(), rule.max(80).warning("Keep this message short.")],
    }),
    defineField({
      name: "footerBusinessCopy",
      title: "Footer Business Copy",
      description: "A short summary of the setting for the global footer.",
      type: "text",
      group: "other",
      validation: (rule) => [
        rule.required().error("Required."),
        rule.max(200).warning("Keep this summary under 200 characters."),
      ],
    }),
    defineField({
      name: "footerCtaLabel",
      title: "Footer CTA Label",
      description: "e.g. 'Register Your Interest'",
      type: "string",
      group: "other",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "socialHeading",
      title: "Social Heading",
      description: "e.g. 'Follow our journey'",
      type: "string",
      group: "other",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "socialIntroduction",
      title: "Social Introduction",
      description: "e.g. 'Nursery moments, news and everyday inspiration.'",
      type: "string",
      group: "other",
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: "footerTagline",
      title: "Footer Tagline",
      description: "Fixed text fragments for the footer tagline. Colors and order are code-owned.",
      type: "object",
      group: "other",
      fields: [
        defineField({ name: "prefix", title: "Prefix", type: "string", validation: (rule) => [rule.required(), rule.max(30).warning("Keep short")] }),
        defineField({ name: "purplePhrase", title: "Purple Phrase", type: "string", validation: (rule) => [rule.required(), rule.max(30).warning("Keep short")] }),
        defineField({ name: "separatorOne", title: "Separator One", type: "string", validation: (rule) => [rule.required(), rule.max(30).warning("Keep short")] }),
        defineField({ name: "greenPhrase", title: "Green Phrase", type: "string", validation: (rule) => [rule.required(), rule.max(30).warning("Keep short")] }),
        defineField({ name: "connector", title: "Connector", type: "string", validation: (rule) => [rule.required(), rule.max(30).warning("Keep short")] }),
        defineField({ name: "bluePhrase", title: "Blue Phrase", type: "string", validation: (rule) => [rule.required(), rule.max(30).warning("Keep short")] }),
        defineField({ name: "suffix", title: "Suffix", type: "string", validation: (rule) => [rule.required(), rule.max(30).warning("Keep short")] }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ogImage",
      title: "OG Image",
      description: "Default Open Graph image for social sharing (1200×630 recommended).",
      type: "image",
      group: "other",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "altText",
          title: "Alternative text",
          description: "Describe what is shown in this image for accessibility.",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "ofstedRegistrationType",
      title: "Ofsted Registration Type",
      description: "e.g. 'Childminder without Domestic Premises'",
      type: "string",
      group: "other",
    }),
    defineField({
      name: "ofstedUrn",
      title: "Ofsted URN",
      description: "Unique Reference Number from Ofsted",
      type: "string",
      group: "other",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ofstedRecordUrl",
      title: "Ofsted Record URL",
      description: "Absolute URL to the official Ofsted record",
      type: "url",
      group: "other",
      validation: (rule) => rule.required().uri({ scheme: ["https"] }),
    }),
  ],
});
