import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";

const env = loadEnv(process.env.NODE_ENV || "production", process.cwd(), "");

export default defineConfig({
  output: "static",
  adapter: cloudflare({
    imageService: "compile",
  }),
  image: {
    responsiveStyles: true,
    service: {
      entrypoint: "astro/assets/services/sharp",
      config: {
        webp: {
          quality: 80,
          effort: 6,
          alphaQuality: 90,
        },
      },
    },
  },
  integrations: [
    sanity({
      projectId: env.SANITY_PROJECT_ID || "c10vla3h",
      dataset: env.SANITY_DATASET || "production",
      useCdn: false,
      studioBasePath: "/admin",
      studioRouterHistory: "hash",
    }),
    react(),
  ],
});
