import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const routes = [
  "/about-us",
  "/multilingual-learning",
  "/parents-information",
  "/hours-nutrition",
  "/our-gallery",
  "/contact",
  "/blog",
  "/blog/the-power-of-play",
  "/thank-you",
];

const viewports = [
  { width: 1440, height: 1000, label: "1440x1000" },
  { width: 1024, height: 900, label: "1024x900" },
  { width: 768, height: 1024, label: "768x1024" },
  { width: 390, height: 844, label: "390x844" },
];

const baseUrl = "http://localhost:4322";

async function main() {
  const browser = await chromium.launch();
  const results = [];
  const ssDir = path.join(process.cwd(), "hero_screenshots");

  if (!fs.existsSync(ssDir)) {
    fs.mkdirSync(ssDir, { recursive: true });
  }

  for (const route of routes) {
    console.log(`Checking route: ${route}`);
    for (const vp of viewports) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
      });
      const page = await context.newPage();

      try {
        await page.goto(`${baseUrl}${route}`, { waitUntil: "load" });
        // Small wait for layout stability and potential animations
        await page.waitForTimeout(300);

        const metrics = await page.evaluate(() => {
          const hero = document.querySelector(".subpage-hero");
          const eyebrow = document.querySelector(".subpage-hero__eyebrow");
          const title = document.querySelector(".subpage-hero__title");
          const copy = document.querySelector(".subpage-hero__copy");
          const wave = document.querySelector(".subpage-hero__wave");

          if (!hero || !title) {
            return null;
          }

          const heroRect = hero.getBoundingClientRect();
          const titleRect = title.getBoundingClientRect();
          const eyebrowRect = eyebrow ? eyebrow.getBoundingClientRect() : null;
          const copyRect = copy ? copy.getBoundingClientRect() : null;
          const waveRect = wave ? wave.getBoundingClientRect() : null;

          return {
            heroHeight: heroRect.height,
            eyebrowTop: eyebrowRect ? eyebrowRect.top - heroRect.top : null,
            titleTop: titleRect.top - heroRect.top,
            titleBottom: titleRect.bottom - heroRect.top,
            copyTop: copyRect ? copyRect.top - heroRect.top : null,
            copyBottom: copyRect ? copyRect.bottom - heroRect.top : null,
            waveTop: waveRect ? waveRect.top - heroRect.top : null,
          };
        });

        if (metrics) {
          const safetyGap =
            metrics.waveTop && metrics.copyBottom
              ? metrics.waveTop - metrics.copyBottom
              : null;
          const routeName =
            route.replace(/\//g, "_").replace(/^_/, "") || "home";
          const ssName = `${routeName}_${vp.label}.png`;
          const ssPath = path.join(ssDir, ssName);

          await page.screenshot({ path: ssPath });

          results.push({
            route,
            viewport: vp.label,
            ...metrics,
            safetyGap,
            screenshotPath: ssPath,
          });
        } else {
          console.warn(`No hero found on route ${route} at ${vp.label}`);
        }
      } catch (err) {
        console.error(`Error on route ${route} at ${vp.label}:`, err);
      } finally {
        await context.close();
      }
    }
  }

  await browser.close();

  // Save the measurements json
  const outPath = process.argv[2] || "measurements.json";
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(`Saved measurements to ${outPath}`);
}

main().catch(console.error);
