import { readdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, it } from "vitest";
import config from "../capacitor.config";

// The purchase UI runs on www.kakomon-ai.jp inside the WebView and talks to
// RevenueCat only through the native "Purchases" plugin. If `cap sync` does not
// list PurchasesPlugin in capacitor.config.json (packageClassList), every call
// answers UNIMPLEMENTED and the app can never show a price. These checks run on
// Windows and CI without Xcode; ios-project.test.mjs checks the generated file.
const mobile = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(join(mobile, "package.json"));
const pluginRoot = dirname(require.resolve("@revenuecat/purchases-capacitor/package.json"));
const pluginPackage = JSON.parse(readFileSync(join(pluginRoot, "package.json"), "utf8")) as { capacitor?: { ios?: { src?: string } } };
const swiftFiles = (directory: string): string[] => readdirSync(directory, { withFileTypes: true })
  .flatMap(entry => entry.isDirectory() ? swiftFiles(join(directory, entry.name)) : entry.name.endsWith(".swift") ? [join(directory, entry.name)] : []);
const iosSources = swiftFiles(join(pluginRoot, pluginPackage.capacitor?.ios?.src ?? "ios"));
const nativeSource = iosSources.map(file => readFileSync(file, "utf8")).join("\n");

it("cap sync discovers the RevenueCat native class, so the iOS bridge registers it", async () => {
  const { findPluginClasses } = require("@capacitor/cli/dist/util/iosplugin.js") as { findPluginClasses: (files: string[]) => Promise<string[]> };
  expect(await findPluginClasses(iosSources)).toContain("PurchasesPlugin");
  // An include list would silently drop plugins from packageClassList.
  expect(JSON.stringify(config)).not.toContain("includePlugins");
});

it("every SDK call the app makes is a declared native method of the same JS plugin name", () => {
  expect(nativeSource).toMatch(/public let jsName = "Purchases"/);
  const js = readFileSync(join(pluginRoot, "dist/esm/index.js"), "utf8");
  expect(js).toMatch(/registerPlugin\('Purchases'/);
  const used = ["isConfigured", "isAnonymous", "configure", "logIn", "logOut", "getOfferings", "purchasePackage", "restorePurchases", "addCustomerInfoUpdateListener", "removeCustomerInfoUpdateListener"];
  for (const method of used) expect(nativeSource, method).toMatch(new RegExp(`CAPPluginMethod\\(name: "${method}"`));
});

it("the custom bridge controller keeps Capacitor's automatic plugin registration", () => {
  const controller = readFileSync(join(mobile, "ios-assets/QualificationBridgeViewController.swift"), "utf8");
  // Overriding these would stop packageClassList plugins (RevenueCat, Preferences, Browser…) from loading.
  expect(controller).not.toMatch(/autoRegisterPlugins|instanceDescriptor\(\)|override func loadView/);
  expect(controller).toMatch(/override func capacitorDidLoad\(\)/);
  const configure = readFileSync(join(mobile, "scripts/configure-ios.rb"), "utf8");
  // configure-ios.rb rewrites capacitor.config.json; it must keep packageClassList.
  expect(configure).toMatch(/config = JSON\.parse\(File\.read\(config_path\)\)\r?\nconfig\['appId'\] = bundle_id\r?\nFile\.write/);
  expect(configure).toMatch(/com\.apple\.InAppPurchase/);
});
