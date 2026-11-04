import { readFile, writeFile } from "node:fs/promises";

export function configureAdsPods(input) {
  let podfile = input;
  if (!podfile.includes("# ADS1: WebView API for Ads")) {
    if (!podfile.includes("  # Add your Pods here")) throw new Error("Unsupported Capacitor Podfile");
    podfile = podfile.replace("  # Add your Pods here", "  # Add your Pods here\n  # ADS1: WebView API for Ads\n  pod 'Google-Mobile-Ads-SDK', '13.11.0'\n  pod 'GoogleUserMessagingPlatform', '3.1.0'");
  }
  if (!podfile.includes("pod 'GoogleUserMessagingPlatform', '3.1.0'")) {
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
  const file = new URL("../ios/App/Podfile", import.meta.url);
  await writeFile(file, configureAdsPods(await readFile(file, "utf8")));
}
