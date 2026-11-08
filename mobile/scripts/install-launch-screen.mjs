import { copyFile, cp, rm } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const assets = fileURLToPath(new URL("../ios-assets/", import.meta.url));
/** Asset catalog entries LaunchScreen.storyboard (and the bridge's WebView colour) use. */
export const LAUNCH_ASSET_SETS = ["LaunchChihuahua.imageset", "LaunchBackground.colorset"];

/**
 * Replace Capacitor's template launch screen (white, Capacitor logo in
 * Splash.imageset) with the web home's paper colour and the round Chihuahua.
 * `appDirectory` is the generated ios/App/App folder. Idempotent.
 */
export async function installLaunchScreen(appDirectory) {
  await copyFile(join(assets, "LaunchScreen.storyboard"), join(appDirectory, "Base.lproj", "LaunchScreen.storyboard"));
  const catalog = join(appDirectory, "Assets.xcassets");
  for (const set of LAUNCH_ASSET_SETS) {
    await rm(join(catalog, set), { recursive: true, force: true });
    await cp(join(assets, set), join(catalog, set), { recursive: true });
  }
  // Nothing references the template image any more; never ship the Capacitor logo.
  await rm(join(catalog, "Splash.imageset"), { recursive: true, force: true });
}
