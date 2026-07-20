# Accessibility Remediation Plan

This document outlines the remediation scope and details the specific design and code adjustments executed to achieve WCAG 2.2 AA compliance across all public routes of the **Little Wise Kids** website.

## Remediation Scope (REM-1 through REM-6)

### REM-1: Colour-Contrast Compliance
All foreground-to-background combinations for text elements have been adjusted to meet mathematically compliant WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text). 

#### Selector-Level Before/After Contrast Ratio Table
The table below logs the exact measured contrast ratios before and after the remediation:

| Selector / Element | Placement | Foreground | Background | Before Ratio | After Ratio | Status |
| --- | --- | --- | --- | --- | --- | --- |
| **Parents green badges** | `.parents-card--green .parents-card__number` | `#2b6a1f` | `#f3fcef` | 3.48:1 | **6.27:1** | Pass |
| **Parents blue badges** | `.parents-card--blue .parents-card__number` | `#0c6190` | `#effaff` | 3.81:1 | **6.32:1** | Pass |
| **Parents blue strong** | `.parents-card--blue .parents-calculation strong` | `#0c6190` | `#ffffff` | 4.04:1 | **6.71:1** | Pass |
| **Tax-Free label** | `.parents-card--green .parents-resource__label` | `#2b6a1f` | `#f3fcef` | 3.52:1 | **6.27:1** | Pass |
| **Tax-Free link** | `.parents-card--green .parents-resource a` | `#2b6a1f` | `#ffffff` | 3.65:1 | **6.59:1** | Pass |
| **Hours green badges** | `.hours-card--green .hours-card__number` | `#2b6a1f` | `#f3fcef` | 3.48:1 | **6.27:1** | Pass |
| **Hours note link** | `.hours-card--green .hours-card__note-link` | `#ffffff` | `#2b6a1f` | 3.65:1 | **6.59:1** | Pass |
| **Blog yellow category** | `.blog-card--yellow .blog-card__category` | `#7c6f42` | `#fff6d9` | 2.71:1 | **4.62:1** | Pass |
| **Blog yellow read link** | `.blog-card--yellow .blog-card__read` | `#7c6f42` | `#ffffff` | 2.88:1 | **4.99:1** | Pass |

### REM-2: Brand Link Accessible Name
- **Issue**: Duplicated brand-link accessible name.
- **Fix**: Adjusted `SiteHeader.astro` to use exactly one accessible-name source by setting the semantic `alt` attribute on the logo `<Image>` and removing `aria-label` from the wrapping link.

### REM-3: Mobile Menu Keyboard Accessibility
- **Issue**: Mobile menu was not closeable via the Escape key and focus was not restored.
- **Fix**: Added keyboard event listeners in `SiteHeader.ts` to close the expanded mobile menu details container when the `Escape` key is pressed and return focus back to the menu toggle summary.

### REM-4: Skip Link Focus Target
- **Issue**: The skip link did not focus the main container reliably across all browsers.
- **Fix**: Targeted `#main-content` and added `tabindex="-1"` to `<main>` in `BaseLayout.astro` to ensure programmatic focus is received correctly.

### REM-5: SubpageHero Landmark Signalling
- **Issue**: SubpageHero components used an unsupported `aria-labelledby` pattern.
- **Fix**: Removed the unsupported attributes and structured the title and subtitles using native HTML header landmarks.

### REM-6: Keyboard Access to Scrollable Fees Table
- **Issue**: Users could not scroll the horizontal fees table using the keyboard.
- **Fix**: Added `tabindex="0"` and appropriate focus styles to the scrollable table wrapper, allowing keyboard arrow keys to scroll the table horizontally.
