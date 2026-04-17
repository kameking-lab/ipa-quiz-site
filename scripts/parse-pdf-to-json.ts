/**
 * IPA 応用情報技術者試験 過去問 PDF → TypeScript 問題データ変換スクリプト。
 *
 * 必要な環境変数:
 *   GEMINI_API_KEY  ... Google AI Studio で取得
 *
 * 使い方:
 *   1. pnpm tsx scripts/fetch-ipa-pdfs.ts   # PDFを data/raw_pdfs/ に取得
 *   2. pnpm tsx scripts/parse-pdf-to-json.ts # PDFを解析してデータ生成
 *
 * 出力:
 *   data/questions/ap/by-year/{year}-{season}.ts  ... 各年度の問題データ
 *   data/questions/ap/by-year/index.ts             ... バレルファイル (自動生成)
 *   logs/parse-failures.json                        ... 失敗ログ
 *
 * コスト見積もり (Gemini 2.5 Flash):
 *   - 1年度あたり: 問題PDF解析×1 + 解答PDF解析×1 + 解説生成×1 = 3呼び出し
 *   - 5年度 × 3呼び出し = 15呼び出し
 *   - PDFページ数: 約16ページ/回 × 15 = 約240ページ処理
 *   - 推定コスト: 数十円〜百円程度
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Question } from "@/lib/questions/types";

const RAW_DIR = join(process.cwd(), "data", "raw_pdfs");
const OUT_DIR = join(process.cwd(), "data", "questions", "ap", "by-year");
const LOGS_DIR = join(process.cwd(), "logs");

interface YearConfig {
  year: number;
  season: "spring" | "autumn";
  key: string;
  qsPdfPath: string;
  ansPdfPath: string;
  sourcePdfUrl: string;
}

const YEAR_CONFIGS: YearConfig[] = [
  {
    year: 2023,
    season: "spring",
    key: "2023-spring",
    qsPdfPath: "ap/2023-spring/am_qs.pdf",
    ansPdfPath: "ap/2023-spring/am_ans.pdf",
    sourcePdfUrl:
      "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2023h05_1/2023h05h_ap_am_qs.pdf",
  },
  {
    year: 2023,
    season: "autumn",
    key: "2023-autumn",
    qsPdfPath: "ap/2023-autumn/am_qs.pdf",
    ansPdfPath: "ap/2023-autumn/am_ans.pdf",
    sourcePdfUrl:
      "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2023h05_2/2023h05a_ap_am_qs.pdf",
  },
  {
    year: 2024,
    season: "spring",
    key: "2024-spring",
    qsPdfPath: "ap/2024-spring/am_qs.pdf",
    ansPdfPath: "ap/2024-spring/am_ans.pdf",
    sourcePdfUrl:
      "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2024h06_1/2024h06h_ap_am_qs.pdf",
  },
  {
    year: 2024,
    season: "autumn",
    key: "2024-autumn",
    qsPdfPath: "ap/2024-autumn/am_qs.pdf",
    ansPdfPath: "ap/2024-autumn/am_ans.pdf",
    sourcePdfUrl:
      "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2024h06_2/2024h06a_ap_am_qs.pdf",
  },
  {
    year: 2025,
    season: "spring",
    key: "2025-spring",
    qsPdfPath: "ap/2025-spring/am_qs.pdf",
    ansPdfPath: "ap/2025-spring/am_ans.pdf",
    sourcePdfUrl:
      "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2025h07_1/2025h07h_ap_am_qs.pdf",
  },
];

interface RawQuestion {
  qNumber: number;
  question: string;
  choices: { ア: string; イ: string; ウ: string; エ: string };
  category: string;
  hasImage: boolean;
}

interface ParsedAnswer {
  [qNumber: string]: string;
}

interface ParseFailure {
  year: number;
  season: string;
  stage: string;
  error: string;
  timestamp: string;
}

const failures: ParseFailure[] = [];

function pdfToBase64(filePath: string): string {
  const abs = join(RAW_DIR, filePath);
  if (!existsSync(abs)) {
    throw new Error(`PDF not found: ${abs}\nRun: pnpm tsx scripts/fetch-ipa-pdfs.ts`);
  }
  return readFileSync(abs).toString("base64");
}

function extractJson<T>(text: string): T | null {
  // Gemini sometimes wraps JSON in ```json ... ``` or adds text around it
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

async function extractQuestions(
  model: ReturnType<InstanceType<typeof GoogleGenerativeAI>["getGenerativeModel"]>,
  cfg: YearConfig,
): Promise<RawQuestion[]> {
  console.log(`  [questions] Sending question PDF to Gemini...`);
  const pdfB64 = pdfToBase64(cfg.qsPdfPath);

  const prompt = `This is the IPA (情報処理技術者試験) Applied Information Technology Engineer (応用情報技術者) morning exam (午前) question PDF for ${cfg.year} ${cfg.season === "spring" ? "spring (春期)" : "autumn (秋期)"}.

Extract ALL 80 multiple-choice questions. Each question has:
- 問番号 (question number): 問1 through 問80
- 問題文 (question text)
- 選択肢 labeled ア, イ, ウ, エ

Return ONLY a valid JSON array (no markdown, no explanation text) with this structure:
[
  {
    "qNumber": 1,
    "question": "問題文の全文をここに",
    "choices": {
      "ア": "選択肢アの全文",
      "イ": "選択肢イの全文",
      "ウ": "選択肢ウの全文",
      "エ": "選択肢エの全文"
    },
    "category": "基礎理論",
    "hasImage": false
  }
]

For category, use one of these values based on the question content:
- 基礎理論 (logic, sets, automata, information theory, number systems)
- アルゴリズムとプログラミング (algorithms, sorting, data structures, programming)
- コンピュータシステム (CPU, memory, OS, hardware)
- ネットワーク (TCP/IP, protocols, network design)
- データベース (SQL, normalization, transactions, ER diagrams)
- セキュリティ (cryptography, authentication, threats, countermeasures)
- 開発技術 (software engineering, testing, UML, development processes)
- プロジェクトマネジメント (PMBOK, EVM, scheduling, risk management)
- サービスマネジメント (ITIL, SLA, incident management)
- システム戦略 (IT strategy, BPR, architecture planning)
- 経営戦略 (Porter's forces, BCG, balanced scorecard, M&A)
- 企業と法務 (intellectual property, labor law, personal information protection, corporate governance)

Set hasImage to true if the question references a diagram, figure, or table that cannot be fully expressed in text.

Important: Extract questions exactly as written. Do not paraphrase or summarize.`;

  const result = await model.generateContent([
    { inlineData: { mimeType: "application/pdf", data: pdfB64 } },
    prompt,
  ]);

  const text = result.response.text();
  const parsed = extractJson<RawQuestion[]>(text);

  if (!parsed || !Array.isArray(parsed)) {
    throw new Error(`Failed to parse questions JSON. Raw response (first 500 chars):\n${text.slice(0, 500)}`);
  }

  console.log(`  [questions] Extracted ${parsed.length} questions`);
  return parsed;
}

async function extractAnswers(
  model: ReturnType<InstanceType<typeof GoogleGenerativeAI>["getGenerativeModel"]>,
  cfg: YearConfig,
): Promise<ParsedAnswer> {
  console.log(`  [answers] Sending answer PDF to Gemini...`);
  const pdfB64 = pdfToBase64(cfg.ansPdfPath);

  const prompt = `This is the answer sheet PDF for the IPA Applied Information Technology Engineer (応用情報技術者) morning exam (午前).

Extract all 80 answers. Return ONLY a valid JSON object (no markdown) mapping question numbers to answers:
{
  "1": "ア",
  "2": "イ",
  "3": "ウ",
  ...
  "80": "エ"
}

Answers are one of: ア, イ, ウ, エ`;

  const result = await model.generateContent([
    { inlineData: { mimeType: "application/pdf", data: pdfB64 } },
    prompt,
  ]);

  const text = result.response.text();
  const parsed = extractJson<ParsedAnswer>(text);

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error(`Failed to parse answers JSON. Raw response (first 500 chars):\n${text.slice(0, 500)}`);
  }

  const count = Object.keys(parsed).length;
  console.log(`  [answers] Extracted ${count} answers`);
  return parsed;
}

async function generateExplanations(
  model: ReturnType<InstanceType<typeof GoogleGenerativeAI>["getGenerativeModel"]>,
  questions: RawQuestion[],
  answers: ParsedAnswer,
): Promise<Record<number, string>> {
  console.log(`  [explanations] Generating explanations for ${questions.length} questions...`);

  const textOnlyQuestions = questions
    .filter((q) => !q.hasImage)
    .slice(0, 80);

  const qList = textOnlyQuestions
    .map((q) => {
      const ans = answers[String(q.qNumber)] ?? "?";
      return `問${q.qNumber}. ${q.question}
ア:${q.choices.ア} イ:${q.choices.イ} ウ:${q.choices.ウ} エ:${q.choices.エ}
正解: ${ans}`;
    })
    .join("\n\n");

  const prompt = `以下はIPA応用情報技術者試験 午前問題です。各問について、正解の根拠を日本語で2〜3文で説明してください。

回答形式: 問題番号をキー、説明文を値とするJSONオブジェクト (マークダウン不要、JSONのみ):
{
  "1": "問1の解説文",
  "2": "問2の解説文",
  ...
}

問題リスト:
${qList}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const parsed = extractJson<Record<string, string>>(text);

  if (!parsed) {
    console.warn(`  [explanations] Warning: failed to parse explanation JSON, using placeholders`);
    const fallback: Record<number, string> = {};
    for (const q of questions) {
      fallback[q.qNumber] = `正解は${answers[String(q.qNumber)] ?? "不明"}です。AIコパイロットに詳しい解説を依頼してください。`;
    }
    return fallback;
  }

  const result2: Record<number, string> = {};
  for (const [k, v] of Object.entries(parsed)) {
    result2[Number(k)] = v;
  }
  return result2;
}

function buildSeasonLabel(season: "spring" | "autumn"): string {
  return season === "spring" ? "春期" : "秋期";
}

function buildQuestions(
  cfg: YearConfig,
  rawQuestions: RawQuestion[],
  answers: ParsedAnswer,
  explanations: Record<number, string>,
): Question[] {
  const questions: Question[] = [];

  for (const raw of rawQuestions) {
    const answerKey = answers[String(raw.qNumber)];
    if (!answerKey) {
      console.warn(`  [merge] No answer for 問${raw.qNumber}, skipping`);
      continue;
    }

    const validChoiceKeys = ["ア", "イ", "ウ", "エ"] as const;
    if (!validChoiceKeys.includes(answerKey as (typeof validChoiceKeys)[number])) {
      console.warn(`  [merge] Invalid answer key "${answerKey}" for 問${raw.qNumber}, skipping`);
      continue;
    }

    const seasonLabel = buildSeasonLabel(cfg.season);
    const id = `ap-${cfg.year}${cfg.season === "spring" ? "h" : "a"}-am-q${raw.qNumber}`;
    const explanation =
      explanations[raw.qNumber] ??
      `正解は${answerKey}です。（出典: IPA応用情報技術者試験 令和${cfg.year - 2018}年度${seasonLabel} 午前 問${raw.qNumber}）`;

    questions.push({
      id,
      exam: "ap",
      session: "am",
      year: cfg.year,
      season: cfg.season,
      qNumber: raw.qNumber,
      type: "multiple-choice",
      category: raw.category || "技術要素",
      topicTags: [],
      difficulty: 3,
      question: raw.question,
      choices: raw.choices,
      answer: answerKey as "ア" | "イ" | "ウ" | "エ",
      explanation,
      hasImage: raw.hasImage,
      sourcePdfUrl: cfg.sourcePdfUrl,
      license: "IPA-public",
    });
  }

  return questions;
}

function writeTypeScriptFile(cfg: YearConfig, questions: Question[]): void {
  mkdirSync(OUT_DIR, { recursive: true });

  const outPath = join(OUT_DIR, `${cfg.key}.ts`);
  const varName = `AP_QUESTIONS_${cfg.year}_${cfg.season.toUpperCase()}`;

  const ts = `// Auto-generated by scripts/parse-pdf-to-json.ts — do not edit manually.
// Source: IPA 応用情報技術者試験 ${cfg.year}年度${buildSeasonLabel(cfg.season)} 午前
// Questions: ${questions.length} (hasImage excluded if any)
import type { Question } from "@/lib/questions/types";

export const ${varName}: Question[] = ${JSON.stringify(questions, null, 2)};
`;

  writeFileSync(outPath, ts, "utf-8");
  console.log(`  [output] Wrote ${questions.length} questions → ${outPath}`);
}

function regenerateBarrel(): void {
  const existingKeys = YEAR_CONFIGS.map((c) => c.key).filter((key) =>
    existsSync(join(OUT_DIR, `${key}.ts`)),
  );

  if (existingKeys.length === 0) {
    const barrel = `// Auto-generated barrel — no by-year data yet.
// Run: pnpm parse:pdfs
import type { Question } from "@/lib/questions/types";
export const AP_BY_YEAR_QUESTIONS: Question[] = [];
`;
    writeFileSync(join(OUT_DIR, "index.ts"), barrel, "utf-8");
    return;
  }

  const imports = existingKeys
    .map((key) => {
      const cfg = YEAR_CONFIGS.find((c) => c.key === key)!;
      const varName = `AP_QUESTIONS_${cfg.year}_${cfg.season.toUpperCase()}`;
      return `import { ${varName} } from "./${key}";`;
    })
    .join("\n");

  const spread = existingKeys
    .map((key) => {
      const cfg = YEAR_CONFIGS.find((c) => c.key === key)!;
      return `  ...AP_QUESTIONS_${cfg.year}_${cfg.season.toUpperCase()}`;
    })
    .join(",\n");

  const barrel = `// Auto-generated barrel — do not edit manually.
// Run pnpm parse:pdfs to regenerate.
import type { Question } from "@/lib/questions/types";
${imports}

export const AP_BY_YEAR_QUESTIONS: Question[] = [
${spread},
];
`;
  writeFileSync(join(OUT_DIR, "index.ts"), barrel, "utf-8");
  console.log(`[barrel] Regenerated index.ts with ${existingKeys.length} year(s)`);
}

async function processYear(
  model: ReturnType<InstanceType<typeof GoogleGenerativeAI>["getGenerativeModel"]>,
  cfg: YearConfig,
): Promise<{ ok: number; skipped: number; failed: boolean }> {
  const label = `${cfg.year} ${buildSeasonLabel(cfg.season)}`;
  console.log(`\n=== Processing AP ${label} ===`);

  const qsPdfAbs = join(RAW_DIR, cfg.qsPdfPath);
  const ansPdfAbs = join(RAW_DIR, cfg.ansPdfPath);

  if (!existsSync(qsPdfAbs) || !existsSync(ansPdfAbs)) {
    const missing = [
      !existsSync(qsPdfAbs) ? cfg.qsPdfPath : null,
      !existsSync(ansPdfAbs) ? cfg.ansPdfPath : null,
    ]
      .filter(Boolean)
      .join(", ");
    console.warn(`  [skip] PDFs not found: ${missing}`);
    console.warn(`  Run: pnpm tsx scripts/fetch-ipa-pdfs.ts`);
    failures.push({
      year: cfg.year,
      season: cfg.season,
      stage: "file-check",
      error: `PDFs missing: ${missing}`,
      timestamp: new Date().toISOString(),
    });
    return { ok: 0, skipped: 0, failed: true };
  }

  try {
    const rawQuestions = await extractQuestions(model, cfg);
    // Throttle to avoid rate limits
    await new Promise((r) => setTimeout(r, 2000));

    const answers = await extractAnswers(model, cfg);
    await new Promise((r) => setTimeout(r, 2000));

    const explanations = await generateExplanations(model, rawQuestions, answers);
    await new Promise((r) => setTimeout(r, 1000));

    const questions = buildQuestions(cfg, rawQuestions, answers, explanations);
    const withImage = rawQuestions.filter((q) => q.hasImage).length;
    const skipped = rawQuestions.length - questions.length;

    console.log(`  [summary] Total: ${rawQuestions.length}, Built: ${questions.length}, HasImage: ${withImage}, Skipped: ${skipped}`);
    writeTypeScriptFile(cfg, questions);

    return { ok: questions.length, skipped, failed: false };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`  [ERROR] ${msg}`);
    failures.push({
      year: cfg.year,
      season: cfg.season,
      stage: "parse",
      error: msg,
      timestamp: new Date().toISOString(),
    });
    return { ok: 0, skipped: 0, failed: true };
  }
}

async function main(): Promise<void> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("ERROR: GEMINI_API_KEY is not set.");
    console.error("Set it in .env.local or export GEMINI_API_KEY=your-key");
    process.exitCode = 1;
    return;
  }

  mkdirSync(OUT_DIR, { recursive: true });
  mkdirSync(LOGS_DIR, { recursive: true });

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: { responseMimeType: "text/plain" },
  });

  let totalOk = 0;
  let totalSkipped = 0;
  let totalFailed = 0;

  const targetKeys = process.argv[2] ? [process.argv[2]] : YEAR_CONFIGS.map((c) => c.key);

  for (const key of targetKeys) {
    const cfg = YEAR_CONFIGS.find((c) => c.key === key);
    if (!cfg) {
      console.error(`Unknown year key: ${key}. Valid keys: ${YEAR_CONFIGS.map((c) => c.key).join(", ")}`);
      continue;
    }
    const r = await processYear(model, cfg);
    totalOk += r.ok;
    totalSkipped += r.skipped;
    if (r.failed) totalFailed++;
    // Throttle between years
    await new Promise((r2) => setTimeout(r2, 3000));
  }

  regenerateBarrel();

  if (failures.length > 0) {
    const logPath = join(LOGS_DIR, "parse-failures.json");
    writeFileSync(logPath, JSON.stringify(failures, null, 2), "utf-8");
    console.log(`\n[failures] Logged ${failures.length} failure(s) → ${logPath}`);
  }

  console.log(`\n=== Done ===`);
  console.log(`Questions built: ${totalOk}`);
  console.log(`Skipped (hasImage/no-answer): ${totalSkipped}`);
  console.log(`Years failed: ${totalFailed}`);

  if (totalFailed > 0) process.exitCode = 1;
}

main();
