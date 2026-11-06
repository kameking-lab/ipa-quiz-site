import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

// Distribution derivatives only. Accepted design originals and rejection/QA
// records are untouched; planned items are never published by this compiler.
const root = path.resolve('design/pet-v1');
const manifest = JSON.parse(await fs.readFile(path.join(root, 'manifest.json'), 'utf8'));
const files = {}, audit = [];
const hash = buffer => createHash('sha256').update(buffer).digest('hex');
async function publish(id, source, expected) {
  assert.match(id, /^[a-z0-9-]+$/);
  const original = await fs.readFile(source);
  if (expected) assert.equal(hash(original), expected, `Source checksum: ${id}`);
  const output = await sharp(original).resize(256, 256, { fit: 'contain', background: '#00000000' }).webp({ quality: 80, effort: 4 }).toBuffer();
  const destination = `public/images/pet-v1/${id}.webp`;
  await fs.writeFile(destination, output);
  files[id] = `/images/pet-v1/${id}.webp`;
  audit.push({ id, source: path.relative(process.cwd(), source).split(path.sep).join('/'), sourceSha256: hash(original), outputSha256: hash(output), bytes: output.length, width: 256, height: 256 });
}
await fs.mkdir('public/images/pet-v1', { recursive: true });
for (const item of manifest.items.filter(item => item.status === 'accepted')) {
  const source = path.resolve(root, item.webp);
  assert.ok(source.startsWith(root + path.sep));
  await publish(item.id, source, item.webpSha256);
}
// ANIM2's adopted static key poses preserve the takken outfit until its v1
// stage art is produced. Motion is a bounded CSS gesture, not a looping video.
for (const state of ['correct', 'incorrect', 'revealed'])
  await publish(`takken-anim-${state}`, `design/answer-reactions-20261105/per-exam/posters/takken-${state}.png`);
await publish('takken-anim-study', 'design/answer-reactions-20261105/per-exam/reference/takken-study.png');
await fs.writeFile('lib/pet/v1/art.generated.json', JSON.stringify(files, null, 2) + '\n');
await fs.writeFile('lib/pet/v1/art-audit.generated.json', JSON.stringify({ accepted: manifest.items.filter(item => item.status === 'accepted').length,
  planned: manifest.items.filter(item => item.status === 'planned').length, note: '256px WebP distribution derivatives; accepted design originals retained.', files: audit }, null, 2) + '\n');
console.log(`Published ${audit.length} bounded 256px assets from accepted originals and ANIM2 poses.`);
