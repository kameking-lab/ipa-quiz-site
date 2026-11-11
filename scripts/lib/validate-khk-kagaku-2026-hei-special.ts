import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Question } from "@/lib/questions/types";
import questions from "@/data/qualification-staging/khk-kagaku/2026-hei-special/questions.json";
import references from "@/data/qualification-staging/khk-kagaku/2026-hei-special/shared-question-references.json";
import lpgQuestions from "@/data/qualification-staging/khk-kagaku/2026-hei-lpg/questions.json";
import manifest from "@/data/qualification-staging/khk-kagaku/2026-hei-special/manifest.json";
import answerKeys from "@/data/qualification-staging/khk-kagaku/2026-hei-special/official-answer-keys.json";
import review from "@/data/qualification-staging/khk-kagaku/2026-hei-special/review.json";
import { khk2026SourceContentDigest } from "./validate-khk-kagaku-2026-hei-lpg";

const choices = ["ア", "イ", "ウ", "エ", "オ"];
const root = resolve(process.cwd(), "data/qualification-staging/khk-kagaku/2026-hei-special");
const canonical = (q: Question) => JSON.stringify([q.originalContent, q.choices]).normalize("NFKC").replace(/\s+/g, "");

/** Resolve references only for validation; this module must not enter serving registries. */
export const KHK_2026_HEI_SPECIAL_STAGING: Question[] = [
  ...questions as Question[],
  ...references.map(ref => {
    const original = (lpgQuestions as Question[]).find(q => q.id === ref.existingQuestionId);
    if (!original) throw new Error(`${ref.id}: missing existing question ${ref.existingQuestionId}`);
    return { ...original, ...ref.occurrence } as Question;
  }),
].sort((a, b) => a.session!.localeCompare(b.session!) || a.qNumber - b.qNumber);

export function validateKhk2026HeiSpecialStaging(): string[] {
  const errors: string[] = [];
  const check = (ok: boolean, message: string) => { if (!ok) errors.push(message); };
  check(manifest.publicAllowed === false, "manifest must remain private");
  check(manifest.questionCount === 60 && manifest.storedUniqueQuestionCount === questions.length && manifest.reusedQuestionCount === references.length, "manifest counts differ");
  check(questions.length === 56 && references.length === 4, "expected 56 unique bodies and four existing-ID references");
  check(new Set(KHK_2026_HEI_SPECIAL_STAGING.map(q => q.id)).size === 60, "expected 60 unique occurrence IDs");
  const existingContent = new Set((lpgQuestions as Question[]).map(canonical));
  check((questions as Question[]).every(q => !existingContent.has(canonical(q))), "duplicate LPG question stored instead of referenced");
  check(new Set((questions as Question[]).map(canonical)).size === questions.length, "duplicate body within new corpus");
  for (const ref of references) {
    check(ref.id === ref.occurrence.id && !questions.some(q => q.id === ref.id), `${ref.id}: reference also stored as a new body`);
    const original = lpgQuestions.find(q => q.id === ref.existingQuestionId)!;
    check(original.answer === ref.occurrence.answer && original.officialAnswerNumber === ref.occurrence.officialAnswerNumber, `${ref.id}: reused answer differs`);
  }
  for (const code of ["DX", "DY", "DZ"] as const) {
    const paper = KHK_2026_HEI_SPECIAL_STAGING.filter(q => q.session === `khk-${code.toLowerCase()}`);
    check(paper.length === 20 && paper.every((q, i) => q.qNumber === i + 1), `${code}: expected questions 1–20`);
    for (const q of paper) {
      const id = q.id;
      check(id === `khk-kagaku-2026-annual-${code.toLowerCase()}-q${q.qNumber}`, `${id}: invalid occurrence ID`);
      check(q.year === 2026 && q.season === "annual" && q.exam === "khk-kagaku" && q.publicAllowed === false, `${id}: invalid scope or publication state`);
      check(q.answer === choices[answerKeys[code][q.qNumber - 1] - 1] && Number(q.officialAnswerNumber) === answerKeys[code][q.qNumber - 1], `${id}: differs from official answer`);
      check(Object.keys(q.choices!).join() === choices.join() && Object.keys(q.choiceExplanations!).join() === choices.join(), `${id}: missing choices or explanations`);
      check(JSON.stringify(q.choices) === JSON.stringify(q.originalContent!.choices), `${id}: original choices differ`);
      check(q.question.includes(q.originalContent!.body), `${id}: original body missing`);
      check(q.sourcePdfUrl!.endsWith(`/R8${code}.pdf`) && q.sourceAnswerUrl!.endsWith("/R8fy_kaitou.pdf"), `${id}: wrong official source`);
      check(q.explanationCoverage === "full" && Object.values(q.choiceExplanations!).every(x => x!.length >= 30), `${id}: missing rationale`);
      const record = review.questions.find(x => x.id === id);
      check(record?.sourceContentSha256 === khk2026SourceContentDigest(q), `${id}: source content changed since review`);
      check(record?.transcriptionVerified === true && record.officialAnswerVerified === true && record.explanationReviewed === true, `${id}: incomplete review`);
      const shared = code === "DX" && q.qNumber >= 8;
      const table = shared || (code === "DZ" && q.qNumber === 7);
      check(q.hasImage === table && q.imageUrls!.length === (table ? 1 : 0) && q.imageAltTexts!.length === q.imageUrls!.length, `${id}: missing source table`);
      check(q.originalContent!.sharedPassages!.length === (shared ? 1 : 0), `${id}: missing shared case`);
      if (code === "DX") check(q.lawReferenceDate === "2026-04-01", `${id}: wrong law reference date`);
      if (code === "DZ") check(q.questionNotice!.includes("圧力は絶対圧力"), `${id}: wrong pressure convention`);
    }
  }
  check(KHK_2026_HEI_SPECIAL_STAGING.filter(q => q.isCalculation).map(q => q.qNumber).join() === "2,4,6,8,13,15", "calculation coverage changed");
  check(KHK_2026_HEI_SPECIAL_STAGING.every(q => q.needsReview === false) && manifest.technicalReviewPendingIds.length === 0, "technical review status differs");
  for (const asset of review.assets) {
    const png = readFileSync(resolve(root, asset.file));
    check(png.subarray(0, 8).toString("hex") === "89504e470d0a1a0a", `${asset.file}: invalid PNG`);
    check(createHash("sha256").update(png).digest("hex") === asset.sha256, `${asset.file}: crop changed`);
  }
  return errors;
}
