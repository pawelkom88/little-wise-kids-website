import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { deskStructure } from "./src/sanity/structure";

export default defineConfig({
  projectId: "abc123",
  dataset: "production",
  title: "Little Wise Kids",
  plugins: [structureTool({ structure: deskStructure })],
  schema: {
    types: schemaTypes,
  },
});
