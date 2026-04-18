/**
 * scripts/parse-all.ts — 全試験一括パーススクリプト
 *
 * 使い方:
 *   pnpm parse:dry-run                   # ドライラン（コスト試算・PDF存在確認）
 *   pnpm parse:all --yes                 # 全セクション実行（確認スキップ）
 *   pnpm parse:all --section=A           # A のみ（IP / FE / SG）
 *   pnpm parse:all --section=B           # B のみ（高度午前Ⅰ）
 *   pnpm parse:all --section=C           # C のみ（高度午前Ⅱ 9区分）
 *   pnpm parse:all --section=A,B         # A + B
 *   pnpm parse:all --resume              # チェックポイントから再開
 *   pnpm parse:all --model=flash         # flash 使用（デフォルト: flash-lite）
 *
 * セクション定義:
 *   A — IP / FE / SG 基本3区分 (level=basic, session=am)       推定¥200  / 30分
 *   B — 高度共通午前Ⅰ 9区分   (level=specialist, session=am1) 推定¥100  / 15分
 *   C — 高度専門午前Ⅱ 9区分   (level=specialist, session=am2) 推定¥1000 / 2時間
 *
 * 必要な環境変数:
 *   GEMINI_API_KEY  (.env.local または export)
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Question, Season } from "@/lib/questions/types";
import {
  EXAM_CONFIGS,
  buildPdfUrl,
  buildRawPdfPath,
  buildExtractionPrompt,
  buildAnswerExtractionPrompt,
  buildExplanationPrompt,
  type ExamConfig,
  type SessionConfig,
} from "@/lib/exam-config";
import { CostTracker, type ModelTier } from "@/lib/ai/cost-tracker";

// ─── Types ───────────────────────────────────────────────────────────────────

type Section = "A" | "B" | "C";

interface Task {
  section: Section;
  cfg: ExamConfig;
  sessionCfg: SessionConfig;
  year: number;
  season: Season;
}

interface RawQuestion {
  qNumber: number;
  question: string;
  choices: { ア: string; イ: string; ウ: string; エ: string };
  category: string;
  hasImage: boolean;
}

interface ParsedAnswers {
  [qNumber: string]: string;
}

type GeminiModel = ReturnType<InstanceType<typeof GoogleGenerativeAI>["getGenerativeModel"]>;

// ─── Constants ───────────────────────────────────────────────────────────────

const RAW_DIR = join(process.cwd(), "data", "raw_pdfs");
const DATA_DIR = join(process.cwd(), "data", "questions");
const LOGS_DIR = join(process.cwd(), "logs");
const CP_PATH = join(LOGS_DIR, "parse-all-checkpoint.json");
const FAILURES_PATH = join(LOGS_DIR, "parse-all-failures.json");

// Rough per-task token estimates for cost preview (2 PDFs + explanation prompt)
const EST_INPUT_TOKENS = 190_000;
const EST_OUTPUT_TOKENS = 12_000;

// ─── CLI parsing ─────────────────────────────────────────────────────────────

interface CliOptions {
  dryRun: boolean;
  yes: boolean;
  sections: Set<Section>;
  resume: boolean;
  modelTier: ModelTier;
  examFilter: Set<string>;
}

function parseCliOptions(): CliOptions {
  const argv = process.argv.slice(2);
  let dryRun = false;
  let yes = false;
  const sections = new Set<Section>();
  let resume = false;
  let modelTier: ModelTier = "flash";
  const examFilter = new Set<string>();

  for (const arg of argv) {
    if (arg === "--dry-run") dryRun = true;
    else if (arg === "--yes" || arg === "-y") yes = true;
    else if (arg === "--resume") resume = true;
    else if (arg === "--model=flash") modelTier = "flash";
    else if (arg === "--model=flash-lite") modelTier = "flash-lite";
    else if (arg.startsWith("--section=")) {
      for (const s of arg.slice(10).split(",")) {
        const sec = s.trim().toUpperCase() as Section;
        if (["A", "B", "C"].includes(sec)) sections.add(sec);
        else console.warn(`Unknown section: "${s}". Valid: A, B, C`);
      }
    } else if (arg.startsWith("--exam=")) {
      for (const e of arg.slice(7).split(",")) examFilter.add(e.trim().toLowerCase());
    } else if (!arg.startsWith("-")) {
      // ignore positional args
    } else {
      console.warn(`Unknown flag: ${arg}`);
    }
  }

  // Default: all sections
  if (sections.size === 0) ["A", "B", "C"].forEach((s) => sections.add(s as Section));

  return { dryRun, yes, sections, resume, modelTier, examFilter };
}

// ─── Task builder ─────────────────────────────────────────────────────────────

const BASIC_AM_SESSIONS: string[] = ["am", "kamoku-a", "kamoku-b"];

function getSection(cfg: ExamConfig, sessionCfg: SessionConfig): Section | null {
  if (cfg.level === "basic" && BASIC_AM_SESSIONS.includes(sessionCfg.session)) return "A";
  if (cfg.level === "specialist" && sessionCfg.session === "am1") return "B";
  if (cfg.level === "specialist" && sessionCfg.session === "am2") return "C";
  return null;
}

function buildTasks(sections: Set<Section>, examFilter: Set<string>): Task[] {
  const tasks: Task[] = [];
  for (const cfg of Object.values(EXAM_CONFIGS)) {
    if (examFilter.size > 0 && !examFilter.has(cfg.code)) continue;
    // Regular sessions (am, am1, am2)
    for (const sessionCfg of cfg.sessions) {
      const section = getSection(cfg, sessionCfg);
      if (!section || !sections.has(section)) continue;

      // Main year range
      for (let year = cfg.yearRange.start; year <= cfg.yearRange.end; year++) {
        for (const season of cfg.seasons) {
          tasks.push({ section, cfg, sessionCfg, year, season });
        }
      }

      // Legacy year range (2009-2011 pre-reform, different seasons)
      if (cfg.legacyYearRange && cfg.legacySeasons) {
        for (let year = cfg.legacyYearRange.start; year <= cfg.legacyYearRange.end; year++) {
          for (const season of cfg.legacySeasons) {
            tasks.push({ section, cfg, sessionCfg, year, season });
          }
        }
      }
    }

    // CBT sessions (e.g. FE/SG kamoku-a/b for 2023+; IP reuses regular sessions)
    if (cfg.cbtYearRange) {
      const cbtSessions = cfg.cbtSessions ?? cfg.sessions;
      for (const sessionCfg of cbtSessions) {
        const section = getSection(cfg, sessionCfg);
        if (!section || !sections.has(section)) continue;

        for (let year = cfg.cbtYearRange.start; year <= cfg.cbtYearRange.end; year++) {
          tasks.push({ section, cfg, sessionCfg, year, season: "cbt" });
        }
      }
    }
  }
  return tasks;
}

function taskKey(t: Task): string {
  return `${t.cfg.code}-${t.year}-${t.season}-${t.sessionCfg.session}`;
}

// ─── Checkpoint ───────────────────────────────────────────────────────────────

function loadCheckpoint(): Set<string> {
  if (!existsSync(CP_PATH)) return new Set();
  try {
    const data = JSON.parse(readFileSync(CP_PATH, "utf-8")) as { keys?: string[] };
    return new Set(data.keys ?? []);
  } catch {
    return new Set();
  }
}

function saveCheckpoint(done: Set<string>): void {
  mkdirSync(LOGS_DIR, { recursive: true });
  writeFileSync(
    CP_PATH,
    JSON.stringify({ keys: [...done], updatedAt: new Date().toISOString() }, null, 2),
  );
}

// ─── Progress display ────────────────────────────────────────────────────────

function fmtDuration(ms: number): string {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  if (h > 0)
    return `${h}:${String(m % 60).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  return `${m}:${String(s % 60).padStart(2, "0")}`;
}

function printProgress(done: number, total: number, elapsedMs: number, costJpy: number): void {
  const pct = Math.round((done / total) * 100);
  const filled = Math.round((done / total) * 20);
  const bar = "█".repeat(filled) + "░".repeat(20 - filled);
  const elapsed = fmtDuration(elapsedMs);
  const eta = done > 0 ? fmtDuration((elapsedMs / done) * (total - done)) : "--:--";
  console.log(
    `[${bar}] ${pct}% (${done}/${total}) | ⏱ ${elapsed} | ¥${Math.ceil(costJpy)} | ETA ${eta}`,
  );
}

// ─── Retry / rate limit ───────────────────────────────────────────────────────

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function withRetry<T>(fn: () => Promise<T>, label: string, maxRetries = 5): Promise<T> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      const is429 =
        msg.includes("429") ||
        msg.includes("RESOURCE_EXHAUSTED") ||
        msg.includes("quota") ||
        msg.includes("rate");
      if (!is429 || attempt === maxRetries) throw err;
      const wait = Math.pow(2, attempt) * 1_000;
      console.warn(
        `  [retry] ${label}: rate limit, waiting ${wait / 1000}s (attempt ${attempt + 1}/${maxRetries})`,
      );
      await delay(wait);
    }
  }
  throw new Error("unreachable");
}

// ─── JSON extraction ─────────────────────────────────────────────────────────

function extractJson<T>(text: string): T | null {
  const fenced = text.match(/```(?:json)?\s*([\s\S]+?)```/);
  const candidate = fenced ? fenced[1] : text;
  const arrMatch = candidate.match(/(\[[\s\S]*\])/);
  const objMatch = candidate.match(/(\{[\s\S]*\})/);
  const raw = arrMatch?.[1] ?? objMatch?.[1] ?? candidate.trim();
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

// ─── Gemini calls ─────────────────────────────────────────────────────────────

async function extractQuestions(
  model: GeminiModel,
  task: Task,
  tracker: CostTracker,
  tier: ModelTier,
): Promise<RawQuestion[]> {
  const pdfPath = buildRawPdfPath(
    task.cfg.code,
    task.year,
    task.season,
    task.sessionCfg.session,
    "qs",
    task.sessionCfg.noSessionPrefix,
  );
  const pdfB64 = readFileSync(join(RAW_DIR, pdfPath)).toString("base64");
  const prompt = buildExtractionPrompt(task.cfg, task.year, task.season, task.sessionCfg);

  const result = await withRetry(
    () =>
      model.generateContent([{ inlineData: { mimeType: "application/pdf", data: pdfB64 } }, prompt]),
    `extractQuestions ${taskKey(task)}`,
  );

  const { usageMetadata } = result.response;
  tracker.record(
    tier,
    usageMetadata?.promptTokenCount ?? EST_INPUT_TOKENS / 3,
    usageMetadata?.candidatesTokenCount ?? EST_OUTPUT_TOKENS / 3,
    `questions:${taskKey(task)}`,
  );

  const parsed = extractJson<RawQuestion[]>(result.response.text());
  if (!parsed || !Array.isArray(parsed)) {
    throw new Error(
      `questions JSON parse failed.\n${result.response.text().slice(0, 300)}`,
    );
  }
  console.log(`  [questions] Extracted ${parsed.length} questions`);
  return parsed;
}

async function extractAnswers(
  model: GeminiModel,
  task: Task,
  tracker: CostTracker,
  tier: ModelTier,
): Promise<ParsedAnswers> {
  const pdfPath = buildRawPdfPath(
    task.cfg.code,
    task.year,
    task.season,
    task.sessionCfg.session,
    "ans",
    task.sessionCfg.noSessionPrefix,
  );
  const pdfB64 = readFileSync(join(RAW_DIR, pdfPath)).toString("base64");
  const prompt = buildAnswerExtractionPrompt(task.sessionCfg);

  const result = await withRetry(
    () =>
      model.generateContent([{ inlineData: { mimeType: "application/pdf", data: pdfB64 } }, prompt]),
    `extractAnswers ${taskKey(task)}`,
  );

  const { usageMetadata } = result.response;
  tracker.record(
    tier,
    usageMetadata?.promptTokenCount ?? EST_INPUT_TOKENS / 3,
    usageMetadata?.candidatesTokenCount ?? 500,
    `answers:${taskKey(task)}`,
  );

  const parsed = extractJson<ParsedAnswers>(result.response.text());
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error(`answers JSON parse failed.\n${result.response.text().slice(0, 300)}`);
  }
  console.log(`  [answers] Extracted ${Object.keys(parsed).length} answers`);
  return parsed;
}

const EXPLANATION_CHUNK_SIZE = 20;

async function generateExplanations(
  model: GeminiModel,
  task: Task,
  rawQuestions: RawQuestion[],
  answers: ParsedAnswers,
  tracker: CostTracker,
  tier: ModelTier,
): Promise<Record<number, string>> {
  const visible = rawQuestions.filter((q) => !q.hasImage);
  const result: Record<number, string> = {};

  for (let i = 0; i < visible.length; i += EXPLANATION_CHUNK_SIZE) {
    const chunk = visible.slice(i, i + EXPLANATION_CHUNK_SIZE);
    const chunkNum = Math.floor(i / EXPLANATION_CHUNK_SIZE) + 1;
    const totalChunks = Math.ceil(visible.length / EXPLANATION_CHUNK_SIZE);
    console.log(`  [explanations] chunk ${chunkNum}/${totalChunks} (問${chunk[0].qNumber}–${chunk[chunk.length - 1].qNumber})`);

    const qList = chunk
      .map((q) => {
        const ans = answers[String(q.qNumber)] ?? "?";
        return `問${q.qNumber}. ${q.question}\nア:${q.choices.ア} イ:${q.choices.イ} ウ:${q.choices.ウ} エ:${q.choices.エ}\n正解: ${ans}`;
      })
      .join("\n\n");

    const prompt = buildExplanationPrompt(task.cfg, task.sessionCfg, qList);
    const res = await withRetry(
      () => model.generateContent(prompt),
      `generateExplanations chunk${chunkNum} ${taskKey(task)}`,
    );

    const { usageMetadata } = res.response;
    tracker.record(
      tier,
      usageMetadata?.promptTokenCount ?? 8_000,
      usageMetadata?.candidatesTokenCount ?? 4_000,
      `explanations-c${chunkNum}:${taskKey(task)}`,
    );

    const parsed = extractJson<Record<string, string>>(res.response.text());
    if (parsed) {
      for (const [k, v] of Object.entries(parsed)) result[Number(k)] = v;
    } else {
      console.warn(`  [explanations] chunk ${chunkNum} parse failed, using placeholders`);
      for (const q of chunk) {
        result[q.qNumber] = `正解は${answers[String(q.qNumber)] ?? "不明"}です。AIコパイロットで詳しい解説を確認してください。`;
      }
    }

    if (i + EXPLANATION_CHUNK_SIZE < visible.length) await delay(1500);
  }

  return result;
}

// ─── Question assembly ────────────────────────────────────────────────────────

function buildQuestions(
  task: Task,
  rawQuestions: RawQuestion[],
  answers: ParsedAnswers,
  explanations: Record<number, string>,
): Question[] {
  const valid = ["ア", "イ", "ウ", "エ"] as const;
  const sc = task.season === "spring" ? "h" : task.season === "autumn" ? "a" : "cbt";
  const seasonLabel = task.season === "spring" ? "春期" : task.season === "autumn" ? "秋期" : "CBT";
  const reiwa = task.year - 2018;
  const reiwaLabel = reiwa >= 1 ? `令和${reiwa}年度` : `${task.year}年度`;

  return rawQuestions.flatMap((raw) => {
    const ansKey = answers[String(raw.qNumber)];
    if (!ansKey || !valid.includes(ansKey as (typeof valid)[number])) {
      console.warn(`  [merge] Skipping 問${raw.qNumber}: invalid answer "${ansKey}"`);
      return [];
    }
    const id = `${task.cfg.code}-${task.year}${sc}-${task.sessionCfg.session}-q${raw.qNumber}`;
    const effSeason = task.season === "cbt" ? "spring" : task.season;
    const sourcePdfUrl = buildPdfUrl(task.cfg, task.year, effSeason, task.sessionCfg, "qs");
    return [
      {
        id,
        exam: task.cfg.code,
        session: task.sessionCfg.session,
        year: task.year,
        season: task.season,
        qNumber: raw.qNumber,
        type: "multiple-choice" as const,
        category: raw.category || "技術要素",
        topicTags: [],
        difficulty: 3 as const,
        question: raw.question,
        choices: raw.choices,
        answer: ansKey as "ア" | "イ" | "ウ" | "エ",
        explanation:
          explanations[raw.qNumber] ??
          `正解は${ansKey}です。（出典: IPA ${task.cfg.nameFull} ${reiwaLabel}${seasonLabel} ${task.sessionCfg.label} 問${raw.qNumber}）`,
        hasImage: raw.hasImage,
        sourcePdfUrl,
        license: "IPA-public" as const,
      },
    ];
  });
}

function writeQuestionsFile(task: Task, questions: Question[]): void {
  const outDir = join(DATA_DIR, task.cfg.code, "by-year");
  mkdirSync(outDir, { recursive: true });
  const key = `${task.year}-${task.season}-${task.sessionCfg.session}`;
  const varName = `${task.cfg.code.toUpperCase()}_QUESTIONS_${task.year}_${task.season.toUpperCase()}_${task.sessionCfg.session.toUpperCase().replace("-", "_")}`;
  const seasonLabel = task.season === "spring" ? "春期" : "秋期";
  const ts = `// Auto-generated by scripts/parse-all.ts — do not edit manually.
// Source: IPA ${task.cfg.nameFull} ${task.year}年度${seasonLabel} ${task.sessionCfg.label}
// Questions: ${questions.length}
import type { Question } from "@/lib/questions/types";

export const ${varName}: Question[] = ${JSON.stringify(questions, null, 2)};
`;
  writeFileSync(join(outDir, `${key}.ts`), ts, "utf-8");
  console.log(`  [output] ${questions.length} questions → ${outDir}/${key}.ts`);
}

function regenerateBarrel(examCode: string): void {
  const outDir = join(DATA_DIR, examCode, "by-year");
  if (!existsSync(outDir)) return;
  let files: string[] = [];
  try {
    const { readdirSync } = require("node:fs") as typeof import("node:fs");
    files = readdirSync(outDir)
      .filter((f: string) => f.endsWith(".ts") && f !== "index.ts")
      .sort();
  } catch {
    return;
  }
  if (files.length === 0) return;
  const imports = files
    .map((f) => {
      const base = f.replace(".ts", "");
      const content = readFileSync(join(outDir, f), "utf-8");
      const m = content.match(/^export const (\w+):/m);
      return m ? `import { ${m[1]} } from "./${base}";` : null;
    })
    .filter(Boolean)
    .join("\n");
  const spreads = files
    .map((f) => {
      const content = readFileSync(join(outDir, f), "utf-8");
      const m = content.match(/^export const (\w+):/m);
      return m ? `  ...${m[1]}` : null;
    })
    .filter(Boolean)
    .join(",\n");
  writeFileSync(
    join(outDir, "index.ts"),
    `// Auto-generated barrel — do not edit manually.\nimport type { Question } from "@/lib/questions/types";\n${imports}\n\nexport const BY_YEAR_QUESTIONS: Question[] = [\n${spreads},\n];\n`,
  );
  console.log(`[barrel] ${examCode}/by-year/index.ts updated (${files.length} file(s))`);
}

// ─── Task processor ───────────────────────────────────────────────────────────

async function processTask(
  model: GeminiModel,
  task: Task,
  tracker: CostTracker,
  tier: ModelTier,
): Promise<{ ok: number; failed: boolean; errorMsg?: string }> {
  const seasonLabel = task.season === "spring" ? "春" : task.season === "autumn" ? "秋" : "CBT";
  const label = `[${task.section}] ${task.cfg.nameFull} ${task.year} ${seasonLabel} ${task.sessionCfg.label}`;
  console.log(`\n=== ${label} ===`);

  const nsp = task.sessionCfg.noSessionPrefix;
  const qsPdf = join(RAW_DIR, buildRawPdfPath(task.cfg.code, task.year, task.season, task.sessionCfg.session, "qs", nsp));
  const ansPdf = join(RAW_DIR, buildRawPdfPath(task.cfg.code, task.year, task.season, task.sessionCfg.session, "ans", nsp));

  if (!existsSync(qsPdf) || !existsSync(ansPdf)) {
    const missing = [!existsSync(qsPdf) ? "qs" : null, !existsSync(ansPdf) ? "ans" : null]
      .filter(Boolean)
      .join(", ");
    console.warn(`  [skip] PDF未取得: ${missing}`);
    console.warn(`  Run: pnpm fetch:pdfs --exam=${task.cfg.code}`);
    return { ok: 0, failed: true };
  }

  try {
    const rawQs = await extractQuestions(model, task, tracker, tier);
    await delay(2000);
    const answers = await extractAnswers(model, task, tracker, tier);
    await delay(2000);
    const explanations = await generateExplanations(model, task, rawQs, answers, tracker, tier);
    await delay(1000);

    const questions = buildQuestions(task, rawQs, answers, explanations);
    console.log(`  [summary] Built: ${questions.length} / ${rawQs.length}`);
    writeQuestionsFile(task, questions);
    return { ok: questions.length, failed: false };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`  [ERROR] ${msg}`);
    return { ok: 0, failed: true, errorMsg: msg };
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const opts = parseCliOptions();
  const modelName = opts.modelTier === "flash" ? "gemini-2.5-flash" : "gemini-2.5-flash-lite";
  const tracker = new CostTracker(`parse-all-${new Date().toISOString().slice(0, 10)}`);

  const allTasks = buildTasks(opts.sections, opts.examFilter);
  const done = opts.resume ? loadCheckpoint() : new Set<string>();
  const pendingTasks = opts.resume ? allTasks.filter((t) => !done.has(taskKey(t))) : allTasks;

  const sectionLabels: Record<Section, string> = {
    A: "A (IP/FE/SG)",
    B: "B (高度午前Ⅰ)",
    C: "C (高度午前Ⅱ)",
  };
  const selectedSections = [...opts.sections].map((s) => sectionLabels[s]).join(", ");

  // Cost estimate (rough: 3 calls × token estimates per task)
  const estJpy = tracker.estimate(opts.modelTier, EST_INPUT_TOKENS, EST_OUTPUT_TOKENS) * pendingTasks.length;

  console.log(`\n=== IPA 全試験パーサー ===`);
  console.log(`セクション : ${selectedSections}`);
  if (opts.examFilter.size > 0) console.log(`試験フィルタ: ${[...opts.examFilter].join(", ")}`);
  console.log(`モデル     : ${modelName}`);
  console.log(`対象タスク : ${pendingTasks.length}件 (スキップ済: ${allTasks.length - pendingTasks.length}件)`);
  console.log(`推定コスト : ¥${Math.ceil(estJpy)}`);
  console.log(`推定時間   : 約${Math.ceil(pendingTasks.length * 0.5)}分`);

  if (opts.dryRun) {
    console.log(`\n[dry-run] 実際の実行はしません。対象タスク一覧:`);
    for (const t of pendingTasks) {
      const nsp = t.sessionCfg.noSessionPrefix;
      const qsExists = existsSync(join(RAW_DIR, buildRawPdfPath(t.cfg.code, t.year, t.season, t.sessionCfg.session, "qs", nsp)));
      const ansExists = existsSync(join(RAW_DIR, buildRawPdfPath(t.cfg.code, t.year, t.season, t.sessionCfg.session, "ans", nsp)));
      const status = qsExists && ansExists ? "✓" : "✗ PDF未取得";
      console.log(`  [${t.section}] ${taskKey(t)}  ${status}`);
    }
    return;
  }

  if (!opts.yes) {
    const rl = (await import("node:readline")).createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const ans = await new Promise<string>((resolve) => rl.question(`\n実行しますか？ [y/N]: `, resolve));
    rl.close();
    if (!ans.toLowerCase().startsWith("y")) {
      console.log("キャンセルしました。");
      return;
    }
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("ERROR: GEMINI_API_KEY が未設定です。.env.local に設定してください。");
    process.exitCode = 1;
    return;
  }

  mkdirSync(LOGS_DIR, { recursive: true });
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      responseMimeType: "text/plain",
      maxOutputTokens: 65536,
    },
  });

  let interrupted = false;
  process.on("SIGINT", () => {
    console.log("\n\n[中断] Ctrl+C を受信。安全に停止します...");
    interrupted = true;
  });

  interface FailureRecord {
    key: string;
    errorType: "json-parse" | "api-error" | "pdf-missing" | "unknown";
    errorMsg: string;
    rawSnippet: string;
    truncated: boolean;
    ts: string;
  }
  const failures: FailureRecord[] = [];
  const startMs = Date.now();
  let processedCount = 0;
  const touchedExams = new Set<string>();

  for (const task of pendingTasks) {
    if (interrupted) break;

    const r = await processTask(model, task, tracker, opts.modelTier);
    processedCount++;

    if (!r.failed) {
      done.add(taskKey(task));
      touchedExams.add(task.cfg.code);
    } else {
      const msg = r.errorMsg ?? "unknown error";
      const rawSnippet = msg.slice(0, 500);
      const truncated = /JSON parse failed|切れ|truncat|unexpected end/i.test(msg);
      const errorType: FailureRecord["errorType"] = msg.includes("JSON parse failed")
        ? "json-parse"
        : msg.includes("PDF")
        ? "pdf-missing"
        : msg.includes("429") || msg.includes("quota")
        ? "api-error"
        : "unknown";
      failures.push({ key: taskKey(task), errorType, errorMsg: msg.slice(0, 500), rawSnippet, truncated, ts: new Date().toISOString() });
    }

    saveCheckpoint(done);
    tracker.save();
    printProgress(processedCount, pendingTasks.length, Date.now() - startMs, tracker.totalJpy);

    if (processedCount < pendingTasks.length && !interrupted) await delay(3000);
  }

  // Regenerate barrels for all processed exams
  for (const examCode of touchedExams) regenerateBarrel(examCode);

  if (failures.length > 0) {
    const existing: unknown[] = existsSync(FAILURES_PATH)
      ? (() => { try { return JSON.parse(readFileSync(FAILURES_PATH, "utf-8")); } catch { return []; } })()
      : [];
    writeFileSync(FAILURES_PATH, JSON.stringify([...existing, ...failures], null, 2), "utf-8");
    console.log(`\n[failures] ${failures.length}件 追記 → ${FAILURES_PATH}`);
  }

  tracker.printSummary();
  if (interrupted) console.log(`\n※ 中断されました。--resume で再開できます。`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exitCode = 1;
});
