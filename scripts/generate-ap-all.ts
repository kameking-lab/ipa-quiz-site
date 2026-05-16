/**
 * AP 午前問題 全年度一括生成スクリプト (2009-2025)
 *
 * IPA 公式 ipa.go.jp の PDF URL から直接 Gemini に送信して問題データを生成する。
 * ローカルへの PDF ダウンロード不要。
 *
 * 使い方:
 *   pnpm tsx scripts/generate-ap-all.ts              # 未処理の全年度を処理
 *   pnpm tsx scripts/generate-ap-all.ts --year=2022  # 特定年度のみ
 *   pnpm tsx scripts/generate-ap-all.ts --resume     # 既存ファイルをスキップ (デフォルト動作)
 *   pnpm tsx scripts/generate-ap-all.ts --force      # 既存ファイルも再生成
 *
 * 出力:
 *   data/questions/ap/by-year/{year}-{season}.ts
 *   data/questions/ap/by-year/index.ts (自動更新)
 *
 * 注意:
 *   - GEMINI_API_KEY が必要 (.env.local に設定)
 *   - Gemini 2.5 Flash を使用 (PDFページ解析対応)
 *   - レート制限: 各Gemini呼び出し後 2-3秒待機
 */

import { existsSync, writeFileSync, readFileSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Question } from "@/lib/questions/types";

