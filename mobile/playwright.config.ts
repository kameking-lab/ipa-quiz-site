import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e", fullyParallel: false, workers: 1,
  use: { ...devices["iPhone 13"], defaultBrowserType: "chromium", baseURL: "http://127.0.0.1:4178", trace: "retain-on-failure" },
  webServer: { command: "npx vite preview --host 127.0.0.1 --port 4178 --strictPort", url: "http://127.0.0.1:4178", reuseExistingServer: false },
});
