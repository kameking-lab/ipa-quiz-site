/**
 * 全問題を走査し、本文中に「図」「表」への参照があるのに `hasImage: false`
 * になっている問題（＝図表が欠落している可能性が高い問題）を抽出する。
 *
 * 使い方:
 *   pnpm find:figures
 *
 * 出力:
 *   logs/figure-references.json — 検出結果一覧（再生成スクリプト等から参照）
 *   logs/figure-references.md   — 区分別サマリ・抜粋（人間レビュー用）
 *
 * 検出パターン:
 *   - 下表 / 下図 / 次表 / 次図 / 上表 / 上図 / 以下の表 / 以下の図 / 次の表 / 次の図 / 上の表 / 上の図
 *   - 表中 / 図中
 *   - 表に示す / 図に示す / 表のとおり / 図のとおり
 *   - 表 N / 図 N (半角・全角数字、ハイフン許容)
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { ALL_QUESTIONS } from "@/data/questions";

const LOGS_DIR = join(process.cwd(), "logs");

// ─── 検出パターン ────────────────────────────────────────────────────────────

interface PatternHit {
  pattern: string;
  matched: string;
}

/**
 * 単発の正規表現マッチを試行し、ヒットすれば PatternHit を返す。
 * 重複を避けるためにユニークなフラグメントのみ追加する。
 */
function findPatternHits(text: string): PatternHit[] {
  const hits: PatternHit[] = [];
  const seen = new Set<string>();

  const patterns: { name: string; regex: RegExp }[] = [
    { name: "下表/下図", regex: /下(?:の)?(?:表|図)/g },
    { name: "次表/次図", regex: /次(?:の)?(?:表|図)/g },
    { name: "上表/上図", regex: /上(?:の)?(?:表|図)/g },
    { name: "以下の表/図", regex: /以下の(?:表|図)/g },
    { name: "表中/図中", regex: /(?:表|図)中/g },
    { name: "表に示す/図に示す", regex: /(?:表|図)に示す/g },
    { name: "表のとおり/図のとおり", regex: /(?:表|図)のとおり/g },
    // 表N / 図N （半角・全角数字、ハイフン任意）
    { name: "表N/図N", regex: /(?:表|図)[\s　\-－]*[0-9０-９]+/g },
  ];

  for (const { name, regex } of patterns) {
    for (const m of text.matchAll(regex)) {
      const key = `${name}::${m[0]}`;
      if (seen.has(key)) continue;
      seen.add(key);
      hits.push({ pattern: name, matched: m[0] });
    }
  }
  return hits;
}

// ─── 誤検出フィルタ ──────────────────────────────────────────────────────────

/**
 * 「下表」「下図」「表中」のように図表参照を強く示唆するキーワードを含むかどうか。
 * 単独の「表」「図」（例: 代表、発表、図書館）は誤検出が多いので除外する目的。
 */
function looksLikeRealReference(hits: PatternHit[]): boolean {
  return hits.length > 0;
}

// ─── Main ────────────────────────────────────────────────────────────────────

interface FigureReferenceEntry {
  id: string;
  exam: string;
  session: string;
  year: number;
  season: string;
  qNumber: number;
  category: string;
  hasImage: boolean;
  question: string;
  hits: PatternHit[];
}

console.log("全問題を読み込み中...");
const all = ALL_QUESTIONS;
console.log(`総問題数: ${all.length.toLocaleString()}`);

const entries: FigureReferenceEntry[] = [];
for (const q of all) {
  const hits = findPatternHits(q.question);
  if (!looksLikeRealReference(hits)) continue;
  entries.push({
    id: q.id,
    exam: q.exam,
    session: q.session,
    year: q.year,
    season: q.season,
    qNumber: q.qNumber,
    category: q.category,
    hasImage: q.hasImage,
    question: q.question,
    hits,
  });
}

const missing = entries.filter((e) => !e.hasImage);
const present = entries.filter((e) => e.hasImage);

const byExam: Record<string, { missing: number; present: number }> = {};
for (const e of entries) {
  byExam[e.exam] ??= { missing: 0, present: 0 };
  if (e.hasImage) byExam[e.exam].present += 1;
  else byExam[e.exam].missing += 1;
}

console.log(`\n図表参照を含む問題: ${entries.length.toLocaleString()} 件`);
console.log(`  hasImage:true (画像あり): ${present.length.toLocaleString()} 件`);
console.log(`  hasImage:false (欠落の疑い): ${missing.length.toLocaleString()} 件`);

console.log("\n区分別内訳 (missing / present):");
for (const [exam, c] of Object.entries(byExam).sort(
  (a, b) => b[1].missing - a[1].missing,
)) {
  console.log(`  ${exam.padEnd(4)}: ${c.missing} / ${c.present}`);
}

// ─── 出力 ────────────────────────────────────────────────────────────────────

mkdirSync(LOGS_DIR, { recursive: true });

const jsonOutput = {
  generatedAt: new Date().toISOString(),
  totalReferenced: entries.length,
  missingCount: missing.length,
  presentCount: present.length,
  byExam,
  missing,
  present,
};
const jsonPath = join(LOGS_DIR, "figure-references.json");
writeFileSync(jsonPath, JSON.stringify(jsonOutput, null, 2), "utf8");
console.log(`\n✅ ${jsonPath}`);

// Markdown サマリ（人間レビュー用）
const lines: string[] = [];
lines.push("# 図表参照 検出レポート");
lines.push("");
lines.push(`生成: ${new Date().toISOString()}`);
lines.push("");
lines.push(
  `総問題: ${all.length.toLocaleString()} / 図表参照あり: ${entries.length.toLocaleString()}`,
);
lines.push(
  `- hasImage:true ... ${present.length.toLocaleString()} 件（既に画像あり）`,
);
lines.push(
  `- hasImage:false ... ${missing.length.toLocaleString()} 件（図表が欠落している可能性）`,
);
lines.push("");
lines.push("## 区分別 missing / present");
lines.push("");
lines.push("| 区分 | missing | present |");
lines.push("| --- | ---: | ---: |");
for (const [exam, c] of Object.entries(byExam).sort(
  (a, b) => b[1].missing - a[1].missing,
)) {
  lines.push(`| ${exam} | ${c.missing} | ${c.present} |`);
}
lines.push("");
lines.push("## hasImage:false の上位サンプル（最大 30 件）");
lines.push("");

const sample = missing.slice(0, 30);
for (const e of sample) {
  const examLabel = `${e.exam}/${e.year}-${e.season}/${e.session}/問${e.qNumber}`;
  const hitsLabel = e.hits.map((h) => h.matched).join(", ");
  const head = e.question.replace(/\s+/g, " ").slice(0, 120);
  lines.push(`### \`${e.id}\` ${examLabel}`);
  lines.push(`- カテゴリ: ${e.category}`);
  lines.push(`- 検出: ${hitsLabel}`);
  lines.push(`- 抜粋: ${head}${e.question.length > 120 ? "…" : ""}`);
  lines.push("");
}

if (missing.length > sample.length) {
  lines.push(`(他 ${missing.length - sample.length} 件は \`figure-references.json\` を参照)`);
}

const mdPath = join(LOGS_DIR, "figure-references.md");
writeFileSync(mdPath, lines.join("\n"), "utf8");
console.log(`✅ ${mdPath}`);
console.log(
  "\n次のステップ: hasImage:false の問題について、表ならテキスト/HTML 化、図なら画像登録 or hasImage:true への更新を検討。",
);