// ─── 環境変数読み込み ───────────────────────────────────────
function loadEnv(): void {
  const envPath = join(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return;
  const lines = readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
}
loadEnv();

// ─── 定数 ────────────────────────────────────────────────────
const DATA_DIR = join(process.cwd(), "data", "questions", "ap", "by-year");
const CHECKPOINT_DIR = join(process.cwd(), "data", "questions", "ap", ".checkpoints");

// ─── URL マップ (IPA公式 ipa.go.jp 確定URL) ──────────────────

interface ExamEntry {
  year: number;
  season: "spring" | "autumn";
  qsUrl: string;
  ansUrl: string;
  note?: string; // 特別試験・10月試験など
}

const URL_MAP: ExamEntry[] = [
  // ── 2009 (平成21年度) ──
  {
    year: 2009, season: "spring",
    qsUrl:  "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000009bhl-att/2009h21h_ap_am_qs.pdf",
    ansUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000009bhl-att/2009h21h_ap_am_ans.pdf",
  },
  {
    year: 2009, season: "autumn",
    qsUrl:  "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f3yi-att/2009h21a_ap_am_qs.pdf",
    ansUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f3yi-att/2009h21a_ap_am_ans.pdf",
  },
  // ── 2010 (平成22年度) ──
  {
    year: 2010, season: "spring",
    qsUrl:  "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000004n2z-att/2010h22h_ap_am_qs.pdf",
    ansUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000004n2z-att/2010h22h_ap_am_ans.pdf",
  },
  {
    year: 2010, season: "autumn",
    qsUrl:  "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000004d6f-att/2010h22a_ap_am_qs.pdf",
    ansUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000004d6f-att/2010h22a_ap_am_ans.pdf",
  },
  // ── 2011 (平成23年度) 春なし → 特別試験を spring 扱い ──
  {
    year: 2011, season: "spring",
    qsUrl:  "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000003ya2-att/2011h23tokubetsu_ap_am_qs.pdf",
    ansUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000003ya2-att/2011h23tokubetsu_ap_am_ans.pdf",
    note: "特別試験（東日本大震災により春期を振替）",
  },
  {
    year: 2011, season: "autumn",
    qsUrl:  "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000003ojp-att/2011h23a_ap_am_qs.pdf",
    ansUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000003ojp-att/2011h23a_ap_am_ans.pdf",
  },
  // ── 2012 (平成24年度) ──
  {
    year: 2012, season: "spring",
    qsUrl:  "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000038er-att/2012h24h_ap_am_qs.pdf",
    ansUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000038er-att/2012h24h_ap_am_ans.pdf",
  },
  {
    year: 2012, season: "autumn",
    qsUrl:  "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_ap_am_qs.pdf",
    ansUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002h5m-att/2012h24a_ap_am_ans.pdf",
  },
  // ── 2013 (平成25年度) ──
  {
    year: 2013, season: "spring",
    qsUrl:  "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002e6g-att/2013h25h_ap_am_qs.pdf",
    ansUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000002e6g-att/2013h25h_ap_am_ans.pdf",
  },
  {
    year: 2013, season: "autumn",
    qsUrl:  "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_ap_am_qs.pdf",
    ansUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p900000027za-att/2013h25a_ap_am_ans.pdf",
  },
  // ── 2014 (平成26年度) ──
  {
    year: 2014, season: "spring",
    qsUrl:  "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000001dzu-att/2014h26h_ap_am_qs.pdf",
    ansUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000001dzu-att/2014h26h_ap_am_ans.pdf",
  },
  {
    year: 2014, season: "autumn",
    qsUrl:  "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_ap_am_qs.pdf",
    ansUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000ye5-att/2014h26a_ap_am_ans.pdf",
  },
  // ── 2015 (平成27年度) ──
  {
    year: 2015, season: "spring",
    qsUrl:  "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000f52-att/2015h27h_ap_am_qs.pdf",
    ansUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/ug65p90000000f52-att/2015h27h_ap_am_ans.pdf",
  },
  {
    year: 2015, season: "autumn",
    qsUrl:  "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_ap_am_qs.pdf",
    ansUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_ap_am_ans.pdf",
  },
  // ── 2016 (平成28年度) ──
  {
    year: 2016, season: "spring",
    qsUrl:  "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gn5o-att/2016h28h_ap_am_qs.pdf",
    ansUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gn5o-att/2016h28h_ap_am_ans.pdf",
  },
  {
    year: 2016, season: "autumn",
    qsUrl:  "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_ap_am_qs.pdf",
    ansUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_ap_am_ans.pdf",
  },
  // ── 2017 (平成29年度) ──
  {
    year: 2017, season: "spring",
    qsUrl:  "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_ap_am_qs.pdf",
    ansUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fzx1-att/2017h29h_ap_am_ans.pdf",
  },
  {
    year: 2017, season: "autumn",
    qsUrl:  "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_ap_am_qs.pdf",
    ansUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_ap_am_ans.pdf",
  },
  // ── 2018 (平成30年度) ──
  {
    year: 2018, season: "spring",
    qsUrl:  "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_ap_am_qs.pdf",
    ansUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fabr-att/2018h30h_ap_am_ans.pdf",
  },
  {
    year: 2018, season: "autumn",
    qsUrl:  "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_ap_am_qs.pdf",
    ansUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f01f-att/2018h30a_ap_am_ans.pdf",
  },
  // ── 2019 (平成31/令和元年度) 春=H31, 秋=R1 ──
  {
    year: 2019, season: "spring",
    qsUrl:  "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000ddiw-att/2019h31h_ap_am_qs.pdf",
    ansUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000ddiw-att/2019h31h_ap_am_ans.pdf",
  },
  {
    year: 2019, season: "autumn",
    qsUrl:  "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_ap_am_qs.pdf",
    ansUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000dict-att/2019r01a_ap_am_ans.pdf",
  },
  // ── 2020 (令和2年度) 春なし → 10月試験を autumn 扱い ──
  {
    year: 2020, season: "autumn",
    qsUrl:  "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000d05l-att/2020r02o_ap_am_qs.pdf",
    ansUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000d05l-att/2020r02o_ap_am_ans.pdf",
    note: "10月試験（COVID-19により春期中止）",
  },
  // ── 2021 (令和3年度) ──
  {
    year: 2021, season: "spring",
    qsUrl:  "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000d5ru-att/2021r03h_ap_am_qs.pdf",
    ansUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000d5ru-att/2021r03h_ap_am_ans.pdf",
  },
  {
    year: 2021, season: "autumn",
    qsUrl:  "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000apad-att/2021r03a_ap_am_qs.pdf",
    ansUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000apad-att/2021r03a_ap_am_ans.pdf",
  },
  // ── 2022 (令和4年度) ──
  {
    year: 2022, season: "spring",
    qsUrl:  "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000009sgk-att/2022r04h_ap_am_qs.pdf",
    ansUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000009sgk-att/2022r04h_ap_am_ans.pdf",
  },
  {
    year: 2022, season: "autumn",
    qsUrl:  "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_ap_am_qs.pdf",
    ansUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_ap_am_ans.pdf",
  },
  // ── 2025 (令和7年度) 秋のみ (春は既存) ──
  {
    year: 2025, season: "autumn",
    qsUrl:  "https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07a_ap_am_qs.pdf",
    ansUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07a_ap_am_ans.pdf",
  },
];

// ─── カテゴリリスト ───────────────────────────────────────────
const ADVANCED_CATEGORIES = [
  "基礎理論",
  "アルゴリズムとプログラミング",
  "コンピュータシステム",
  "ネットワーク",
  "データベース",
  "セキュリティ",
  "開発技術",
  "プロジェクトマネジメント",
  "サービスマネジメント",
  "システム戦略",
  "経営戦略",
  "企業と法務",
];

// ─── Gemini プロンプト ────────────────────────────────────────

function buildExtractionPrompt(year: number, seasonLabel: string): string {
  const categories = ADVANCED_CATEGORIES.map((c, i) => `${i + 1}. ${c}`).join("\n");
  return `This is the IPA (情報処理技術者試験) 応用情報技術者試験 午前 exam question PDF for ${year}年度 ${seasonLabel}.

Extract ALL 80 multiple-choice questions. Each question has:
- 問番号 (question number)
- 問題文 (question text)
- 選択肢 labeled ア, イ, ウ, エ

Return ONLY a valid JSON array (no markdown, no explanation text):
[
  {
    "qNumber": 1,
    "question": "問題文の全文",
    "choices": { "ア": "...", "イ": "...", "ウ": "...", "エ": "..." },
    "category": "カテゴリ名",
    "hasImage": false
  }
]

For category, use one of these values:
${categories}

Set hasImage to true if the question references a figure or table that cannot be expressed in text.
Extract questions exactly as written. Do not paraphrase.`;
}

function buildAnswerPrompt(): string {
  return `This is the answer sheet for the IPA 応用情報技術者試験 午前 exam (80 questions).

Extract all 80 answers. Return ONLY a valid JSON object:
{
  "1": "ア",
  "2": "イ",
  ...
}

Answers are one of: ア, イ, ウ, エ`;
}

function buildExplanationPrompt(qList: string): string {
  return `以下はIPA応用情報技術者試験 午前問題です。各問について、正解の根拠を日本語で説明してください。

回答形式: 問題番号をキー、説明文を値とするJSONオブジェクト（マークダウン不要、JSONのみ）:
{"1": "解説", "2": "解説"}

解説は「正解は〇です。」から始め、1〜2文で根拠を説明してください。

問題リスト:
${qList}`;
}

// ─── ユーティリティ ───────────────────────────────────────────

function extractJson<T>(text: string): T | null {
  // fenced code block
  const fenced = text.match(/```(?:json)?\s*([\s\S]+?)```/);
  const candidate = fenced ? fenced[1] : text;
  // JSON array or object
  const arrMatch = candidate.match(/(\[[\s\S]*\])/);
  const objMatch = candidate.match(/(\{[\s\S]*\})/);
  const raw = arrMatch?.[1] ?? objMatch?.[1] ?? candidate.trim();
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchPdfBase64(url: string): Promise<string> {
  console.log(`  [fetch] ${url}`);
  const res = await fetch(url, {
    headers: { "User-Agent": "ipa-quiz-site/1.0 (+kameking-lab)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = await res.arrayBuffer();
  return Buffer.from(buf).toString("base64");
}

function checkpointKey(year: number, season: string): string {
  return join(CHECKPOINT_DIR, `${year}-${season}-am.json`);
}

function isProcessed(year: number, season: string, force: boolean): boolean {
  if (force) return false;
  // Skip if output TS file already exists
  const outPath = join(DATA_DIR, `${year}-${season}.ts`);
  if (existsSync(outPath)) {
    console.log(`  [skip] ${outPath} already exists`);
    return true;
  }
  return false;
}

// ─── 問題アセンブル ────────────────────────────────────────────

interface RawQuestion {
  qNumber: number;
  question: string;
  choices: { ア: string; イ: string; ウ: string; エ: string };
  category: string;
  hasImage: boolean;
}

type Answers = Record<string, string>;
type Explanations = Record<number, string>;

function assembleQuestions(
  entry: ExamEntry,
  rawQuestions: RawQuestion[],
  answers: Answers,
  explanations: Explanations,
): Question[] {
  const valid = ["ア", "イ", "ウ", "エ"] as const;
  const seasonCode = entry.season === "spring" ? "h" : "a";
  const seasonLabel = entry.season === "spring" ? "春期" : "秋期";
  const questions: Question[] = [];

  for (const raw of rawQuestions) {
    const ansKey = answers[String(raw.qNumber)];
    if (!ansKey || !valid.includes(ansKey as typeof valid[number])) {
      console.warn(`  [skip-q] 問${raw.qNumber}: 無効な解答 "${ansKey}"`);
      continue;
    }

    const id = `ap-${entry.year}${seasonCode}-am-q${raw.qNumber}`;
    const explanation =
      explanations[raw.qNumber] ??
      `正解は${ansKey}です。（出典: IPA 応用情報技術者試験 ${entry.year}年度${seasonLabel} 午前 問${raw.qNumber}）`;

    questions.push({
      id,
      exam: "ap",
      session: "am",
      year: entry.year,
      season: entry.season,
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
      sourcePdfUrl: entry.qsUrl,
      license: "IPA-public",
    } as Question);
  }

  return questions;
}

// ─── ファイル書き込み ──────────────────────────────────────────

function writeQuestionsFile(entry: ExamEntry, questions: Question[]): void {
  mkdirSync(DATA_DIR, { recursive: true });
  const seasonLabel = entry.season === "spring" ? "春期" : "秋期";
  const varName = `AP_QUESTIONS_${entry.year}_${entry.season.toUpperCase()}`;
  const noteComment = entry.note ? `\n// Note: ${entry.note}` : "";

  const ts = `// Auto-generated by scripts/generate-ap-all.ts — do not edit manually.
// Source: IPA 応用情報技術者試験 ${entry.year}年度${seasonLabel} 午前${noteComment}
// Questions: ${questions.length}
import type { Question } from "@/lib/questions/types";

export const ${varName}: Question[] = ${JSON.stringify(questions, null, 2)};
`;

  const outPath = join(DATA_DIR, `${entry.year}-${entry.season}.ts`);
  writeFileSync(outPath, ts, "utf-8");
  console.log(`  [written] ${questions.length} questions → ${outPath}`);
}

function regenerateBarrel(): void {
  const files = (() => {
    try {
      return readdirSync(DATA_DIR)
        .filter((f: string) => f.endsWith(".ts") && f !== "index.ts")
        .sort();
    } catch {
      return [];
    }
  })();

  if (files.length === 0) return;

  const imports = files
    .map((f: string) => {
      const base = f.replace(".ts", "");
      const content = readFileSync(join(DATA_DIR, f), "utf-8");
      const match = content.match(/^export const (\w+):/m);
      return match ? `import { ${match[1]} } from "./${base}";` : null;
    })
    .filter(Boolean)
    .join("\n");

  const spreads = files
    .map((f: string) => {
      const content = readFileSync(join(DATA_DIR, f), "utf-8");
      const match = content.match(/^export const (\w+):/m);
      return match ? `  ...${match[1]}` : null;
    })
    .filter(Boolean)
    .join(",\n");

  const barrel = `// Auto-generated barrel — do not edit manually.
// Run: pnpm tsx scripts/generate-ap-all.ts
import type { Question } from "@/lib/questions/types";
${imports}

export const AP_BY_YEAR_QUESTIONS: Question[] = [
${spreads},
];
`;

  writeFileSync(join(DATA_DIR, "index.ts"), barrel, "utf-8");
  console.log(`[barrel] index.ts updated (${files.length} file(s))`);
}

// ─── メイン処理 ───────────────────────────────────────────────

type GeminiModel = ReturnType<InstanceType<typeof GoogleGenerativeAI>["getGenerativeModel"]>;

async function processOne(
  model: GeminiModel,
  entry: ExamEntry,
): Promise<{ ok: number; failed: boolean }> {
  const seasonLabel = entry.season === "spring" ? "春期" : "秋期";
  const label = `${entry.year}年度${seasonLabel}${entry.note ? ` (${entry.note})` : ""}`;
  console.log(`\n=== Processing AP ${label} ===`);

  try {
    // 1. PDFをフェッチしてbase64化
    const [qsPdf, ansPdf] = await Promise.all([
      fetchPdfBase64(entry.qsUrl),
      fetchPdfBase64(entry.ansUrl),
    ]);
    await delay(1000);

    // 2. 問題抽出
    console.log("  [gemini] 問題抽出中...");
    const qsResult = await model.generateContent([
      { inlineData: { mimeType: "application/pdf", data: qsPdf } },
      buildExtractionPrompt(entry.year, seasonLabel),
    ]);
    const rawQuestions = extractJson<RawQuestion[]>(qsResult.response.text());
    if (!rawQuestions || !Array.isArray(rawQuestions) || rawQuestions.length === 0) {
      throw new Error(`問題抽出失敗: ${qsResult.response.text().slice(0, 200)}`);
    }
    console.log(`  [gemini] ${rawQuestions.length} 問抽出完了`);
    await delay(2500);

    // 3. 解答抽出
    console.log("  [gemini] 解答抽出中...");
    const ansResult = await model.generateContent([
      { inlineData: { mimeType: "application/pdf", data: ansPdf } },
      buildAnswerPrompt(),
    ]);
    const answers = extractJson<Answers>(ansResult.response.text());
    if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
      throw new Error(`解答抽出失敗: ${ansResult.response.text().slice(0, 200)}`);
    }
    console.log(`  [gemini] ${Object.keys(answers).length} 解答抽出完了`);
    await delay(2500);

    // 4. 解説生成 (20問バッチ、画像なしの問題のみ)
    const nonImageQs = rawQuestions.filter((q) => !q.hasImage);
    const explanations: Explanations = {};
    const BATCH = 20;
    for (let i = 0; i < nonImageQs.length; i += BATCH) {
      const batch = nonImageQs.slice(i, i + BATCH);
      const from = batch[0].qNumber;
      const to = batch[batch.length - 1].qNumber;
      console.log(`  [gemini] 解説生成中... 問${from}〜問${to}`);
      const qListText = batch
        .map((q) => {
          const ans = answers[String(q.qNumber)] ?? "?";
          return `問${q.qNumber}. ${q.question}\nア:${q.choices.ア} イ:${q.choices.イ} ウ:${q.choices.ウ} エ:${q.choices.エ}\n正解: ${ans}`;
        })
        .join("\n\n");
      for (let retry = 0; retry < 3; retry++) {
        try {
          const expResult = await model.generateContent(buildExplanationPrompt(qListText));
          const parsed = extractJson<Record<string, string>>(expResult.response.text());
          if (parsed) {
            for (const [k, v] of Object.entries(parsed)) explanations[Number(k)] = v;
            break;
          } else {
            console.warn(`  [warn] 解説パース失敗 問${from}-${to} (attempt ${retry + 1})`);
            if (retry < 2) await delay(5000 * (retry + 1));
          }
        } catch (e) {
          if (retry === 2) console.warn(`  [warn] 解説生成失敗 問${from}-${to}: ${e}`);
          else await delay(5000 * (retry + 1));
        }
      }
      await delay(2500);
    }

    // 5. 問題アセンブル & ファイル書き込み
    const questions = assembleQuestions(entry, rawQuestions, answers, explanations);
    console.log(`  [assemble] ${questions.length} 問 (スキップ: ${rawQuestions.length - questions.length})`);
    writeQuestionsFile(entry, questions);

    // チェックポイント保存
    mkdirSync(CHECKPOINT_DIR, { recursive: true });
    writeFileSync(
      checkpointKey(entry.year, entry.season),
      JSON.stringify({ year: entry.year, season: entry.season, questionCount: questions.length, completedAt: new Date().toISOString() }, null, 2),
    );

    return { ok: questions.length, failed: false };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`  [ERROR] ${msg}`);
    return { ok: 0, failed: true };
  }
}

async function main(): Promise<void> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("ERROR: GEMINI_API_KEY が未設定です。.env.local に GEMINI_API_KEY=... を追加してください。");
    process.exitCode = 1;
    return;
  }

  const argv = process.argv.slice(2);
  const filterYear = argv.find((a) => a.startsWith("--year="))?.slice(7);
  const forceFlag = argv.includes("--force");
  const seasonFilter = argv.find((a) => a.startsWith("--season="))?.slice(9);

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: { responseMimeType: "text/plain", maxOutputTokens: 65536 },
  });

  const targets = URL_MAP.filter((e) => {
    if (filterYear && String(e.year) !== filterYear) return false;
    if (seasonFilter && e.season !== seasonFilter) return false;
    return !isProcessed(e.year, e.season, forceFlag);
  });

  if (targets.length === 0) {
    console.log("処理対象なし。--force で再生成できます。");
    return;
  }

  console.log(`処理対象: ${targets.length} 年度・季節`);

  let totalOk = 0;
  let totalFailed = 0;

  for (const entry of targets) {
    const result = await processOne(model, entry);
    totalOk += result.ok;
    if (result.failed) totalFailed++;
    await delay(3000);
  }

  regenerateBarrel();

  console.log(`\n=== 完了 ===`);
  console.log(`生成問題数: ${totalOk}`);
  console.log(`失敗: ${totalFailed}`);
  if (totalFailed > 0) process.exitCode = 1;
}

main();
