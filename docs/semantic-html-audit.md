# Little Wise Kids — Semantic HTML Audit Prompt

## ROLE

Act as a senior semantic HTML auditor, Astro engineer, accessibility specialist, content-model reviewer, and technical quality lead.

You are working inside the **Little Wise Kids** website repository.

Your job is to perform a rigorous, evidence-based semantic HTML audit of the complete website. This is not a superficial search for modern HTML tags and it is not an exercise in replacing every `<div>` with `<section>`.

You must determine whether the final rendered HTML accurately communicates:

- document structure
- content hierarchy
- regions and landmarks
- relationships between content
- the purpose of interactive controls
- the meaning of lists, tables, forms, quotations, dates, contact information, images, icons, and media
- the intended semantics of CMS-authored content

The browser receives rendered HTML, not Astro component names. The rendered production output is therefore the primary source of truth, while the Astro source and Sanity schemas are used to locate root causes.

---

# GOAL

Create a complete, evidence-backed semantic HTML audit of the current Astro website and its Sanity authoring model.

The audit must:

1. cover every unique page template, shared structural component, interactive state, and CMS rendering path;
2. validate the final rendered HTML rather than reviewing source code alone;
3. identify systemic semantic defects and their source-level root causes;
4. visually inspect every meaningful image before proposing alternative text;
5. classify every image as decorative, informative, functional, complex, text-containing, redundant, or unavailable for review;
6. provide exact proposed alt text only where non-empty alt text is appropriate;
7. distinguish confirmed defects from recommendations, uncertain cases, and valid existing patterns;
8. create deterministic validation and regression checks where automation is reliable;
9. generate a professional report and remediation plan;
10. avoid unsupported claims that the website is semantically perfect, accessible, or WCAG conformant.

If a goal/task system is available in the current coding environment, create and activate this GOAL before beginning. Keep the goal incomplete until every completion criterion in this prompt has been satisfied. Update the goal after each phase with evidence, not generic progress statements.

The goal is the **audit and its evidence**, not broad remediation. Do not make large semantic changes during the baseline audit. Produce exact patch recommendations and stop for human review before implementing them.

---

# PROJECT CONTEXT

Known project context:

- Framework: Astro
- CMS target: Sanity
- Hosting target: Cloudflare
- Site: Little Wise Kids
- Audience: parents and carers considering an early-years setting in Bristol
- Editors: non-technical users
- Language and editorial style: British English
- Architecture preference: static-first
- Performance, SEO, Core Web Vitals, responsive behaviour, and visual design must not regress
- Native HTML semantics are preferred over ARIA
- Existing CSS tokens, naming conventions, components, and project architecture should be preserved
- Do not make DNS, email, deployment-account, or unrelated infrastructure changes
- Do not install broad frameworks or replace Astro components with another UI system

Known routes observed in the supplied source include:

- `/`
- `/about-us`
- `/multilingual-learning`
- `/parents-information`
- `/hours-nutrition`
- `/our-gallery`
- `/contact`
- `/thank-you`
- `/blog`
- `/blog/[slug]`

Verify this list against the current repository. Do not assume the supplied source is complete or current.

Known structural components observed in the supplied source include:

- `src/layouts/BaseLayout.astro`
- `src/components/layout/Container.astro`
- `src/components/layout/Section.astro`
- `src/components/layout/SiteHeader.astro`
- `src/components/layout/SiteFooter.astro`
- `src/components/icons/Icon.astro`
- `src/components/ui/Button.astro`
- `src/components/sections/HeroSection.astro`
- `src/components/sections/FaqSection.astro`
- `src/components/sections/GallerySection.astro`
- components under `src/components/sections/Values/`

Verify all paths against the current repository.

## Known audit hypotheses from the supplied source

These are **starting hypotheses only**. Verify them against the current code and rendered output before recording findings:

- `BaseLayout.astro` renders a page-level `<main>`, while several pages appear to render another `<main>` inside the layout slot. Nested `<main>` elements would be invalid and would create an incorrect landmark structure.
- Several complete pages are wrapped in `<article>`. A whole website page is not automatically an independently distributable article.
- `Section.astro` always emits `<section>`, even when callers may only require a layout wrapper.
- Some highlighted panels use `<aside>`, although visual side placement does not necessarily make content tangential or complementary.
- Some repeated feature or gallery groups use `<article>` even though the items may not be independently reusable compositions.
- `Button.astro` emits `<button>` without an explicit `type` when no `href` is supplied. Inside a form this could default to `submit`.
- `BaseLayout.astro` currently appears to use `lang="en"` even though the site’s editorial language is British English. Determine whether `en-GB` is the more accurate document language.
- The source includes image patterns such as `alt="???"`, empty alt text, generic title-derived alt text, literal values such as `"Envelope icon"`, remote gallery images with prewritten alt text, and images hidden with `aria-hidden`. Each case requires contextual review.
- A linked logo with an explicit link label and visually hidden site name may correctly use `alt=""`; do not “fix” valid redundancy without examining the resulting accessible name.
- The home gallery contains remote images. Existing alt text must not be trusted merely because it is present.
- The full gallery page appears to use category titles as image alt text. A category label is not automatically a description of the actual image.
- FAQ decorative images appear to have both literal alt text and `aria-hidden="true"`. Determine the actual exposed accessibility result and simplify contradictory markup where appropriate.
- Some FAQ content is inserted with `set:html`. Determine whether this is controlled static content, Sanity content, or an injection/authoring risk.
- Gallery controls and custom menus use ARIA. Determine whether native semantics and actual state remain aligned during interaction.
- Sanity schemas and Portable Text serializers may not be included in the supplied `src` archive. Locate them in the full repository before concluding that they do not exist.

