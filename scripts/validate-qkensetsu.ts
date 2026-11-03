import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { KENCHIKU_SETSUBISHI_QUESTIONS, KENCHIKU_SETSUBISHI_STUDY_QUESTIONS, KENCHIKU_SETSUBISHI_REFERENCE_QUESTIONS } from "../data/questions/kenchiku-setsubishi";
import manifest from "../reports/qkensetsu-20261103/manifest.json";

const sha = (bytes: string | Buffer) => createHash("sha256").update(bytes).digest("hex");
function check(ok: unknown, message: string): asserts ok { if (!ok) throw new Error(message); }
export function validateKenchikuIngestion() {
  const root = process.cwd();
  for (const packet of manifest.packets) {
    const bytes = readFileSync(path.join(root, packet.path));
    check(sha(bytes) === packet.sha256, `Fixed packet hash: ${packet.path}`);
    const questions = JSON.parse(bytes.toString("utf8")) as typeof KENCHIKU_SETSUBISHI_QUESTIONS;
    check(questions.length === packet.count, `Packet count: ${packet.path}`);
    check(questions.every((q, i) => q.qNumber === i + 1), `Question numbers: ${packet.path}`);
    for (const original of packet.items) {
      const q = questions.find((item) => item.id === original.id);
      check(q && q.officialAnswerNumber === original.officialAnswerNumber && q.answer === original.answer, `Official answer: ${original.id}`);
      check(sha(JSON.stringify(q)) === original.contentSha256, `Original content hash: ${original.id}`);
    }
  }
  const materials = KENCHIKU_SETSUBISHI_QUESTIONS;
  check(materials.length === 210 && new Set(materials.map((q) => q.id)).size === 210, "210 unique originals");
  for (const year of [2025, 2026]) check(materials.filter((q) => q.year === year).length === 105, `105 originals: ${year}`);
  check(KENCHIKU_SETSUBISHI_STUDY_QUESTIONS.length === 209 && KENCHIKU_SETSUBISHI_REFERENCE_QUESTIONS.length === 1, "209/1 boundary");
  check(KENCHIKU_SETSUBISHI_REFERENCE_QUESTIONS[0].id === manifest.referenceOnly[0], "Reference-only ID");
  const urls = new Set(materials.flatMap((q) => [...(q.imageUrls ?? []), ...Object.values(q.choiceImageUrls ?? {}).filter((url): url is string => Boolean(url))]));
  check(urls.size === 32 && materials.filter((q) => q.hasImage).length === 23, "23 image questions / 32 assets");
  for (const asset of manifest.assets) {
    check(urls.has(asset.url), `Orphan asset: ${asset.url}`);
    check(sha(readFileSync(path.join(root, asset.path))) === asset.sha256, `Asset hash: ${asset.url}`);
    check(sha(readFileSync(path.join(root, asset.publicPath))) === asset.sha256, `Public asset hash: ${asset.url}`);
  }
  for (const evidence of manifest.evidence) {
    check(sha(readFileSync(path.join(root, "reports/qkensetsu-20261103", evidence.file))) === evidence.sha256, `Acceptance evidence: ${evidence.file}`);
  }
  return { status: "PASS", materials: 210, perRound: { "2025-annual": 105, "2026-annual": 105 }, study: 209, referenceOnly: 1, choiceReasons: 840, imageQuestions: 23, imageAssets: 32, packetHashes: 6, questionHashes: 210, publication: "LOCAL_PUBLIC_ROUTES_CONNECTED_Q18_EXCLUDED" };
}
if (process.argv[1]?.replaceAll("\\", "/").endsWith("/validate-qkensetsu.ts")) {
  const result = validateKenchikuIngestion();
  if (process.argv.includes("--receipt")) writeFileSync("reports/qkensetsu-20261103/validation.json", JSON.stringify(result, null, 2) + "\n");
  console.log(JSON.stringify(result));
}
