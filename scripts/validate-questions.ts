import { QUESTIONS as K11_KAMOTSU } from "@/data/questions/unko-kanrisha-kamotsu";
import { QUESTIONS as K11_OTSU } from "@/data/questions/shobo-setsubishi-otsu6";
import { QUESTIONS as K11_KOU } from "@/data/questions/shobo-setsubishi-kou4";
import { QUESTIONS as K11_HEI } from "@/data/questions/kikenbutsu-hei";
import { QUESTIONS as K11_KIKEN_KOU } from "@/data/questions/kikenbutsu-kou";
import { QUESTIONS as K11_KOU1 } from "@/data/questions/shobo-setsubishi-kou1";
import { QUESTIONS as K11_RYOKAKU } from "@/data/questions/unko-kanrisha-ryokaku";
import { QUESTIONS as K11_OTSU4 } from "@/data/questions/kikenbutsu-otsu4";
import { SEKOU_1KENCHIKU_QUESTIONS } from "@/data/questions/sekou-1kenchiku";
import { KENCHIKUSHI1_CANDIDATES } from "../data/qualification-staging/kenchikushi1";
import { officialScoringIssue } from "@/lib/questions/official-scoring";
import { validateBenrishiStaging } from "./lib/validate-benrishi-staging";
import { PRACTICE_SESSIONS } from "@/lib/questions/practice-session";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { validateDokugekiChiba } from "./validate-dokugeki-chiba";
import { NativeBDataSchema, nativeBQuestionIssue } from "../lib/questions/native-b";
/**
 * data/questions/ 配下の問題データを検証・品質スコア算出。
 *
 * 使い方:
 *   pnpm validate:questions                  # 全試験
 *   pnpm validate:questions --exam=ap        # AP のみ
 *   pnpm validate:questions --exam=ap,fe     # AP + FE
 *   pnpm validate:questions --staging=sokuryoshi # 非公開の測量士原本・解説
 *   pnpm validate:questions --report         # docs/QUESTION_QUALITY.md を生成
 *   pnpm validate:questions --fix            # 自動修正可能な問題のみ報告
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { numericQuestionIssue } from "@/lib/questions/numeric";
import { orderingQuestionIssue } from "@/lib/questions/ordering";
import { ALL_QUESTIONS } from "@/data/questions";
import { DENKEN3_QUESTIONS } from "@/data/questions/denken3";
import { DENKEN2_QUESTIONS } from "@/data/questions/denken2";
import { DENKEN1_QUESTIONS } from "@/data/questions/denken1";
import { DENKO2_QUESTIONS } from "@/data/questions/denko2";
import { DENKO1_QUESTIONS } from "@/data/questions/denko1";
import { CIVIL2_QUESTIONS } from "@/data/questions/civil2";
import { KANKOJI2_QUESTIONS } from "@/data/questions/kankoji2";
import { ZOEN2_QUESTIONS } from "@/data/questions/zoen2";
import { ZOEN1_QUESTIONS } from "@/data/questions/zoen1";
import { TSUSHIN2_QUESTIONS } from "@/data/questions/tsushin2";
import { TSUSHIN1_QUESTIONS } from "@/data/questions/tsushin1";
import { CIVIL1_QUESTIONS } from "@/data/questions/civil1";
import { GENGO_CHOKAKUSHI_QUESTIONS } from "@/data/questions/gengo-chokakushi";
import type { Question } from "@/lib/questions/types";
import { detectAnswerDispute } from "@/lib/questions/explanation-consistency";
import { z } from "zod";
import { validateDojoOsenStaging } from "@/data/qualification-staging/dojo-osen";
import { validateKhkHanbaiStaging } from "./validate-khk-hanbai";
import { KIKAI_HOZEN_STAGED_QUESTIONS } from "@/data/qualification-staging/kikai-hozen";
import { RIYOSHI_CANDIDATES } from "@/data/questions/riyoshi";
import { validateSokuryoshiStaging } from "./qualification-ingestion/validate-sokuryoshi";
import { validateJokasoSetsubishiStaging } from "./lib/jokaso-setsubishi-staging";
import { validateChiikiRyoko } from "./validate-chiiki-ryoko";
import { validateKukakuSeiri } from "./validate-kukaku-seiri";

// Publication-gated pilots still require the same schema and source validation
// before their release gate can be lifted.
const VALIDATION_QUESTIONS = [
  ...new Map(
    [...ALL_QUESTIONS, ...GENGO_CHOKAKUSHI_QUESTIONS, ...K11_OTSU4, ...K11_RYOKAKU, ...K11_KOU1, ...K11_KIKEN_KOU, ...K11_HEI, ...K11_KOU, ...K11_OTSU, ...K11_KAMOTSU, ...SEKOU_1KENCHIKU_QUESTIONS, ...KENCHIKUSHI1_CANDIDATES, ...RIYOSHI_CANDIDATES, ...DENKEN3_QUESTIONS, ...DENKEN2_QUESTIONS, ...DENKEN1_QUESTIONS, ...DENKO2_QUESTIONS, ...DENKO1_QUESTIONS, ...CIVIL2_QUESTIONS, ...CIVIL1_QUESTIONS, ...KANKOJI2_QUESTIONS, ...ZOEN2_QUESTIONS, ...ZOEN1_QUESTIONS, ...TSUSHIN2_QUESTIONS, ...TSUSHIN1_QUESTIONS].map((question) => [question.id, question]),
  ).values(),
];

// ─── CLI ─────────────────────────────────────────────────────────────────────

interface CliOptions {
  staging?: string;
  exams: string[];
  report: boolean;
  fix: boolean;
}

function parseCliOptions(): CliOptions {
  const argv = process.argv.slice(2);
  let exams: string[] = [];
  let report = false;
  let fix = false;
  let staging: string | undefined;
  for (const arg of argv) {
    if (arg === "--report") report = true;
    else if (arg === "--fix") fix = true;
    else if (arg.startsWith("--staging=")) staging = arg.slice(10);
    else if (arg.startsWith("--exam=")) {
      exams = arg.slice(7).split(",").map((s) => s.trim());
    }
  }
  return { exams, report, fix, staging };
}

// ─── Schema ───────────────────────────────────────────────────────────────────

const QuestionSchema = z.object({
  id: z.string().min(1),
  exam: z.enum(Object.keys(EXAM_CONFIGS) as [string, ...string[]]),
  session: z.enum([...PRACTICE_SESSIONS] as [string, ...string[]]),
  year: z.number().int().min(2000).max(2100),
  season: z.enum(["spring", "autumn", "cbt", "published", "first", "second", "early", "may", "september", "january", "october", "late", "annual", "july", "primary", "kansai", "february", "june", "august", "march", "round1", "round2"]),
  qNumber: z.number().int().min(1),
  part: z.enum(["a", "b", "1", "2", "3", "4", "5"]).optional(),
  type: z.enum(["multiple-choice", "ordering", "numeric", "descriptive", "essay", "native-b"]),
  nativeB: NativeBDataSchema.optional(),
  numericAnswer: z.discriminatedUnion("format", [
    z.object({ format: z.literal("scientific"), precision: z.literal(2), unit: z.string().trim().min(1) }),
    z.object({ format: z.literal("integer"), unit: z.string().trim().min(1), fixedSign: z.literal("negative").optional() }),
    z.object({ format: z.literal("decimal"), precision: z.union([z.literal(1), z.literal(2)]), unit: z.string().trim().min(1), fixedSign: z.literal("negative").optional() }),
  ]).optional(),
  category: z.string().min(1),
  topicTags: z.array(z.string()),
  difficulty: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  question: z.string().min(1),
  choices: z
    .object({
      ア: z.string().optional(),
      イ: z.string().optional(),
      ウ: z.string().optional(),
      エ: z.string().optional(),
      オ: z.string().optional(),
      カ: z.string().optional(),
      キ: z.string().optional(),
      ク: z.string().optional(),
      ケ: z.string().optional(),
      コ: z.string().optional(),
      サ: z.string().optional(),
      シ: z.string().optional(),
      ス: z.string().optional(),
      セ: z.string().optional(),
      ソ: z.string().optional(),
      タ: z.string().optional(),
    })
    .refine((choices) => Object.values(choices).filter(Boolean).length >= 2, "選択肢は2個以上必要です")
    .optional(),
  officialScoring: z.object({ kind: z.literal("credit-for-all"), reason: z.string().trim().min(1) }).optional(),
  publicAllowed: z.boolean().optional(),
  answer: z.union([z.string(), z.array(z.string().min(1))]),
  requiredSelections: z.number().int().min(1).max(4).optional(),
  explanation: z.string().min(1),
  choiceExplanations: z.record(z.string(), z.string()).optional(),
  modelAnswer: z.string().optional(),
  scoringCriteria: z.string().optional(),
  hasImage: z.boolean(),
  imageUrls: z.array(z.string()).optional(),
  imageAltTexts: z.array(z.string().trim().min(1)).optional(),
  choiceImageUrls: z.record(z.string(), z.string()).optional(),
  sourcePdfUrl: z.string().url(),
  sourceAnswerUrl: z.string().url().optional(),
  sourceAttribution: z.string().min(1).optional(),
  lawReferenceDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  officialReferenceUrls: z.array(z.string().url()).optional(),
  license: z.enum(["JAVADA-owner-authorized", "UNKAN-permission-required","SHOUBO-permission-required","INT7-owner-decision","KHK-attributed", "JAEIC-owner-approved-staging", "CHINTAI-owner-authorized", "KYUSUI-owner-authorized", "JAHMEC-owner-authorized", "NUSTEC-owner-authorized", "ECCJ-owner-approved", "MLIT-PDL-1.0", "CPAAOB-PDL-1.0", "IPA-public", "JAFP-reuse-with-attribution", "KINZAI-reuse-with-attribution", "ECEE-educational-reuse", "RETIO-reuse", "JCTC-authorized-reuse", "SSSC-reuse", "KANSAI-UNION-reuse", "KANRIKYO-educational-reuse", "EXAM-OR-JP-attributed", "IPEJ-attributed", "HOYOKYO-attributed", "MANKAN-attributed", "JFSA-attributed", "SHAROSI-attributed", "MHLW-attributed", "AHK-attributed", "JAAME-attributed", "RBC-attributed", "JF-CMCA-attributed", "JCTC-attributed", "MOJ-attributed", "ZAIJUSEI-attributed", "NICHIMU-educational-reuse", "NICHIMU-past-question-study-use", "JIA-attributed", "JMBSC-permission-required", "JAEIC-permission-required", "IP-EDU-authorized-reuse", "JASPA-owner-authorized", "SHOUBO-owner-authorized", "JECES-owner-cleared", "FCIP-owner-confirmed", "JYOUBUN-owner-authorized", "KOKUSEN-owner-authorized", "CHORD-owner-authorized", "SGEC-owner-authorized", "JKEN-owner-cleared", "JCCPP-attributed", "KHK-owner-decision", "FCIP-owner-authorized", "YAMAGUCHI-attributed", "METI-attributed", "JCM-authorized-reuse", "GYOSEI-owner-cleared", "CAREER-SHIKEN-owner-authorized", "JATA-owner-authorized", "GSI-attributed", "PREF-published", "JIPM-owner-decision", "CUSTOMS-attributed"]),
  isCalculation: z.boolean().optional(),
});

// ─── Quality score ────────────────────────────────────────────────────────────

interface QualityResult {
  score: number; // 0–100
  warnings: string[];
}

const UNCERTAIN_PHRASES = [
  /かもしれません/,
  /と思われます/,
  /でしょう[。．]/,
  /不明です/,
  /確認が必要/,
];

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

  const expLen = q.explanation.trim().length;
  if (/^正解は[アイウエオカキクケコ]です[。．]\s*(?:[（(]出典[:：][^）)]*[）)])?\s*$/.test(q.explanation.trim())) {
    score -= 15;
    warnings.push("解説が正答・出典のみで理由がない");
  }
  if (expLen < 30) {
    score -= 30;
    warnings.push(`explanation < 30文字 (${expLen}字) — 要確認`);
  } else if (expLen < 50) {
    score -= 20;
    warnings.push(`explanation < 50文字 (${expLen}字)`);
  }

  const uncertainMatch = UNCERTAIN_PHRASES.find((re) => re.test(q.explanation));
  if (uncertainMatch) {
    score -= 15;
    warnings.push(`不安言い回し検出: "${q.explanation.slice(0, 40)}…"`);
  }

  if (q.hasImage && !q.imageUrls?.length && !Object.values(q.choiceImageUrls ?? {}).some(Boolean)) {
    score -= 10;
    warnings.push("hasImage=true だが imageUrls なし");
  }
  if (q.type === "multiple-choice") {
    const choices = q.choices;
      if (!choices || Object.keys(choices).length < 2) {
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
    score -= 5;
  }
  if (q.needsReview) {
    score -= 20;
    warnings.push("needsReview フラグあり（出題プール除外）");
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
  const seenQNumbers = new Map<string, Set<string>>(); // "exam-year-season-session" → Set<qNumber+part>
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
    const answerUnit = `${q.qNumber}${q.part ? `-${q.part}` : ""}`;
    if (numSet.has(answerUnit)) {
      fail++;
      byExam[examKey].fail++;
      issues.push({ id: q.id, level: "error", message: `qNumber 重複: ${groupKey} #${q.qNumber}` });
      console.error(`[FAIL] ${q.id}: qNumber ${q.qNumber} duplicated in ${groupKey}`);
      continue;
    }
    numSet.add(answerUnit);

    if (q.type === "numeric") {
      const numericIssue = numericQuestionIssue(q);
      if (numericIssue || !q.sourceAnswerUrl || !q.sourceAttribution) {
        fail++;
        byExam[examKey].fail++;
        const message = numericIssue ?? "numeric requires official answer URL and source attribution";
        issues.push({ id: q.id, level: "error", message });
        console.error(`[FAIL] ${q.id}: ${message}`);
        continue;
      }
    }

    if (q.type === "ordering") {
      const orderingIssue = orderingQuestionIssue(q);
      if (orderingIssue || !q.sourceAnswerUrl || !q.sourceAttribution) {
        fail++;
        byExam[examKey].fail++;
        const message = orderingIssue ?? "ordering requires official answer URL and source attribution";
        issues.push({ id: q.id, level: "error", message });
        console.error(`[FAIL] ${q.id}: ${message}`);
        continue;
      }
    }

    const scoringIssue = officialScoringIssue(q);
    if (scoringIssue) { fail++; byExam[examKey].fail++; issues.push({ id: q.id, level: "error", message: scoringIssue }); continue; }
    const nativeIssue = nativeBQuestionIssue(q);
    if (nativeIssue || (q.type !== "native-b" && typeof q.answer === "string" && !q.answer.trim())) {
      fail++;
      byExam[examKey].fail++;
      const message = nativeIssue ?? "Missing answer";
      issues.push({ id: q.id, level: "error", message });
      continue;
    }

    // Multiple-choice specific checks
    if (q.type === "multiple-choice") {
      if (!q.choices) {
        fail++;
        byExam[examKey].fail++;
        issues.push({ id: q.id, level: "error", message: "multiple-choice に choices なし" });
        console.error(`[FAIL] ${q.id}: multiple-choice requires choices`);
        continue;
      }
      const answers = Array.isArray(q.answer) ? q.answer : [q.answer];
      const ans = answers.find(key => !["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ", "サ", "シ", "ス", "セ", "ソ", "タ"].includes(key) || !q.choices?.[key as keyof typeof q.choices]);
      if (!q.officialScoring && (ans !== undefined || answers.length === 0)) {
        fail++;
        byExam[examKey].fail++;
        issues.push({ id: q.id, level: "error", message: `answer 不正: "${ans}"` });
        console.error(`[FAIL] ${q.id}: answer must identify a present choice, got "${ans}"`);
        continue;
      }

      if (q.choiceExplanations) {
        const choiceKeys = Object.entries(q.choices)
          .filter((entry): entry is [string, string] => typeof entry[1] === "string")
          .map(([key]) => key)
          .sort();
        const explanationKeys = Object.entries(q.choiceExplanations)
          .filter((entry): entry is [string, string] => typeof entry[1] === "string" && entry[1].trim().length > 0)
          .map(([key]) => key)
          .sort();
        if (choiceKeys.join(",") !== explanationKeys.join(",")) {
          fail++;
          byExam[examKey].fail++;
          issues.push({ id: q.id, level: "error", message: "選択肢数と全肢解説数が不一致" });
          console.error(`[FAIL] ${q.id}: every choice requires exactly one explanation`);
          continue;
        }
      }

      if (q.license !== "IPA-public") {
        const officialSummary = q.exam === "denken3" && q.explanationCoverage === "official-summary";
        if ((!q.choiceExplanations && !officialSummary) || !q.sourceAnswerUrl || !q.sourceAttribution) {
          fail++;
          byExam[examKey].fail++;
          issues.push({
            id: q.id,
            level: "error",
            message: "外部資格には全肢解説・公式正答URL・出典表記が必要",
          });
          console.error(`[FAIL] ${q.id}: external qualification metadata is incomplete`);
          continue;
        }
      }
    }

    // Explanation must not contradict its own answer key (phase 11 / F-1).
    // High-confidence "admits the official answer then disputes it" phrasings
    // are a hard failure so they cannot ship.
    const dispute = detectAnswerDispute(q);
    if (dispute) {
      fail++;
      byExam[examKey].fail++;
      issues.push({ id: q.id, level: "error", message: `解説が公式正解と矛盾: ${dispute}` });
      console.error(`[FAIL] ${q.id}: ${dispute}`);
      continue;
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
| 解説 < 30文字（要確認） | −30 |
| 解説 < 50文字 | −20 |
| 不安言い回し検出（～かもしれません等） | −15 |
| hasImage=true で imageUrls なし | −10 |
| multiple-choice に choices なし | −25 |
| 選択肢に空文字あり | −10 |
| needsReview フラグあり | −20 |

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
if (opts.exams.length === 0 || opts.exams.some(exam => ["khk-hanbai", "khk-hanbai2", "khk-setsubishi"].includes(exam))) {
  const staging = validateKhkHanbaiStaging();
  console.log(`[staging:khk-hanbai] ${staging.count} questions, ${staging.errors.length} errors; private`);
  for (const error of staging.errors) console.error(`[FAIL] ${error}`);
  if (staging.errors.length > 0) process.exit(1);
}
if (KIKAI_HOZEN_STAGED_QUESTIONS.length !== 100 || KIKAI_HOZEN_STAGED_QUESTIONS.some((q) => q.publicAllowed)) {
  throw new Error("kikai-hozen staging must hold 100 private questions");
}
console.log(`[staging] kikai-hozen: ${KIKAI_HOZEN_STAGED_QUESTIONS.length} questions; publicAllowed=false`);
if (!opts.exams.length || opts.exams.includes("benrishi")) {
  console.log(`[private-staging] benrishi: validated ${validateBenrishiStaging()} unpublished questions (publicAllowed=false)`);
}

if (opts.staging !== undefined) {
  if (opts.staging !== "sokuryoshi" || opts.exams.length || opts.fix || opts.report) {
    console.error("Use --staging=sokuryoshi alone for private qualification validation.");
    process.exit(1);
  }
  const result = validateSokuryoshiStaging();
  for (const error of result.errors) console.error(`[FAIL] ${error}`);
  console.log(`Validated ${result.count} private sokuryoshi originals. fail=${result.errors.length}`);
  process.exit(result.errors.length ? 1 : 0);
}
// Private staging has its own schema and must not be registered as a live exam
// just to participate in validation. Avoid a misleading zero-question success.
if (opts.exams.includes("dokugeki-chiba")) {
  validateDokugekiChiba();

}
if (opts.exams.length === 0 || opts.exams.includes("jokaso-setsubishi")) {
  console.log(`[staging] jokaso-setsubishi: ${validateJokasoSetsubishiStaging()} questions; publicAllowed=false`);
}
validateChiikiRyoko(opts.exams);
// CQ7 is a private, partial corpus and has no public ExamCode.
const privateStagedCount = validateKukakuSeiri(opts.exams);
// A private editorial corpus has its own image-required schema and is never
// registered as a public ExamCode merely to make a validation filter find it.
if (opts.exams.includes("dojo-osen")) {
  const count = validateDojoOsenStaging();
  console.log(`Validated ${count} dojo-osen staged questions. ok=${count} fail=0 publicAllowed=false`);

}
const questions = opts.exams.length > 0
  ? VALIDATION_QUESTIONS.filter((q) => opts.exams.includes(q.exam))
  : VALIDATION_QUESTIONS;

if (opts.exams.length > 0) {
  console.log(`[filter] exam: ${opts.exams.join(", ")} → ${questions.length}件`);
}

const result = validate(questions);

console.log(`\nValidated ${questions.length} public-schema questions + ${privateStagedCount} private staged questions. ok=${result.ok} fail=${result.fail} warn=${result.warn}`);

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
