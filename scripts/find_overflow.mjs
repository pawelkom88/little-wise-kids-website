import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

  const routes = [
    "/",
    "/about-us",
    "/our-approach",
    "/contact",
    "/parents-information",
    "/hours-nutrition",
    "/fees-funding",
    "/multilingual-learning",
    "/settling-in",
    "/blog",
  ];

  for (const route of routes) {
    await page.goto(`http://127.0.0.1:4321${route}`, { waitUntil: "load" });

    const overflowingElements = await page.evaluate(() => {
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
          // 1px threshold for rounding
          overflowing.push({
            tag: el.tagName,
            class: el.className,
            id: el.id,
            right: rect.right,
            width: rect.width,
          });
        }
      }
      return overflowing;
    });

    if (overflowingElements.length > 0) {
      console.log(`Overflow on ${route}:`, overflowingElements);
    } else {
      console.log(`No overflow on ${route}`);
    }
  }

  await browser.close();
})();
