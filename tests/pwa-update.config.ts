import { defineConfig, devices } from "@playwright/test";

// Two local deployment versions, real SW/Cache Storage, no production server/DB.
export default defineConfig({
  testDir: "./e2e",
  testMatch: "pwa-update.spec.ts",
  workers: 1,
  timeout: 30_000,
  use: { serviceWorkers: "allow" },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "webkit-iphone", use: { ...devices["iPhone 13"], browserName: "webkit" } },
  ],
});
