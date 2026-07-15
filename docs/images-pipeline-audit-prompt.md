# Astro-Image-Pipeline Audit-prompt

## ROLE

Act as a senior Astro engineer, web image-performance specialist, responsive-image architect, Sanity image-pipeline reviewer, SEO reviewer, accessibility-aware frontend engineer, and visual quality auditor.

You are working inside the **Little Wise Kids** Astro website repository.

Your task is to design, implement, and verify a coherent image system using Astro’s `astro:assets` APIs where appropriate, while preserving image quality, accessibility, SEO, responsive design, editor workflows, and Core Web Vitals.

This is a focused image-pipeline task.

Do not perform a full general performance audit, semantic HTML audit, accessibility audit, CSS/JavaScript bloat audit, or SEO audit. Only investigate those areas where they directly affect image delivery and rendering.

Do not depend on fixed line numbers. The markup and source structure may change. Locate implementations by current route, component responsibility, rendered image, asset URL, selector, and source import.

---

# GOAL

Create a maintainable, evidence-backed image pipeline where:

1. local raster images that should be optimised are stored in `src/` and processed through Astro;
2. files in `public/` remain there only when they intentionally need to bypass Astro processing;
3. every image uses the correct rendering mechanism:
   - Astro `<Image />`;
   - Astro `<Picture />`;
   - native `<img>`;
   - SVG component;
   - CSS background;
   - Sanity CDN responsive image component;
4. large photographic images receive appropriately sized responsive variants;
5. AVIF, WebP, and fallback formats are generated only where they provide meaningful value;
6. the browser never downloads substantially more image data than the rendered size requires;
7. above-the-fold and LCP images load at the correct priority;
8. below-the-fold images load lazily;
9. intrinsic dimensions or equivalent aspect-ratio reservation prevent layout shifts;
10. Sanity uploads are transformed automatically so non-technical editors may upload large originals without damaging frontend performance;
11. Sanity crop and hotspot data are respected;
12. image quality remains visually acceptable on standard and high-density displays;
13. image variants do not create uncontrolled build-time or output bloat;
14. Google can discover and understand meaningful images;
15. decorative imagery remains appropriately hidden from assistive technology;
16. every accepted change is verified through build output, browser requests, screenshots, and route-level testing.

The GOAL is not:

> Convert every image to AVIF and WebP.

The GOAL is:

> Deliver each image in the smallest visually acceptable form, at the correct rendered dimensions, priority, format, and semantic treatment, using one clearly owned optimisation pipeline.

If the coding environment supports goals or tasks, create and activate this GOAL before beginning. Do not mark it complete until all completion criteria have evidence.

---

# PRIMARY RECOMMENDED ARCHITECTURE

Use this as the starting strategy, then verify it against the current repository and build.

## Local design and content assets

Use Astro’s build-time image pipeline for:

- local hero photography;
- local page photography;
- local card photography;
- locally maintained blog images;
- local PNG/JPEG illustrations where conversion is beneficial;
- locally maintained raster logos when SVG is unavailable.

Store processable local images under a folder such as:

```text
src/assets/images/
```

Use static imports.

## Sanity-managed content images

Prefer Sanity’s image CDN as the transformation owner for:

- editor-uploaded gallery images;
- CMS blog images;
- CMS team photographs;
- Portable Text images;
- frequently updated CMS content.

Generate controlled responsive URLs through `@sanity/image-url`.

Use:

- explicit width variants;
- `fit=max` where upscaling must be prevented;
- crop and hotspot support;
- `auto=format`;
- consistent transformation URLs;
- `srcset`;
- accurate `sizes`;
- intrinsic dimensions or an aspect ratio.

Do not send a transformed Sanity image through a second Astro transformation layer unless there is a measured, documented reason.

## Public assets

Keep an image in `public/` only when it intentionally must be served unchanged or referenced through a stable direct URL.

Likely valid examples:

- favicon;
- web app manifest icons;
- Open Graph or social-preview image where a predictable direct URL is required;
- robots-facing assets;
- downloadable originals;
- third-party verification images;
- already optimised files that must preserve an exact URL.

Do not leave normal page photography in `public/` merely because it is convenient.

## SVG

Use SVG for:

- logos;
- icons;
- simple illustrations;
- decorative vector artwork;
- interface symbols.

Do not rasterise a suitable SVG into AVIF or WebP.

Use an imported Astro SVG component when inline control, styling, or semantics are useful.

Use `<img src="...svg">` when a standalone cached file is preferable.

## CSS backgrounds

Use CSS backgrounds for decorative presentation.

Do not use CSS backgrounds for meaningful content images that require:

- alt text;
- Google Image discovery;
- responsive source selection;
- priority control;
- straightforward LCP optimisation.

A visual hero image may remain a CSS background only when it is genuinely decorative and trace evidence shows no harmful discovery delay.

---

# IMPORTANT CORRECTIONS TO EARLIER ADVICE

The previous discussion was directionally correct, but the implementation must account for these details.

## 1. `<Image />` and `<Picture />` are not interchangeable

Astro `<Image />` produces one optimised output format and can generate responsive sizes.

Astro `<Picture />` produces multiple `<source>` formats plus a fallback `<img>`.

Do not use `<Picture />` automatically for every raster image.

Each extra format multiplies generated variants:

```text
number of widths × number of formats
```

This can increase:

- build time;
- output files;
- deployment size;
- cache entries;
- CI duration.

Use `<Picture />` where the potential transfer savings justify the variant cost.

## 2. Use `priority`, not a hand-assembled LCP attribute bundle

Current Astro provides a `priority` prop on `<Image />` and `<Picture />`.

For a genuine above-the-fold priority image, Astro sets:

```html
loading="eager"
decoding="sync"
fetchpriority="high"
```

Do not create a wrapper that always combines:

```html
loading="eager"
fetchpriority="high"
decoding="async"
```

That conflicts with Astro’s intended priority behaviour.

Use `priority` only for the actual important above-the-fold image.

## 3. Do not use one generic `sizes` value everywhere

A value such as:

```text
(min-width: 72rem) 1120px, 100vw
```

may be correct for one hero but wrong for:

- three-column cards;
- gallery tiles;
- half-width content media;
- logos;
- team portraits;
- blog thumbnails.

The `sizes` value must describe the image’s actual rendered width in the current responsive layout.

Incorrect `sizes` can cause the browser to choose an unnecessarily large file even when `srcset` exists.

## 4. Version-gate Astro configuration

Before using any image configuration, inspect the installed Astro version.

Features have version requirements.

Examples to verify from current documentation:

- responsive image layouts and `priority` require a sufficiently recent Astro version;
- format-specific Sharp encoder configuration requires a newer Astro version than basic `astro:assets`;
- Cloudflare adapter image-service options vary by adapter version.

Do not paste configuration written for another Astro major version.

## 5. Do not set a global responsive layout without evaluating small assets

A global:

```js
image: {
  layout: 'constrained'
}
```

may cause responsive source generation for images that do not need it, including:

- logos;
- icons;
- tiny illustrations;
- fixed-size decorative images.

Recommended starting point:

```js
image: {
  responsiveStyles: true
}
```

Then select `layout` per image role.

Consider a global layout only after the inventory proves it is appropriate for most images.

## 6. Cloudflare behaviour depends on static versus on-demand rendering

If this is a normal static Astro build, images for prerendered routes can be transformed at build time and deployed as static assets.

If the project uses the Cloudflare adapter for on-demand rendering, inspect the adapter’s current `imageService` mode.

Possible current modes may include:

- compile-time processing for prerendered routes;
- Cloudflare image binding;
- Cloudflare Image Resizing;
- passthrough;
- custom service.

Do not assume Node Sharp can execute inside Cloudflare’s runtime.

## 7. Do not optimise Sanity images twice without a reason

Sanity already provides:

- global CDN delivery;
- on-demand resizing;
- crop;
- hotspot;
- format negotiation;
- quality parameters;
- cached transformations.

Choose one transformation owner.

Recommended default for this project:

```text
Local repository images → Astro
Sanity CMS images → Sanity CDN
```

Astro may still render the final markup, but should not necessarily download and re-encode every Sanity image.

---

# CURRENT SOURCE HYPOTHESES TO VERIFY

The supplied source archive suggests the following patterns.

Treat these as hypotheses. Verify against the full current repository.

## Home hero

`HeroSection.astro` appears to use a native `<img>` with:

- `/assets/images/hero-image.png`;
- large intrinsic dimensions;
- `fetchpriority="high"`;
- `decoding="async"`;
- empty alt;
- a parent marked `aria-hidden`.

Investigate:

- whether this image is in `public/`;
- whether it is the actual LCP element;
- whether it is decorative;
- whether PNG is appropriate;
- whether transparency is needed;
- actual rendered sizes;
- mobile crop;
- whether `<Picture />` with `priority` and `layout="full-width"` is appropriate;
- whether the parent’s `aria-hidden` is intentional;
- whether source dimensions are excessive.

Do not assume that because the component is named Hero it is the LCP image.

## Header and footer logo

`SiteHeader.astro` and `SiteFooter.astro` appear to use the same large PNG logo from `public/`.

Investigate:

- whether an SVG master exists;
- whether the PNG contains transparency;
- actual CSS display dimensions;
- whether the source is massively oversized;
- duplicate requests;
- caching reuse;
- mobile-menu usage;
- whether a fixed-layout Astro `<Image />` is appropriate;
- whether converting the logo to a lossy photo format would damage edges.

Prefer SVG when a clean vector source exists.

## Values illustrations

Several values components import PNG illustrations but output them through native `<img src={asset.src}>`.

Investigate:

- whether these images are decorative;
- source dimensions and sizes;
- transparency;
- whether Astro `<Image />` with fixed or constrained layout would reduce transfer;
- whether WebP is smaller without visible edge degradation;
- whether AVIF is worthwhile for small illustrations;
- whether generating several formats would create more build output than value.

## FAQ decorations

`FaqSection.astro` already appears to use Astro `<Image />`.

Review whether:

- fixed layout is more appropriate;
- the images should remain single-format;
- alt and ARIA are consistent;
- generated output is proportionate;
- these examples can establish a project pattern.

## Home gallery

`GallerySection.astro` appears to use remote images through native `<img>` with fixed `1200 × 900` dimensions and `loading="lazy"`.

Investigate:

- actual image origin;
- whether Sanity will replace the current remote source;
- true aspect ratios;
- gallery card display sizes;
- current network payload;
- whether the first visible image should remain lazy;
- whether all items are below the fold;
- responsive `srcset` requirements;
- crop consistency;
- duplicate transformations;
- browser selection.

