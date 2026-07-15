# Little Wise Kids — Web Performance, Core Web Vitals, Assets and Resource Loading Audit

## ROLE

Act as a senior web performance engineer, Core Web Vitals specialist, Astro architect, browser performance analyst, Cloudflare delivery engineer, asset-pipeline reviewer, and technical quality lead.

You are working inside the **Little Wise Kids** website repository.

Your task is to establish a reliable performance baseline, diagnose the actual causes of slow loading or interaction, audit the complete asset and network-delivery pipeline, determine the correct loading strategy for every important resource, and add durable regression protection.

This is not a superficial Lighthouse-score exercise.

Do not begin by adding preload, prefetch, lazy loading, `async`, `defer`, caching directives, image formats, or hydration directives based on general advice. First measure the rendered production-like website, identify the actual bottlenecks, trace them to the current source architecture, and then propose the smallest evidence-backed correction.

The source code and markup may change over time. Never depend on fixed line numbers or fragile instructions such as “edit line 33.” Locate current implementations by route, rendered element, component responsibility, selector, asset URL, network request, and source map.

---

# GOAL

Establish and improve the real-world performance of the Little Wise Kids Astro website through an evidence-based audit covering:

1. Core Web Vitals and supporting performance metrics;
2. initial loading and critical rendering path;
3. runtime responsiveness and interaction latency;
4. visual stability;
5. asset discovery, transformation, sizing, compression, and delivery;
6. fonts, CSS, JavaScript, images, SVGs, video, iframes, and third-party resources;
7. preload, preconnect, DNS prefetch, module preload, fetch priority, prefetch, prerender, lazy loading, eager loading, script scheduling, and Astro hydration choices;
8. Astro build output and route-level payloads;
9. Sanity image delivery and editor-upload resilience;
10. Cloudflare caching, compression, redirects, and edge delivery;
11. field data where available;
12. deterministic laboratory testing and CI regression protection;
13. before-and-after verification for every accepted optimisation.

The GOAL is not “achieve Lighthouse 100.”

The GOAL is complete only when the website has:

- a repeatable production-like performance baseline;
- representative route and state coverage;
- lab and available field evidence;
- identified LCP elements and LCP phase breakdowns;
- documented CLS sources;
- realistic interaction testing for INP risks;
- a complete asset and request inventory;
- explicit loading decisions for important resources;
- verified caching and compression behaviour;
- route-level performance budgets;
- evidence-backed remediation priorities;
- before-and-after measurements for implemented fixes;
- CI regression protection;
- no unsupported claim that a score proves excellent real-user performance.

If the coding environment provides a goal/task system, create and activate this GOAL before beginning. Keep it incomplete until every completion criterion has evidence.

The baseline audit is the first deliverable. Do not make broad performance changes before the baseline has been presented for human review.

---

# PROJECT CONTEXT

Known project context:

- Framework: Astro
- CMS target: Sanity
- Hosting target: Cloudflare
- Website: Little Wise Kids
- Architecture preference: static-first
- Editors: non-technical users
- Performance, accessibility, semantic HTML, SEO, Core Web Vitals, visual quality, and maintainability are all important
- Preserve the existing design system, CSS tokens, components, route architecture, and responsive behaviour
- Do not make DNS, MX, mailbox, email-service, or unrelated infrastructure changes
- Do not replace Astro or introduce a client-heavy framework
- Do not add broad optimisation libraries without measured need
- Do not reduce image quality to an unacceptable level
- Do not remove required interactions or visual content merely to improve a score
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

Verify the current route inventory from the full repository. Do not assume this list is complete.

Known components and files observed in the supplied source include:

- `src/layouts/BaseLayout.astro`
- `src/components/layout/SiteHeader.astro`
- `src/components/layout/SiteFooter.astro`
- `src/components/sections/HeroSection.astro`
- `src/components/sections/GallerySection.astro`
- `src/components/sections/FaqSection.astro`
- `src/components/sections/Values/ValuesIntro.astro`
- `src/components/sections/Values/ValuesDifference.astro`
- `src/components/sections/Values/VisitSection.astro`
- `src/pages/contact.astro`
- `src/pages/blog/index.astro`
- `src/pages/blog/[slug].astro`
- `src/styles/fonts.css`
- `src/styles/site.css`
- page-specific CSS files

Verify all current paths before using them.

---

# KNOWN PERFORMANCE HYPOTHESES TO VERIFY

The following observations come from the supplied partial source. They are hypotheses, not predetermined defects or required fixes.

Verify each against the current full repository, production build, browser trace, network waterfall, and rendered page before creating a finding.

## Fonts

- `BaseLayout.astro` appears to globally preload:
    - Quicksand Bold
    - Roboto Regular
- `fonts.css` appears to declare:
    - Quicksand Regular
    - Quicksand Bold
    - Roboto Regular
    - Roboto Bold
    - Roboto Black
- Determine whether the globally preloaded files are actually required in above-the-fold content on every route.
- Determine whether all declared weights are used.
- Determine whether fonts are subsetted, cached, compressed, discovered efficiently, and responsible for any layout movement or render delay.
- Do not remove or add preloads until traces show the effect.

## Home hero

- `HeroSection.astro` appears to render `/assets/images/hero-image.png`.
- It currently appears to include intrinsic dimensions, `fetchpriority="high"`, and async decoding.
- Determine whether it is the real LCP element.
- Determine whether PNG is appropriate.
- Determine whether the delivered pixel dimensions match actual display sizes.
- Determine whether responsive variants exist.
- Determine whether the image is discovered early enough without an additional preload.
- Do not add both preload and high fetch priority automatically.

## Page hero backgrounds

Several page-specific stylesheets appear to use CSS background images through custom properties, including routes such as:

- About
- Multilingual Learning
- Parents’ Information
- Hours & Nutrition
- Contact
- Gallery
- Blog listing
- Blog article

CSS background images can be discovered later than HTML images and may become LCP candidates. Verify:

- the actual LCP element on each route;
- whether the background is decorative or content-bearing;
- discovery timing;
- requested dimensions;
- format;
- compression;
- cacheability;
- whether an HTML image or Astro image component would improve discovery without harming the design;
- whether preload is justified for a specific route.

Do not convert every CSS background to `<img>` automatically.

## Gallery

- The home gallery appears to use remote image URLs.
- Gallery images appear to use fixed intrinsic dimensions and `loading="lazy"`.
- Determine which gallery image is visible or near the initial viewport.
- Determine whether the first visible item is loaded too late.
- Determine whether all remote images are transformed, resized, cached, and served in appropriate formats.
- Determine whether remote origins require preconnect.
- Determine whether gallery JavaScript and layout work affect INP or CLS.
- Do not eager-load the complete gallery.

