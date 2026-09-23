/**
 * AP/IP/SG/FEの最新2年分を、再開可能な小バッチで全肢解説化する。
 * Sonnet草稿とOpus独立審査を分離し、PASSだけを試験別overlayへ昇格する。
 */
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

import { ALL_QUESTIONS } from "@/data/questions";
import type { ChoiceKey, Question } from "@/lib/questions/types";

const ROOT = process.cwd();
const LOG_ROOT = join(ROOT, "logs", "ipa-choice-explanations-core");
const RECEIPT_ROOT = join(ROOT, "docs", "evidence", "ipa-choice-explanations", "reviews", "generated");
const CHOICE_KEYS: ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ"];
const CORE_EXAMS = ["ap", "ip", "sg", "fe"] as const;
type CoreExam = (typeof CORE_EXAMS)[number];
const REQUIRED_YEARS: Record<CoreExam, readonly number[]> = {
  ap: [2024, 2025],
  ip: [2023, 2024],
  sg: [2024, 2025],
  fe: [2024, 2025],
};
const MIN_REASON_LENGTH = 55;

interface Options {
  exams: CoreExam[];
  batchSize: number;
  maxBatches: number;
  workers: number;
  draftModel: string;
  reviewModel: string;
  queue: "non-image" | "image" | "all";
  dryRun: boolean;
}

type Overlay = Record<string, Partial<Record<ChoiceKey, string>>>;

interface ReviewDecision {
  status: "PASS" | "FIX";
  checks: {
    answerConsistent: boolean;
    everyChoiceSpecific: boolean;
    noTemplateReason: boolean;
    officialAnswerPreserved: boolean;
  };
  issues: string[];
}

type Review = Record<string, ReviewDecision>;

function parseOptions(): Options {
  const args = process.argv.slice(2);
  const value = (name: string) => args.find((arg) => arg.startsWith(`--${name}=`))?.split("=").slice(1).join("=");
  const exams = (value("exams")?.split(",").filter((exam): exam is CoreExam =>
    CORE_EXAMS.includes(exam as CoreExam)) ?? [...CORE_EXAMS]);
  const queue = (value("queue") ?? "non-image") as Options["queue"];
  if (!["non-image", "image", "all"].includes(queue)) throw new Error(`unsupported queue: ${queue}`);
  return {
    exams,
    batchSize: Math.max(1, Math.min(8, Number(value("batch-size") ?? 5))),
    maxBatches: Math.max(1, Number(value("max-batches") ?? 500)),
    workers: Math.max(1, Math.min(3, Number(value("workers") ?? 3))),
    draftModel: value("draft-model") ?? "sonnet",
    reviewModel: value("review-model") ?? "opus",
    queue,
    dryRun: args.includes("--dry-run"),
  };
}

function overlayPath(exam: CoreExam): string {
  return join(ROOT, "data", "questions", exam, "choice-explanations-2024-2025.json");
}

function readOverlay(exam: CoreExam): Overlay {
  const path = overlayPath(exam);
  return existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) as Overlay : {};
}

