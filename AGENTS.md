# Repository Guidelines

## Project Structure & Module Organization

This is an Astro 5 site with React and Sanity integrations. Page routes live in `src/pages/`; `src/pages/index.astro` composes the home page. Reusable Astro components are grouped by role under `src/components/layout/`, `src/components/sections/`, `src/components/ui/`, and `src/components/icons/`. Shared page chrome belongs in `src/layouts/`, site content in `src/data/`, and global CSS in `src/styles/`. Put static, directly served files in `public/`. `assets/` and `html-sections/` contain design/reference material; do not treat them as production routes.

## Build, Test, and Development Commands

- `npm install` installs locked dependencies from `package-lock.json`.
- `npm run dev` starts Astro's local development server with hot reload.
- `npm run build` creates the production site in `dist/` and catches Astro/TypeScript integration errors.
- `npm run preview` serves the built output for final browser checks.

Sanity reads `SANITY_PROJECT_ID` and `SANITY_DATASET`; defaults are defined in `astro.config.mjs`.

## Coding Style & Naming Conventions

Follow existing Astro and TypeScript style: two-space indentation, semicolons in frontmatter/TypeScript, double quotes for Astro imports, and single quotes in configuration files. TypeScript uses Astro's strict preset. Name components in PascalCase (`HeroSection.astro`), data modules in camelCase (`site.ts`), and CSS files by scope (`tokens.css`, `sections.css`). Reuse design tokens from `src/styles/tokens.css` before adding one-off values. Prefer small existing components over new abstractions or dependencies.

## Testing Guidelines

No automated test framework or coverage threshold is currently configured. Every change must pass `npm run build`. For visual changes, run `npm run dev` or `npm run preview` and check desktop and mobile layouts, navigation, focus states, and browser console errors. If adding non-trivial behavior, add the smallest runnable regression test and document its command in `package.json`.

## Commit & Pull Request Guidelines

Recent history uses short imperative Conventional Commit subjects when changes are specific, for example `feat: replace heart icon with sun icon`; avoid vague `progress` messages. Keep commits narrow and use prefixes such as `feat:`, `fix:`, or `chore:`. Pull requests should explain user-visible impact, list validation performed, link related issues, and include before/after screenshots for UI changes. Call out Sanity schema or environment-variable changes explicitly.
