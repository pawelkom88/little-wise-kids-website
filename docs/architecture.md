# Frontend architecture

## Ownership

`src/layouts/BaseLayout.astro` loads `src/styles/site.css`. That file imports only global foundations: design tokens, local font declarations, reset/base document styles, accessibility helpers, and deliberate global tone utilities.

Every component imports its own same-stem stylesheet from `src`. Layout primitives live under `src/components/layout/`, shared controls under `src/components/ui/`, and page sections under `src/components/sections/`. The Values family is split further because its intro, value cards, and visit area are separate semantic sections; `ValuesSection.css` contains only their small shared contract.

Page files compose sections. They must not import section CSS directly. Page-level CSS is reserved for relationships between sections that no child component can own.

## Client behaviour

Static sections receive no script. Interactive components keep one same-folder TypeScript module and load it with a normal processed `<script src="...">`; do not use `public/`, `is:inline`, or duplicate page listeners. Current client modules are `SiteHeader.ts` and `GallerySection.ts`. Prefer native HTML and CSS first, as the FAQ does with named `<details>` elements.

## Design tokens

- Fonts: use `--font-heading`, `--font-body`, or the existing decorative-symbol token. Add no font family, file, or external request without explicit approval.
- Colours: component CSS contains no raw colour values. Reuse semantic tokens from `tokens.css`; add a global token only for a real reusable role.
- Typography: use shared size, weight, line-height, and tracking tokens for repeatable roles. Component-specific title calibration may use a local inherited custom property.
- Spacing and sizing: use the global spacing, container, radius, and shadow scales when values match. Keep literal percentages, circles, aspect ratios, hairlines, transforms, and artwork coordinates as technical geometry. Use a component token when a fixed value forms a repeated component contract.
- Breakpoints: shared thresholds are `30rem`, `48rem`, `64rem`, `80rem`, and `90rem`. Values keeps `60rem` and `68rem` as documented component-layout boundaries. Keep CSS and `matchMedia()` conditions identical.

## Adding a section

Create `NameSection.astro` and `NameSection.css` together. Import the CSS from the component, consume existing tokens, and add a `.ts` file only for behaviour native HTML/CSS cannot provide. If several semantic sections form one family, place them in a named folder and keep shared family CSS narrow.

Run:

```bash
npm run check:architecture
npm run build
npm run dev
```

Then verify desktop and mobile layout, keyboard focus, reduced motion, console health, and every changed interaction. Inspect `dist/index.html` and emitted `_astro` CSS/JS to confirm no duplicate imports, unnecessary page script, missing local asset, or new external font request.
