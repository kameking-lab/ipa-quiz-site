import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Question } from "@/lib/questions/types";
import questions from "@/data/qualification-staging/khk-kagaku/2026-hei-lpg/questions.json";
import manifest from "@/data/qualification-staging/khk-kagaku/2026-hei-lpg/manifest.json";
import answerKeys from "@/data/qualification-staging/khk-kagaku/2026-hei-lpg/official-answer-keys.json";
import review from "@/data/qualification-staging/khk-kagaku/2026-hei-lpg/review.json";

const root = resolve(process.cwd(), "data/qualification-staging/khk-kagaku/2026-hei-lpg");
const choices = ["ア", "イ", "ウ", "エ", "オ"];

/** Validation-only access: never import this corpus from a serving registry. */
export const KHK_2026_HEI_LPG_STAGING = questions as Question[];

export function khk2026SourceContentDigest(q: Question): string {
  return createHash("sha256").update(JSON.stringify([
    q.id, q.session, q.qNumber, q.questionNotice ?? null,
    q.originalContent, q.choices, q.answer, q.officialAnswerNumber,
    q.sourcePdfUrl, q.sourceAnswerUrl,
  ])).digest("hex");
}

export function validateKhk2026HeiLpgStaging(): string[] {
  const errors: string[] = [];
  const check = (ok: boolean, message: string) => { if (!ok) errors.push(message); };
  check(manifest.publicAllowed === false, "manifest must remain private");
  check(questions.length === 60 && new Set(questions.map(q => q.id)).size === 60, "expected 60 unique originals");
  for (const code of ["CX", "CY", "CZ"] as const) {
    const paper = questions.filter(q => q.session === `khk-${code.toLowerCase()}`);
    check(paper.length === 20 && paper.every((q, i) => q.qNumber === i + 1), `${code}: expected questions 1–20`);
    for (const q of paper) {
      const id = q.id;
      check(id === `khk-kagaku-2026-annual-${code.toLowerCase()}-q${q.qNumber}`, `${id}: invalid ID`);
      check(q.year === 2026 && q.season === "annual" && q.exam === "khk-kagaku" && q.publicAllowed === false, `${id}: invalid scope or publication state`);
      check(q.answer === choices[answerKeys[code][q.qNumber - 1] - 1] && Number(q.officialAnswerNumber) === answerKeys[code][q.qNumber - 1], `${id}: differs from official answer`);
      check(Object.keys(q.choices).join() === choices.join() && Object.keys(q.choiceExplanations).join() === choices.join(), `${id}: expected five choices and explanations`);
      check(JSON.stringify(q.choices) === JSON.stringify(q.originalContent.choices), `${id}: original choices differ`);
      check(q.question.includes(q.originalContent.body), `${id}: original body missing`);
      check(q.sourcePdfUrl.endsWith(`/R8${code}.pdf`) && q.sourceAnswerUrl.endsWith("/R8fy_kaitou.pdf"), `${id}: incorrect official source`);
      check(q.explanationCoverage === "full" && Object.values(q.choiceExplanations).every(x => x.length >= 30), `${id}: missing rationale`);
      const record = review.questions.find(x => x.id === id);
      check(record?.sourceContentSha256 === khk2026SourceContentDigest(q as Question), `${id}: source content changed since review`);
      const table = code === "CX" && q.qNumber >= 8;
      check(q.hasImage === table && q.imageUrls.length === (table ? 1 : 0) && q.imageAltTexts.length === q.imageUrls.length, `${id}: missing source table`);
      check(q.originalContent.sharedPassages.length === (table ? 1 : 0), `${id}: missing shared case`);
      if (code === "CX") check(q.lawReferenceDate === "2026-04-01", `${id}: wrong law reference date`);
    }
  }
  check(questions.filter(q => q.isCalculation).map(q => q.qNumber).join() === "2,4,8,10,15", "calculation coverage changed");
  check(JSON.stringify(questions.filter(q => q.needsReview).map(q => q.id)) === JSON.stringify(manifest.technicalReviewPendingIds), "technical review status differs");
  for (const asset of review.assets) {
    const png = readFileSync(resolve(root, asset.file));
    check(png.subarray(0, 8).toString("hex") === "89504e470d0a1a0a", `${asset.file}: invalid PNG`);
    check(createHash("sha256").update(png).digest("hex") === asset.sha256, `${asset.file}: original crop changed`);
  }
  return errors;
}
