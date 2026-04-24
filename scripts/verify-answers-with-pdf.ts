/**
 * IPA 公式解答 PDF と既存の answer フィールドを突合するスクリプト。
 *
 * 前提: pnpm fetch:pdfs --all で data/raw_pdfs/ に解答 PDF をダウンロード済みであること。
 *
 * 使い方:
 *   pnpm verify:answers                  # 全試験
 *   pnpm verify:answers -- --exam=ap     # AP のみ
 *   pnpm verify:answers -- --dry-run     # API呼び出しなし（PDF存在確認のみ）
 *
 * 出力:
 *   logs/answer-pdf-mismatch.json   不一致サマリー
 *
 * コスト: Gemini 2.5 Flash-Lite — $0.10/1M input, $0.40/1M output
 *   解答PDF 1枚 ≒ 500 input + 300 output tokens ≈ $0.00017
 *   全試験 ~300 ファイル ≈ $0.05（予算内）
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, basename } from "node:path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  EXAM_CONFIGS,
  ALL_EXAM_CODES,
  buildRawPdfPath,
  buildAnswerExtractionPrompt,
  type ExamConfig,
  type SessionConfig,
} from "@/lib/exam-config";
import type { ExamCode, Season } from "@/lib/questions/types";
import { ALL_QUESTIONS } from "@/data/questions";

const RAW_DIR = join(process.cwd(), "data", "raw_pdfs");
const LOGS_DIR = join(process.cwd(), "logs");
const BUDGET_USD = 2; // 解答PDF突合は低コスト
const MODEL_NAME = "gemini-2.5-flash-lite";

// ─── 型定義 ───────────────────────────────────────────────────────────────────

interface MismatchEntry {
  id: string;
  exam: ExamCode;
  year: number;
  season: Season;
  session: string;
  qNumber: number;
  currentAnswer: string;
  pdfAnswer: string;
  sourcePdfUrl: string;
}

interface ExamStat {
  total: number;
  scanned: number;
  mismatches: number;
}

interface MismatchReport {
  generatedAt: string;
  totalQuestions: number;
  totalScanned: number;
  totalMismatches: number;
  budgetUsd: number;
  costUsd: number;
  byExam: Record<string, ExamStat>;
  mismatches: MismatchEntry[];
  sampleMismatches: MismatchEntry[];
}

// ─── CLI ─────────────────────────────────────────────────────────────────────

interface CliOptions {
  exams: ExamCode[];
  dryRun: boolean;
}

function parseCliOptions(): CliOptions {
  const argv = process.argv.slice(2);
  let exams: ExamCode[] = [];
  const dryRun = argv.includes("--dry-run");

  for (const arg of argv) {
    if (arg.startsWith("--exam=")) {
      exams = arg.slice(7).split(",") as ExamCode[];
    }
  }
  if (exams.length === 0) {
    exams = ALL_EXAM_CODES.filter((e) => EXAM_CONFIGS[e].seasons.length > 0);
  }
  return { exams, dryRun };
}

// ─── PDF ユーティリティ ────────────────────────────────────────────────────────

function pdfExists(relPath: string): boolean {
  return existsSync(join(RAW_DIR, relPath));
}

function pdfToBase64(relPath: string): string {
  const abs = join(RAW_DIR, relPath);
  return readFileSync(abs).toString("base64");
}

function extractJsonObj(text: string): Record<string, string> | null {
  const fenced = text.match(/```(?:json)?\s*([\s\S]+?)```/);
  const candidate = fenced ? fenced[1] : text;
  const objMatch = candidate.match(/(\{[\s\S]*\})/);
  const raw = objMatch?.[1] ?? candidate.trim();
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
      return parsed as Record<string, string>;
    }
  } catch { /* fall through */ }
  return null;
}

function calcCost(inputTokens: number, outputTokens: number): number {
  return inputTokens * 0.1 / 1_000_000 + outputTokens * 0.4 / 1_000_000;
}

