You are acting as a senior web accessibility auditor, Astro engineer, test automation engineer and inclusive-design reviewer.

Your task is to set up and perform a comprehensive, evidence-based accessibility audit of this existing Astro website.

The website is the Little Wise Kids website.

Known project context:

* Framework: Astro
* CMS: Sanity
* Hosting target: Cloudflare
* The website should remain static-first unless the existing implementation requires otherwise.
* The CMS is used by non-technical editors.
* Preserve the existing architecture, design system, CSS tokens, page structure and component conventions.
* Existing pages use shared layouts such as `BaseLayout`.
* Do not introduce unnecessary dependencies.
* Do not replace existing implementation patterns merely because you prefer another architecture.
* Do not make DNS, domain, email or unrelated deployment changes.
* Accessibility is the focus of this task.
* Performance, SEO and Core Web Vitals must not regress.

The target is WCAG 2.2 Level A and AA.

Use the following as the standards and methodology sources of truth:

* Web Content Accessibility Guidelines 2.2
* How to Meet WCAG 2.2 Quick Reference
* Understanding WCAG 2.2
* WCAG-EM website evaluation methodology
* WAI-ARIA Authoring Practices where custom interactive components are present
* Native HTML semantics should be preferred over ARIA

Automated testing is supporting evidence only. Passing axe tests does not establish WCAG conformance.

Do not claim that the website is fully accessible, WCAG compliant or conformant based only on automated testing.

# Operating rules

1. Inspect the repository before installing or changing anything.

2. Detect the existing package manager from its lockfile and use only that package manager.

3. Inspect existing scripts, dependencies, Astro configuration, TypeScript configuration, routes, layouts, components, styles, Sanity schemas and CI files.

4. Do not install duplicate tools if equivalent tooling already exists.

5. Prefer direct Playwright integration over an accessibility MCP wrapper.

6. The only expected new testing dependencies are normally:

    * `@playwright/test`
    * `@axe-core/playwright`

   Add another dependency only when it provides a clearly necessary capability that cannot reasonably be implemented with the existing stack.

7. Do not suppress accessibility failures simply to produce green tests.

8. Do not add broad axe exclusions.

9. Do not disable an axe rule without documenting:

    * the exact rule
    * why it is a false positive or inapplicable
    * the affected page or component
    * the evidence supporting the decision

10. Do not change visual design unless required to resolve a confirmed accessibility issue.

11. Prefer correcting the underlying shared component over patching every individual page.

12. Preserve responsive design and existing breakpoint conventions.

13. Do not introduce hardcoded design values when an appropriate CSS token exists.

14. Do not proceed directly into broad remediation before creating and presenting the baseline audit.

15. Clearly separate:

* confirmed automated failures
* confirmed manual failures
* likely problems requiring human verification
* passed checks
* not-applicable criteria
* checks that could not be completed

# Phase 0 — Repository discovery

Before modifying the project, inspect and report:

* Astro version
* Node.js requirements
* package manager
* existing scripts
* existing testing tools
* project output mode
* Astro adapters and integrations
* Cloudflare-related configuration
* source directory structure
* layouts
* shared components
* CSS architecture
* design tokens
* JavaScript or framework islands
* Sanity configuration and schema location
* environment-variable requirements
* forms and submission providers
* all statically discoverable routes
* dynamic routes
* Sanity-driven routes
* sitemap generation
* existing GitHub Actions or other CI configuration

Create an initial route and component inventory.

For every route, record:

* route
* page template
* layout
* primary components
* interactive components
* data source
* whether it is static or dynamic
* important states requiring testing
* whether it represents a unique page type

Identify representative page types rather than assuming that testing the home page is sufficient.

Expected page types may include:

* home page
* about page
* general content page
* blog or news listing
* blog article
* contact or enquiry page
* form success state
* form validation-error state
* privacy or policy page
* 404 page
* navigation closed state
* navigation open state
* mobile navigation
* any submenu, disclosure, accordion, modal, carousel or tab interface

Account for the routes that actually exist in the repository. Do not invent tests for components that are not present.

Present the discovery results before making architectural changes.

# Phase 1 — Establish the testing infrastructure

Set up Playwright using the existing package manager.

Configure Playwright to test a production-like local build whenever practical.

