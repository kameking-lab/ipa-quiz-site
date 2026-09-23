import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

import { AP_QUESTIONS } from "@/data/questions/ap";
import apOverlayJson from "@/data/questions/ap/choice-explanations-2024-2025.json";
import { FE_QUESTIONS } from "@/data/questions/fe";
import feOverlayJson from "@/data/questions/fe/choice-explanations-2024-2025.json";
import { IP_QUESTIONS } from "@/data/questions/ip";
import ipOverlayJson from "@/data/questions/ip/choice-explanations-2024-2025.json";
import { SG_QUESTIONS } from "@/data/questions/sg";
import sgOverlayJson from "@/data/questions/sg/choice-explanations-2024-2025.json";
import type { ChoiceKey, Question } from "@/lib/questions/types";

const EXAMS = ["ap", "ip", "sg", "fe"] as const;
type TargetExam = (typeof EXAMS)[number];
type Overlay = Record<string, Record<string, string>>;

interface ReceiptItem {
  id: string;
  status: "PASS" | "FIX";
  sourceSha256: string;
  overlaySha256: string;
  checks: {
    answerConsistent: boolean;
    everyChoiceSpecific: boolean;
    noTemplateReason: boolean;
    officialAnswerPreserved: boolean;
  };
  issues: string[];
}

interface ReviewReceipt {
  schemaVersion: 1;
  reviewer: string;
  reviewedAt: string;
  batch: string;
  questions: ReceiptItem[];
}

const overlays: Record<TargetExam, Overlay> = {
  ap: apOverlayJson as Overlay,
  ip: ipOverlayJson as Overlay,
  sg: sgOverlayJson as Overlay,
  fe: feOverlayJson as Overlay,
};

const questionsByExam: Record<TargetExam, Question[]> = {
  ap: AP_QUESTIONS,
  ip: IP_QUESTIONS,
  sg: SG_QUESTIONS,
  fe: FE_QUESTIONS,
};

const targetQuestions = Object.fromEntries(
  EXAMS.map((exam) => [
    exam,
    questionsByExam[exam].filter(
      (question) =>
        (question.year === 2024 || question.year === 2025) &&
        question.type === "multiple-choice" &&
        question.choices,
    ),
  ]),
) as Record<TargetExam, Question[]>;

function sha256(value: unknown): string {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function sourceFingerprint(question: Question): string {
  return sha256({
    id: question.id,
    exam: question.exam,
    year: question.year,
    season: question.season,
    session: question.session,
    qNumber: question.qNumber,
    question: question.question,
    choices: question.choices,
    answer: question.answer,
    explanation: question.explanation,
    sourcePdfUrl: question.sourcePdfUrl,
    sourceAnswerUrl: question.sourceAnswerUrl,
  });
}

function overlayFingerprint(explanations: Record<string, string>): string {
  return sha256(
    Object.fromEntries(Object.entries(explanations).sort(([left], [right]) => left.localeCompare(right, "ja"))),
  );
}

function walkJson(directory: string): string[] {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return walkJson(path);
    return entry.isFile() && entry.name.endsWith(".json") ? [path] : [];
  });
}

function loadReceipts(): Map<string, ReceiptItem> {
  const receiptDir = resolve("docs/evidence/ipa-choice-explanations/reviews");
  const result = new Map<string, ReceiptItem>();
  for (const path of walkJson(receiptDir)) {
    const receipt = JSON.parse(readFileSync(path, "utf8")) as Partial<ReviewReceipt>;
    if (receipt.schemaVersion !== 1 || !Array.isArray(receipt.questions)) continue;
    for (const item of receipt.questions) {
      if (item && typeof item.id === "string") result.set(item.id, item);
    }
  }
  return result;
}

function significantTokens(value: string): string[] {
  const ignored = new Set([
    "ため", "もの", "こと", "場合", "選択肢", "設問", "記述", "正しい", "誤り", "適切", "不適切",
  ]);
  return [...value.matchAll(/[A-Za-z][A-Za-z0-9+./_-]{2,}|[一-龯々ァ-ヴー]{2,}|\d+(?:\.\d+)?/g)]
    .map((match) => match[0])
    .filter((token) => token.length >= 2 && !ignored.has(token));
}

function validateReason(
  question: Question,
  key: string,
  reason: string,
  answerKeys: Set<string>,
): string[] {
  const issues: string[] = [];
  const trimmed = reason.trim();
  const isCorrect = answerKeys.has(key);
  if (trimmed.length < 40) issues.push(`${key}: 40文字未満 (${trimmed.length})`);
  if (/^(?:この)?選択肢[アイウエオカキクケコ]?(?:は|が)?(?:正しい|誤り|正解|不正解)(?:です|である)?[。．]?$/u.test(trimmed)) {
    issues.push(`${key}: 結論だけで固有理由がない`);
  }
  const correctVerdict = /正しい|適切|正解|該当する|成立する|満たす/u.test(trimmed);
  const wrongVerdict = /誤り|不適切|不正解|該当しない|異なる|成立しない|満たさない|ではない|含まれない/u.test(trimmed);
  if (isCorrect && !correctVerdict) issues.push(`${key}: 正答であることを明示していない`);
  if (!isCorrect && !wrongVerdict) issues.push(`${key}: 誤答であることを明示していない`);

  const choice = question.choices?.[key as ChoiceKey] ?? "";
  const tokens = significantTokens(choice);
  if (choice.length >= 8 && tokens.length > 0 && !tokens.some((token) => trimmed.includes(token))) {
    issues.push(`${key}: 選択肢固有の語を含まず、汎用文の疑い`);
  }
  return issues;
}

