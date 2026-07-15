import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const routes = [
  "/",
  "/about-us",
  "/approach",
  "/contact",
  "/parents-information",
  "/hours-nutrition",
  "/fees-funding",
  "/multilingual-learning",
  "/settling-in",
  "/blog",
  "/blog/the-power-of-play",
  "/thank-you",
];

const viewports = [
  { width: 1440, height: 1000, name: "1440px" },
  { width: 768, height: 1024, name: "768px" },
  { width: 390, height: 844, name: "390px" },
];

const baseUrl = "http://127.0.0.1:4321";

async function main() {
  const browser = await chromium.launch();
  const outDir = path.join(process.cwd(), "baseline_screenshots");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }

  for (const route of routes) {
    for (const vp of viewports) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
      });
      const page = await context.newPage();
      try {
        await page.goto(`${baseUrl}${route}`, { waitUntil: "load" });
        // wait extra for animations
        await page.waitForTimeout(1000);

        const routeName =
          route === "/" ? "home" : route.replace(/\//g, "-").replace(/^-/, "");
        const screenshotPath = path.join(outDir, `${routeName}_${vp.name}.png`);

        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`Saved screenshot: ${screenshotPath}`);
      } catch (err) {
        console.error(`Failed to capture ${route} at ${vp.name}: ${err}`);
      } finally {
        await context.close();
      }
    }
  }

  await browser.close();
}

main().catch(console.error);
