import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Question } from "@/lib/questions/types";
import lpg from "@/data/qualification-staging/khk-kagaku/2026-hei-lpg/questions.json";
import kou from "@/data/qualification-staging/khk-kagaku/2026-kou/questions.json";
import special from "@/data/qualification-staging/khk-kagaku/2026-hei-special/questions.json";
import otsuQuestions from "@/data/qualification-staging/khk-kagaku/2026-otsu/questions.json";
import otsuReferences from "@/data/qualification-staging/khk-kagaku/2026-otsu/shared-question-references.json";
import otsuManifest from "@/data/qualification-staging/khk-kagaku/2026-otsu/manifest.json";
import otsuKeys from "@/data/qualification-staging/khk-kagaku/2026-otsu/official-answer-keys.json";
import otsuSources from "@/data/qualification-staging/khk-kagaku/2026-otsu/sources.json";
import otsuReview from "@/data/qualification-staging/khk-kagaku/2026-otsu/review.json";
import kikaiQuestions from "@/data/qualification-staging/khk-kikai/2026-kou/questions.json";
import kikaiReferences from "@/data/qualification-staging/khk-kikai/2026-kou/shared-question-references.json";
import kikaiManifest from "@/data/qualification-staging/khk-kikai/2026-kou/manifest.json";
import kikaiKeys from "@/data/qualification-staging/khk-kikai/2026-kou/official-answer-keys.json";
import kikaiSources from "@/data/qualification-staging/khk-kikai/2026-kou/sources.json";
import kikaiReview from "@/data/qualification-staging/khk-kikai/2026-kou/review.json";

type Kind = "otsu" | "kikai-kou";
type Reference = {
  id: string;
  existingQuestionId: string;
  existingQuestionsPath: string;
  sharedPassages: NonNullable<Question["originalContent"]>["sharedPassages"];
  occurrence: Partial<Question>;
};
const existing = [...lpg, ...kou, ...special] as Question[];
const existingById = new Map(existing.map(q => [q.id, q]));
const choiceKeys = ["ア", "イ", "ウ", "エ", "オ"];
const canonical = (q: Question) => JSON.stringify([q.originalContent!.body, q.choices]).normalize("NFKC").replace(/\s+/g, "");

/** Validation-only resolution. Never import this module from a serving registry. */
function resolveOccurrences(stored: Question[], refs: Reference[]): Question[] {
  return [...stored, ...refs.map(ref => {
    const source = existingById.get(ref.existingQuestionId);
    if (!source?.originalContent) throw new Error(`${ref.id}: missing source ${ref.existingQuestionId}`);
    const q = { ...source, ...ref.occurrence } as Question;
    q.originalContent = { ...source.originalContent, sharedPassages: ref.sharedPassages };
    q.question = [q.questionNotice, ...ref.sharedPassages!.map(p => p.text), q.originalContent.body].filter(Boolean).join("\n\n");
    return q;
  })].sort((a, b) => a.session!.localeCompare(b.session!) || a.qNumber - b.qNumber);
}

export const KHK_2026_OTSU_STAGING = resolveOccurrences(otsuQuestions as Question[], otsuReferences as Reference[]);
export const KHK_2026_KIKAI_KOU_STAGING = resolveOccurrences(kikaiQuestions as Question[], kikaiReferences as Reference[]);

function sourceDigest(q: Question): string {
  return createHash("sha256").update(JSON.stringify([
    q.id, q.session, q.qNumber, q.questionNotice ?? null, q.originalContent,
    q.choices, q.answer, q.officialAnswerNumber, q.sourcePdfUrl, q.sourceAnswerUrl,
  ])).digest("hex");
}

