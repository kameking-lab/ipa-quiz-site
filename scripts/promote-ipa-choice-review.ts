import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { AP_QUESTIONS } from "@/data/questions/ap";
import { FE_QUESTIONS } from "@/data/questions/fe";
import { IP_QUESTIONS } from "@/data/questions/ip";
import { SG_QUESTIONS } from "@/data/questions/sg";
import type { Question } from "@/lib/questions/types";

const EXAMS = ["ap", "ip", "sg", "fe"] as const;
type TargetExam = (typeof EXAMS)[number];

interface ReviewDecision {
  status: "PASS" | "FIX";
  checks: {
    answerConsistent: boolean;
    everyChoiceSpecific: boolean;
    noTemplateReason: boolean;
    officialAnswerPreserved: boolean;
  };
  issues: string[];
}

function arg(name: string): string {
  const prefix = `--${name}=`;
  const value = process.argv.slice(2).find((item) => item.startsWith(prefix))?.slice(prefix.length);
  if (!value) throw new Error(`missing ${prefix}<value>`);
  return value;
}

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
    hasImage: question.hasImage,
    imageUrls: question.imageUrls,
    choiceImageUrls: question.choiceImageUrls,
    sourcePdfUrl: question.sourcePdfUrl,
    sourceAnswerUrl: question.sourceAnswerUrl,
    officialReferenceUrls: question.officialReferenceUrls,
  });
}

function overlayFingerprint(explanations: Record<string, string>): string {
  return sha256(
    Object.fromEntries(Object.entries(explanations).sort(([left], [right]) => left.localeCompare(right, "ja"))),
  );
}

function parseJson(path: string): unknown {
  let text = readFileSync(resolve(path), "utf8").replace(/^\uFEFF/, "").trim();
  if (text.startsWith("```")) text = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  return JSON.parse(text);
}

const exam = arg("exam") as TargetExam;
if (!EXAMS.includes(exam)) throw new Error(`unsupported exam: ${exam}`);
const batch = arg("batch");
const candidatePath = arg("candidate");
const reviewPath = arg("review");
const receiptPath = arg("receipt");
const reviewer = arg("reviewer");

const questionSets: Record<TargetExam, Question[]> = {
  ap: AP_QUESTIONS,
  ip: IP_QUESTIONS,
  sg: SG_QUESTIONS,
  fe: FE_QUESTIONS,
};
const questions = new Map(questionSets[exam].map((question) => [question.id, question]));
const candidates = parseJson(candidatePath) as Record<string, Record<string, string>>;
const decisions = parseJson(reviewPath) as Record<string, ReviewDecision>;
const overlayPath = resolve(`data/questions/${exam}/choice-explanations-2024-2025.json`);
const overlay = parseJson(overlayPath) as Record<string, Record<string, string>>;

const receiptQuestions = [];
let promoted = 0;
for (const [id, explanations] of Object.entries(candidates)) {
  const question = questions.get(id);
  if (!question || question.exam !== exam || !question.choices) throw new Error(`unknown question: ${id}`);
  const decision = decisions[id];
  if (!decision) throw new Error(`missing review decision: ${id}`);
  const choiceKeys = Object.keys(question.choices).sort();
  const explanationKeys = Object.keys(explanations).sort();
  if (choiceKeys.join(",") !== explanationKeys.join(",")) throw new Error(`choice keys differ: ${id}`);
  if (Object.values(explanations).some((reason) => typeof reason !== "string" || reason.trim().length < 40)) {
    throw new Error(`short or invalid reason: ${id}`);
  }

  const allChecksPass = Object.values(decision.checks ?? {}).every(Boolean);
  if (decision.status === "PASS") {
    if (!allChecksPass || decision.issues.length > 0) throw new Error(`contradictory PASS review: ${id}`);
    const existing = overlay[id];
    if (existing && overlayFingerprint(existing) !== overlayFingerprint(explanations)) {
      throw new Error(`refusing to replace different accepted overlay: ${id}`);
    }
    overlay[id] = explanations;
    promoted++;
  }
  receiptQuestions.push({
    id,
    status: decision.status,
    sourceSha256: sourceFingerprint(question),
    overlaySha256: overlayFingerprint(explanations),
    checks: decision.checks,
    issues: decision.issues,
  });
}

const orderedOverlay = Object.fromEntries(Object.entries(overlay).sort(([left], [right]) => left.localeCompare(right)));
writeFileSync(overlayPath, `${JSON.stringify(orderedOverlay, null, 2)}\n`);

const absoluteReceipt = resolve(receiptPath);
mkdirSync(dirname(absoluteReceipt), { recursive: true });
writeFileSync(
  absoluteReceipt,
  `${JSON.stringify({
    schemaVersion: 1,
    reviewer,
    reviewedAt: new Date().toISOString(),
    batch,
    questions: receiptQuestions,
  }, null, 2)}\n`,
);
console.log(JSON.stringify({ exam, reviewed: receiptQuestions.length, promoted, receipt: absoluteReceipt }, null, 2));
