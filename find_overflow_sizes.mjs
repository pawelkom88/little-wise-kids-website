import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch();
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

  for (const size of [320, 390, 768, 1024, 1440]) {
    const page = await browser.newPage({
      viewport: { width: size, height: 800 },
    });
    for (const route of routes) {
      await page.goto(`http://127.0.0.1:4321${route}`, { waitUntil: "load" });
      const overflowingElements = await page.evaluate(() => {
        const docWidth = document.documentElement.clientWidth;
        const elements = document.querySelectorAll("*");
        const overflowing = [];
        for (const el of elements) {
          if (["BODY", "HTML", "MAIN", "SCRIPT", "STYLE"].includes(el.tagName))
            continue;
          const rect = el.getBoundingClientRect();
          if (rect.right > docWidth + 1 || rect.width > docWidth + 1) {
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
        console.log(`Overflow on ${route} at ${size}px:`, overflowingElements);
      }
    }
    await page.close();
  }
  await browser.close();
})();
