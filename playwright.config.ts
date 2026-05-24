import { defineConfig } from "@playwright/test";

const baseURL = process.env.E2E_BASE_URL ?? "http://127.0.0.1:3000";

// The onboarding tour now opens synchronously on first visit (no delay), so
// every fresh browser context would be blocked by a focus-trapped Radix
// dialog. Seed the legacy onboarding flag once for all specs — readOnboardingState()
// migrates this to a completed-tour state, so the modal never opens for
// automated browsers. Individual specs that need to exercise the tour can
// still clear the key in a beforeEach.
const baseOrigin = new URL(baseURL).origin;

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    storageState: {
      cookies: [],
      origins: [
        {
          origin: baseOrigin,
          localStorage: [
            { name: "ipa-quiz:onboarded:v1", value: "1" },
          ],
        },
      ],
    },
  },
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: "pnpm start -p 3000",
        port: 3000,
        timeout: 120_000,
        reuseExistingServer: !process.env.CI,
      },
});
