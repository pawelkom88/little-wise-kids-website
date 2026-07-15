# Little Wise Kids — CSS and JavaScript Loading & Bloat Audit Prompt

## ROLE

Act as a senior Astro performance engineer, frontend architecture reviewer, JavaScript runtime analyst, CSS delivery specialist, and build-output auditor.

You are working inside the **Little Wise Kids** Astro website repository.

Your task is to audit how CSS and JavaScript are authored, bundled, split, loaded, executed, and reused across routes.

This is a focused audit.

Do not perform a full Core Web Vitals audit, image audit, accessibility audit, semantic HTML audit, SEO audit, or Cloudflare infrastructure audit unless a CSS or JavaScript issue directly depends on one of those areas.

The final rendered and built output is the source of truth. Source files are used to locate root causes.

Do not rely on fixed line numbers. The markup and file structure may change. Locate current implementations by route, component responsibility, generated asset, selector, script URL, module, and runtime behaviour.

---

# GOAL

Create a complete, evidence-based CSS and JavaScript loading audit that:

1. identifies CSS and JavaScript loaded by every route;
2. distinguishes global, shared, route-specific, component-specific, inline, external, and dynamically loaded assets;
3. identifies unused, duplicated, oversized, over-shared, render-blocking, and unnecessarily early-loaded code;
4. maps generated build files back to the Astro source that created them;
5. checks whether route-specific code is leaking into unrelated routes;
6. checks whether shared code is duplicated rather than reused;
7. evaluates Astro script processing and hydration directives;
8. measures initial-load and post-interaction code coverage;
9. identifies expensive JavaScript execution and CSS rendering work;
10. proposes the smallest maintainable corrections;
11. creates regression tests and bundle budgets;
12. verifies every accepted optimisation with before-and-after evidence;
13. preserves accessibility, semantics, design, SEO, and functionality.

The GOAL is not “make the bundles as small as possible.”

The GOAL is:

> Ensure every route loads only the CSS and JavaScript it genuinely needs, at the correct time, with minimal duplication and runtime cost, while preserving maintainability and user experience.

If a goal/task system is available, create and activate this GOAL before beginning.

Do not mark the GOAL complete until all completion criteria in this prompt have evidence.

---

# PROJECT CONTEXT

Known project context:

- Framework: Astro
- CMS target: Sanity
- Hosting target: Cloudflare
- Architecture preference: static-first
- Website: Little Wise Kids
- Editors: non-technical users
- Preserve the current design system, CSS tokens, responsive behaviour, and component architecture
- Do not introduce a client-heavy framework
- Do not add hydration to static Astro components
- Do not remove useful interactions merely to reduce bundle size
- Do not reduce accessibility or semantic quality
- Do not change DNS, email, or unrelated infrastructure
- Use British English in reports

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

Verify the current route inventory from the repository.

Known files and components observed in the supplied source include:

- `src/layouts/BaseLayout.astro`
- `src/components/layout/SiteHeader.astro`
- `src/components/layout/SiteFooter.astro`
- `src/components/sections/GallerySection.astro`
- `src/components/sections/FaqSection.astro`
- components under `src/components/sections/Values/`
- `src/pages/contact.astro`
- `src/pages/blog/index.astro`
- `src/pages/blog/[slug].astro`
- `src/styles/fonts.css`
- `src/styles/site.css`
- page-specific CSS files

Verify all paths before using them.

---

# STARTING HYPOTHESES

The supplied partial source suggests possible areas to investigate.

These are hypotheses only. Do not report them as findings without build and runtime evidence.

## CSS hypotheses

- Global styles may include rules used by only a small subset of routes.
- Page-specific styles may be imported globally or duplicated.
- Component-scoped styles may produce repeated generated CSS.
- Multiple pages may use similar hero styles that could either be safely shared or may currently be duplicated.
- CSS background images may increase stylesheet payload or create late asset discovery.
- Animation styles may trigger expensive paint or layout.
- Font declarations may include unused weights.
- Large global CSS files may contain selectors unused on most routes.
- Visually similar components may have copied CSS rather than shared tokens or primitives.
- CSS imports may create avoidable request chains.

## JavaScript hypotheses

The partial source appears to include:

- site-header JavaScript;
- gallery JavaScript;
- value-section animation scripts;
- blog JavaScript;
- contact-form validation;
- external Web3Forms JavaScript.

