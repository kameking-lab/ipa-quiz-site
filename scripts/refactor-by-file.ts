/**
 * Apply Claude Opus-quality 3-layer explanations to question files.
 *
 * 全12,162問の解説を Claude Opus 品質の 3 層構造（正解の理由 / 他選択肢の誤り / 発展）
 * へリファクタリングするためのインフラ。Claude Code セッション自身が JSON 入力を生成し、
 * このスクリプトがファイル適用・検証・進捗管理を担う（外部 API は呼ばない）。
 *
 * 使い方:
 *   pnpm tsx scripts/refactor-by-file.ts --input=data/refactor-input/ap-2024-autumn.json
 *   pnpm tsx scripts/refactor-by-file.ts --input=...  --dry-run
 *
 * 入力 JSON 形式:
 *   {
 *     "filePath": "data/questions/ap/by-year/2024-autumn.ts",
 *     "fileKey":  "ap-2024-autumn",
 *     "items": [
 *       { "id": "ap-2024a-am-q1", "explanation": "正解はウです。..." },
 *       ...
 *     ]
 *   }
 *
 * 検証ロジック:
 *   - 文字数 400-700 字
 *   - 冒頭が「正解は{answer}です」
 *   - 「正解は{他の記号}」と述べていない
 *   - 段落分けが 3 つ存在（改行 \n が 2 つ以上）
 *   - 不合格はエラーとして報告し、ファイルには書き込まない
 *
 * 進捗:
 *   logs/refactor-progress.json に file 単位で記録。再開時は処理済 file をスキップ可能。
 */

import {
  readFileSync,
  writeFileSync,
  copyFileSync,
  mkdirSync,
  existsSync,
} from "node:fs";
import { join, basename, resolve } from "node:path";

// ─── 定数 ────────────────────────────────────────────────────────────────────

const LOGS_DIR = join(process.cwd(), "logs");
const PROGRESS_FILE = join(LOGS_DIR, "refactor-progress.json");

const MIN_CHARS = 400;
const MAX_CHARS = 700;

// ─── 型定義 ───────────────────────────────────────────────────────────────────

export interface RefactorItem {
  id: string;
  explanation: string;
}

export interface RefactorInput {
  filePath: string;
  fileKey: string;
  items: RefactorItem[];
}

export interface ValidationResult {
  ok: boolean;
  errors: string[];
}

interface FileEntry {
  fileKey: string;
  filePath: string;
  status: "in-progress" | "completed";
  totalItems: number;
  appliedItems: number;
  validationFailed: number;
  notFound: number;
  startedAt: string;
  updatedAt: string;
  completedAt?: string;
}

interface ProgressLog {
  totalFilesCompleted: number;
  totalQuestionsRefactored: number;
  files: Record<string, FileEntry>;
}

// ─── 検証ロジック ─────────────────────────────────────────────────────────────

const CHOICE_KEYS = ["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "コ"] as const;

export function validateExplanation(
  explanation: string,
  answer: string,
): ValidationResult {
  const errors: string[] = [];
  const len = explanation.length;

  if (len < MIN_CHARS || len > MAX_CHARS) {
    errors.push(`文字数 ${len} が範囲外 (${MIN_CHARS}-${MAX_CHARS})`);
  }

  // 冒頭が「正解は{answer}です」
  const expectedPrefix = `正解は${answer}です`;
  if (!explanation.startsWith(expectedPrefix)) {
    errors.push(`冒頭が "${expectedPrefix}" で始まっていない`);
  }

  // 他の選択肢を「正解」と述べていない
  for (const ch of CHOICE_KEYS) {
    if (ch === answer) continue;
    if (explanation.includes(`正解は${ch}です`)) {
      errors.push(`他選択肢を正解として参照: "正解は${ch}です"`);
    }
  }

  // 段落分け（\n が 2 つ以上 = 3 段落以上）
  const paragraphCount = explanation.split(/\n+/).filter((p) => p.trim()).length;
  if (paragraphCount < 3) {
    errors.push(`段落数 ${paragraphCount} が 3 未満（3 層構造になっていない）`);
  }

  return { ok: errors.length === 0, errors };
}

// ─── ファイル内の解説と正解を抽出 ─────────────────────────────────────────────

function findAnswerInFile(content: string, questionId: string): string | null {
  const idMarker = `"id": "${questionId}"`;
  const idPos = content.indexOf(idMarker);
  if (idPos === -1) return null;

  const nextIdPos = content.indexOf('"id": "', idPos + idMarker.length);
  const blockEnd = nextIdPos === -1 ? content.length : nextIdPos;
  const block = content.slice(idPos, blockEnd);

  const m = block.match(/"answer":\s*"([^"]+)"/);
  return m ? m[1] : null;
}

