/** Deterministic release projection. Reviewed manuscripts remain unchanged. */
import { createHash } from "node:crypto";
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { extname, resolve } from "node:path";
import { KENCHIKUSHI1_CANDIDATES } from "../data/qualification-staging/kenchikushi1";
import type { Question } from "../lib/questions/types";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "data/questions/batch2");
mkdirSync(output, { recursive: true });
const assets: Record<string, { url: string; sha256: string }> = {};
function asset(path: string): string {
  const source = resolve(root, path);
  if (!source.startsWith(resolve(root, "data/qualification-staging/kenchikushi1") + "/") &&
      !source.startsWith(resolve(root, "data/qualification-staging/kenchikushi1") + "\\")) {
    throw new Error(`Unexpected source asset: ${path}`);
  }
  const sha256 = createHash("sha256").update(readFileSync(source)).digest("hex");
  const url = `/images/questions/batch2/${sha256}${extname(path).toLowerCase()}`;
  const target = resolve(root, "public", url.slice(1));
  mkdirSync(resolve(target, ".."), { recursive: true });
  copyFileSync(source, target);
  assets[path] = { url, sha256 };
  return url;
}
const excluded = KENCHIKUSHI1_CANDIDATES.filter(q => q.officialScoring);
const questions: Question[] = KENCHIKUSHI1_CANDIDATES.filter(q => !q.officialScoring).map(q => ({
  ...q,
  publicAllowed: true,
  needsReview: false,
  imageUrls: q.imageUrls?.map(asset),
  choiceImageUrls: q.choiceImageUrls && Object.fromEntries(Object.entries(q.choiceImageUrls).map(([key, path]) => [key, asset(path)])),
}));
if (questions.length !== 249 || excluded.length !== 1) throw new Error("Unexpected architect scope");
writeFileSync(resolve(output, "kenchikushi1.json"), JSON.stringify(questions, null, 2) + "\n");
// The reviewed chemistry corpus already uses allowlisted server image URLs.
const chemistry = readFileSync(resolve(root, "data/questions/khk-kagaku/ready.json"));
writeFileSync(resolve(root, "data/questions/khk-kagaku/public-questions.json"), chemistry);
mkdirSync(resolve(root, "reports/int5-20261104"), { recursive: true });
writeFileSync(resolve(root, "reports/int5-20261104/projection-receipt.json"), JSON.stringify({
  architect: { originals: 250, exercises: questions.length, excluded: excluded.map(q => ({ id: q.id, reason: q.officialScoring!.reason })) },
  chemistry: { originals: 422, sha256: createHash("sha256").update(chemistry).digest("hex") },
  assets,
}, null, 2) + "\n");
console.log(JSON.stringify({ architect: questions.length, excluded: excluded.length, images: Object.keys(assets).length, chemistry: 422 }));