Investigate whether:

- route-only code is loaded globally;
- small scripts are duplicated across pages;
- inline scripts are emitted repeatedly;
- event listeners initialise more than once;
- menu code runs on pages that do not require it;
- gallery code is loaded before the gallery is relevant;
- form code loads outside the contact route;
- third-party form code loads earlier than required;
- external scripts use appropriate loading behaviour;
- scripts can be replaced by native HTML or CSS;
- generated modules contain duplicate helpers or dependencies;
- long-running handlers or forced layouts exist.

Do not add `async`, `defer`, dynamic imports, or hydration directives mechanically.

---

# AUTHORITATIVE SOURCES

Use current official documentation.

Primary references:

- Astro client-side scripts:
    - https://docs.astro.build/en/guides/client-side-scripts/
- Astro client directives:
    - https://docs.astro.build/en/reference/directives-reference/
- Astro build configuration:
    - https://docs.astro.build/en/reference/configuration-reference/
- Vite build documentation:
    - https://vite.dev/guide/build
- Rollup code splitting:
    - https://rollupjs.org/
- Chrome DevTools Coverage:
    - https://developer.chrome.com/docs/devtools/coverage/
- Chrome DevTools Performance:
    - https://developer.chrome.com/docs/devtools/performance/
- Chrome DevTools MCP:
    - https://github.com/ChromeDevTools/chrome-devtools-mcp
- JavaScript modules:
    - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
- Script loading:
    - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script
- CSS containment:
    - https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment
- `content-visibility`:
    - https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility

Use the current documentation if behaviour has changed.

---

# OPERATING RULES

1. Inspect the repository before installing anything.
2. Detect and use the existing package manager.
3. Inspect existing build, test, lint, and analysis tools.
4. Do not install duplicate tooling.
5. Audit the production build, not only source files.
6. Audit route-level output.
7. Measure code coverage before calling code unused.
8. Measure both initial page load and important interactions.
9. Do not remove code because it is unused on initial load if it is required after interaction.
10. Do not rely on a single route.
11. Do not rely on a single browser trace.
12. Do not use regex alone to detect dead code.
13. Do not treat every global style as bloat.
14. Do not treat every shared chunk as a problem.
15. Do not split tiny assets when the extra requests and complexity outweigh savings.
16. Do not merge everything into one global file merely to reduce request count.
17. Do not add manual chunks without understanding Vite/Rollup’s current output.
18. Do not add manual module preloads unless generated preload behaviour is insufficient.
19. Do not add hydration to static Astro components.
20. Do not add `client:load` because a component contains JavaScript.
21. Do not add `async` or `defer` to Astro-processed module scripts without inspecting final output.
22. Do not convert processed scripts to `is:inline` without a clear reason.
23. Do not convert inline scripts into global bundles automatically.
24. Do not remove source maps without considering debugging and security policy.
25. Do not remove CSS selectors based only on one route or viewport.
26. Do not break responsive states.
27. Do not remove reduced-motion or accessibility styles.
28. Do not remove print styles without verifying whether they are required.
29. Do not remove focus, hover, active, error, open, expanded, or hidden-state CSS because it is absent during the initial screenshot.
30. Preserve visual design.
31. Preserve no-JavaScript behaviour where intended.
32. Group duplicate symptoms by root cause.
33. Quantify impact.
34. Stop after the baseline audit for human review.
35. Retain an optimisation only when before-and-after evidence supports it.

---

# PHASE 0 — REPOSITORY DISCOVERY

Inspect:

- Astro version;
- Node.js version;
- package manager;
- lockfile;
- build scripts;
- output mode;
- adapter;
- integrations;
- `astro.config.*`;
- Vite configuration;
- CSS preprocessors;
- PostCSS;
- Tailwind or utility systems;
- global CSS imports;
- component styles;
- page-specific styles;
- CSS modules;
- Sass/Less/Stylus if present;
- custom properties;
- CSS reset;
- font styles;
- print styles;
- JavaScript source files;
- Astro `<script>` blocks;
- `is:inline` scripts;
- external scripts;
- framework components;
- hydration directives;
- dynamic imports;
- third-party dependencies;
- analytics;
- form scripts;
- generated build output;
- CI;
- performance budgets;
- bundle-analysis tooling;
- test infrastructure.

