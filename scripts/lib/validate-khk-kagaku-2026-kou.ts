import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Question } from "@/lib/questions/types";
import questions from "@/data/qualification-staging/khk-kagaku/2026-kou/questions.json";
import references from "@/data/qualification-staging/khk-kagaku/2026-kou/shared-question-references.json";
import lpgQuestions from "@/data/qualification-staging/khk-kagaku/2026-hei-lpg/questions.json";
import manifest from "@/data/qualification-staging/khk-kagaku/2026-kou/manifest.json";
import answerKeys from "@/data/qualification-staging/khk-kagaku/2026-kou/official-answer-keys.json";
import sources from "@/data/qualification-staging/khk-kagaku/2026-kou/sources.json";
import review from "@/data/qualification-staging/khk-kagaku/2026-kou/review.json";

const root = resolve(process.cwd(), "data/qualification-staging/khk-kagaku/2026-kou");
const choices = ["ア", "イ", "ウ", "エ", "オ"];

/** Validation-only access. Do not import from a serving registry. */
export const KHK_2026_KOU_STAGING: Question[] = [
  ...questions as Question[],
  ...references.map(ref => {
    const original = (lpgQuestions as Question[]).find(q => q.id === ref.existingQuestionId);
    if (!original) throw new Error(`${ref.id}: missing existing question ${ref.existingQuestionId}`);
    return { ...original, ...ref.occurrence } as Question;
  }),
].sort((a, b) => a.session!.localeCompare(b.session!) || a.qNumber - b.qNumber);

function sourceDigest(q: Question): string {
  return createHash("sha256").update(JSON.stringify([
    q.id, q.session, q.qNumber, q.questionNotice ?? null,
    q.originalContent, q.choices, q.answer, q.officialAnswerNumber,
    q.sourcePdfUrl, q.sourceAnswerUrl,
  ])).digest("hex");
}

export function validateKhk2026KouStaging(): string[] {
  const errors: string[] = [];
  const check = (ok: boolean, message: string) => { if (!ok) errors.push(message); };
  check(manifest.publicAllowed === false, "manifest must remain private");
  check(manifest.questionCount === 35 && manifest.storedUniqueQuestionCount === questions.length && manifest.reusedQuestionCount === references.length, "manifest counts differ");
  check(questions.length === 34 && references.length === 1, "expected 34 stored bodies and one existing-ID reference");
  check(KHK_2026_KOU_STAGING.length === 35 && new Set(KHK_2026_KOU_STAGING.map(q => q.id)).size === 35, "expected 35 unique occurrence IDs");
  const canonical = (q: Question) => JSON.stringify([q.originalContent, q.choices]).normalize("NFKC").replace(/\s+/g, "");
  const existingContent = new Set((lpgQuestions as Question[]).map(canonical));
  check((questions as Question[]).every(q => !existingContent.has(canonical(q))), "duplicate LPG question stored instead of referenced");
  check(new Set((questions as Question[]).map(canonical)).size === questions.length, "duplicate body within kou corpus");
  for (const ref of references) {
    check(ref.id === ref.occurrence.id && !questions.some(q => q.id === ref.id), `${ref.id}: reference also stored as a new body`);
    check(ref.existingQuestionsPath === "../2026-hei-lpg/questions.json", `${ref.id}: incorrect reference path`);
    const original = lpgQuestions.find(q => q.id === ref.existingQuestionId);
    check(original !== undefined && original.answer === ref.occurrence.answer && original.officialAnswerNumber === ref.occurrence.officialAnswerNumber, `${ref.id}: reused answer differs`);
  }
  check(review.questions.length === 35 && review.assets.length === 3, "incomplete source review");
  for (const code of ["AX", "AY"] as const) {
    const count = code === "AX" ? 20 : 15;
    const paper = KHK_2026_KOU_STAGING.filter(q => q.session === `khk-${code.toLowerCase()}`);
    check(paper.length === count && paper.every((q, i) => q.qNumber === i + 1), `${code}: invalid question sequence`);
    for (const q of paper) {
      const id = q.id;
      check(id === `khk-kagaku-2026-annual-${code.toLowerCase()}-q${q.qNumber}`, `${id}: invalid ID`);
      check(q.exam === "khk-kagaku" && q.year === 2026 && q.season === "annual" && q.publicAllowed === false, `${id}: invalid scope or publication state`);
      check(q.answer === choices[answerKeys[code][q.qNumber - 1] - 1] && Number(q.officialAnswerNumber) === answerKeys[code][q.qNumber - 1], `${id}: differs from official answer`);
      check(Object.keys(q.choices!).join() === choices.join() && Object.keys(q.choiceExplanations!).join() === choices.join(), `${id}: expected five choices and explanations`);
      check(JSON.stringify(q.choices) === JSON.stringify(q.originalContent!.choices) && q.question.includes(q.originalContent!.body), `${id}: incomplete original content`);
      check(q.explanationCoverage === "full" && Object.values(q.choiceExplanations!).every(x => x!.length >= 30), `${id}: incomplete rationale`);
      check(q.sourcePdfUrl!.endsWith(`/R8${code}.pdf`) && q.sourceAnswerUrl!.endsWith("/R8fy_kaitou.pdf"), `${id}: wrong source`);
      check(sources.sources.some(x => x.url === q.sourcePdfUrl && /^[a-f0-9]{64}$/.test(x.sha256)), `${id}: missing source receipt`);
      const record = review.questions.find(x => x.id === id);
      check(record?.sourceContentSha256 === sourceDigest(q as Question), `${id}: source changed since review`);
      check(record?.explanationReviewed === !q.needsReview, `${id}: review status differs`);
      const shared = code === "AX" && q.qNumber >= 8;
      const image = shared || (code === "AX" && q.qNumber === 6);
      check(q.originalContent!.sharedPassages!.length === (shared ? 1 : 0), `${id}: missing case`);
      check(q.hasImage === image && q.imageUrls!.length === (image ? 1 : 0) && q.imageAltTexts!.length === q.imageUrls!.length, `${id}: missing source image`);
      if (code === "AX") check(q.lawReferenceDate === "2026-04-01", `${id}: wrong law reference date`);
    }
  }
  check(JSON.stringify(KHK_2026_KOU_STAGING.filter(q => q.needsReview).map(q => q.id)) === JSON.stringify(manifest.technicalReviewPendingIds), "pending review IDs differ");
  for (const asset of review.assets) {
    const png = readFileSync(resolve(root, asset.file));
    check(png.subarray(0, 8).toString("hex") === "89504e470d0a1a0a", `${asset.file}: invalid PNG`);
    check(createHash("sha256").update(png).digest("hex") === asset.sha256, `${asset.file}: original crop changed`);
    check(sources.sources.some(x => x.url === asset.sourcePdfUrl && x.sha256 === asset.sourceSha256), `${asset.file}: source receipt differs`);
  }
  return errors;
}
