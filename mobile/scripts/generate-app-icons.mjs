import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

// Run on any OS; ios:prepare copies this catalog into the native project on Mac.
const source = new URL("../ios-assets/icon-1024.png", import.meta.url);
const output = new URL("../ios-assets/AppIcon.appiconset/", import.meta.url);
const metadata = await sharp(fileURLToPath(source)).metadata();
if (metadata.format !== "png" || metadata.width !== 1024 || metadata.height !== 1024 || metadata.hasAlpha) {
  throw new Error("App icon must be a 1024x1024 opaque PNG without an alpha channel.");
}
const images = [];
const add = (idiom, size, scales) => {
  for (const scale of scales) {
    const pixels = size * scale;
    images.push({ idiom, size: `${size}x${size}`, scale: `${scale}x`, filename: `AppIcon-${pixels}.png` });
  }
};
for (const size of [20, 29, 40, 60]) add("iphone", size, [2, 3]);
for (const size of [20, 29, 40, 76]) add("ipad", size, [1, 2]);
add("ipad", 83.5, [2]);
add("ios-marketing", 1024, [1]);
await mkdir(output, { recursive: true });
for (const pixels of new Set(images.map((entry) => Number(entry.size.split("x")[0]) * Number(entry.scale[0])))) {
  await sharp(fileURLToPath(source)).resize(pixels, pixels, { kernel: "lanczos3" })
    .removeAlpha().png().toFile(fileURLToPath(new URL(`AppIcon-${pixels}.png`, output)));
}
await writeFile(new URL("Contents.json", output), `${JSON.stringify({ images, info: { author: "xcode", version: 1 } }, null, 2)}\n`);
console.log(`Generated ${images.length} AppIcon slots (iPhone, iPad, App Store).`);
