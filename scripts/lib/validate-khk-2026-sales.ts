import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Question } from "@/lib/questions/types";

// These qualifications are not registered for public serving. Keep the extended
// exam code local to the editorial validator rather than changing public types.
export type SalesQuestion = Omit<Question, "exam"> & {
  exam: "khk-hanbai" | "khk-hanbai2";
  statementExplanations?: Record<string, string>;
};
type Kind = "first" | "second";
type Reference = { id: string; existingQuestionId: string; existingQuestionsPath: string; sharedPassages: []; occurrence: Partial<SalesQuestion> };
type Manifest = { examCode: string; status: string; publicAllowed: boolean; targetQuestionCount: number; questionCount: number; storedUniqueQuestionCount: number; reusedQuestionCount: number; reviewedQuestionCount: number; technicalReviewPendingIds: string[] };
type Sources = { sources: { url: string; sha256: string; pages: number }[]; laws: { lawReferenceDate: string; lawRevisionId: string; url: string; responseSha256: string }[] };
type Review = {
  questions: { id: string; sourceContentSha256: string; transcriptionVerified: boolean; officialAnswerVerified: boolean; explanationReviewed: boolean }[];
  assets: { file: string; sha256: string; sourcePdfUrl: string; sourceSha256: string; pdfPage: number; futureImageUrl: string; visualVerified: boolean }[];
};
const config = {
  first: { exam: "khk-hanbai", codes: { JX: "houki", JY: "gas-technology" }, stored: 40, refs: 0, assets: 0 },
  second: { exam: "khk-hanbai2", codes: { KX: "houki", KY: "gas-technology" }, stored: 39, refs: 1, assets: 1 },
} as const;
const keys = ["ア", "イ", "ウ", "エ", "オ"];
const root = (kind: Kind) => resolve("data/qualification-staging/khk-hanbai", `2026-${kind}`);
const read = <T>(path: string): T => JSON.parse(readFileSync(path, "utf8")) as T;
const hash = (s: string | Buffer) => createHash("sha256").update(s).digest("hex");
const canonical = (q: SalesQuestion) => JSON.stringify([q.originalContent!.body, q.choices]).normalize("NFKC").replace(/\s+/g, "");

/** Filesystem-backed editorial resolution only. Public loaders must not import. */
export function readKhk2026Sales(kind: Kind): SalesQuestion[] {
  const base = root(kind);
  const stored = read<SalesQuestion[]>(resolve(base, "questions.json"));
  const refs = read<Reference[]>(resolve(base, "shared-question-references.json"));
  return [...stored, ...refs.map(ref => {
    const source = read<SalesQuestion[]>(resolve(base, ref.existingQuestionsPath)).find(q => q.id === ref.existingQuestionId);
    if (!source?.originalContent) throw new Error(`${ref.id}: missing reference source`);
    const q = { ...source, ...ref.occurrence } as SalesQuestion;
    q.originalContent = { ...source.originalContent, sharedPassages: ref.sharedPassages };
    q.question = [q.questionNotice, q.originalContent.body].filter(Boolean).join("\n\n");
    return q;
  })].sort((a, b) => a.session.localeCompare(b.session) || a.qNumber - b.qNumber);
}

function sourceDigest(q: SalesQuestion): string {
  return hash(JSON.stringify([q.id, q.session, q.qNumber, q.questionNotice ?? null, q.originalContent,
    q.choices, q.answer, q.officialAnswerNumber, q.sourcePdfUrl, q.sourceAnswerUrl]));
}