## Full gallery

`our-gallery.astro` appears to contain placeholder items and native `<img>` rendering for future data.

Design the future CMS image path before editors add large images.

## Blog listing

The blog listing appears to select eager versus lazy loading based on item index.

Replace index-based loading policy only if viewport analysis shows it is inaccurate.

Loading should be based on actual visual position and template behaviour, not a fixed assumption that the first three cards are visible.

## Blog article

The article image appears to use `loading="eager"` for any available main image.

Determine:

- whether it is truly above the fold;
- whether it is the LCP;
- whether `priority` is appropriate;
- whether it is supplied by Sanity;
- correct width variants;
- aspect ratio;
- structured-data image URL requirements.

## Page hero backgrounds

Several route stylesheets appear to define hero images through CSS custom properties.

They currently may be placeholders set to `none`.

When real images are added, decide whether each is:

- decorative CSS background;
- meaningful HTML image;
- LCP image;
- SEO-relevant image;
- art-directed image requiring different mobile crop.

Do not create a permanent image architecture around placeholders.

## Missing assets

The supplied `src` archive does not appear to include:

- `package.json`;
- lockfile;
- Astro configuration;
- public image files;
- local asset files;
- Sanity schemas;
- Cloudflare configuration;
- CI.

Locate them in the full repository.

---

# IMAGE RENDERING DECISION MATRIX

Use the following decision framework.

## Use Astro `<Picture />` when

The image is:

- a large photographic hero;
- a large editorial or blog image;
- a substantial content photograph;
- a large gallery image;
- a route-level visual whose transfer size matters;
- an opaque PNG/JPEG master that benefits significantly from AVIF/WebP;
- responsive across several viewport widths.

Typical configuration:

```astro
<Picture
  src={image}
  formats={['avif', 'webp']}
  fallbackFormat="jpeg"
  layout="full-width"
  alt={alt}
  priority
/>
```

Only use JPEG fallback for opaque photographic content.

For transparent images, preserve a transparency-capable fallback.

Do not use this exact snippet blindly. Determine:

- layout;
- fallback format;
- quality;
- sizes;
- priority;
- crop;
- semantics.

## Use Astro `<Image />` when

The image:

- needs one optimised output format;
- is a small or medium raster illustration;
- is a card image where AVIF adds little value;
- is a raster logo without SVG;
- has a fixed or constrained display size;
- would create unnecessary build variants through `<Picture />`;
- is already efficiently represented as WebP output.

Examples:

- small decorative bubbles;
- fixed-size raster icons;
- small illustrations;
- a modest thumbnail;
- non-photographic PNG where WebP preserves transparency and reduces size.

## Use native `<img>` when

The image is intentionally unprocessed, for example:

- a public asset requiring an exact stable path;
- an externally optimised CDN URL;
- a Sanity responsive URL generated by the project’s Sanity image component;
- a third-party image service that already owns transformation;
- an animated resource that Astro should not transform;
- an edge case unsupported by the current image service.

A native `<img>` is not a failure when the upstream pipeline is intentional and verified.

## Use an imported SVG component when

You need:

- inline styling;
- currentColor;
- animation;
- semantic control;
- no separate network request;
- reusable interface iconography.

## Use `<img src="...svg">` when

You prefer:

- independent caching;
- no inline SVG markup;
- simple decorative delivery;
- standalone logo loading.

## Use CSS background when

The image:

- is purely decorative;
- does not need alt text;
- is not needed for image search;
- is not an important LCP asset;
- does not require responsive art direction beyond CSS media rules.

---

# RECOMMENDED COMPONENT ARCHITECTURE

Do not create a single oversized abstraction that attempts to handle every source and role.

Prefer small components with clear ownership.

Possible architecture:

```text
src/components/media/
├── LocalPicture.astro
├── LocalImage.astro
└── SanityImage.astro
```

Only create these if repeated usage justifies them.

## `LocalPicture.astro`

For substantial local photography.

Responsibilities:

- Astro `<Picture />`;
- AVIF/WebP/fallback policy;
- layouts;
- quality preset;
- priority;
- class forwarding;
- fit;
- position;
- sizes override;
- alt;
- intrinsic metadata.

Do not hardcode one generic `sizes` string.

Suggested API concept:

```ts
interface Props {
  src: ImageMetadata;
  alt: string;
  layout: 'full-width' | 'constrained';
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  quality?: 'mid' | 'high' | 'max' | number;
  fit?: 'cover' | 'contain';
  position?: string;
  class?: string;
  fallbackFormat?: 'jpeg' | 'png' | 'webp';
}
```

Constrain the API to valid project use cases.

## `LocalImage.astro`

For one-format local raster assets.

Responsibilities:

- Astro `<Image />`;
- fixed/constrained layout;
- quality;
- responsive sizing when useful;
- priority only when explicitly requested;
- alt;
- class forwarding.

## `SanityImage.astro`

For CMS imagery.

Responsibilities:

- accepts the full Sanity image object, not only the base asset URL;
- respects crop and hotspot;
- calculates integer widths;
- prevents upscaling;
- generates a controlled `srcset`;
- generates accurate `sizes`;
- uses `auto=format`;
- supports quality;
- supports priority/eager/lazy policy;
- sets width/height or aspect ratio;
- outputs stable transformation URLs;
- handles alt from the content schema;
- supports decorative state;
- avoids generic fallback alt such as `"Image"`;
- supports a placeholder only if measured and visually approved.

