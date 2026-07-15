# Little Wise Kids — Ready-to-Implement SEO Strategy and AI Agent Specification

## Document status

**Purpose:** Final SEO strategy and implementation brief  
**Project:** Little Wise Kids Astro + Sanity website  
**Production domain:** `https://littlewisekids.co.uk`  
**Language:** British English  
**Hosting:** Cloudflare  
**Rendering:** Astro static output  
**CMS:** Sanity

This is not a discovery prompt.
The AI agent must implement this strategy rather than restart broad SEO research.

The agent may stop only where an unresolved business fact is explicitly marked **OWNER VERIFICATION REQUIRED**.

---

# 0. Platform replacement rule

This project is a complete replacement of the old WordPress website.

```text
Old platform: WordPress — deleted after cutover
New platform: Astro + Sanity (cli available) — sole production website - hosted on Cloudflare Pages (cli available)
Domain: unchanged
Content source after launch: Sanity and code-owned Astro configuration only
Raw content can be found in /Users/paw/WebstormProjects/little-wise-kids/assets/content/Little_Wise_Kids_Website_Content_Brief_Revised.pdf
```
---

# 1. Executive strategy

## Primary SEO objective

Position Little Wise Kids as a distinctive, trustworthy early-years childcare option for families searching in and around:

```text
Easton
Bristol BS5
Stapleton Road
East Bristol
```

The site should compete primarily for local childcare enquiries and secondarily for differentiated demand around:

```text
English and Portuguese language exposure
screen-free early years
child-led play
small/home-from-home childcare
funded childcare
home-cooked meals - this is crucial differentiator ( I will have photos) 
```

## Strategic priorities

In order:

1. **Correct the local entity and business facts**
2. **Target local childcare intent on the Home page**
3. **Use specialist pages for multilingual and funding intent**
4. **Implement complete metadata, canonicals and structured data**
5. **Generate a correct sitemap from Astro and Sanity** - u can use astro package for that - https://docs.astro.build/en/guides/integrations-guide/sitemap/
6**Measure enquiries, not rankings alone**

## Explicit non-goals

Do not:

- change current new routes merely to insert keywords;
- create neighbourhood doorway pages;
- describe the service inaccurately as a nursery;
- repeat exact keywords unnaturally;
- add FAQ structured data expecting rich results;
- add an “AI context” schema block;
- treat `llms.txt` as a ranking requirement;
- fabricate reviews, credentials, service areas or search volumes;
- expose technical SEO fields to non-technical Sanity editors.

---

# 2. New-site source of truth

The WordPress website will be deleted.

The only asset that remains is:

```text
https://littlewisekids.co.uk
```

The new Astro + Sanity website is the sole future source of truth for:

```text
business facts
page content
images
Blog content
policies
metadata
structured data
routes
sitemap
robots rules
internal links
```

Do not migrate, preserve, synchronise or copy the old WordPress content unless the owner explicitly identifies a specific fact or asset to retain.

The old WordPress website may be inspected only for:

```text
historical public URLs;
existing backlinks;
previously indexed pages;
redirect requirements;
legacy citations that need updating.
```

Old WordPress copy must not override the verified facts in the new Sanity Business Details document.

The domain remains unchanged, so this is a same-domain platform replacement rather than a domain migration.

## OWNER VERIFICATION REQUIRED before production deployment

Verify the new Astro/Sanity business facts independently. Do not compare them against the deleted WordPress copy as though the old copy were authoritative.

Confirm one final canonical value for every item:

```text
Public trading name
Legal company name
Ofsted registration type
Ofsted URN
Exact official Ofsted record URL
Exact full address
Correct address punctuation
Public short location
Primary telephone number
Secondary telephone number
Public email
Opening days
Opening hours
Session boundaries
Weeks open each year
Accepted age range
Current languages
Whether Spanish is still offered
Current funded-childcare participation
Tax-Free Childcare participation
Current fee figures
Current availability message
Facebook URL
Instagram URL
Google Maps URL
Latitude
Longitude
Primary Google Business Profile category
Whether “nursery” may be used as a comparison term
```

Do not publish structured data or metadata using unverified values.

---

# 3. Service terminology decision

## Primary term

Use:

```text
childcare
early years childcare
early years setting
childcare setting
```

## Registration language

Where trust and legal clarity matter, use:

```text
Ofsted-registered Childminder without Domestic Premises
```

only after verification.

## “Nursery” usage

Do not present Little Wise Kids as a nursery unless the owner confirms that this public wording is legally and operationally appropriate.

Parents may still search for “nursery”.

Capture that intent with a visible clarification such as:

### Suggested FAQ

**Is Little Wise Kids a nursery or childminder?**

