/** Independent, resumable review for the 2024/2025 IPA all-choice overlays. */
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { ALL_QUESTIONS } from "@/data/questions";
import type { ChoiceKey, ExamCode, Question } from "@/lib/questions/types";

const ROOT = process.cwd();
const LOG_ROOT = join(ROOT, "logs", "ipa-choice-explanations-review-2024-2025");
const LEDGER_PATH = join(ROOT, "docs", "evidence", "ipa-choice-explanations-2024-2025", "review-ledger.json");
const EXAMS = ["sc", "nw", "db", "st", "sa", "pm", "es", "sm", "au"] as ExamCode[];
const YEARS = new Set([2024, 2025]);
const CHOICE_KEYS: ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "コ"];
const MIN_LENGTH = 55;

type Overlay = Record<string, Partial<Record<ChoiceKey, string>>>;
interface ReviewRow {
  status: "PASS" | "FIX";
  issues: string[];
  choiceExplanations: Partial<Record<ChoiceKey, string>>;
}
type ReviewResult = Record<string, ReviewRow>;
interface LedgerRow {
  questionHash: string;
  overlayHash: string;
  status: "PASS" | "FIX";
  issues: string[];
  model: string;
}
type Ledger = Record<string, LedgerRow>;

function option(name: string, fallback: string): string {
  return process.argv.slice(2).find((arg) => arg.startsWith(`--${name}=`))?.split("=").slice(1).join("=") ?? fallback;
}
const batchSize = Number(option("batch-size", "6"));
const workers = Math.max(1, Math.min(3, Number(option("workers", "3"))));
const maxBatches = Number(option("max-batches", "500"));
const model = option("model", "opus");
const dryRun = process.argv.includes("--dry-run");

function readJson<T>(path: string, fallback: T): T {
  return existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) as T : fallback;
}
function writeJson(path: string, value: unknown): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}
function overlayPath(exam: ExamCode): string {
  return join(ROOT, "data", "questions", exam, "choice-explanations-2024-2025.json");
}
function digest(value: unknown): string {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}
function keys(question: Question): ChoiceKey[] {
  return Object.keys(question.choices ?? {}).filter((key): key is ChoiceKey => CHOICE_KEYS.includes(key as ChoiceKey));
}
function answers(question: Question): Set<ChoiceKey> {
  const values = Array.isArray(question.answer) ? question.answer : [question.answer];
  return new Set(values.filter((value): value is ChoiceKey => CHOICE_KEYS.includes(value as ChoiceKey)));
}
function hashes(question: Question, row: Overlay[string]): Pick<LedgerRow, "questionHash" | "overlayHash"> {
  return {
    questionHash: digest({ question: question.question, choices: question.choices, answer: question.answer }),
    overlayHash: digest(row),
  };
}

function validateRow(question: Question, row: Overlay[string]): void {
  const expected = keys(question);
  if (!row || Object.keys(row).sort().join(",") !== [...expected].sort().join(",")) {
    throw new Error(`choice keys differ: ${question.id}`);
  }
  const correct = answers(question);
  for (const key of expected) {
    const reason = row[key];
    const prefix = correct.has(key) ? "正しいです。" : "誤りです。";
    if (typeof reason !== "string" || reason.trim().length < MIN_LENGTH || !reason.trim().startsWith(prefix)) {
      throw new Error(`invalid reviewed reason: ${question.id}/${key}`);
    }
  }
}

