import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

export default defineConfig({
  projectId: "abc123",
  dataset: "production",
  title: "Little Wise Kids",
  plugins: [structureTool()],
  schema: {
    types: [],
  },
});
