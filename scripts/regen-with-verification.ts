/**
 * Phase 4: 解説の再生成スクリプト（矛盾チェック付き）。
 *
 * 対象: detect-explanation-mismatch.ts で矛盾検出された問題 +
 *       apply-answer-corrections.ts で needsReview=true になった問題
 *
 * 特徴:
 *   - プロンプト冒頭「正解は{answer}です」必須（answer を絶対正解として固定）
 *   - 生成後に正規表現で矛盾チェック
 *   - 矛盾なら最大3回リトライ（Flash-Lite）→ Flash にアップグレード → needsReview
 *
 * 使い方:
 *   pnpm regen:verified                  # 全対象
 *   pnpm regen:verified -- --exam=ap     # AP のみ
 *   pnpm regen:verified -- --dry-run     # ドライラン
 *
 * 出力:
 *   data/questions/{exam}/by-year/*.ts   explanation 更新
 *   logs/regen-verified-cost.json        コスト記録
 *   logs/regen-verified-results.json     成否ログ
 */

import {
  readFileSync,
  writeFileSync,
  copyFileSync,
  mkdirSync,
  existsSync,
} from "node:fs";
import { join, basename } from "node:path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ALL_QUESTIONS } from "@/data/questions";
import type { Question } from "@/lib/questions/types";

const LOGS_DIR = join(process.cwd(), "logs");
const BUDGET_USD = 5;
const CONCURRENCY = 4;
const MAX_RETRIES_LITE = 3;
const MODEL_LITE = "gemini-2.5-flash-lite";
const MODEL_FULL = "gemini-2.5-flash";

// ─── 型定義 ───────────────────────────────────────────────────────────────────

interface CostLog {
  totalUsd: number;
  runs: Array<{ date: string; costUsd: number; success: number; fail: number }>;
}

type ResultStatus = "ok" | "fail" | "skip" | "needs-review";

interface RunResult {
  id: string;
  status: ResultStatus;
  costUsd?: number;
  attempts?: number;
  usedUpgrade?: boolean;
}

// ─── CLI ─────────────────────────────────────────────────────────────────────

interface CliOptions {
  dryRun: boolean;
  examFilter?: string;
}

function parseCliOptions(): CliOptions {
  const argv = process.argv.slice(2);
  return {
    dryRun: argv.includes("--dry-run"),
    examFilter: argv.find((a) => a.startsWith("--exam="))?.slice(7),
  };
}

// ─── プロンプト ───────────────────────────────────────────────────────────────

function buildVerifiedPrompt(q: Question): string {
  const ans = Array.isArray(q.answer) ? q.answer[0] : q.answer;
  const choicesText = q.choices
    ? Object.entries(q.choices)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n")
    : "(選択肢なし)";

  return `あなたはIPA情報処理技術者試験の解説専門家です。

【正解】${ans} （これは絶対に正しい公式解答です）
【試験区分】${q.exam.toUpperCase()} / ${q.session.toUpperCase()} / ${q.category}
【問題】
${q.question}

【選択肢】
${choicesText}

以下の要件を必ず守って200〜400文字の解説を作成してください:
- 冒頭は必ず「正解は${ans}です。」で始める
- ${ans}が正解である理由を具体的に説明する
- 他の選択肢がなぜ誤りかも1〜2文で触れる
- 専門用語には初学者向けの補足を入れる
- 日本語のみ、マークダウン・記号・改行なし（プレーンテキスト）
- 200〜400文字`;
}

// ─── 矛盾チェック（正規表現） ─────────────────────────────────────────────────

const ANSWER_MENTION_PATTERNS: RegExp[] = [
  /正解は[「『]?([アイウエ])[」』]?(?:です|になります|となります|で[あA]|が正解)/,
  /([アイウエ])が正解(?:です|になります|となります|で[あA])/,
  /答えは[「『]?([アイウエ])[」』]?(?:です|になります|となります)/,
  /正答は[「『]?([アイウエ])/,
];

function hasMismatch(explanation: string, correctAnswer: string): boolean {
  for (const pattern of ANSWER_MENTION_PATTERNS) {
    const m = pattern.exec(explanation);
    if (m?.[1] && m[1] !== correctAnswer) return true;
  }
  return false;
}

function calcCost(inputTokens: number, outputTokens: number): number {
  return inputTokens * 0.1 / 1_000_000 + outputTokens * 0.4 / 1_000_000;
}

// ─── ファイル内の explanation を更新 ─────────────────────────────────────────

