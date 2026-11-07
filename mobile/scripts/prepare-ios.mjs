import { access, copyFile, cp } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// Windows can generate and inspect native files with Ruby + xcodeproj. Only
// macOS can install CocoaPods, compile, sign or upload the resulting app.
const allowNonMacOS = process.argv.includes("--allow-non-macos");
if (process.argv.slice(2).some((argument) => argument !== "--allow-non-macos")) {
  throw new Error("Unknown argument. Use --allow-non-macos for native-file verification only.");
}
if (process.platform !== "darwin" && !allowNonMacOS) {
  console.error("iOS preparation requires macOS, or --allow-non-macos for native-file verification. No files changed.");
  process.exit(1);
}
const cwd = fileURLToPath(new URL("../", import.meta.url));
const run = (command, args) => execFileSync(command, args, { cwd, stdio: "inherit" });
// Invoke the pinned local CLI directly; npx is a .cmd shim on Windows.
const cap = (...args) => run(process.execPath, ["node_modules/@capacitor/cli/bin/capacitor", ...args]);
await access(new URL("../dist/index.html", import.meta.url));
run("ruby", ["-rxcodeproj", "-e", "abort 'Invalid build number' unless ENV.fetch('BUILD_NUMBER', '1').match?(/\\A[1-9]\\d*\\z/)"]);
try { await access(new URL("../ios/App/App.xcodeproj", import.meta.url)); }
catch (error) {
  if (error.code !== "ENOENT") throw error;
  cap("add", "ios", "--packagemanager", "CocoaPods");
}
// cap sync preserves the App target additions. Add/remove advertising Pods
// before sync invokes pod install (including on an existing generated project).
run(process.execPath, ["scripts/configure-ads-pods.mjs"]);
cap("sync", "ios");
// configure-ios.rb generates the privacy manifest for the effective ads setting.
await copyFile(new URL("../ios-assets/QualificationBridgeViewController.swift", import.meta.url), new URL("../ios/App/App/QualificationBridgeViewController.swift", import.meta.url));
await copyFile(new URL("../ios-assets/TrackingTransparencyPlugin.swift", import.meta.url), new URL("../ios/App/App/TrackingTransparencyPlugin.swift", import.meta.url));
await cp(new URL("../ios-assets/AppIcon.appiconset/", import.meta.url),
  new URL("../ios/App/App/Assets.xcassets/AppIcon.appiconset/", import.meta.url), { recursive: true, force: true });
run("ruby", ["scripts/configure-ios.rb"]);
run("ruby", ["scripts/verify-ios.rb"]);
if (process.platform !== "darwin") {
  console.log("Native files verified only. CocoaPods integration, Swift compilation, signing and upload require macOS.");
}