> Little Wise Kids is registered with Ofsted as a Childminder without Domestic Premises. This means we provide early-years childcare from a dedicated non-domestic setting, with the personal feel of a smaller childcare environment.

Use the exact verified registration language.

Remove casual “nursery” wording from page titles, meta descriptions and transactional copy where it inaccurately describes the service.

---

# 4. Final URL strategy

## Decision

**Keep the current new Astro routes.**

Do not rename them to the keyword-heavy routes proposed in the old SEO PDF.

Approved canonical routes:

```text
/
 /about-us
 /multilingual-learning
 /parents-information
 /hours-nutrition
 /our-gallery
 /contact
 /blog
 /blog/[slug]
```

Utility routes:

```text
/thank-you       noindex
/404             noindex and HTTP 404
```

## Why

The current routes are:

- concise;
- understandable;
- stable;
- aligned with the actual information architecture;
- easier to maintain;
- not materially worse for Google than keyword-expanded alternatives.

Google uses URLs primarily to help users and systems understand page organisation. A keyword-heavy slug is not a shortcut to rankings.

## Canonical trailing-slash policy

Set a single policy in Astro:

```text
trailingSlash: "never"
```

All:

- navigation links;
- canonicals;
- sitemap URLs;
- JSON-LD URLs;
- internal links;
- redirects

must use the no-trailing-slash version, except `/`.

---

# 5. Mandatory legacy URL redirects

The WordPress application and its content will be removed, but the domain will remain.

Old WordPress URLs may still exist in:

```text
Google's index
browser history
external backlinks
social posts
directory listings
old emails
analytics records
```

Therefore, preserve only their accumulated URL signals through direct redirects to the most relevant new Astro routes.

Create:

```text
public/_redirects
```

for Cloudflare Pages.

Use direct permanent redirects:

```text
/our-curriculum/ /multilingual-learning 301
/our-curriculum /multilingual-learning 301

/multilingual-benefits/ /multilingual-learning 301
/multilingual-benefits /multilingual-learning 301

/eyfs/ /multilingual-learning 301
/eyfs /multilingual-learning 301

/parents-info/ /parents-information 301
/parents-info /parents-information 301

/contact-us/ /contact 301
/contact-us /contact 301

/about-us/ /about-us 301
```

Before replacing WordPress, export or record:

```text
the old XML sitemap;
Search Console indexed-page data;
analytics landing pages;
known backlinks;
all current public WordPress routes.
```

Add any additional historically indexed paths to the redirect map.

This is not content migration. It is URL preservation.

Do not redirect every unknown URL to the Home page.

Unknown removed URLs should return a useful 404 unless there is a genuine equivalent.

---

# 6. Final keyword and intent map

There is no verified Keyword Planner or Search Console volume data in the supplied material.

The priorities below are based on:

- local commercial intent;
- service relevance;
- differentiation;
- current page architecture;
- likely parent language;
- current official childcare terminology.

Do not report invented search volumes.

## Home

### Primary intent

```text
Find childcare in Easton / Bristol BS5
```

### Primary query themes

```text
childcare Easton Bristol
childcare Bristol BS5
early years childcare Easton
childcare setting Easton Bristol
```

### Secondary query themes

```text
childminder Easton Bristol
Ofsted registered childcare Bristol
childcare Stapleton Road
childcare East Bristol
screen-free childcare Bristol
bilingual childcare Bristol
```

### Page role

The Home page is the main local commercial landing page.

Do not make the Home page target every specialist query.

---

## About Us

### Primary intent

```text
Evaluate the people, registration, approach and trustworthiness
```

### Query themes

```text
child-led childcare Bristol
home-from-home childcare Easton
small childcare setting Bristol
Ofsted registered childminder Easton
calm childcare setting Bristol
```

### Page role

Trust, experience, leadership, registration and pedagogical approach.

---

## Multilingual Learning

### Primary intent

```text
Find Portuguese and English early-years childcare in Bristol
```

### Query themes

```text
Portuguese childcare Bristol
English Portuguese childcare Bristol
multilingual childcare Bristol
bilingual childcare Bristol
Portuguese early years Bristol
screen-free childcare Bristol
```

### Language rule

Use “Portuguese and English language exposure” unless formal bilingual education is genuinely delivered.

Do not make unsupported claims that early bilingual exposure:

- changes brain structure;
- prevents dementia;
- guarantees academic success;
- makes children more intelligent.

Explain the actual practice:

```text
songs
stories
play
daily routines
conversation
cultural experiences
```

---

## Parents’ Information

### Primary intent

```text
Understand funding, fees, practical policies and settling in
```

### Query themes

```text
funded childcare Bristol
free childcare working parents Bristol
childcare fees Bristol BS5
Tax-Free Childcare Bristol
childcare funding Easton Bristol
30 hours childcare Bristol
childcare settling in
```

### Current funding terminology