Do not convert these hypotheses into findings without evidence.

---

# AUTHORITATIVE REFERENCES

Use current primary specifications and official guidance as the source of truth:

- WHATWG HTML Living Standard
- W3C Web Accessibility Initiative page-structure tutorials
- WAI-ARIA Authoring Practices Guide for genuinely custom widgets
- Accessible Name and Description Computation specification
- Astro official documentation
- Sanity official schema and Portable Text documentation
- W3C Nu HTML Checker or an equivalent standards-based validator

Do not rely on a commercial blog article as the sole authority.

Do not interpret “semantic HTML” as “use as many HTML5 elements as possible.”

---

# OPERATING RULES

1. Inspect the repository before installing or modifying anything.
2. Detect the package manager from the lockfile and use only that package manager.
3. Inspect current scripts, dependencies, Astro configuration, output mode, integrations, adapters, TypeScript settings, CI files, and test tools.
4. Reuse the Playwright and axe infrastructure if it already exists from an accessibility audit.
5. Do not add duplicate dependencies.
6. Add a dependency only when it provides a necessary, maintainable capability.
7. Prefer standards-based validation of generated `dist/**/*.html`.
8. Use the production build or the closest production-like preview available.
9. Do not audit source files alone.
10. Do not use regex alone to decide whether semantics are correct.
11. Do not treat every `<div>` as a defect.
12. Do not treat every `<section>` as an improvement.
13. Do not treat every skipped heading number as an automatic failure.
14. Do not require one and only one `<h1>` as an inflexible validator rule without examining the document model; for this project, however, determine whether one clear page-level heading is the most coherent implementation.
15. Do not add ARIA when native HTML already expresses the correct semantics.
16. Do not add `role` values that duplicate native semantics unless there is a documented interoperability reason.
17. Do not use `aria-label` to conceal unclear visible copy.
18. Do not make an element semantic merely because it is visually prominent.
19. Do not make a visual sidebar an `<aside>` unless it is genuinely complementary or tangential.
20. Do not use `<article>` merely because an item is displayed as a card.
21. Do not use `<nav>` for every collection of links.
22. Do not use `<section>` merely to attach a class.
23. Do not change visual design during the audit unless required to capture or expose an issue.
24. Do not apply broad remediation before the baseline report has been reviewed.
25. Clearly identify any unavailable route, image, CMS record, or environment requirement.
26. Never invent image content or alternative text when the image cannot be viewed.
27. Never derive alternative text solely from a filename, existing alt value, title, caption, or CMS field.
28. Do not expose private credentials or commit environment secrets.
29. Do not send production form submissions.
30. Use British English in audit documentation.

---

# DEFINITION OF SEMANTIC CORRECTNESS

Evaluate whether the rendered element communicates the correct purpose and relationships.

Examples:

- A link navigates to a resource or location.
- A button performs an action.
- A heading names the content that follows.
- A list represents a conceptual collection.
- A section represents a meaningful thematic grouping.
- An article is a self-contained composition that could reasonably stand alone or be reused.
- An aside is related but tangential or complementary to the surrounding content.
- A navigation region contains major navigation links.
- A table represents genuinely tabular relationships.
- A description list represents term–description, label–value, or name–value relationships.
- A figure groups self-contained media with an optional caption.
- A time element provides a machine-readable date or time.
- An address element identifies contact information for the relevant person or organisation, not any arbitrary postal address.
- Strong and emphasis communicate importance and stress, not visual styling alone.
- Images communicate their purpose through appropriate alternative handling.
- ARIA state reflects the visible and interactive state at all times.

The audit is not complete until both the rendered result and the source-level cause have been examined.

---

# PHASE 0 — REPOSITORY DISCOVERY

Before changing the project, inspect and report:

- Astro version
- Node.js requirements
- package manager and lockfile
- package scripts
- output mode
- integrations
- Cloudflare adapter or deployment configuration
- source and public directories
- all layouts
- all route files
- dynamic routes and `getStaticPaths`
- shared structural components
- UI components
- client-side scripts and islands
- content collections
- Sanity client configuration
- Sanity schema location
- Portable Text renderers
- image components and image helper functions
- form providers
- testing dependencies
- accessibility-test dependencies
- linting configuration
- CI workflows
- build and preview commands
- environment-variable requirements

Create a route inventory containing:

- route
- source file
- page template
- layout
- primary heading
- primary landmark structure
- shared components
- interactive states
- data source
- image sources
- unique semantic risks
- audit status

Create a component inventory containing:

- component
- rendered root element
- possible root variants
- heading behaviour
- landmark behaviour
- interactive semantics
- image behaviour
- known callers
- semantic risk
- audit status

Do not proceed until the route and component inventories are created.

---

# PHASE 1 — ESTABLISH A PRODUCTION-LIKE AUDIT TARGET

