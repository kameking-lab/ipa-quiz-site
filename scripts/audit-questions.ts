/**
 * 問題データ統合監査スクリプト。
 *
 * data/questions/ 配下の全問題（午前・午後・論述）を機械的にスキャンし、
 * 隠れバグ（欠落フィールド・重複ID・正解番号の範囲外・解説プレースホルダ残存・
 * 不正なHTML/Markdown・重複本文）を全件検出する。
 *
 * 既存の validate-questions.ts は型検証＋品質スコアが主目的。
 * 本スクリプトは「ユーザー機能を破綻させる致命傷」を抽出することに特化する。
 *
 * 使い方:
 *   pnpm tsx scripts/audit-questions.ts
 *   pnpm tsx scripts/audit-questions.ts --json    # JSON のみ出力
 *
 * 出力:
 *   logs/questions-audit-report.txt   人間向け
 *   logs/questions-audit-report.json  機械向け（分類フェーズで利用）
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { ALL_QUESTIONS } from "@/data/questions";
import type { Question, ChoiceKey } from "@/lib/questions/types";
import { AP_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/ap";
import { ALL_ESSAY_QUESTIONS } from "@/data/questions/essay";
import type { AfternoonQuestion } from "@/lib/afternoon/types";
import type { EssayQuestion } from "@/lib/essay/types";

// ─── 致命度分類 ───────────────────────────────────────────────────────────────

type Severity = "critical" | "opportunity" | "warning";

interface Finding {
  id: string;
  source: "morning" | "afternoon" | "essay";
  exam: string;
  severity: Severity;
  category: string;
  message: string;
  detail?: string;
}

const findings: Finding[] = [];

function add(
  q: { id: string; exam: string },
  source: Finding["source"],
  severity: Severity,
  category: string,
  message: string,
  detail?: string,
): void {
  findings.push({
    id: q.id,
    source,
    exam: q.exam,
    severity,
    category,
    message,
    detail,
  });
}

// ─── プレースホルダ判定（厳格版）───────────────────────────────────────────────

const PLACEHOLDER_PATTERNS: { re: RegExp; label: string }[] = [
  { re: /^正解は[アイウエ]です[。.]\s*$/, label: "正解は…です。のみ" },
  { re: /解説は準備中/, label: "解説は準備中" },
  { re: /AIコパイロット/, label: "AIコパイロット誘導文" },
  { re: /^\s*TODO\s*$/i, label: "TODO のみ" },
  { re: /Placeholder/i, label: "Placeholder 文字列" },
  { re: /準備中です/, label: "準備中です" },
];

function detectPlaceholderText(text: string): string | null {
  const trimmed = text.trim();
  if (trimmed === "") return "空文字";
  for (const { re, label } of PLACEHOLDER_PATTERNS) {
    if (re.test(trimmed)) return label;
  }
  return null;
}

// ─── HTML/Markdown 整合性 ─────────────────────────────────────────────────────

function checkMarkupBalance(text: string): string | null {
  // 簡易: ```fenceの個数, **/__ の個数, < > の対応
  const fences = (text.match(/```/g) ?? []).length;
  if (fences % 2 !== 0) return `\`\`\` フェンスが奇数個 (${fences})`;
  const bold = (text.match(/\*\*/g) ?? []).length;
  if (bold % 2 !== 0) return `** マークアップが奇数個 (${bold})`;
  // 簡易タグバランス (self-closingは除外)
  const opens = [...text.matchAll(/<([a-zA-Z][\w-]*)(?:\s[^>]*)?>/g)]
    .map((m) => m[1].toLowerCase())
    .filter((t) => !["br", "hr", "img", "input", "meta", "link"].includes(t));
  const closes = [...text.matchAll(/<\/([a-zA-Z][\w-]*)\s*>/g)].map((m) => m[1].toLowerCase());
  const tagBalance: Record<string, number> = {};
  for (const t of opens) tagBalance[t] = (tagBalance[t] ?? 0) + 1;
  for (const t of closes) tagBalance[t] = (tagBalance[t] ?? 0) - 1;
  const unbalanced = Object.entries(tagBalance).filter(([, n]) => n !== 0);
  if (unbalanced.length > 0) {
    return `タグ未対応: ${unbalanced.map(([t, n]) => `${t}(${n})`).join(", ")}`;
  }
  return null;
}

// ─── 午前問題 (Question) チェック ─────────────────────────────────────────────

const REQUIRED_MORNING_FIELDS: (keyof Question)[] = [
  "id",
  "exam",
  "session",
  "year",
  "season",
  "qNumber",
  "type",
  "category",
  "question",
  "answer",
  "explanation",
  "sourcePdfUrl",
  "license",
];

const VALID_CHOICE_KEYS: ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "コ"];

