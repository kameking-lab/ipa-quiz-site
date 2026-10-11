import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, resolve } from "node:path";
import { inspectKishoAnswerFields, inspectKishoDraftCoverage, kishoDraftCollectionSchema, verifyKishoOfficialAnswers } from "../lib/kisho/schema";

const args = process.argv.slice(2);
function option(name: string): string | undefined {
  const index = args.indexOf(name);
  return index < 0 ? undefined : args[index + 1];
}
function hash(path: string) { return createHash("sha256").update(readFileSync(path)).digest("hex"); }

const packetPath = option("--packet");
const keysPath = option("--keys");
if (!packetPath || !keysPath) {
  console.error("Usage: pnpm exec tsx scripts/verify-kisho-private.ts --packet <private.json> --keys <official-keys.json> [--output <report.json>] [--expect-complete]");
  process.exit(2);
}
const packetFile = resolve(packetPath);
const packet: unknown = JSON.parse(readFileSync(packetFile, "utf8"));
const records = Array.isArray(packet) ? packet : typeof packet === "object" && packet !== null && "questions" in packet ? packet.questions : packet;
const parsed = kishoDraftCollectionSchema.safeParse(records);
if (!parsed.success) {
  const report = { packetSha256: hash(packetFile), structuralIssues: parsed.error.issues, publishedOriginals: 0, complete: false };
  const outputPath = option("--output");
  if (outputPath) writeFileSync(resolve(outputPath), JSON.stringify(report, null, 2) + "\n");
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}
const answerIssues = verifyKishoOfficialAnswers(parsed.data, JSON.parse(readFileSync(resolve(keysPath), "utf8")));
function checkImage(id: string, asset: string) {
  if (/^https?:\/\//i.test(asset)) return [{ id, asset, issue: "private図表はローカル参照が必要" }];
  const path = isAbsolute(asset) ? asset : resolve(dirname(packetFile), asset);
  return existsSync(path) ? [] : [{ id, asset, issue: "図表ファイルが未保存" }];
}
const packetFields: unknown = typeof packet === "object" && packet !== null && "answerFields" in packet ? packet.answerFields : [];
const missingImages = [
  ...parsed.data.flatMap((question) => (question.imageUrls ?? []).flatMap((asset) => checkImage(question.id, asset))),
  ...(Array.isArray(packetFields) ? packetFields : []).flatMap((row: unknown) => {
    if (typeof row !== "object" || row === null || !("officialAnswerImageUrl" in row) || typeof row.officialAnswerImageUrl !== "string") return [];
    const id = "questionId" in row && typeof row.questionId === "string" ? row.questionId : "unknown-answer-field";
    return checkImage(id, row.officialAnswerImageUrl);
  }),
];
const coverage = inspectKishoDraftCoverage(parsed.data);
const answerFields = inspectKishoAnswerFields(parsed.data, packetFields);
const report = {
  ...coverage, answerFields, complete: coverage.complete && answerFields.complete && answerIssues.length === 0 && missingImages.length === 0, packetSha256: hash(packetFile), keysSha256: hash(resolve(keysPath)),
  answerIssues, missingImages,
};
const outputPath = option("--output");
if (outputPath) writeFileSync(resolve(outputPath), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
if (answerIssues.length > 0 || missingImages.length > 0 || !answerFields.complete || (args.includes("--expect-complete") && !report.complete)) process.exit(1);
