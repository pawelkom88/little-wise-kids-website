import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import * as fs from "fs";
import * as path from "path";

function saveAxeResults(testInfo: any, fileKey: string, route: string, results: any) {
  const dir = path.join(
    process.cwd(),
    "test-results",
    "accessibility",
    "raw",
    testInfo.project.name
  );
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, `${fileKey}.json`),
    JSON.stringify(results, null, 2)
  );
}

const routes = [
  { path: "/", key: "home" },
  { path: "/about-us", key: "about-us" },
  { path: "/parents-information", key: "parents-information" },
  { path: "/hours-nutrition", key: "hours-nutrition" },
  { path: "/multilingual-learning", key: "multilingual-learning" },
  { path: "/our-gallery", key: "our-gallery" },
  { path: "/contact", key: "contact" },
  { path: "/blog", key: "blog" },
  { path: "/404", key: "404-page" },
];

test.describe("Baseline Automated Accessibility Audit", () => {
  for (const route of routes) {
    test(`Automated Axe scan for ${route.path}`, async ({ page }, testInfo) => {
      await page.goto(route.path);
      await page.waitForLoadState("domcontentloaded");

      // Configure axe to ignore specific parts if needed (e.g. iframe widgets)
      const results = await new AxeBuilder({ page })
        .withRules(["color-contrast", "document-title", "html-has-lang", "label"])
        .analyze();

      saveAxeResults(testInfo, `route-${route.key}`, route.path, results);

      // We assert that there are no critical violations
      expect(results.violations).toEqual([]);
    });
  }

  test("Automated Axe scan for Blog Article", async ({ page }, testInfo) => {
    await page.goto("/blog");
    await page.waitForLoadState("domcontentloaded");

    const articleLink = page.locator(".blog-card a, a[href^=\"/blog/\"]").first();
    
    if (await articleLink.count() > 0) {
      const href = await articleLink.getAttribute("href");
      if (href) {
        await page.goto(href);
        await page.waitForLoadState("domcontentloaded");

        const results = await new AxeBuilder({ page })
          .withRules(["color-contrast", "document-title", "html-has-lang", "label"])
          .analyze();

        saveAxeResults(testInfo, `route-blog-article`, href, results);
        expect(results.violations).toEqual([]);
      } else {
        test.skip(true, "First blog link did not have a valid href");
      }
    } else {
      test.skip(true, "No blog articles discovered dynamically in the Sanity dataset");
    }
  });

  test("Automated Axe scan for nonexistent route (404 fallback)", async ({ page }, testInfo) => {
    // Wrangler's local preview may not route unknown paths to the custom 404.html.
    // Firefox throws NS_ERROR_NET_ERROR_RESPONSE on bare 404 responses.
    // The /404 page content is already scanned via the regular routes array above.
    let response;
    try {
      response = await page.goto("/some-nonexistent-page-path");
    } catch {
      test.skip(true, "Preview server returned an error response the browser could not render");
      return;
    }
    await page.waitForLoadState("domcontentloaded");

    const heading = page.locator("h1");
    const headingCount = await heading.count();
    if (headingCount === 0 || !(await heading.textContent())?.includes("Oops")) {
      test.skip(true, "Preview server did not serve the custom 404 page for this route");
      return;
    }

    expect(response?.status()).toBe(404);
    await expect(heading).toContainText("Oops! We Can't Find That Page");

    const results = await new AxeBuilder({ page })
      .withRules(["color-contrast", "document-title", "html-has-lang", "label"])
      .analyze();

    saveAxeResults(testInfo, "route-404-fallback", "/some-nonexistent-page-path", results);
    expect(results.violations).toEqual([]);
  });

  test("Material state: Mobile navigation toggle, open and closed state", async ({ page }, testInfo) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const toggle = page.locator(".mobile-menu__toggle, details.mobile-menu summary");
    const panel = page.locator(".mobile-menu__panel");

    // Only test if mobile menu button is visible (mobile viewports)
    if (await toggle.isVisible()) {
      // Collapsed state
      const collapsedResults = await new AxeBuilder({ page }).analyze();
      saveAxeResults(testInfo, "state-mobile-menu-collapsed", "/", collapsedResults);
      expect(collapsedResults.violations).toEqual([]);

      // Expand menu
      await toggle.click();
      await expect(panel).toBeVisible();

      // Expanded state
      const expandedResults = await new AxeBuilder({ page }).analyze();
      saveAxeResults(testInfo, "state-mobile-menu-expanded", "/", expandedResults);
      expect(expandedResults.violations).toEqual([]);
    } else {
      test.skip(true, "Mobile menu is not visible on desktop viewports");
    }
  });

  test("Material state: FAQ accordion state", async ({ page }, testInfo) => {
    await page.goto("/parents-information");
    await page.waitForLoadState("domcontentloaded");

    const faqToggles = page.locator("details.faq-item summary");
    const firstFaqDetails = page.locator("details.faq-item").first();

    if ((await faqToggles.count()) > 0) {
      const isInitiallyOpen = await firstFaqDetails.evaluate(el => el.hasAttribute("open"));

      // Initial state scan
      const collapsedResults = await new AxeBuilder({ page }).analyze();
      saveAxeResults(testInfo, "state-faq-initial", "/parents-information", collapsedResults);
      expect(collapsedResults.violations).toEqual([]);

      // Toggle state
      await faqToggles.first().click();
      if (isInitiallyOpen) {
        await expect(firstFaqDetails).not.toHaveAttribute("open", "");
      } else {
        await expect(firstFaqDetails).toHaveAttribute("open", "");
      }

      // Toggled state scan
      const expandedResults = await new AxeBuilder({ page }).analyze();
      saveAxeResults(testInfo, "state-faq-toggled", "/parents-information", expandedResults);
      expect(expandedResults.violations).toEqual([]);
    } else {
      test.skip(true, "No FAQ items found on the parents page");
    }
  });

  test("Material state: Contact form invalid state", async ({ page }, testInfo) => {
    await page.goto("/contact");
    await page.waitForLoadState("networkidle");
    await page.waitForFunction(() => document.querySelector('#contact-start-date')?.hasAttribute('min'));

    const submitBtn = page.locator('button[type="submit"]');
    if (await submitBtn.isVisible()) {
      // Click submit to trigger validation errors
      await submitBtn.click();

      // Wait for alert / error summary to appear
      const errorSummary = page.locator('[role="alert"], .error-summary');
      await expect(errorSummary).toBeVisible();

      const results = await new AxeBuilder({ page }).analyze();
      saveAxeResults(testInfo, "state-contact-form-invalid", "/contact", results);
      expect(results.violations).toEqual([]);
    } else {
      test.skip(true, "Submit button not found");
    }
  });

  test("Material state: Gallery controls and active slide", async ({ page }, testInfo) => {
    await page.goto("/our-gallery");
    await page.waitForLoadState("domcontentloaded");

    const galleryContainer = page.locator(".lwk-gallery, [data-gallery-container]");
    const activeSlide = page.locator(".lwk-gallery__page[aria-current=\"true\"], .lwk-gallery__slide[aria-current=\"true\"]");

    if ((await galleryContainer.count()) > 0 && (await activeSlide.count()) > 0) {
      const results = await new AxeBuilder({ page }).analyze();
      saveAxeResults(testInfo, "state-gallery-active", "/our-gallery", results);
      expect(results.violations).toEqual([]);
    } else {
      test.skip(true, "Gallery deferred... No gallery items rendered in local Sanity dataset.");
    }
  });
});