Prefer this lifecycle:

1. Build the Astro project.
2. Start the Astro preview server or the project’s existing production-preview command.
3. Allow Playwright to manage that process through `webServer`.
4. Use a local `baseURL`.
5. Reuse an existing local server outside CI where appropriate.
6. Never point destructive form tests at production services.

If the production build cannot run without Sanity environment variables:

* inspect existing environment handling
* use the project’s documented local variables
* do not expose secrets
* do not commit secret values
* document what is required
* avoid mocking content unless necessary
* clearly identify any audit limitation caused by unavailable content

Configure browser projects for:

* Chromium desktop
* Firefox desktop
* WebKit desktop
* Chromium mobile
* WebKit mobile

Use realistic desktop and mobile viewport settings.

Also create specialised emulation projects or targeted tests for:

* reduced motion
* dark colour scheme where the site supports it
* forced colours where supported
* touch/mobile interaction

Configure:

* HTML reporter
* concise terminal reporter
* screenshot on failure
* trace on first retry
* video only when useful
* no retries locally unless justified
* limited retries in CI
* deterministic test timeouts
* test artifacts stored outside source folders

Add appropriate package scripts, adapting their exact names to existing conventions:

* `test:a11y`
* `test:a11y:headed`
* `test:a11y:report`
* `test:a11y:chromium`
* `test:a11y:manual`

Do not overwrite existing scripts.

# Phase 2 — Build the accessibility test architecture

Create a maintainable structure similar to:

* `tests/accessibility/`
* `tests/accessibility/helpers/`
* `tests/accessibility/pages/`
* `tests/accessibility/components/`
* `docs/accessibility/`
* `test-results/accessibility/`

Adapt these paths if the repository has an established testing convention.

Create reusable helpers for:

* navigating to a route
* waiting for Astro islands and relevant UI state
* waiting for fonts where contrast or layout tests depend on them
* running axe
* formatting axe failures
* attaching the full axe result to Playwright reports
* capturing screenshots
* recording browser and viewport metadata
* checking for unexpected horizontal overflow
* obtaining the accessibility-relevant DOM for a failing element

Configure axe to cover WCAG 2.0, 2.1 and 2.2 Level A and AA rules supported by the installed version.

Ensure that WCAG 2.2 rules such as target-size checks are not accidentally omitted because they are disabled by default in the installed axe version.

Inspect the installed axe version and use its supported tags or explicit rule configuration.

Include best-practice rules in a separate result category. Do not incorrectly report a best-practice recommendation as a WCAG failure.

A test failure must print useful information:

* rule ID
* impact
* WCAG tags
* help text
* affected selectors
* failure summary
* relevant HTML
* page URL
* browser
* viewport
* tested UI state

Avoid assertions that only print a large unstructured JSON object.

# Phase 3 — Automated route audit

Run automated accessibility scans against every representative route.

For each route, test:

* desktop initial state
* mobile initial state
* any materially different responsive layout
* relevant interactive states
* available light and dark modes
* reduced-motion preference where animation exists

Scan the complete page unless a component-specific scan is intentionally being performed.

Do not scan only the initial page load.

Before each scan:

* wait for the page to reach its intended stable state
* wait for required Astro islands to hydrate
* open the component being tested
* dismiss only overlays that are not part of the product state
* verify that the expected content is actually visible

Examples of required state-based tests:

* mobile navigation closed
* mobile navigation open
* submenu expanded
* accordion collapsed and expanded
* modal closed and open
* form untouched
* form submitted empty
* form containing invalid values
* validation messages displayed
* successful submission confirmation, using a safe mock or non-production path
* carousel at its initial and changed slide
* any dynamically loaded Sanity content after rendering

Do not submit real contact messages or trigger production side effects.

# Phase 4 — Structural and semantic analysis

Inspect both rendered output and source implementation.

Audit:

## Document structure

* valid and meaningful page title
* document language
* viewport configuration
* one clear page-level main heading
* logical heading hierarchy
* headings used for structure rather than appearance
* paragraphs not visually impersonating headings
* lists represented as lists
* quotations represented correctly
* valid landmark structure
* a single primary `main` landmark
* appropriate `header`, `nav`, `main`, `aside` and `footer` usage
* distinct accessible names for multiple navigation landmarks
* skip link presence and behaviour
* skip link destination
* source order matching meaningful reading order

