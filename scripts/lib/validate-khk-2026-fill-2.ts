import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Question } from "@/lib/questions/types";

type Kind = "kikai-otsu" | "reito-first";
type Reference = {
  id: string;
  existingQuestionId: string;
  existingQuestionsPath: string;
  sharedPassages: NonNullable<Question["originalContent"]>["sharedPassages"];
  occurrence: Partial<Question>;
};
type Manifest = {
  examCode: string; status: string; publicAllowed: boolean;
  targetQuestionCount: number; questionCount: number; storedUniqueQuestionCount: number;
  reusedQuestionCount: number; reviewedQuestionCount: number;
};
type Sources = {
  sources: { url: string; sha256: string; pages: number }[];
  laws: { lawReferenceDate: string; lawRevisionId: string; responseSha256: string; url: string }[];
};
type Review = {
  questions: { id: string; sourceContentSha256: string; transcriptionVerified: boolean; officialAnswerVerified: boolean; explanationReviewed: boolean }[];
  assets: { file: string; sha256: string; sourcePdfUrl: string; sourceSha256: string; pdfPage: number; futureImageUrl: string; visualVerified: boolean }[];
};
const configs = {
  "kikai-otsu": { path: "khk-kikai/2026-otsu", exam: "khk-kikai-otsu", codes: { FX: "hoki", FY: "hoan", FZ: "gakushiki" }, count: 50, stored: 16, refs: 34, assets: 9 },
  "reito-first": { path: "khk-reito/2026-first", exam: "khk-reito-1", codes: { GX: "houki", GY: "hoan" }, count: 35, stored: 35, refs: 0, assets: 2 },
} as const;
const readJson = <T>(path: string): T => JSON.parse(readFileSync(path, "utf8")) as T;
const base = (kind: Kind) => resolve("data/qualification-staging", configs[kind].path);
const choiceKeys = ["ア", "イ", "ウ", "エ", "オ"];
const canonical = (q: Question) => JSON.stringify([q.originalContent!.body, q.choices]).normalize("NFKC").replace(/\s+/g, "");

/** Filesystem-backed resolution for validation only; never import in serving code. */
function readBundle(kind: Kind) {
  const root = base(kind);
  const stored = readJson<Question[]>(resolve(root, "questions.json"));
  const refs = readJson<Reference[]>(resolve(root, "shared-question-references.json"));
  const questions = [...stored, ...refs.map(ref => {
    const source = readJson<Question[]>(resolve(root, ref.existingQuestionsPath)).find(q => q.id === ref.existingQuestionId);
    if (!source?.originalContent) throw new Error(`${ref.id}: missing reference source`);
    const q = { ...source, ...ref.occurrence } as Question;
    q.originalContent = { ...source.originalContent, sharedPassages: ref.sharedPassages };
    q.question = [q.questionNotice, ...ref.sharedPassages!.map(p => p.text), q.originalContent.body].filter(Boolean).join("\n\n");
    return q;
  })].sort((a, b) => a.session!.localeCompare(b.session!) || a.qNumber - b.qNumber);
  return { stored, refs, questions,
    manifest: readJson<Manifest>(resolve(root, "manifest.json")),
    keys: readJson<Record<string, number[]>>(resolve(root, "official-answer-keys.json")),
    sources: readJson<Sources>(resolve(root, "sources.json")),
    review: readJson<Review>(resolve(root, "review.json")),
  };
}
export const KHK_2026_KIKAI_OTSU_STAGING = readBundle("kikai-otsu").questions;
export const KHK_2026_REITO_FIRST_STAGING = readBundle("reito-first").questions;

function sourceDigest(q: Question): string {
  return createHash("sha256").update(JSON.stringify([
    q.id, q.session, q.qNumber, q.questionNotice ?? null, q.originalContent,
    q.choices, q.answer, q.officialAnswerNumber, q.sourcePdfUrl, q.sourceAnswerUrl,
  ])).digest("hex");
}