Create:

- route inventory;
- CSS source inventory;
- JavaScript source inventory;
- hydration inventory;
- third-party script inventory;
- generated asset inventory.

For every route record:

- route;
- page file;
- layout;
- loaded CSS files;
- loaded JS files;
- inline CSS;
- inline JS;
- third-party scripts;
- hydrated islands;
- important interactive states;
- audit status.

Do not install tools until discovery is complete.

---

# PHASE 1 — PRODUCTION BUILD

Run the production Astro build.

Record:

- build command;
- build duration;
- generated routes;
- generated CSS files;
- generated JavaScript files;
- inline styles;
- inline scripts;
- source maps;
- chunk names;
- file sizes;
- compressed sizes where available;
- warnings;
- duplicated asset warnings;
- large chunk warnings.

Create a build-output manifest.

For each generated CSS and JavaScript file record:

- output filename;
- raw size;
- gzip size;
- Brotli size where available;
- source modules;
- importing routes;
- request type;
- cacheability;
- shared or route-specific;
- initial or deferred.

If source maps are available, use them to map generated code back to source.

Do not commit generated build output unless project convention requires it.

---

# PHASE 2 — ROUTE-TO-ASSET MAP

Build an exact route-to-asset matrix.

For every representative route capture:

- CSS requests;
- JavaScript requests;
- inline styles;
- inline scripts;
- module-preload links;
- preloads;
- third-party scripts;
- dynamic requests after interaction.

Use the production preview.

Create:

- `docs/css-js-audit/ROUTE-ASSET-MATRIX.md`
- `docs/css-js-audit/ROUTE-ASSET-MATRIX.csv`

Required columns:

- Route
- Page Template
- CSS Asset
- CSS Bytes
- JS Asset
- JS Bytes
- Inline CSS Bytes
- Inline JS Bytes
- Shared
- Initial Load
- Interaction Load
- Third Party
- Notes

Identify:

- route-only assets loaded globally;
- global assets unused on most routes;
- duplicate route assets;
- one route loading multiple near-identical chunks;
- hidden or unused component code loaded initially;
- shared code emitted repeatedly;
- excessive inline duplication.

Do not conclude that shared code is wrong merely because several routes load it.

---

# PHASE 3 — CHROME DEVTOOLS COVERAGE

Use Chrome DevTools Coverage or equivalent browser coverage tooling.

Measure separately for:

1. initial page load;
2. after opening desktop navigation;
3. after opening mobile navigation;
4. after using gallery controls;
5. after expanding FAQ items;
6. after triggering contact-form validation;
7. after submitting through a safe mocked flow;
8. after scrolling through animation-heavy sections;
9. after navigating a representative blog page.

For every route and state record:

- CSS bytes loaded;
- CSS bytes used;
- CSS bytes unused;
- JavaScript bytes loaded;
- JavaScript bytes executed;
- JavaScript bytes unused;
- percentage;
- asset;
- state;
- browser;
- viewport.

Important:

- Initial-load unused code is not automatically removable.
- Code required by a later interaction must be classified as deferred-use code.
- Code unused across all representative states is a stronger removal candidate.
- Dynamic classes and CMS content require caution.
- Browser coverage may count code conservatively or differently across runs.

Create:

- `docs/css-js-audit/COVERAGE-RESULTS.md`
- `docs/css-js-audit/COVERAGE-RESULTS.csv`

Group findings by generated asset and source root cause.

---

# PHASE 4 — CSS ARCHITECTURE AUDIT

Inspect how CSS enters the build.

Classify:

- reset/base styles;
- tokens;
- typography;
- layout primitives;
- global components;
- route-level styles;
- component-scoped styles;
- state styles;
- responsive styles;
- animation styles;
- print styles;
- third-party styles.

For every CSS source determine:

- which routes require it;
- whether it is imported globally;
- whether Astro extracts it;
- whether it is duplicated;
- whether it contains route-only rules;
- whether it depends on DOM structure;
- whether selectors are overly broad;
- whether style ownership is clear.

Evaluate whether shared CSS is genuinely shared.

A stylesheet should be global only when multiple routes genuinely require it or when global delivery is measurably simpler and smaller than splitting.

Do not split a tiny stylesheet into a separate request without considering total cost.

---

# PHASE 5 — UNUSED AND DUPLICATED CSS

