/**
 * logs/placeholder-questions.json の解説を Gemini 2.5 Flash-Lite で再生成する。
 *
 * 前提: pnpm find:placeholders を先に実行すること。
 *
 * 使い方:
 *   pnpm regen:explanations                          # 全対象（画像なし）
 *   pnpm regen:explanations -- --exam=ap             # AP のみ
 *   pnpm regen:explanations -- --dry-run             # APIを呼ばず動作確認
 *   pnpm regen:explanations -- --include-images      # 画像問題も含める
 *
 * 出力:
 *   data/questions/{exam}/by-year/{file}.ts  explanation / needsReview を更新
 *   logs/regen-cost.json            累計コスト記録（parse-pdfs の api-cost.json とは別ファイル）
 *   logs/regenerate-results.json    成否ログ
 *   logs/backup_*.ts                初回のみ元ファイルをコピー
 *
 * コスト: Gemini 2.5 Flash-Lite — $0.10/1M input, $0.40/1M output
 * 予算上限: $20 (logs/regen-cost.json の累計が上限に達すると自動停止)
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

// ─── 定数 ────────────────────────────────────────────────────────────────────

const LOGS_DIR = join(process.cwd(), "logs");
const BUDGET_USD = 20;
const CONCURRENCY = 5;
const MAX_RETRIES = 3;
const MODEL_NAME = "gemini-2.5-flash-lite";

// ─── 型定義 ───────────────────────────────────────────────────────────────────

interface PlaceholderEntry {
  id: string;
  exam: string;
  session: string;
  year: number;
  season: string;
  qNumber: number;
  category: string;
  question: string;
  choices?: Record<string, string>;
  answer: string | string[];
  currentExplanation: string;
  needsReview?: boolean;
  hasImage: boolean;
  filePath: string | null;
}

interface CostLog {
  totalUsd: number;
  runs: Array<{
    date: string;
    costUsd: number;
    examFilter: string;
    success: number;
    fail: number;
    skip: number;
  }>;
}

type ResultStatus = "ok" | "fail" | "skip";

interface RunResult {
  id: string;
  status: ResultStatus;
  costUsd?: number;
  charCount?: number;
  error?: string;
}

// ─── コスト計算 ($0.10/1M input, $0.40/1M output) ─────────────────────────────

function calcCost(inputTokens: number, outputTokens: number): number {
  return inputTokens * 0.1 / 1_000_000 + outputTokens * 0.4 / 1_000_000;
}

// ─── プロンプト生成 ────────────────────────────────────────────────────────────

function buildPrompt(q: PlaceholderEntry): string {
  const choicesText = q.choices
    ? Object.entries(q.choices)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n")
    : "(選択肢なし)";
  const answerStr = Array.isArray(q.answer) ? q.answer.join(", ") : q.answer;

  return `あなたはIPA情報処理技術者試験の解説専門家です。以下の問題の解説を200〜350文字で作成してください。

【試験区分】${q.exam.toUpperCase()} / ${q.session.toUpperCase()} / ${q.category}
【問題】
${q.question}

【選択肢】
${choicesText}

【正解】${answerStr}

以下の要件を必ず守ること:
- 正解の理由を具体的かつ明確に説明する
- 誤りの選択肢についてもなぜ間違いかを簡潔に触れる
- 専門用語には初学者向けの補足を入れる
- 200〜350文字、日本語のみ
- 「正解は○です」で始めない
- マークダウン・記号・改行は使わない、プレーンテキストのみ`;
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

  // このquestion blockの末尾を特定（次のIDの直前まで）
  const nextIdPos = content.indexOf('"id": "', idPos + idMarker.length);
  const blockEnd = nextIdPos === -1 ? content.length : nextIdPos;
  const block = content.slice(idPos, blockEnd);

  // JSON.stringify でエスケープ (外側の " は除去)
  const escaped = JSON.stringify(newExplanation).slice(1, -1);

  const updatedBlock = block
    // explanation を置換 (関数形式でドル記号などの特殊文字を回避)
    .replace(/"explanation":\s*"(?:[^"\\]|\\.)*"/, () => `"explanation": "${escaped}"`)
    // needsReview: true → false
    .replace(/"needsReview":\s*true/, '"needsReview": false');

  return {
    updated: content.slice(0, idPos) + updatedBlock + content.slice(blockEnd),
    found: true,
  };
}

// ─── CLI 引数パース ────────────────────────────────────────────────────────────

interface CliOptions {
  dryRun: boolean;
  examFilter?: string;
  includeImages: boolean;
}

function parseCliOptions(): CliOptions {
  const argv = process.argv.slice(2);
  return {
    dryRun: argv.includes("--dry-run"),
    examFilter: argv.find((a) => a.startsWith("--exam="))?.slice(7),
    includeImages: argv.includes("--include-images"),
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const opts = parseCliOptions();

  // API キー確認
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey && !opts.dryRun) {
    console.error(
      "GEMINI_API_KEY が設定されていません。\n" +
        "  pnpm regen:explanations -- --dry-run  でドライラン確認後、\n" +
        "  .env.local に GEMINI_API_KEY=... を設定してください。",
    );
    process.exitCode = 1;
    return;
  }

  // placeholder-questions.json 読み込み
  const placeholderPath = join(LOGS_DIR, "placeholder-questions.json");
  if (!existsSync(placeholderPath)) {
    console.error(
      "logs/placeholder-questions.json が見つかりません。\n" +
        "先に: pnpm find:placeholders",
    );
    process.exitCode = 1;
    return;
  }
  const { questions } = JSON.parse(readFileSync(placeholderPath, "utf8")) as {
    questions: PlaceholderEntry[];
  };

  // フィルタリング
  let targets = questions.filter((q) => q.filePath !== null);
  if (opts.examFilter) {
    targets = targets.filter((q) => q.exam === opts.examFilter);
  }
  if (!opts.includeImages) {
    const imgCount = targets.filter((q) => q.hasImage).length;
    targets = targets.filter((q) => !q.hasImage);
    if (imgCount > 0) {
      console.log(
        `画像問題をスキップ: ${imgCount} 件 (--include-images で含める)`,
      );
    }
  }

  console.log(
    `対象: ${targets.length} 件` +
      (opts.examFilter ? ` (exam=${opts.examFilter})` : "") +
      (opts.dryRun ? " [DRY RUN]" : ""),
  );

  // コストログ読み込み (parse-pdfs の api-cost.json とは独立)
  mkdirSync(LOGS_DIR, { recursive: true });
  const costFile = join(LOGS_DIR, "regen-cost.json");
  const costLog: CostLog = (() => {
    if (!existsSync(costFile)) return { totalUsd: 0, runs: [] };
    try {
      const raw = JSON.parse(readFileSync(costFile, "utf8")) as unknown;
      if (
        typeof raw === "object" &&
        raw !== null &&
        typeof (raw as CostLog).totalUsd === "number" &&
        Array.isArray((raw as CostLog).runs)
      ) {
        return raw as CostLog;
      }
    } catch {
      /* fall through to default */
    }
    return { totalUsd: 0, runs: [] };
  })();

  if (costLog.totalUsd >= BUDGET_USD) {
    console.error(
      `累計コスト $${costLog.totalUsd.toFixed(4)} が予算上限 $${BUDGET_USD} に達しています。`,
    );
    process.exitCode = 1;
    return;
  }

  // Gemini クライアント
  const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
  const model = genAI?.getGenerativeModel({ model: MODEL_NAME });

  // 集計
  let successCount = 0;
  let failCount = 0;
  let skipCount = 0;
  let runCostUsd = 0;
  const results: RunResult[] = [];
  const backedUp = new Set<string>();
  let budgetExceeded = false;

  // ─── ファイル別にグルーピング ────────────────────────────────────────────────
  const byFile = new Map<string, PlaceholderEntry[]>();
  for (const q of targets) {
    const fp = q.filePath!;
    if (!byFile.has(fp)) byFile.set(fp, []);
    byFile.get(fp)!.push(q);
  }

  // ─── 各ファイルを処理 ────────────────────────────────────────────────────────
  for (const [filePath, fileQuestions] of byFile) {
    if (budgetExceeded) break;

    // バックアップ (初回のみ)
    if (!opts.dryRun && !backedUp.has(filePath)) {
      const backupPath = join(LOGS_DIR, `backup_${basename(filePath)}`);
      if (!existsSync(backupPath)) {
        copyFileSync(filePath, backupPath);
      }
      backedUp.add(filePath);
    }

    const newExplanations = new Map<string, string>();

    async function generateOne(q: PlaceholderEntry): Promise<void> {
      // 予算チェック
      if (costLog.totalUsd + runCostUsd >= BUDGET_USD) {
        budgetExceeded = true;
        results.push({ id: q.id, status: "skip", error: "予算上限" });
        skipCount++;
        return;
      }

      if (opts.dryRun) {
        console.log(`[dry-run] ${q.id}`);
        results.push({ id: q.id, status: "skip" });
        skipCount++;
        return;
      }

      for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
          const res = await model!.generateContent(buildPrompt(q));
          const text = res.response.text().trim();
          const usage = res.response.usageMetadata;
          const cost = calcCost(
            usage?.promptTokenCount ?? 500,
            usage?.candidatesTokenCount ?? 300,
          );
          runCostUsd += cost;
          newExplanations.set(q.id, text);
          results.push({ id: q.id, status: "ok", costUsd: cost, charCount: text.length });
          successCount++;
          console.log(`✅ ${q.id}  ${text.length}文字  $${cost.toFixed(5)}`);
          return;
        } catch (err) {
          if (attempt === MAX_RETRIES) {
            results.push({ id: q.id, status: "fail", error: String(err) });
            failCount++;
            console.error(`❌ ${q.id}: ${err}`);
          } else {
            console.warn(`⚠  ${q.id} attempt ${attempt} 失敗、リトライ中...`);
            await new Promise((r) => setTimeout(r, 1500 * attempt));
          }
        }
      }
    }

    // CONCURRENCY 並列で実行
    for (let i = 0; i < fileQuestions.length; i += CONCURRENCY) {
      if (budgetExceeded) break;
      await Promise.all(fileQuestions.slice(i, i + CONCURRENCY).map(generateOne));
    }

    // ファイルに一括書き込み
    if (!opts.dryRun && newExplanations.size > 0) {
      let content = readFileSync(filePath, "utf8");
      for (const [id, explanation] of newExplanations) {
        const { updated, found } = applyUpdateToContent(content, id, explanation);
        if (!found) {
          console.warn(`  ⚠ ${id} がファイル内で見つかりませんでした`);
        }
        content = updated;
      }
      writeFileSync(filePath, content, "utf8");
      console.log(`  📝 ${basename(filePath)} 更新 (${newExplanations.size} 件)`);
    }
  }

  if (budgetExceeded) {
    console.log(`\n⚠️  予算上限 $${BUDGET_USD} に達したため途中停止しました。`);
  }

  // コストログ保存
  costLog.totalUsd += runCostUsd;
  costLog.runs.push({
    date: new Date().toISOString(),
    costUsd: runCostUsd,
    examFilter: opts.examFilter ?? "all",
    success: successCount,
    fail: failCount,
    skip: skipCount,
  });
  writeFileSync(costFile, JSON.stringify(costLog, null, 2), "utf8");

  // 結果ログ保存
  writeFileSync(
    join(LOGS_DIR, "regenerate-results.json"),
    JSON.stringify({ date: new Date().toISOString(), results }, null, 2),
    "utf8",
  );

  // サマリー出力
  console.log(`\n完了: 成功 ${successCount} / 失敗 ${failCount} / スキップ ${skipCount}`);
  if (!opts.dryRun) {
    console.log(
      `今回コスト: $${runCostUsd.toFixed(4)}  (¥${Math.round(runCostUsd * 150)})`,
    );
    console.log(
      `累計コスト: $${costLog.totalUsd.toFixed(4)}  / 予算 $${BUDGET_USD}`,
    );
  }
}

main().catch((err: unknown) => {
  console.error(err);
  process.exitCode = 1;
});
