# Little Wise Kids — Website Specification MCP Integration and Audit Sequence

## Verdict

Use the Website Specification MCP as a **cross-cutting audit librarian, coverage oracle, and final release checklist**.

It is a useful “cherry on the cake”, but it should not replace:

- the semantic HTML audit;
- the WCAG accessibility audit;
- the CSS and JavaScript loading/bloat audit;
- the Core Web Vitals, assets, and resource-loading audit;
- primary standards and official platform documentation;
- rendered-browser testing;
- source-code inspection;
- human verification.

The MCP server is read-only and exposes a broad, platform-agnostic website specification through searchable topics and checklists. This makes it well suited to finding omissions across domains that focused audits might not cover.

Endpoint:

```text
https://mcp.specification.website/mcp
```

Transport:

```text
Streamable HTTP
```

Authentication:

```text
None
```

---

# What the MCP Provides

The server currently exposes:

## Tools

### `search(query, limit?)`

Returns ranked specification topics with:

- title;
- status;
- category;
- URL;
- excerpts.

Use it when the audit encounters a concept such as:

- CSP;
- preload;
- semantic landmarks;
- structured data;
- cache control;
- `llms.txt`;
- internationalisation.

### `list_topics({ category?, status?, limit? })`

Returns a filtered topic index.

Use it to create category-specific audit inventories.

Examples:

```text
category: accessibility
status: required
```

```text
category: performance
status: recommended
```

### `get_topic({ slug })`

Returns the complete canonical Markdown for one topic, including sources and implementation guidance.

Use it only after a topic has been identified as relevant.

### `get_checklist({ category?, status? })`

Returns a tickable Markdown checklist.

This is the most useful tool for release coverage and audit planning.

### `get_categories()`

Returns the top-level categories and topic counts.

Current categories include:

- Foundations
- SEO
- Accessibility
- Security
- Well-Known URIs
- Agent Readiness
- Performance
- Privacy
- Resilience
- Internationalisation

### `get_changes({ since?, type?, limit? })`

Returns topics changed since a date.

Use it for later delta audits rather than rerunning the entire specification.

## Prompt

### `audit_url(url, focus?)`

Generates an audit plan for a URL, optionally narrowed to a category.

Examples:

```text
audit_url("https://preview.example.com", "security")
```

```text
audit_url("https://preview.example.com", "performance")
```

Treat the result as a planning aid, not evidence that the website passes or fails.

---

# Authority and Limitations

The Website Specification project is:

- open source;
- platform-agnostic;
- source-cited;
- machine-readable;
- broad in scope;
- designed for both humans and AI agents.

It is an aggregator of standards, official guidance, and practical recommendations.

It is not itself:

- the WHATWG HTML standard;
- WCAG;
- an IETF RFC;
- Google Search Central;
- Astro documentation;
- Cloudflare documentation;
- a browser trace;
- a security scanner;
- a screen reader;
- a source-code auditor.

Its status labels — Required, Recommended, Optional, and Avoid — are useful defaults, but the project explicitly states that context may justify exceptions.

Therefore:

1. use it to discover what should be considered;
2. load the relevant topic;
3. inspect its cited source;
4. verify against the current primary source;
5. test the actual implementation;
6. document contextual exceptions.

Do not make code changes solely because the MCP labels a topic “Required”.

Do not let it override evidence from:

- the rendered DOM;
- browser behaviour;
- WCAG Understanding documents;
- WHATWG;
- MDN;
- web.dev;
- Astro;
- Vite;
- Cloudflare;
- Sanity;
- trace and network evidence.

---

# Recommended Two-Pass Use

## Pass A — Initial Coverage Map

Run this before the specialist audits.

The purpose is not remediation.

The purpose is to discover:

- audit domains;
- missing audit workstreams;
- required and recommended topics;
- items that do not apply;
- items that require deployment-level verification;
- items that belong to future prompts.

### Actions

1. Call `get_categories()`.
2. Call `get_checklist()` for the complete checklist.
3. Call `get_checklist({ status: "required" })`.
4. Call `list_topics()` for each relevant category.
5. Run `audit_url()` against the current production or preview URL if available.
6. Create a project coverage register.
7. Map every item to:
    - an existing specialist audit;
    - a future audit;
    - a deployment check;
    - a manual check;
    - not applicable.

### Required output

Create:

```text
docs/governance/WEBSITE-SPEC-COVERAGE.md
```

Suggested columns:

- Topic
- Category
- Status
- Applies
- Owner Audit
- Evidence Required
- Current State
- Finding ID
- Exception
- Primary Source Verified
- Final Status

At this stage, do not fix the site.

---

## Pass B — Final Independent Sweep

Run this after the specialist audits and their remediation phases.

The purpose is to find gaps between audit domains.

Examples:

- semantic and accessibility audits may not inspect `security.txt`;
- performance may not inspect canonical URLs;
- SEO may not inspect forced-colours mode;
- security may not inspect language declarations;
- all audits might overlook resilience or agent-readiness endpoints.

### Actions

1. Regenerate the complete checklist.
2. Run `audit_url()` against the deployed preview or production candidate.
3. Review every Required topic.
4. Review applicable Recommended topics.
5. Cross-reference all existing findings and reports.
6. Load `get_topic()` for unresolved or disputed items.
7. Verify the topic’s primary source.
8. Test the actual site.
9. Record:
    - pass;
    - fail;
    - not applicable;
    - accepted exception;
    - pending production verification;
    - pending human verification.
10. Do not duplicate existing findings.
11. Create a new finding only when no specialist report already owns the issue.

### Required output

Create:

```text
docs/release/FINAL-WEBSITE-SPEC-REVIEW.md
```

This should be the final cross-domain release-readiness matrix.

---

# Correct Sequence for the Existing Prompts

## Stage 0 — Untouched Baseline and Governance

Before running any major audit:

1. create a clean branch;
2. record the current commit;
3. install from the lockfile;
4. run the existing tests;
5. run the production build;
6. capture reference screenshots;
7. record route inventory;
8. record current CSS and JavaScript build sizes;
9. record a lightweight Lighthouse snapshot;
10. save the current production or preview headers;
11. run Website Specification MCP Pass A.

This protects against losing the original baseline while later audits change the implementation.

Do not perform broad remediation at Stage 0.

---

## Stage 1 — Semantic HTML Audit

Run:

```text
Little_Wise_Kids_Semantic_HTML_Audit_Prompt.md
```

### Why first

Semantic HTML establishes the document and component foundations:

- ownership of `<main>`;
- landmark structure;
- headings;
- section/article/aside decisions;
- link versus button semantics;
- list and form structures;
- image purpose and alternative text;
- reusable Astro component contracts;
- Sanity semantic safeguards.

These changes can alter:

- markup;
- component APIs;
- selectors;
- JavaScript hooks;
- accessibility output;
- browser rendering.

Running semantic HTML after CSS/JS optimisation would cause unnecessary rework.

### Execution rule

Complete:

1. baseline;
2. human review;
3. remediation;
4. regression test;
5. final build.

Do not move to Stage 2 while major semantic structure remains unstable.

---

## Stage 2 — Accessibility Audit

Run:

```text
Little_Wise_Kids_Accessibility_Audit_Prompt.md
```

Use the comprehensive WCAG 2.2 AA prompt created earlier.

### Why second

The semantic audit removes structural noise and creates a cleaner foundation for:

- keyboard testing;
- focus behaviour;
- screen-reader semantics;
- form errors;
- contrast;
- reflow;
- target size;
- reduced motion;
- interactive states.

Accessibility remediation may alter:

- controls;
- focus management;
- menu behaviour;
- JavaScript;
- CSS states;
- DOM order;
- animation.

Therefore it should happen before CSS and JavaScript bloat removal.

### Execution rule

Complete:

1. baseline;
2. human review;
3. remediation;
4. manual verification;
5. regression tests;
6. final build.

Do not make unsupported WCAG-conformance claims.

---

## Stage 3 — CSS and JavaScript Loading/Bloat Audit

Run:

```text
Little_Wise_Kids_CSS_JavaScript_Loading_Bloat_Audit_Prompt.md
```

### Why third

At this point:

- semantic markup is stable;
- component responsibilities are clearer;
- accessibility-required states are known;
- menu, form, gallery, and focus behaviour are settled.

The audit can now safely identify:

- stale selectors;
- duplicate CSS;
- unused JavaScript;
- route leakage;
- unnecessary hydration;
- repeated inline code;
- oversized dependencies;
- third-party loading;
- interaction-only code loaded initially.

