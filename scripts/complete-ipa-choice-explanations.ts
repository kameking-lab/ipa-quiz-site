/**
 * Claude subscriptionでIPA択一問題の全肢解説を再開可能な小バッチで執筆する。
 * 原文・選択肢・公式正答は変更せず、試験別overlay JSONだけを更新する。
 */
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { ALL_QUESTIONS } from "@/data/questions";
import type { ChoiceKey, ExamCode, Question } from "@/lib/questions/types";

const ROOT = process.cwd();
const LOG_ROOT = join(ROOT, "logs", "ipa-choice-explanations-2024-2025");
const ALL_CHOICE_KEYS: ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "コ"];
const TARGET_YEARS = new Set([2024, 2025]);
const DEFAULT_EXAMS = ["sc", "nw", "db", "st", "sa", "pm", "es", "sm", "au"] as ExamCode[];
const MIN_REASON_LENGTH = 55;
const REQUIRED_MODEL = "claude-opus-5-5";

interface Options {
  exams: ExamCode[];
  batchSize: number;
  maxBatches: number;
  workers: number;
  model: string;
  dryRun: boolean;
}

type Overlay = Record<string, Partial<Record<ChoiceKey, string>>>;

function parseOptions(): Options {
  const args = process.argv.slice(2);
  const value = (name: string) => args.find((arg) => arg.startsWith(`--${name}=`))?.split("=").slice(1).join("=");
  const exams = (value("exams")?.split(",").filter(Boolean) ?? DEFAULT_EXAMS) as ExamCode[];
  return {
    exams,
    batchSize: Number(value("batch-size") ?? 5),
    maxBatches: Number(value("max-batches") ?? 500),
    workers: Math.max(1, Math.min(3, Number(value("workers") ?? 3))),
    model: value("model") ?? REQUIRED_MODEL,
    dryRun: args.includes("--dry-run"),
  };
}

function assertPinnedModel(options: Options): void {
  if (options.model !== REQUIRED_MODEL) {
    throw new Error(`authoring model must be explicitly pinned to ${REQUIRED_MODEL}; received ${options.model}`);
  }
}

function overlayPath(exam: ExamCode): string {
  return join(ROOT, "data", "questions", exam, "choice-explanations-2024-2025.json");
}

function readOverlay(exam: ExamCode): Overlay {
  const path = overlayPath(exam);
  return existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) as Overlay : {};
}

function writeJson(path: string, value: unknown): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function answerKeys(question: Question): ChoiceKey[] {
  return (Array.isArray(question.answer) ? question.answer : [question.answer])
    .filter((answer): answer is ChoiceKey => ALL_CHOICE_KEYS.includes(answer as ChoiceKey));
}

function questionChoiceKeys(question: Question): ChoiceKey[] {
  return Object.keys(question.choices ?? {}).filter((key): key is ChoiceKey =>
    ALL_CHOICE_KEYS.includes(key as ChoiceKey));
}

function hasCompleteOverlay(question: Question, overlay: Overlay): boolean {
  const row = overlay[question.id];
  const keys = questionChoiceKeys(question);
  return Boolean(row) && keys.length > 0 && keys.every((key) =>
    typeof row?.[key] === "string" && row[key]!.trim().length >= MIN_REASON_LENGTH);
}

