/**
 * data/questions/ 配下のプレースホルダー解説を持つ問題を抽出し、
 * logs/placeholder-questions.json に保存する。
 *
 * 使い方:
 *   pnpm find:placeholders
 *
 * 出力:
 *   logs/placeholder-questions.json  — 対象問題一覧 (再生成スクリプトが参照)
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { ALL_QUESTIONS } from "@/data/questions";
import type { Question } from "@/lib/questions/types";

const LOGS_DIR = join(process.cwd(), "logs");
const DATA_DIR = join(process.cwd(), "data", "questions");

// ─── プレースホルダー判定 ──────────────────────────────────────────────────────

function isPlaceholder(q: Question): boolean {
  const exp = q.explanation;
  return (
    exp.includes("AIコパイロット") ||
    exp.includes("解説は準備中") ||
    exp.length < 50 ||
    q.needsReview === true
  );
}

// ─── ID → ファイルパス マッピング ─────────────────────────────────────────────

function buildIdToFileMap(): Map<string, string> {
  const map = new Map<string, string>();

  let examDirs: string[];
  try {
    examDirs = readdirSync(DATA_DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
  } catch {
    console.error(`data/questions/ が見つかりません: ${DATA_DIR}`);
    return map;
  }

  for (const exam of examDirs) {
    const byYearDir = join(DATA_DIR, exam, "by-year");
    if (!existsSync(byYearDir)) continue;

    let files: string[];
    try {
      files = readdirSync(byYearDir).filter(
        (f) => f.endsWith(".ts") && f !== "index.ts",
      );
    } catch {
      continue;
    }

    for (const file of files) {
      const filePath = join(byYearDir, file);
      const content = readFileSync(filePath, "utf8");
      for (const match of content.matchAll(/"id":\s*"([^"]+)"/g)) {
        map.set(match[1], filePath);
      }
    }
  }

  return map;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

console.log("全問題を読み込み中...");
const allQuestions = ALL_QUESTIONS;
console.log(`総問題数: ${allQuestions.length.toLocaleString()}`);

console.log("ファイルパスマップを構築中...");
const idToFile = buildIdToFileMap();
console.log(`ファイルマップ: ${idToFile.size.toLocaleString()} エントリ`);

const placeholders = allQuestions.filter(isPlaceholder);

const byExam: Record<string, number> = {};
for (const q of placeholders) {
  byExam[q.exam] = (byExam[q.exam] ?? 0) + 1;
}

const noFilePath = placeholders.filter((q) => !idToFile.has(q.id));
const withImage = placeholders.filter((q) => q.hasImage);

console.log(`\nプレースホルダー問題: ${placeholders.length} 件`);
console.log(`  うち画像あり (hasImage): ${withImage.length} 件`);
console.log(`  うちファイル未マッピング: ${noFilePath.length} 件`);

console.log("\n区分別内訳:");
for (const [exam, count] of Object.entries(byExam).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${exam.padEnd(4)}: ${count}`);
}

// ─── 保存 ─────────────────────────────────────────────────────────────────────

export interface PlaceholderEntry {
  id: string;
  exam: string;
  session: string;
  year: number;
  season: string;
  qNumber: number;
  category: string;
  question: string;
  choices?: Partial<Record<string, string>>;
  answer: string | string[];
  currentExplanation: string;
  needsReview?: boolean;
  hasImage: boolean;
  filePath: string | null;
}

const output = {
  generatedAt: new Date().toISOString(),
  totalCount: placeholders.length,
  byExam,
  questions: placeholders.map(
    (q): PlaceholderEntry => ({
      id: q.id,
      exam: q.exam,
      session: q.session,
      year: q.year,
      season: q.season,
      qNumber: q.qNumber,
      category: q.category,
      question: q.question,
      choices: q.choices as Partial<Record<string, string>> | undefined,
      answer: q.answer as string | string[],
      currentExplanation: q.explanation,
      needsReview: q.needsReview,
      hasImage: q.hasImage,
      filePath: idToFile.get(q.id) ?? null,
    }),
  ),
};

mkdirSync(LOGS_DIR, { recursive: true });
const outPath = join(LOGS_DIR, "placeholder-questions.json");
writeFileSync(outPath, JSON.stringify(output, null, 2), "utf8");
console.log(`\n✅ ${outPath} に保存しました`);
console.log(
  `\n次のステップ: pnpm regen:explanations [--exam=ap] [--dry-run] [--include-images]`,
);