Running this before accessibility could incorrectly remove CSS or JavaScript used only by:

- keyboard focus;
- error states;
- open menus;
- reduced motion;
- forced colours;
- screen-reader-only content;
- validation;
- mobile interaction.

### Execution rule

Coverage must include both:

- initial page load;
- all important interaction states.

Initial-load unused code must not automatically be removed.

Complete:

1. baseline;
2. human review;
3. remediation;
4. route asset comparison;
5. coverage retest;
6. visual and functional review;
7. final build.

---

## Stage 4 — Performance, Core Web Vitals, Assets, and Resource Loading Audit

Run:

```text
Little_Wise_Kids_Performance_Core_Web_Vitals_Asset_Loading_Audit_Prompt.md
```

### Why fourth

This audit should measure the stabilised implementation.

It depends on:

- final semantic markup;
- final accessibility interactions;
- final CSS ownership;
- final JavaScript loading;
- stable assets and component hierarchy.

It then determines:

- actual LCP elements;
- LCP phase breakdowns;
- CLS sources;
- INP risks;
- image transformation;
- font loading;
- preload;
- fetch priority;
- preconnect;
- lazy versus eager loading;
- Astro prefetch;
- Sanity delivery;
- caching;
- Cloudflare headers;
- Lighthouse CI budgets.

If run too early, later semantic and accessibility changes invalidate:

- LCP candidates;
- DOM size;
- script execution;
- selectors;
- resource priority;
- bundle sizes;
- CLS results.

### Environment

Run against:

1. local production build;
2. Cloudflare preview where available;
3. production for field data and real response headers.

Complete:

1. baseline;
2. human review;
3. remediation;
4. repeated before/after measurements;
5. CI budgets;
6. final build;
7. production verification.

---

## Stage 5 — Website Specification MCP Final Sweep

Run Pass B.

This is the “cherry on the cake”.

Do not rerun the detailed specialist audits from scratch.

Use the MCP to identify remaining cross-domain gaps.

Expected residual areas may include:

- Foundations
- SEO
- Security
- Privacy
- Resilience
- Internationalisation
- Well-Known URIs
- Agent Readiness

The sweep should decide whether each gap needs:

- a small direct fix;
- a dedicated new audit prompt;
- deployment verification;
- editorial work;
- a documented not-applicable decision.

---

# Compact Sequence

```text
0. Freeze untouched baseline
   ↓
0A. Website Specification MCP initial coverage map
   ↓
1. Semantic HTML audit → review → remediate → verify
   ↓
2. Accessibility audit → review → remediate → verify
   ↓
3. CSS/JS loading and bloat audit → review → remediate → verify
   ↓
4. Performance/CWV/assets audit → review → remediate → verify
   ↓
5. Website Specification MCP final cross-domain sweep
   ↓
6. Release candidate verification
```

---

# Why Not Run All Audit Prompts Simultaneously?

Parallel execution sounds efficient but creates conflicting recommendations.

Examples:

- The semantic audit may replace a generic interactive `<div>` with a native button.
- The accessibility audit may add focus and validation states.
- The CSS audit may otherwise classify those state selectors as unused.
- The performance audit may identify a current LCP element that disappears after markup changes.
- The script audit may defer code later required for accessible keyboard interaction.

Use parallel work only for read-only baseline collection that cannot modify the same files.

Do not allow multiple remediation agents to edit the same shared components simultaneously.

---

# Recommended Handoff Contract Between Audits

Every completed audit should update:

```text
docs/governance/AUDIT-HANDOFF.md
```

Include:

- audit name;
- starting commit;
- ending commit;
- routes covered;
- components changed;
- public component APIs changed;
- CSS ownership changes;
- JavaScript behaviour changes;
- assets changed;
- known unresolved findings;
- accepted exceptions;
- new regression tests;
- manual checks still required;
- downstream audit warnings.

The next audit must read this file before beginning.

This prevents the next model from rediscovering or reversing approved decisions.

---

# Specification MCP Instructions to Add to Specialist Prompts

Add this block near the beginning of each future audit prompt:

```text
## Website Specification MCP reference

When the Website Specification MCP is available:

1. Load the checklist for the audit’s relevant category.
2. Use it to discover candidate checks, not to declare findings.
3. Load the full topic only when it applies.
4. Inspect the topic’s cited primary source.
5. Prefer current normative or official documentation over the aggregator.
6. Verify the actual rendered website and source implementation.
7. Record applicable topics in the project coverage register.
8. Do not duplicate findings owned by another specialist audit.
9. Contextual exceptions are allowed only with evidence.
10. The MCP is read-only reference material, not a test runner.
```