Current GOV.UK guidance states that eligible working parents in England may receive 30 hours of childcare a week for children aged 9 months to 4 years.

Separate that from:

```text
15 hours for all 3-to-4-year-olds;
support-based 2-year-old entitlement;
Tax-Free Childcare;
Universal Credit childcare support.
```

Only describe schemes that are relevant to the setting.

Funding content must display:

```text
Last reviewed: [date]
```

and link to current GOV.UK guidance.

---

## Hours & Nutrition

### Primary intent

```text
Check whether the setting fits the family’s schedule and food needs
```

### Query themes

```text
childcare opening hours Easton
childcare sessions Bristol BS5
home-cooked meals childcare Bristol
healthy meals childcare Easton
childcare nutrition Bristol
```

---

## Gallery

### Primary intent

```text
Visually evaluate the childcare environment
```

### Query themes

```text
childcare setting Easton photos
childcare Bristol BS5 gallery
indoor outdoor childcare Bristol
early years environment Easton
```

This is a trust page, not a major standalone keyword target.

---

## Contact

### Primary intent

```text
Check availability, arrange a visit or make an enquiry
```

### Query themes

```text
childcare availability Easton
childcare places Bristol BS5
book childcare visit Bristol
register interest childcare Easton
contact childminder Easton
```

---

## Blog

### Primary intent

```text
Answer parent questions and support the commercial pages
```

### Query themes

```text
early years advice Bristol
childcare guidance Bristol
settling into childcare
funded childcare explained
bilingual learning toddlers
screen-free toddler activities
school readiness
```

---

# 7. Final metadata matrix

These values are ready to implement after the business facts are verified.

Use route-specific Open Graph and Twitter values matching the title and description.

## Home

```text
Title:
Childcare in Easton, Bristol BS5 | Little Wise Kids

Meta description:
Little Wise Kids is an Ofsted-registered early years childcare setting in Easton, Bristol BS5, offering screen-free, child-led play, English and Portuguese exposure, and home-cooked meals for children aged 0–4.

Canonical:
https://littlewisekids.co.uk/

OG type:
website
```

If “Ofsted-registered”, language offering or age range is not verified, remove that clause rather than publishing uncertain information.

## About Us

```text
Title:
About Our Child-Led Childcare Setting in Easton | Little Wise Kids

Meta description:
Meet the people and principles behind Little Wise Kids, a calm, home-from-home early years setting in Easton, Bristol, focused on trust, independence and child-led play.

Canonical:
https://littlewisekids.co.uk/about-us

OG type:
website
```

## Multilingual Learning

```text
Title:
Portuguese & English Childcare in Bristol | Little Wise Kids

Meta description:
Discover how Little Wise Kids introduces English and Portuguese through songs, stories, routines and screen-free play within a child-led early years environment.

Canonical:
https://littlewisekids.co.uk/multilingual-learning

OG type:
website
```

## Parents’ Information

```text
Title:
Childcare Funding, Fees & Parent Information | Bristol BS5

Meta description:
Read current information about funded childcare, fees, Tax-Free Childcare, settling in, family partnerships and policies at Little Wise Kids in Easton.

Canonical:
https://littlewisekids.co.uk/parents-information

OG type:
website
```

## Hours & Nutrition

```text
Title:
Childcare Hours & Home-Cooked Meals | Bristol BS5

Meta description:
See Little Wise Kids opening hours, session times, daily rhythm and approach to fresh, home-cooked meals for children in our Easton childcare setting.

Canonical:
https://littlewisekids.co.uk/hours-nutrition

OG type:
website
```

## Gallery

```text
Title:
Inside Our Childcare Setting in Easton | Photo Gallery

Meta description:
Explore real moments of indoor and outdoor play, multilingual learning, creativity, sensory exploration and mealtimes at Little Wise Kids in Bristol BS5.

Canonical:
https://littlewisekids.co.uk/our-gallery

OG type:
website
```

## Contact

```text
Title:
Childcare Availability in Easton | Contact Little Wise Kids

Meta description:
Ask about current childcare availability, arrange a visit or register your interest at Little Wise Kids on Stapleton Road in Easton, Bristol BS5.

Canonical:
https://littlewisekids.co.uk/contact

OG type:
website
```

## Blog hub

```text
Title:
Early Years & Childcare Advice | Little Wise Kids Bristol

Meta description:
Practical guidance for families on settling into childcare, funded hours, Portuguese and English learning, screen-free play, nutrition and school readiness.

Canonical:
https://littlewisekids.co.uk/blog

OG type:
website
```

## Blog article

```text
Title:
{Post title} | Little Wise Kids

Meta description:
Use the Sanity excerpt.

Canonical:
https://littlewisekids.co.uk/blog/{slug}

OG type:
article
```