// ─── ファイル内の解説を更新 ────────────────────────────────────────────────────

function applyUpdateToContent(
  content: string,
  questionId: string,
  newExplanation: string,
): { updated: string; found: boolean } {
  const idMarker = `"id": "${questionId}"`;
  const idPos = content.indexOf(idMarker);
  if (idPos === -1) return { updated: content, found: false };

  const nextIdPos = content.indexOf('"id": "', idPos + idMarker.length);
  const blockEnd = nextIdPos === -1 ? content.length : nextIdPos;
  const block = content.slice(idPos, blockEnd);

  const escaped = JSON.stringify(newExplanation).slice(1, -1);

  const updatedBlock = block
    .replace(/"explanation":\s*"(?:[^"\\]|\\.)*"/, () => `"explanation": "${escaped}"`)
    .replace(/"needsReview":\s*true/, '"needsReview": false');

  return {
    updated: content.slice(0, idPos) + updatedBlock + content.slice(blockEnd),
    found: true,
  };
}

// ─── 進捗ログ ─────────────────────────────────────────────────────────────────

function loadProgress(): ProgressLog {
  if (!existsSync(PROGRESS_FILE)) {
    return { totalFilesCompleted: 0, totalQuestionsRefactored: 0, files: {} };
  }
  try {
    const raw = JSON.parse(readFileSync(PROGRESS_FILE, "utf8")) as unknown;
    if (
      typeof raw === "object" &&
      raw !== null &&
      typeof (raw as ProgressLog).totalQuestionsRefactored === "number" &&
      typeof (raw as ProgressLog).files === "object"
    ) {
      return raw as ProgressLog;
    }
  } catch {
    /* fall through */
  }
  return { totalFilesCompleted: 0, totalQuestionsRefactored: 0, files: {} };
}

function saveProgress(p: ProgressLog): void {
  mkdirSync(LOGS_DIR, { recursive: true });
  writeFileSync(PROGRESS_FILE, JSON.stringify(p, null, 2), "utf8");
}

// ─── CLI 引数 ─────────────────────────────────────────────────────────────────

interface CliOptions {
  input: string;
  dryRun: boolean;
  skipValidation: boolean;
}

