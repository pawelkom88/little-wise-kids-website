import { defineConfig } from "sanity";
declare const process: any;
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { deskStructure } from "./src/sanity/structure";

const singletonTypes = new Set([
  "businessDetails",
  "homePage",
  "aboutPage",
  "multilingualPage",
  "hoursNutritionPage",
  "parentsPage",
  "galleryPage",
  "contactPage",
  "thankYouPage",
  "blogPage",
]);

const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "default",
  title: "Little Wise Kids",

  projectId:
    process.env.SANITY_PROJECT_ID ||
    process.env.PUBLIC_SANITY_PROJECT_ID ||
    "c10vla3h",
  dataset:
    process.env.SANITY_DATASET ||
    process.env.PUBLIC_SANITY_DATASET ||
    "production",

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter(
          (templateItem) => !singletonTypes.has(templateItem.templateId)
        );
      }
      return prev;
    },
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
