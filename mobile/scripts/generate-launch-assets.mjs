import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

// Launch screen + bundled splash art: the round studying Chihuahua that the web
// header already uses (public/brand/chihuahua-icon-512.png), cut to its circle so
// it sits on the web home's paper colour without white corners. No new artwork.
// Run on any OS: node mobile/scripts/generate-launch-assets.mjs
const at = (path) => fileURLToPath(new URL(path, import.meta.url));
const source = at("../../public/brand/chihuahua-icon-512.png");
const metadata = await sharp(source).metadata();
if (metadata.width !== 512 || metadata.height !== 512) throw new Error("Expected the 512px brand Chihuahua icon.");
// The navy ring reaches the image edge; keep it whole with an anti-aliased mask.
const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><circle cx="256" cy="256" r="254.5" fill="#fff"/></svg>`);
const round = await sharp(source).ensureAlpha().composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();

/** Logical size shared by LaunchScreen.storyboard and the bundled splash (index.html). */
const LAUNCH_ART_POINTS = 120;
const imageset = at("../ios-assets/LaunchChihuahua.imageset/");
await mkdir(imageset, { recursive: true });
const images = [];
for (const scale of [1, 2, 3]) {
  const filename = scale === 1 ? "LaunchChihuahua.png" : `LaunchChihuahua@${scale}x.png`;
  const pixels = LAUNCH_ART_POINTS * scale;
  await sharp(round).resize(pixels, pixels, { kernel: "lanczos3" })
    .png({ compressionLevel: 9, palette: true, quality: 90, effort: 10 }).toFile(`${imageset}${filename}`);
  images.push({ idiom: "universal", filename, scale: `${scale}x` });
}
await writeFile(`${imageset}Contents.json`, `${JSON.stringify({ images, info: { author: "xcode", version: 1 } }, null, 2)}\n`);
await mkdir(at("../src/assets/"), { recursive: true });
await sharp(round).resize(LAUNCH_ART_POINTS * 3, LAUNCH_ART_POINTS * 3, { kernel: "lanczos3" })
  .webp({ quality: 82, alphaQuality: 90, effort: 6 }).toFile(at("../src/assets/launch-chihuahua.webp"));
console.log("Generated LaunchChihuahua.imageset (1x/2x/3x) and src/assets/launch-chihuahua.webp.");
