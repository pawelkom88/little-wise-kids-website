import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import sanity from "@sanity/astro";
import react from "@astrojs/react";

const env = loadEnv(process.env.NODE_ENV || "production", process.cwd(), "");

export default defineConfig({
  integrations: [
    sanity({
      projectId: env.SANITY_PROJECT_ID || "c10vla3h",
      dataset: env.SANITY_DATASET || "production",
      useCdn: true,
      studioBasePath: "/admin",
      studioRouterHistory: "hash",
    }),
    react(),
  ],
});