function parseReview(content: string, batch: Question[]): ReviewResult {
  let parsed: unknown;
  for (const match of content.matchAll(/\{/gu)) {
    try {
      parsed = JSON.parse(content.slice(match.index ?? 0).replace(/\s*```\s*$/u, ""));
      break;
    } catch {
      // Try the next object start when a status sentence precedes the JSON.
    }
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("review JSON missing");
  const result = parsed as ReviewResult;
  const expectedIds = new Set(batch.map((question) => question.id));
  if (Object.keys(result).length !== expectedIds.size || Object.keys(result).some((id) => !expectedIds.has(id))) {
    throw new Error("review IDs differ");
  }
  for (const question of batch) {
    const review = result[question.id];
    if (!review || !["PASS", "FIX"].includes(review.status) || !Array.isArray(review.issues)) {
      throw new Error(`invalid review result: ${question.id}`);
    }
    validateRow(question, review.choiceExplanations);
    if (review.status === "PASS" && review.issues.length > 0) {
      throw new Error(`PASS includes issues: ${question.id}`);
    }
    if (review.status === "FIX" && review.issues.length === 0) {
      throw new Error(`FIX has no issue: ${question.id}`);
    }
  }
  return result;
}

function executable(): string {
  const appData = process.env.APPDATA;
  if (!appData) throw new Error("APPDATA unavailable");
  const path = join(appData, "npm", "node_modules", "@anthropic-ai", "claude-code", "bin", "claude.exe");
  if (!existsSync(path)) throw new Error(`Claude CLI not found: ${path}`);
  return path;
}

function makePrompt(batch: Question[]): string {
  return `あなたはIPA試験教材の独立査読者です。別セッションが作った全肢解説を、公式正答と技術内容の両面で全件査読してください。

査読条件:
- officialAnswerを正本とし、問題文・選択肢・正答は変更しない。
- 各肢について、その肢固有の用語・数値・式・処理順序に照らして理由が正しいか確認する。
- 正答肢は「正しいです。」、誤答肢は「誤りです。」で始まり、誤答は何をどう直せば正しいかまで説明する。
- 循環説明、他の肢へ流用できる定型文、既存解説との矛盾、計算違い、用語の取り違えはFIX。
- 図表依存ならimageUrlsの先頭/をpublic/へ置換してReadで原図を確認する。見られない図を推測しない。
- 不確かな技術仕様はIPA、デジタル庁、総務省、経産省、NIST、RFC等の一次資料だけを調査する。架空の出典は禁止。
- PASSでもchoiceExplanationsを同じ形で全肢返す。FIXなら修正済み全文を返す。
- 出力は純粋なJSONのみ: {"id":{"status":"PASS|FIX","issues":["具体的な問題点"],"choiceExplanations":{"ア":"..."}}}
- ファイル編集・コミットはしない。

入力:
${JSON.stringify(batch.map((question) => ({
    id: question.id,
    question: question.question,
    choices: question.choices,
    officialAnswer: question.answer,
    existingNarrative: question.explanation,
    candidateChoiceExplanations: question.choiceExplanations,
    sourcePdfUrl: question.sourcePdfUrl,
    sourceAnswerUrl: question.sourceAnswerUrl,
    imageUrls: question.imageUrls ?? [],
  })), null, 2)}`;
}

async function reviewBatch(batch: Question[], index: number, attempt: number): Promise<ReviewResult> {
  const token = digest(batch.map((question) => question.id)).slice(0, 12);
  const prefix = join(LOG_ROOT, `${String(index + 1).padStart(4, "0")}-${token}-a${attempt}`);
  const prompt = makePrompt(batch);
  writeFileSync(`${prefix}.prompt.txt`, prompt, "utf8");
  const raw = await new Promise<string>((accept, reject) => {
    const child = spawn(executable(), [
      "-p", "--model", model, "--effort", "high", "--output-format", "json",
      "--allowedTools", "Read,Glob,Grep,WebSearch,WebFetch",
      "--tools", "Read,Glob,Grep,WebSearch,WebFetch",
    ], { cwd: ROOT, env: { ...process.env, CLAUDE_CODE_MAX_OUTPUT_TOKENS: "64000" }, stdio: ["pipe", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    child.stdout.setEncoding("utf8").on("data", (chunk) => { stdout += chunk; });
    child.stderr.setEncoding("utf8").on("data", (chunk) => { stderr += chunk; });
    const timeout = setTimeout(() => { child.kill(); reject(new Error(`review timeout ${token}`)); }, 30 * 60 * 1000);
    child.on("error", reject);
    child.on("close", (code) => {
      clearTimeout(timeout);
      writeFileSync(`${prefix}.raw.json`, stdout, "utf8");
      writeFileSync(`${prefix}.stderr.txt`, stderr, "utf8");
      if (code !== 0 || /usage limit|rate limit|hit your limit/iu.test(`${stdout}\n${stderr}`)) reject(new Error(`review unavailable ${token}`));
      else accept(stdout);
    });
    child.stdin.end(prompt);
  });
  const envelope = JSON.parse(raw) as { result?: string };
  if (typeof envelope.result !== "string") throw new Error(`review result missing ${token}`);
  const result = parseReview(envelope.result.replace(/^```(?:json)?\s*|\s*```$/gu, ""), batch);
  writeJson(`${prefix}.accepted.json`, result);
  return result;
}

async function main(): Promise<void> {
  mkdirSync(LOG_ROOT, { recursive: true });
  const overlays = Object.fromEntries(EXAMS.map((exam) => [exam, readJson<Overlay>(overlayPath(exam), {})])) as Record<string, Overlay>;
  const ledger = readJson<Ledger>(LEDGER_PATH, {});
  const targets = ALL_QUESTIONS.filter((question) => {
    if (!EXAMS.includes(question.exam) || !YEARS.has(question.year) || !question.choices) return false;
    const row = overlays[question.exam]?.[question.id];
    validateRow(question, row);
    const current = hashes(question, row);
    const receipt = ledger[question.id];
    return !receipt || receipt.questionHash !== current.questionHash || receipt.overlayHash !== current.overlayHash;
  });
  console.log(JSON.stringify({ total: 1100, reviewed: 1100 - targets.length, pending: targets.length }, null, 2));
  if (dryRun || targets.length === 0) return;
  const batches: Question[][] = [];
  for (let cursor = 0; cursor < targets.length && batches.length < maxBatches; cursor += batchSize) {
    batches.push(targets.slice(cursor, cursor + batchSize));
  }
  let next = 0;
  let done = 0;
  const worker = async () => {
    while (next < batches.length) {
      const index = next++;
      const batch = batches[index]!;
      let result: ReviewResult | undefined;
      let lastError: unknown;
      for (let attempt = 1; attempt <= 3 && !result; attempt += 1) {
        try { result = await reviewBatch(batch, index, attempt); }
        catch (error) { lastError = error; console.error(`[review-retry] batch=${index + 1} attempt=${attempt}`, error); }
      }
      if (!result) throw lastError;
      for (const question of batch) {
        const review = result[question.id]!;
        overlays[question.exam]![question.id] = review.choiceExplanations;
        const current = hashes(question, review.choiceExplanations);
        ledger[question.id] = { ...current, status: review.status, issues: review.issues, model };
      }
      for (const exam of new Set(batch.map((question) => question.exam))) writeJson(overlayPath(exam), overlays[exam]);
      writeJson(LEDGER_PATH, ledger);
      done += batch.length;
      console.log(`[review] accepted=${done}/${targets.length}`);
    }
  };
  await Promise.all(Array.from({ length: Math.min(workers, batches.length) }, worker));
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.stack : error);
  process.exitCode = 1;
});