export function validateKhk2026Fill2(kind: Kind, corpus?: Question[]): string[] {
  const cfg = configs[kind];
  const { stored, refs, questions, manifest, keys, sources, review } = readBundle(kind);
  const paper = corpus ?? questions;
  const errors: string[] = [];
  const check = (ok: boolean, message: string) => { if (!ok) errors.push(message); };
  check(manifest.publicAllowed === false && manifest.status === "reviewed-private", "manifest must remain reviewed and private");
  check(paper.length === cfg.count && new Set(paper.map(q => q.id)).size === cfg.count, "occurrence count or unique IDs differ");
  check(stored.length === cfg.stored && refs.length === cfg.refs, "stored/reference count differs");
  check(manifest.examCode === cfg.exam && manifest.targetQuestionCount === cfg.count && manifest.questionCount === cfg.count && manifest.storedUniqueQuestionCount === cfg.stored && manifest.reusedQuestionCount === cfg.refs && manifest.reviewedQuestionCount === cfg.count, "manifest scope/counts differ");
  check(review.questions.length === cfg.count && review.assets.length === cfg.assets, "review inventory incomplete");
  const old = ["khk-kagaku/2026-hei-lpg", "khk-kagaku/2026-hei-special", "khk-kagaku/2026-kou", "khk-kagaku/2026-otsu", "khk-kikai/2026-kou"].flatMap(p => readJson<Question[]>(resolve("data/qualification-staging", p, "questions.json")));
  const oldBodies = new Set(old.map(canonical));
  check(stored.every(q => !oldBodies.has(canonical(q))) && new Set(stored.map(canonical)).size === stored.length, "duplicate body stored instead of referenced");
  for (const ref of refs) {
    const original = readJson<Question[]>(resolve(base(kind), ref.existingQuestionsPath)).find(q => q.id === ref.existingQuestionId);
    check(ref.id === ref.occurrence.id && !stored.some(q => q.id === ref.id), `${ref.id}: duplicate occurrence`);
    check(original !== undefined && original.answer === ref.occurrence.answer && String(original.officialAnswerNumber) === ref.occurrence.officialAnswerNumber, `${ref.id}: reused official answer differs`);
    check(!("question" in ref.occurrence) && !("choices" in ref.occurrence) && !("explanation" in ref.occurrence), `${ref.id}: reference duplicates body/explanation`);
  }
  check(Object.keys(keys).join() === Object.keys(cfg.codes).join(), "paper codes differ");
  for (const [code, session] of Object.entries(cfg.codes)) {
    const answers = keys[code];
    const expectedCount = code.endsWith("X") ? 20 : 15;
    const items = paper.filter(q => q.session === session);
    check(answers.length === expectedCount && items.length === expectedCount && new Set(items.map(q => q.qNumber)).size === expectedCount, `${code}: incomplete numbering`);
    for (const q of items) {
      const id = q.id; const n = q.qNumber;
      check(id === `${cfg.exam}-2026-annual-${session}-q${n}` && n >= 1 && n <= expectedCount, `${id}: incorrect ID or number`);
      check(q.exam === cfg.exam && q.year === 2026 && q.season === "annual" && q.type === "multiple-choice" && q.publicAllowed === false, `${id}: scope/publication state differs`);
      check(q.answer === choiceKeys[answers[n - 1] - 1] && Number(q.officialAnswerNumber) === answers[n - 1], `${id}: official answer differs`);
      check(Object.keys(q.choices!).join() === choiceKeys.join() && Object.keys(q.choiceExplanations!).join() === choiceKeys.join(), `${id}: choices or explanations missing`);
      check(q.explanationCoverage === "full" && !q.needsReview && Object.values(q.choiceExplanations!).every(x => x!.length >= 30), `${id}: incomplete explanation review`);
      check(JSON.stringify(q.choices) === JSON.stringify(q.originalContent!.choices) && q.question.includes(q.originalContent!.body), `${id}: original differs`);
      check(!/[\uE000-\uF8FF]/.test(q.question), `${id}: private-use glyph remains`);
      check(q.sourcePdfUrl!.endsWith(`/R8${code}.pdf`) && q.sourceAnswerUrl!.endsWith("/R8fy_kaitou.pdf"), `${id}: incorrect source URL`);
      check(sources.sources.some(s => s.url === q.sourcePdfUrl && /^[a-f0-9]{64}$/.test(s.sha256)), `${id}: source receipt missing`);
      const record = review.questions.find(r => r.id === id);
      check(record?.sourceContentSha256 === sourceDigest(q) && record.transcriptionVerified && record.officialAnswerVerified && record.explanationReviewed, `${id}: source review differs`);
      const shared = code === "FX" ? n >= 8 : code === "GX" && n >= 9;
      check(q.originalContent!.sharedPassages!.length === (shared ? 1 : 0), `${id}: shared case missing`);
      if (shared) {
        const text = q.originalContent!.sharedPassages![0].text;
        const value = code === "FX" ? n <= 12 ? "100,000,000" : "350,000" : n <= 13 ? "250トン" : "600トン";
        check(text.includes(value) && q.question.includes(text), `${id}: incorrect shared case`);
      }
      if (code.endsWith("X")) check(q.lawReferenceDate === "2026-04-01", `${id}: incorrect law reference date`);
      check(q.hasImage === !!q.imageUrls!.length && q.imageUrls!.length === q.imageAltTexts!.length, `${id}: image metadata differs`);
      for (const url of q.imageUrls!) check(review.assets.some(a => a.futureImageUrl === url), `${id}: image receipt missing`);
    }
  }
  if (kind === "reito-first") check(sources.laws.some(l => l.lawRevisionId === "341M50000400051_20250418_507M60000400042" && l.lawReferenceDate === "2026-04-01"), "refrigeration regulation exam-date revision missing");
  for (const asset of review.assets) {
    const bytes = readFileSync(resolve(base(kind), asset.file));
    check(bytes.subarray(0, 8).toString("hex") === "89504e470d0a1a0a" && createHash("sha256").update(bytes).digest("hex") === asset.sha256 && asset.visualVerified, `${asset.file}: source crop differs`);
    check(sources.sources.some(s => s.url === asset.sourcePdfUrl && s.pages >= asset.pdfPage && s.sha256 === asset.sourceSha256), `${asset.file}: source receipt missing`);
  }
  return errors;
}