Use the existing build workflow where possible.

Preferred process:

1. install dependencies from the lockfile;
2. build the Astro project;
3. run the production preview or equivalent local server;
4. allow Playwright to manage the server when Playwright is already configured;
5. ensure dynamic or Sanity-driven pages contain representative content;
6. avoid production side effects;
7. record any route that cannot be rendered and why.

Verify that the content being audited is the intended current content. A successful HTTP response containing an error shell, empty CMS state, or placeholder content is not valid route coverage.

Save representative rendered HTML for every unique page template.

Do not commit generated build output unless the repository explicitly tracks it.

---

# PHASE 2 — VALIDATE GENERATED HTML

Inspect whether an HTML validation tool already exists.

If not, add the smallest appropriate standards-based validation mechanism. Prefer validation of generated HTML over static inspection of `.astro` source.

Possible approaches include:

- a local standards-based HTML validator;
- `html-validate` configured for generated output;
- W3C Nu HTML Checker when network or a local service is available.

Do not assume a validator can decide whether `<article>`, `<section>`, `<aside>`, or `<nav>` is conceptually appropriate.

Capture:

- invalid element nesting
- nested landmarks forbidden by the HTML content model
- duplicate IDs
- invalid attribute values
- invalid ARIA attributes
- invalid element children
- malformed forms
- malformed tables
- obsolete elements or attributes
- stray closing or opening tags
- invalid interactive nesting
- headings or landmarks placed in invalid contexts

For each validation issue:

- record the route;
- save the validator message;
- locate the generated HTML;
- trace it back to the Astro component or CMS renderer;
- group repeated issues by root cause.

Create a repeatable command such as `test:html` or adapt to existing script conventions.

Do not overwrite existing scripts.

---

# PHASE 3 — DOCUMENT SHELL AND LANGUAGE

Audit every unique page template for:

- HTML doctype
- document language
- language changes inside the page
- character encoding
- viewport metadata
- unique and meaningful `<title>`
- meaningful meta description
- one `<body>`
- valid body children
- meaningful source order
- primary content placement
- skip-link implementation and destination
- content that exists outside all meaningful landmarks

For this site, verify whether the document language should be:

```html
<html lang="en-GB">
```

Do not change it automatically if multilingual page content requires more nuanced handling. Identify phrases or sections in Portuguese, Spanish, or other languages that require a local `lang` attribute.

Example:

```html
<span lang="pt">...</span>
```

Only add language declarations when the actual language is known.

---

# PHASE 4 — LANDMARK AND PAGE-REGION AUDIT

Build a rendered landmark outline for every representative page.

Inspect:

- banner
- navigation
- main
- complementary
- contentinfo
- named regions
- search region if present
- form regions where relevant

Check:

- exactly one visible primary `main` landmark for the current page;
- no nested `<main>`;
- site-wide header is outside `main`;
- site-wide footer is outside `main`;
- repeated navigation landmarks have distinct accessible names;
- content is not needlessly fragmented into many named regions;
- hidden menu content does not remain exposed as an active landmark;
- mobile and desktop navigation do not create confusing duplicate landmarks when one is visually hidden;
- landmark labels describe purpose rather than visual location;
- sections gain region semantics only when the region is useful and meaningfully named.

Explicitly inspect:

- `BaseLayout.astro`
- all pages that currently contain `<main>`
- `SiteHeader.astro`
- `SiteFooter.astro`
- `Section.astro`
- mobile menu open and closed states
- mega-menu open and closed states

For each route, record an outline similar to:

```text
banner: Site header
  navigation: Primary navigation
main
  heading level 1: Page title
  region: ...
contentinfo: Site footer
  navigation: Main menu
  navigation: ...
```

Flag duplicate or contradictory landmarks.

---

# PHASE 5 — HEADING STRUCTURE

Create a heading outline for every representative route.

For every heading, record:

- route
- level
- text
- source component
- parent sectioning context
- whether it accurately names the following content
- whether it is visible
- whether it is empty
- whether it is duplicated
- whether it exists only for styling
- whether it is part of a reusable component with a hardcoded level

Evaluate:

- clear page-level subject;
- logical parent–child relationships;
- heading levels determined by structure, not visual size;
- heading content descriptive enough for scanning;
- no paragraph or styled span impersonating a heading;
- no heading used merely to enlarge text;
- no empty headings;
- no decorative-only headings;
- no hidden heading that creates misleading navigation;
- no component that always emits `h2` regardless of context;
- no CMS heading option based only on visual appearance.

Do not automatically fail a numerical level skip. Explain whether the relationship is actually incorrect.

For reusable components, recommend an API that separates semantic level from visual style.

When a component accepts a dynamic heading tag:

- constrain values with TypeScript;
- do not allow arbitrary tag names;
- ensure the parent chooses the correct level;
- preserve existing visual class names;
- do not make every component responsible for guessing its document depth.

Audit especially:

- hero headings
- footer headings
- card headings
- feature-strip headings
- FAQ headings
- gallery slide/card headings
- blog listing cards
- blog article headings
- contact form section headings
- Sanity Portable Text headings

---

# PHASE 6 — SECTIONING ELEMENTS AND GENERIC CONTAINERS

Audit every use of:

- `<section>`
- `<article>`
- `<aside>`
- `<nav>`
- `<header>`
- `<footer>`
- `<div>`