## Thank-you

```text
Title:
Thank You | Little Wise Kids

Robots:
noindex, nofollow

Canonical:
omit
```

## 404

```text
Title:
Page Not Found | Little Wise Kids

Robots:
noindex, nofollow

Canonical:
omit

HTTP status:
404
```

---

# 8. Page-copy changes required for search strategy

Do not redesign the pages.

Make small, deliberate content additions using existing sections or compact new trust blocks.

## Home

Ensure the rendered first screen or first content section contains:

```text
childcare
Easton
Bristol BS5
```

Suggested short descriptor:

> Screen-free, child-led childcare in Easton, Bristol BS5.

Add a compact, visible facts row:

```text
Age range
Opening hours
Languages
Ofsted registration
```

Add a clear location sentence:

> Our dedicated early years setting is on Stapleton Road in Easton, within easy reach of Lawrence Hill and Bristol city centre.

Use only if geographically accurate.

## About Us

Add or clearly surface:

```text
Leader’s name and role
Relevant experience
Qualifications if verified
Ofsted registration type
Ofsted URN
Direct link to official Ofsted record
What CWDP means
Why the setting is intentionally small
```

Suggested trust subsection:

```text
Registered and accountable
```

Do not display a generic Ofsted logo without a working official record link.

## Multilingual Learning

Make the difference between exposure and formal teaching explicit.

Cover:

```text
how English and Portuguese appear in the day;
whether parents need to speak Portuguese;
how home languages are respected;
how songs, stories and play are used;
how the approach fits the EYFS;
how screen-free experiences support interaction.
```

Suggested visible questions:

```text
Does my child need to speak Portuguese?
Will learning two languages confuse my child?
How is Portuguese used during a normal day?
Do you support children who speak another home language?
```

Do not add FAQ structured data for Google.

## Parents’ Information

This page should become the strongest practical conversion-support page.

Required visible content:

```text
current funded-childcare wording;
exact provider participation;
how funded hours are delivered;
what is and is not included;
minimum attendance;
fee examples;
Tax-Free Childcare;
settling-in approach;
deposit and notice information if relevant;
links to policies;
last reviewed date;
GOV.UK links;
contact CTA.
```

Do not call funded childcare “free” without explaining that extras or additional hours may still cost money, where applicable.

## Hours & Nutrition

Add or verify:

```text
opening days and exact hours;
morning and afternoon session structure;
weeks open;
bank-holiday closure;
meal approach;
sample meal or menu approach;
allergy and dietary communication;
water/snack approach;
who prepares food, only if verified.
```

## Gallery

Each photo must have:

```text
real asset;
descriptive alt text or decorative status;
optional public caption;
correct consent;
width and height;
optimised source.
```

Do not place location keywords into every alt description.

## Contact

Ensure the page visibly contains:

```text
full NAP;
map link;
current availability message;
visit/enquiry CTA;
expected response time, if known;
public transport/parking/access information, if true;
Ofsted link;
service age range;
opening hours.
```

---

# 9. Content strategy

## Publishing strategy

Do not publish large batches of generic AI articles.

Recommended cadence:

```text
Launch:
4 high-quality evergreen articles

Then:
1 genuinely useful article per month

Review:
quarterly
```

Update funding articles whenever rules change.

## Priority launch articles

### 1. How to Choose a Childcare Setting in Bristol: Questions to Ask on a Visit

Primary intent:

```text
how to choose childcare Bristol
questions to ask childcare provider
```

Links to:

```text
/about-us
/our-gallery
/contact
```

Required original contribution:

```text
what Little Wise Kids encourages parents to observe;
what a visit looks like;
questions about routines, communication and settling in.
```

### 2. What to Expect During a Gentle Childcare Settling-In Period

Primary intent:

```text
settling into childcare
childcare settling in tips
```

Links to:

```text
/parents-information
/about-us
/contact
```

### 3. Free Childcare for Working Parents: A Guide for Bristol Families

Primary intent:

```text
funded childcare Bristol
30 hours childcare Bristol
```

Links to:

```text
/parents-information
/contact
```

Requirements:

```text
GOV.UK source links
last reviewed date
eligibility disclaimer
Little Wise Kids-specific participation details
```

### 4. How Portuguese and English Fit Naturally Into Early Years Play

Primary intent:

```text
Portuguese childcare Bristol
bilingual childcare Bristol
```

Links to:

```text
/multilingual-learning
/contact
```

## Second-priority articles

```text
Will Learning Two Languages Confuse My Toddler?
10 Screen-Free Activities for Toddlers Using Everyday Objects
Why Child-Led Play Matters in the EYFS
A Typical Day at Little Wise Kids in Easton
Tax-Free Childcare Explained: How the Government Top-Up Works
Home-Cooked Meals in Childcare: Our Approach to Food and Routine
Helping Your Child Build Independence Before School
Why Indoor and Outdoor Learning Both Matter
```

