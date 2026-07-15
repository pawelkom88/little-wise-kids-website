# Content Inventory & Sanity Architecture Proposal

## 1. Executive Summary

Little Wise Kids is an Astro 5 application with heavily hardcoded editorial content in `.astro` files and local TypeScript data files (`src/data/site.ts`, `src/data/blog.ts`). The goal of this phase is to extract all editorial content into a Sanity CMS, providing a safe, constrained editing experience for non-technical users while preserving the exact layout, design tokens, and components of the existing Astro site.

## 2. Content Inventory Analysis

After an exhaustive audit of `src/pages/`, `src/components/`, and `src/data/`, we have identified the following categories of content:

### 2.1 Global Site Settings (Business Facts)
Currently housed in `src/data/site.ts`.
- **Contact Details**: Email, Phone numbers (Primary, Out of hours)
- **Location**: Address (Line 1, Line 2, City, Postcode, Google Maps link)
- **Opening Hours**: Days, Full day, Half day (morning)
- **Brand Info**: Site Name, Tagline, Age Range, Languages offered
- **Social Media**: Facebook, Instagram links
- **Navigation**: Main menu items (label, href, icon, tone), Legal links (Privacy, Terms)

### 2.2 Singleton Pages (Fixed Layouts)
These are pages with a fixed structural layout but dynamic text content.
- **Home (`index.astro`)**: Hero section, values introduction, gallery preview, testimonial, contact CTA.
- **About Us (`about-us.astro`)**: Our Story, Our Team (profiles), Our Philosophy.
- **Multilingual Learning (`multilingual-learning.astro`)**: Learning Philosophy, Language through connection (English & Portuguese), EYFS areas, Screen-Free learning benefits.
- **Hours & Nutrition (`hours-nutrition.astro`)**: Available Sessions, Minimum Attendance, Nutrition info, Typical Day schedule.
- **Parents' Information (`parents-information.astro`)**: Fees & Funding, Settling In, Policies.
- **Contact (`contact.astro`)**: Hero text, Next steps.
- **404 (`404.astro`) & Thank You (`thank-you.astro`)**: Simple message and CTA.

### 2.3 Collections (Repeating Structured Content)
- **Blog Posts**: Currently in `src/data/blog.ts` (title, slug, excerpt, content, category, author, date, read time).
- **Gallery Images**: Currently hardcoded in `GallerySection.ts` (id, src, alt, width, height, isPortrait).
- **FAQs**: Currently hardcoded in `FaqSection.astro`.
- **Policies**: Downloadable PDF policies in `parents-information.astro`.
- **Testimonials/Reviews**: Hardcoded quotes across various pages (e.g., Home, VisitSection).
- **Team Members**: Hardcoded in `about-us.astro`.

## 3. Proposed Sanity Schema Architecture

To adhere to the principle of "constrained editorial system," we will strictly avoid a generic page-builder approach (e.g., `page.sections[]`). Instead, each page and collection will have explicit, strongly-typed schemas matching the Astro components exactly.

### 3.1 Singletons (Document Types)
- `siteSettings`: Global settings, contact info, navigation, social links.
- `homePage`: SEO fields, Hero copy (title, subtitle, paragraph), Values Intro copy.
- `aboutPage`: SEO fields, Hero copy, Story section, Philosophy section.
- `multilingualPage`: SEO fields, Hero copy, Philosophy card, EYFS intro, Screen-free copy.
- `hoursNutritionPage`: SEO fields, Hero copy, Sessions intro, Nutrition intro, Typical day items.
- `parentsInfoPage`: SEO fields, Hero copy, Fees copy, Settling in copy.
- `contactPage`: SEO fields, Hero copy.

### 3.2 Collections (Document Types)
- `post`: Blog post with Portable Text for rich content.
- `category`: Blog categories.
- `author`: Blog authors.
- `galleryImage`: For the gallery page and carousel.
- `faq`: Frequently Asked Questions.
- `teamMember`: For the About Us page.
- `policy`: Downloadable policies/documents.
- `testimonial`: Parent reviews and quotes.

### 3.3 Core Strategy
- **No Page Builders**: Editors fill out predefined fields (e.g., `heroSubtitle`, `aboutStoryText`). Astro handles the layout and applies the correct design tokens (e.g., alternating tones like `purple`, `green`, `blue`).
- **Portable Text constraints**: Restrict Portable Text to simple styling (strong, em, link, lists) to prevent editors from breaking layouts.
- **Token preservation**: Design tokens like `tone="purple"` will remain in Astro. Editors provide the content; developers provide the layout and colour strategy.

## 4. Next Steps
1. **Schema Development**: Create Sanity schemas in `sanity.config.ts` (currently empty).
2. **Data Migration**: Copy existing hardcoded text into Sanity Studio.
3. **Astro Integration**: Fetch data from Sanity via `sanity-astro` in each `.astro` page, replacing the hardcoded data.
4. **Editorial Review**: Ensure the Studio UX is intuitive and constraints work as expected.