function auditMorningQuestion(q: Question, seenIds: Set<string>): void {
  // (a) 必須フィールド
  for (const k of REQUIRED_MORNING_FIELDS) {
    const v = q[k];
    if (v === undefined || v === null || (typeof v === "string" && v.trim() === "")) {
      add(q, "morning", "critical", "missing-field", `必須フィールド欠落: ${String(k)}`);
    }
  }

  // (b) ID 重複
  if (seenIds.has(q.id)) {
    add(q, "morning", "critical", "duplicate-id", "ID重複");
  } else {
    seenIds.add(q.id);
  }

  // (c) 選択肢数 + (d) 正解番号の範囲
  if (q.type === "multiple-choice") {
    if (!q.choices) {
      add(q, "morning", "critical", "missing-choices", "multiple-choice に choices なし");
    } else {
      const keys = Object.keys(q.choices) as ChoiceKey[];
      const filled = keys.filter((k) => (q.choices?.[k] ?? "").trim() !== "");
      if (filled.length < 2) {
        add(q, "morning", "critical", "choices-too-few", `有効な選択肢が ${filled.length} 個しかない`);
      }
      if (filled.length > 9) {
        add(q, "morning", "warning", "choices-too-many", `選択肢が ${filled.length} 個（想定外）`);
      }
      // 想定外キー
      for (const k of keys) {
        if (!VALID_CHOICE_KEYS.includes(k)) {
          add(q, "morning", "warning", "invalid-choice-key", `不正な選択肢キー: ${k}`);
        }
      }
      // 空文字選択肢
      const blank = keys.filter((k) => (q.choices?.[k] ?? "").trim() === "");
      if (blank.length > 0) {
        add(q, "morning", "opportunity", "blank-choice", `空文字の選択肢: ${blank.join(", ")}`);
      }
      // (d) 正解
      const ans = Array.isArray(q.answer) ? q.answer[0] : q.answer;
      if (typeof ans !== "string") {
        add(q, "morning", "critical", "answer-type", `answer 型不正: ${typeof ans}`);
      } else if (!filled.includes(ans as ChoiceKey)) {
        add(
          q,
          "morning",
          "critical",
          "answer-out-of-range",
          `正解 "${ans}" が有効な選択肢に存在しない (有効: ${filled.join(",")})`,
        );
      }
    }
  } else {
    // descriptive/essay は modelAnswer が望ましい
    if (!q.modelAnswer || q.modelAnswer.trim() === "") {
      add(q, "morning", "opportunity", "missing-model-answer", `${q.type} に modelAnswer なし`);
    }
  }

  // (e) 解説プレースホルダ
  const phLabel = detectPlaceholderText(q.explanation);
  if (phLabel) {
    add(q, "morning", "opportunity", "placeholder-explanation", `解説がプレースホルダ: ${phLabel}`);
  } else if (q.explanation.trim().length < 30) {
    add(q, "morning", "opportunity", "short-explanation", `解説 ${q.explanation.trim().length} 文字`);
  }

  // (f) sourcePdfUrl の形
  if (q.sourcePdfUrl && !/^https?:\/\//.test(q.sourcePdfUrl)) {
    add(q, "morning", "warning", "bad-pdf-url", `sourcePdfUrl が URL でない: ${q.sourcePdfUrl}`);
  }
  if (q.hasImage && (!q.imageUrls || q.imageUrls.length === 0)) {
    add(q, "morning", "opportunity", "missing-image-urls", "hasImage=true だが imageUrls なし");
  }

  // (g) マークアップバランス（問題文＋解説）
  const mqErr = checkMarkupBalance(q.question);
  if (mqErr) add(q, "morning", "warning", "markup-question", `問題文: ${mqErr}`);
  const meErr = checkMarkupBalance(q.explanation);
  if (meErr) add(q, "morning", "warning", "markup-explanation", `解説: ${meErr}`);
}