// ─── 解答 PDF から解答を抽出 ──────────────────────────────────────────────────

type GeminiModel = ReturnType<InstanceType<typeof GoogleGenerativeAI>["getGenerativeModel"]>;

async function extractAnswersFromPdf(
  model: GeminiModel,
  cfg: ExamConfig,
  sessionCfg: SessionConfig,
  year: number,
  season: "spring" | "autumn",
): Promise<{ answers: Record<string, string>; costUsd: number } | null> {
  const relPath = buildRawPdfPath(cfg.code, year, season, sessionCfg.session, "ans",
                                   sessionCfg.noSessionPrefix);
  if (!pdfExists(relPath)) {
    console.log(`  [skip] PDF not found: ${relPath}`);
    return null;
  }

  const pdfB64 = pdfToBase64(relPath);
  const prompt = buildAnswerExtractionPrompt(sessionCfg);

  try {
    const result = await model.generateContent([
      { inlineData: { mimeType: "application/pdf", data: pdfB64 } },
      prompt,
    ]);
    const text = result.response.text().trim();
    const usage = result.response.usageMetadata;
    const costUsd = calcCost(
      usage?.promptTokenCount ?? 500,
      usage?.candidatesTokenCount ?? 300,
    );

    const answers = extractJsonObj(text);
    if (!answers) {
      console.warn(`  [warn] JSON parse failed for ${cfg.code} ${year} ${season} ${sessionCfg.session}`);
      return { answers: {}, costUsd };
    }
    return { answers, costUsd };
  } catch (err) {
    console.error(`  [error] ${cfg.code} ${year} ${season} ${sessionCfg.session}: ${err}`);
    return null;
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const opts = parseCliOptions();

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey && !opts.dryRun) {
    console.error("GEMINI_API_KEY が未設定です。--dry-run で動作確認してください。");
    process.exitCode = 1;
    return;
  }

  mkdirSync(LOGS_DIR, { recursive: true });

  const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
  const model = genAI?.getGenerativeModel({ model: MODEL_NAME });

  // 問題データをインデックス化: key = "exam:year:season:session:qNumber"
  const questionIndex = new Map<string, { id: string; answer: string; sourcePdfUrl: string }>();
  for (const q of ALL_QUESTIONS) {
    if (q.type !== "multiple-choice") continue;
    const ans = Array.isArray(q.answer) ? q.answer[0] : q.answer;
    const key = `${q.exam}:${q.year}:${q.season}:${q.session}:${q.qNumber}`;
    questionIndex.set(key, { id: q.id, answer: ans, sourcePdfUrl: q.sourcePdfUrl });
  }

  console.log(`総問題数: ${ALL_QUESTIONS.length} / 四択: ${questionIndex.size}`);

  const report: MismatchReport = {
    generatedAt: new Date().toISOString(),
    totalQuestions: ALL_QUESTIONS.length,
    totalScanned: 0,
    totalMismatches: 0,
    budgetUsd: BUDGET_USD,
    costUsd: 0,
    byExam: {},
    mismatches: [],
    sampleMismatches: [],
  };

  let budgetExceeded = false;

  for (const examCode of opts.exams) {
    const cfg = EXAM_CONFIGS[examCode];
    if (cfg.seasons.length === 0) continue;

    const stat: ExamStat = { total: 0, scanned: 0, mismatches: 0 };
    report.byExam[examCode] = stat;

    const allSessions = cfg.sessions;
    const standardSeasons: Array<"spring" | "autumn"> = cfg.seasons.filter(
      (s): s is "spring" | "autumn" => s === "spring" || s === "autumn",
    );

    // 標準 yearRange
    const years: number[] = [];
    for (let y = cfg.yearRange.start; y <= cfg.yearRange.end; y++) years.push(y);

    // Legacy yearRange（存在する場合）
    if (cfg.legacyYearRange && cfg.legacySeasons) {
      for (let y = cfg.legacyYearRange.start; y <= cfg.legacyYearRange.end; y++) {
        if (!years.includes(y)) years.push(y);
      }
    }

    console.log(`\n=== ${cfg.nameFull} (${examCode}) ===`);

    for (const year of years) {
      for (const season of standardSeasons) {
        for (const sessionCfg of allSessions) {
          if (budgetExceeded) break;

          const relPath = buildRawPdfPath(cfg.code, year, season, sessionCfg.session, "ans",
                                          sessionCfg.noSessionPrefix);
          if (!pdfExists(relPath)) continue;

          // このセッションの問題数をカウント
          const sessionQCount = Array.from(questionIndex.keys())
            .filter((k) => k.startsWith(`${examCode}:${year}:${season}:${sessionCfg.session}:`))
            .length;
          stat.total += sessionQCount;

          if (opts.dryRun) {
            console.log(`  [dry-run] Found PDF: ${relPath} (${sessionQCount} questions)`);
            stat.scanned += sessionQCount;
            continue;
          }

          if (report.costUsd >= BUDGET_USD) {
            console.warn(`\n⚠️  予算上限 $${BUDGET_USD} に達したため停止`);
            budgetExceeded = true;
            break;
          }

          console.log(`  Extracting ${basename(relPath)}...`);
          const extracted = await model
            ? extractAnswersFromPdf(model, cfg, sessionCfg, year, season)
            : null;

          if (!extracted) continue;

          report.costUsd += extracted.costUsd;

          // 突合
          for (const [qNumStr, pdfAnswer] of Object.entries(extracted.answers)) {
            const qNum = parseInt(qNumStr, 10);
            const key = `${examCode}:${year}:${season}:${sessionCfg.session}:${qNum}`;
            const q = questionIndex.get(key);
            if (!q) continue;

            stat.scanned++;
            report.totalScanned++;

            if (q.answer !== pdfAnswer) {
              const entry: MismatchEntry = {
                id: q.id,
                exam: examCode,
                year,
                season,
                session: sessionCfg.session,
                qNumber: qNum,
                currentAnswer: q.answer,
                pdfAnswer,
                sourcePdfUrl: q.sourcePdfUrl,
              };
              report.mismatches.push(entry);
              stat.mismatches++;
              report.totalMismatches++;
              console.log(`  ❌ ${q.id}: current=${q.answer} pdf=${pdfAnswer}`);
            }
          }
        }
      }
    }
  }

  report.sampleMismatches = report.mismatches.slice(0, 10);

  const outPath = join(LOGS_DIR, "answer-pdf-mismatch.json");
  writeFileSync(outPath, JSON.stringify(report, null, 2), "utf8");

  console.log("\n" + "=".repeat(60));
  console.log(`総問題数:         ${report.totalQuestions}`);
  console.log(`突合済み:         ${report.totalScanned}`);
  console.log(`answer 不一致:    ${report.totalMismatches}`);
  console.log(`今回コスト:       $${report.costUsd.toFixed(4)}`);
  console.log(`出力:             ${outPath}`);

  if (report.mismatches.length > 0) {
    console.log("\n区分別不一致:");
    for (const [exam, stat] of Object.entries(report.byExam)) {
      if (stat.mismatches > 0) {
        console.log(`  ${exam}: ${stat.mismatches} / ${stat.scanned}`);
      }
    }
    console.log("\n不一致サンプル 10 件:");
    for (const m of report.sampleMismatches) {
      console.log(`  ${m.id}: current=${m.currentAnswer} → pdf=${m.pdfAnswer}`);
    }
    console.log("\n→ pnpm apply:answer-corrections で修正適用");
  } else {
    console.log("\n✅ answer 不一致なし（または未突合）");
  }
}

main().catch((err: unknown) => {
  console.error(err);
  process.exitCode = 1;
});
