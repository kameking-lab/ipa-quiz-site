/**
 * AP午後問題 PDF → AfternoonQuestion[] 変換スクリプト。
 *
 * 必要な環境変数:
 *   GEMINI_API_KEY  ... Google AI Studio で取得
 *
 * 使い方（金田ローカルで実行する想定）:
 *   pnpm parse:afternoon                       # 直近3年分
 *   pnpm parse:afternoon --year=2024 --season=spring
 *   pnpm parse:afternoon --dry-run             # ファイル出力せず標準出力のみ
 *
 * 入力:
 *   data/raw_pdfs/ap/{year}-{season}/pm_qs.pdf  ... 問題PDF
 *   data/raw_pdfs/ap/{year}-{season}/pm_ans.pdf ... 解答PDF
 *
 * 出力:
 *   data/questions/afternoon/ap/{year}-{season}.ts
 *
 * 備考:
 *   - 午後問題は構造が複雑（大問の下にサブ設問がネストする）ため、
 *     Gemini Vision に対して厳密な JSON Schema を指定して抽出する。
 *   - 採点ルーブリックは IPA 解答例から自動生成する（編集者校正前提）。
 *   - 実行は金田のローカル環境のみ。CI では走らせない。
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { AfternoonQuestion, SubQuestion } from "@/lib/afternoon/types";
import type { Season } from "@/lib/questions/types";

const RAW_DIR = join(process.cwd(), "data", "raw_pdfs");
const OUT_DIR = join(process.cwd(), "data", "questions", "afternoon", "ap");

interface CliArgs {
  year?: number;
  season?: Season;
  dryRun: boolean;
}

function parseArgs(): CliArgs {
  const argv = process.argv.slice(2);
  let year: number | undefined;
  let season: Season | undefined;
  let dryRun = false;

  for (const arg of argv) {
    if (arg.startsWith("--year=")) {
      year = parseInt(arg.slice(7), 10);
    } else if (arg === "--season=spring") {
      season = "spring";
    } else if (arg === "--season=autumn") {
      season = "autumn";
    } else if (arg === "--dry-run") {
      dryRun = true;
    } else {
      console.warn(`Unknown arg: ${arg}`);
    }
  }
  return { year, season, dryRun };
}

interface RawSubQuestion {
  label: string;
  prompt: string;
  type: "short-text" | "long-text" | "fill-blank" | "choice";
  maxLength?: number;
  modelAnswer: string;
  scoringRubric: string;
  points?: number;
}

interface RawAfternoonQuestion {
  qNumber: number;
  category: string;
  title: string;
  context: string;
  subQuestions: RawSubQuestion[];
}

function buildExtractionPrompt(year: number, season: Season): string {
  const seasonLabel = season === "spring" ? "春期" : "秋期";
  return `あなたはIPA応用情報技術者試験の過去問を構造化するエキスパートです。
添付したPDFは IPA ${year}年度${seasonLabel} 応用情報技術者試験 午後試験 の問題冊子と解答例です。

このPDFから、各「大問」（問1〜問11）を以下のJSON Schemaで抽出してください。

[
  {
    "qNumber": <number>,
    "category": "<大問のテーマ。例: '情報セキュリティ', 'データベース' など>",
    "title": "<大問のタイトル。例: '中堅製造業のSaaS導入'>",
    "context": "<大問本文。背景・図表のテキスト化・問題文を含む。Markdownで整形可>",
    "subQuestions": [
      {
        "label": "<例: '設問1', '設問2(1)'>",
        "prompt": "<サブ設問の文>",
        "type": "<short-text | long-text | fill-blank | choice のいずれか>",
        "maxLength": <字数制限。なければ省略>,
        "modelAnswer": "<IPA解答例 or 編集者作成>",
        "scoringRubric": "<採点観点。キーワード列挙形式で>",
        "points": <配点>
      }
    ]
  }
]

注意:
- 図・表は可能な限りテキスト化してください
- IPA解答例が複数ある場合はカンマ区切りで列挙
- 採点ルーブリックは IPA解答例から要点キーワードを抽出して作成

JSONのみを返してください。前後の説明は不要です。`;
}

function extractJson<T>(text: string): T | null {
  const fenced = text.match(/```(?:json)?\s*([\s\S]+?)```/);
  const candidate = fenced ? fenced[1] : text;
  const arrMatch = candidate.match(/(\[[\s\S]*\])/);
  const raw = arrMatch?.[1] ?? candidate.trim();
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function pdfToBase64(relPath: string): string {
  const abs = join(RAW_DIR, relPath);
  if (!existsSync(abs)) {
    throw new Error(`PDF not found: ${abs}`);
  }
  return readFileSync(abs).toString("base64");
}

function buildId(year: number, season: Season, qNumber: number): string {
  const sc = season === "spring" ? "h" : "a";
  return `ap-${year}${sc}-pm-q${qNumber}`;
}

function buildPdfUrl(year: number, season: Season): string {
  const sc = season === "spring" ? "h" : "a";
  return `https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_${year}${sc}05_1/${year}${sc}05${sc}_ap_pm_qs.pdf`;
}

function toAfternoonQuestion(
  raw: RawAfternoonQuestion,
  year: number,
  season: Season,
): AfternoonQuestion {
  const subQuestions: SubQuestion[] = raw.subQuestions.map((s) => ({
    label: s.label,
    prompt: s.prompt,
    type: s.type,
    maxLength: s.maxLength,
    modelAnswer: s.modelAnswer,
    scoringRubric: s.scoringRubric,
    points: s.points,
  }));

  return {
    id: buildId(year, season, raw.qNumber),
    exam: "ap",
    year,
    season,
    qNumber: raw.qNumber,
    type: "descriptive",
    category: raw.category,
    title: raw.title,
    context: raw.context,
    subQuestions,
    pdfUrl: buildPdfUrl(year, season),
    license: "IPA-public",
    totalTimeMinutes: 150,
  };
}

function writeOutput(year: number, season: Season, questions: AfternoonQuestion[]): string {
  mkdirSync(OUT_DIR, { recursive: true });
  const outPath = join(OUT_DIR, `${year}-${season}.ts`);
  const varName = `AP_AFTERNOON_${year}_${season.toUpperCase()}`;
  const ts = `// Auto-generated by scripts/parse-afternoon/parse-ap-afternoon.ts — do not edit manually.
// Source: IPA 応用情報技術者試験 ${year}年度 ${season === "spring" ? "春期" : "秋期"} 午後
import type { AfternoonQuestion } from "@/lib/afternoon/types";

export const ${varName}: AfternoonQuestion[] = ${JSON.stringify(questions, null, 2)};
`;
  writeFileSync(outPath, ts, "utf-8");
  return outPath;
}

async function processOne(
  model: ReturnType<InstanceType<typeof GoogleGenerativeAI>["getGenerativeModel"]>,
  year: number,
  season: Season,
  dryRun: boolean,
): Promise<void> {
  console.log(`\n=== AP 午後 ${year} ${season} ===`);
  const qsPath = `ap/${year}-${season}/pm_qs.pdf`;
  const ansPath = `ap/${year}-${season}/pm_ans.pdf`;

  const qsBase64 = pdfToBase64(qsPath);
  const ansBase64 = existsSync(join(RAW_DIR, ansPath)) ? pdfToBase64(ansPath) : null;

  const prompt = buildExtractionPrompt(year, season);
  const parts: Array<
    | { inlineData: { mimeType: string; data: string } }
    | string
  > = [{ inlineData: { mimeType: "application/pdf", data: qsBase64 } }];
  if (ansBase64) parts.push({ inlineData: { mimeType: "application/pdf", data: ansBase64 } });
  parts.push(prompt);

  console.log(`  Calling Gemini Vision...`);
  const result = await model.generateContent(parts);
  const text = result.response.text();
  const parsed = extractJson<RawAfternoonQuestion[]>(text);
  if (!parsed || !Array.isArray(parsed)) {
    throw new Error(`Failed to parse JSON.\n${text.slice(0, 500)}`);
  }

  const questions = parsed.map((p) => toAfternoonQuestion(p, year, season));
  console.log(`  Extracted ${questions.length} 大問`);

  if (dryRun) {
    console.log(JSON.stringify(questions, null, 2));
    return;
  }

  const outPath = writeOutput(year, season, questions);
  console.log(`  Wrote: ${outPath}`);
}

async function main(): Promise<void> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("ERROR: GEMINI_API_KEY is not set.");
    process.exitCode = 1;
    return;
  }

  const { year, season, dryRun } = parseArgs();

  const targets: Array<{ year: number; season: Season }> =
    year && season
      ? [{ year, season }]
      : [
          { year: 2024, season: "spring" },
          { year: 2023, season: "autumn" },
          { year: 2023, season: "spring" },
        ];

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "text/plain",
      maxOutputTokens: 65536,
    },
  });

  for (const t of targets) {
    try {
      await processOne(model, t.year, t.season, dryRun);
      await new Promise((r) => setTimeout(r, 3000));
    } catch (err) {
      console.error(`  [ERROR] ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  console.log(`\n=== Done ===`);
}

main();
