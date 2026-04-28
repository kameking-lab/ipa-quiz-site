/**
 * Phase 2: verify-answers-with-pdf.ts の不一致結果を基に answer フィールドを修正する。
 *
 * 前提: pnpm verify:answers を先に実行し logs/answer-pdf-mismatch.json が存在すること。
 *
 * 使い方:
 *   pnpm apply:answer-corrections             # 全不一致を修正
 *   pnpm apply:answer-corrections -- --dry-run # 変更内容を表示のみ
 *
 * 動作:
 *   - answer フィールドを公式解答に上書き
 *   - needsReview: true を付与（解説再生成対象化）
 *   - 修正後に logs/answer-corrections-applied.json を記録
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { join, basename } from "node:path";
import type { ExamCode } from "@/lib/questions/types";

const LOGS_DIR = join(process.cwd(), "logs");
const DATA_DIR = join(process.cwd(), "data", "questions");

interface MismatchEntry {
  id: string;
  exam: ExamCode;
  year: number;
  season: string;
  session: string;
  qNumber: number;
  currentAnswer: string;
  pdfAnswer: string;
  sourcePdfUrl: string;
}

interface MismatchReport {
  mismatches: MismatchEntry[];
}

interface CorrectionRecord {
  id: string;
  oldAnswer: string;
  newAnswer: string;
  filePath: string;
  appliedAt: string;
}

// ─── ファイル内の answer フィールドを更新 ─────────────────────────────────────

function applyCorrection(
  content: string,
  questionId: string,
  newAnswer: string,
): { updated: string; found: boolean } {
  const idMarker = `"id": "${questionId}"`;
  const idPos = content.indexOf(idMarker);
  if (idPos === -1) return { updated: content, found: false };

  const nextIdPos = content.indexOf('"id": "', idPos + idMarker.length);
  const blockEnd = nextIdPos === -1 ? content.length : nextIdPos;
  const block = content.slice(idPos, blockEnd);

  // answer フィールドを置換（単一の ア|イ|ウ|エ 文字列として）
  const escaped = JSON.stringify(newAnswer).slice(1, -1);
  const updatedBlock = block
    .replace(
      /"answer":\s*(?:"[^"]*"|\[[^\]]*\])/,
      `"answer": "${escaped}"`,
    )
    // needsReview を true に設定（なければ追加）
    .replace(/"needsReview":\s*false/, '"needsReview": true')
    .replace(/"needsReview":\s*true/, '"needsReview": true');

  // needsReview がない場合は explanation の前に挿入
  const hasNeedsReview = updatedBlock.includes('"needsReview"');
  const finalBlock = hasNeedsReview
    ? updatedBlock
    : updatedBlock.replace(
        /"explanation":/,
        '"needsReview": true,\n    "explanation":',
      );

  return {
    updated: content.slice(0, idPos) + finalBlock + content.slice(blockEnd),
    found: true,
  };
}

// ─── 問題 ID からファイルパスを特定 ──────────────────────────────────────────

function findFileForQuestion(
  exam: ExamCode,
  year: number,
  season: string,
): string | null {
  const byYearDir = join(DATA_DIR, exam, "by-year");
  const expectedFile = join(byYearDir, `${year}-${season}.ts`);
  if (existsSync(expectedFile)) return expectedFile;

  // フォールバック: by-year/ 配下でプレフィックスが一致するファイルを探す
  if (!existsSync(byYearDir)) return null;
  const prefix = `${year}-${season}`;
  const files = readdirSync(byYearDir).filter((f) => f.startsWith(prefix) && f.endsWith(".ts"));
  return files.length > 0 ? join(byYearDir, files[0]!) : null;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main(): void {
  const argv = process.argv.slice(2);
  const dryRun = argv.includes("--dry-run");

  const reportPath = join(LOGS_DIR, "answer-pdf-mismatch.json");
  if (!existsSync(reportPath)) {
    console.error(
      "logs/answer-pdf-mismatch.json が見つかりません。\n先に: pnpm verify:answers",
    );
    process.exitCode = 1;
    return;
  }

  const { mismatches } = JSON.parse(readFileSync(reportPath, "utf8")) as MismatchReport;

  if (mismatches.length === 0) {
    console.log("✅ 不一致なし。修正対象がありません。");
    return;
  }

  console.log(`修正対象: ${mismatches.length} 件${dryRun ? " [DRY RUN]" : ""}`);

  // ファイル別にグルーピング
  const byFile = new Map<string, Array<{ entry: MismatchEntry; filePath: string }>>();

  for (const entry of mismatches) {
    const filePath = findFileForQuestion(entry.exam, entry.year, entry.season);
    if (!filePath) {
      console.warn(`⚠ ファイル未発見: ${entry.id} (${entry.exam}/${entry.year}-${entry.season})`);
      continue;
    }
    if (!byFile.has(filePath)) byFile.set(filePath, []);
    byFile.get(filePath)!.push({ entry, filePath });
  }

  const applied: CorrectionRecord[] = [];
  let successCount = 0;
  let failCount = 0;

  for (const [filePath, items] of byFile) {
    let content = readFileSync(filePath, "utf8");
    const fileChanges: CorrectionRecord[] = [];

    for (const { entry } of items) {
      if (dryRun) {
        console.log(`  [dry-run] ${entry.id}: ${entry.currentAnswer} → ${entry.pdfAnswer}`);
        successCount++;
        continue;
      }

      const { updated, found } = applyCorrection(content, entry.id, entry.pdfAnswer);
      if (!found) {
        console.warn(`  ⚠ ${entry.id}: ファイル内に見つかりません`);
        failCount++;
        continue;
      }
      content = updated;
      fileChanges.push({
        id: entry.id,
        oldAnswer: entry.currentAnswer,
        newAnswer: entry.pdfAnswer,
        filePath,
        appliedAt: new Date().toISOString(),
      });
      console.log(`  ✅ ${entry.id}: ${entry.currentAnswer} → ${entry.pdfAnswer} (needsReview=true)`);
      successCount++;
    }

    if (!dryRun && fileChanges.length > 0) {
      writeFileSync(filePath, content, "utf8");
      console.log(`  📝 ${basename(filePath)} 更新 (${fileChanges.length} 件)`);
      applied.push(...fileChanges);
    }
  }

  // 結果ログ保存
  if (!dryRun) {
    mkdirSync(LOGS_DIR, { recursive: true });
    writeFileSync(
      join(LOGS_DIR, "answer-corrections-applied.json"),
      JSON.stringify(
        { appliedAt: new Date().toISOString(), count: applied.length, corrections: applied },
        null,
        2,
      ),
      "utf8",
    );
  }

  console.log(`\n完了: 修正 ${successCount} 件 / 失敗 ${failCount} 件`);
  if (!dryRun && applied.length > 0) {
    console.log(`\n→ 解説再生成: pnpm find:placeholders && pnpm regen:explanations`);
    console.log("  (needsReview=true の問題が対象になります)");
  }
}

main();
