import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { SC_QUESTIONS } from "@/data/questions/sc";
import { getOfficialAnswerPdfUrl } from "@/lib/exam-config";
import type { ChoiceKey, Question } from "@/lib/questions/types";

const ROOT = process.cwd();
const MODEL = "claude-opus-5-5";
const OVERLAY_PATH = join(ROOT, "data", "questions", "sc", "choice-explanations-2024-2025.json");
const RECEIPT_PATH = join(ROOT, "docs", "evidence", "sc-choice-explanations-2024-2025", "review-receipts.json");
const LOG_ROOT = join(ROOT, "logs", "sc-choice-explanations-2024-2025");
const YEARS = new Set([2024, 2025]);
const CORRECTED_INPUT_IDS = new Set([
  "sc-2024h-am1-q3",
  "sc-2024h-am2-q7",
  "sc-2024h-am2-q24",
  "sc-2025h-am1-q5",
  "sc-2025h-am1-q6",
  "sc-2025h-am1-q11",
  "sc-2025a-am1-q7",
  "sc-2024a-am1-q10",
  "sc-2024a-am1-q24",
  "sc-2024a-am1-q28",
  "sc-2024h-am1-q6",
  "sc-2024h-am1-q7",
  "sc-2024h-am1-q18",
  "sc-2024h-am1-q19",
  "sc-2024h-am1-q29",
  "sc-2025a-am1-q6",
  "sc-2025a-am1-q14",
  "sc-2025a-am1-q27",
  "sc-2025a-am2-q22",
]);
const CHOICE_KEYS: ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "コ"];

type ChoiceReasons = Partial<Record<ChoiceKey, string>>;
type Overlay = Record<string, ChoiceReasons>;
interface ReviewRow {
  status: "PASS" | "FIX";
  issues: string[];
  choiceExplanations: ChoiceReasons;
}
type ReviewResult = Record<string, ReviewRow>;
interface ModelUsage {
  inputTokens?: number;
  outputTokens?: number;
  cacheReadInputTokens?: number;
  cacheCreationInputTokens?: number;
  webSearchRequests?: number;
  costUSD?: number;
  canonicalModel?: string;
  provider?: string;
  [key: string]: unknown;
}
interface BatchReceipt {
  requestedModel: string;
  canonicalModel: string;
  provider: string;
  modelUsage: ModelUsage;
  promptHash: string;
  rawHash: string;
  reviewedAt: string;
}
interface QuestionReceipt {
  paper: string;
  batch: string;
  status: "PASS" | "FIX";
  issues: string[];
  inputHash: string;
  candidateHash: string;
  evidenceHash: string;
  acceptedHash: string;
  officialQuestionUrl: string;
  officialAnswerUrl: string;
}
interface EvidenceReceipt {
  sha256: string;
  bytes: number;
  retrievedAt: string;
}
interface ReceiptLedger {
  version: 1;
  scope: { exam: "sc"; years: number[]; totalQuestions: number; totalChoices: number };
  evidence: Record<string, EvidenceReceipt>;
  batches: Record<string, BatchReceipt>;
  questions: Record<string, QuestionReceipt>;
}
interface PromptInput {
  id: string;
  question: string;
  choices: Record<string, string>;
  officialAnswer: string | string[];
  existingNarrative: string;
  hasImage: boolean;
  imageUrls: string[];
  candidateChoiceExplanations: ChoiceReasons;
}

function digest(value: unknown): string {
  const input = typeof value === "string" || Buffer.isBuffer(value)
    ? value
    : JSON.stringify(value);
  return createHash("sha256").update(input).digest("hex");
}

function readJson<T>(path: string, fallback: T): T {
  return existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) as T : fallback;
}

function writeJson(path: string, value: unknown): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function option(name: string): string | undefined {
  return process.argv.slice(2).find((arg) => arg.startsWith(`--${name}=`))?.split("=").slice(1).join("=");
}

function paper(question: Question): string {
  return `${question.year}/${question.season}/${question.session}`;
}

function answerSet(question: Question): Set<ChoiceKey> {
  const values = Array.isArray(question.answer) ? question.answer : [question.answer];
  return new Set(values.filter((value): value is ChoiceKey => CHOICE_KEYS.includes(value as ChoiceKey)));
}

function choiceKeys(question: Question): ChoiceKey[] {
  return Object.keys(question.choices ?? {}).filter((key): key is ChoiceKey => CHOICE_KEYS.includes(key as ChoiceKey));
}

