/**
 * data/questions/ 配下の問題データを検証・品質スコア算出。
 *
 * 使い方:
 *   pnpm validate:questions                  # 全試験
 *   pnpm validate:questions --exam=ap        # AP のみ
 *   pnpm validate:questions --exam=ap,fe     # AP + FE
 *   pnpm validate:questions --report         # docs/QUESTION_QUALITY.md を生成
 *   pnpm validate:questions --fix            # 自動修正可能な問題のみ報告
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { ALL_QUESTIONS } from "@/data/questions";
import type { Question } from "@/lib/questions/types";
import { z } from "zod";

// ─── CLI ─────────────────────────────────────────────────────────────────────

interface CliOptions {
  exams: string[];
  report: boolean;
  fix: boolean;
}

function parseCliOptions(): CliOptions {
  const argv = process.argv.slice(2);
  let exams: string[] = [];
  let report = false;
  let fix = false;
  for (const arg of argv) {
    if (arg === "--report") report = true;
    else if (arg === "--fix") fix = true;
    else if (arg.startsWith("--exam=")) {
      exams = arg.slice(7).split(",").map((s) => s.trim());
    }
  }
  return { exams, report, fix };
}

// ─── Schema ───────────────────────────────────────────────────────────────────

const QuestionSchema = z.object({
  id: z.string().min(1),
  exam: z.enum(["ip", "sg", "fe", "ap", "st", "sa", "pm", "nw", "db", "es", "sc", "sm", "au"]),
  session: z.enum(["am", "am1", "am2", "pm", "pm1", "pm2", "kamoku-a", "kamoku-b"]),
  year: z.number().int().min(2000).max(2100),
  season: z.enum(["spring", "autumn", "cbt"]),
  qNumber: z.number().int().min(1),
  type: z.enum(["multiple-choice", "descriptive", "essay"]),
  category: z.string().min(1),
  topicTags: z.array(z.string()),
  difficulty: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  question: z.string().min(1),
  choices: z
    .object({
      ア: z.string().min(1),
      イ: z.string().min(1),
      ウ: z.string().min(1),
      エ: z.string().min(1),
    })
    .optional(),
  answer: z.union([z.string().min(1), z.array(z.string().min(1))]),
  explanation: z.string().min(1),
  modelAnswer: z.string().optional(),
  scoringCriteria: z.string().optional(),
  hasImage: z.boolean(),
  imageUrls: z.array(z.string()).optional(),
  sourcePdfUrl: z.string().url(),
  license: z.literal("IPA-public"),
  isCalculation: z.boolean().optional(),
});

// ─── Quality score ────────────────────────────────────────────────────────────

interface QualityResult {
  score: number; // 0–100
  warnings: string[];
}

function computeQuality(q: Question): QualityResult {
  let score = 100;
  const warnings: string[] = [];

  if (q.question.trim().length < 10) {
    score -= 20;
    warnings.push("question < 10文字");
  }
  if (q.topicTags.length === 0) {
    score -= 15;
    warnings.push("topicTags が空");
  }
  if (q.explanation.trim().length < 50) {
    score -= 20;
    warnings.push("explanation < 50文字");
  }
  if (q.hasImage && !q.imageUrls?.length) {
    score -= 10;
    warnings.push("hasImage=true だが imageUrls なし");
  }
  if (q.type === "multiple-choice") {
    const choices = q.choices;
    if (!choices) {
      score -= 25;
      warnings.push("multiple-choice に choices なし");
    } else {
      const allFull = Object.values(choices).every((v) => v.trim().length > 0);
      if (!allFull) {
        score -= 10;
        warnings.push("choices に空文字の選択肢あり");
      }
    }
  }
  if (q.difficulty === 3 && q.topicTags.length === 0) {
    // Default difficulty + no tags = likely auto-generated, gentle penalty
    score -= 5;
  }

  return { score: Math.max(0, score), warnings };
}

// ─── Validation ───────────────────────────────────────────────────────────────

interface ValidationResult {
  ok: number;
  fail: number;
  warn: number;
  byExam: Record<string, { ok: number; fail: number; warn: number; totalScore: number; count: number }>;
  issues: Array<{ id: string; level: "error" | "warn"; message: string }>;
}

function validate(questions: Question[]): ValidationResult {
  let ok = 0;
  let fail = 0;
  let warn = 0;
  const seenIds = new Set<string>();
  const seenQNumbers = new Map<string, Set<number>>(); // "exam-year-season-session" → Set<qNumber>
  const byExam: ValidationResult["byExam"] = {};
  const issues: ValidationResult["issues"] = [];

  for (const q of questions) {
    const examKey = q.exam ?? "unknown";
    if (!byExam[examKey]) byExam[examKey] = { ok: 0, fail: 0, warn: 0, totalScore: 0, count: 0 };
    byExam[examKey].count++;

    // Schema validation
    const r = QuestionSchema.safeParse(q);
    if (!r.success) {
      fail++;
      byExam[examKey].fail++;
      const msg = r.error.issues.map((i) => i.message).join(", ");
      issues.push({ id: q.id ?? "(no id)", level: "error", message: `スキーマ違反: ${msg}` });
      console.error(`[FAIL] ${q.id ?? "(no id)"}: ${msg}`);
      continue;
    }

    // Duplicate id
    if (seenIds.has(q.id)) {
      fail++;
      byExam[examKey].fail++;
      issues.push({ id: q.id, level: "error", message: "ID重複" });
      console.error(`[FAIL] duplicate id: ${q.id}`);
      continue;
    }
    seenIds.add(q.id);

    // Duplicate qNumber within same exam/year/season/session
    const groupKey = `${q.exam}-${q.year}-${q.season}-${q.session}`;
    if (!seenQNumbers.has(groupKey)) seenQNumbers.set(groupKey, new Set());
    const numSet = seenQNumbers.get(groupKey)!;
    if (numSet.has(q.qNumber)) {
      fail++;
      byExam[examKey].fail++;
      issues.push({ id: q.id, level: "error", message: `qNumber 重複: ${groupKey} #${q.qNumber}` });
      console.error(`[FAIL] ${q.id}: qNumber ${q.qNumber} duplicated in ${groupKey}`);
      continue;
    }
    numSet.add(q.qNumber);

    // Multiple-choice specific checks
    if (q.type === "multiple-choice") {
      if (!q.choices) {
        fail++;
        byExam[examKey].fail++;
        issues.push({ id: q.id, level: "error", message: "multiple-choice に choices なし" });
        console.error(`[FAIL] ${q.id}: multiple-choice requires choices`);
        continue;
      }
      const ans = Array.isArray(q.answer) ? q.answer[0] : q.answer;
      if (!["ア", "イ", "ウ", "エ"].includes(ans)) {
        fail++;
        byExam[examKey].fail++;
        issues.push({ id: q.id, level: "error", message: `answer 不正: "${ans}"` });
        console.error(`[FAIL] ${q.id}: answer must be ア/イ/ウ/エ, got "${ans}"`);
        continue;
      }
    }

    // Quality checks (warnings, not failures)
    const { score, warnings } = computeQuality(q);
    byExam[examKey].totalScore += score;

    if (warnings.length > 0) {
      warn++;
      byExam[examKey].warn++;
      for (const w of warnings) {
        issues.push({ id: q.id, level: "warn", message: w });
        console.warn(`[WARN] ${q.id}: ${w}`);
      }
    }

    ok++;
    byExam[examKey].ok++;
  }

  return { ok, fail, warn, byExam, issues };
}

// ─── Markdown report ─────────────────────────────────────────────────────────

function generateReport(result: ValidationResult, total: number): string {
  const now = new Date().toISOString().slice(0, 10);
  const avgScore =
    Object.values(result.byExam).reduce((s, e) => s + e.totalScore, 0) /
    Math.max(total, 1);

  const examRows = Object.entries(result.byExam)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([exam, stat]) => {
      const avg = stat.count > 0 ? Math.round(stat.totalScore / stat.count) : 0;
      const bar = "█".repeat(Math.round(avg / 10)) + "░".repeat(10 - Math.round(avg / 10));
      return `| ${exam} | ${stat.count} | ${stat.ok} | ${stat.fail} | ${stat.warn} | ${avg} ${bar} |`;
    })
    .join("\n");

  const errorList = result.issues
    .filter((i) => i.level === "error")
    .slice(0, 50)
    .map((i) => `- \`${i.id}\`: ${i.message}`)
    .join("\n");

  const warnList = result.issues
    .filter((i) => i.level === "warn")
    .slice(0, 100)
    .map((i) => `- \`${i.id}\`: ${i.message}`)
    .join("\n");

  return `# 問題データ品質レポート

生成日: ${now}
総問題数: **${total}**
平均品質スコア: **${Math.round(avgScore)} / 100**

## 試験区分別サマリー

| 試験 | 総数 | OK | NG | WARN | 平均スコア |
|------|------|----|----|------|------------|
${examRows}

## 検証結果

- ✅ OK: ${result.ok}
- ❌ FAIL: ${result.fail}
- ⚠️ WARN: ${result.warn}

## スコア算出ルール

| チェック項目 | 減点 |
|-------------|------|
| 問題文 < 10文字 | −20 |
| topicTags が空 | −15 |
| 解説 < 50文字 | −20 |
| hasImage=true で imageUrls なし | −10 |
| multiple-choice に choices なし | −25 |
| 選択肢に空文字あり | −10 |

## エラー一覧 (最大50件)

${errorList || "（なし）"}

## 警告一覧 (最大100件)

${warnList || "（なし）"}
`;
}

// ─── Fix reporter ─────────────────────────────────────────────────────────────

function reportFixes(questions: Question[]): void {
  console.log("\n=== 自動修正可能な問題 ===");
  let count = 0;
  for (const q of questions) {
    const fixes: string[] = [];
    if (q.topicTags.length === 0) {
      fixes.push(`topicTags: [] → [${JSON.stringify(q.category)}]`);
    }
    if (q.question.endsWith(" ") || q.question.startsWith(" ")) {
      fixes.push("question: 前後空白トリム");
    }
    if (q.explanation.endsWith(" ") || q.explanation.startsWith(" ")) {
      fixes.push("explanation: 前後空白トリム");
    }
    if (fixes.length > 0) {
      count++;
      console.log(`  ${q.id}:`);
      for (const f of fixes) console.log(`    - ${f}`);
    }
  }
  if (count === 0) console.log("  修正対象なし");
  else console.log(`\n合計 ${count} 件。実際の修正は parse-all.ts の再実行を推奨します。`);
}

// ─── Main ────────────────────────────────────────────────────────────────────

const opts = parseCliOptions();
const questions = opts.exams.length > 0
  ? ALL_QUESTIONS.filter((q) => opts.exams.includes(q.exam))
  : ALL_QUESTIONS;

if (opts.exams.length > 0) {
  console.log(`[filter] exam: ${opts.exams.join(", ")} → ${questions.length}件`);
}

const result = validate(questions);

console.log(`\nValidated ${questions.length} questions. ok=${result.ok} fail=${result.fail} warn=${result.warn}`);

if (opts.fix) reportFixes(questions);

if (opts.report) {
  const docsDir = join(process.cwd(), "docs");
  mkdirSync(docsDir, { recursive: true });
  const md = generateReport(result, questions.length);
  const outPath = join(docsDir, "QUESTION_QUALITY.md");
  writeFileSync(outPath, md, "utf-8");
  console.log(`\n[report] docs/QUESTION_QUALITY.md を生成しました。`);
}

if (result.fail > 0) process.exit(1);
