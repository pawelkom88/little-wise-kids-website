import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/accessibility",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html", { outputFolder: "playwright-report/accessibility" }]],
  use: {
    baseURL: "http://localhost:4321",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
    {
      name: "chromium-reduced-motion",
      use: {
        ...devices["Desktop Chrome"],
        contextOptions: {
          prefersReducedMotion: "reduce",
        },
      },
    },
  ],
  webServer: {
    command: "ASTRO_TELEMETRY_DISABLED=1 npx wrangler dev --port 4321",
    url: "http://localhost:4321",
    reuseExistingServer: false,
    stdout: "ignore",
    stderr: "pipe",
  },
});
