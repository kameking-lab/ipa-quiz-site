import type { CapacitorConfig } from "@capacitor/cli";
const config: CapacitorConfig = {
  // CLI 8 validates Java package syntax on `cap add`, even for iOS.
  // Generation only: configure-ios.rb restores the registered Apple Bundle ID
  // (jp.kakomon-ai.app) in every App configuration and the native runtime config.
  appId: "jp.kakomonai.app",
  appName: "過去問AI",
  webDir: "dist",
  ios: { contentInset: "never", preferredContentMode: "mobile" },
  // Online screens reuse the exact web React/RSC implementation. Local assets
  // provide independently executable, paid offline study (no iframe).
  server: { allowNavigation: ["www.kakomon-ai.jp"], errorPath: "index.html" },
  plugins: { CapacitorHttp: { enabled: false } },
};
export default config;
