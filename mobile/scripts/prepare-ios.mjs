import { access, copyFile, mkdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

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
const iconDir = new URL("../ios/App/App/Assets.xcassets/AppIcon.appiconset/", import.meta.url);
await mkdir(iconDir, { recursive: true });
await sharp(fileURLToPath(new URL("../ios-assets/icon.svg", import.meta.url)))
  .png().toFile(fileURLToPath(new URL("AppIcon-512@2x.png", iconDir)));
run("ruby", ["scripts/configure-ios.rb"]);
