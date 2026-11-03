import type { CapacitorConfig } from "@capacitor/cli";
const config: CapacitorConfig = {
  appId: "jp.kakomon-ai.app",
  appName: "過去問AI",
  webDir: "dist",
  ios: { contentInset: "never", preferredContentMode: "mobile" },
  // Online screens reuse the exact web React/RSC implementation. Local assets
  // provide independently executable, paid offline study (no iframe).
  server: { allowNavigation: ["www.kakomon-ai.jp"], errorPath: "index.html" },
  plugins: { CapacitorHttp: { enabled: false } },
};
export default config;