## Blog

- Blog listing images appear to load the first items eagerly and later items lazily.
- Blog article imagery appears to load eagerly.
- Determine which image is the actual LCP element.
- Determine whether eager loading is appropriate per template and viewport.
- Determine whether current image dimensions, source formats, crops, and response sizes are appropriate.
- Determine whether Sanity transformations are used when CMS integration is active.

## Header and logos

- The main logo appears to have intrinsic dimensions.
- The mobile-menu logo may not have explicit dimensions in the partial source.
- Determine whether any logo or menu state causes layout shifts.
- Determine whether duplicate logo requests occur.
- Determine whether the browser reuses the cached resource.
- Determine whether decoding or hidden menu markup creates unnecessary work.

## JavaScript and animations

The partial source contains:

- a processed script for the site header;
- a processed script for the gallery;
- inline scripts for value-section animation;
- a blog script;
- a contact-form validation script;
- an external Web3Forms script using `async` and `defer`.

Determine:

- final generated script files;
- script sizes;
- execution timings;
- duplicate code;
- whether scripts are route-scoped or globally loaded;
- whether inline scripts are repeated;
- whether event listeners initialise more than once;
- whether scroll handlers are passive and efficient;
- whether IntersectionObserver is used appropriately;
- whether animation causes layout, paint, or main-thread work;
- whether any functionality could use native HTML or CSS instead;
- whether third-party form code is required before interaction;
- whether `async` and `defer` together are meaningful for the external script;
- whether external resources affect privacy, reliability, performance, or Content Security Policy.

Do not add `defer` mechanically to Astro-processed module scripts.

## Raw image elements

The source appears to contain a mixture of:

- raw `<img>`;
- Astro `<Image>`;
- CSS backgrounds;
- remote images;
- locally imported images.

Determine whether Astro’s image pipeline can improve specific cases. Do not replace every `<img>` automatically.

## Partial archive limitation

The supplied archive may not include:

- `package.json`;
- lockfile;
- `astro.config.*`;
- `public/`;
- Sanity schemas;
- Cloudflare configuration;
- CI;
- complete assets.

Locate these in the actual repository. Do not conclude that they do not exist based on the partial archive.

---

# AUTHORITATIVE SOURCES

Use current primary documentation rather than memory for tool behaviour, metric thresholds, browser priority rules, Astro behaviour, and Cloudflare configuration.

Primary references include:

- Chrome DevTools MCP:
    - https://github.com/ChromeDevTools/chrome-devtools-mcp
- Chrome DevTools Performance documentation:
    - https://developer.chrome.com/docs/devtools/performance/
- Lighthouse:
    - https://developer.chrome.com/docs/lighthouse/
- Lighthouse CI:
    - https://github.com/GoogleChrome/lighthouse-ci
- Core Web Vitals:
    - https://web.dev/articles/vitals
- LCP optimisation:
    - https://web.dev/articles/optimize-lcp
- INP optimisation:
    - https://web.dev/articles/optimize-inp
- CLS optimisation:
    - https://web.dev/articles/optimize-cls
- Fetch Priority:
    - https://web.dev/articles/fetch-priority
- Resource hints:
    - https://web.dev/learn/performance/resource-hints
- Browser-level image loading:
    - https://web.dev/articles/browser-level-image-lazy-loading
- Responsive images:
    - https://web.dev/learn/images/descriptive
- Astro images:
    - https://docs.astro.build/en/guides/images/
- Astro prefetch:
    - https://docs.astro.build/en/guides/prefetch/
- Astro scripts:
    - https://docs.astro.build/en/guides/client-side-scripts/
- Astro client directives:
    - https://docs.astro.build/en/reference/directives-reference/
- Astro Cloudflare deployment:
    - https://docs.astro.build/en/guides/integrations-guide/cloudflare/
- Cloudflare Web Analytics:
    - https://developers.cloudflare.com/web-analytics/
- Cloudflare cache:
    - https://developers.cloudflare.com/cache/
- Cloudflare compression:
    - https://developers.cloudflare.com/speed/optimization/content/compression/
- Chrome UX Report:
    - https://developer.chrome.com/docs/crux/
- PageSpeed Insights API:
    - https://developers.google.com/speed/docs/insights/v5/get-started
- WebPageTest documentation:
    - https://docs.webpagetest.org/

If documentation has changed, use the current version.

---

# TOOL STRATEGY

## Primary investigation tool: Chrome DevTools MCP

Use the official Chrome DevTools MCP when available.

Before beginning, verify that these capabilities are available:

- browser navigation;
- screenshots;
- network request listing;
- request details;
- performance trace recording;
- performance insight analysis;
- Lighthouse audit;
- script evaluation;
- console inspection.

