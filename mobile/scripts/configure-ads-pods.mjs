import { readFile, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export function configureAdsPods(input, enabled = false) {
  let podfile = input;
  if (!enabled) {
    // Remove stale direct dependencies before cap sync runs pod install. This
    // also removes the SDK's startup App ID check and tracking manifests.
    podfile = podfile.replace(/^[ \t]*# ADS1: WebView API for Ads\r?\n/gm, "")
      .replace(/^[ \t]*pod ['"](?:Google-Mobile-Ads-SDK|GoogleUserMessagingPlatform)['"][^\r\n]*(?:\r?\n|$)/gm, "");
  } else if (!podfile.includes("# ADS1: WebView API for Ads")) {
    if (!podfile.includes("  # Add your Pods here")) throw new Error("Unsupported Capacitor Podfile");
    podfile = podfile.replace("  # Add your Pods here", "  # Add your Pods here\n  # ADS1: WebView API for Ads\n  pod 'Google-Mobile-Ads-SDK', '13.11.0'\n  pod 'GoogleUserMessagingPlatform', '3.1.0'");
  }
  if (enabled && !podfile.includes("pod 'GoogleUserMessagingPlatform', '3.1.0'")) {
    podfile = podfile.replace("pod 'Google-Mobile-Ads-SDK', '13.11.0'", "pod 'Google-Mobile-Ads-SDK', '13.11.0'\n  pod 'GoogleUserMessagingPlatform', '3.1.0'");
  }
  // Xcode 27 requires iOS 15 for every pod, including Google's dependencies.
  if (!podfile.includes("# ADS1: minimum pod deployment target")) {
    if (!podfile.includes("  assertDeploymentTarget(installer)")) throw new Error("Unsupported Capacitor post_install");
    podfile = podfile.replace("  assertDeploymentTarget(installer)", `  assertDeploymentTarget(installer)
  # ADS1: minimum pod deployment target
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '15.0'
    end
  end`);
  }
  return podfile;
}

if (process.argv[1]?.endsWith("configure-ads-pods.mjs")) {
  const enabled = execFileSync("ruby", [fileURLToPath(new URL("./ios-ads-config.rb", import.meta.url))], { encoding: "utf8" }).trim() === "true";
  const file = resolve("ios/App/Podfile");
  await writeFile(file, configureAdsPods(await readFile(file, "utf8"), enabled));
}
