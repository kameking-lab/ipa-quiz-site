// Launch screen + boot splash contract. Pure Node (no Ruby/Xcode): the storyboard,
// asset catalog entries and bundled splash must agree on colour, art and position,
// and ios:prepare must replace Capacitor's white template with them.
import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { installLaunchScreen, LAUNCH_ASSET_SETS } from "./install-launch-screen.mjs";

const mobile = fileURLToPath(new URL("../", import.meta.url));
const read = (path) => readFileSync(join(mobile, path), "utf8");
const sharp = createRequire(import.meta.url)("sharp");
const PAPER = { light: "#f7f3e9", dark: "#1b241e" };
const hex = (components) => `#${["red", "green", "blue"].map((key) => components[key].slice(2).toLowerCase()).join("")}`;

test("launch screen uses the web home's paper colour and the round Chihuahua, not Capacitor's template", () => {
  const storyboard = read("ios-assets/LaunchScreen.storyboard");
  assert.match(storyboard, /launchScreen="YES"/);
  assert.match(storyboard, /<color key="backgroundColor" name="LaunchBackground"\/>/);
  assert.match(storyboard, /image="LaunchChihuahua"/);
  assert.doesNotMatch(storyboard, /image="Splash"|systemBackgroundColor|<label /, "no template image, white system colour or text");
  // 120pt art centred horizontally, 40pt above the vertical centre (index.html mirrors this).
  assert.match(storyboard, /firstAttribute="width" constant="120"/);
  assert.match(storyboard, /firstAttribute="height" constant="120"/);
  assert.match(storyboard, /firstAttribute="centerX" secondItem="KkL-sp-Vw1" secondAttribute="centerX"/);
  assert.match(storyboard, /firstAttribute="centerY" secondItem="KkL-sp-Vw1" secondAttribute="centerY" constant="-40"/);
  const ids = [...storyboard.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, "storyboard object IDs must be unique");
  for (const tag of ["document", "scenes", "scene", "objects", "viewController", "view", "subviews", "imageView", "constraints", "resources", "namedColor"]) {
    assert.equal((storyboard.match(new RegExp(`<${tag}[ >]`, "g")) ?? []).length, (storyboard.match(new RegExp(`</${tag}>`, "g")) ?? []).length, `<${tag}> balanced`);
  }
});