Do not pass only the asset URL if doing so discards crop or hotspot information.

## Avoid component over-abstraction

Do not create a universal component with dozens of ambiguous props such as:

```text
type
mode
variant
sourceKind
formatMode
loadingMode
semanticMode
```

Prefer clear source ownership.

---

# ASTRO CONFIGURATION STRATEGY

## Step 1 — Inspect version and output mode

Before editing `astro.config.*`, determine:

- Astro version;
- static or server output;
- Cloudflare adapter presence;
- adapter version;
- current image service;
- current build environment;
- package manager;
- Sharp availability.

## Step 2 — Enable responsive styles when appropriate

For a sufficiently recent Astro version, this is a reasonable starting point:

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  image: {
    responsiveStyles: true,
  },
});
```

This does not by itself make every image responsive. A responsive `layout` must be selected globally or per component.

## Step 3 — Do not set a global layout immediately

Leave `image.layout` undefined during the first implementation pass unless the inventory shows that most images should share the same behaviour.

Apply layouts per image role.

## Step 4 — Authorise only required remote sources

For Astro-processed remote images, use a narrow allowlist.

Prefer `remotePatterns` where a path restriction is possible.

Example concept:

```js
image: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cdn.sanity.io',
      pathname: '/images/**',
    },
  ],
}
```

Do not authorise arbitrary HTTPS hosts.

If Sanity owns the transformation pipeline and native `<img>` URLs are used, Astro remote authorisation may not be necessary for those images.

## Step 5 — Sharp configuration is optional

Sharp is Astro’s default local image service.

Do not add custom encoder options until:

- the installed Astro version supports them;
- default output has been measured;
- visual quality has been reviewed;
- build time has been measured.

Start with per-image quality presets such as:

```astro
quality="high"
```

Then consider format-specific defaults if repeated overrides become necessary.

## Step 6 — Cloudflare

If the project is fully static:

- no server adapter is required solely for static deployment;
- Astro can process local images during the build;
- generated assets can be deployed to Cloudflare.

If using `@astrojs/cloudflare`:

- inspect current `imageService`;
- use a supported build/runtime combination;
- do not bundle incompatible Sharp runtime code into `workerd`;
- verify prerendered versus on-demand routes separately.

---

# FORMAT POLICY

## AVIF

Use AVIF where:

- the image is photographic;
- the image is large enough for savings to matter;
- quality is visually acceptable;
- build-time cost is acceptable;
- the pipeline supports reliable output;
- transparency or fine gradients remain satisfactory.

Do not use AVIF automatically for:

- tiny images;
- logos;
- line art;
- very small thumbnails;
- assets where the generated AVIF is not smaller;
- assets where encode time becomes disproportionate.

## WebP

Use WebP as a broadly useful modern output for:

- photography;
- transparent raster illustrations;
- thumbnails;
- local PNG replacements;
- one-format `<Image />` output.

## JPEG

Use JPEG fallback for:

- opaque photography;
- social images when broad compatibility and stable URL requirements justify it;
- cases where JPEG is smaller or visually cleaner than PNG.

Do not flatten transparency to black or an unintended background.

## PNG

Use PNG where:

- lossless raster output is genuinely needed;
- transparency and exact edges matter;
- the source is not suitable for SVG;
- fallback transparency is required.

Do not use PNG for normal photography unless evidence supports it.

## SVG

Use SVG for vector material.

Do not run normal SVG logos through a raster responsive-image pipeline.

## GIF

For animation:

- verify whether animated WebP, AVIF, or video would be better;
- preserve accessibility and controls;
- do not accidentally transform an animated asset into a static first frame.

---

# FALLBACK FORMAT POLICY

Astro `<Picture />` may use the source type as fallback.

This can be undesirable when the source is a large photographic PNG.

For opaque photography imported from PNG:

```text
AVIF source
WebP source
JPEG fallback
```

For transparency:

```text
AVIF/WebP source where visually appropriate
PNG or WebP fallback
```

For source JPEG photography:

```text
AVIF source
WebP source
JPEG fallback
```

Do not select JPEG fallback for images that require alpha transparency unless an intentional background colour is provided.

---

# RESPONSIVE SIZING POLICY

Responsive format conversion alone is insufficient.

A 2400-pixel AVIF can still be wasteful when displayed at 360 pixels.

For every image, determine:

- maximum CSS display width;
- display width at each breakpoint;
- number of columns;
- container max width;
- padding and gaps;
- aspect ratio;
- expected device pixel ratio;
- original dimensions.

## General target

For crisp high-density displays, source candidates up to approximately twice the maximum CSS display width are normally sufficient.

Do not generate or serve substantially beyond the useful display requirement.

Do not upscale beyond the original source.

## Layout selection

### `full-width`

Use when the image fills the container width, for example:

- full-width hero;
- wide editorial banner;
- full-width article image.

### `constrained`

Use when the image may shrink with the container but should not grow beyond a meaningful maximum, for example:

- content image;
- team image;
- two-column media;
- blog card;
- section photograph.

### `fixed`

Use when rendered dimensions do not change materially, for example:

- raster logo;
- avatar;
- fixed decorative illustration;
- small badge.

### `none`

Use only for deliberate unresponsive behaviour.

## `sizes`

Validate `sizes` against computed layout.

Example for a three-column card grid:

```text
(max-width: 767px) 100vw,
(max-width: 1199px) 50vw,
33vw
```

This example is not a project default. Account for container width, padding, and gaps.

Use browser DevTools to verify which source candidate is selected at:

- narrow mobile;
- wide mobile;
- tablet;
- laptop;
- large desktop;
- 1× DPR;
- 2× DPR.

## Variant control

Audit generated variants.

Do not customise `image.breakpoints` unless:

- default variants create excessive output;
- required display widths are poorly represented;
- route measurements justify a narrower set.

---

# LOADING AND PRIORITY POLICY

## Actual LCP or primary above-the-fold image

Use:

```astro
priority
```

on the Astro image component.

Normally there should be one primary high-priority image per route.

Do not use `priority` on:

- every hero-adjacent image;
- logos without evidence;
- gallery cards below the fold;
- all first-row items;
- hidden menu images;
- footer images.

## Other visible above-the-fold images

If an image is immediately visible but is not the primary LCP image:

- inspect browser loading;
- consider `loading="eager"` with normal priority only when needed;
- do not assign high fetch priority automatically;
- verify that it does not compete with the LCP resource.

## Near-fold images

Native lazy loading may fetch near-fold images early.

Test actual behaviour.

Do not override lazy loading merely because the image is technically below the initial viewport.

## Below-the-fold images

Use lazy loading.

Astro image components default to lazy loading unless priority or other attributes override it.

## Hidden images

Audit images inside:

- closed mobile menus;
- inactive carousel slides;
- hidden accordions;
- off-canvas panels.

Determine whether they download despite being hidden.

Avoid loading large hidden imagery before it is needed.

## Footer logo

Lazy loading may be appropriate.

Verify that the browser does not produce a visible blank state during fast scrolling.

---

# QUALITY POLICY

Do not optimise only by file size.

Preserve:

- skin tones;
- gradients;
- text inside images when unavoidable;
- fine illustration edges;
- brand colours;
- transparent edges;
- crop focal points;
- visible detail on high-density displays.

## Source masters

Keep high-quality source assets in the repository or Sanity.

Do not repeatedly recompress already compressed outputs.

## Starting quality

Prefer Astro quality presets first:

```text
mid
high
max
```

Start with `high` for important photography, then compare output.

Do not assume one numeric quality maps equally across JPEG, WebP, and AVIF.

## Visual review

Review at:

- actual rendered size;
- 100% browser zoom;
- 200% browser zoom;
- 1× DPR;
- 2× DPR;
- mobile crop;
- desktop crop;
- light and dark surrounding backgrounds where relevant.

Compare:

- original;
- fallback;
- WebP;
- AVIF.

Check:

- halos;
- banding;
- block artefacts;
- loss of texture;
- colour shifts;
- alpha fringes;
- blur;
- over-sharpening.

## Quality acceptance

An output is acceptable only when:

- visual difference is not meaningful in context;
- file-size saving is useful;
- layout remains stable;
- build cost is acceptable.

Do not keep AVIF merely because it is modern.

---

# SANITY IMAGE PIPELINE

## Use the full image object

Query:

- asset reference;
- crop;
- hotspot;
- alt;
- decorative state;
- caption;
- dimensions or metadata where needed.

Do not reduce the data to a raw base URL too early.

## URL generation

Use `@sanity/image-url`.

Generate integer widths.

Use `fit=max` when the image must never upscale.

Use `auto=format` to allow browser format negotiation.

Use a controlled quality parameter only after visual review.

## Responsive widths

Use a small stable set that matches the layout.

Example categories:

```text
320
480
640
800
1024
1280
1600
```

Do not use this exact set automatically.

Limit the number of unique transformations.

Sanity CDN caching benefits from reusing identical transformation URLs.

## AVIF note

Sanity may return AVIF through `auto=format` when the browser supports it.

Do not build a `<source type="image/avif">` URL using an unsupported explicit format parameter.

Verify actual response content type using request headers.

## Crop and hotspot

Respect editor crop and hotspot.

Test:

- portrait source in landscape card;
- landscape source in square card;
- faces near edges;
- mobile and desktop art direction;
- focal point preservation.

## Placeholder strategy

Do not add blur-up, LQIP, dominant colour, or skeleton placeholders automatically.

They may add:

- data;
- complexity;
- paint;
- visible transitions;
- CLS if implemented incorrectly.

Use only when visually valuable and measured.

## Schema safeguards

Ensure Sanity image fields support:

- alt text;
- decorative toggle;
- caption where relevant;
- hotspot;
- crop;
- editor guidance.

Do not require editors to export WebP or AVIF manually.

---

# SEO AND DISCOVERABILITY

Google discovers images through the `src` of an `<img>`, including the fallback `<img>` inside `<picture>`.

Google does not index CSS background images as normal page images.

For meaningful images:

- use HTML image elements;
- provide a real fallback `src`;
- use useful alt text;
- place images near relevant text;
- use stable URLs;
- use descriptive filenames where practical;
- avoid keyword stuffing;
- ensure crawlable access;
- use supported formats;
- include representative images in structured data and Open Graph metadata where relevant.

Do not rename every hashed Astro output file for SEO. The surrounding content and alt text are more important than manufacturing keyword-heavy asset URLs.

## Image sitemap

Consider an image sitemap when:

- many CMS images exist;
- CDN-hosted images are important;
- normal crawling may not discover them;
- gallery pages contain substantial original imagery.

Do not add one automatically without checking the existing sitemap system and actual discovery needs.

## CSS hero images

If a hero image is important to search discovery, it should not exist only as CSS background.

## Social images

Social-preview images may require:

- stable absolute URLs;
- JPEG or PNG;
- broad crawler compatibility;
- direct access;
- high resolution;
- controlled aspect ratio.

These may remain public assets or be generated through a dedicated social-image workflow rather than normal responsive page markup.

---

# ACCESSIBILITY AND ALT HANDLING

The separate semantic/a11y audit owns the full alt-text review.

This task must preserve its decisions.

Rules:

- informative image: meaningful context-specific alt;
- decorative image: `alt=""`;
- functional image: action or destination;
- image with complete adjacent caption: avoid redundant alt;
- icon adjacent to visible text: usually decorative;
- do not use generic fallback alt such as `"Image"`;
- do not derive alt from filename;
- do not use SEO keyword stuffing;
- do not expose decorative images through conflicting ARIA.

The image component API must require an explicit alt decision.

For Sanity, distinguish:

- missing alt;
- intentionally decorative empty alt.

---

# PHASE 0 — REPOSITORY DISCOVERY

Inspect:

- Astro version;
- package manager;
- lockfile;
- `astro.config.*`;
- output mode;
- adapter;
- Cloudflare adapter version;
- image service;
- Sharp dependency;
- `src/assets`;
- `public`;
- all raster images;
- all SVGs;
- all image imports;
- native `<img>`;
- Astro `<Image>`;
- Astro `<Picture>`;
- CSS backgrounds;
- remote images;
- Sanity client;
- Sanity schemas;
- Sanity image builder;
- Portable Text image renderer;
- content collections;
- blog data;
- gallery data;
- structured data;
- Open Graph metadata;
- sitemap;
- CI;
- build cache.

Create an inventory of every image usage.

Required columns:

- Image ID
- Route
- Component
- Source Type
- Source Path/URL
- Current Element
- Current Format
- Original Width
- Original Height
- Display Widths
- Transparency
- Animated
- Meaningful/Decorative
- Above Fold
- LCP Candidate
- Current Loading
- Current Priority
- Current Width/Height
- Current `srcset`
- Current `sizes`
- Current Optimisation Owner
- Proposed Owner
- Proposed Component
- Notes

Do not modify code before the inventory is complete.

---

# PHASE 1 — BASELINE BUILD AND NETWORK CAPTURE

Run the production build.

Record:

- build duration;
- image transformation duration;
- generated image count;
- generated image bytes;
- generated formats;
- generated width variants;
- warnings;
- cache behaviour.

Run a production-like preview.

For every representative route capture:

- image requests;
- request priority;
- response format;
- intrinsic dimensions;
- rendered dimensions;
- transfer size;
- cache state;
- LCP image;
- lazy/eager status;
- layout shifts;
- selected `srcset` candidate.

Test:

- mobile;
- tablet;
- desktop;
- 1× DPR;
- 2× DPR.

Store artifacts under an ignored directory such as:

```text
test-results/image-pipeline/
├── baseline/
├── requests/
├── screenshots/
├── build-output/
└── comparisons/
```

---

# PHASE 2 — CLASSIFY EVERY IMAGE

Assign each image one role:

- large local photo;
- small local photo;
- local raster illustration;
- raster logo;
- SVG logo;
- icon;
- decorative background;
- meaningful background;
- Sanity CMS image;
- remote third-party image;
- social metadata image;
- downloadable original;
- animation;
- placeholder.

Then assign one rendering mechanism:

- Astro `<Picture />`;
- Astro `<Image />`;
- Sanity responsive native `<img>`;
- native external `<img>`;
- inline/imported SVG;
- external SVG image;
- CSS background;
- public unchanged asset.

Document the reasoning.

---

# PHASE 3 — PIPELINE OWNERSHIP

For every image choose exactly one transformation owner:

- Astro build;
- Sanity CDN;
- third-party CDN;
- none/public unchanged.

Flag double processing.

Examples of double processing to avoid:

- Sanity resized WebP downloaded by Astro and converted again;
- already compressed WebP converted to another WebP with no savings;
- social JPEG routed through responsive page variants;
- SVG rasterised unnecessarily.

---

# PHASE 4 — LOCAL ASSET MIGRATION

For local images that should be processed:

1. move or copy the source master from `public/` into `src/assets/images/` using the repository’s organisation conventions;
2. update imports;
3. replace native `<img>` with the correct Astro component;
4. preserve semantics and classes;
5. preserve aspect ratio;
6. preserve visual crop;
7. choose layout;
8. choose format strategy;
9. choose loading policy;
10. build and inspect output.

Do not delete the public original until:

- no route references it;
- metadata does not require it;
- social previews do not use it;
- CSS does not use it;
- external links do not depend on the URL.

---

# PHASE 5 — COMPONENT IMPLEMENTATION

Create focused media components only when they reduce duplication and enforce correct decisions.

Before creating a wrapper, inspect:

- number of repeated usages;
- differing layouts;
- differing source types;
- differing `sizes`;
- differing loading policy.

Avoid one generic wrapper with a misleading default.

Ensure component props are typed.

Forward only valid attributes.

Do not silently add priority.

Do not silently invent alt text.

---

# PHASE 6 — SANITY COMPONENT

Implement or refine `SanityImage.astro`.

Requirements:

- full Sanity image object;
- crop;
- hotspot;
- integer width variants;
- `fit=max` where appropriate;
- stable transformation URL generation;
- `auto=format`;
- quality policy;
- responsive `srcset`;
- correct `sizes`;
- intrinsic dimensions/aspect ratio;
- loading;
- priority;
- alt;
- decorative state;
- caption compatibility;
- class forwarding;
- testability.

Do not produce a unique arbitrary width for every render if a reusable width set is sufficient.

---

# PHASE 7 — LOADING POLICY IMPLEMENTATION

Determine the actual LCP image for every route.

Apply `priority` only where justified.

Audit all existing:

- `fetchpriority`;
- `loading`;
- `decoding`;
- preload links.

Remove conflicting manual attributes when Astro `priority` owns them.

Replace index-based eager loading with layout-aware policy when necessary.

Keep below-fold images lazy.

Test hidden and carousel images.

---

# PHASE 8 — RESPONSIVE SIZING

For each responsive image:

1. inspect CSS layout;
2. calculate real rendered widths;
3. choose layout;
4. generate or override `sizes`;
5. inspect selected source in browser;
6. verify 1× and 2×;
7. verify no source exceeds useful dimensions;
8. verify no visible blur.

Do not declare success merely because `srcset` exists.

---

# PHASE 9 — FORMAT AND QUALITY BENCHMARK

For representative categories generate and compare:

- source/fallback;
- WebP;
- AVIF.

Record:

- width;
- quality;
- file size;
- decode/render behaviour;
- visual result;
- build time.

Categories:

- hero photo;
- gallery photo;
- blog image;
- transparent illustration;
- logo;
- thumbnail.

Create a recommendation matrix.

Do not use AVIF for a category when:

- savings are negligible;
- quality is worse;
- build cost is excessive;
- browser/Sanity behaviour is inconsistent;
- output variant count becomes unreasonable.

---

# PHASE 10 — CSS BACKGROUND REVIEW

Inventory every background image.

For each determine:

- decorative;
- meaningful;
- LCP;
- indexed;
- mobile variant;
- download behaviour;
- discovery delay;
- duplication.

Convert meaningful or priority backgrounds into HTML images only when appropriate.

Preserve overlays and layout through CSS.

Do not use absolute-positioned duplicate images that create redundant semantics or requests.

---

# PHASE 11 — SEO AND METADATA

Verify:

- meaningful images use HTML;
- fallback `src` is present;
- alt is retained;
- structured data references representative image URLs;
- Open Graph image is suitable;
- image URLs are crawlable;
- no blocked CDN;
- sitemap behaviour;
- stable repeated CMS URLs;
- filenames where controllable;
- no keyword stuffing.

Do not use temporary localhost image URLs in metadata.

---

# PHASE 12 — BUILD CACHE AND CI

Astro caches processed images.

Inspect current cache handling.

For CI/build platform:

- determine whether the Astro cache directory can be preserved;
- avoid stale or unsafe cache configuration;
- verify remote cache revalidation;
- measure cold and warm build time.

Do not commit cache contents.

Add image-pipeline regression checks for:

- public photography accidentally reintroduced;
- missing width/height;
- missing alt decision;
- LCP image accidentally lazy-loaded;
- too many priority images;
- oversized delivered image;
- unexpected PNG photography;
- uncontrolled generated variants;
- Sanity base originals requested without resizing;
- missing `fit=max` where required;
- route image-byte budget.

Avoid brittle checks tied to hashed filenames.

---

# PHASE 13 — VISUAL QA

Capture before and after screenshots for:

- home hero;
- mobile hero;
- header logo;
- mobile-menu logo;
- values cards;
- gallery;
- FAQ decoration;
- About page;
- blog listing;
- blog article;
- footer.

Review:

- crop;
- object position;
- image sharpness;
- transparent edges;
- colour;
- gradient banding;
- text wrapping;
- layout shift;
- placeholders;
- delayed appearance.

Use actual mobile and desktop viewports.

---

# PHASE 14 — FINDINGS

Every finding must include:

- ID
- severity
- priority
- confidence
- route
- component
- image
- current pipeline
- current bytes
- rendered size
- current loading
- issue
- evidence
- proposed pipeline
- expected impact
- visual risk
- SEO/accessibility risk
- test
- retest status

Use IDs such as:

- `IMG-PIPE-001`
- `IMG-SIZE-001`
- `IMG-FORMAT-001`
- `IMG-LCP-001`
- `IMG-LAZY-001`
- `IMG-SANITY-001`
- `IMG-SEO-001`
- `IMG-BUILD-001`

Severity:

## Critical

Image delivery prevents a primary page from loading or causes severe instability.

## Serious

A major image substantially harms LCP, bandwidth, visual quality, or content discovery.

## Moderate

A repeated image pattern wastes meaningful bandwidth or creates inconsistent behaviour.

## Minor

A small inefficiency or consistency issue with limited user impact.

## Recommendation

A future improvement without a confirmed defect.

---

# REQUIRED DELIVERABLES

Create:

```text
docs/image-pipeline/
├── EXECUTIVE-SUMMARY.md
├── AUDIT-SCOPE.md
├── IMAGE-INVENTORY.md
├── IMAGE-INVENTORY.csv
├── PIPELINE-OWNERSHIP.md
├── IMAGE-VS-PICTURE-MATRIX.md
├── LOCAL-ASSET-MIGRATION.md
├── SANITY-IMAGE-PIPELINE.md
├── RESPONSIVE-SIZES.md
├── LOADING-PRIORITY.md
├── FORMAT-QUALITY-BENCHMARK.md
├── CSS-BACKGROUND-REVIEW.md
├── SEO-IMAGE-REVIEW.md
├── BUILD-OUTPUT.md
├── BUILD-CACHE.md
├── FINDINGS.md
├── FINDINGS.csv
├── REMEDIATION-PLAN.md
├── BEFORE-AFTER.md
└── HUMAN-REVIEW-CHECKLIST.md
```

## `IMAGE-INVENTORY.csv`

Columns:

- ID
- Route
- Component
- Source
- Source Type
- Current Element
- Current Owner
- Original Format
- Original Width
- Original Height
- Transparency
- Display Widths
- Above Fold
- LCP
- Loading
- Priority
- Current Bytes
- Current Alt State
- Proposed Owner
- Proposed Component
- Proposed Formats
- Proposed Layout
- Proposed Sizes
- Proposed Loading
- Status

## `FINDINGS.csv`

Columns:

- ID
- Severity
- Priority
- Confidence
- Status
- Category
- Route
- Component
- Image
- Baseline Bytes
- Rendered Size
- Issue
- Root Cause
- Recommendation
- Expected Impact
- Visual Risk
- Owner
- Retest

---

# BASELINE EXECUTION ORDER

Execute:

1. repository discovery;
2. Astro/version/output inspection;
3. full image inventory;
4. production build;
5. generated image inventory;
6. route screenshots;
7. browser image request capture;
8. LCP identification;
9. layout and `sizes` review;
10. image classification;
11. pipeline ownership;
12. format benchmark;
13. Sanity review;
14. CSS background review;
15. SEO review;
16. findings;
17. implementation plan.

At baseline stage:

- do not migrate every image;
- do not add global image defaults;
- do not add AVIF everywhere;
- do not alter CMS schemas broadly;
- do not delete public assets.

---

# HUMAN CHECKPOINT 1 — BASELINE REVIEW

Stop and present:

- image count;
- local/public/remote/Sanity split;
- current total image bytes by route;
- actual LCP images;
- images lacking responsive sizes;
- public images suitable for migration;
- Sanity pipeline findings;
- proposed `<Image />` uses;
- proposed `<Picture />` uses;
- proposed native `<img>` uses;
- proposed SVG uses;
- proposed CSS background uses;
- priority changes;
- loading changes;
- build-output impact;
- quality samples;
- findings by severity.

Ask the human to review:

- visual quality;
- important brand images;
- intended crops;
- decorative versus meaningful classification;
- social-image requirements;
- expected Sanity workflow;
- implementation order.

Do not begin broad migration before approval.

---

# REMEDIATION ORDER

After approval, work in this order:

1. actual LCP image;
2. grossly oversized public photography;
3. missing responsive sizing;
4. layout-shift risks;
5. incorrect eager/lazy policy;
6. Sanity image component;
7. gallery and blog CMS paths;
8. large content photography;
9. raster logo replacement or resizing;
10. small illustrations;
11. CSS backgrounds;
12. build-cache and regression checks.

Use small, reviewable changes.

---

# BEFORE/AFTER VERIFICATION

For every migrated image compare:

- output markup;
- selected mobile source;
- selected desktop source;
- 1× source;
- 2× source;
- transfer bytes;
- visual quality;
- LCP impact where relevant;
- CLS;
- build output count;
- build duration;
- cache behaviour.

Do not count source repository size as user transfer savings.

Do not claim improvement based only on extension.

---

# COMPLETION CRITERIA

The GOAL may be marked complete only when:

- Astro version and output mode are documented;
- the image service is documented;
- every image usage is inventoried;
- every image has one optimisation owner;
- every processable local page image is evaluated for migration from `public/`;
- every image has a rendering-mechanism decision;
- all important photography uses appropriate responsive sizing;
- all actual LCP images have correct loading priority;
- below-the-fold images are lazy unless a documented exception exists;
- no LCP image is lazy-loaded;
- no route has multiple unjustified high-priority images;
- widths and heights or equivalent aspect ratios are present;
- responsive `sizes` values are validated against layout;
- browser-selected sources are verified;
- unnecessary upscaling is prevented;
- AVIF/WebP/fallback policy is benchmarked;
- visual quality is approved;
- Sanity crop and hotspot are respected;
- Sanity does not serve raw oversized originals to normal page layouts;
- double optimisation is eliminated or justified;
- CSS backgrounds are classified;
- meaningful images are crawlable;
- alt decisions are preserved;
- social images remain valid;
- build output and variant count are controlled;
- image caching is documented;
- CI regression checks exist;
- current tests pass or failures are documented;
- production build passes;
- all required reports exist;
- no unsupported “all images optimised” claim is made.

Begin with **Phase 0 — Repository Discovery**.
