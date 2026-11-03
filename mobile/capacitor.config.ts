import type { CapacitorConfig } from "@capacitor/cli";
const config: CapacitorConfig = {
  appId: "jp.kakomon-ai.app",
  appName: "過去問AI",
  webDir: "dist",
  ios: { contentInset: "never", preferredContentMode: "mobile" },
  // Native HTTP is invoked explicitly, never used to navigate to a remote UI.
  plugins: { CapacitorHttp: { enabled: false } },
};
export default config;