Typical MCP configuration:

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"]
    }
  }
}
```

For OpenCode, adapt to its current configuration format.

Chrome DevTools MCP may use CrUX data during performance analysis. Record whether field data was returned and whether the tool was configured to disable CrUX.

If Chrome DevTools MCP is unavailable:

1. do not claim that browser traces were recorded;
2. install or configure it only with permission where environment configuration is in scope;
3. otherwise use Chrome DevTools CLI/Puppeteer, Lighthouse CLI, Playwright tracing, or another available browser-performance interface;
4. mark the resulting audit limitation clearly;
5. do not substitute a Lighthouse score for a full trace.

## Permanent automated tool: Lighthouse CI

Use Lighthouse CI for repeatable route audits and CI assertions.

Before installing:

- inspect existing dependencies;
- inspect existing Lighthouse configuration;
- inspect existing CI;
- use the repository package manager;
- do not duplicate an existing solution.

Use multiple runs per route where practical.

Store reports and raw result data.

Do not set unrealistic score-only assertions.

## Existing browser test infrastructure

Reuse Playwright if already installed.

Use it for:

- production-like server lifecycle;
- route discovery;
- controlled viewport;
- interaction journeys;
- mobile menu;
- gallery controls;
- FAQ disclosure;
- form interaction;
- repeatable screenshots;
- regression checks.

Do not use Playwright’s normal page-load timing as a substitute for DevTools traces.

## Optional second opinion: Lighthouse MCP server

The `danielsogl/lighthouse-mcp-server` may be used as an optional structured second opinion:

- https://github.com/danielsogl/lighthouse-mcp-server

Do not make it the only performance source.

Prefer the official Chrome DevTools MCP for trace-level diagnosis and Lighthouse CI for durable repository checks.

Do not install two overlapping MCP tools without a clear reason.

## Field evidence

Use available:

- CrUX;
- PageSpeed Insights;
- Google Search Console Core Web Vitals;
- Cloudflare Web Analytics;
- production RUM already present.

Field data may be unavailable for a new or low-traffic site. Record “insufficient field data” rather than treating that as a pass.

## External verification

Use WebPageTest where access is available for:

- first view;
- repeat view;
- waterfall;
- filmstrip;
- geographic location;
- connection type;
- mobile device profile;
- cache reuse;
- request chaining.

Do not require WebPageTest as a local dependency.

## Conditional bundle analysis

Use a Rollup/Vite bundle visualiser only when:

- significant client JavaScript exists;
- generated chunks are unexpectedly large;
- module composition is unclear;
- duplicate dependencies are suspected.

Do not add it automatically to a mostly static Astro project.

## Conditional runtime monitoring

Do not automatically add the `web-vitals` package or another RUM script.

First inspect:

- Cloudflare Web Analytics;
- existing analytics;
- privacy requirements;
- available route-level data;
- whether more detailed attribution is genuinely needed.

If custom RUM is proposed, document:

- data collected;
- endpoint;
- retention;
- consent implications;
- sampling;
- bundle cost;
- operational owner.

---

# METRIC TARGETS

Use current Core Web Vitals guidance and evaluate field data at the 75th percentile, segmented by mobile and desktop where available.

Current “good” thresholds to verify from primary documentation:

- LCP: 2.5 seconds or less
- INP: 200 milliseconds or less
- CLS: 0.1 or less

Also record diagnostic metrics:

- TTFB
- FCP
- TBT
- Speed Index
- main-thread time
- total transfer size
- encoded resource size
- request count
- JavaScript transfer and execution
- CSS transfer
- image transfer
- font transfer
- third-party transfer
- long tasks
- layout shifts
- LCP resource timing
- cache reuse

Do not confuse:

- TBT with INP;
- lab data with field data;
- a Lighthouse score with a Core Web Vitals result;
- a single run with a stable baseline.

---

# OPERATING RULES

1. Inspect the repository before changing dependencies or code.
2. Detect the package manager from the lockfile.
3. Use only that package manager.
4. Run the production build, not the Astro development server, for baseline performance testing.
5. Use representative content.
6. Do not audit an empty CMS state as a real page.
7. Do not point destructive tests at production forms.
8. Do not hardcode source line numbers in findings or remediation instructions.
9. Use current source paths, component names, selectors, asset URLs, and rendered evidence.
10. Group repeated symptoms by root cause.
11. Measure before recommending.
12. Quantify impact when the tooling provides estimates.
13. Do not prioritise an issue with negligible measured impact.
14. Do not preload a resource merely because it is above the fold.
15. Do not lazy-load a confirmed LCP image.
16. Do not eager-load every image.
17. Do not prefetch every route.
18. Do not preconnect to every third-party origin.
19. Do not add both preload and `fetchpriority="high"` without understanding whether both are required.
20. Do not add `async` or `defer` mechanically.
21. Do not move all scripts to the end of `<body>` without understanding Astro’s output.
22. Do not add hydration directives to static Astro components.
23. Do not compress images until they are visibly degraded.
24. Do not remove intrinsic dimensions.
25. Do not reduce accessibility to improve performance.
26. Do not hide content from crawlers to improve a score.
27. Do not delay essential content until interaction.
28. Do not introduce layout shifts to improve initial paint.
29. Do not optimise only the home page.
30. Do not rely only on mobile emulation or only on desktop.
31. Do not use local warm-cache results as the baseline for first-load performance.
32. Do not claim field improvement before field data has had time to update.
33. Do not change Cloudflare settings without inspecting current response headers and configuration.
34. Do not change DNS or email records.
35. Do not expose secrets in reports or commits.
36. Preserve source maps only according to the project’s security and debugging policy.
37. Keep test reports and generated artifacts out of source folders unless the project convention says otherwise.
38. Document all skipped checks and reasons.
39. Stop at the baseline checkpoint before broad remediation.
40. Retain an optimisation only when repeated comparison supports it.

---

# PHASE 0 — REPOSITORY DISCOVERY

Inspect and document:

- Astro version;
- Node.js version;
- package manager;
- package scripts;
- lockfile;
- output mode;
- adapter;
- integrations;
- Vite configuration;
- Cloudflare configuration;
- build command;
- preview command;
- route files;
- dynamic routes;
- content collections;
- Sanity integration;
- image service;
- static assets;
- public assets;
- local font files;
- CSS architecture;
- global CSS imports;
- JavaScript entry points;
- inline scripts;
- framework components;
- Astro islands;
- client directives;
- third-party scripts;
- analytics;
- form provider;
- redirects;
- middleware;
- service workers;
- manifest;
- CI workflows;
- testing tools;
- current performance budgets;
- current Lighthouse configuration;
- browser support policy;
- robots and sitemap;
- existing caching headers;
- environment-variable requirements.

Create:

- route inventory;
- page-template inventory;
- asset-source inventory;
- script inventory;
- stylesheet inventory;
- third-party origin inventory;
- interactive-state inventory.

For each route record:

- route;
- route type;
- source file;
- layout;
- primary components;
- data source;
- hero implementation;
- likely LCP candidates;
- scripts;
- styles;
- images;
- fonts;
- third-party requests;
- important interactions;
- representative viewport;
- audit status.

Do not install tools until discovery is complete.

---

# PHASE 1 — BUILD AND AUDIT ENVIRONMENT

Create a production-like local audit target.

Preferred lifecycle:

1. install dependencies from the lockfile;
2. run the production Astro build;
3. start the production preview or Cloudflare-local equivalent;
4. use stable local host and port;
5. let Playwright or the audit runner manage server startup where practical;
6. confirm each route renders representative content;
7. disable destructive external side effects;
8. record server headers and compression limitations of the local environment.

Differentiate:

- local static preview;
- Cloudflare local preview;
- deployed preview;
- production.

Do not compare measurements from unlike environments without labelling them.

Where possible audit:

- local production build for code regressions;
- deployed preview for Cloudflare headers and edge behaviour;
- production for field and real delivery evidence.

Record:

- commit hash;
- date;
- browser version;
- Lighthouse version;
- DevTools MCP version;
- machine;
- CPU;
- network profile;
- cold/warm cache;
- viewport;
- device emulation;
- server mode;
- geographical location where external testing is used.

---

# PHASE 2 — REPRESENTATIVE ROUTE AND STATE SAMPLE

Audit every unique page template and every high-value user journey.

At minimum include:

- home;
- standard information page;
- page with CSS hero background;
- gallery landing;
- home gallery state;
- contact form;
- thank-you page;
- blog listing;
- representative blog article;
- 404;
- mobile navigation;
- desktop navigation or mega menu;
- FAQ interaction;
- gallery interaction;
- animation-heavy section.

Where several routes share an identical template, audit:

- one representative route deeply;
- every route with automated budgets;
- route-specific assets and content.

Create a route-to-template coverage matrix.

Do not assume that a shared template produces identical performance when content and assets differ.

---

# PHASE 3 — BASELINE LAB MEASUREMENT

Run repeated laboratory measurements.

For Lighthouse CI:

- use at least three runs per representative route where practical;
- record median values;
- preserve all raw reports;
- separate mobile and desktop configurations;
- use stable throttling settings;
- record Lighthouse categories but focus the performance investigation on metrics and opportunities.

For Chrome DevTools traces:

- start from a known page;
- clear or control cache;
- record reload traces;
- record relevant interaction traces;
- analyse available insights;
- save screenshots and trace identifiers;
- capture network requests.

Record per route:

- performance score;
- FCP;
- LCP;
- TBT;
- CLS;
- Speed Index;
- TTFB where available;
- total bytes;
- request count;
- JS bytes;
- CSS bytes;
- image bytes;
- font bytes;
- third-party bytes;
- LCP element;
- LCP request URL;
- long tasks;
- layout-shift clusters;
- render-blocking resources;
- network dependency chains.

Do not average values that should be reported as median or percentile.

Flag measurement variability.

Investigate large run-to-run variance before setting strict budgets.

---

# PHASE 4 — FIELD DATA

Query available field sources.

For each important production route or origin, check:

- CrUX page-level data;
- CrUX origin-level data;
- PageSpeed Insights field section;
- Search Console Core Web Vitals if accessible;
- Cloudflare Web Analytics if enabled.

Record:

- mobile;
- desktop;
- 75th percentile LCP;
- 75th percentile INP;
- 75th percentile CLS;
- sample availability;
- date range;
- page-level versus origin-level scope;
- good/needs improvement/poor distributions where available.

Do not merge origin-level and URL-level data without clear labelling.

If field data is unavailable:

- state why it may be unavailable;
- continue with lab diagnosis;
- recommend monitoring after launch;
- do not mark the route as passing real-world Core Web Vitals.

Compare field and lab evidence.

Explain plausible differences:

- device mix;
- geography;
- cache state;
- network;
- content;
- third parties;
- route grouping;
- real interactions.

---

# PHASE 5 — LCP DIAGNOSIS

Identify the LCP element for every representative route and viewport.

Record:

- element;
- visible content;
- selector;
- asset URL;
- asset type;
- source component;
- route;
- viewport;
- whether it changes during load;
- whether it is an image, background, text block, or video poster.

Break LCP into:

- TTFB;
- resource load delay;
- resource load duration;
- element render delay.

For image LCP candidates inspect:

- discovery point;
- preload scanner visibility;
- CSS discovery;
- client-side injection;
- lazy/eager state;
- fetch priority;
- preload;
- request priority;
- responsive source selection;
- dimensions;
- encoded size;
- transfer size;
- CDN transformation;
- format;
- decoding;
- paint delay;
- visibility or animation delay.

For text LCP candidates inspect:

- font discovery;
- font preload;
- font size and weight file;
- `font-display`;
- CSS render blocking;
- opacity or transform entrance animation;
- client-side class changes.

Do not prescribe a solution until the dominant LCP phase is known.

Examples:

- Large TTFB requires server/edge investigation, not image compression alone.
- Large load delay may justify earlier discovery or priority.
- Large load duration may require format, dimensions, CDN, or connection work.
- Large render delay may require CSS, fonts, JavaScript, or animation changes.

---

# PHASE 6 — CLS AND VISUAL STABILITY

Capture layout-shift clusters and identify exact elements.

Inspect:

- images without effective intrinsic dimensions;
- responsive images with mismatched aspect ratios;
- CSS backgrounds whose containers gain dimensions late;
- fonts and fallback metrics;
- webfont swaps;
- cookie banners;
- forms and validation messages;
- asynchronously inserted content;
- mobile menu;
- gallery controls;
- carousel dimensions;
- embedded content;
- third-party widgets;
- animation changing layout properties;
- sticky header transitions;
- dynamically loaded CMS content;
- placeholders;
- loading states.

Record:

- shift score;
- affected elements;
- trigger;
- source component;
- route;
- viewport;
- user input exclusion;
- recommended stabilisation.

Do not suppress a visual shift by hiding content.

Do not use fixed heights that break responsive content.

Prefer:

- correct intrinsic dimensions;
- `aspect-ratio`;
- reserved space;
- stable font fallbacks;
- transform/opacity animation instead of layout animation;
- predictable error regions.

---

# PHASE 7 — INP AND RUNTIME RESPONSIVENESS

Lighthouse TBT is diagnostic, not a substitute for INP.

Use field data where available.

Create realistic interaction journeys for:

- desktop navigation;
- mobile menu opening and closing;
- mobile submenus;
- gallery next/previous controls;
- gallery slide selection;
- FAQ disclosure;
- blog interactions;
- contact-form validation;
- contact-form submission mock;
- scroll-driven value animations;
- back navigation where relevant.

Record interaction traces and inspect:

- input delay;
- event processing duration;
- presentation delay;
- long tasks;
- style recalculation;
- layout;
- paint;
- JavaScript execution;
- synchronous DOM reads/writes;
- forced reflow;
- expensive selectors;
- excessive listener count;
- repeated initialisation;
- third-party interference;
- animation work;
- DOM size.

Test low-end-like CPU throttling where supported.

Do not remove useful interaction merely to lower execution time.

Prefer architectural fixes:

- less JavaScript;
- route scoping;
- event delegation;
- native controls;
- smaller DOM;
- batched reads/writes;
- yielding long work;
- CSS transitions on compositor-friendly properties;
- deferred non-essential work.

---

# PHASE 8 — NETWORK AND REQUEST-CHAIN AUDIT

Capture all requests for each representative route.

Classify:

- document;
- redirect;
- stylesheet;
- script;
- font;
- image;
- SVG;
- video;
- iframe;
- fetch/XHR;
- analytics;
- third party.

Record:

- URL;
- origin;
- initiator;
- discovery time;
- start time;
- duration;
- priority;
- protocol;
- connection reuse;
- DNS;
- connection;
- TLS;
- TTFB;
- transfer size;
- encoded size;
- cache status;
- cache headers;
- content type;
- compression;
- blocking status;
- dependency chain;
- route;
- reuse across routes.

Identify:

- redirect chains;
- late-discovered critical requests;
- CSS imports;
- JS-injected resources;
- duplicated resources;
- unused preloads;
- unnecessary preconnects;
- serial request chains;
- excessive origins;
- large third-party resources;
- uncompressed text;
- cache misses;
- opaque remote responses;
- incorrect MIME types.

Do not report a request merely because it exists.

Prioritise only when it affects experience, bandwidth, privacy, reliability, or maintainability.

---

# PHASE 9 — COMPLETE ASSET INVENTORY

Discover assets from:

- `public/`;
- `src/assets/`;
- Astro static imports;
- `<img>`;
- `<picture>`;
- Astro `<Image>`;
- Astro `<Picture>`;
- CSS `url()`;
- custom properties containing URLs;
- inline SVG;
- external SVG;
- remote image URLs;
- Sanity image URLs;
- videos;
- posters;
- audio;
- icons;
- favicons;
- Open Graph assets;
- fonts;
- JavaScript;
- CSS;
- JSON;
- downloadable documents.

Create `docs/performance/ASSET-INVENTORY.csv`.

Columns:

- Asset ID
- Type
- Source Path
- Rendered URL
- Origin
- Routes
- Component
- Intrinsic Width
- Intrinsic Height
- Display Width
- Display Height
- Format
- Encoded Size
- Transfer Size
- Compression
- Cache Control
- ETag
- Priority
- Loading Mode
- Discovery
- Above Fold
- LCP Candidate
- Duplicate
- Responsive Variants
- Recommendation
- Confidence
- Evidence

Inspect actual files where available.

Do not infer file size from source dimensions.

Do not infer delivered format from a Sanity source field; inspect the response.

---

# PHASE 10 — IMAGE PIPELINE AUDIT

For every raster image determine:

- visual purpose;
- source;
- format;
- dimensions;
- display sizes by breakpoint;
- crop;
- density;
- responsive candidate set;
- `sizes`;
- intrinsic dimensions;
- loading;
- decoding;
- fetch priority;
- compression;
- CDN;
- caching;
- transformation;
- whether it is LCP;
- whether it is offscreen;
- whether it is reused;
- whether it creates CLS.

## Local images

Assess whether Astro image services can generate:

- WebP;
- AVIF where appropriate;
- responsive widths;
- correct dimensions;
- source-set markup;
- optimised build output.

Do not convert every image to AVIF automatically.

Consider:

- decode cost;
- quality;
- browser support;
- asset type;
- transparency;
- small icons;
- source quality;
- build time.

## Remote images

For remote images inspect:

- allowed domains;
- transformation support;
- response format;
- actual width;
- cache headers;
- CORS;
- connection setup;
- redirect chain;
- query parameters;
- duplicate variants.

## Sanity

Audit the complete Sanity image flow:

- original upload;
- asset metadata;
- hotspot and crop;
- URL builder;
- requested width;
- DPR;
- format negotiation or explicit format;
- quality;
- auto format;
- responsive candidates;
- placeholder strategy;
- cacheability;
- editor-uploaded originals.

Non-technical editors may upload very large images. The frontend must request appropriately transformed variants rather than rely on editors to pre-compress originals.

Do not mutate original Sanity assets as the primary frontend optimisation strategy.

## Background images

For CSS backgrounds determine:

- decorative versus meaningful;
- actual LCP role;
- discovery timing;
- responsive variants;
- preload need;
- media-query behaviour;
- hidden downloads on smaller breakpoints;
- duplicate desktop/mobile requests;
- container stability.

## Lazy loading

Use lazy loading for genuinely offscreen images and iframes.

Do not lazy-load:

- confirmed LCP images;
- immediately visible images;
- images so near the initial viewport that delayed loading causes visible blanks;
- critical posters.

Verify browser behaviour rather than reasoning only from markup.

## Eager loading

Use eager loading only when early loading is beneficial.

Do not eager-load all first-card images merely because their list index is small. Determine actual viewport visibility by layout and breakpoint.

## Decoding

Treat `decoding` as a hint.

Measure whether it affects rendering.

Do not rely on async decoding as the primary optimisation.

---

# PHASE 11 — FONT AUDIT

Inventory every font file and usage.

Record:

- family;
- weight;
- style;
- format;
- subset;
- unicode range;
- source;
- size;
- routes;
- above-fold usage;
- preload;
- cache;
- font display;
- fallback;
- metric compatibility;
- synthetic weight risk;
- duplicate request;
- unused declaration.

Inspect computed styles for critical above-the-fold text.

Verify whether each preloaded font:

- is actually used;
- is used early;
- matches the exact URL;
- matches type and CORS;
- is not downloaded twice;
- improves rendering.

Investigate:

- excessive weights;
- full character sets;
- duplicated family roles;
- font swaps;
- layout shift;
- FOIT;
- FOUT;
- fallback mismatch;
- late CSS discovery.

Do not remove a weight that is used.

Do not preload every font.

Do not set `font-display: optional` mechanically.

If subsetting is proposed, preserve required languages and characters.

---

# PHASE 12 — CSS AUDIT

Inspect:

- global CSS;
- route-specific CSS;
- component CSS;
- imported CSS;
- CSS custom properties;
- media queries;
- duplicated rules;
- unused rules;
- selector complexity;
- render blocking;
- critical above-fold CSS;
- large background images;
- animation;
- layout;
- containment;
- content visibility;
- expensive paint;
- filter and blur effects;
- fixed backgrounds;
- large shadows;
- backdrop filters;
- font declarations.

Measure generated CSS files.

Determine whether Astro/Vite:

- combines CSS;
- creates route-level chunks;
- duplicates component styles;
- inlines small styles;
- emits unused CSS.

Do not introduce critical-CSS tooling without measured need.

Do not inline large CSS into every page.

Do not remove CSS purely based on static analysis when class names are dynamic.

Inspect animation performance:

- transform;
- opacity;
- top/left;
- width/height;
- clip-path;
- filter;
- box-shadow;
- paint area;
- scroll timeline;
- IntersectionObserver;
- reduced-motion path.

---

# PHASE 13 — JAVASCRIPT AND ASTRO SCRIPT AUDIT

Inventory final JavaScript output.

Trace source scripts to generated chunks.

Classify:

- Astro processed scripts;
- `is:inline` scripts;
- external scripts;
- framework hydration;
- event handlers;
- route-specific scripts;
- shared scripts;
- third-party code.

For each script record:

- source;
- generated URL;
- size;
- routes;
- execution time;
- evaluation time;
- parse time;
- main-thread tasks;
- initiator;
- loading attributes;
- module/classic;
- duplicated code;
- interaction purpose;
- recommendation.

Understand Astro behaviour before changing loading attributes.

Astro-processed scripts may be:

- bundled;
- deduplicated;
- emitted as modules;
- inlined when small.

`is:inline` scripts skip normal processing.

Investigate whether scripts should:

- remain as processed modules;
- remain inline;
- be route-scoped;
- be loaded after interaction;
- be loaded on idle;
- be dynamically imported;
- be removed;
- be replaced with native HTML;
- be replaced with CSS;
- be split;
- be shared.

Do not introduce framework hydration to solve a scheduling problem.

## Third parties

Audit:

- Web3Forms;
- analytics;
- maps;
- social embeds;
- font origins;
- video;
- any consent tools.

Record:

- purpose;
- owner;
- size;
- execution;
- connection;
- blocking;
- privacy;
- availability;
- fallback;
- interaction dependency.

Do not delay a script past the point where required functionality works.

Where possible, load third-party code only on routes that need it.

---

# PHASE 14 — ASTRO HYDRATION AND ISLANDS

Search for:

- `client:load`;
- `client:idle`;
- `client:visible`;
- `client:media`;
- `client:only`.

For each island determine:

- why hydration is required;
- initial server HTML;
- bundle size;
- dependency graph;
- hydration timing;
- interaction timing;
- visibility;
- route scope;
- duplication;
- accessibility before hydration.

Decision principles:

- `client:load`: only when immediately interactive and critical;
- `client:idle`: non-critical interaction that may initialise later;
- `client:visible`: below-fold UI that can wait until near viewport;
- `client:media`: UI only relevant in a matching media condition;
- `client:only`: use only when server rendering is genuinely impossible.

Do not change directives based on labels alone. Measure the interaction and initial experience.

Static Astro components require no hydration directive.

---

# PHASE 15 — RESOURCE LOADING DECISION FRAMEWORK

For every important resource make an explicit decision.

Create `docs/performance/RESOURCE-LOADING-MATRIX.md`.

Columns:

- Resource
- Route
- Current Discovery
- Current Priority
- Current Loading
- Critical for Initial View
- Actual LCP
- Above Fold
- Reused
- External Origin
- Measured Problem
- Decision
- Evidence
- Retest

## Preload

Use preload only when:

- the resource is required for the current page;
- it is critical;
- it is discovered too late;
- early fetching has measured or strongly evidenced benefit;
- the correct type and CORS attributes can be supplied;
- it will not compete with more important resources.

Review preloads for:

- correct URL;
- correct `as`;
- type;
- CORS;
- media;
- route specificity;
- unused warnings;
- duplicate requests.

Do not globally preload route-specific hero images.

## Fetch Priority

Use `fetchpriority="high"` selectively for an important resource already discoverable in markup when normal prioritisation is insufficient.

Most likely candidate:

- confirmed LCP image.

Do not assign high priority to multiple competing images.

Do not add high priority without observing request priority or LCP load delay.

## Preconnect

Use preconnect for a small number of important origins when:

- a cross-origin request is needed early;
- connection establishment is material;
- the origin is predictably used;
- the connection is not already established.

Inspect actual request timing.

Do not preconnect to low-value or late origins.

## DNS Prefetch

Use DNS prefetch only where preconnect is too expensive or the origin is less certain.

Do not use both mechanically.

## Module Preload

Inspect generated module dependency behaviour before adding manual module preloads.

Do not duplicate Vite’s generated preload behaviour.

## Prefetch

Prefetch future navigation only when:

- the destination is likely;
- the resource cost is acceptable;
- slow connections and data saver are respected;
- the page is not highly dynamic or private;
- bandwidth waste is controlled.

Evaluate Astro’s prefetch integration and strategies:

- hover;
- tap;
- viewport;
- load.

Prefer conservative intent-based strategies such as hover/tap for broad navigation.

Do not enable global prefetch for every link without evidence.

## Prerender

Do not confuse Astro static prerendering with browser speculation-rule prerendering.

If browser prerender is considered:

- evaluate privacy;
- side effects;
- bandwidth;
- form/session behaviour;
- server load;
- route suitability.

Do not add it by default.

## Lazy loading

Use for offscreen images and iframes.

Verify actual initial viewport and browser thresholds.

## Script scheduling

For classic external scripts evaluate:

- blocking;
- defer;
- async;
- module;
- interaction-triggered load.

For Astro processed scripts, inspect generated module behaviour first.

## CSS

Do not use `media` tricks or asynchronous stylesheet loading unless the stylesheet is genuinely non-critical and the fallback is robust.

---

# PHASE 16 — ASTRO PREFETCH AUDIT

Inspect whether Astro’s prefetch feature is enabled.

Record:

- configuration;
- global defaults;
- `prefetchAll`;
- individual link attributes;
- strategy;
- excluded routes;
- generated script cost;
- observed requests;
- data-saver behaviour;
- slow-connection behaviour.

Test likely journeys:

- home to About;
- home to Contact;
- navigation to Parents’ Information;
- blog listing to article;
- gallery to Contact;
- any prominent primary CTA.

Measure:

- navigation latency;
- prefetched bytes;
- unused prefetched bytes;
- cache hits;
- mobile effect;
- repeated navigation.

Do not assume prefetch improves first-load Core Web Vitals.

Keep first-load and subsequent-navigation goals separate.

---

# PHASE 17 — CACHING, COMPRESSION, AND CLOUDFLARE

Audit local, preview, and production response headers separately.

Inspect:

- HTML;
- hashed CSS;
- hashed JS;
- fonts;
- local images;
- Sanity images;
- SVG;
- JSON;
- redirects;
- form endpoints;
- third-party scripts.

Record:

- `Cache-Control`;
- `CDN-Cache-Control`;
- `Cloudflare-CDN-Cache-Control` where relevant;
- `ETag`;
- `Last-Modified`;
- `Age`;
- `CF-Cache-Status`;
- `Vary`;
- content encoding;
- content type;
- immutable;
- stale directives;
- redirect count;
- status.

Check:

- hashed static assets have long-lived immutable browser caching;
- HTML freshness matches deployment model;
- compression is active for compressible responses;
- Brotli is used where appropriate;
- no accidental `no-store`;
- no cache poisoning risk;
- query-string behaviour;
- correct cache keys;
- Sanity CDN use;
- third-party limitations;
- repeat-view waterfall.

Do not cache personalised or form-response content publicly.

Do not create Cloudflare Cache Rules without documenting:

- match;
- action;
- rationale;
- risk;
- purge behaviour;
- validation.

Do not modify DNS or email records.

---

# PHASE 18 — SANITY PERFORMANCE AND EDITOR RESILIENCE

Locate Sanity schemas and frontend queries.

Audit:

- image fields;
- asset metadata;
- dimensions;
- hotspot;
- crop;
- placeholder data;
- query payload;
- overfetching;
- GROQ projections;
- cache/CDN use;
- preview mode;
- route generation;
- build-time fetches;
- duplicate requests;
- remote image URL generation.

The frontend must remain performant when an editor uploads:

- a very large JPEG;
- a PNG photograph;
- a transparent logo;
- portrait imagery;
- landscape imagery;
- unusual aspect ratios;
- multiple gallery images;
- long blog articles.

Recommend schema/editor safeguards only where useful:

- image-purpose fields;
- hotspot/crop guidance;
- required dimensions metadata;
- editorial descriptions;
- warnings for unsuitable source assets;
- controlled gallery counts;
- media guidance.

Do not require non-technical editors to manually produce every WebP or AVIF variant.

Use the image CDN and frontend request parameters where possible.

---

# PHASE 19 — SEO AND ACCESSIBILITY REGRESSION GUARD

Every performance change must preserve:

- rendered content;
- crawlable links;
- semantic structure;
- headings;
- alt text;
- accessible names;
- keyboard operation;
- focus;
- reduced motion;
- form functionality;
- no-JavaScript baseline where intended;
- structured data;
- canonical URLs;
- metadata;
- image indexing;
- meaningful source order.

Specifically verify:

- lazy-loaded images remain discoverable and have dimensions;
- delayed scripts do not break menus or forms;
- prefetched routes do not trigger side effects;
- CSS changes do not hide content;
- font changes do not harm readability;
- image format changes preserve transparency and quality;
- LCP changes do not duplicate meaningful images;
- background-to-image changes preserve semantics;
- performance instrumentation respects privacy.

---

# PHASE 20 — PERFORMANCE BUDGETS

Do not set budgets before the baseline is understood.

Create budgets for:

- LCP;
- TBT;
- CLS;
- performance score as a secondary signal;
- total bytes;
- JavaScript bytes;
- CSS bytes;
- image bytes;
- font bytes;
- third-party bytes;
- request count;
- route-specific exceptions.

Budgets should:

- prevent regression;
- be strict enough to matter;
- allow normal variability;
- distinguish mobile and desktop;
- distinguish page types;
- avoid forcing meaningless micro-optimisations;
- include rationale;
- include review date.

Use hard failures for stable, important limits.

Use warnings for metrics with high environmental variance until the suite is stable.

Never hide known problems by setting a weak budget above the current worst result without a remediation plan.

---

# PHASE 21 — LIGHTHOUSE CI

Set up or refine Lighthouse CI.

Use the current package manager.

Configure:

- production build;
- local production server;
- route list;
- multiple runs;
- mobile profile;
- optional desktop profile;
- report output;
- assertion configuration;
- CI artifacts.

Do not upload private URLs or secrets.

Choose storage:

- temporary public storage only if acceptable;
- filesystem artifacts;
- self-hosted LHCI server if already available.

CI should:

1. install from lockfile;
2. build;
3. start preview;
4. run LHCI;
5. upload reports;
6. fail on stable regressions;
7. retain diagnostic artifacts.

Do not make the first CI configuration fail solely because of every known baseline issue.

If temporary baselining is needed:

- document each exception;
- use narrow route/metric scope;
- assign an issue ID;
- include an expiry or removal condition;
- prevent new regressions.

---

# PHASE 22 — REPORTING FORMAT

Every confirmed finding must include:

- ID;
- title;
- severity;
- priority;
- confidence;
- status;
- metric;
- route;
- viewport;
- environment;
- rendered element;
- asset/request;
- source component;
- observed value;
- target;
- trace evidence;
- network evidence;
- field evidence;
- root cause;
- estimated impact;
- recommendation;
- code change scope;
- regression risk;
- verification method;
- before value;
- after value;
- retest status.

Use IDs such as:

- `PERF-LCP-001`
- `PERF-INP-001`
- `PERF-CLS-001`
- `PERF-IMG-001`
- `PERF-FONT-001`
- `PERF-CSS-001`
- `PERF-JS-001`
- `PERF-NET-001`
- `PERF-CACHE-001`
- `PERF-PREFETCH-001`
- `PERF-THIRD-001`

## Severity

### Critical

A primary route or action is unusably slow for a substantial portion of users, or the implementation creates severe delivery/runtime failure.

### Serious

A Core Web Vital is poor, an essential asset is severely delayed, or a major interaction has substantial latency.

### Moderate

A measurable performance issue creates meaningful delay or bandwidth cost but the task remains usable.

### Minor

A small measurable inefficiency with limited user impact.

### Recommendation

A future improvement without a confirmed current defect.

Do not equate Lighthouse audit labels with final severity.

---

# PHASE 23 — REQUIRED DELIVERABLES

Create:

```text
docs/performance/
├── EXECUTIVE-SUMMARY.md
├── AUDIT-SCOPE.md
├── ENVIRONMENT.md
├── ROUTE-INVENTORY.md
├── BASELINE-METRICS.md
├── FIELD-DATA.md
├── CORE-WEB-VITALS.md
├── LCP-ANALYSIS.md
├── CLS-ANALYSIS.md
├── INP-RUNTIME-ANALYSIS.md
├── NETWORK-WATERFALL.md
├── ASSET-INVENTORY.csv
├── IMAGE-PIPELINE.md
├── FONT-AUDIT.md
├── CSS-AUDIT.md
├── JAVASCRIPT-AUDIT.md
├── THIRD-PARTY-AUDIT.md
├── RESOURCE-LOADING-MATRIX.md
├── ASTRO-PREFETCH-AUDIT.md
├── SANITY-PERFORMANCE.md
├── CLOUDFLARE-DELIVERY.md
├── LIGHTHOUSE-CI.md
├── PERFORMANCE-BUDGETS.md
├── FINDINGS.md
├── FINDINGS.csv
├── REMEDIATION-PLAN.md
├── BEFORE-AFTER.md
└── HUMAN-REVIEW-CHECKLIST.md
```

Also store tool artifacts in an ignored directory such as:

```text
test-results/performance/
├── lighthouse/
├── traces/
├── screenshots/
├── network/
└── webpagetest/
```

Adapt to current repository conventions.

## FINDINGS.csv columns

- ID
- Severity
- Priority
- Confidence
- Status
- Category
- Metric
- Title
- Routes
- Viewports
- Components
- Assets
- Baseline
- Target
- Root Cause
- Recommendation
- Estimated Impact
- Owner
- Retest Status

## BASELINE-METRICS.md

Include route-level mobile and desktop tables.

## BEFORE-AFTER.md

For each accepted fix include:

- finding;
- exact test configuration;
- number of runs;
- before median;
- after median;
- variability;
- other affected metrics;
- visual review;
- functionality review;
- conclusion.

Do not report an improvement from one favourable run.

---

# PHASE 24 — BASELINE EXECUTION

Execute in this order:

1. repository discovery;
2. tool availability check;
3. build;
4. production-like server;
5. route verification;
6. representative screenshot capture;
7. repeated Lighthouse baseline;
8. Chrome DevTools load traces;
9. network waterfall capture;
10. LCP analysis;
11. CLS analysis;
12. interaction traces;
13. asset inventory;
14. image pipeline audit;
15. font audit;
16. CSS audit;
17. JavaScript audit;
18. third-party audit;
19. Astro prefetch audit;
20. Sanity audit;
21. local cache/header audit;
22. deployed preview/production header audit where available;
23. field-data query;
24. WebPageTest external verification where available;
25. findings;
26. budgets proposal;
27. report generation;
28. existing tests;
29. final clean build.

At baseline stage:

- do not broadly modify production code;
- add only audit/test infrastructure necessary for reliable evidence;
- do not commit speculative resource hints;
- do not modify Cloudflare delivery;
- do not alter assets.

---

# HUMAN CHECKPOINT 1 — BASELINE REVIEW

Stop after the baseline and present:

- files added;
- dependencies added;
- configuration added;
- commands executed;
- routes audited;
- environments audited;
- browsers and viewports;
- field-data availability;
- Core Web Vitals baseline;
- LCP element per route;
- largest payloads;
- font findings;
- CSS findings;
- JavaScript findings;
- third-party findings;
- caching findings;
- loading-strategy findings;
- proposed budgets;
- findings by severity;
- audit limitations;
- remediation order.

Ask the human to review:

- route scope;
- visual quality requirements;
- acceptable image quality;
- third-party business requirements;
- likely production traffic regions;
- budget thresholds;
- Cloudflare access and scope;
- whether production field monitoring may be enabled;
- remediation priorities.

Do not begin broad remediation until approved.

---

# PHASE 25 — REMEDIATION

After baseline approval, fix in descending impact order.

Recommended order is determined by evidence, but often:

1. poor LCP causes;
2. severe CLS;
3. serious INP/runtime work;
4. excessive or incorrectly delivered imagery;
5. render-blocking fonts/CSS;
6. unnecessary JavaScript;
7. third-party delays;
8. caching/compression;
9. navigation prefetch improvements;
10. minor request cleanup.

For every change:

1. reference finding ID;
2. state the measured cause;
3. identify current source implementation;
4. implement the smallest maintainable fix;
5. add or update regression coverage;
6. build;
7. run targeted trace;
8. run repeated Lighthouse comparison;
9. verify mobile and desktop;
10. verify accessibility;
11. verify responsive design;
12. verify image quality;
13. update report.

Do not combine unrelated optimisations into one unreviewable change.

Do not retain a change when:

- metrics do not improve;
- another important metric regresses;
- visual quality is unacceptable;
- interaction breaks;
- maintenance complexity outweighs measured benefit.

---

# HUMAN CHECKPOINT 2 — VISUAL AND FUNCTIONAL REVIEW

Provide exact routes, viewports, and steps for review.

Ask the human to verify:

- hero image quality;
- crops;
- gallery loading;
- font rendering;
- text wrapping;
- animation;
- mobile navigation;
- form behaviour;
- blog imagery;
- no visible late-loading blank areas;
- no layout movement;
- no reduced-motion regression;
- no SEO content loss.

---

# PHASE 26 — FINAL VERIFICATION

After approved remediation:

- rerun production build;
- rerun existing tests;
- rerun Lighthouse CI;
- rerun Chrome DevTools traces;
- rerun interaction traces;
- rerun network capture;
- rerun repeat-view cache tests;
- rerun production header checks;
- rerun field queries while noting field-data delay;
- compare baseline and final;
- update all findings;
- update budgets;
- confirm CI;
- document remaining limitations.

Classify every finding:

- fixed and verified;
- fixed, awaiting field confirmation;
- fixed, awaiting human visual confirmation;
- accepted limitation;
- false positive with evidence;
- deferred;
- unresolved;
- out of scope.

Do not claim real-user Core Web Vitals improvement solely from lab results.

---

# CI COMPLETION

CI integration is complete only when it:

- uses the lockfile;
- builds the Astro site;
- runs stable performance checks;
- stores reports;
- prevents meaningful regression;
- avoids secrets;
- avoids real form submission;
- tolerates understood measurement variance;
- has documented budgets;
- has an owner and review process.

---

# COMPLETION CRITERIA

The GOAL may be marked complete only when:

- the full repository has been discovered;
- all current routes are inventoried;
- every unique page template has a baseline;
- mobile and desktop are covered;
- repeated lab runs exist;
- field data has been queried or its absence documented;
- every representative route has an identified LCP element;
- LCP phase breakdowns exist;
- CLS sources are documented;
- realistic interactions have been tested;
- all network requests are inventoried at representative-route level;
- all major assets are inventoried;
- all major images have loading, sizing, format, and delivery decisions;
- font use and preloads are verified;
- CSS output is audited;
- JavaScript output and execution are audited;
- third-party scripts are audited;
- Astro hydration is audited;
- Astro prefetch is audited;
- Sanity image delivery is audited;
- Cloudflare headers, caching, and compression are audited where access permits;
- loading decisions are evidence-backed;
- no generic “preload everything” or “lazy-load everything” policy remains;
- performance budgets are documented;
- Lighthouse CI is installed or an existing equivalent is validated;
- CI artifacts exist;
- accepted fixes have repeated before-and-after evidence;
- accessibility, SEO, design, and functionality have been rechecked;
- current tests pass or failures are documented;
- final Astro build passes or blockers are documented;
- all required reports exist;
- unresolved field confirmation is labelled;
- no unsupported 100/100 or conformance claim is made.

Begin now with **Phase 0 — Repository Discovery**.