Identify candidates through:

- Chrome Coverage;
- generated CSS comparison;
- source search;
- route screenshots;
- responsive-state testing;
- interactive-state testing;
- print and reduced-motion review.

Check for:

- exact duplicate rules;
- near-duplicate component rules;
- copied media-query blocks;
- duplicate custom properties;
- duplicate keyframes;
- repeated font declarations;
- duplicate resets;
- stale classes;
- selectors for removed components;
- route styles loaded globally;
- desktop-only styles loaded on mobile;
- mobile-only styles loaded on desktop;
- state styles never produced by JavaScript or markup.

Do not remove:

- focus styles;
- error states;
- open/closed states;
- hover styles;
- reduced-motion rules;
- print styles;
- CMS-generated classes;
- classes built dynamically;
- future states explicitly supported by the component API;

without evidence.

For each removal candidate include:

- selector;
- source file;
- generated asset;
- routes searched;
- states tested;
- confidence;
- proposed action;
- regression test.

---

# PHASE 6 — CSS DELIVERY AND RENDER BLOCKING

Inspect generated HTML and network loading.

Check:

- stylesheet request count;
- stylesheet order;
- render-blocking CSS;
- CSS imports;
- nested imports;
- duplicate stylesheet requests;
- preload usage;
- unused preloads;
- inline CSS size;
- route-specific CSS;
- critical above-fold rules;
- late-applied CSS;
- flashes of unstyled content;
- flashes caused by client-side classes;
- font CSS discovery.

Do not introduce asynchronous CSS loading automatically.

Do not inline all route CSS.

Evaluate whether Astro’s normal CSS extraction is already optimal.

If critical CSS is proposed, document:

- measured render delay;
- exact critical rules;
- route scope;
- inline size;
- duplication cost;
- cache trade-off;
- maintenance cost;
- fallback.

---

# PHASE 7 — CSS RUNTIME COST

Use performance traces to inspect:

- style recalculation;
- layout;
- paint;
- composite;
- invalidation;
- expensive selectors;
- large DOM interaction;
- animation;
- sticky/fixed elements;
- blur;
- filters;
- backdrop filters;
- box shadows;
- clip paths;
- large paint areas;
- scroll-driven effects.

Audit current animations for:

- `top`, `left`, `width`, `height`, margins, or padding changes;
- transform and opacity usage;
- repeated layout reads and writes;
- scroll handlers;
- IntersectionObserver;
- keyframe duplication;
- reduced-motion behaviour.

Do not label an animation expensive without trace evidence.

Record:

- route;
- component;
- interaction;
- trace event;
- duration;
- affected area;
- recommendation.

---

# PHASE 8 — CSS SCOPING AND COMPONENT OWNERSHIP

Review Astro component styles.

Determine whether:

- a component owns its styles;
- parent pages override internals excessively;
- global selectors leak into components;
- component selectors depend on page-specific ancestors;
- component styles are duplicated by repeated implementations;
- styles are copied instead of shared through tokens or primitives;
- one component’s style is emitted several times;
- scoped style attributes create avoidable selector complexity.

Do not refactor merely for aesthetic consistency.

Recommend consolidation only when it:

- removes measurable duplication;
- improves ownership;
- reduces route payload;
- prevents regressions;
- does not create a giant global stylesheet.

---

# PHASE 9 — JAVASCRIPT INVENTORY

Inventory every JavaScript source:

- Astro processed scripts;
- `is:inline` scripts;
- standalone modules;
- framework components;
- hydrated islands;
- external scripts;
- event-handler attributes;
- dynamically imported modules;
- third-party packages.

For each script record:

- source path;
- output chunk;
- routes;
- raw size;
- compressed size;
- module or classic;
- inline or external;
- loading attributes;
- execution timing;
- interaction purpose;
- initial-load requirement;
- dependency list;
- duplicate status;
- recommendation.

Create:

- `docs/css-js-audit/JAVASCRIPT-INVENTORY.md`
- `docs/css-js-audit/JAVASCRIPT-INVENTORY.csv`

---

# PHASE 10 — ASTRO SCRIPT PROCESSING

Understand current Astro output before changing scripts.

For each `<script>` determine whether Astro:

- bundles it;
- converts it to a module;
- deduplicates it;
- inlines it;
- leaves it untouched through `is:inline`;
- includes it only on routes using the component;
- shares it across routes.