Category mapping:

```text
Semantic HTML audit:
- Foundations
- Accessibility
- SEO where document structure overlaps

Accessibility audit:
- Accessibility
- Internationalisation
- Foundations

CSS/JS audit:
- Performance
- Foundations
- Accessibility for state preservation
- Security for third-party script implications

Performance audit:
- Performance
- Resilience
- Privacy for RUM and third parties
- Security for caching and resource policies
```

---

# Example Agent Calls

## Before semantic audit

```text
Call get_checklist with category "foundations".
Call get_checklist with category "accessibility".
List Required topics in both categories.
Map each relevant item to the semantic audit scope.
Do not modify code from this MCP pass.
```

## Before accessibility audit

```text
Call get_checklist with category "accessibility".
Load only the topics that apply to the current site.
Cross-check WCAG topics against WCAG 2.2 and Understanding documents.
Treat Website Specification status labels as project guidance, not WCAG conformance evidence.
```

## Before CSS/JS audit

```text
Search for:
- JavaScript loading
- CSS loading
- native interactive elements
- third-party scripts
- content security policy
- resource hints

Use results to discover checks.
Do not recommend async, defer, preload, or code splitting without build and runtime evidence.
```

## Before performance audit

```text
Call get_checklist with category "performance".
Load topics related to:
- Core Web Vitals
- image optimisation
- font loading
- caching
- resource hints
- JavaScript performance
- compression

Cross-check each recommendation against current web.dev, Chrome, Astro, Vite, and Cloudflare documentation.
```

## Final release sweep

```text
Call get_checklist for all categories.
Review all Required topics.
Review applicable Recommended topics.
Run audit_url against the deployed release candidate.
Cross-reference the existing audit reports.
Create no duplicate findings.
Load get_topic only for unresolved items.
Verify primary sources.
Produce FINAL-WEBSITE-SPEC-REVIEW.md.
```

---

# Using `get_changes` After Launch

Record the date of the final sweep:

```text
docs/release/WEBSITE-SPEC-LAST-REVIEWED.txt
```

Before later releases:

1. read the stored date;
2. call `get_changes({ since: "<date>" })`;
3. inspect only added, promoted, rewritten, or removed topics;
4. identify affected audits;
5. rerun relevant checks;
6. update the review date.

This turns the MCP into an efficient maintenance tool rather than a one-off checklist.

Recommended cadence:

- before each major release;
- after material architecture changes;
- quarterly for a stable marketing site;
- when browser or web-platform requirements materially change.

---

# MCP Client Configuration

The server supports Streamable HTTP and does not require a token.

Official generic endpoint:

```text
https://mcp.specification.website/mcp
```

A compatible client needs a remote HTTP MCP entry.

The project documents this example:

```json
{
  "mcpServers": {
    "specification-website": {
      "transport": "http",
      "url": "https://mcp.specification.website/mcp"
    }
  }
}
```

Adapt the outer configuration shape to the current MCP client.

After connection, verify that the following tools are discoverable:

```text
search
list_topics
get_topic
get_checklist
get_categories
get_changes
```

Also verify the prompt:

```text
audit_url
```

Because the server is public and read-only, it does not need access to repository secrets.

Do not send:

- source code;
- environment variables;
- unpublished CMS content;
- private preview credentials;
- personal data;

unless the chosen client independently includes that material in its own model context.

The MCP server itself only needs topic queries and public audit URLs.

---

# Final Recommendation

Use Website Specification MCP in three roles:

## 1. Scope discovery

At the beginning, identify missing domains and create the master coverage register.

## 2. Specialist reference

During each audit, retrieve relevant topics and their source links without loading the entire specification into model context.

## 3. Release gate and delta monitor

At the end, run the complete cross-domain review; after launch, use `get_changes` to re-audit only specification changes.

Do not use it as the main remediation agent.

The specialist prompts remain responsible for:

- evidence;
- testing;
- source inspection;
- browser behaviour;
- exact fixes;
- regression verification.

The MCP ensures that the collection of specialist audits does not leave obvious cross-domain holes.