export function validateKhk2026Sales(kind: Kind, corpus?: SalesQuestion[]): string[] {
  const cfg = config[kind]; const base = root(kind);
  const stored = read<SalesQuestion[]>(resolve(base, "questions.json"));
  const refs = read<Reference[]>(resolve(base, "shared-question-references.json"));
  const manifest = read<Manifest>(resolve(base, "manifest.json"));
  const sources = read<Sources>(resolve(base, "sources.json"));
  const review = read<Review>(resolve(base, "review.json"));
  const official = read<Record<string, number[]>>(resolve(base, "official-answer-keys.json"));
  const questions = corpus ?? readKhk2026Sales(kind);
  const errors: string[] = [];
  const check = (ok: boolean, message: string) => { if (!ok) errors.push(message); };
  check(manifest.examCode === cfg.exam && manifest.status === "reviewed-private" && manifest.publicAllowed === false, "manifest scope/publication state differs");
  check(manifest.targetQuestionCount === 40 && manifest.questionCount === 40 && manifest.reviewedQuestionCount === 40 && manifest.technicalReviewPendingIds.length === 0, "manifest review/counts differ");
  check(questions.length === 40 && new Set(questions.map(q => q.id)).size === 40, "40 unique occurrences required");
  check(stored.length === cfg.stored && refs.length === cfg.refs && manifest.storedUniqueQuestionCount === cfg.stored && manifest.reusedQuestionCount === cfg.refs, "stored/reference counts differ");
  check(review.questions.length === 40 && review.assets.length === cfg.assets, "review inventory differs");
  const allStored = [...read<SalesQuestion[]>(resolve(root("first"), "questions.json")), ...read<SalesQuestion[]>(resolve(root("second"), "questions.json"))];
  check(new Set(allStored.map(canonical)).size === 79, "duplicate body stored instead of referenced");
  for (const ref of refs) {
    const source = read<SalesQuestion[]>(resolve(base, ref.existingQuestionsPath)).find(q => q.id === ref.existingQuestionId);
    check(ref.id === ref.occurrence.id && !stored.some(q => q.id === ref.id), `${ref.id}: duplicate reference occurrence`);
    check(source !== undefined && source.answer === ref.occurrence.answer && source.officialAnswerNumber === ref.occurrence.officialAnswerNumber, `${ref.id}: referenced official answer differs`);
    check(!["question", "choices", "explanation", "choiceExplanations"].some(k => k in ref.occurrence), `${ref.id}: reference duplicates content`);
  }
  check(Object.keys(official).join() === Object.keys(cfg.codes).join(), "paper codes differ");
  for (const [code, session] of Object.entries(cfg.codes)) {
    const items = questions.filter(q => q.session === session);
    check(official[code].length === 20 && items.length === 20 && new Set(items.map(q => q.qNumber)).size === 20, `${code}: incomplete numbering`);
    for (const q of items) {
      const id = q.id; const n = q.qNumber;
      check(id === `${cfg.exam}-2026-annual-${session}-q${n}` && n >= 1 && n <= 20, `${id}: ID/number differs`);
      check(q.exam === cfg.exam && q.year === 2026 && q.season === "annual" && q.type === "multiple-choice" && q.publicAllowed === false && q.needsReview === false, `${id}: scope/publication state differs`);
      check(q.answer === keys[official[code][n - 1] - 1] && Number(q.officialAnswerNumber) === official[code][n - 1], `${id}: official answer differs`);
      check(Object.keys(q.choices ?? {}).join() === keys.join() && Object.keys(q.choiceExplanations ?? {}).join() === keys.join(), `${id}: choices/explanations missing`);
      check(q.explanationCoverage === "full" && q.explanation.length > 50 && Object.values(q.choiceExplanations ?? {}).every(x => (x?.length ?? 0) > 30), `${id}: explanation incomplete`);
      check(JSON.stringify(q.choices) === JSON.stringify(q.originalContent?.choices) && q.question === `${q.questionNotice}\n\n${q.originalContent?.body}` && q.originalContent?.sharedPassages?.length === 0, `${id}: original body/wrapper differs`);
      check(!/[\uE000-\uF8FF]/.test(q.question), `${id}: private-use glyph remains`);
      check(q.sourcePdfUrl.endsWith(`/R8${code}.pdf`) && q.sourceAnswerUrl?.endsWith("/R8fy_kaitou.pdf") === true, `${id}: source URL differs`);
      check(sources.sources.some(s => s.url === q.sourcePdfUrl && /^[a-f0-9]{64}$/.test(s.sha256)), `${id}: source receipt missing`);
      const record = review.questions.find(r => r.id === id);
      check(record?.sourceContentSha256 === sourceDigest(q) && record.transcriptionVerified && record.officialAnswerVerified && record.explanationReviewed, `${id}: source review differs`);
      if (code.endsWith("X")) {
        const law = code === "KX" && n >= 11 ? "液化石油ガスの保安の確保及び取引の適正化に関する法律" : "高圧ガス保安法";
        check(q.lawReferenceDate === "2026-04-01" && q.questionNotice?.includes(law) === true, `${id}: law/date differs`);
        check(q.officialReferenceUrls?.some(url => sources.laws.some(s => s.url === url && s.lawReferenceDate === "2026-04-01")) === true, `${id}: law source missing`);
      } else check(q.questionNotice?.includes("圧力は絶対圧力") === true, `${id}: pressure convention differs`);
      check(q.hasImage === !!q.imageUrls?.length && q.imageUrls?.length === q.imageAltTexts?.length, `${id}: image metadata differs`);
      const graph = code === "KY" && n === 17;
      check(q.hasImage === graph && (q.imageUrls?.length ?? 0) === (graph ? 1 : 0), `${id}: required graph missing or unexpected image`);
      if (graph) check(q.imageAltTexts?.[0]?.includes("60戸の最大ガス消費率は27%") === true, `${id}: graph reading differs`);
      for (const url of q.imageUrls ?? []) check(review.assets.some(a => a.futureImageUrl === url), `${id}: asset receipt missing`);
      if (!q.isCalculation) {
        const truth = Object.entries(q.statementExplanations ?? {}).filter(([, t]) => t.startsWith("正しい。")).map(([label]) => label);
        const answer = q.choices?.[q.answer as keyof NonNullable<SalesQuestion["choices"]>]?.split("、");
        check(JSON.stringify(truth) === JSON.stringify(answer), `${id}: statement judgments disagree with official answer`);
      }
    }
  }
  for (const asset of review.assets) {
    const bytes = readFileSync(resolve(base, asset.file));
    check(bytes.subarray(0, 8).toString("hex") === "89504e470d0a1a0a" && hash(bytes) === asset.sha256 && asset.visualVerified, `${asset.file}: source crop differs`);
    check(sources.sources.some(s => s.url === asset.sourcePdfUrl && s.sha256 === asset.sourceSha256 && s.pages >= asset.pdfPage), `${asset.file}: source receipt missing`);
  }
  return errors;
}
