import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";

const env = loadEnv(process.env.NODE_ENV || "production", process.cwd(), "");

export default defineConfig({
  site: "https://littlewisekids.co.uk",
  trailingSlash: "never",
  build: {
    format: "file",
    inlineStylesheets: "always",
  },
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
    sitemap({
      filter: (page) =>
        !page.endsWith("/thank-you") &&
        !page.endsWith("/404") &&
        !page.endsWith("/admin"),
    }),
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
