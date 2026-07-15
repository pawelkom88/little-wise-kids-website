import { chromium } from "playwright";
import assert from "node:assert/strict";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  const routes = [
    "/",
    "/about-us",
    "/contact",
    "/parents-information",
    "/hours-nutrition",
    "/multilingual-learning",
    "/our-gallery",
    "/thank-you",
    "/blog",
    "/blog/the-power-of-play",
  ];

  const port = process.env.PORT || "4321";
  console.log(
    `Starting route correctness and sanity checks on port ${port}...`
  );

  for (const route of routes) {
    const url = `http://localhost:${port}${route}`;
    await page.goto(url, { waitUntil: "load" });

    // 1. One <main> and one <h1>
    const mainCount = await page.locator("main").count();
    assert.equal(
      mainCount,
      1,
      `Route ${route} must have exactly one <main> element. Found ${mainCount}`
    );

    const h1Count = await page.locator("h1").count();
    assert.equal(
      h1Count,
      1,
      `Route ${route} must have exactly one <h1> element. Found ${h1Count}`
    );

    // 2. Horizontal overflow check
    const overflowInfo = await page.evaluate(() => {
      const docWidth = document.documentElement.clientWidth;
      const elements = document.querySelectorAll("*");
      const overflowing = [];
      for (const el of elements) {
        if (
          el.tagName === "BODY" ||
          el.tagName === "HTML" ||
          el.tagName === "MAIN" ||
          el.tagName === "SCRIPT" ||
          el.tagName === "STYLE"
        )
          continue;
        const rect = el.getBoundingClientRect();
        if (rect.right > docWidth + 1 || rect.width > docWidth + 1) {
          overflowing.push({
            tag: el.tagName,
            className: el.className,
            id: el.id,
            right: rect.right,
            width: rect.width,
          });
        }
      }
      return {
        viewport: docWidth,
        document: document.documentElement.scrollWidth,
        elements: overflowing,
      };
    });

    assert(
      overflowInfo.document <= overflowInfo.viewport,
      `Route ${route} has horizontal overflow. Viewport: ${overflowInfo.viewport}px, Document: ${overflowInfo.document}px. Overflowing elements: ${JSON.stringify(overflowInfo.elements, null, 2)}`
    );

    // 3. Duplicate IDs check
    const duplicateIds = await page.evaluate(() => {
      const ids = [...document.querySelectorAll("[id]")].map((el) => el.id);
      return ids.filter((id, index) => ids.indexOf(id) !== index);
    });
    assert.deepEqual(
      duplicateIds,
      [],
      `Route ${route} has duplicate element IDs: ${duplicateIds.join(", ")}`
    );

    // 4. Same-origin hash/fragment links check
    const hashLinks = await page.evaluate(() => {
      return [...document.querySelectorAll("a[href*='#']")]
        .map((a) => a.getAttribute("href"))
        .filter((href) => {
          // Keep only relative/same-origin links with fragments
          return (
            href.startsWith("#") ||
            href.startsWith("/") ||
            href.startsWith(window.location.origin)
          );
        });
    });

    for (const link of hashLinks) {
      let targetUrl = url;
      let hash = "";

      if (link.startsWith("#")) {
        hash = link;
      } else {
        const urlObj = new URL(link, url);
        targetUrl = urlObj.origin + urlObj.pathname;
        hash = urlObj.hash;
      }

      if (hash && hash !== "#") {
        // Create a new context/page or navigate there to check if fragment exists
        const testPage = await browser.newPage();
        await testPage.goto(targetUrl, { waitUntil: "load" });
        const exists = await testPage.evaluate((selector) => {
          try {
            return !!document.querySelector(selector);
          } catch (e) {
            return false;
          }
        }, hash);
        await testPage.close();

        assert(
          exists,
          `Broken fragment link found on ${route}: target element '${hash}' does not exist on page ${targetUrl}`
        );
      }
    }

    console.log(`✓ Route ${route} passed all assertions.`);
  }

  await browser.close();
  console.log("All route checks completed successfully!");
  process.exit(0);
})().catch((err) => {
  console.error("Route check failed:", err.message);
  process.exit(1);
});