function validateReasons(question: Question, reasons: ChoiceReasons): void {
  const expected = choiceKeys(question).sort();
  const actual = Object.keys(reasons).sort();
  if (expected.join(",") !== actual.join(",")) throw new Error(`choice keys differ: ${question.id}`);
  const correct = answerSet(question);
  for (const key of expected) {
    const reason = reasons[key]?.trim() ?? "";
    const prefix = correct.has(key) ? "正しいです。" : "誤りです。";
    if (reason.length < 55 || !reason.startsWith(prefix)) {
      throw new Error(`invalid reason: ${question.id}/${key}`);
    }
  }
}

function sourceUrls(question: Question): string[] {
  return [...new Set([
    question.sourcePdfUrl,
    getOfficialAnswerPdfUrl(question.sourcePdfUrl, question.sourceAnswerUrl),
    ...(question.officialReferenceUrls ?? []),
  ].filter((url): url is string => url.startsWith("https://")))].sort();
}

async function fetchEvidence(url: string): Promise<EvidenceReceipt> {
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok) throw new Error(`official evidence unavailable: ${response.status} ${url}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  return { sha256: digest(bytes), bytes: bytes.length, retrievedAt: new Date().toISOString() };
}

function evidenceHash(question: Question, ledger: ReceiptLedger): string {
  return digest(sourceUrls(question).map((url) => ({ url, sha256: ledger.evidence[url]?.sha256 })));
}

function inputHash(question: Question): string {
  return digest({
    question: question.question,
    choices: question.choices,
    officialAnswer: question.answer,
    existingNarrative: question.explanation,
    hasImage: question.hasImage,
    imageUrls: question.imageUrls ?? [],
  });
}

function legacyInputHash(question: Question): string {
  return digest({ question: question.question, choices: question.choices, officialAnswer: question.answer });
}

function inputHashMatches(question: Question, recordedHash: string): boolean {
  if (recordedHash === inputHash(question)) return true;
  return !CORRECTED_INPUT_IDS.has(question.id) && recordedHash === legacyInputHash(question);
}

function parsePromptInput(prompt: string): PromptInput[] {
  const marker = "入力:\n";
  const offset = prompt.lastIndexOf(marker);
  if (offset < 0) throw new Error("legacy prompt input missing");
  return JSON.parse(prompt.slice(offset + marker.length)) as PromptInput[];
}

function envelopeMetadata(raw: string): { usage: ModelUsage; canonicalModel: string; provider: string } {
  const envelope = JSON.parse(raw) as { modelUsage?: Record<string, ModelUsage> };
  const usage = envelope.modelUsage?.[MODEL];
  if (!usage) throw new Error(`raw receipt does not prove requested model ${MODEL}`);
  if (usage.canonicalModel !== MODEL) throw new Error(`canonical model mismatch: ${String(usage.canonicalModel)}`);
  if (typeof usage.provider !== "string" || usage.provider.length === 0) throw new Error("provider missing");
  return { usage, canonicalModel: usage.canonicalModel, provider: usage.provider };
}

function importLegacyReceipts(
  legacyRoot: string,
  questions: Map<string, Question>,
  overlay: Overlay,
  ledger: ReceiptLedger,
): number {
  if (!existsSync(legacyRoot)) throw new Error(`legacy log root missing: ${legacyRoot}`);
  const files = readdirSync(legacyRoot)
    .filter((name) => name.endsWith(".accepted.json"))
    .sort((a, b) => statSync(join(legacyRoot, a)).mtimeMs - statSync(join(legacyRoot, b)).mtimeMs);
  let imported = 0;
  for (const acceptedName of files) {
    const prefix = acceptedName.replace(/\.accepted\.json$/u, "");
    const rawPath = join(legacyRoot, `${prefix}.raw.json`);
    const promptPath = join(legacyRoot, `${prefix}.prompt.txt`);
    if (!existsSync(rawPath) || !existsSync(promptPath)) continue;
    const accepted = readJson<ReviewResult>(join(legacyRoot, acceptedName), {});
    const scIds = Object.keys(accepted).filter((id) => questions.has(id));
    if (scIds.length === 0) continue;
    const raw = readFileSync(rawPath, "utf8");
    const prompt = readFileSync(promptPath, "utf8");
    const metadata = envelopeMetadata(raw);
    const promptRows = new Map(parsePromptInput(prompt).map((row) => [row.id, row]));
    const batchId = `legacy-${prefix}`;
    ledger.batches[batchId] = {
      requestedModel: MODEL,
      canonicalModel: metadata.canonicalModel,
      provider: metadata.provider,
      modelUsage: metadata.usage,
      promptHash: digest(prompt),
      rawHash: digest(raw),
      reviewedAt: statSync(rawPath).mtime.toISOString(),
    };
    for (const id of scIds) {
      const question = questions.get(id)!;
      const review = accepted[id]!;
      const promptRow = promptRows.get(id);
      const current = overlay[id];
      if (!promptRow || !current) continue;
      validateReasons(question, review.choiceExplanations);
      if (digest(current) !== digest(review.choiceExplanations)) continue;
      ledger.questions[id] = {
        paper: paper(question),
        batch: batchId,
        status: review.status,
        issues: review.issues,
        inputHash: digest({
          question: promptRow.question,
          choices: promptRow.choices,
          officialAnswer: promptRow.officialAnswer,
          existingNarrative: promptRow.existingNarrative,
          hasImage: promptRow.hasImage,
          imageUrls: promptRow.imageUrls,
        }),
        candidateHash: digest(promptRow.candidateChoiceExplanations),
        evidenceHash: evidenceHash(question, ledger),
        acceptedHash: digest(review.choiceExplanations),
        officialQuestionUrl: question.sourcePdfUrl,
        officialAnswerUrl: getOfficialAnswerPdfUrl(question.sourcePdfUrl, question.sourceAnswerUrl),
      };
      imported += 1;
    }
  }
  return imported;
}

function makePrompt(batch: Question[]): string {
  const batchPapers = new Set(batch.map(paper));
  if (batchPapers.size !== 1) throw new Error(`AM1/AM2 or paper mixing detected: ${[...batchPapers].join(",")}`);
  return `あなたはIPA情報処理安全確保支援士試験の独立査読者です。候補の全肢解説を公式問題・公式正答と技術一次資料に照らして査読してください。

条件:
- officialAnswerを正本とし、問題文・選択肢・正答を変更しない。
- 午前Iと午前IIは別の問題紙である。入力は単一の年度・季節・区分だけなので、別区分の問題や根拠を混ぜない。
- 正答肢は「正しいです。」、誤答肢は「誤りです。」で始める。各肢固有の理由を55字以上で示し、誤答は何をどう直せば正しいかを説明する。
- 計算、規格、法令、セキュリティ仕様を推測しない。不確かな場合はIPA、NISC、デジタル庁、総務省、経産省、JPCERT/CC、NIST、RFC等の一次資料だけを調査する。
- sourcePdfUrl/sourceAnswerUrlを公式の問題・正答根拠として照合する。図表依存で確認できない場合はPASSにしない。
- PASSでもchoiceExplanationsを全肢返す。FIXなら修正済み全文を返す。
- 出力は純粋なJSONのみ: {"id":{"status":"PASS|FIX","issues":["具体的な問題点"],"choiceExplanations":{"ア":"..."}}}
- ファイル編集・コミットはしない。

入力:\n${JSON.stringify(batch.map((question) => ({
    id: question.id,
    paper: paper(question),
    question: question.question,
    choices: question.choices,
    officialAnswer: question.answer,
    existingNarrative: question.explanation,
    hasImage: question.hasImage,
    candidateChoiceExplanations: question.choiceExplanations,
    sourcePdfUrl: question.sourcePdfUrl,
    sourceAnswerUrl: getOfficialAnswerPdfUrl(question.sourcePdfUrl, question.sourceAnswerUrl),
    officialReferenceUrls: question.officialReferenceUrls ?? [],
    imageUrls: question.imageUrls ?? [],
  })), null, 2)}`;
}

function executable(): string {
  const appData = process.env.APPDATA;
  if (!appData) throw new Error("APPDATA unavailable");
  const path = join(appData, "npm", "node_modules", "@anthropic-ai", "claude-code", "bin", "claude.exe");
  if (!existsSync(path)) throw new Error(`Claude CLI not found: ${path}`);
  return path;
}

function parseReview(content: string, batch: Question[]): ReviewResult {
  const cleaned = content.replace(/^```(?:json)?\s*|\s*```$/gu, "");
  let parsed: unknown;
  for (const match of cleaned.matchAll(/\{/gu)) {
    try { parsed = JSON.parse(cleaned.slice(match.index ?? 0)); break; } catch { /* try next object */ }
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("review JSON missing");
  const result = parsed as ReviewResult;
  const expectedIds = new Set(batch.map((question) => question.id));
  if (Object.keys(result).length !== expectedIds.size || Object.keys(result).some((id) => !expectedIds.has(id))) {
    throw new Error("review IDs differ");
  }
  for (const question of batch) {
    const row = result[question.id];
    if (!row || !["PASS", "FIX"].includes(row.status) || !Array.isArray(row.issues)) throw new Error(`invalid review row: ${question.id}`);
    validateReasons(question, row.choiceExplanations);
    if (row.status === "PASS" && row.issues.length > 0) row.status = "FIX";
    if (row.status === "FIX" && row.issues.length === 0) row.issues.push("独立査読で全肢説明を修正");
  }
  return result;
}

async function reviewBatch(batch: Question[], serial: number): Promise<{
  id: string;
  result: ReviewResult;
  prompt: string;
  raw: string;
  metadata: ReturnType<typeof envelopeMetadata>;
}> {
  const token = digest(batch.map((question) => question.id)).slice(0, 12);
  const id = `${paper(batch[0]!).replaceAll("/", "-")}-${String(serial).padStart(3, "0")}-${token}`;
  const prompt = makePrompt(batch);
  mkdirSync(LOG_ROOT, { recursive: true });
  writeFileSync(join(LOG_ROOT, `${id}.prompt.txt`), prompt, "utf8");
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const raw = await new Promise<string>((resolve, reject) => {
      const child = spawn(executable(), [
        "-p", "--model", MODEL, "--effort", "high", "--output-format", "json",
        "--allowedTools", "Read,Glob,Grep,WebSearch,WebFetch",
        "--tools", "Read,Glob,Grep,WebSearch,WebFetch",
      ], { cwd: ROOT, env: { ...process.env, CLAUDE_CODE_MAX_OUTPUT_TOKENS: "64000" }, stdio: ["pipe", "pipe", "pipe"] });
      let stdout = "";
      let stderr = "";
      child.stdout.setEncoding("utf8").on("data", (chunk) => { stdout += chunk; });
      child.stderr.setEncoding("utf8").on("data", (chunk) => { stderr += chunk; });
      const timeout = setTimeout(() => { child.kill(); reject(new Error(`review timeout: ${id}`)); }, 30 * 60 * 1000);
      child.on("error", reject);
      child.on("close", (code) => {
        clearTimeout(timeout);
        writeFileSync(join(LOG_ROOT, `${id}-a${attempt}.raw.json`), stdout, "utf8");
        writeFileSync(join(LOG_ROOT, `${id}-a${attempt}.stderr.txt`), stderr, "utf8");
        if (code !== 0 || /usage limit|rate limit|hit your limit/iu.test(`${stdout}\n${stderr}`)) reject(new Error(`review unavailable: ${id}`));
        else resolve(stdout);
      });
      child.stdin.end(prompt);
    });
    try {
      const envelope = JSON.parse(raw) as { result?: string };
      if (typeof envelope.result !== "string") throw new Error("review result missing");
      const metadata = envelopeMetadata(raw);
      return { id, result: parseReview(envelope.result, batch), prompt, raw, metadata };
    } catch (error) {
      if (attempt === 3) throw error;
      console.error(`[retry] ${id} attempt=${attempt}`, error);
    }
  }
  throw new Error(`review failed: ${id}`);
}

async function main(): Promise<void> {
  const targets = SC_QUESTIONS.filter((question) => YEARS.has(question.year) && question.type === "multiple-choice" && question.choices);
  const groups = new Map<string, Question[]>();
  for (const question of targets) groups.set(paper(question), [...(groups.get(paper(question)) ?? []), question]);
  const expected = new Map([
    ["2024/spring/am1", 30], ["2024/spring/am2", 25], ["2024/autumn/am1", 30], ["2024/autumn/am2", 25],
    ["2025/spring/am1", 30], ["2025/spring/am2", 25], ["2025/autumn/am1", 30], ["2025/autumn/am2", 25],
  ]);
  if (targets.length !== 220 || groups.size !== expected.size) throw new Error(`unexpected SC scope: ${targets.length}/${groups.size}`);
  for (const [key, count] of expected) if (groups.get(key)?.length !== count) throw new Error(`paper count mismatch: ${key}`);

  const overlay = readJson<Overlay>(OVERLAY_PATH, {});
  for (const question of targets) validateReasons(question, overlay[question.id] ?? {});
  const ledger = readJson<ReceiptLedger>(RECEIPT_PATH, {
    version: 1,
    scope: { exam: "sc", years: [2024, 2025], totalQuestions: 220, totalChoices: 880 },
    evidence: {}, batches: {}, questions: {},
  });

  const uniqueUrls = [...new Set(targets.flatMap(sourceUrls))].sort();
  for (const url of uniqueUrls) {
    if (!ledger.evidence[url] || process.argv.includes("--refresh-evidence")) {
      console.log(`[evidence] ${url}`);
      ledger.evidence[url] = await fetchEvidence(url);
      writeJson(RECEIPT_PATH, ledger);
    }
  }

  const byId = new Map(targets.map((question) => [question.id, question]));
  const legacyRoot = option("import-legacy");
  if (legacyRoot) {
    const count = importLegacyReceipts(legacyRoot, byId, overlay, ledger);
    console.log(`[legacy] imported=${count}`);
    writeJson(RECEIPT_PATH, ledger);
  }

  const papersByBatch = new Map<string, Set<string>>();
  for (const receipt of Object.values(ledger.questions)) {
    const papers = papersByBatch.get(receipt.batch) ?? new Set<string>();
    papers.add(receipt.paper);
    papersByBatch.set(receipt.batch, papers);
  }
  const mixedBatches = new Set(
    [...papersByBatch].filter(([, papers]) => papers.size !== 1).map(([batch]) => batch),
  );
  const pending = targets.filter((question) => {
    const receipt = ledger.questions[question.id];
    return !receipt
      || receipt.status !== "PASS"
      || receipt.issues.length !== 0
      || mixedBatches.has(receipt.batch)
      || !inputHashMatches(question, receipt.inputHash)
      || receipt.acceptedHash !== digest(overlay[question.id])
      || receipt.evidenceHash !== evidenceHash(question, ledger);
  });
  console.log(JSON.stringify({ total: targets.length, accepted: targets.length - pending.length, pending: pending.length, papers: Object.fromEntries([...groups].map(([key, rows]) => [key, rows.length])) }, null, 2));
  if (process.argv.includes("--prune-receipts")) {
    const referenced = new Set(Object.values(ledger.questions).map((receipt) => receipt.batch));
    for (const batch of Object.keys(ledger.batches)) {
      if (!referenced.has(batch)) delete ledger.batches[batch];
    }
    writeJson(RECEIPT_PATH, ledger);
  }
  if (process.argv.includes("--dry-run") || pending.length === 0) return;

  const batchSize = Math.max(1, Number(option("batch-size") ?? "5"));
  const workers = Math.max(1, Math.min(3, Number(option("workers") ?? "3")));
  const maxBatches = Math.max(1, Number(option("max-batches") ?? "999"));
  const batches: Question[][] = [];
  for (const key of [...expected.keys()]) {
    const rows = pending.filter((question) => paper(question) === key);
    for (let cursor = 0; cursor < rows.length && batches.length < maxBatches; cursor += batchSize) batches.push(rows.slice(cursor, cursor + batchSize));
  }

  for (let cursor = 0; cursor < batches.length; cursor += workers) {
    const wave = batches.slice(cursor, cursor + workers);
    const reviewed = await Promise.all(wave.map((batch, index) => reviewBatch(batch, cursor + index + 1)));
    for (let index = 0; index < reviewed.length; index += 1) {
      const batch = wave[index]!;
      const review = reviewed[index]!;
      ledger.batches[review.id] = {
        requestedModel: MODEL,
        canonicalModel: review.metadata.canonicalModel,
        provider: review.metadata.provider,
        modelUsage: review.metadata.usage,
        promptHash: digest(review.prompt),
        rawHash: digest(review.raw),
        reviewedAt: new Date().toISOString(),
      };
      for (const question of batch) {
        const row = review.result[question.id]!;
        const candidate = overlay[question.id]!;
        overlay[question.id] = row.choiceExplanations;
        ledger.questions[question.id] = {
          paper: paper(question), batch: review.id, status: row.status, issues: row.issues,
          inputHash: inputHash(question), candidateHash: digest(candidate), evidenceHash: evidenceHash(question, ledger),
          acceptedHash: digest(row.choiceExplanations), officialQuestionUrl: question.sourcePdfUrl,
          officialAnswerUrl: getOfficialAnswerPdfUrl(question.sourcePdfUrl, question.sourceAnswerUrl),
        };
      }
    }
    writeJson(OVERLAY_PATH, overlay);
    writeJson(RECEIPT_PATH, ledger);
    console.log(`[review] accepted=${Math.min(cursor + wave.length, batches.length)}/${batches.length} batches receipts=${Object.keys(ledger.questions).length}/220`);
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.stack : error);
  process.exitCode = 1;
});