Do not fail a page solely because heading levels skip numerically without considering the actual document structure. Record the reasoning.

## Links and controls

* buttons implemented as buttons
* navigation links implemented as links
* no clickable `div` or `span` elements without a strong justified reason
* accessible name matches visible purpose
* icon-only controls have accessible names
* decorative icons are hidden from assistive technology
* linked images have appropriate alternative text
* repeated generic link labels are understandable in context
* no empty links or buttons
* no nested interactive controls
* disabled controls are communicated correctly
* external links are not unexpectedly disruptive
* current navigation item is communicated where useful

## ARIA

* native semantics preferred
* valid roles
* valid states and properties
* no redundant or conflicting ARIA
* no references to missing IDs
* `aria-expanded` reflects actual state
* `aria-controls` points to the correct element where used
* `aria-labelledby` and `aria-describedby` references exist
* hidden content is not focusable
* visible content is not incorrectly hidden from assistive technology
* custom widgets follow established interaction patterns

Apply the first rule of ARIA: do not use ARIA when native HTML already provides the required semantics and behaviour.

# Phase 5 — Keyboard and focus audit

Automate what can be reliably automated, then create explicit manual checks for the remainder.

Test:

* all interactive elements reachable by keyboard
* logical focus order
* no keyboard traps
* reverse navigation with Shift+Tab
* activation with Enter or Space as appropriate
* Escape closes dismissible overlays where expected
* arrow-key behaviour for widgets that require it
* focus returns to the trigger after closing an overlay
* focus moves into modal interfaces appropriately
* background content cannot receive focus while a modal menu or dialog is active
* no positive `tabindex`
* no unnecessary `tabindex="0"`
* focus remains visible
* focus indicator has sufficient contrast
* focus is not obscured by sticky headers, overlays or viewport edges
* focus styles are not removed without replacement
* mobile menu focus handling
* skip-link focus behaviour
* browser back navigation preserves a usable focus position where relevant

For the website’s custom full-screen or decorative menu, inspect:

* trigger semantics
* expanded state
* relationship between trigger and menu
* focus entry
* focus containment when modal
* Escape behaviour
* close-button accessibility
* focus restoration
* background scrolling
* background interaction
* reading order
* animation under reduced motion

Do not automatically add a focus trap unless the component truly behaves as a modal interface.

# Phase 6 — Responsive layout, zoom and reflow

Test at minimum:

* 200% browser zoom
* 400% browser zoom
* a 320 CSS-pixel-wide viewport
* narrow portrait mobile
* mobile landscape
* desktop
* long translated-like text samples where practical
* increased browser font size
* user text-spacing overrides

Create a text-spacing test that applies values equivalent to WCAG text-spacing expectations:

* line height at least 1.5 times font size
* paragraph spacing at least 2 times font size
* letter spacing at least 0.12 times font size
* word spacing at least 0.16 times font size

Check:

* no loss of content
* no overlapping content
* no clipped text
* controls remain operable
* navigation remains usable
* text is not truncated without access to the full value
* no unnecessary two-dimensional scrolling
* horizontal scrolling only where genuinely required by content
* fixed and absolute-positioned decorative elements do not obscure content
* headings and paragraphs continue to wrap naturally
* CMS content cannot break layouts with long words, links or headings

Capture screenshots of confirmed reflow failures.

# Phase 7 — Colour and visual presentation

Audit:

* text contrast
* large-text contrast
* interactive-control contrast
* focus-indicator contrast
* icon and graphical-object contrast
* placeholder contrast where placeholders convey information
* link identification without reliance on colour alone
* hover, focus, active, disabled, selected and error states
* text placed over photographs
* gradients
* translucent surfaces
* coloured cards
* decorative backgrounds
* light and dark modes
* forced-colour mode where applicable

Axe cannot reliably determine all contrast involving:

* gradients
* background images
* transparency
* overlapping elements
* pseudo-elements
* text over photography
* animation

Mark these for manual verification and calculate representative colour combinations where possible.

Do not “fix” contrast by making arbitrary colour substitutions. Use the existing design-token system and preserve the intended visual hierarchy.

# Phase 8 — Images, SVGs and media