## Section

Confirm that each `<section>` represents a thematic grouping that benefits from explicit structure.

A section should normally have a useful heading or accessible name.

Do not use `<section>` merely because:

- it has background colour;
- it needs spacing;
- it is a CSS grid;
- it is a component boundary;
- the class contains the word “section”.

Review `Section.astro` carefully. Determine whether it should:

- remain a semantic section with stricter caller requirements;
- accept a constrained `as` prop;
- be split into semantic `Section` and non-semantic layout wrappers;
- require an accessible heading relationship;
- expose no implicit semantics and leave the caller to choose.

Do not recommend an unconstrained “render anything” API without considering maintainability.

## Article

Confirm that each `<article>` is independently meaningful and could reasonably be reused, syndicated, or understood outside its surrounding page.

Review:

- page-wide article wrappers
- feature cards
- gallery pages or slides
- timeline events
- calculation panels
- blog cards
- blog articles
- testimonials or reviews if present

Do not mark a card as an article merely because it has a title and text.

## Aside

Confirm that the content is complementary or tangential to the surrounding content.

Do not use `<aside>` merely because a panel is visually placed on the side.

Review:

- CMS notes
- checklist panels
- calls to action
- contact cards
- funding notices
- related content
- gallery calls to action
- FAQ contact panel

Determine whether each should instead be:

- a section;
- a div;
- a note with appropriate text;
- part of the main flow;
- a genuinely complementary region.

## Header and footer

Determine the nearest sectioning ancestor and whether the element serves introductory or concluding metadata for that context.

Review:

- page hero headers
- card headers
- article metadata headers
- blog-card footers
- section headers
- footer-in-footer structures

## Div

A justified `<div>` is valid.

Do not report a `<div>` as a problem unless:

- it replaces a more accurate semantic element;
- it is interactive without correct native semantics;
- it hides a meaningful relationship;
- it creates invalid nesting;
- its content should form a list, table, form group, figure, quotation, or other semantic structure.

---

# PHASE 7 — LINKS, BUTTONS, AND INTERACTIVE CONTROLS

Inventory every interactive element and classify its purpose.

## Links

A link should navigate to:

- another document;
- another route;
- a fragment;
- a downloadable resource;
- an email, telephone, map, or external destination.

Check:

- meaningful `href`;
- no placeholder `href="#"` used as an action;
- no JavaScript-only link behaviour;
- no empty links;
- clear link purpose;
- duplicate labels understandable in context;
- linked images expose destination or purpose;
- download links communicate file type where useful;
- external destination behaviour is not surprising;
- fragment destinations exist;
- current-page links are represented appropriately where useful.

## Buttons

A button should perform an action.

Check:

- explicit `type="button"` for non-submit buttons;
- `type="submit"` for form submission;
- `type="reset"` only when intentionally required;
- no clickable generic elements;
- visible label and accessible name align;
- icon-only buttons have meaningful names;
- disabled state is semantically and functionally correct;
- pressed, expanded, selected, and current states use the correct mechanism;
- state updates when the UI changes.

Inspect `Button.astro` and every caller.

Determine whether a component that renders either `<a>` or `<button>`:

- has a clear type-safe API;
- prevents invalid attributes;
- always sets the correct button type;
- does not make action controls into links;
- does not make navigation into buttons;
- keeps icons decorative when adjacent text already labels the control.

## Menus and disclosures

Review:

- desktop mega-menu triggers;
- mega-menu panels;
- mobile `<details>/<summary>` menu;
- custom close button;
- nested mobile submenu triggers;
- FAQ `<details>/<summary>`;
- gallery carousel controls.

Check whether the component is actually:

- site navigation;
- disclosure;
- modal dialog;
- menu button;
- tabs;
- carousel;
- list of links.

Do not apply ARIA menu roles to normal website navigation.

Verify state at runtime:

- `aria-expanded`;
- `aria-controls`;
- hidden;
- inert;
- focusability;
- accessible name;
- duplicate controls;
- exposed regions;
- focus restoration;
- keyboard behaviour.

---

# PHASE 8 — LISTS, DESCRIPTION LISTS, AND GROUPS

Inspect repeated visual collections and determine whether they are conceptual lists.

Candidates include:

- primary navigation items;
- footer links;
- feature cards;
- values;
- gallery categories;
- gallery photos;
- blog cards;
- policies;
- contact methods;
- opening hours;
- nutrition principles;
- daily schedule events;
- team members;
- leadership members;
- social links;
- form option groups;
- breadcrumbs;
- pagination.

Use:

- `<ul>` when order is not meaningful;
- `<ol>` when sequence or rank is meaningful;
- `<dl>` for term–description or label–value relationships;
- plain grouping when the items do not form a conceptual list.

Check:

- list children are valid;
- list markers are not the only conveyed meaning;
- list semantics have not been removed unnecessarily;
- CSS-generated content does not carry required information;
- navigation lists remain understandable;
- visual grids that are lists expose list structure.

Do not turn every grid into a list without explaining the conceptual relationship.

---

# PHASE 9 — FORMS

Audit every form and every form state.

Inspect:

- `<form>`;
- submit destination and method;
- labels;
- descriptions;
- input types;
- `name`;
- `id`;
- `autocomplete`;
- required state;
- grouped controls;
- fieldsets and legends;
- error messages;
- success messages;
- status regions;
- consent text;
- hidden provider fields;
- honeypots;
- submit buttons;
- secondary buttons;
- disabled state;
- dynamic reveal fields.

Check:

- every control has a visible and programmatic label;
- placeholder is not the only label;
- related radio buttons and checkboxes are grouped;
- instructions precede the interaction where needed;
- errors are associated with controls;
- required state is not communicated only through an asterisk;
- submit button uses correct native semantics;
- non-submit controls inside the form explicitly use `type="button"`;
- success and error messages use appropriate status semantics;
- hidden anti-spam fields do not pollute the accessibility tree;
- field order matches the visual and logical order.

Do not submit real enquiries.

Use route interception or the project’s safe test strategy.

---

# PHASE 10 — TABLES AND STRUCTURED DATA

Search for all tables and table-like visual structures.

Use a table only when information has meaningful row and column relationships.

Review likely candidates such as:

- opening hours;
- fees;
- funding calculations;
- schedules;
- comparison information;
- nutrition or weekly plans.

For actual tables, check:

- caption;
- header cells;
- row and column scope;
- table sections;
- cell relationships;
- responsive presentation;
- no layout tables.

For non-tabular label/value information, consider `<dl>`.

For timelines or schedules where chronological order matters, consider an ordered list rather than automatically recommending a table.

Record the reasoning.

---

# PHASE 11 — CONTENT-LEVEL ELEMENTS

Audit appropriate use of:

- `<time datetime="">`
- `<address>`
- `<figure>`
- `<figcaption>`
- `<blockquote>`
- `<q>`
- `<cite>`
- `<abbr>`
- `<strong>`
- `<em>`
- `<mark>`
- `<del>`
- `<ins>`
- `<details>`
- `<summary>`
- `<code>`
- `<pre>`
- `<small>`
- `<hr>`

Check:

- machine-readable dates;
- opening times;
- publication dates;
- modified dates;
- addresses associated with the organisation;
- quotations represented as quotations;
- captions associated with media;
- strong importance versus visual bold;
- stress emphasis versus visual italics;
- horizontal rules used as thematic breaks rather than decoration;
- `<br>` not used for layout spacing;
- empty paragraphs not used as spacers;
- `&nbsp;` not used to force visual layout;
- inline styles not substituting for the design system.

Do not recommend an element merely because it exists in HTML.

---

# PHASE 12 — IMAGE AND ALT-TEXT AUDIT

This phase is mandatory and must use visual inspection.

## 12.1 Build a complete image inventory

Discover all images from:

- Astro static imports;
- `public/` paths;
- `<img>`;
- Astro `<Image>`;
- `<picture>`;
- inline SVG;
- SVG files;
- CSS `background-image`;
- pseudo-element backgrounds;
- remote URLs;
- Sanity image fields;
- Portable Text image blocks;
- Open Graph images where relevant;
- favicons and logos;
- dynamically assembled image paths;
- placeholder images;
- icons implemented as raster images;
- generated or transformed images.

For each image record:

- unique ID;
- source file;
- route or component;
- rendered URL;
- local file path if available;
- dimensions;
- surrounding heading;
- surrounding text;
- caption;
- link or button context;
- current alt;
- current ARIA;
- loading behaviour;
- classification;
- proposed treatment;
- proposed alt;
- confidence;
- evidence;
- human-review requirement.

Create:

- `docs/semantic-html/IMAGE-INVENTORY.md`
- `docs/semantic-html/IMAGE-ALT-REVIEW.csv`

## 12.2 Visually inspect the image itself

Do not infer the content from:

- filename;
- folder name;
- existing alt;
- card title;
- nearby heading;
- CMS slug;
- photographer note;
- image URL.

Open the actual image using available image-viewing or multimodal capabilities.

For local images:

- open the original image file;
- inspect full resolution when necessary;
- inspect crops or responsive variants if they differ meaningfully.

For remote images:

- render the page in a browser;
- inspect the loaded image;
- use a browser screenshot or download a temporary review copy when permitted;
- do not modify or commit temporary review files.

For Sanity images:

- inspect the rendered production or preview image;
- inspect hotspot/crop variants where they affect visible content;
- trace the image to its CMS document and field.

For CSS backgrounds:

- inspect the page in context;
- determine whether the image carries information unavailable in HTML;
- do not attempt to add `alt` to CSS;
- recommend real HTML if the background is informative.

If the image cannot be loaded or viewed:

- mark it `UNAVAILABLE FOR VISUAL REVIEW`;
- do not invent alt text;
- record the reason;
- provide the exact action needed for human review.

## 12.3 Classify the image by purpose

Use one of these classifications:

### Decorative

The image adds atmosphere or visual styling but no information required to understand or operate the page.

Treatment:

```html
alt=""
```

For decorative inline SVG or icons, also ensure the element does not create a duplicate accessible name.

Do not write alt such as:

- “decorative flower”
- “colourful shape”
- “envelope icon”
- “heart icon”

when the image is purely decorative.

### Informative

The image communicates information not already conveyed by nearby text.

Treatment:

- concise contextual alt;
- describe the relevant subject and activity;
- omit irrelevant visual detail;
- avoid repeating the caption word for word.