Check:

- repeated component instances;
- multiple scripts in the same component;
- scripts imported through layouts;
- scripts in globally used header/footer components;
- scripts inserted by page components;
- scripts duplicated through inline markup.

Do not add `type="module"` if Astro already outputs a module.

Do not add `defer` to module scripts without a reason.

Do not use `is:inline` solely to control execution order.

Do not convert every small script to an external file.

Document actual generated behaviour.

---

# PHASE 11 — ROUTE-SCOPED JAVASCRIPT

Identify scripts that should only exist on specific routes.

Likely candidates to verify:

- contact form validation;
- Web3Forms integration;
- gallery controls;
- blog interactions;
- page-specific animations;
- calculators or specialist widgets;
- route-only disclosures.

For each route-only script determine:

- whether it is currently global;
- why it is global;
- output size;
- execution cost;
- whether route scoping is possible;
- whether dynamic import is justified;
- whether normal Astro component inclusion already scopes it.

Do not introduce dynamic import when normal route-level component loading already excludes the script.

---

# PHASE 12 — SHARED AND DUPLICATED JAVASCRIPT

Inspect generated chunks and source maps.

Check for:

- duplicate helpers;
- repeated utility functions;
- copied menu logic;
- copied IntersectionObserver setup;
- repeated DOM-ready wrappers;
- repeated form helpers;
- duplicated framework runtime;
- same dependency in multiple island bundles;
- multiple versions of one package;
- barrel imports pulling unnecessary modules;
- whole-library imports;
- side-effectful packages preventing tree shaking.

Use a bundle visualiser only if generated composition is not clear.

Do not force all shared logic into one global chunk.

A shared chunk is appropriate when:

- several routes use it;
- caching benefits are meaningful;
- execution is not forced on unrelated routes;
- the chunk is not disproportionately large.

---

# PHASE 13 — TREE SHAKING AND DEAD CODE

Inspect:

- package imports;
- named imports;
- default imports;
- barrel files;
- side effects;
- package `sideEffects`;
- dynamic access patterns;
- unused exports;
- feature flags;
- old implementations;
- unreachable branches;
- browser polyfills;
- duplicated utility libraries.

Verify build behaviour.

Do not assume Vite/Rollup tree shaking removes all unused code.

Do not remove an export without checking all static and dynamic consumers.

For each dead-code candidate include:

- source;
- generated output presence;
- usage search;
- runtime coverage;
- confidence;
- removal plan;
- tests.

---

# PHASE 14 — ASTRO HYDRATION AUDIT

Search for:

- `client:load`;
- `client:idle`;
- `client:visible`;
- `client:media`;
- `client:only`.

For every hydrated component record:

- component;
- route;
- framework;
- bundle;
- dependencies;
- initial server HTML;
- hydration timing;
- interaction timing;
- viewport visibility;
- necessity;
- accessibility before hydration;
- proposed directive.

Evaluate:

## `client:load`

Use only when immediate interaction is genuinely required.

## `client:idle`

Consider for non-critical interactive components that may initialise after the main page work.

## `client:visible`

Consider for below-fold components that do not need JavaScript before approaching the viewport.

## `client:media`

Consider where interaction only exists under a specific media condition.

## `client:only`

Use only when server rendering is not possible.

Do not add hydration to static Astro components.

Do not change a directive solely based on component position. Measure user interaction requirements.

---

# PHASE 15 — SCRIPT LOADING STRATEGY

For each script choose one of:

- no script required;
- normal Astro processed script;
- external module;
- inline script;
- deferred classic script;
- asynchronous independent script;
- dynamic import;
- interaction-triggered load;
- idle initialisation;
- visibility-triggered load;
- media-triggered load;
- third-party route-only load.

Create:

- `docs/css-js-audit/SCRIPT-LOADING-MATRIX.md`

Columns:

- Script
- Route
- Current Loading
- Current Timing
- Initial Requirement
- Interaction Requirement
- Bytes
- Execution Cost
- Proposed Loading
- Evidence
- Retest

## `defer`

Use for classic scripts that:

- depend on parsed DOM;
- should preserve order;
- are not modules;
- do not need to block parsing.

## `async`

Use only for independent scripts where execution order is irrelevant.

## Module scripts