// ─── 午後問題 (AfternoonQuestion) チェック ────────────────────────────────────

function auditAfternoonQuestion(q: AfternoonQuestion, seenIds: Set<string>): void {
  for (const k of ["id", "exam", "year", "season", "qNumber", "title", "context", "pdfUrl"] as const) {
    const v = q[k];
    if (v === undefined || v === null || (typeof v === "string" && v.trim() === "")) {
      add(q, "afternoon", "critical", "missing-field", `必須フィールド欠落: ${k}`);
    }
  }
  if (seenIds.has(q.id)) {
    add(q, "afternoon", "critical", "duplicate-id", "ID重複");
  } else {
    seenIds.add(q.id);
  }
  if (!q.subQuestions || q.subQuestions.length === 0) {
    add(q, "afternoon", "critical", "no-sub-questions", "subQuestions が空");
  } else {
    for (const sq of q.subQuestions) {
      if (!sq.modelAnswer || sq.modelAnswer.trim() === "") {
        add(q, "afternoon", "opportunity", "sub-missing-model", `${sq.label} に modelAnswer なし`);
      }
      if (!sq.scoringRubric || sq.scoringRubric.trim() === "") {
        add(q, "afternoon", "opportunity", "sub-missing-rubric", `${sq.label} に scoringRubric なし`);
      }
      const ph = detectPlaceholderText(sq.modelAnswer ?? "");
      if (ph) {
        add(q, "afternoon", "opportunity", "sub-placeholder", `${sq.label} modelAnswer: ${ph}`);
      }
    }
  }
  const ctxMarkup = checkMarkupBalance(q.context ?? "");
  if (ctxMarkup) add(q, "afternoon", "warning", "markup-context", ctxMarkup);
}

// ─── 論述問題 (EssayQuestion) チェック ────────────────────────────────────────

function auditEssayQuestion(q: EssayQuestion, seenIds: Set<string>): void {
  for (const k of ["id", "exam", "year", "season", "qNumber", "title", "context", "pdfUrl"] as const) {
    const v = q[k];
    if (v === undefined || v === null || (typeof v === "string" && v.trim() === "")) {
      add(q, "essay", "critical", "missing-field", `必須フィールド欠落: ${k}`);
    }
  }
  if (seenIds.has(q.id)) {
    add(q, "essay", "critical", "duplicate-id", "ID重複");
  } else {
    seenIds.add(q.id);
  }
  if (!q.subPrompts || q.subPrompts.length !== 3) {
    add(
      q,
      "essay",
      "critical",
      "essay-sub-count",
      `subPrompts が 3 でない: ${q.subPrompts?.length ?? 0}`,
    );
  } else {
    const wantKeys = ["ア", "イ", "ウ"];
    for (let i = 0; i < 3; i++) {
      const sp = q.subPrompts[i];
      if (sp.key !== wantKeys[i]) {
        add(
          q,
          "essay",
          "warning",
          "essay-sub-key-order",
          `subPrompts[${i}].key=${sp.key} (想定 ${wantKeys[i]})`,
        );
      }
      if (!sp.prompt || sp.prompt.trim() === "") {
        add(q, "essay", "critical", "essay-sub-prompt-empty", `subPrompts[${sp.key}].prompt 空`);
      }
      if (!sp.modelOutline || sp.modelOutline.trim() === "") {
        add(
          q,
          "essay",
          "opportunity",
          "essay-sub-outline-empty",
          `subPrompts[${sp.key}].modelOutline 空`,
        );
      }
    }
  }
}

