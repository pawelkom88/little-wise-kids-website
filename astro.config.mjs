import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [
    sanity({
      projectId: process.env.SANITY_PROJECT_ID || 'abc123',
      dataset: process.env.SANITY_DATASET || 'production',
      useCdn: true,
      studioBasePath: '/admin',
      studioRouterHistory: 'hash',
    }),
    react(),
  ],
});