test("the launch colour set has the web home's light and dark paper colours", () => {
  const { colors } = JSON.parse(read("ios-assets/LaunchBackground.colorset/Contents.json"));
  const light = colors.find((entry) => !entry.appearances);
  const dark = colors.find((entry) => entry.appearances?.some((item) => item.appearance === "luminosity" && item.value === "dark"));
  assert.equal(hex(light.color.components), PAPER.light);
  assert.equal(hex(dark.color.components), PAPER.dark);
  const css = read("../app/home-study.css");
  assert.match(css, /\.study-home \{ --study-paper:#f7f3e9;/);
  assert.match(css, /\.dark \.study-home \{ --study-paper:#1b241e;/);
  const storyboard = read("ios-assets/LaunchScreen.storyboard");
  assert.match(storyboard, /red="0\.96862745098039216" green="0\.95294117647058818" blue="0\.9137254901960784"/);
  assert.match(read("ios-assets/QualificationBridgeViewController.swift"), /UIColor\(named: "LaunchBackground"\)/);
});

test("launch art is small, round (transparent corners) and complete at 1x/2x/3x", async () => {
  const { images } = JSON.parse(read("ios-assets/LaunchChihuahua.imageset/Contents.json"));
  assert.deepEqual(images.map((image) => image.scale), ["1x", "2x", "3x"]);
  let bytes = 0;
  for (const image of images) {
    const file = join(mobile, "ios-assets/LaunchChihuahua.imageset", image.filename);
    const pixels = 120 * Number(image.scale[0]);
    const metadata = await sharp(file).metadata();
    assert.equal(metadata.format, "png");
    assert.equal(metadata.width, pixels);
    assert.equal(metadata.height, pixels);
    assert.equal(metadata.hasAlpha, true);
    const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    assert.equal(data[3], 0, `${image.filename}: corner must be transparent`);
    assert.equal(data[((info.height >> 1) * info.width + (info.width >> 1)) * 4 + 3], 255, `${image.filename}: centre opaque`);
    bytes += readFileSync(file).length;
  }
  assert.ok(bytes < 150_000, `launch art total ${bytes} bytes`);
  const splash = join(mobile, "src/assets/launch-chihuahua.webp");
  const metadata = await sharp(splash).metadata();
  assert.equal(metadata.format, "webp");
  assert.equal(metadata.width, 360);
  assert.ok(readFileSync(splash).length < 40_000, "boot splash art stays small");
});

test("index.html paints the same art and colour before any script runs", () => {
  const html = read("index.html");
  const root = html.match(/<div id="root">([\s\S]*?)<\/div><script/);
  assert.ok(root, "boot splash lives inside #root so React replaces it");
  assert.match(root[1], /class="boot-splash"/);
  assert.match(root[1], /src="\.\/src\/assets\/launch-chihuahua\.webp" width="120" height="120"/);
  assert.match(root[1], /過去問AI/);
  assert.doesNotMatch(root[1], /<button|<a /, "no buttons or links on the loading screen");
  assert.match(html, /\.boot-splash \{ position: fixed; inset: 0; z-index: 70; background: #f7f3e9;/);
  assert.match(html, /\.boot-splash-art \{ position: absolute; left: 50%; top: 50%; width: 120px; height: 120px; margin: -100px 0 0 -60px;/, "centre 40px above the middle, like the storyboard");
  assert.match(html, /prefers-color-scheme: dark\) \{\s*\.boot-splash \{ background: #1b241e;/);
  assert.match(html, /prefers-reduced-motion: reduce/);
  // Above the native-app status-bar band (app/globals.css body::before, z-index 60).
  assert.match(read("../app/globals.css"), /html\.native-app body::before \{[^}]*z-index: 60;/);
  const main = read("src/main.tsx");
  assert.match(main, /if \(await shouldOpenWebHome\(\)\) \{ await openWebHome\(\); return; \}/, "online launch keeps the boot splash up");
});

test("ios:prepare replaces Capacitor's template launch screen and is idempotent", async (t) => {
  const app = mkdtempSync(join(tmpdir(), "kakomon-launch-test-"));
  t.after(() => rmSync(app, { recursive: true, force: true }));
  mkdirSync(join(app, "Base.lproj"), { recursive: true });
  mkdirSync(join(app, "Assets.xcassets/Splash.imageset"), { recursive: true });
  mkdirSync(join(app, "Assets.xcassets/AppIcon.appiconset"), { recursive: true });
  mkdirSync(join(app, "Assets.xcassets/LaunchChihuahua.imageset"), { recursive: true });
  writeFileSync(join(app, "Base.lproj/LaunchScreen.storyboard"), '<imageView image="Splash"><color systemColor="systemBackgroundColor"/></imageView>');
  writeFileSync(join(app, "Assets.xcassets/Splash.imageset/splash-2732x2732.png"), "capacitor logo");
  writeFileSync(join(app, "Assets.xcassets/AppIcon.appiconset/Contents.json"), "{}");
  writeFileSync(join(app, "Assets.xcassets/LaunchChihuahua.imageset/stale.png"), "stale");
  for (let run = 0; run < 2; run++) {
    await installLaunchScreen(app);
    assert.equal(readFileSync(join(app, "Base.lproj/LaunchScreen.storyboard"), "utf8"), read("ios-assets/LaunchScreen.storyboard"));
    assert.equal(existsSync(join(app, "Assets.xcassets/Splash.imageset")), false, "template Splash image removed");
    assert.equal(existsSync(join(app, "Assets.xcassets/AppIcon.appiconset/Contents.json")), true, "other assets untouched");
    for (const set of LAUNCH_ASSET_SETS) {
      assert.deepEqual(readdirSync(join(app, "Assets.xcassets", set)).sort(), readdirSync(join(mobile, "ios-assets", set)).sort(), set);
    }
  }
  assert.match(read("scripts/prepare-ios.mjs"), /await installLaunchScreen\(/);
});