Remember that modules are deferred by default.

Do not add redundant attributes.

## Dynamic import

Use when:

- code is not required initially;
- the feature is optional or interaction-triggered;
- the split meaningfully reduces initial payload;
- loading delay remains acceptable;
- error handling exists.

Do not dynamically import tiny code purely to create more chunks.

## Interaction-triggered third parties

Consider loading a third-party script after interaction when:

- it is not needed for initial rendering;
- delay does not break user expectations;
- fallback and errors are handled;
- privacy and consent requirements are respected.

Do not delay essential form validation until after submission begins if that creates broken behaviour.

---

# PHASE 16 — THIRD-PARTY JAVASCRIPT

Inventory:

- Web3Forms;
- analytics;
- maps;
- social embeds;
- video;
- fonts loaded through script;
- consent tools;
- monitoring;
- any external widgets.

For each record:

- origin;
- purpose;
- route;
- bytes;
- requests;
- execution;
- loading mode;
- cache;
- privacy;
- failure behaviour;
- fallback;
- owner.

Check whether third-party scripts:

- load globally;
- block rendering;
- execute before needed;
- create long tasks;
- duplicate functionality;
- inject CSS;
- add layout shifts;
- create extra origins;
- fail gracefully.

Do not remove a business-critical third party without documenting functional replacement.

---

# PHASE 17 — EVENT LISTENERS AND INITIALISATION

Inspect runtime behaviour.

Check:

- duplicate listener registration;
- repeated initialisation after Astro navigation or component reuse;
- listeners attached to every item instead of delegation;
- unremoved listeners;
- global listeners;
- passive scroll/touch listeners;
- resize handlers;
- mutation observers;
- IntersectionObservers;
- timers;
- animation frames;
- DOM queries;
- script execution on hidden content.

Verify:

- header/menu scripts initialise once;
- gallery scripts initialise once;
- FAQ native controls do not have redundant JavaScript;
- animations stop observing elements when appropriate;
- form listeners are route-scoped;
- handlers do not force layout.

Use trace evidence.

---

# PHASE 18 — LONG TASKS AND MAIN-THREAD EXECUTION

Record performance traces for representative interactions.

Identify:

- long tasks;
- script evaluation;
- handler duration;
- forced reflow;
- style recalculation;
- layout;
- paint;
- garbage collection;
- repeated queries;
- large loops;
- JSON processing;
- third-party work.

For each problem include:

- task duration;
- script;
- function;
- route;
- interaction;
- source location where available;
- impact;
- proposed fix.

Prefer:

- less work;
- event delegation;
- smaller DOM;
- batched reads and writes;
- yielding;
- delayed non-essential work;
- native HTML;
- CSS;
- removal.

Do not move expensive work to a later time without considering user impact.

---

# PHASE 19 — INLINE CSS AND JAVASCRIPT

Audit all inline styles and scripts.

For inline CSS record:

- bytes per route;
- duplication;
- route specificity;
- cache trade-off;
- CSP implications;
- generated versus handwritten source.

For inline JavaScript record:

- bytes per route;
- duplication;
- parse/execution;
- CSP implications;
- ability to deduplicate;
- ordering dependency.

Inlining can be beneficial for very small route-specific code.

Do not externalise every inline block.

Do not inline large repeated code into every page.

---

# PHASE 20 — SOURCE MAPS AND DEBUGGING

Inspect production source-map policy.

Determine:

- whether source maps are emitted;
- whether they are public;
- whether they are hidden;
- whether they are uploaded to monitoring;
- whether they expose source;
- whether they increase deployment size;
- whether they are required for debugging.

Do not disable source maps solely to reduce build output.

Do not publicly expose them without understanding the project’s policy.

---

# PHASE 21 — BUNDLE VISUALISATION

Use a Vite/Rollup bundle visualiser only if needed.

Use it when:

- chunks are large;
- module composition is unclear;
- duplicate dependencies are suspected;
- tree shaking appears ineffective;
- island bundles are unexpectedly large.

Do not permanently add it to the normal production build unless useful.

If installed, create a separate analysis command such as:

```text
analyse:bundle
```

Adapt to repository conventions.

Store generated visualisation outside deployed output.

Document:

- largest modules;
- duplicate packages;
- framework runtime cost;
- route-only modules;
- shared modules;
- suspicious dependencies.

