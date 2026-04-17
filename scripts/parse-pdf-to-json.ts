/**
 * data/raw_pdfs/ の PDF を data/questions/{exam}/by-year/{year}-{season}.json へ変換。
 *
 * ⚠️ NOTE
 * 日本語 IPA 過去問 PDF は 2段組・図表・特殊フォント埋め込みが混在しており、
 * 単純な pdf-parse だけでは構造化が崩れるケースが多いです。
 * 本スクリプトは現状「plain text 抽出 → 問題分離ロジックの入口」までのスケルトンです。
 *
 * フェーズ 1.5 で以下のいずれかに強化予定:
 *   - pdfjs-dist + 座標ベースで問題境界を検出
 *   - Gemini の OCR/Vision 機能でページ画像を構造化 JSON 化
 *   - 過去問道場の XML エクスポート等の合法ルートが使えれば活用
 *
 * 現状のフォールバック: data/questions/ap/sample-questions.ts を手動キュレーション。
 */
import { readdir, mkdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { z } from "zod";

const RAW_DIR = join(process.cwd(), "data", "raw_pdfs");
const OUT_DIR = join(process.cwd(), "data", "questions");

const QuestionSchema = z.object({
  id: z.string(),
  exam: z.string(),
  session: z.string(),
  year: z.number(),
  season: z.string(),
  qNumber: z.number(),
  type: z.string(),
  category: z.string(),
  topicTags: z.array(z.string()),
  difficulty: z.number(),
  question: z.string(),
  choices: z
    .object({
      ア: z.string(),
      イ: z.string(),
      ウ: z.string(),
      エ: z.string(),
    })
    .optional(),
  answer: z.union([z.string(), z.array(z.string())]),
  explanation: z.string(),
  hasImage: z.boolean(),
  imageUrls: z.array(z.string()).optional(),
  sourcePdfUrl: z.string(),
  license: z.literal("IPA-public"),
});

async function listPdfs(dir: string): Promise<string[]> {
  const out: string[] = [];
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const p = join(dir, entry.name);
      if (entry.isDirectory()) out.push(...(await listPdfs(p)));
      else if (entry.name.endsWith(".pdf")) out.push(p);
    }
  } catch {
    // ignore
  }
  return out;
}

async function main() {
  const pdfs = await listPdfs(RAW_DIR);
  if (pdfs.length === 0) {
    console.log(`No PDFs found under ${RAW_DIR}.`);
    console.log(`Run \`pnpm tsx scripts/fetch-ipa-pdfs.ts\` first.`);
    return;
  }
  console.log(`Found ${pdfs.length} PDFs.`);

  await mkdir(OUT_DIR, { recursive: true });
  console.log(
    `\n⚠️ 本スクリプトはまだ構造抽出未実装です。PDF を一覧表示するところまで確認できます。`,
  );
  for (const p of pdfs) {
    const s = await stat(p);
    console.log(`  ${p}  (${(s.size / 1024).toFixed(1)} KB)`);
  }

  // schema self-test to keep import alive
  QuestionSchema.parse({
    id: "test",
    exam: "ap",
    session: "am",
    year: 2023,
    season: "spring",
    qNumber: 1,
    type: "multiple-choice",
    category: "基礎理論",
    topicTags: [],
    difficulty: 2,
    question: "q",
    answer: "ア",
    explanation: "e",
    hasImage: false,
    sourcePdfUrl: "https://example.com/a.pdf",
    license: "IPA-public",
  });

  console.log("\nSchema self-test OK.");
  console.log(
    `次ステップ: pdfjs-dist or Gemini Vision で構造抽出を実装し、${OUT_DIR}/ap/by-year/*.json を出力すること。`,
  );
}

main();
