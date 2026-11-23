import { defineConfig, devices } from "@playwright/test";
import base from "./playwright.config";
// iPhone 15 Pro (WebKit) check of the App Store purchase flow. Run after
// `npm run test:e2e` has built dist/ in e2e mode:
//   npx playwright test -c playwright.webkit.config.ts
export default defineConfig({
  ...base,
  testMatch: /iap-flow\.spec\.ts/,
  use: { ...base.use, ...devices["iPhone 15 Pro"], defaultBrowserType: "webkit" },
});
