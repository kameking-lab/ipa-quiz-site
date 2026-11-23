// Decode every committed image and require a hash-bound manual visual review.
import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
import { checkImages } from './asc_image_check.mjs';

export async function checkRepository(root = fileURLToPath(new URL('../', import.meta.url))) {
  const { sets } = JSON.parse(await readFile(path.join(root, 'asc/listing-screenshots.json'), 'utf8'));
  const directory = path.join(root, 'fastlane/screenshots/ja');
  const manifest = JSON.parse(await readFile(path.join(directory, '../manifest.json'), 'utf8'));
  const expected = sets.flatMap(({ files, width, height }) => files.map(file => ({ file, width, height })));
  const names = (await readdir(directory)).sort();
  if (JSON.stringify(names) !== JSON.stringify(expected.map(entry => entry.file).sort())) throw new Error('Unexpected screenshot set');
  if (manifest.images?.length !== expected.length || new Set(manifest.images.map(e => e.file)).size !== expected.length) throw new Error('Invalid manifest image set');
  if (manifest.authentication !== 'anonymous' || manifest.quota_grants !== 0) throw new Error('Require anonymous quota-free provenance');
  for (const { file, width, height } of expected) {
    const evidence = manifest.images.find(e => e.file === file);
    const screenshot = path.join(directory, file);
    const bytes = await readFile(screenshot);
    if (evidence?.sha256 !== createHash('sha256').update(bytes).digest('hex')) throw new Error(`Hash mismatch: ${file}`);
    const review = evidence.visual_review;
    if (review?.status !== 'approved' || !review.reviewed_at ||
      !['readable_japanese', 'no_loading', 'no_empty_ad_slot', 'no_personal_information'].every(key => review[key] === true)) {
      throw new Error(`Manual visual review required: ${file}`);
    }
    const metadata = await sharp(bytes, { failOn: 'warning' }).metadata();
    if (metadata.format !== 'png' || metadata.channels !== 3 || metadata.depth !== 'uchar' ||
      metadata.hasAlpha || metadata.width !== width || metadata.height !== height) {
      throw new Error(`Wrong format/size: ${file}`);
    }
    await sharp(bytes, { failOn: 'warning' }).raw().toBuffer();
    if (!(await checkImages(screenshot, width, height)).accepted) throw new Error(`Blank image: ${file}`);
  }
  console.log(`ASC repository screenshot decode, dimensions, SHA-256, content and visual-review validation PASS (${expected.length} images)`);
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await checkRepository();