---

# PHASE 22 — CSS AND JAVASCRIPT BUDGETS

Create route-level budgets after establishing the baseline.

Possible budgets:

- initial CSS bytes;
- total CSS bytes;
- initial JavaScript bytes;
- total JavaScript bytes;
- third-party JavaScript bytes;
- inline JavaScript bytes;
- number of CSS files;
- number of JS files;
- unused CSS percentage;
- unused JS percentage after representative states;
- long-task duration;
- maximum chunk size.

Do not use one universal limit for every route without considering route complexity.

Budgets should:

- prevent regression;
- allow normal build variance;
- distinguish shared and route-specific code;
- include rationale;
- include review dates;
- not encourage harmful splitting.

Create:

- `docs/css-js-audit/BUDGETS.md`

---

# PHASE 23 — AUTOMATED REGRESSION CHECKS

Add deterministic checks where reliable.

Potential checks:

- route asset manifest diff;
- maximum route CSS bytes;
- maximum route JS bytes;
- no contact-form script outside contact route;
- no gallery script outside routes using gallery;
- no duplicate script URL on one page;
- no duplicate stylesheet URL;
- no unexpected inline-script growth;
- no new global CSS import without explicit review;
- no new hydration directive without review;
- no production chunk exceeding agreed limit;
- no duplicate package versions where detectable;
- build output snapshot with approved thresholds.

Do not assert exact hashed filenames.

Use asset roles, source modules, sizes, and route relationships.

Do not make browser coverage percentages hard CI failures until stable and reproducible.

---

# PHASE 24 — REQUIRED DELIVERABLES

Create:

```text
docs/css-js-audit/
├── EXECUTIVE-SUMMARY.md
├── AUDIT-SCOPE.md
├── ROUTE-INVENTORY.md
├── BUILD-OUTPUT.md
├── ROUTE-ASSET-MATRIX.md
├── ROUTE-ASSET-MATRIX.csv
├── CSS-INVENTORY.md
├── CSS-INVENTORY.csv
├── CSS-COVERAGE.md
├── CSS-COVERAGE.csv
├── CSS-DUPLICATION.md
├── CSS-RUNTIME-COST.md
├── JAVASCRIPT-INVENTORY.md
├── JAVASCRIPT-INVENTORY.csv
├── JAVASCRIPT-COVERAGE.md
├── JAVASCRIPT-COVERAGE.csv
├── JAVASCRIPT-EXECUTION.md
├── ASTRO-SCRIPT-AUDIT.md
├── ASTRO-HYDRATION-AUDIT.md
├── THIRD-PARTY-AUDIT.md
├── SCRIPT-LOADING-MATRIX.md
├── BUNDLE-ANALYSIS.md
├── BUDGETS.md
├── FINDINGS.md
├── FINDINGS.csv
├── REMEDIATION-PLAN.md
├── BEFORE-AFTER.md
└── HUMAN-REVIEW-CHECKLIST.md
```

Store generated analysis artifacts in an ignored location such as:

```text
test-results/css-js-audit/
├── coverage/
├── bundles/
├── traces/
├── manifests/
└── screenshots/
```

Adapt to repository conventions.

## FINDINGS.csv columns

- ID
- Severity
- Priority
- Confidence
- Status
- Category
- Title
- Routes
- Source Files
- Generated Assets
- Baseline Bytes
- Used Bytes
- Unused Bytes
- Execution Cost
- Root Cause
- Recommendation
- Expected Impact
- Owner
- Retest Status

Use IDs such as:

- `BLOAT-CSS-001`
- `BLOAT-JS-001`
- `BLOAT-ROUTE-001`
- `BLOAT-DUP-001`
- `BLOAT-HYDRATE-001`
- `BLOAT-THIRD-001`
- `BLOAT-RUNTIME-001`

---

# PHASE 25 — BASELINE EXECUTION

Execute in this order:

1. repository discovery;
2. tool inspection;
3. production build;
4. generated asset inventory;
5. route-to-asset mapping;
6. initial-load coverage;
7. post-interaction coverage;
8. CSS architecture review;
9. CSS duplication review;
10. CSS runtime trace;
11. JavaScript inventory;
12. Astro script processing review;
13. hydration review;
14. route-scoping review;
15. duplicate-module review;
16. tree-shaking review;
17. third-party review;
18. event-listener review;
19. long-task analysis;
20. inline-code review;
21. bundle visualisation if required;
22. budget proposal;
23. findings;
24. reports;
25. existing tests;
26. clean production build.

