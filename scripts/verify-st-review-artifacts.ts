import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { ST_QUESTIONS } from "@/data/questions/st";
import { getOfficialAnswerPdfUrl } from "@/lib/exam-config";
import { isStReviewReceiptAccepted, stReviewDigest, type StReviewGateReceipt } from "./lib/st-review-gate";

const MODEL = "claude-opus-5-5";
const dir = join(process.cwd(), "docs/evidence/st-choice-explanations-2024-2025");
const evidenceDir = process.argv.find((value) => value.startsWith("--evidence-dir="))?.slice(15);
if (!evidenceDir) throw new Error("--evidence-dir=<persistent raw artifact directory> is required");
type JsonObject = Record<string, unknown>;
const parse = (text: string): JsonObject => JSON.parse(text) as JsonObject;
const read = (path: string) => readFileSync(path, "utf8");
const ledger = JSON.parse(read(join(dir, "review-receipts.json"))) as {
  evidence: Record<string, { sha256: string; bytes: number }>;
  batches: Record<string, {
    requestedModel: string; canonicalModel: string; provider: string; modelUsage: JsonObject;
    promptHash: string; rawHash: string; promptPath: string; rawPath: string; stderrPath: string; usagePath: string;
  }>;
  questions: Record<string, StReviewGateReceipt & { batch: string; paper: string }>;
};
const targets = ST_QUESTIONS.filter((q) => [2024, 2025].includes(q.year) && q.type === "multiple-choice");
const failures: string[] = [];
const check = (value: boolean, label: string) => { if (!value) failures.push(label); };
const file = (path: string) => ({ path, sha256: stReviewDigest(readFileSync(path)), bytes: readFileSync(path).length });
const batches = Object.entries(ledger.batches).map(([id, batch]) => {
  const raw = read(batch.rawPath);
  const prompt = read(batch.promptPath);
  const envelope = parse(raw);
  const usage = (envelope.modelUsage as Record<string, JsonObject>)[MODEL];
  const valid = envelope.is_error === false && envelope.subtype === "success"
    && batch.requestedModel === MODEL && batch.canonicalModel === MODEL && batch.provider === "firstParty"
    && usage?.canonicalModel === MODEL && usage?.provider === "firstParty"
    && typeof usage.outputTokens === "number" && usage.outputTokens > 0;
  check(valid, `${id}: successful firstParty Opus envelope`);
  check(stReviewDigest(raw) === batch.rawHash, `${id}: raw hash`);
  check(stReviewDigest(prompt) === batch.promptHash, `${id}: prompt hash`);
  check(stReviewDigest(usage) === stReviewDigest(batch.modelUsage), `${id}: modelUsage`);
  check(stReviewDigest(parse(read(batch.usagePath)).usage) === stReviewDigest(usage), `${id}: usage artifact`);
  const inputs = JSON.parse(prompt.slice(prompt.lastIndexOf("入力:\n") + 4)) as Array<JsonObject & { id: string }>;
  const result = JSON.parse((envelope.result as string).replace(/^```(?:json)?\s*|\s*```$/gu, "")) as Record<string, JsonObject>;
  const ids = Object.entries(ledger.questions).filter(([, receipt]) => receipt.batch === id).map(([key]) => key);
  check(new Set(ids.map((key) => ledger.questions[key]!.paper)).size === 1, `${id}: single paper`);
  for (const key of ids) {
    const receipt = ledger.questions[key]!;
    const input = inputs.find((row) => row.id === key);
    const row = result[key];
    check(Boolean(input && row), `${key}: prompt and raw result presence`);
    if (!input || !row) continue;
    check(stReviewDigest(input.candidateChoiceExplanations) === receipt.candidateHash, `${key}: actual prompt candidate hash`);
    check(stReviewDigest({
      question: input.question, choices: input.choices, officialAnswer: input.officialAnswer,
      existingNarrative: input.existingNarrative, hasImage: input.hasImage, imageUrls: input.imageUrls,
    }) === receipt.inputHash, `${key}: actual prompt input hash`);
    check(row.status === receipt.status && stReviewDigest(row.issues) === stReviewDigest(receipt.issues), `${key}: actual raw verdict`);
    check(stReviewDigest(row.choiceExplanations) === receipt.acceptedHash, `${key}: actual raw accepted hash`);
  }
  return { id, questionIds: ids, valid, modelUsage: usage, prompt: file(batch.promptPath), raw: file(batch.rawPath), stderr: file(batch.stderrPath), usage: file(batch.usagePath) };
});
let accepted = 0;
for (const q of targets) {
  const receipt = ledger.questions[q.id];
  const sources = [...new Set([q.sourcePdfUrl, getOfficialAnswerPdfUrl(q.sourcePdfUrl, q.sourceAnswerUrl), ...(q.officialReferenceUrls ?? [])])].sort();
  const good = isStReviewReceiptAccepted(receipt, {
    input: { question: q.question, choices: q.choices ?? {}, officialAnswer: q.answer, existingNarrative: q.explanation, hasImage: q.hasImage, imageUrls: q.imageUrls ?? [] },
    candidateHash: stReviewDigest(q.choiceExplanations),
    evidenceHash: stReviewDigest(sources.map((url) => ({ url, sha256: ledger.evidence[url]?.sha256 }))),
    mixedBatch: false, batchValid: batches.some((batch) => batch.id === receipt?.batch && batch.valid),
  });
  if (good) accepted += 1;
  check(good, `${q.id}: current-input PASS/issues0/candidate/accepted gate`);
}
const sources = Object.entries(ledger.evidence).map(([url, evidence]) => {
  const artifact = file(join(evidenceDir, "sources", url.split("/").at(-1)!));
  check(artifact.sha256 === evidence.sha256 && artifact.bytes === evidence.bytes, `${url}: original PDF bytes`);
  return { url, ...artifact };
});
const assets = targets.flatMap((q) => (q.imageUrls ?? []).map((url) => ({ questionId: q.id, ...file(join(process.cwd(), "public", url)) })));
check(targets.length === 110 && accepted === 110 && sources.length === 8 && assets.length === 18, "complete expected audit scope");
const archive = join(evidenceDir, "invalidated-initial-receipts.json");
const allArtifacts = readdirSync(evidenceDir).filter((name) => /\.(?:json|txt)$/u.test(name)).map((name) => file(join(evidenceDir, name)));
const rawEnvelopes = allArtifacts.filter((artifact) => artifact.path.endsWith(".raw.json")).map((artifact) => parse(read(artifact.path)));
const realModelUsage = rawEnvelopes.reduce<{
  successfulCalls: number; inputTokens: number; outputTokens: number;
  cacheReadInputTokens: number; cacheCreationInputTokens: number; costUSD: number;
}>((totals, envelope) => {
  const usage = (envelope.modelUsage as Record<string, JsonObject> | undefined)?.[MODEL];
  if (envelope.is_error !== false || usage?.canonicalModel !== MODEL || usage.provider !== "firstParty") return totals;
  totals.successfulCalls += 1;
  for (const key of ["inputTokens", "outputTokens", "cacheReadInputTokens", "cacheCreationInputTokens", "costUSD"] as const) {
    totals[key] += typeof usage[key] === "number" ? usage[key] : 0;
  }
  return totals;
}, { successfulCalls: 0, inputTokens: 0, outputTokens: 0, cacheReadInputTokens: 0, cacheCreationInputTokens: 0, costUSD: 0 });
const validationDir = join(evidenceDir, "validation");
const validation = existsSync(validationDir) ? readdirSync(validationDir).map((name) => file(join(validationDir, name))) : [];
const manifest = {
  auditedAt: new Date().toISOString(), initialHead: "b57493505156ea5d84bf74410258fba3fe7c0a2f",
  publicationGate: failures.length === 0, totalQuestions: targets.length, totalChoices: targets.reduce((n, q) => n + Object.keys(q.choices ?? {}).length, 0),
  accepted, pending: targets.length - accepted, failures,
  invalidatedInitialReceipts: existsSync(archive) ? { reason: "Original raw envelopes missing; all prior receipts invalidated and rereviewed.", ...file(archive) } : null,
  content: ["data/questions/st/choice-explanations-2024-2025.json", ...[2024, 2025].flatMap((year) => [1, 2].map((session) => `data/questions/st/by-year/${year}-spring-am${session}.ts`))].map(file),
  sources, assets, batches, allArtifacts, realModelUsage, validation,
};
writeFileSync(join(dir, "independent-audit-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify({ publicationGate: manifest.publicationGate, accepted, pending: manifest.pending, failures, sources: sources.length, assets: assets.length, batches: batches.length }, null, 2));
if (failures.length > 0) process.exitCode = 1;
