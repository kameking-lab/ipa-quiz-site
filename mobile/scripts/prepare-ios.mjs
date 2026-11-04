import { access, copyFile, cp } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// Generation, sync, CocoaPods and Xcode are macOS-only. No signing or upload.
if (process.platform !== "darwin") {
  console.error("iOS preparation is restricted to macOS / Codemagic. No files changed.");
  process.exit(1);
}
const cwd = fileURLToPath(new URL("../", import.meta.url));
const run = (command, args) => execFileSync(command, args, { cwd, stdio: "inherit" });
try { await access(new URL("../ios/App/App.xcodeproj", import.meta.url)); }
catch { run("npx", ["--no-install", "cap", "add", "ios", "--packagemanager", "CocoaPods"]); }
run("npx", ["--no-install", "cap", "sync", "ios"]);
await copyFile(new URL("../ios-assets/PrivacyInfo.xcprivacy", import.meta.url), new URL("../ios/App/App/PrivacyInfo.xcprivacy", import.meta.url));
await copyFile(new URL("../ios-assets/QualificationBridgeViewController.swift", import.meta.url), new URL("../ios/App/App/QualificationBridgeViewController.swift", import.meta.url));
await copyFile(new URL("../ios-assets/TrackingTransparencyPlugin.swift", import.meta.url), new URL("../ios/App/App/TrackingTransparencyPlugin.swift", import.meta.url));
await cp(new URL("../ios-assets/AppIcon.appiconset/", import.meta.url),
  new URL("../ios/App/App/Assets.xcassets/AppIcon.appiconset/", import.meta.url), { recursive: true, force: true });
run("ruby", ["scripts/configure-ios.rb"]);
