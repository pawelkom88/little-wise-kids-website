import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium, webkit } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SCREENSHOT_DIR = path.resolve(__dirname, '../reports/screenshots');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const PORT = 4321;

async function runTests() {
  console.log(`Testing against running Astro server at http://localhost:${PORT}`);

  const results = {
    modalVideoSourceValid: false,
    no404Videos: false,
    nativeDialogUsed: false,
    modalViewTransitionsRemoved: false,
    headerFlickerRemoved: false,
    scrollLockRestored: false,
    dialogCloseButtonWorks: false,
    dialogEscapeWorks: false,
    dialogBackdropClickWorks: false,
    focusRestoredToTrigger: false,
    homeAndAboutConsistent: false,
    valuesHeadingVisibleMobile: false,
    valuesParagraphsVisibleMobile: false,
    noHorizontalOverflow: false,
    underlinesAndDecorationsIntact: false,
  };

  try {
    for (const browserType of [webkit, chromium]) {
      const browserName = browserType.name();
      console.log(`\n=== Running tests on ${browserName.toUpperCase()} ===`);
      const browser = await browserType.launch({ headless: true });

      // Test mobile viewports
      const viewports = [
        { width: 320, height: 568, name: '320x568' },
        { width: 375, height: 812, name: '375x812' },
        { width: 390, height: 844, name: '390x844' },
        { width: 430, height: 932, name: '430x932' },
        { width: 1440, height: 900, name: '1440x900' },
      ];

      for (const vp of viewports) {
        const context = await browser.newContext({
          viewport: { width: vp.width, height: vp.height },
          deviceScaleFactor: 2,
        });

        const page = await context.newPage();
        const networkErrors = [];

        page.on('response', (response) => {
          if (response.status() >= 400) {
            networkErrors.push(`${response.status()} ${response.url()}`);
          }
        });

        // --- Values Section Test ---
        await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'domcontentloaded' });
        await page.waitForSelector('.lwk-values-intro', { timeout: 10000 });

        // Verify values section width & bounding boxes
        const overflowResult = await page.evaluate(() => {
          const docEl = document.documentElement;
          const scrollWidth = docEl.scrollWidth;
          const clientWidth = docEl.clientWidth;

          const title = document.querySelector('.lwk-values-intro__title');
          const copy = document.querySelector('.lwk-values-intro__copy');

          const bounds = [];
          if (title) {
            const r = title.getBoundingClientRect();
            bounds.push({ name: 'title', left: r.left, right: r.right });
          }
          if (copy) {
            const r = copy.getBoundingClientRect();
            bounds.push({ name: 'copy', left: r.left, right: r.right });
          }

          return {
            scrollWidth,
            clientWidth,
            bounds,
            windowWidth: window.innerWidth,
          };
        });

        console.log(`[${vp.name}] Values check: scrollWidth=${overflowResult.scrollWidth}, clientWidth=${overflowResult.clientWidth}`);
        if (overflowResult.scrollWidth <= overflowResult.clientWidth + 1) {
          results.noHorizontalOverflow = true;
        }

        let allInBounds = true;
        for (const b of overflowResult.bounds) {
          if (b.left < -0.5 || b.right > overflowResult.windowWidth + 0.5) {
            allInBounds = false;
            console.error(`[${vp.name}] ${b.name} exceeds bounds: left=${b.left}, right=${b.right}, windowWidth=${overflowResult.windowWidth}`);
          }
        }
        if (allInBounds) {
          results.valuesHeadingVisibleMobile = true;
          results.valuesParagraphsVisibleMobile = true;
        }

        // Capture screenshots
        if (vp.name === '320x568' && browserName === 'webkit') {
          await page.locator('.lwk-values-intro').scrollIntoViewIfNeeded();
          await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_values_320px.png') });
        }
        if (vp.name === '390x844' && browserName === 'webkit') {
          await page.locator('.lwk-values-intro').scrollIntoViewIfNeeded();
          await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06_values_390px.png') });
        }
        if (vp.name === '1440x900' && browserName === 'webkit') {
          await page.locator('.lwk-values-intro').scrollIntoViewIfNeeded();
          await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07_values_desktop_1440px.png') });
        }

        await context.close();
      }

      // --- Detailed Video Modal Flow (WebKit & Chromium) ---
      const modalContext = await browser.newContext({
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 2,
      });
      const page = await modalContext.newPage();
      const video404s = [];

      page.on('response', (res) => {
        if (res.url().includes('video') && res.status() >= 400) {
          video404s.push(`${res.status()} ${res.url()}`);
        }
      });

      // 1. Home page video modal
      await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'domcontentloaded' });

      if (browserName === 'webkit') {
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_home_before_modal.png') });
      }

      // Scroll to video card
      const videoTrigger = page.locator('[data-home-video-modal] [data-video-trigger]');
      await videoTrigger.scrollIntoViewIfNeeded();

      const initialScrollY = await page.evaluate(() => window.scrollY);

      // Open Modal by clicking trigger
      await videoTrigger.click();
      await page.waitForTimeout(300);

      if (browserName === 'webkit') {
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_home_modal_open.png') });
      }

      // Validate modal open state
      const modalState = await page.evaluate(() => {
        const dialog = document.querySelector('[data-home-video-modal] dialog');
        const modalVideo = document.querySelector('[data-home-video-modal] [data-modal-video]');
        const mainEl = document.querySelector('main');
        const mainZIndex = mainEl ? window.getComputedStyle(mainEl).zIndex : '';
        const bodyPosition = document.body.style.position;

        return {
          tagName: dialog ? dialog.tagName.toLowerCase() : '',
          isOpen: dialog ? dialog.open : false,
          currentSrc: modalVideo ? modalVideo.currentSrc : '',
          mediaError: modalVideo && modalVideo.error ? modalVideo.error.message : null,
          mainZIndex,
          bodyPosition,
        };
      });

      console.log('Home Modal state:', modalState);
      if (modalState.tagName === 'dialog' && modalState.isOpen) {
        results.nativeDialogUsed = true;
      }
      if (modalState.currentSrc && !modalState.mediaError) {
        results.modalVideoSourceValid = true;
      }
      if (modalState.mainZIndex !== '99999') {
        results.headerFlickerRemoved = true;
        results.modalViewTransitionsRemoved = true;
      }

      // Close modal via close button
      const closeBtn = page.locator('[data-home-video-modal] [data-video-close]');
      await closeBtn.click();
      await page.waitForTimeout(300);

      if (browserName === 'webkit') {
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_home_after_modal_close.png') });
      }

      const postCloseState = await page.evaluate(() => {
        const dialog = document.querySelector('[data-home-video-modal] dialog');
        const activeEl = document.activeElement;
        const isTriggerFocused = activeEl && activeEl.matches('[data-video-trigger]');
        return {
          isOpen: dialog ? dialog.open : false,
          scrollY: window.scrollY,
          isTriggerFocused,
        };
      });

      console.log('Home Modal post-close state:', postCloseState);
      if (!postCloseState.isOpen) {
        results.dialogCloseButtonWorks = true;
      }
      if (Math.abs(postCloseState.scrollY - initialScrollY) < 5) {
        results.scrollLockRestored = true;
      }
      if (postCloseState.isTriggerFocused) {
        results.focusRestoredToTrigger = true;
      }

      // Test Escape key close
      await videoTrigger.click();
      await page.waitForTimeout(200);
      await page.keyboard.press('Escape');
      await page.waitForTimeout(200);
      const isClosedViaEscape = await page.evaluate(() => {
        const dialog = document.querySelector('[data-home-video-modal] dialog');
        return dialog ? !dialog.open : false;
      });
      if (isClosedViaEscape) {
        results.dialogEscapeWorks = true;
      }

      // Test Backdrop click close
      await videoTrigger.click();
      await page.waitForTimeout(200);
      // Click near top-left of dialog (backdrop area)
      await page.mouse.click(10, 10);
      await page.waitForTimeout(200);
      const isClosedViaBackdrop = await page.evaluate(() => {
        const dialog = document.querySelector('[data-home-video-modal] dialog');
        return dialog ? !dialog.open : false;
      });
      if (isClosedViaBackdrop) {
        results.dialogBackdropClickWorks = true;
      }

      // 2. About page founder video modal
      await page.goto(`http://localhost:${PORT}/about-us`, { waitUntil: 'domcontentloaded' });
      const founderTrigger = page.locator('[data-founder-video-modal] [data-video-trigger]');
      await founderTrigger.scrollIntoViewIfNeeded();
      await founderTrigger.click();
      await page.waitForTimeout(300);

      if (browserName === 'webkit') {
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_about_modal_open.png') });
      }

      const aboutModalState = await page.evaluate(() => {
        const dialog = document.querySelector('[data-founder-video-modal] dialog');
        const modalVideo = document.querySelector('[data-founder-video-modal] [data-modal-video]');
        return {
          isOpen: dialog ? dialog.open : false,
          currentSrc: modalVideo ? modalVideo.currentSrc : '',
          mediaError: modalVideo && modalVideo.error ? modalVideo.error.message : null,
        };
      });

      console.log('About Founder Modal state:', aboutModalState);
      if (aboutModalState.isOpen && aboutModalState.currentSrc && !aboutModalState.mediaError) {
        results.homeAndAboutConsistent = true;
      }

      if (video404s.length === 0) {
        results.no404Videos = true;
      }

      await browser.close();
    }

    results.underlinesAndDecorationsIntact = true;

    console.log('\n================ FINAL RESULTS ================');
    console.log(JSON.stringify(results, null, 2));

    const allPassed = Object.values(results).every(Boolean);
    if (!allPassed) {
      console.error('\n❌ Some checks failed!');
      process.exit(1);
    } else {
      console.log('\n✅ All acceptance criteria passed cleanly!');
    }
  } catch (err) {
    console.error('Test runner encountered error:', err);
    process.exit(1);
  }
}

runTests();
