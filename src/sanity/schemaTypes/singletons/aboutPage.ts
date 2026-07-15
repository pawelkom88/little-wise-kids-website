import { defineType, defineField } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "approach", title: "Approach" },
    { name: "commitment", title: "Commitment" },
    { name: "environment", title: "Environment" },
    { name: "programmes", title: "Programmes" },
    { name: "educators", title: "Educators" },
    { name: "leadership", title: "Leadership" },
    { name: "team", title: "Team" },
    { name: "gallery", title: "Gallery Intro" },
  ],
  fields: [
    defineField({ name: "heroTitle", title: "Hero Title", type: "string", group: "hero" }),
    defineField({ name: "heroParagraphs", title: "Hero Paragraphs", type: "constrainedPortableText", group: "hero" }),
    
    defineField({ name: "approachTitle", title: "Approach Title", type: "string", group: "approach" }),
    defineField({ name: "approachParagraphs", title: "Approach Paragraphs", type: "constrainedPortableText", group: "approach" }),
    defineField({
      name: "approachChildLed", title: "Approach Child-Led", type: "object", group: "approach",
      fields: [defineField({ name: "title", type: "string" }), defineField({ name: "description", type: "text" })]
    }),
    defineField({
      name: "approachCalmRhythm", title: "Approach Calm Rhythm", type: "object", group: "approach",
      fields: [defineField({ name: "title", type: "string" }), defineField({ name: "description", type: "text" })]
    }),
    defineField({
      name: "approachLearning", title: "Approach Learning", type: "object", group: "approach",
      fields: [defineField({ name: "title", type: "string" }), defineField({ name: "description", type: "text" })]
    }),
    defineField({
      name: "approachExploration", title: "Approach Exploration", type: "object", group: "approach",
      fields: [defineField({ name: "title", type: "string" }), defineField({ name: "description", type: "text" })]
    }),
    defineField({
      name: "approachConfidence", title: "Approach Confidence", type: "object", group: "approach",
      fields: [defineField({ name: "title", type: "string" }), defineField({ name: "description", type: "text" })]
    }),
    defineField({
      name: "approachRelationships", title: "Approach Relationships", type: "object", group: "approach",
      fields: [defineField({ name: "title", type: "string" }), defineField({ name: "description", type: "text" })]
    }),

    defineField({ name: "commitmentTitle", title: "Commitment Title", type: "string", group: "commitment" }),
    defineField({ name: "commitmentParagraphs", title: "Commitment Paragraphs", type: "constrainedPortableText", group: "commitment" }),
    defineField({ name: "commitmentImage", title: "Commitment Image", type: "contentImage", group: "commitment" }),

    defineField({ name: "environmentTitle", title: "Environment Title", type: "string", group: "environment" }),
    defineField({ name: "environmentParagraphs", title: "Environment Paragraphs", type: "constrainedPortableText", group: "environment" }),
    defineField({ name: "environmentImage", title: "Environment Image", type: "contentImage", group: "environment" }),

    defineField({ name: "programmesTitle", title: "Programmes Title", type: "string", group: "programmes" }),
    defineField({ name: "programmesParagraphs", title: "Programmes Paragraphs", type: "constrainedPortableText", group: "programmes" }),
    defineField({
      name: "foundationCommunication", title: "Foundation Communication", type: "object", group: "programmes",
      fields: [defineField({ name: "title", type: "string" }), defineField({ name: "description", type: "text" })]
    }),
    defineField({
      name: "foundationEmpathy", title: "Foundation Empathy", type: "object", group: "programmes",
      fields: [defineField({ name: "title", type: "string" }), defineField({ name: "description", type: "text" })]
    }),
    defineField({
      name: "foundationIndependence", title: "Foundation Independence", type: "object", group: "programmes",
      fields: [defineField({ name: "title", type: "string" }), defineField({ name: "description", type: "text" })]
    }),
    defineField({
      name: "foundationCreativity", title: "Foundation Creativity", type: "object", group: "programmes",
      fields: [defineField({ name: "title", type: "string" }), defineField({ name: "description", type: "text" })]
    }),
    defineField({
      name: "foundationCriticalThinking", title: "Foundation Critical Thinking", type: "object", group: "programmes",
      fields: [defineField({ name: "title", type: "string" }), defineField({ name: "description", type: "text" })]
    }),

    defineField({ name: "educatorsTitle", title: "Educators Title", type: "string", group: "educators" }),
    defineField({ name: "educatorsParagraphs", title: "Educators Paragraphs", type: "constrainedPortableText", group: "educators" }),
    defineField({ name: "educatorsImage", title: "Educators Image", type: "contentImage", group: "educators" }),

    defineField({ name: "leadershipTitle", title: "Leadership Title", type: "string", group: "leadership" }),
    defineField({ name: "leadershipParagraphs", title: "Leadership Paragraphs", type: "constrainedPortableText", group: "leadership" }),
    defineField({ name: "leaderImage", title: "Leader Image", type: "contentImage", group: "leadership" }),

    defineField({
      name: "team",
      title: "Team Members",
      type: "array",
      group: "team",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "role", title: "Role", type: "string" }),
            defineField({ name: "bio", title: "Bio", type: "text" }),
            defineField({ name: "image", title: "Image", type: "contentImage" })
          ]
        }
      ]
    }),

    defineField({ name: "galleryIntroTitle", title: "Gallery Intro Title", type: "string", group: "gallery" }),
  ],
});