// ─── (h) 重複本文（午前のみ）─────────────────────────────────────────────────

function normalizeForDup(s: string): string {
  return s.replace(/\s+/g, "").replace(/[、。．，,.]/g, "");
}

function detectDuplicateBodies(questions: Question[]): void {
  const buckets = new Map<string, Question[]>();
  for (const q of questions) {
    const key = normalizeForDup(q.question).slice(0, 80); // 先頭80文字で粗くバケット化
    if (key.length < 20) continue;
    const arr = buckets.get(key) ?? [];
    arr.push(q);
    buckets.set(key, arr);
  }
  for (const [, arr] of buckets) {
    if (arr.length < 2) continue;
    // 完全一致 or 95%以上一致
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        const a = normalizeForDup(arr[i].question);
        const b = normalizeForDup(arr[j].question);
        if (a.length === 0 || b.length === 0) continue;
        if (a === b) {
          // 同年・同セッションの同問は無害（同一問題の再出題は別IDで存在しうる）
          // 異なる exam で同文一致 or 同 exam で異 ID は本物の重複バグ可能性
          if (arr[i].exam === arr[j].exam && arr[i].year === arr[j].year && arr[i].season === arr[j].season) {
            // 同一試験内で同問題本文 → ID重複の派生
            add(
              arr[i],
              "morning",
              "warning",
              "duplicate-body-same-exam",
              `本文が ${arr[j].id} と完全一致`,
            );
          } else {
            // 同問題の異年度出題 or 異試験の流用は警告のみ
            add(
              arr[i],
              "morning",
              "warning",
              "duplicate-body-cross",
              `本文が ${arr[j].id} と完全一致（異年度／異試験）`,
            );
          }
        }
      }
    }
  }
}

// ─── 実行 ─────────────────────────────────────────────────────────────────────

console.log("=== 問題データ統合監査 ===");
console.log(`午前 (Question): ${ALL_QUESTIONS.length.toLocaleString()} 件`);
console.log(`午後 (AfternoonQuestion / AP): ${AP_AFTERNOON_QUESTIONS.length.toLocaleString()} 件`);
console.log(`論述 (EssayQuestion): ${ALL_ESSAY_QUESTIONS.length.toLocaleString()} 件`);
console.log(
  `総計: ${(ALL_QUESTIONS.length + AP_AFTERNOON_QUESTIONS.length + ALL_ESSAY_QUESTIONS.length).toLocaleString()} 件`,
);

const seenMorningIds = new Set<string>();
for (const q of ALL_QUESTIONS) auditMorningQuestion(q, seenMorningIds);

const seenAfternoonIds = new Set<string>();
for (const q of AP_AFTERNOON_QUESTIONS) auditAfternoonQuestion(q, seenAfternoonIds);

const seenEssayIds = new Set<string>();
for (const q of ALL_ESSAY_QUESTIONS) auditEssayQuestion(q, seenEssayIds);

detectDuplicateBodies(ALL_QUESTIONS);

// ─── 集計 ─────────────────────────────────────────────────────────────────────

const bySeverity: Record<Severity, number> = { critical: 0, opportunity: 0, warning: 0 };
const byCategory: Record<string, number> = {};
const bySource: Record<string, number> = { morning: 0, afternoon: 0, essay: 0 };
const byExam: Record<string, number> = {};

for (const f of findings) {
  bySeverity[f.severity]++;
  byCategory[f.category] = (byCategory[f.category] ?? 0) + 1;
  bySource[f.source]++;
  byExam[f.exam] = (byExam[f.exam] ?? 0) + 1;
}

console.log("\n=== 結果 ===");
console.log(`総検出数: ${findings.length.toLocaleString()}`);
console.log(`致命傷 (critical):   ${bySeverity.critical.toLocaleString()}`);
console.log(`機会損失 (opportunity): ${bySeverity.opportunity.toLocaleString()}`);
console.log(`警告 (warning):       ${bySeverity.warning.toLocaleString()}`);