function applyUpdate(
  content: string,
  questionId: string,
  newExplanation: string,
  clearNeedsReview: boolean,
): { updated: string; found: boolean } {
  const idMarker = `"id": "${questionId}"`;
  const idPos = content.indexOf(idMarker);
  if (idPos === -1) return { updated: content, found: false };

  const nextIdPos = content.indexOf('"id": "', idPos + idMarker.length);
  const blockEnd = nextIdPos === -1 ? content.length : nextIdPos;
  const block = content.slice(idPos, blockEnd);
  const escaped = JSON.stringify(newExplanation).slice(1, -1);

  let updatedBlock = block.replace(
    /"explanation":\s*"(?:[^"\\]|\\.)*"/,
    () => `"explanation": "${escaped}"`,
  );

  if (clearNeedsReview) {
    updatedBlock = updatedBlock
      .replace(/"needsReview":\s*true/, '"needsReview": false')
      .replace(/"needsReview":\s*false/, '"needsReview": false');
  } else {
    updatedBlock = updatedBlock
      .replace(/"needsReview":\s*false/, '"needsReview": true')
      .replace(/"needsReview":\s*true/, '"needsReview": true');
    if (!updatedBlock.includes('"needsReview"')) {
      updatedBlock = updatedBlock.replace(
        /"explanation":/,
        '"needsReview": true,\n    "explanation":',
      );
    }
  }

  return {
    updated: content.slice(0, idPos) + updatedBlock + content.slice(blockEnd),
    found: true,
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const opts = parseCliOptions();

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey && !opts.dryRun) {
    console.error("GEMINI_API_KEY が未設定です。");
    process.exitCode = 1;
    return;
  }

  mkdirSync(LOGS_DIR, { recursive: true });

  // 対象問題の収集
  // 1. detect-explanation-mismatch.ts の結果
  // 2. needsReview: true の問題
  const mismatchPath = join(LOGS_DIR, "explanation-mismatches.json");
  const mismatchIds = new Set<string>();
  if (existsSync(mismatchPath)) {
    const data = JSON.parse(readFileSync(mismatchPath, "utf8")) as { mismatches: { id: string }[] };
    for (const m of data.mismatches) mismatchIds.add(m.id);
  }

  let targets = ALL_QUESTIONS.filter(
    (q) =>
      q.type === "multiple-choice" &&
      !q.hasImage &&
      (q.needsReview === true || mismatchIds.has(q.id)),
  );

  if (opts.examFilter) {
    targets = targets.filter((q) => q.exam === opts.examFilter);
  }

  console.log(`対象: ${targets.length} 件 (needsReview or 矛盾検出)${opts.dryRun ? " [DRY RUN]" : ""}`);

  // コストログ
  const costFile = join(LOGS_DIR, "regen-verified-cost.json");
  const costLog: CostLog = existsSync(costFile)
    ? (JSON.parse(readFileSync(costFile, "utf8")) as CostLog)
    : { totalUsd: 0, runs: [] };

  if (costLog.totalUsd >= BUDGET_USD) {
    console.error(`累計コスト $${costLog.totalUsd.toFixed(4)} が予算 $${BUDGET_USD} に達しています。`);
    process.exitCode = 1;
    return;
  }

  const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
  const modelLite = genAI?.getGenerativeModel({ model: MODEL_LITE });
  const modelFull = genAI?.getGenerativeModel({ model: MODEL_FULL });

  let runCostUsd = 0;
  let successCount = 0;
  let failCount = 0;
  let skipCount = 0;
  const results: RunResult[] = [];
  const backedUp = new Set<string>();
  let budgetExceeded = false;

  // ファイル別グループ化
  const byFile = new Map<string, Array<{ q: Question; filePath: string | null }>>();
  for (const q of targets) {
    const filePath = findFilePath(q);
    if (!byFile.has(filePath ?? "__no_file__")) byFile.set(filePath ?? "__no_file__", []);
    byFile.get(filePath ?? "__no_file__")!.push({ q, filePath });
  }

  for (const [filePath, items] of byFile) {
    if (budgetExceeded) break;
    if (filePath === "__no_file__") {
      for (const { q } of items) {
        console.warn(`  ⚠ ファイル未発見: ${q.id}`);
        skipCount++;
      }
      continue;
    }

    if (!opts.dryRun && !backedUp.has(filePath)) {
      const backupPath = join(LOGS_DIR, `backup_verified_${basename(filePath)}`);
      if (!existsSync(backupPath)) copyFileSync(filePath, backupPath);
      backedUp.add(filePath);
    }

    const newExplanations = new Map<string, { text: string; ok: boolean }>();

    async function processOne(q: Question): Promise<void> {
      if (costLog.totalUsd + runCostUsd >= BUDGET_USD) {
        budgetExceeded = true;
        results.push({ id: q.id, status: "skip" });
        skipCount++;
        return;
      }

      const ans = Array.isArray(q.answer) ? q.answer[0] : q.answer;

      if (opts.dryRun) {
        console.log(`[dry-run] ${q.id} (answer=${ans})`);
        results.push({ id: q.id, status: "skip" });
        skipCount++;
        return;
      }

      // Flash-Lite で最大3回
      let finalText = "";
      let costUsd = 0;
      let attempts = 0;
      let passed = false;

      for (let attempt = 1; attempt <= MAX_RETRIES_LITE; attempt++) {
        attempts = attempt;
        try {
          const res = await modelLite!.generateContent(buildVerifiedPrompt(q));
          const text = res.response.text().trim();
          const usage = res.response.usageMetadata;
          costUsd += calcCost(usage?.promptTokenCount ?? 600, usage?.candidatesTokenCount ?? 400);

          if (!hasMismatch(text, ans)) {
            finalText = text;
            passed = true;
            break;
          }
          console.warn(`  ⚠ ${q.id} attempt ${attempt}: 矛盾あり、リトライ`);
        } catch (err) {
          console.warn(`  ⚠ ${q.id} attempt ${attempt}: ${err}`);
        }
        await new Promise((r) => setTimeout(r, 1000));
      }

      // Flash にアップグレード
      let usedUpgrade = false;
      if (!passed) {
        try {
          const res = await modelFull!.generateContent(buildVerifiedPrompt(q));
          const text = res.response.text().trim();
          const usage = res.response.usageMetadata;
          // Flash のコスト: $0.30/1M input, $2.50/1M output
          costUsd += (usage?.promptTokenCount ?? 600) * 0.3 / 1_000_000 +
                     (usage?.candidatesTokenCount ?? 400) * 2.5 / 1_000_000;

          if (!hasMismatch(text, ans)) {
            finalText = text;
            passed = true;
            usedUpgrade = true;
          }
        } catch (err) {
          console.error(`  ❌ Flash upgrade failed for ${q.id}: ${err}`);
        }
      }

      runCostUsd += costUsd;

      if (passed) {
        newExplanations.set(q.id, { text: finalText, ok: true });
        results.push({ id: q.id, status: "ok", costUsd, attempts, usedUpgrade });
        successCount++;
        const upgrade = usedUpgrade ? " [Flash]" : "";
        console.log(`  ✅ ${q.id}  ${finalText.length}文字  $${costUsd.toFixed(5)}${upgrade}`);
      } else {
        // needsReview のまま残す
        newExplanations.set(q.id, { text: "", ok: false });
        results.push({ id: q.id, status: "needs-review", costUsd, attempts });
        failCount++;
        console.error(`  ❌ ${q.id}: 全試行後も矛盾あり → needsReview`);
      }
    }

    for (let i = 0; i < items.length; i += CONCURRENCY) {
      if (budgetExceeded) break;
      await Promise.all(items.slice(i, i + CONCURRENCY).map(({ q }) => processOne(q)));
    }

    if (!opts.dryRun && newExplanations.size > 0) {
      let content = readFileSync(filePath, "utf8");
      for (const [id, { text, ok }] of newExplanations) {
        if (!text) continue;
        const { updated, found } = applyUpdate(content, id, text, ok);
        if (!found) console.warn(`  ⚠ ${id} not found in file`);
        content = updated;
      }
      writeFileSync(filePath, content, "utf8");
      console.log(`  📝 ${basename(filePath)} 更新 (${newExplanations.size} 件)`);
    }
  }

  // ログ保存
  costLog.totalUsd += runCostUsd;
  costLog.runs.push({
    date: new Date().toISOString(),
    costUsd: runCostUsd,
    success: successCount,
    fail: failCount,
  });
  writeFileSync(costFile, JSON.stringify(costLog, null, 2), "utf8");
  writeFileSync(
    join(LOGS_DIR, "regen-verified-results.json"),
    JSON.stringify({ date: new Date().toISOString(), results }, null, 2),
    "utf8",
  );

  console.log(`\n完了: ✅${successCount} ❌${failCount} ⏭${skipCount}`);
  if (!opts.dryRun) {
    console.log(`今回コスト: $${runCostUsd.toFixed(4)} / 累計: $${costLog.totalUsd.toFixed(4)}`);
    console.log("\nPhase 5 (再検証): pnpm detect:mismatches -- --regex-only");
  }
}

// ─── ファイルパス解決 ─────────────────────────────────────────────────────────

function findFilePath(q: Question): string | null {
  const byYearDir = join(process.cwd(), "data", "questions", q.exam, "by-year");
  const expected = join(byYearDir, `${q.year}-${q.season}.ts`);
  if (existsSync(expected)) return expected;

  // セッション付きファイル名
  const withSession = join(byYearDir, `${q.year}-${q.season}-${q.session}.ts`);
  if (existsSync(withSession)) return withSession;

  return null;
}

main().catch((err: unknown) => {
  console.error(err);
  process.exitCode = 1;
});