Inspect all image-rendering components and Sanity image fields.

Classify images as:

* informative
* functional
* decorative
* complex
* text-containing
* linked

Check:

* informative images have meaningful contextual alt text
* decorative images use empty alt text
* decorative CSS backgrounds are not exposed unnecessarily
* functional images describe the action or destination
* alt text does not redundantly begin with “image of”
* nearby captions are not unnecessarily duplicated
* SVG icons are exposed or hidden appropriately
* inline SVGs do not create duplicate accessible names
* logos have appropriate names
* complex diagrams have an adequate text alternative
* text is not embedded in images when real text could be used
* width and height or equivalent aspect-ratio handling prevents disruptive layout shifts

Do not judge alt text based only on length. Judge whether it communicates the image’s purpose in context.

For Sanity, inspect and improve the authoring model where necessary:

* provide an alt-text field for informative images
* provide an explicit decorative-image option
* require alt text when an image is informative
* allow empty alt text only when explicitly marked decorative
* add useful editor descriptions and validation messages
* ensure Portable Text images support equivalent metadata
* do not rely on AI-generated alt text without human review
* prevent publication where required accessibility metadata is missing

Document existing content that violates the new schema expectations. Do not silently invent alt text for images whose purpose cannot be determined from the repository.

# Phase 9 — Forms

Inspect every form and every state.

Check:

* visible labels
* programmatic labels
* appropriate input types
* `autocomplete` tokens
* required-field communication
* instructions provided before interaction
* field groups use `fieldset` and `legend` where appropriate
* error identification
* useful error wording
* error association with fields
* error summary where appropriate
* focus movement after failed submission
* preservation of entered data
* status messages announced without disruptive focus changes
* success messages communicated
* colour is not the only error indicator
* placeholders are not used as labels
* form controls have adequate target size
* consent controls are clear
* privacy links are accessible
* time limits, CAPTCHAs or authentication barriers if present

Use safe mocks or route interception for submission testing. Do not send test enquiries to real recipients.

# Phase 10 — Motion, animation and timing

Inventory:

* entrance animations
* scrolling animations
* looping decorations
* parallax
* auto-rotating content
* carousels
* animated menus
* hover animation
* video
* flashing or rapidly changing content

Check:

* `prefers-reduced-motion`
* essential versus decorative movement
* ability to pause moving content where required
* no unexpected automatic focus changes
* no content flashing at unsafe frequencies
* animation does not prevent operation
* hidden animated elements do not remain in the accessibility tree
* transitions do not delay keyboard access
* motion does not communicate information without another equivalent method

Reduced motion should meaningfully reduce or remove non-essential movement, not merely make every animation slightly faster.

# Phase 11 — Touch and pointer accessibility

Test:

* touch target size
* spacing between nearby targets
* mobile navigation controls
* small icon buttons
* carousel controls
* footer and social links
* map or location links
* form controls
* no functionality available only through hover
* no functionality requiring complex gestures without an alternative
* dragging alternatives where dragging exists
* pointer cancellation
* accidental activation risk
* visible labels match accessible names for speech-input compatibility

Because automated target-size detection can require manual interpretation, manually verify exceptions and inline-link behaviour before recording a confirmed failure.

# Phase 12 — Content and cognitive usability

Review representative content for:

* descriptive headings
* clear instructions
* consistent navigation
* consistent labels
* understandable error messages
* excessive blocks of dense text
* ambiguous calls to action
* unexplained abbreviations
* links that make sense in context
* repeated information that users must re-enter
* help information appearing consistently
* predictable component behaviour
* no unexpected context changes on focus or input
* contact details presented as usable text
* addresses and opening information understandable to screen-reader users

Do not rewrite the organisation’s content unnecessarily. Record content recommendations separately from strict WCAG failures.

# Phase 13 — Sanity CMS accessibility governance

Audit the Sanity schemas and Studio authoring experience.

Determine whether non-technical editors can accidentally publish:

* images without accessibility metadata
* invalid heading structures
* empty links
* links with meaningless labels
* text styled as headings
* headings selected only for visual size
* missing page titles
* missing language information
* uncaptioned media
* inaccessible embedded content
* extremely long headings
* empty Portable Text blocks
* raw HTML
* colour-only information