console.log("\n=== カテゴリ別 ===");
for (const [cat, n] of Object.entries(byCategory).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${cat.padEnd(28)} ${n.toLocaleString()}`);
}

console.log("\n=== ソース別 ===");
for (const [src, n] of Object.entries(bySource)) {
  console.log(`  ${src.padEnd(12)} ${n.toLocaleString()}`);
}

console.log("\n=== 試験区分別 ===");
for (const [ex, n] of Object.entries(byExam).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${ex.padEnd(6)} ${n.toLocaleString()}`);
}

// ─── 出力 ─────────────────────────────────────────────────────────────────────

const LOGS_DIR = join(process.cwd(), "logs");
mkdirSync(LOGS_DIR, { recursive: true });

const jsonOut = {
  generatedAt: new Date().toISOString(),
  totals: {
    morning: ALL_QUESTIONS.length,
    afternoon: AP_AFTERNOON_QUESTIONS.length,
    essay: ALL_ESSAY_QUESTIONS.length,
  },
  summary: { bySeverity, byCategory, bySource, byExam, count: findings.length },
  findings,
};
writeFileSync(
  join(LOGS_DIR, "questions-audit-report.json"),
  JSON.stringify(jsonOut, null, 2),
  "utf8",
);

const textLines: string[] = [];
textLines.push("=== 問題データ統合監査レポート ===");
textLines.push(`生成日時: ${new Date().toISOString()}`);
textLines.push("");
textLines.push(`午前 (Question):              ${ALL_QUESTIONS.length}`);
textLines.push(`午後 (AfternoonQuestion AP): ${AP_AFTERNOON_QUESTIONS.length}`);
textLines.push(`論述 (EssayQuestion):         ${ALL_ESSAY_QUESTIONS.length}`);
textLines.push("");
textLines.push(`総検出数:           ${findings.length}`);
textLines.push(`致命傷 critical:    ${bySeverity.critical}`);
textLines.push(`機会損失 opportunity: ${bySeverity.opportunity}`);
textLines.push(`警告 warning:       ${bySeverity.warning}`);
textLines.push("");
textLines.push("--- カテゴリ別 ---");
for (const [cat, n] of Object.entries(byCategory).sort((a, b) => b[1] - a[1])) {
  textLines.push(`  ${cat}: ${n}`);
}
textLines.push("");
textLines.push("--- 致命傷 一覧 ---");
const criticals = findings.filter((f) => f.severity === "critical");
for (const f of criticals) {
  textLines.push(`  [${f.source}/${f.exam}] ${f.id} (${f.category}): ${f.message}`);
}
textLines.push("");
textLines.push(`--- 機会損失 一覧 (先頭200件) ---`);
const opps = findings.filter((f) => f.severity === "opportunity");
for (const f of opps.slice(0, 200)) {
  textLines.push(`  [${f.source}/${f.exam}] ${f.id} (${f.category}): ${f.message}`);
}
if (opps.length > 200) textLines.push(`  ... 残り ${opps.length - 200} 件は JSON 参照`);
textLines.push("");
textLines.push(`--- 警告 一覧 (先頭200件) ---`);
const warns = findings.filter((f) => f.severity === "warning");
for (const f of warns.slice(0, 200)) {
  textLines.push(`  [${f.source}/${f.exam}] ${f.id} (${f.category}): ${f.message}`);
}
if (warns.length > 200) textLines.push(`  ... 残り ${warns.length - 200} 件は JSON 参照`);

writeFileSync(join(LOGS_DIR, "questions-audit-report.txt"), textLines.join("\n"), "utf8");

console.log(`\n✅ レポート出力:`);
console.log(`  logs/questions-audit-report.txt`);
console.log(`  logs/questions-audit-report.json`);

// 致命傷ゼロでない場合は exit 1（CIゲート用）
if (process.argv.includes("--ci")) {
  if (bySeverity.critical > 0) {
    console.error(`\n❌ 致命傷 ${bySeverity.critical} 件あり。CI gate 失敗。`);
    process.exit(1);
  }
}