### Functional

The image is the only or primary label for a link, button, or control.

Treatment:

- describe the action or destination, not merely visual appearance.

Example:

- prefer `alt="Contact Little Wise Kids"` over `alt="Envelope"` when the image is a contact link.

### Complex

The image contains a chart, diagram, map, infographic, or substantial text.

Treatment:

- concise alt identifying the image and its purpose;
- provide a nearby long description, data table, structured explanation, or equivalent content;
- do not put the entire complex description in one enormous alt attribute.

### Text-containing

The image contains meaningful text.

Treatment:

- use real HTML text when possible;
- if the image must remain, provide the essential text equivalently;
- preserve branding exceptions only when justified.

### Redundant

The image communicates exactly the same information as adjacent visible text.

Treatment:

- often `alt=""`;
- verify that hiding it does not remove meaning.

### Unknown or unavailable

The image could not be reliably evaluated.

Treatment:

- no invented alt;
- human review required.

## 12.4 Alt-writing requirements

For every informative image, propose exact alt text based on:

1. the visible image;
2. the image’s purpose in that specific location;
3. nearby text and captions;
4. the user task;
5. whether the same image is reused in a different context.

Good alt text should normally:

- be concise;
- identify the relevant subject;
- describe the relevant action or relationship;
- avoid “image of”, “picture of”, or “photo of” unless the medium itself matters;
- avoid file-name language;
- avoid SEO keyword stuffing;
- avoid repeating the page heading;
- avoid duplicating the caption;
- avoid subjective promotional interpretation;
- avoid guessing hidden facts.

Because the site depicts children, apply safeguarding-aware descriptions:

- do not identify a child by name unless the published context explicitly requires and authorises it;
- do not infer ethnicity, disability, diagnosis, religion, family relationship, nationality, or personal identity;
- do not guess exact ages;
- do not infer emotions solely from promotional context;
- avoid unnecessary details about appearance;
- describe the activity and setting rather than personally identifying characteristics.

Examples of appropriate style:

- `Child planting herbs in a raised garden bed`
- `Two children building a tower with wooden blocks`
- `Educator reading a picture book with a small group of children`
- `Child mixing ingredients at a low kitchen table`

These examples are style guidance only. Do not reuse them unless they accurately describe the actual image.

## 12.5 Contextual duplication checks

Examine:

- image plus caption;
- image plus nearby card title;
- logo plus link label;
- icon plus visible button text;
- icon plus `aria-label`;
- image inside figure;
- linked image plus surrounding text;
- SVG title plus labelled parent.

A descriptive alt is not always better. If a visible caption already conveys the complete purpose, a shorter alt or empty alt may provide a better experience.

## 12.6 Known image hotspots to verify

Verify these current or historical patterns:

- `HeroSection.astro` hero image with empty alt;
- `VisitSection.astro` image with `alt="???"`;
- `FaqSection.astro` raster icons with literal alt plus `aria-hidden`;
- `GallerySection.astro` remote images with existing descriptions;
- `our-gallery.astro` title-derived alt;
- blog listing and blog article `imageAlt` fields;
- `about-us.astro` images with empty alt;
- header and footer logos;
- value-card raster illustrations;
- decorative plane and shape images;
- icons implemented through `Icon.astro`;
- any newly added Sanity image components.

Do not presume that empty alt is wrong or that non-empty alt is correct.

## 12.7 Alt confidence

Assign:

- High: image and context are clear;
- Medium: likely purpose is clear but editorial confirmation is useful;
- Low: ambiguous image, crop, context, or identity;
- Unavailable: image could not be viewed.

Only High-confidence proposals may be marked ready for implementation without editorial review.

---

# PHASE 13 — SVG AND ICON SEMANTICS

Audit:

- `Icon.astro`;
- inline decorative SVG;
- standalone SVG images;
- icon-only controls;
- icons adjacent to visible text;
- status icons;
- social icons;
- logos.

Check:

- decorative icons are hidden;
- meaningful icons receive a name through the control or image;
- no duplicate names;
- SVG `title` or `desc` is used only when appropriate;
- role and aria attributes do not conflict;
- focusable SVG is prevented where required by browser support;
- colour-only status is avoided;
- icon name does not replace visible text unnecessarily.

For `Icon.astro`, verify:

- behaviour when `label` is supplied;
- behaviour without `label`;
- role exposure;
- accessible name calculation;
- whether the API encourages redundant labels;
- whether callers incorrectly label decorative icons.

Do not give every SVG its own accessible name.

---

# PHASE 14 — SANITY AND PORTABLE TEXT SEMANTICS

Locate the Sanity project, schemas, validation rules, preview configuration, and Portable Text serializers.

Audit whether editors can create:

- missing page titles;
- multiple page-level headings;
- incorrect heading levels;
- headings chosen by visual size;
- empty headings;
- paragraphs styled as headings;
- meaningless links;
- empty links;
- links containing only an image;
- images without purpose classification;
- informative images without alt text;
- decorative images with forced descriptive alt;
- captions unrelated to images;
- raw HTML;
- invalid list nesting;
- fake lists;
- unlabelled tables;
- quotations represented as ordinary paragraphs;
- embedded media without alternatives;
- language changes without metadata;
- inaccessible downloadable documents.

