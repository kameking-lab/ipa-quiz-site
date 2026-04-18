/**
 * IPA 過去問 PDF → TypeScript 問題データ変換スクリプト。
 *
 * 必要な環境変数:
 *   GEMINI_API_KEY  ... Google AI Studio で取得
 *
 * 使い方:
 *   pnpm parse:pdfs                     # AP のみ（デフォルト）
 *   pnpm parse:pdfs --exam=fe           # FE のみ
 *   pnpm parse:pdfs --exam=sc --session=am2
 *   pnpm parse:pdfs --all               # 全試験区分
 *   pnpm parse:pdfs --exam=ap --year=2023 --season=spring
 *   pnpm parse:pdfs --exam=ap --resume  # 処理済みをスキップ
 *
 * 出力:
 *   data/questions/{exam}/by-year/{year}-{season}-{session}.ts
 *   data/questions/{exam}/by-year/index.ts  (バレルファイル、自動生成)
 *   data/questions/{exam}/.checkpoints/{year}-{season}-{session}.json
 *   logs/parse-failures.json
 *
 * コスト見積もり (Gemini 2.5 Flash):
 *   AP 1年度: 問題PDF解析+解答PDF解析+解説生成 = 3呼び出し ≒ 数十円
 *   全試験区分: 最大 ¥1,000〜2,000
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Question } from "@/lib/questions/types";
import type { ExamCode, Session } from "@/lib/questions/types";
import {
  EXAM_CONFIGS,
  ALL_EXAM_CODES,
  buildPdfUrl,
  buildRawPdfPath,
  buildExtractionPrompt,
  buildAnswerExtractionPrompt,
  buildExplanationPrompt,
  type ExamConfig,
  type SessionConfig,
} from "@/lib/exam-config";

const RAW_DIR = join(process.cwd(), "data", "raw_pdfs");
const DATA_DIR = join(process.cwd(), "data", "questions");
const LOGS_DIR = join(process.cwd(), "logs");

// ------- CLI arg parsing -------

interface CliArgs {
  exams: ExamCode[];
  session?: Session;
  year?: number;
  season?: import("@/lib/questions/types").Season;
  resume: boolean;
}

function parseArgs(): CliArgs {
  const argv = process.argv.slice(2);
  let exams: ExamCode[] = [];
  let session: Session | undefined;
  let year: number | undefined;
  let season: import("@/lib/questions/types").Season | undefined;
  let resume = false;

  for (const arg of argv) {
    if (arg === "--all") {
      exams = ALL_EXAM_CODES.filter((e) => EXAM_CONFIGS[e].sessions.length > 0);
    } else if (arg.startsWith("--exam=")) {
      const code = arg.slice(7) as ExamCode;
      if (!EXAM_CONFIGS[code]) {
        console.error(`Unknown exam: ${code}. Valid: ${ALL_EXAM_CODES.join(", ")}`);
        process.exitCode = 1;
      } else {
        exams.push(code);
      }
    } else if (arg.startsWith("--session=")) {
      session = arg.slice(10) as Session;
    } else if (arg.startsWith("--year=")) {
      year = parseInt(arg.slice(7), 10);
    } else if (arg === "--season=spring") {
      season = "spring";
    } else if (arg === "--season=autumn") {
      season = "autumn";
    } else if (arg === "--resume") {
      resume = true;
    } else {
      console.warn(`Unknown arg: ${arg}`);
    }
  }

  if (exams.length === 0) exams = ["ap"];
  return { exams, session, year, season, resume };
}

// ------- Checkpoint helpers -------

interface Checkpoint {
  exam: ExamCode;
  year: number;
  season: import("@/lib/questions/types").Season;
  session: Session;
  questionCount: number;
  outputPath: string;
  completedAt: string;
}

function checkpointPath(exam: ExamCode, year: number, season: string, session: Session): string {
  return join(DATA_DIR, exam, ".checkpoints", `${year}-${season}-${session}.json`);
}

function isCheckpointed(exam: ExamCode, year: number, season: string, session: Session): boolean {
  return existsSync(checkpointPath(exam, year, season, session as Session));
}

function saveCheckpoint(cp: Checkpoint): void {
  const dir = join(DATA_DIR, cp.exam, ".checkpoints");
  mkdirSync(dir, { recursive: true });
  writeFileSync(checkpointPath(cp.exam, cp.year, cp.season, cp.session), JSON.stringify(cp, null, 2));
}

// ------- PDF helpers -------

function pdfToBase64(relPath: string): string {
  const abs = join(RAW_DIR, relPath);
  if (!existsSync(abs)) {
    throw new Error(`PDF not found: ${abs}\nRun: pnpm fetch:pdfs --exam=<exam>`);
  }
  return readFileSync(abs).toString("base64");
}

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

// ------- Gemini calls -------

type GeminiModel = ReturnType<InstanceType<typeof GoogleGenerativeAI>["getGenerativeModel"]>;

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

async function extractQuestions(
  model: GeminiModel,
  cfg: ExamConfig,
  sessionCfg: SessionConfig,
  year: number,
  season: import("@/lib/questions/types").Season,
): Promise<RawQuestion[]> {
  const qsPdfPath = buildRawPdfPath(cfg.code, year, season, sessionCfg.session, "qs");
  console.log(`  [questions] Sending PDF to Gemini...`);
  const pdfB64 = pdfToBase64(qsPdfPath);
  const prompt = buildExtractionPrompt(cfg, year, season, sessionCfg);

  const result = await model.generateContent([
    { inlineData: { mimeType: "application/pdf", data: pdfB64 } },
    prompt,
  ]);

  const text = result.response.text();
  const parsed = extractJson<RawQuestion[]>(text);
  if (!parsed || !Array.isArray(parsed)) {
    throw new Error(`Failed to parse questions JSON.\n${text.slice(0, 500)}`);
  }
  console.log(`  [questions] Extracted ${parsed.length} questions`);
  return parsed;
}

async function extractAnswers(
  model: GeminiModel,
  cfg: ExamConfig,
  sessionCfg: SessionConfig,
  year: number,
  season: import("@/lib/questions/types").Season,
): Promise<ParsedAnswers> {
  const ansPdfPath = buildRawPdfPath(cfg.code, year, season, sessionCfg.session, "ans");
  console.log(`  [answers] Sending answer PDF to Gemini...`);
  const pdfB64 = pdfToBase64(ansPdfPath);
  const prompt = buildAnswerExtractionPrompt(sessionCfg);

  const result = await model.generateContent([
    { inlineData: { mimeType: "application/pdf", data: pdfB64 } },
    prompt,
  ]);

  const text = result.response.text();
  const parsed = extractJson<ParsedAnswers>(text);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error(`Failed to parse answers JSON.\n${text.slice(0, 500)}`);
  }
  console.log(`  [answers] Extracted ${Object.keys(parsed).length} answers`);
  return parsed;
}

async function generateExplanations(
  model: GeminiModel,
  cfg: ExamConfig,
  sessionCfg: SessionConfig,
  rawQuestions: RawQuestion[],
  answers: ParsedAnswers,
): Promise<Record<number, string>> {
  console.log(`  [explanations] Generating for ${rawQuestions.length} questions...`);
  const qList = rawQuestions
    .filter((q) => !q.hasImage)
    .map((q) => {
      const ans = answers[String(q.qNumber)] ?? "?";
      return `問${q.qNumber}. ${q.question}\nア:${q.choices.ア} イ:${q.choices.イ} ウ:${q.choices.ウ} エ:${q.choices.エ}\n正解: ${ans}`;
    })
    .join("\n\n");

  const result = await model.generateContent(buildExplanationPrompt(cfg, sessionCfg, qList));
  const text = result.response.text();
  const parsed = extractJson<Record<string, string>>(text);

  if (!parsed) {
    console.warn(`  [explanations] Parse failed, using placeholders`);
    const fallback: Record<number, string> = {};
    for (const q of rawQuestions) {
      fallback[q.qNumber] = `正解は${answers[String(q.qNumber)] ?? "不明"}です。AIコパイロットに解説を依頼してください。`;
    }
    return fallback;
  }

  return Object.fromEntries(Object.entries(parsed).map(([k, v]) => [Number(k), v]));
}

// ------- Question assembly -------

function buildQuestions(
  cfg: ExamConfig,
  sessionCfg: SessionConfig,
  year: number,
  season: import("@/lib/questions/types").Season,
  rawQuestions: RawQuestion[],
  answers: ParsedAnswers,
  explanations: Record<number, string>,
): Question[] {
  const seasonLabel = season === "spring" ? "春期" : "秋期";
  const valid = ["ア", "イ", "ウ", "エ"] as const;
  const questions: Question[] = [];

  for (const raw of rawQuestions) {
    const ansKey = answers[String(raw.qNumber)];
    if (!ansKey || !valid.includes(ansKey as (typeof valid)[number])) {
      console.warn(`  [merge] Skipping 問${raw.qNumber}: invalid answer "${ansKey}"`);
      continue;
    }

    const sc = season === "spring" ? "h" : "a";
    const id = `${cfg.code}-${year}${sc}-${sessionCfg.session}-q${raw.qNumber}`;
    const reiwa = year - 2018;
    const reiwaLabel = reiwa >= 1 ? `令和${reiwa}年度` : `${year}年度`;
    const sourcePdfUrl = buildPdfUrl(cfg, year, season, sessionCfg, "qs");
    const explanation =
      explanations[raw.qNumber] ??
      `正解は${ansKey}です。（出典: IPA ${cfg.nameFull} ${reiwaLabel}${seasonLabel} ${sessionCfg.label} 問${raw.qNumber}）`;

    questions.push({
      id,
      exam: cfg.code,
      session: sessionCfg.session,
      year,
      season,
      qNumber: raw.qNumber,
      type: "multiple-choice",
      category: raw.category || "技術要素",
      topicTags: [],
      difficulty: 3,
      question: raw.question,
      choices: raw.choices,
      answer: ansKey as "ア" | "イ" | "ウ" | "エ",
      explanation,
      hasImage: raw.hasImage,
      sourcePdfUrl,
      license: "IPA-public",
    });
  }

  return questions;
}

// ------- File output -------

function writeQuestionsFile(
  cfg: ExamConfig,
  sessionCfg: SessionConfig,
  year: number,
  season: import("@/lib/questions/types").Season,
  questions: Question[],
): string {
  const outDir = join(DATA_DIR, cfg.code, "by-year");
  mkdirSync(outDir, { recursive: true });

  const key = `${year}-${season}-${sessionCfg.session}`;
  const outPath = join(outDir, `${key}.ts`);
  const varName = `${cfg.code.toUpperCase()}_QUESTIONS_${year}_${season.toUpperCase()}_${sessionCfg.session.toUpperCase().replace("-", "_")}`;
  const seasonLabel = season === "spring" ? "春期" : "秋期";

  const ts = `// Auto-generated by scripts/parse-pdf-to-json.ts — do not edit manually.
// Source: IPA ${cfg.nameFull} ${year}年度${seasonLabel} ${sessionCfg.label}
// Questions: ${questions.length}
import type { Question } from "@/lib/questions/types";

export const ${varName}: Question[] = ${JSON.stringify(questions, null, 2)};
`;

  writeFileSync(outPath, ts, "utf-8");
  console.log(`  [output] ${questions.length} questions → ${outPath}`);
  return outPath;
}

function regenerateBarrel(examCode: ExamCode): void {
  const outDir = join(DATA_DIR, examCode, "by-year");
  if (!existsSync(outDir)) return;

  // Find all generated .ts files (excluding index.ts itself)
  const files = (() => {
    try {
      const { readdirSync } = require("node:fs") as typeof import("node:fs");
      return readdirSync(outDir)
        .filter((f: string) => f.endsWith(".ts") && f !== "index.ts")
        .sort();
    } catch {
      return [];
    }
  })();

  if (files.length === 0) {
    writeFileSync(
      join(outDir, "index.ts"),
      `// No data yet. Run: pnpm parse:pdfs --exam=${examCode}\nimport type { Question } from "@/lib/questions/types";\nexport const BY_YEAR_QUESTIONS: Question[] = [];\n`,
    );
    return;
  }

  const imports = files
    .map((f: string) => {
      const base = f.replace(".ts", "");
      // Extract variable name from the first export const line
      const content = readFileSync(join(outDir, f), "utf-8");
      const match = content.match(/^export const (\w+):/m);
      return match ? `import { ${match[1]} } from "./${base}";` : null;
    })
    .filter(Boolean)
    .join("\n");

  const spreads = files
    .map((f: string) => {
      const content = readFileSync(join(outDir, f), "utf-8");
      const match = content.match(/^export const (\w+):/m);
      return match ? `  ...${match[1]}` : null;
    })
    .filter(Boolean)
    .join(",\n");

  const barrel = `// Auto-generated barrel — do not edit manually.
// Run pnpm parse:pdfs --exam=${examCode} to regenerate.
import type { Question } from "@/lib/questions/types";
${imports}

export const BY_YEAR_QUESTIONS: Question[] = [
${spreads},
];
`;

  writeFileSync(join(outDir, "index.ts"), barrel, "utf-8");
  console.log(`[barrel] ${examCode}/by-year/index.ts updated (${files.length} file(s))`);
}

// ------- Main processing loop -------

interface ParseFailure {
  exam: ExamCode;
  year: number;
  season: string;
  session: Session;
  stage: string;
  error: string;
  timestamp: string;
}

const failures: ParseFailure[] = [];

async function processOne(
  model: GeminiModel,
  cfg: ExamConfig,
  sessionCfg: SessionConfig,
  year: number,
  season: import("@/lib/questions/types").Season,
  resume: boolean,
): Promise<{ ok: number; skipped: number; failed: boolean }> {
  const label = `${cfg.nameFull} ${year} ${season} ${sessionCfg.label}`;
  console.log(`\n=== Processing ${label} ===`);

  if (resume && isCheckpointed(cfg.code, year, season, sessionCfg.session)) {
    console.log(`  [resume] Already processed, skipping.`);
    return { ok: 0, skipped: 1, failed: false };
  }

  const qsPdf = join(RAW_DIR, buildRawPdfPath(cfg.code, year, season, sessionCfg.session, "qs"));
  const ansPdf = join(RAW_DIR, buildRawPdfPath(cfg.code, year, season, sessionCfg.session, "ans"));

  if (!existsSync(qsPdf) || !existsSync(ansPdf)) {
    const missing = [!existsSync(qsPdf) ? "qs" : null, !existsSync(ansPdf) ? "ans" : null]
      .filter(Boolean)
      .join(", ");
    console.warn(`  [skip] PDFs missing: ${missing}`);
    console.warn(`  Run: pnpm fetch:pdfs --exam=${cfg.code}`);
    failures.push({ exam: cfg.code, year, season, session: sessionCfg.session, stage: "file-check", error: `PDFs missing: ${missing}`, timestamp: new Date().toISOString() });
    return { ok: 0, skipped: 0, failed: true };
  }

  try {
    const rawQuestions = await extractQuestions(model, cfg, sessionCfg, year, season);
    await delay(2000);
    const answers = await extractAnswers(model, cfg, sessionCfg, year, season);
    await delay(2000);
    const explanations = await generateExplanations(model, cfg, sessionCfg, rawQuestions, answers);
    await delay(1000);

    const questions = buildQuestions(cfg, sessionCfg, year, season, rawQuestions, answers, explanations);
    const skipped = rawQuestions.length - questions.length;
    console.log(`  [summary] Built: ${questions.length}, Skipped: ${skipped}`);

    const outPath = writeQuestionsFile(cfg, sessionCfg, year, season, questions);
    saveCheckpoint({
      exam: cfg.code,
      year,
      season,
      session: sessionCfg.session,
      questionCount: questions.length,
      outputPath: outPath,
      completedAt: new Date().toISOString(),
    });

    return { ok: questions.length, skipped, failed: false };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`  [ERROR] ${msg}`);
    failures.push({ exam: cfg.code, year, season, session: sessionCfg.session, stage: "parse", error: msg, timestamp: new Date().toISOString() });
    return { ok: 0, skipped: 0, failed: true };
  }
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function main(): Promise<void> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("ERROR: GEMINI_API_KEY is not set. Add to .env.local or export.");
    process.exitCode = 1;
    return;
  }

  const { exams, session: filterSession, year: filterYear, season: filterSeason, resume } = parseArgs();
  if (process.exitCode === 1) return;

  mkdirSync(LOGS_DIR, { recursive: true });

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: { responseMimeType: "text/plain" },
  });

  let totalOk = 0;
  let totalSkipped = 0;
  let totalFailed = 0;

  for (const examCode of exams) {
    const cfg = EXAM_CONFIGS[examCode];
    if (cfg.sessions.length === 0) {
      console.log(`[skip] ${cfg.nameFull} — no parseable sessions (CBT)`);
      continue;
    }

    const sessions = filterSession
      ? cfg.sessions.filter((s) => s.session === filterSession)
      : cfg.sessions;

    if (sessions.length === 0) {
      console.warn(`[skip] ${examCode}: session "${filterSession}" not found`);
      continue;
    }

    const years: number[] = [];
    for (let y = cfg.yearRange.start; y <= cfg.yearRange.end; y++) years.push(y);

    const seasons = filterSeason ? [filterSeason] : cfg.seasons;

    for (const year of years) {
      if (filterYear && year !== filterYear) continue;
      for (const season of seasons) {
        for (const sessionCfg of sessions) {
          const r = await processOne(model, cfg, sessionCfg, year, season, resume);
          totalOk += r.ok;
          totalSkipped += r.skipped;
          if (r.failed) totalFailed++;
          if (!r.failed && !r.skipped) await delay(3000);
        }
      }
    }

    regenerateBarrel(examCode);
  }

  if (failures.length > 0) {
    const logPath = join(LOGS_DIR, "parse-failures.json");
    writeFileSync(logPath, JSON.stringify(failures, null, 2));
    console.log(`\n[failures] ${failures.length} failure(s) → ${logPath}`);
  }

  console.log(`\n=== Done ===`);
  console.log(`Questions built: ${totalOk}`);
  console.log(`Skipped: ${totalSkipped}`);
  console.log(`Failed: ${totalFailed}`);

  if (totalFailed > 0) process.exitCode = 1;
}

main();