## Article quality template

Every Blog article must include:

```text
one clear parent question;
a direct answer near the beginning;
first-hand Little Wise Kids experience;
specific examples;
accurate sources where needed;
visible author or reviewer;
published date;
modified/reviewed date;
links to relevant service pages;
a relevant enquiry CTA;
no filler conclusion.
```

## Existing seven Blog posts

Before importing or publishing the seven planned posts:

1. audit each topic;
2. assign it to a content cluster;
3. remove duplicate intent;
4. update old funding claims;
5. add first-hand detail;
6. add internal links;
7. add author/reviewer;
8. confirm image rights and alt text.

Do not publish seven thin placeholders simply to create routes.

---

# 10. Internal-link strategy

## Home

Link naturally to:

```text
/multilingual-learning
/about-us
/hours-nutrition
/parents-information
/contact
```

## About

Link to:

```text
/our-gallery
/multilingual-learning
/contact
```

## Multilingual

Link to:

```text
/about-us
/blog/[language-related articles]
/contact
```

## Parents

Link to:

```text
/hours-nutrition
/blog/[funding article]
/blog/[settling article]
/contact
```

## Hours & Nutrition

Link to:

```text
/our-gallery
/parents-information
/contact
```

## Blog posts

Each article should link to:

```text
one primary commercial page;
one related article where useful;
contact page when conversion intent is natural.
```

Use descriptive anchor text.

Do not use the same exact-match anchor repeatedly.

---

# 11. Technical implementation architecture

## Files to create

Recommended structure:

```text
src/config/seo.ts
src/components/seo/SeoHead.astro
src/components/seo/JsonLd.astro
src/lib/seo/buildCanonical.ts
src/lib/seo/buildBusinessSchema.ts
src/lib/seo/buildPageSchema.ts
src/lib/seo/buildArticleSchema.ts
src/lib/seo/types.ts
public/robots.txt
public/_redirects
```

Update:

```text
astro.config.mjs
src/layouts/BaseLayout.astro
all route files
Sanity Business Details schema
Blog queries/types
```

## Astro configuration

Set:

```ts
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://littlewisekids.co.uk",
  trailingSlash: "never",
  integrations: [
    sitemap({
      filter: (page) =>
        !page.endsWith("/thank-you") &&
        !page.endsWith("/404"),
    }),
  ],
});
```

Use the project’s actual config format and preserve existing integrations.

The sitemap integration must include statically generated Sanity Blog routes.

Do not add:

```text
priority
changefreq
fake lastmod values
```

## SEO type

```ts
export interface SeoImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  mimeType?: string;
}

export interface SeoConfig {
  title: string;
  description: string;
  canonicalPath: string;
  robots?: string;
  type?: "website" | "article";
  image?: SeoImage;
  publishedTime?: string;
  modifiedTime?: string;
  articleSection?: string;
  schemas?: Record<string, unknown>[];
}
```

## BaseLayout contract

Replace separate loose `title` and `description` props with:

```ts
interface Props {
  seo: SeoConfig;
  businessDetails?: BusinessDetails;
}
```

Construct the absolute canonical from:

```ts
Astro.site
seo.canonicalPath
```

Fail a production build if `Astro.site` is missing.

## Required head output

Every indexable route must emit:

```html
<title>...</title>
<meta name="description" content="..." />
<link rel="canonical" href="..." />

<meta property="og:type" content="website-or-article" />
<meta property="og:site_name" content="Little Wise Kids" />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:url" content="..." />
<meta property="og:image" content="..." />
<meta property="og:image:alt" content="..." />
<meta property="og:image:width" content="..." />
<meta property="og:image:height" content="..." />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="..." />
```

For articles also emit:

```html
<meta property="article:published_time" content="..." />
<meta property="article:modified_time" content="..." />
<meta property="article:section" content="..." />
```

Only emit image dimensions when known.

Use one intentional default social image:

```text
1200 × 630
```

Do not use a photo without the required child-image consent.

## Utility indexing

For Thank-you and 404:

```html
<meta name="robots" content="noindex, nofollow" />
```

Do not include canonicals.

Ensure the deployed 404 route returns HTTP 404.

---

# 12. Sanity business-fact changes

Technical SEO configuration remains code-owned.

Business facts used by visible content and schema should come from one Sanity singleton.

Add these fields to `businessDetails` after owner verification:

```text
legalName
ofstedRegistrationType
ofstedUrn
ofstedRecordUrl
latitude
longitude
approvedAreaServed[]
```

Recommended field behaviour:

```text
latitude: required number
longitude: required number
ofstedUrn: required string
ofstedRecordUrl: required URL
legalName: required string
approvedAreaServed: short unique array
```