export function validateKhk2026Fill(kind: Kind, corpus?: Question[]): string[] {
  const isOtsu = kind === "otsu";
  const path = isOtsu ? "khk-kagaku/2026-otsu" : "khk-kikai/2026-kou";
  const stored = (isOtsu ? otsuQuestions : kikaiQuestions) as Question[];
  const references = (isOtsu ? otsuReferences : kikaiReferences) as Reference[];
  const manifest = isOtsu ? otsuManifest : kikaiManifest;
  const review = isOtsu ? otsuReview : kikaiReview;
  const sources = isOtsu ? otsuSources : kikaiSources;
  const keys: Record<string, number[]> = isOtsu ? otsuKeys : kikaiKeys;
  const paper = corpus ?? (isOtsu ? KHK_2026_OTSU_STAGING : KHK_2026_KIKAI_KOU_STAGING);
  const errors: string[] = [];
  const check = (ok: boolean, message: string) => { if (!ok) errors.push(message); };
  check(manifest.publicAllowed === false && manifest.status === "reviewed-private", "manifest must remain reviewed and private");
  check(paper.length === (isOtsu ? 50 : 35) && new Set(paper.map(q => q.id)).size === paper.length, "occurrence count or unique IDs differ");
  check(stored.length === (isOtsu ? 35 : 1) && references.length === (isOtsu ? 15 : 34), "stored/reference count differs");
  check(manifest.questionCount === paper.length && manifest.storedUniqueQuestionCount === stored.length && manifest.reusedQuestionCount === references.length && manifest.reviewedQuestionCount === paper.length, "manifest counts differ");
  check(review.questions.length === paper.length && review.assets.length === (isOtsu ? 9 : 3), "review inventory incomplete");
  const oldBodies = new Set(existing.map(canonical));
  check(stored.every(q => !oldBodies.has(canonical(q))) && new Set(stored.map(canonical)).size === stored.length, "duplicate body stored instead of referenced");
  for (const ref of references) {
    const original = existingById.get(ref.existingQuestionId);
    check(ref.id === ref.occurrence.id && !stored.some(q => q.id === ref.id), `${ref.id}: duplicate occurrence`);
    const sourcePath = resolve("data/qualification-staging", path, ref.existingQuestionsPath);
    const saved = JSON.parse(readFileSync(sourcePath, "utf8")) as Question[];
    check(saved.some(q => q.id === ref.existingQuestionId), `${ref.id}: incorrect source path`);
    check(original !== undefined && original.answer === ref.occurrence.answer && String(original.officialAnswerNumber) === ref.occurrence.officialAnswerNumber, `${ref.id}: reused official answer differs`);
    check(!("question" in ref.occurrence) && !("choices" in ref.occurrence) && !("explanation" in ref.occurrence), `${ref.id}: body/explanation copied into reference`);
  }
  for (const [code, answers] of Object.entries(keys)) {
    const session = isOtsu ? `khk-${code.toLowerCase()}` : code === "EX" ? "hoki" : "hoan";
    const items = paper.filter(q => q.session === session);
    check(items.length === answers.length && new Set(items.map(q => q.qNumber)).size === answers.length, `${code}: incomplete numbering`);
    for (const q of items) {
      const id = q.id;
      const n = q.qNumber;
      check(id === `${manifest.examCode}-2026-annual-${isOtsu ? code.toLowerCase() : session}-q${n}` && n >= 1 && n <= answers.length, `${id}: incorrect ID or number`);
      check(q.exam === manifest.examCode && q.year === 2026 && q.season === "annual" && q.type === "multiple-choice" && q.publicAllowed === false, `${id}: scope/publication state differs`);
      check(q.answer === choiceKeys[answers[n - 1] - 1] && Number(q.officialAnswerNumber) === answers[n - 1], `${id}: official answer differs`);
      check(Object.keys(q.choices!).join() === choiceKeys.join() && Object.keys(q.choiceExplanations!).join() === choiceKeys.join(), `${id}: choices or explanations missing`);
      check(q.explanationCoverage === "full" && !q.needsReview && Object.values(q.choiceExplanations!).every(x => x!.length >= 30), `${id}: incomplete explanation review`);
      check(JSON.stringify(q.choices) === JSON.stringify(q.originalContent!.choices) && q.question.includes(q.originalContent!.body), `${id}: original differs`);
      check(q.sourcePdfUrl!.endsWith(`/R8${code}.pdf`) && q.sourceAnswerUrl!.endsWith("/R8fy_kaitou.pdf"), `${id}: incorrect source URL`);
      check(sources.sources.some(s => s.url === q.sourcePdfUrl && /^[a-f0-9]{64}$/.test(s.sha256)), `${id}: source receipt missing`);
      const record = review.questions.find(r => r.id === id);
      check(record?.sourceContentSha256 === sourceDigest(q) && record.transcriptionVerified && record.officialAnswerVerified && record.explanationReviewed, `${id}: source review differs`);
      const shared = code.endsWith("X") && n >= 8;
      check(q.originalContent!.sharedPassages!.length === (shared ? 1 : 0), `${id}: shared case missing`);
      if (shared) {
        const caseText = q.originalContent!.sharedPassages![0].text;
        check(caseText.includes(n <= 12 ? "100,000,000" : "350,000") && q.question.includes(caseText), `${id}: incorrect shared case`);
      }
      if (code.endsWith("X")) check(q.lawReferenceDate === "2026-04-01", `${id}: incorrect law reference date`);
      check(q.hasImage === !!q.imageUrls!.length && q.imageUrls!.length === q.imageAltTexts!.length, `${id}: image metadata differs`);
      for (const url of q.imageUrls!) check(review.assets.some(a => a.futureImageUrl === url), `${id}: image receipt missing`);
    }
  }
  for (const asset of review.assets) {
    const bytes = readFileSync(resolve("data/qualification-staging", path, asset.file));
    check(bytes.subarray(0, 8).toString("hex") === "89504e470d0a1a0a" && createHash("sha256").update(bytes).digest("hex") === asset.sha256, `${asset.file}: source crop differs`);
    check(sources.sources.some(s => s.url === asset.sourcePdfUrl && s.pages >= asset.pdfPage && s.sha256 === asset.sourceSha256), `${asset.file}: source receipt missing`);
  }
  return errors;
}