function parseArg(name: string): string | undefined {
  const prefix = `--${name}=`;
  return process.argv.slice(2).find((arg) => arg.startsWith(prefix))?.slice(prefix.length);
}

const examArg = parseArg("exam");
const selectedExams = examArg
  ? examArg.split(",").filter((exam): exam is TargetExam => EXAMS.includes(exam as TargetExam))
  : [...EXAMS];
if (selectedExams.length === 0) throw new Error(`unknown --exam=${examArg}`);

const dumpPath = parseArg("dump");
if (dumpPath) {
  const limit = Number.parseInt(parseArg("limit") ?? "5", 10);
  const offset = Number.parseInt(parseArg("offset") ?? "0", 10);
  const requestedIds = new Set((parseArg("ids") ?? "").split(",").filter(Boolean));
  const selected = selectedExams.flatMap((exam) =>
    targetQuestions[exam].filter((question) => {
      if (requestedIds.size > 0) return requestedIds.has(question.id);
      return !overlays[exam][question.id];
    }),
  ).slice(offset, offset + limit);
  const payload = selected.map((question) => ({
    sourceSha256: sourceFingerprint(question),
    id: question.id,
    exam: question.exam,
    year: question.year,
    season: question.season,
    session: question.session,
    qNumber: question.qNumber,
    question: question.question,
    choices: question.choices,
    officialAnswer: question.answer,
    existingExplanation: question.explanation,
    sourcePdfUrl: question.sourcePdfUrl,
    sourceAnswerUrl: question.sourceAnswerUrl,
  }));
  const absolute = resolve(dumpPath);
  mkdirSync(dirname(absolute), { recursive: true });
  writeFileSync(absolute, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(`dumped ${payload.length} questions to ${absolute}`);
  process.exit(0);
}

const receipts = loadReceipts();
const complete = process.argv.includes("--complete");
const issues: string[] = [];
const duplicateReasons = new Map<string, string[]>();
const summary: Record<string, { target: number; choices: number; covered: number; accepted: number }> = {};

for (const exam of selectedExams) {
  const questions = targetQuestions[exam];
  const knownIds = new Set(questions.map((question) => question.id));
  for (const id of Object.keys(overlays[exam])) {
    if (!knownIds.has(id)) issues.push(`${exam}/${id}: 対象外または孤児ID`);
  }

  let covered = 0;
  let accepted = 0;
  for (const question of questions) {
    const explanations = overlays[exam][question.id];
    if (!explanations) {
      if (complete) issues.push(`${question.id}: 全肢解説が未作成`);
      continue;
    }
    covered++;
    const choiceKeys = Object.keys(question.choices ?? {}).sort();
    const explanationKeys = Object.keys(explanations).sort();
    if (choiceKeys.join(",") !== explanationKeys.join(",")) {
      issues.push(`${question.id}: 選択肢と全肢解説のキーが不一致`);
      continue;
    }
    const answerKeys = new Set(Array.isArray(question.answer) ? question.answer : [question.answer]);
    if ([...answerKeys].some((answer) => !choiceKeys.includes(answer))) {
      issues.push(`${question.id}: 公式正答が選択肢に存在しない (${[...answerKeys].join(",")})`);
      continue;
    }
    for (const [key, reason] of Object.entries(explanations)) {
      if (typeof reason !== "string") {
        issues.push(`${question.id}/${key}: 解説が文字列でない`);
        continue;
      }
      issues.push(...validateReason(question, key, reason, answerKeys).map((issue) => `${question.id}/${issue}`));
      const normalized = reason.replace(/[\s。、，．「」『』（）()]/g, "");
      const ids = duplicateReasons.get(normalized) ?? [];
      ids.push(`${question.id}/${key}`);
      duplicateReasons.set(normalized, ids);
    }

    const receipt = receipts.get(question.id);
    if (!receipt) {
      issues.push(`${question.id}: 独立レビューreceiptがない`);
      continue;
    }
    const allChecksPass = Object.values(receipt.checks ?? {}).every(Boolean);
    if (
      receipt.status !== "PASS" ||
      receipt.issues.length > 0 ||
      !allChecksPass ||
      receipt.sourceSha256 !== sourceFingerprint(question) ||
      receipt.overlaySha256 !== overlayFingerprint(explanations)
    ) {
      issues.push(`${question.id}: receiptが現候補をPASS固定していない`);
      continue;
    }
    accepted++;
  }
  summary[exam] = {
    target: questions.length,
    choices: questions.reduce((sum, question) => sum + Object.keys(question.choices ?? {}).length, 0),
    covered,
    accepted,
  };
}

for (const [reason, ids] of duplicateReasons) {
  if (reason.length > 0 && ids.length > 1) issues.push(`同一解説の再利用: ${ids.join(", ")}`);
}

console.log(JSON.stringify({ summary, issueCount: issues.length }, null, 2));
if (issues.length > 0) {
  console.error(issues.slice(0, 100).join("\n"));
  if (issues.length > 100) console.error(`...ほか ${issues.length - 100} 件`);
  process.exitCode = 1;
}