Do not add editable:

```text
meta title
meta description
canonical URL
robots directive
schema type
SEO keyword
```

Those remain code-owned in the initial architecture.

Blog title, excerpt, slug and image may drive article metadata because they are normal editorial fields.

---

# 13. Structured-data strategy

## Do not implement

Do not implement:

```text
FAQPage for Google rich results
a duplicate EducationalOrganization “AI context” entity
typicalAgeRange on ChildCare
fake aggregate ratings
third-party review markup
invented prices
invented coordinates
```

## Homepage graph

Emit one JSON-LD graph containing:

```text
WebSite
ChildCare
WebPage
```

### Recommended ChildCare node

```json
{
  "@type": "ChildCare",
  "@id": "https://littlewisekids.co.uk/#childcare",
  "name": "Little Wise Kids",
  "legalName": "[verified legal name]",
  "url": "https://littlewisekids.co.uk/",
  "description": "[accurate visible summary]",
  "logo": {
    "@type": "ImageObject",
    "url": "[absolute logo URL]"
  },
  "image": [
    "[absolute approved setting image URL]"
  ],
  "telephone": "[canonical phone]",
  "email": "[public email]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[verified address lines]",
    "addressLocality": "Easton",
    "addressRegion": "Bristol",
    "postalCode": "BS5 0QZ",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[verified numeric latitude]",
    "longitude": "[verified numeric longitude]"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "https://schema.org/Monday",
        "https://schema.org/Tuesday",
        "https://schema.org/Wednesday",
        "https://schema.org/Thursday",
        "https://schema.org/Friday"
      ],
      "opens": "[HH:MM]",
      "closes": "[HH:MM]"
    }
  ],
  "sameAs": [
    "[verified Facebook]",
    "[verified Instagram]",
    "[verified Ofsted record if appropriate]"
  ],
  "identifier": {
    "@type": "PropertyValue",
    "name": "Ofsted URN",
    "value": "[verified URN]"
  },
  "hasMap": "[verified map URL]",
  "areaServed": [
    {
      "@type": "Place",
      "name": "Easton, Bristol"
    }
  ]
}
```

Do not list distant areas solely for keywords.

## WebSite node

```json
{
  "@type": "WebSite",
  "@id": "https://littlewisekids.co.uk/#website",
  "url": "https://littlewisekids.co.uk/",
  "name": "Little Wise Kids",
  "publisher": {
    "@id": "https://littlewisekids.co.uk/#childcare"
  },
  "inLanguage": "en-GB"
}
```

## WebPage nodes

Use:

```text
WebPage
AboutPage
ContactPage
CollectionPage
```

where accurate.

Connect:

```text
isPartOf → #website
about → #childcare
```

## BlogPosting

Each Blog article must emit:

```text
@type: BlogPosting
headline
description
mainEntityOfPage
url
datePublished
dateModified
image
author
publisher
articleSection
inLanguage
```

## Author requirement

Add a real author or reviewer model before production Blog launch.

Minimum acceptable implementation:

```text
authorName
authorRole
```

or one verified organisation author.

Show the author visibly.

Do not invent qualifications.

## Breadcrumbs

Add visible breadcrumbs to Blog article pages:

```text
Home
Blog
Article title
```

Emit matching `BreadcrumbList`.

Breadcrumbs on every small static page are optional.

---

# 14. Safe JSON-LD component

Create a component that serialises objects rather than inserting hand-written JSON strings.

Example:

```astro
---
interface Props {
  data: Record<string, unknown> | Record<string, unknown>[];
}

const { data } = Astro.props;
const json = JSON.stringify(data).replace(/</g, "\\u003c");
---

<script type="application/ld+json" set:html={json} />
```

Validate the generated rendered HTML.

---

# 15. Robots and sitemap

## `public/robots.txt`

Use:

```text
User-agent: *
Allow: /

Sitemap: https://littlewisekids.co.uk/sitemap-index.xml
```

Use the actual sitemap filename generated by Astro.

If Astro generates `sitemap-0.xml` and `sitemap-index.xml`, reference the index.

Do not add irrelevant WordPress paths.

Do not use robots.txt to protect private files.

## Preview deployments

Cloudflare preview deployments must be protected from indexing.

Prefer:

```text
Cloudflare Access or equivalent authentication
X-Robots-Tag: noindex, nofollow
```

Add HTML noindex as defence in depth.

Do not rely only on preview-domain robots.txt.

## Sitemap acceptance rules

The sitemap must include:

```text
/
 /about-us
 /multilingual-learning
 /parents-information
 /hours-nutrition
 /our-gallery
 /contact
 /blog
 all published, non-future /blog/[slug] routes
```

Exclude:

```text
/thank-you
/404
draft posts
future posts
posts without slugs
redirecting legacy URLs
```

---

# 16. Local SEO implementation

## Google Business Profile

On or immediately before launch:

1. Update the business address.
2. Update the public telephone.
3. Update the website URL.
4. Update opening hours.
5. Add special/bank-holiday hours.
6. Update the description to match the verified service.
7. Confirm the primary category.

Preferred primary category:

```text
Childminder
```

only if available and accurate for the registration.

Do not choose “Child care agency” unless it genuinely describes the business.

8. Add service information.
9. Add real setting photos.
10. Add logo and cover image.
11. Add the visit/enquiry URL.
12. Check the map pin.

The old website currently communicates a different location and service profile, so timing and consistency matter.

## Citation update list

Update the same NAP on:

```text
Ofsted
Google Business Profile
Facebook
Instagram
Bristol City Council / local childcare directory
Bing Places
Apple Business Connect
relevant childcare directories
Companies House where legally required
```

Do not mass-submit to low-quality directories.

## Reviews

Use an ethical review process:

```text
ask real families;
no incentives;
no review gating;
no scripted false statements;
reply to reviews;
never copy GBP reviews into self-serving LocalBusiness review schema.
```

## Local trust section

Display in the Footer or About page:

```text
Ofsted registration type
URN
official record link
address
phone
opening hours
```

Avoid cluttering every page with the same long block.

---

# 17. Content and E-E-A-T requirements

## Leadership

The About page should show:

```text
real name
real role
relevant experience
verified qualifications
approach to childcare
```

## Funding guidance

Show:

```text
author or reviewer
last reviewed date
GOV.UK sources
provider-specific explanation
```

## Blog articles

Show:

```text
author
published date
modified/reviewed date where applicable
sources for factual claims
```

## Original evidence

Prioritise:

```text
real setting photos
real daily routine
real meal examples
real approach explanations
real parent questions
real local travel/access information
real funding process
```

This is more valuable than generic SEO prose.

---

# 18. Analytics and measurement

## Required tools

Set up or verify:

```text
Google Search Console domain property
Bing Webmaster Tools
Google Business Profile access
privacy-compliant analytics
```

## Conversion events

Measure:

```text
successful contact form submission
telephone click
email click
map click
register-interest CTA click
policy download
Blog-to-contact click
```

Do not record personal form content.

## Search Console launch actions

After deployment:

1. Submit the sitemap.
2. Inspect the Home page.
3. Inspect every main commercial page.
4. Inspect two Blog articles.
5. Request indexing where appropriate.
6. Monitor Page indexing.
7. Monitor canonical selections.
8. Monitor query/page performance.

## Review cadence

```text
48–72 hours:
technical deployment check

2 weeks:
indexation and canonical review

4–6 weeks:
initial query and click review

monthly:
content and enquiry review

quarterly:
strategy and funding-content review
```

---

# 19. Implementation phases for the AI agent

## Phase 1 — Fact and replacement guardrail

Before code changes:

- produce one short `OWNER_FACT_VERIFICATION.md`;
- verify the new site's business facts without treating WordPress as authoritative;
- request only unresolved owner confirmations;
- inspect the complete Astro/Sanity repository root;
- inspect current Astro config and public files;
- inspect current Cloudflare deployment configuration;
- capture the legacy WordPress URL list before deletion;
- create the one-hop redirect map.

Do not migrate WordPress content.
Do not restart keyword research.

## Phase 2 — Technical SEO foundation

Implement:

```text
Astro site URL
trailing-slash policy
sitemap integration
SEO types
SeoHead
JsonLd
BaseLayout SEO contract
canonical generation
OG/Twitter
robots directives
default social image
robots.txt
legacy redirects
```

## Phase 3 — Page metadata

Apply the approved metadata matrix to every route.

Fix:

```text
Home generic metadata
About duplicate description prop
utility noindex
Blog article metadata
```

## Phase 4 — Structured data

Implement:

```text
WebSite
ChildCare
WebPage variants
BlogPosting
Blog breadcrumbs
```

Add verified Sanity business fields.

Do not add FAQPage.

## Phase 5 — Content alignment

Make the compact page-copy additions in Section 8.

Do not rewrite approved visual headings unnecessarily.

## Phase 6 — Local profile cutover

Produce an owner checklist for updating:

```text
Google Business Profile
Ofsted
social profiles
directories
old contact data
old website links
```

All profiles must point to the new Astro website on the same domain after launch.

## Phase 7 — Validation

Run all automated and manual checks.

Stop for review before publishing new Blog articles.

---

# 20. Automated acceptance tests

Run the project’s real commands.

At minimum:

```bash
npm run check
npm run build
```

Add tests or scripts that verify the rendered output.

## Metadata tests

For every public route:

```text
exactly one title
one meta description
one canonical on indexable pages
no canonical on noindex utility pages
unique titles
unique descriptions
absolute URLs
correct OG type
OG image exists
Twitter card exists
```

## Index tests

```text
Thank-you contains noindex
404 contains noindex
404 returns HTTP 404
main pages return 200
legacy URLs return one-hop 301
```

## Sitemap tests

```text
valid XML
all indexable routes present
published Blog routes present
future Blog routes absent
noindex routes absent
redirect routes absent
canonical URLs match
```

## Structured-data tests

```text
valid JSON
one stable #childcare entity
one stable #website entity
no conflicting business facts
BlogPosting dates are ISO
absolute image URLs
no empty required values
```

## Content tests

```text
one H1 per route
no broken internal links
no href="#"
no stale old phone/email/address
no “Portuguese and Spanish” unless verified
no stale term dates
no outdated funding claims
```

---

# 21. Manual QA

Test:

```text
/
 /about-us
 /multilingual-learning
 /parents-information
 /hours-nutrition
 /our-gallery
 /contact
 /blog
 every Blog route
 /thank-you
 a nonexistent URL
 every legacy redirect
```

Inspect source HTML, not only the browser DOM.

Validate:

```text
Google Rich Results Test
Schema.org Validator
Search Console URL Inspection
Lighthouse
social share previews
```

Google’s Rich Results Test may not report every Schema.org-valid type. Use both tools.

---

# 22. Required implementation artefacts

Create:

```text
docs/seo/SEO_IMPLEMENTATION_LOG.md
docs/seo/SEO_METADATA_MATRIX.md
docs/seo/SEO_REDIRECT_MAP.md
docs/seo/SEO_STRUCTURED_DATA_MATRIX.md
docs/seo/SEO_CONTENT_PLAN.md
docs/seo/SEO_QA_REPORT.md
docs/seo/OWNER_FACT_VERIFICATION.md
```

Do not create a second speculative keyword-research project.

This document is the approved strategy.

---

# 23. AI agent operating rules

The agent must:

- preserve design and layout;
- preserve Sanity content ownership;
- keep routes unless this document says otherwise;
- use current business facts from Sanity;
- never hardcode duplicate NAP data in route files;
- implement the exact metadata strategy;
- use British English;
- avoid keyword stuffing;
- avoid claims of guaranteed ranking;
- show exact changed files;
- show test output;
- stop on factual conflicts;
- not proceed with uncertain Ofsted, address, language, fee or funding information.

---

# 24. Final response required from the AI agent

Return:

## A. Verdict

```text
Implemented
Partially implemented
Blocked by owner fact
```

## B. Files changed

Exact paths and purpose.

## C. Metadata table

Final rendered title, description, canonical and robots for every route.

## D. Redirect results

Every legacy URL and its final status/destination.

## E. Structured data

List nodes generated per route.

## F. Test output

Actual command results.

## G. Owner actions

Only non-code actions:

```text
GBP updates
Ofsted verification
directory updates
Search Console
review process
content approvals
```

## H. Remaining risks

No vague “SEO complete” claim.

---

# 25. Research basis

This strategy follows current guidance and project evidence from:

```text
Google Search SEO Starter Guide
Google title-link guidance
Google canonical guidance
Google sitemap guidance
Google LocalBusiness structured data guidance
Google AI-feature guidance
Google Business Profile local-ranking guidance
Astro sitemap documentation
Cloudflare Pages redirect documentation
GOV.UK Free Childcare for Working Parents
GOV.UK Tax-Free Childcare
the new Astro/Sanity codebase
the legacy WordPress site's historical URL structure only
the supplied SEO PDFs and implementation notes
```

Key current facts informing the strategy:

- Google emphasises helpful, reliable, people-first content and descriptive, accurate titles.
- Google recommends stable canonical URLs and direct redirects when URLs change.
- Google no longer shows FAQ rich results.
- Google states that `llms.txt` is not required and does not improve or harm Google rankings.
- Local visibility is primarily influenced by relevance, distance and prominence.
- Current GOV.UK terminology uses “Free Childcare for Working Parents” and states that eligible families may receive 30 hours for children aged 9 months to 4 years in England.
- Cloudflare Pages supports permanent redirects through a `public/_redirects` file.
- Astro’s sitemap integration can generate URLs for statically built dynamic Blog routes.

---

# Final instruction to the implementation agent

Implement this document.

Do not create a new SEO strategy.

Begin by producing the owner fact-verification file, then implement the technical work that does not depend on unresolved facts.

Do not deploy until the new Astro/Sanity business information has been verified and aligned across the website, structured data, Google Business Profile, Ofsted and social profiles.

The deleted WordPress content is not a continuing source of truth. Preserve only relevant legacy URL equity through redirects.