function parseCliOptions(): CliOptions {
  const argv = process.argv.slice(2);
  const input = argv.find((a) => a.startsWith("--input="))?.slice(8);
  if (!input) {
    console.error("Usage: tsx scripts/refactor-by-file.ts --input=<path-to-json>");
    process.exit(1);
  }
  return {
    input,
    dryRun: argv.includes("--dry-run"),
    skipValidation: argv.includes("--skip-validation"),
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const opts = parseCliOptions();
  const inputPath = resolve(process.cwd(), opts.input);
  if (!existsSync(inputPath)) {
    console.error(`入力ファイルが見つかりません: ${inputPath}`);
    process.exit(1);
  }

  const input = JSON.parse(readFileSync(inputPath, "utf8")) as RefactorInput;
  const targetPath = resolve(process.cwd(), input.filePath);
  if (!existsSync(targetPath)) {
    console.error(`対象 TS ファイルが見つかりません: ${targetPath}`);
    process.exit(1);
  }

  console.log(
    `[refactor] file=${input.fileKey} items=${input.items.length}` +
      (opts.dryRun ? " [DRY RUN]" : ""),
  );

  let content = readFileSync(targetPath, "utf8");

  // バックアップ（初回のみ）
  if (!opts.dryRun) {
    const backupPath = join(LOGS_DIR, `backup_refactor_${basename(targetPath)}`);
    if (!existsSync(backupPath)) {
      mkdirSync(LOGS_DIR, { recursive: true });
      copyFileSync(targetPath, backupPath);
      console.log(`  💾 backup saved: ${backupPath}`);
    }
  }

  let appliedCount = 0;
  let validationFailedCount = 0;
  let notFoundCount = 0;
  const failedIds: Array<{ id: string; reason: string }> = [];

  for (const item of input.items) {
    const answer = findAnswerInFile(content, item.id);
    if (!answer) {
      notFoundCount++;
      failedIds.push({ id: item.id, reason: "ファイル内に該当 ID なし" });
      console.error(`  ❌ ${item.id}: ファイル内に該当なし`);
      continue;
    }

    if (!opts.skipValidation) {
      const v = validateExplanation(item.explanation, answer);
      if (!v.ok) {
        validationFailedCount++;
        failedIds.push({ id: item.id, reason: v.errors.join("; ") });
        console.error(`  ❌ ${item.id}: ${v.errors.join("; ")}`);
        continue;
      }
    }

    const { updated, found } = applyUpdateToContent(content, item.id, item.explanation);
    if (!found) {
      notFoundCount++;
      failedIds.push({ id: item.id, reason: "適用時に ID が見つからず" });
      continue;
    }
    content = updated;
    appliedCount++;
  }

  if (!opts.dryRun && appliedCount > 0) {
    writeFileSync(targetPath, content, "utf8");
    console.log(`  📝 ${basename(targetPath)} 更新 (${appliedCount} 件)`);
  }

  // 進捗更新
  const progress = loadProgress();
  const now = new Date().toISOString();
  const existing = progress.files[input.fileKey];
  const status: "in-progress" | "completed" =
    appliedCount + (existing?.appliedItems ?? 0) >= input.items.length &&
    validationFailedCount === 0 &&
    notFoundCount === 0
      ? "completed"
      : "in-progress";

  const entry: FileEntry = {
    fileKey: input.fileKey,
    filePath: input.filePath,
    status,
    totalItems: input.items.length,
    appliedItems: (existing?.appliedItems ?? 0) + appliedCount,
    validationFailed: validationFailedCount,
    notFound: notFoundCount,
    startedAt: existing?.startedAt ?? now,
    updatedAt: now,
    completedAt: status === "completed" ? now : undefined,
  };

  if (!opts.dryRun) {
    progress.files[input.fileKey] = entry;
    progress.totalQuestionsRefactored = Object.values(progress.files).reduce(
      (sum, f) => sum + f.appliedItems,
      0,
    );
    progress.totalFilesCompleted = Object.values(progress.files).filter(
      (f) => f.status === "completed",
    ).length;
    saveProgress(progress);
  }

  console.log(
    `\n[refactor] applied=${appliedCount} validationFail=${validationFailedCount} notFound=${notFoundCount}`,
  );
  if (failedIds.length > 0) {
    const failPath = join(LOGS_DIR, `refactor-failures_${input.fileKey}.json`);
    if (!opts.dryRun) {
      writeFileSync(failPath, JSON.stringify(failedIds, null, 2), "utf8");
      console.log(`  ⚠ 失敗詳細: ${failPath}`);
    }
    process.exitCode = 1;
  }
}

main().catch((err: unknown) => {
  console.error(err);
  process.exitCode = 1;
});