Recommend or implement in the later remediation phase:

- constrained block styles;
- semantic heading options;
- useful field descriptions;
- image-purpose selector;
- conditional alt validation;
- decorative-image option;
- caption fields;
- link validation;
- warnings for generic text such as “click here”;
- preview badges for missing image metadata;
- document validation summaries;
- editor guidance in plain language.

A recommended image schema should distinguish purpose rather than merely requiring alt on every image.

Conceptual example:

```ts
{
  name: "decorative",
  type: "boolean",
  description: "Turn on only when the image adds no information."
}
```

Then require alt only when the image is not decorative.

Do not implement a schema mechanically without fitting the project’s current structure.

---

# PHASE 15 — ASTRO COMPONENT API AUDIT

Review whether shared components make correct semantics easy and incorrect semantics difficult.

Audit:

- layout ownership of `main`;
- root-element choice;
- dynamic heading API;
- `Section.astro`;
- `Container.astro`;
- `Button.astro`;
- link/button variants;
- card root elements;
- image components;
- logo component;
- Portable Text renderer;
- icon API;
- form-field components;
- visually hidden text;
- navigation components.

Identify:

- hardcoded heading levels;
- hardcoded sectioning elements;
- components that silently create landmarks;
- components with ambiguous `as` props;
- components that accept invalid combinations;
- components that duplicate accessible names;
- components that omit required native attributes;
- components whose semantic output changes unpredictably.

For every proposed API change include:

- current problem;
- affected callers;
- desired semantic contract;
- TypeScript interface;
- example usage;
- migration impact;
- regression tests.

Avoid abstraction for its own sake.

---

# PHASE 16 — AUTOMATED REGRESSION CHECKS

Reuse existing Playwright accessibility infrastructure where possible.

Add deterministic checks for issues automation can reliably establish, such as:

- one visible primary `main`;
- no nested `main`;
- document language;
- unique page title;
- duplicate IDs;
- invalid HTML;
- empty interactive controls;
- controls without accessible names;
- invalid interactive nesting;
- buttons missing explicit type where source linting can establish risk;
- fragment links with missing targets;
- image `alt` attribute presence;
- prohibited placeholder alt values such as `???`;
- heading text not empty;
- hidden content not focusable;
- table header relationships;
- labels associated with controls;
- ARIA references to existing IDs.

Do not create brittle tests that encode one exact heading outline unless the outline is a deliberate project contract.

Do not automate conceptual decisions such as:

- whether a card is truly an article;
- whether a panel is truly an aside;
- whether an image is decorative;
- whether alt text is good;
- whether a heading accurately describes its content.

Those remain audited findings with human judgement.

Potential scripts, adapted to existing conventions:

- `test:html`
- `test:semantics`
- `test:semantics:headed`
- `test:semantics:report`

Do not duplicate existing scripts.

---

# PHASE 17 — MANUAL BROWSER REVIEW

For each representative route:

1. inspect the rendered DOM;
2. inspect the browser accessibility tree or role/name output;
3. list landmarks;
4. list headings;
5. inspect tab order;
6. open menus, details, submenus, and carousels;
7. confirm state attributes update;
8. inspect hidden and inert content;
9. inspect mobile and desktop variants;
10. inspect images in context;
11. compare source order with visual order;
12. record screenshots where visual context is necessary.

Use at minimum:

- Chromium desktop;
- WebKit desktop;
- a mobile Chromium viewport;
- a mobile WebKit viewport.

Use Firefox when already supported by the project’s Playwright setup.

Do not fabricate screen-reader announcements. This audit may inspect semantics through browser tooling, but actual assistive-technology results must be marked as separate verification unless genuinely tested.

---

# PHASE 18 — FINDINGS

Every finding must have:

- ID
- title
- status
- severity
- confidence
- category
- affected users or consumers
- affected routes
- affected components
- rendered evidence
- source evidence
- current markup
- expected semantic relationship
- relevant specification or official guidance
- root cause
- recommended remediation
- regression-test recommendation
- image evidence where relevant
- retest status

Use IDs such as:

- `SEM-DOC-001`
- `SEM-LANDMARK-001`
- `SEM-HEAD-001`
- `SEM-SECTION-001`
- `SEM-CONTROL-001`
- `SEM-FORM-001`
- `SEM-IMAGE-001`
- `SEM-CMS-001`

## Severity

### Critical

A primary user task or essential content is unavailable because the semantic implementation makes the control or content unusable.

### Serious

A major landmark, form, navigation mechanism, or interactive control is substantially misrepresented or inaccessible.

### Moderate

The structure remains usable but meaning, navigation, discoverability, or interoperability is materially weakened.

### Minor

The markup is usable but communicates meaning less precisely than it should, or creates limited redundancy.

### Recommendation

A semantic improvement that is not a confirmed defect.

Do not copy axe impact values as final severity.

Group repeated instances by root cause.

Example:

```text
SEM-LANDMARK-001
Nested main landmarks created by BaseLayout and page templates

Root cause:
BaseLayout owns a main element while multiple page files also emit main.

Affected routes:
...

Do not report one duplicate issue for every page.
```

---

# PHASE 19 — REQUIRED DELIVERABLES

Create the following directory and files:

```text
docs/semantic-html/
├── EXECUTIVE-SUMMARY.md
├── AUDIT-SCOPE.md
├── ROUTE-INVENTORY.md
├── COMPONENT-MATRIX.md
├── RENDERED-STRUCTURE.md
├── LANDMARK-REPORT.md
├── HEADING-REPORT.md
├── SECTIONING-REPORT.md
├── INTERACTIVE-ELEMENT-REPORT.md
├── FORM-REPORT.md
├── TABLE-AND-LIST-REPORT.md
├── IMAGE-INVENTORY.md
├── IMAGE-ALT-REVIEW.csv
├── SVG-AND-ICON-REPORT.md
├── SANITY-SEMANTICS.md
├── VALIDATION-RESULTS.md
├── AUTOMATED-COVERAGE.md
├── FINDINGS.md
├── FINDINGS.csv
├── REMEDIATION-PLAN.md
└── HUMAN-REVIEW-CHECKLIST.md
```

## EXECUTIVE-SUMMARY.md

Include:

- overall semantic quality;
- highest-risk systemic issues;
- strongest existing patterns;
- count by severity;
- routes and templates audited;
- image review status;
- CMS risks;
- automation coverage;
- limitations;
- immediate next steps.

## AUDIT-SCOPE.md

Include:

- date;
- commit;
- standard references;
- routes;
- templates;
- components;
- browsers;
- excluded content;
- unavailable content;
- environment;
- audit limitations.

## ROUTE-INVENTORY.md

Include all routes and representative-state coverage.

## COMPONENT-MATRIX.md

Include root semantics, heading behaviour, callers, and risk.

## RENDERED-STRUCTURE.md

Include a compact DOM/semantic outline for every representative page type.

## IMAGE-ALT-REVIEW.csv

Use these columns:

- Image ID
- Route
- Component
- Source
- Context
- Current Alt
- Classification
- Proposed Treatment
- Proposed Alt
- Caption
- Confidence
- Evidence
- Human Review
- Notes

## FINDINGS.csv

Use these columns:

- ID
- Severity
- Confidence
- Status
- Category
- Title
- Routes
- Components
- Summary
- Root Cause
- Recommendation
- Test
- Owner
- Retest Status

## REMEDIATION-PLAN.md

Order work by:

1. invalid document structure;
2. global landmarks;
3. shared component contracts;
4. controls and forms;
5. heading architecture;
6. sectioning misuse;
7. image and icon semantics;
8. Sanity safeguards;
9. content clean-up;
10. regression coverage.

Do not implement the remediation plan during the baseline audit.

---

# PHASE 20 — BASELINE EXECUTION

Execute:

1. repository discovery;
2. dependency inspection;
3. production build;
4. production-like preview;
5. route crawl;
6. generated HTML validation;
7. automated semantic checks;
8. rendered landmark inspection;
9. heading inspection;
10. sectioning-element review;
11. control review;
12. form review;
13. list and table review;
14. content-element review;
15. image inventory;
16. visual inspection of available images;
17. alt proposal creation;
18. SVG and icon review;
19. Sanity schema review;
20. final report generation;
21. existing test suite;
22. final production build.

Record exact commands and results.

Do not report a route as passed if it was not rendered with representative content.

Do not report an image as reviewed if only the filename or existing alt was examined.

---

# HUMAN CHECKPOINT

After the baseline audit, stop and present:

- files added;
- files modified;
- dependencies added;
- commands executed;
- routes audited;
- components audited;
- images discovered;
- images visually reviewed;
- images unavailable;
- high-confidence alt proposals;
- alt proposals requiring editorial review;
- findings by severity;
- validation failures;
- systemic root causes;
- recommended remediation order;
- audit limitations.

Ask the human to review:

- route scope;
- page-level semantic outlines;
- disputed article/section/aside decisions;
- image classifications;
- proposed alt text;
- safeguarding-sensitive image wording;
- CMS fields not represented in local fixtures;
- remediation priorities.

Do not begin broad remediation until the human approves the baseline.

---

# COMPLETION CRITERIA

The GOAL may be marked complete only when:

- every current route is inventoried;
- every unique page template is rendered and reviewed;
- every shared structural component is audited;
- final generated HTML is validated;
- all page-level landmarks are documented;
- all heading structures are documented;
- all uses of section, article, aside, nav, header, footer, and generic containers are assessed at least at the shared-component/root-cause level;
- all interactive-control types are inventoried;
- all forms are audited;
- all table-like and list-like structures are reviewed;
- every discovered image has an inventory record;
- every available meaningful image has been visually inspected;
- every image has a purpose classification;
- every informative image has an exact proposed alt or a documented reason why one cannot yet be written;
- decorative and redundant images are explicitly identified;
- functional and complex images have appropriate treatment recommendations;
- all SVG and icon patterns are audited;
- Sanity and Portable Text semantics are reviewed;
- confirmed findings are tied to rendered and source evidence;
- duplicate symptoms are grouped by root cause;
- automated checks exist for reliable invariants;
- existing project tests pass or failures are documented;
- the Astro production build passes or blockers are documented;
- all required deliverables exist;
- no unsupported conformance claim is made;
- no image description has been invented without visual evidence;
- the baseline has been presented for human review.

Begin now with **Phase 0 — Repository Discovery**.