Where appropriate, implement or propose:

* schema validation
* field descriptions
* constrained heading choices
* separate semantic level and visual-style handling only where necessary
* required alt-text logic
* decorative-image switches
* link-label validation
* warnings for generic labels such as “click here”
* preview configuration exposing missing accessibility metadata
* document-level validation summaries
* an editor accessibility checklist

Keep the authoring workflow simple. Editors should not need to understand HTML, GitHub, builds or WCAG criterion numbers.

# Phase 14 — Screen-reader test scripts

Create detailed human test scripts for:

## macOS

* VoiceOver with Safari

## iPhone

* VoiceOver with Safari

## Windows

* NVDA with Chrome
* NVDA with Firefox where practical

Each script must be task-based rather than merely instructing the tester to read every element.

Include tasks such as:

* identify the website and page purpose
* skip repeated navigation
* understand the heading structure
* open and close the main menu
* identify the current page
* navigate to About Us
* locate contact information
* complete and submit the contact form
* identify and correct a form error
* navigate a blog listing
* open and read an article
* identify meaningful images
* return to the previous page
* operate any custom widget

For each task include:

* starting state
* exact interaction
* expected announcement or behaviour
* failure indicators
* space for tester notes
* browser and assistive-technology version

Do not fabricate screen-reader results. Mark them as pending human verification unless they were genuinely executed in an environment capable of producing reliable results.

# Phase 15 — Findings and severity model

Every confirmed issue must have a unique ID.

Use a consistent structure:

* ID
* title
* status
* severity
* priority
* confidence
* page or component
* affected routes
* affected users
* WCAG 2.2 success criterion
* conformance level
* automated or manual
* browser and viewport
* assistive technology where applicable
* observed behaviour
* expected behaviour
* reproduction steps
* evidence
* relevant source files
* root cause
* recommended remediation
* regression-test recommendation
* retest result

Use severity based on user impact:

## Critical

A primary task is impossible for a significant group of disabled users, with no reasonable workaround.

## Serious

A major task or important content is substantially blocked or very difficult.

## Moderate

The issue creates meaningful difficulty but a reasonable workaround exists.

## Minor

The issue causes limited friction, inconsistency or a lower-impact best-practice concern.

Do not mechanically copy axe’s impact value as the final audit severity. Consider actual website context and affected tasks.

Group repeated instances under a shared root cause.

For example, if the shared button component has an inaccessible focus style across twelve pages, report one component-level issue and list all affected routes.

# Phase 16 — Required deliverables

Create:

## `docs/accessibility/AUDIT-SCOPE.md`

Include:

* target standard
* conformance level
* project scope
* included routes
* excluded routes
* representative sample reasoning
* technologies relied upon
* browsers
* viewports
* assistive technologies
* audit limitations
* date of evaluation

## `docs/accessibility/ROUTE-INVENTORY.md`

Include:

* all discovered routes
* page type
* interactive states
* test coverage
* audit status

## `docs/accessibility/AUTOMATED-RESULTS.md`

Include:

* commands executed
* browser coverage
* route coverage
* axe configuration
* rule tags
* failures
* incomplete results requiring review
* best-practice results
* false-positive decisions
* artifact locations

## `docs/accessibility/MANUAL-TEST-PLAN.md`

Include:

* keyboard tests
* zoom tests
* reflow tests
* text-spacing tests
* colour tests
* reduced-motion tests
* forced-colour tests
* orientation tests
* touch tests
* cognitive-content checks

## `docs/accessibility/SCREEN-READER-TESTS.md`

Include task-based VoiceOver and NVDA scripts.

## `docs/accessibility/SANITY-AUTHORING-AUDIT.md`

Include:

* current schema risks
* validation gaps
* recommended or implemented safeguards
* editor instructions
* content requiring remediation

## `docs/accessibility/FINDINGS.md`

Human-readable detailed findings.

## `docs/accessibility/FINDINGS.csv`

Use columns suitable for issue tracking:

* ID
* Severity
* Priority
* Status
* Title
* Component
* Routes
* WCAG
* Level
* Method
* Owner
* Source files
* Summary
* Remediation
* Retest status

## `docs/accessibility/EXECUTIVE-SUMMARY.md`

Include:

* overall accessibility posture
* number of findings by severity
* highest-risk user journeys
* strongest aspects
* systemic problems
* immediate priorities
* medium-term improvements
* testing limitations
* explicit statement that automated results alone do not establish conformance

## `docs/accessibility/REMEDIATION-PLAN.md`

Organise work into:

* immediate blockers
* shared-component fixes
* page-specific fixes
* CMS safeguards
* content-editor work
* regression coverage
* human verification

Do not create an accessibility statement claiming compliance unless the full evaluation supports that claim.

# Phase 17 — Baseline execution

After infrastructure is set up:

1. Build the project.
2. Run the complete automated suite.
3. Run every configured browser project.
4. Record failed and passed routes.
5. Review axe `incomplete` results.
6. Inspect source code for every confirmed issue.
7. Perform all manual checks that the available environment genuinely supports.
8. Create the complete baseline report.
9. Run existing project tests.
10. Run the Astro build again.
11. Check for obvious performance or visual regressions caused by the testing setup.

At this stage, do not broadly fix the site yet.

Present:

* files added
* files modified
* dependencies added
* commands executed
* tests passed
* tests failed
* confirmed issues
* likely issues requiring human verification
* audit limitations
* recommended remediation order

Then stop for human review.

# Human checkpoint 1 — Baseline approval

Ask the human to verify:

* route inventory
* audit scope
* important user journeys
* excluded pages
* severity assignments
* screenshots of visual findings
* manual keyboard observations
* whether any CMS-only preview pages must be included

Do not begin broad remediation until the baseline has been reviewed.

# Phase 18 — Remediation after approval

After baseline approval:

1. Fix critical issues first.
2. Fix serious shared-component issues.
3. Add a regression test for each fix where practical.
4. Run targeted tests immediately after each fix.
5. Run all existing tests after each logical group.
6. Rebuild the Astro project.
7. Check desktop and mobile rendering.
8. Preserve visual intent.
9. Avoid unrelated refactoring.
10. Update finding status and retest evidence.

Use small, reviewable changes.

For every fix report:

* finding ID
* root cause
* files changed
* implementation summary
* test added
* test command
* result
* remaining manual verification

# Human checkpoint 2 — Visual and interaction review

Ask the human to verify:

* focus appearance
* mobile menu behaviour
* colour changes
* spacing changes
* text wrapping
* animations
* touch-target changes
* form error presentation

Provide exact pages, viewport sizes and steps.

# Phase 19 — Final regression audit

After approved remediation:

* rerun all accessibility tests
* rerun all existing tests
* rerun the production build
* rerun browser coverage
* rerun mobile coverage
* rerun interactive states
* rerun reduced-motion tests
* rerun text-spacing and reflow tests
* update all findings
* record unresolved manual checks
* compare baseline and final counts

The final report must distinguish:

* fixed and verified
* fixed but awaiting human verification
* accepted limitation
* false positive with evidence
* unresolved
* out of scope

Do not report “zero accessibility issues” unless every applicable automated and manual requirement has genuinely been evaluated.

# CI integration

After the baseline suite is stable, add or update CI so accessibility regression tests run on pull requests.

The CI should:

* use the repository’s package manager
* install dependencies from the lockfile
* install required Playwright browsers
* build the Astro site
* run the accessibility suite
* upload the Playwright HTML report
* upload screenshots and traces when tests fail
* avoid exposing secrets
* use documented Sanity environment variables
* not run destructive form submissions
* fail for newly introduced confirmed accessibility violations

Do not make existing known violations invisible.

When temporary baseline handling is unavoidable:

* record each known issue explicitly
* use narrow matching
* include an issue ID
* include an expiry or remediation condition
* prevent new instances from being added

# Completion criteria

The task is complete only when:

* the repository has deterministic accessibility tests
* representative routes and states are covered
* WCAG 2.2 A and AA are the stated target
* automated results are documented
* manual checks are documented
* screen-reader scripts exist
* Sanity authoring risks are evaluated
* findings are mapped to exact success criteria
* root causes are identified
* test evidence exists
* CI regression protection exists or its omission is explicitly explained
* the project builds successfully
* existing tests still pass
* unresolved human checks are clearly listed
* no unsupported conformance claim is made

Begin with Phase 0 repository discovery.