At baseline stage:

- add only audit infrastructure;
- do not broadly refactor production CSS or JavaScript;
- do not introduce new loading strategies;
- do not remove code.

---

# HUMAN CHECKPOINT 1 — BASELINE REVIEW

Stop after the baseline.

Present:

- files added;
- dependencies added;
- commands executed;
- routes audited;
- total CSS by route;
- total JS by route;
- initial CSS and JS by route;
- unused code results;
- deferred-use code;
- duplicate CSS;
- duplicate JS;
- global leakage;
- route-specific leakage;
- largest chunks;
- hydrated islands;
- third-party cost;
- long tasks;
- proposed budgets;
- findings by severity;
- remediation order;
- limitations.

Ask the human to review:

- route scope;
- interactions tested;
- visually important CSS;
- required third-party scripts;
- acceptable code-splitting complexity;
- budget thresholds;
- remediation priorities.

Do not begin broad remediation until approved.

---

# PHASE 26 — REMEDIATION

After approval, work in small groups.

Typical order:

1. route-only code loaded globally;
2. duplicated CSS or JavaScript;
3. unnecessary hydration;
4. expensive initial scripts;
5. large unused dependencies;
6. third-party loading;
7. repeated inline code;
8. unused CSS;
9. expensive CSS runtime effects;
10. minor build cleanup.

For each fix:

1. reference finding ID;
2. state the measured problem;
3. identify the current source root cause;
4. implement the smallest maintainable change;
5. rebuild;
6. rerun route-to-asset mapping;
7. rerun relevant coverage;
8. rerun runtime traces;
9. run existing tests;
10. verify visual and functional behaviour;
11. update before-and-after report.

Do not combine unrelated refactors.

Do not retain a change when:

- bytes do not meaningfully improve;
- execution does not improve;
- another route regresses;
- visual output changes unexpectedly;
- functionality breaks;
- maintenance complexity becomes excessive.

---

# HUMAN CHECKPOINT 2 — VISUAL AND FUNCTIONAL REVIEW

Provide exact routes and interactions.

Ask the human to verify:

- header and navigation;
- mobile menu;
- gallery;
- FAQ;
- contact form;
- blog pages;
- animations;
- responsive layout;
- reduced motion;
- focus and keyboard behaviour;
- no flash of unstyled content;
- no delayed broken interactions.

---

# PHASE 27 — FINAL VERIFICATION

After approved remediation:

- run clean production build;
- compare generated asset manifest;
- compare CSS and JS bytes by route;
- rerun initial coverage;
- rerun interaction coverage;
- rerun traces;
- rerun bundle analysis if used;
- run existing tests;
- verify all representative routes;
- verify accessibility and semantics;
- update budgets;
- update CI;
- update all findings.

Classify every finding:

- fixed and verified;
- fixed awaiting human review;
- accepted limitation;
- false positive with evidence;
- deferred;
- unresolved;
- out of scope.

Do not report “zero bloat.”

Report what is loaded, why it is loaded, and whether that decision is justified.

---

# COMPLETION CRITERIA

The GOAL may be marked complete only when:

- the full repository has been discovered;
- every current route is inventoried;
- a production build has been audited;
- every generated CSS asset is inventoried;
- every generated JS asset is inventoried;
- every representative route has a route-to-asset map;
- initial-load coverage exists;
- important post-interaction coverage exists;
- global CSS is justified or flagged;
- global JavaScript is justified or flagged;
- route-specific leakage is identified;
- duplicated CSS is identified;
- duplicated JavaScript is identified;
- Astro script processing is documented;
- all hydration directives are reviewed;
- third-party scripts are reviewed;
- long tasks and expensive handlers are reviewed;
- route-level CSS and JS budgets exist;
- regression checks exist;
- all accepted changes have before-and-after evidence;
- responsive design is verified;
- accessibility is verified;
- semantics are preserved;
- current tests pass or failures are documented;
- the final Astro build passes or blockers are documented;
- all required reports exist;
- no fixed line-number instruction is used;
- no unsupported claim of “zero bloat” is made.

Begin now with **Phase 0 — Repository Discovery**.