function writeJson(path: string, value: unknown): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function sha256(value: unknown): string {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function sourceFingerprint(question: Question): string {
  return sha256({
    id: question.id,
    exam: question.exam,
    year: question.year,
    season: question.season,
    session: question.session,
    qNumber: question.qNumber,
    question: question.question,
    choices: question.choices,
    answer: question.answer,
    explanation: question.explanation,
    hasImage: question.hasImage,
    imageUrls: question.imageUrls,
    choiceImageUrls: question.choiceImageUrls,
    sourcePdfUrl: question.sourcePdfUrl,
    sourceAnswerUrl: question.sourceAnswerUrl,
    officialReferenceUrls: question.officialReferenceUrls,
  });
}

function overlayFingerprint(explanations: Partial<Record<ChoiceKey, string>>): string {
  return sha256(
    Object.fromEntries(Object.entries(explanations).sort(([left], [right]) => left.localeCompare(right, "ja"))),
  );
}

function answerKeys(question: Question): ChoiceKey[] {
  return (Array.isArray(question.answer) ? question.answer : [question.answer])
    .filter((answer): answer is ChoiceKey => CHOICE_KEYS.includes(answer as ChoiceKey));
}

function questionChoiceKeys(question: Question): ChoiceKey[] {
  return Object.keys(question.choices ?? {}).filter((key): key is ChoiceKey => CHOICE_KEYS.includes(key as ChoiceKey));
}

function hasCompleteOverlay(question: Question, overlay: Overlay): boolean {
  const row = overlay[question.id];
  const keys = questionChoiceKeys(question);
  return Boolean(row) && keys.length > 0 && keys.every((key) =>
    typeof row?.[key] === "string" && row[key]!.trim().length >= 40);
}

function imageFiles(question: Question): string[] {
  const urls = [
    ...(question.imageUrls ?? []),
    ...Object.values(question.choiceImageUrls ?? {}).filter((url): url is string => typeof url === "string"),
  ];
  return urls.map((url) => url.startsWith("/") ? join(ROOT, "public", url.slice(1)) : join(ROOT, "public", url));
}

function isVisual(question: Question): boolean {
  return question.hasImage || imageFiles(question).length > 0;
}

function parseJsonObject<T>(content: string): T {
  const trimmed = content.replace(/^```(?:json)?\s*|\s*```$/gu, "").trim();
  for (const match of trimmed.matchAll(/\{/gu)) {
    try {
      return JSON.parse(trimmed.slice(match.index ?? 0).replace(/\s*```\s*$/u, "")) as T;
    } catch {
      // Claude may prepend prose. Try the next opening brace.
    }
  }
  throw new Error("Claude response does not contain a complete JSON object");
}

function validateDraft(content: string, expected: Question[]): Overlay {
  const result = parseJsonObject<Overlay>(content);
  const expectedIds = new Set(expected.map((question) => question.id));
  if (Object.keys(result).length !== expectedIds.size || Object.keys(result).some((id) => !expectedIds.has(id))) {
    throw new Error("draft IDs differ from the requested batch");
  }
  for (const question of expected) {
    const row = result[question.id];
    const keys = questionChoiceKeys(question);
    if (!row || Object.keys(row).sort().join(",") !== [...keys].sort().join(",")) {
      throw new Error(`draft choice keys differ: ${question.id}`);
    }
    const correct = new Set(answerKeys(question));
    for (const key of keys) {
      const reason = row[key];
      if (typeof reason !== "string" || reason.trim().length < MIN_REASON_LENGTH) {
        throw new Error(`short draft reason: ${question.id}/${key}`);
      }
      const prefix = correct.has(key) ? "正しいです。" : "誤りです。";
      if (!reason.trim().startsWith(prefix)) throw new Error(`wrong verdict prefix: ${question.id}/${key}`);
    }
    if (new Set(keys.map((key) => row[key]!.trim())).size !== keys.length) {
      throw new Error(`duplicated reasons inside question: ${question.id}`);
    }
  }
  return result;
}

function validateReview(content: string, expected: Question[]): Review {
  const review = parseJsonObject<Review>(content);
  const expectedIds = new Set(expected.map((question) => question.id));
  if (Object.keys(review).length !== expectedIds.size || Object.keys(review).some((id) => !expectedIds.has(id))) {
    throw new Error("review IDs differ from the requested batch");
  }
  for (const question of expected) {
    const decision = review[question.id];
    if (!decision || !["PASS", "FIX"].includes(decision.status) || !Array.isArray(decision.issues)) {
      throw new Error(`invalid review decision: ${question.id}`);
    }
    const allChecks = Object.values(decision.checks ?? {}).every(Boolean);
    if (decision.status === "PASS" && (!allChecks || decision.issues.length > 0)) {
      throw new Error(`contradictory PASS decision: ${question.id}`);
    }
  }
  return review;
}

function claudeExecutable(): string {
  const appData = process.env.APPDATA;
  if (!appData) throw new Error("APPDATA is unavailable");
  const executable = join(appData, "npm", "node_modules", "@anthropic-ai", "claude-code", "bin", "claude.exe");
  if (!existsSync(executable)) throw new Error(`Claude CLI not found: ${executable}`);
  return executable;
}

async function callClaude(prompt: string, model: string, prefix: string): Promise<string> {
  writeFileSync(`${prefix}.prompt.txt`, prompt, "utf8");
  const raw = await new Promise<string>((accept, reject) => {
    const child = spawn(claudeExecutable(), [
      "-p", "--model", model, "--effort", "high", "--output-format", "json",
      "--allowedTools", "Read,Glob,Grep,WebSearch,WebFetch",
      "--tools", "Read,Glob,Grep,WebSearch,WebFetch",
    ], {
      cwd: ROOT,
      env: { ...process.env, CLAUDE_CODE_MAX_OUTPUT_TOKENS: "64000" },
      stdio: ["pipe", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    const timeout = setTimeout(() => {
      child.kill();
      reject(new Error(`Claude call timed out: ${prefix}`));
    }, 30 * 60 * 1000);
    child.stdout.setEncoding("utf8").on("data", (chunk) => { stdout += chunk; });
    child.stderr.setEncoding("utf8").on("data", (chunk) => { stderr += chunk; });
    child.on("error", reject);
    child.on("close", (code) => {
      clearTimeout(timeout);
      writeFileSync(`${prefix}.raw.json`, stdout, "utf8");
      writeFileSync(`${prefix}.stderr.txt`, stderr, "utf8");
      if (code !== 0 || /usage limit|rate limit|hit your limit/iu.test(`${stdout}\n${stderr}`)) {
        reject(new Error(`Claude unavailable; no paid fallback used: ${prefix}`));
      } else accept(stdout);
    });
    child.stdin.end(prompt);
  });
  const envelope = JSON.parse(raw) as { result?: string };
  if (typeof envelope.result !== "string") throw new Error(`Claude result missing: ${prefix}`);
  return envelope.result;
}

function inputFor(question: Question) {
  return {
    id: question.id,
    exam: question.exam,
    year: question.year,
    season: question.season,
    session: question.session,
    question: question.question,
    choices: question.choices,
    officialAnswer: question.answer,
    existingExplanation: question.explanation,
    sourcePdfUrl: question.sourcePdfUrl,
    sourceAnswerUrl: question.sourceAnswerUrl,
    officialReferenceUrls: question.officialReferenceUrls ?? [],
    imageFiles: imageFiles(question),
  };
}

function draftPrompt(batch: Question[], previous?: { draft: Overlay; review: Review }): string {
  const repair = previous
    ? `\n前回候補と独立審査の指摘です。全FIXを具体的に修正してください。\n${JSON.stringify({ draft: previous.draft, review: previous.review }, null, 2)}`
    : "";
  return `あなたはIPA情報処理技術者試験の教材編集者です。入力された全問題について全選択肢の個別解説を作成してください。

絶対条件:
- officialAnswerを正本とし、問題文・選択肢・正答を変更しない。
- 正答は「正しいです。」、誤答は「誤りです。」で始め、各肢55〜220文字で固有の用語・数値・式・処理順序を用いて説明する。
- 「条件に一致しない」だけの循環説明、問題文の言い換え、他肢・他問に流用できるテンプレは禁止。
- 誤答肢はどの概念・対応・計算が違うか、又は実際には何を説明する肢かを具体的に示す。
- imageFilesがある問題はReadで全画像を実際に確認する。画像を見ずに図表内容を推測しない。
- 必要なら公式一次資料を調査し、架空の出典や未確認仕様を作らない。
- 純粋なJSONだけを返す。形は {"question-id":{"ア":"正しいです。…","イ":"誤りです。…"}}。全ID・全肢を過不足なく返す。
- ファイル編集やコミットは行わない。
${repair}
入力:
${JSON.stringify(batch.map(inputFor), null, 2)}`;
}

function reviewPrompt(batch: Question[], draft: Overlay): string {
  return `あなたは草稿担当から独立したIPA試験教材の最終審査者です。各問題の全肢を設問・選択肢・officialAnswer・公式資料・画像と照合してください。

PASS条件:
- officialAnswerの正答肢を正しく説明し、誤答扱いしていない。
- 全誤答肢の固有の誤りを技術的・計算上正しく説明している。
- 一般論、循環説明、テンプレ使い回し、未確認の推測がない。
- imageFilesがある問題はReadで全画像を実見した。
- 問題文・選択肢・officialAnswerを変更していない。
一つでも満たさなければFIXとし、issuesに肢と直し方を具体的に書く。候補を書き換えず審査だけを行う。
純粋なJSONだけを返す。形は
{"question-id":{"status":"PASS","checks":{"answerConsistent":true,"everyChoiceSpecific":true,"noTemplateReason":true,"officialAnswerPreserved":true},"issues":[]}}

入力:
${JSON.stringify(batch.map((question) => ({ ...inputFor(question), candidateChoiceExplanations: draft[question.id] })), null, 2)}`;
}

function saveReceipt(
  batchName: string,
  attempt: number,
  reviewer: string,
  questions: Question[],
  draft: Overlay,
  review: Review,
): void {
  writeJson(join(RECEIPT_ROOT, `${batchName}-a${attempt}.json`), {
    schemaVersion: 1,
    reviewer,
    reviewedAt: new Date().toISOString(),
    batch: `${batchName}-a${attempt}`,
    questions: questions.map((question) => ({
      id: question.id,
      status: review[question.id]!.status,
      sourceSha256: sourceFingerprint(question),
      overlaySha256: overlayFingerprint(draft[question.id]!),
      checks: review[question.id]!.checks,
      issues: review[question.id]!.issues,
    })),
  });
}

async function processBatch(
  originalBatch: Question[],
  options: Options,
  batchIndex: number,
  overlays: Record<CoreExam, Overlay>,
): Promise<{ accepted: number; pending: number }> {
  const token = sha256(originalBatch.map((question) => question.id)).slice(0, 12);
  const batchName = `${String(batchIndex + 1).padStart(4, "0")}-${token}`;
  let batch = [...originalBatch];
  let previous: { draft: Overlay; review: Review } | undefined;
  let accepted = 0;
  for (let attempt = 1; attempt <= 3 && batch.length > 0; attempt += 1) {
    const prefix = join(LOG_ROOT, `${batchName}-a${attempt}`);
    writeJson(`${prefix}.input.json`, batch.map(inputFor));
    const draftRaw = await callClaude(draftPrompt(batch, previous), options.draftModel, `${prefix}.draft`);
    const draft = validateDraft(draftRaw, batch);
    writeJson(`${prefix}.draft.accepted.json`, draft);
    const reviewRaw = await callClaude(reviewPrompt(batch, draft), options.reviewModel, `${prefix}.review`);
    const review = validateReview(reviewRaw, batch);
    writeJson(`${prefix}.review.parsed.json`, review);
    saveReceipt(batchName, attempt, `${options.reviewModel} via Claude Code`, batch, draft, review);

    const retry: Question[] = [];
    for (const question of batch) {
      if (review[question.id]!.status === "PASS") {
        overlays[question.exam as CoreExam][question.id] = draft[question.id]!;
        accepted++;
      } else retry.push(question);
    }
    for (const exam of new Set(batch.map((question) => question.exam as CoreExam))) {
      writeJson(overlayPath(exam), overlays[exam]);
    }
    console.log(`[review] batch=${batchIndex + 1} attempt=${attempt} pass=${batch.length - retry.length} fix=${retry.length}`);
    previous = { draft, review };
    batch = retry;
  }
  if (batch.length > 0) writeJson(join(LOG_ROOT, `${batchName}.pending.json`), batch.map(inputFor));
  return { accepted, pending: batch.length };
}

async function main(): Promise<void> {
  const options = parseOptions();
  mkdirSync(LOG_ROOT, { recursive: true });
  mkdirSync(RECEIPT_ROOT, { recursive: true });
  const overlays = Object.fromEntries(options.exams.map((exam) => [exam, readOverlay(exam)])) as Record<CoreExam, Overlay>;
  const allTargets = ALL_QUESTIONS.filter((question): question is Question & { exam: CoreExam } => {
    if (!options.exams.includes(question.exam as CoreExam)) return false;
    const exam = question.exam as CoreExam;
    return REQUIRED_YEARS[exam].includes(question.year) && question.type === "multiple-choice" && Boolean(question.choices);
  });
  const missing = allTargets.filter((question) => !hasCompleteOverlay(question, overlays[question.exam]));
  const wrongQueue = missing.filter((question) =>
    options.queue === "non-image" ? isVisual(question) : options.queue === "image" ? !isVisual(question) : false);
  const targets = missing.filter((question) => !wrongQueue.includes(question));
  const missingImageFiles = options.queue === "image"
    ? targets.filter((question) => imageFiles(question).some((path) => !existsSync(path)))
    : [];
  const runnable = targets.filter((question) => !missingImageFiles.includes(question));

  console.log(JSON.stringify({
    requiredYears: REQUIRED_YEARS,
    queue: options.queue,
    total: allTargets.length,
    accepted: allTargets.length - missing.length,
    missing: missing.length,
    deferredOtherQueue: wrongQueue.length,
    missingImageFiles: missingImageFiles.map((question) => question.id),
    runnable: runnable.length,
    byExam: Object.fromEntries(options.exams.map((exam) => [exam, runnable.filter((question) => question.exam === exam).length])),
  }, null, 2));
  if (options.dryRun || runnable.length === 0) return;

  const batches: Question[][] = [];
  for (let cursor = 0; cursor < runnable.length && batches.length < options.maxBatches; cursor += options.batchSize) {
    batches.push(runnable.slice(cursor, cursor + options.batchSize));
  }
  let next = 0;
  let accepted = 0;
  let pending = 0;
  const worker = async () => {
    while (next < batches.length) {
      const index = next++;
      try {
        const result = await processBatch(batches[index]!, options, index, overlays);
        accepted += result.accepted;
        pending += result.pending;
        console.log(`[coverage] newlyAccepted=${accepted} stillPending=${pending}`);
      } catch (error) {
        pending += batches[index]!.length;
        console.error(`[batch-failed] index=${index + 1}`, error);
      }
    }
  };
  await Promise.all(Array.from({ length: Math.min(options.workers, batches.length) }, worker));
  if (pending > 0) process.exitCode = 1;
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.stack : error);
  process.exitCode = 1;
});