function parseResult(content: string, expected: Question[]): Overlay {
  const expectedIds = new Set(expected.map((question) => question.id));
  const decoderCandidates = [...content.matchAll(/\{/gu)].map((match) => match.index ?? 0);
  let parsed: unknown;
  for (const start of decoderCandidates) {
    try {
      parsed = JSON.parse(content.slice(start).replace(/\s*```\s*$/u, ""));
      break;
    } catch {
      // Claude may prepend one sentence; try the next object start.
    }
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("Claude response does not contain a complete JSON object");
  }
  const result = parsed as Overlay;
  if (Object.keys(result).length !== expectedIds.size || Object.keys(result).some((id) => !expectedIds.has(id))) {
    throw new Error("Claude response IDs differ from the requested batch");
  }

  for (const question of expected) {
    const row = result[question.id];
    const keys = questionChoiceKeys(question);
    if (!row || Object.keys(row).sort().join(",") !== [...keys].sort().join(",")) {
      throw new Error(`choice keys differ: ${question.id}`);
    }
    const correct = new Set(answerKeys(question));
    for (const key of keys) {
      const reason = row[key];
      if (typeof reason !== "string" || reason.trim().length < MIN_REASON_LENGTH) {
        throw new Error(`short reason: ${question.id}/${key}`);
      }
      const requiredPrefix = correct.has(key) ? "正しいです。" : "誤りです。";
      if (!reason.trim().startsWith(requiredPrefix)) {
        throw new Error(`wrong verdict prefix: ${question.id}/${key}`);
      }
    }
    if (new Set(keys.map((key) => row[key]!.trim())).size !== keys.length) {
      throw new Error(`duplicated reasons inside question: ${question.id}`);
    }
  }
  return result;
}

function claudeExecutable(): string {
  const appData = process.env.APPDATA;
  if (!appData) throw new Error("APPDATA is unavailable");
  const executable = join(appData, "npm", "node_modules", "@anthropic-ai", "claude-code", "bin", "claude.exe");
  if (!existsSync(executable)) throw new Error(`Claude CLI not found: ${executable}`);
  return executable;
}

function promptFor(batch: Question[]): string {
  const input = batch.map((question) => ({
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
    imageUrls: question.imageUrls ?? [],
  }));
  return `あなたはIPA情報処理技術者試験の教材編集者です。入力された全問題について、各選択肢が正しいか誤りかを個別に説明してください。

絶対条件:
- 入力のofficialAnswerを正本とし、問題文・選択肢・正答を変更しない。
- 各選択肢の説明は55〜220文字を目安に、その選択肢固有の用語・数値・式・処理順序を使って理由を説明する。
- 正答の説明は必ず「正しいです。」、誤答は必ず「誤りです。」で始める。複数正答ならofficialAnswerに含まれる全肢を正しいとする。
- 「条件に一致しない」「正答ではない」だけの循環説明、他肢にも流用できる定型文、問題文の言い換えだけは禁止。
- 既存解説は正答理由の参考に使えるが、誤答理由は各選択肢の具体的な誤りを訂正する。計算問題は代入・計算過程を確認する。
- 図表が必要ならimageUrlsの先頭/をpublic/へ置き換え、ローカル画像をReadで確認する。画像を見ずに図の内容を推測しない。
- 不確かな規格・技術仕様はIPA、デジタル庁、総務省、経産省、NIST、RFC、ISO/JISの公式情報など一次資料を調査する。架空の出典を作らない。
- 出力は純粋なJSONオブジェクトのみ。形は {"question-id":{"ア":"正しいです。…","イ":"誤りです。…"}}。全ID・全選択肢を過不足なく返す。コードフェンス不要。
- ファイル編集やコミットは行わない。

入力:
${JSON.stringify(input, null, 2)}`;
}

async function runClaude(
  batch: Question[],
  options: Options,
  batchIndex: number,
  attempt: number,
): Promise<Overlay> {
  const token = createHash("sha256").update(batch.map((question) => question.id).join("|")).digest("hex").slice(0, 12);
  const prefix = join(
    LOG_ROOT,
    `${String(batchIndex + 1).padStart(4, "0")}-${token}-a${attempt}`,
  );
  writeJson(`${prefix}.input.json`, batch);
  const prompt = promptFor(batch);
  writeFileSync(`${prefix}.prompt.txt`, prompt, "utf8");
  console.log(`[generate] batch=${batchIndex + 1} count=${batch.length} first=${batch[0]?.id}`, { flush: true });

  const raw = await new Promise<string>((accept, reject) => {
    const child = spawn(claudeExecutable(), [
      "-p", "--model", options.model, "--effort", "high", "--output-format", "json",
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
      reject(new Error(`Claude batch timed out: ${token}`));
    }, 30 * 60 * 1000);
    child.stdout.setEncoding("utf8").on("data", (chunk) => { stdout += chunk; });
    child.stderr.setEncoding("utf8").on("data", (chunk) => { stderr += chunk; });
    child.on("error", reject);
    child.on("close", (code) => {
      clearTimeout(timeout);
      writeFileSync(`${prefix}.raw.json`, stdout, "utf8");
      writeFileSync(`${prefix}.stderr.txt`, stderr, "utf8");
      if (code !== 0 || /usage limit|rate limit|hit your limit/iu.test(`${stdout}\n${stderr}`)) {
        reject(new Error(`Claude unavailable for ${token}; no paid fallback used`));
      } else accept(stdout);
    });
    child.stdin.end(prompt);
  });

  const envelope = JSON.parse(raw) as { result?: string };
  if (typeof envelope.result !== "string") throw new Error(`Claude result missing: ${token}`);
  const result = parseResult(envelope.result.replace(/^```(?:json)?\s*|\s*```$/gu, ""), batch);
  writeJson(`${prefix}.accepted.json`, result);
  return result;
}

async function main(): Promise<void> {
  const options = parseOptions();
  assertPinnedModel(options);
  mkdirSync(LOG_ROOT, { recursive: true });
  const overlays = Object.fromEntries(options.exams.map((exam) => [exam, readOverlay(exam)])) as Record<string, Overlay>;
  const targets = ALL_QUESTIONS.filter((question) =>
    options.exams.includes(question.exam)
    && TARGET_YEARS.has(question.year)
    && question.type === "multiple-choice"
    && question.choices
    && !hasCompleteOverlay(question, overlays[question.exam] ?? {}));

  console.log(JSON.stringify({
    exams: options.exams,
    existing: Object.values(overlays).reduce((sum, overlay) => sum + Object.keys(overlay).length, 0),
    missing: targets.length,
    byExam: Object.fromEntries(options.exams.map((exam) => [exam, targets.filter((question) => question.exam === exam).length])),
  }, null, 2));
  if (options.dryRun || targets.length === 0) return;

  const batches: Question[][] = [];
  for (let cursor = 0; cursor < targets.length && batches.length < options.maxBatches; cursor += options.batchSize) {
    batches.push(targets.slice(cursor, cursor + options.batchSize));
  }
  let next = 0;
  let completed = 0;
  const worker = async () => {
    while (next < batches.length) {
      const index = next++;
      const batch = batches[index]!;
      let result: Overlay | undefined;
      let lastError: unknown;
      for (let attempt = 1; attempt <= 3 && !result; attempt += 1) {
        try {
          result = await runClaude(batch, options, index, attempt);
        } catch (error) {
          lastError = error;
          console.error(`[retry] batch=${index + 1} attempt=${attempt}`, error);
        }
      }
      if (!result) throw lastError;
      for (const question of batch) overlays[question.exam]![question.id] = result[question.id]!;
      for (const exam of new Set(batch.map((question) => question.exam))) {
        writeJson(overlayPath(exam), overlays[exam]);
      }
      completed += batch.length;
      console.log(`[coverage] accepted=${completed}/${targets.length}`);
    }
  };
  await Promise.all(Array.from({ length: Math.min(options.workers, batches.length) }, worker));
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.stack : error);
  process.exitCode = 1;
});
