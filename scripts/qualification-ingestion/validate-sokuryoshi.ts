import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { isAbsolute, join, relative, resolve, sep } from "node:path";
import { z } from "zod";

const refSchema = z.object({ documentId: z.string().regex(/^\d{9}$/), page: z.number().int().positive() });
const common = {
  id: z.string().min(1), slug: z.literal("sokuryoshi"), year: z.union([z.literal(2025), z.literal(2026)]),
  officialQuestionNumber: z.number().int().positive(), officialQuestionLabel: z.string().min(1),
  publicAllowed: z.literal(false), needsReview: z.literal(true), category: z.string().min(1),
  originalQuestion: z.object({ format: z.literal("lossless-page-images"), sourcePages: z.array(refSchema).min(1) }),
  sourcePdfUrls: z.array(z.url()).min(1), sourceAnswerUrl: z.url(), sourceAttribution: z.string().min(20),
  officialReferenceUrls: z.array(z.url()).min(1), lawReferenceDate: z.null(), lawReferenceNote: z.string().min(20),
};
const questionSchema = z.discriminatedUnion("type", [
  z.object({ ...common, type: z.literal("multiple-choice"), session: z.literal("am"),
    officialAnswerNumber: z.number().int().min(1).max(5), explanation: z.string().min(20),
    originalAnswer: z.object({ format: z.literal("official-choice-table"), sourcePages: z.array(refSchema).length(1) }),
    choices: z.array(z.object({ officialNumber: z.number().int().min(1).max(5),
      originalChoice: z.object({ questionSource: z.literal("originalQuestion"), printedNumber: z.number().int().min(1).max(5) }),
      explanation: z.string().min(25) })).length(5) }),
  z.object({ ...common, type: z.literal("descriptive"), session: z.literal("pm"),
    automaticScoringAllowed: z.literal(false),
    originalAnswer: z.object({ format: z.literal("official-example-images"), sourcePages: z.array(refSchema).length(2) }),
    answerSheetPages: z.array(refSchema).length(2),
    explanationSections: z.array(z.object({ label: z.string().min(2), text: z.string().min(35) })).min(8) }),
]);

/** Dedicated private schema; no ExamCode/public configuration changes required. */
export function validateSokuryoshiStaging(root = process.cwd()): { count: number; errors: string[] } {
  const base = join(root, "data/qualification-staging/sokuryoshi");
  const read = (file: string) => JSON.parse(readFileSync(join(base, file), "utf8"));
  const errors: string[] = [];
  try {
    const manifest = read("manifest.json");
    const source = read("source-manifest.json");
    const keys = read("official-answer-keys.json");
    if (manifest.publicAllowed !== false || source.publicAllowed !== false) errors.push("publicAllowed must be false");
    if (manifest.slug !== "sokuryoshi" || manifest.originalCount !== 66 || manifest.choiceExplanationCount !== 280) errors.push("manifest counts/slug mismatch");
    if (source.documents.length !== 13 || source.missingPdfUrls.length) errors.push("expected all 13 official PDFs");
    const pageKeys = new Set<string>();
    const documentUrls = new Map<string, string>();
    let pageCount = 0;
    for (const doc of source.documents) {
      documentUrls.set(doc.id, doc.url);
      if (doc.url !== `https://www.gsi.go.jp/common/${doc.id}.pdf` || doc.httpStatus !== 200 || doc.retrievalMethod !== "GET") errors.push(`invalid retrieval ${doc.id}`);
      if (!/^[a-f0-9]{64}$/.test(doc.sha256)) errors.push(`invalid PDF hash ${doc.id}`);
      for (const [index, page] of doc.pages.entries()) {
        pageCount++;
        if (page.page !== index + 1) errors.push(`page numbering ${doc.id}`);
        pageKeys.add(`${doc.id}:${page.page}`);
        const path = resolve(base, page.asset);
        const rel = relative(base, path);
        if (isAbsolute(rel) || rel === ".." || rel.startsWith(`..${sep}`) || !rel.startsWith(`assets${sep}`)) {
          errors.push(`asset outside staging ${page.asset}`);
          continue;
        }
        if (!existsSync(path)) { errors.push(`missing asset ${page.asset}`); continue; }
        if (createHash("sha256").update(readFileSync(path)).digest("hex") !== page.sha256) errors.push(`asset hash mismatch ${page.asset}`);
      }
    }
    if (pageCount !== 186) errors.push(`expected 186 original pages, got ${pageCount}`);
    const ids = new Set<string>();
    let count = 0;
    for (const year of [2025, 2026]) {
      const round = read(`${year}.json`);
      if (round.publicAllowed !== false || round.year !== year || round.questions.length !== 33) errors.push(`round ${year} metadata/count`);
      for (const session of ["am", "pm"]) {
        const numbers = round.questions.filter((q: { session: string }) => q.session === session).map((q: { officialQuestionNumber: number }) => q.officialQuestionNumber);
        const expected = Array.from({ length: session === "am" ? 28 : 5 }, (_, i) => i + 1);
        if (JSON.stringify(numbers) !== JSON.stringify(expected)) errors.push(`${year} ${session}: incomplete original numbering`);
      }
      for (const raw of round.questions) {
        count++;
        const result = questionSchema.safeParse(raw);
        if (!result.success) { errors.push(`${raw.id}: ${result.error.message}`); continue; }
        const q = result.data;
        if (ids.has(q.id)) errors.push(`duplicate ${q.id}`);
        ids.add(q.id);
        if (q.id !== `sokuryoshi-${year}-annual-${q.session}-q${q.officialQuestionNumber}` || q.year !== year) errors.push(`identity mismatch ${q.id}`);
        const refs = [...q.originalQuestion.sourcePages, ...q.originalAnswer.sourcePages, ...(q.type === "descriptive" ? q.answerSheetPages : [])];
        for (const ref of refs) if (!pageKeys.has(`${ref.documentId}:${ref.page}`)) errors.push(`unknown source page ${q.id}`);
        const urls = [...new Set(q.originalQuestion.sourcePages.map(ref => documentUrls.get(ref.documentId)))];
        if (JSON.stringify(urls) !== JSON.stringify(q.sourcePdfUrls)) errors.push(`source URL mismatch ${q.id}`);
        if (q.originalAnswer.sourcePages.some(ref => documentUrls.get(ref.documentId) !== q.sourceAnswerUrl)) errors.push(`answer URL mismatch ${q.id}`);
        if (q.type === "multiple-choice") {
          if (q.officialAnswerNumber !== keys[String(year)].answers[q.officialQuestionNumber-1]) errors.push(`official answer mismatch ${q.id}`);
          if (q.sourceAnswerUrl !== keys[String(year)].sourceUrl) errors.push(`key URL mismatch ${q.id}`);
          for (const [i, choice] of q.choices.entries()) if (choice.officialNumber !== i+1 || choice.originalChoice.printedNumber !== i+1) errors.push(`choice order ${q.id}`);
          if (new Set(q.choices.map(c => c.explanation)).size !== 5) errors.push(`duplicated option explanation ${q.id}`);
        } else {
          if (new Set(q.explanationSections.map(s => s.label)).size !== q.explanationSections.length) errors.push(`duplicate descriptive labels ${q.id}`);
          const expectedPages = [2*q.officialQuestionNumber-1,2*q.officialQuestionNumber];
          for (const refs of [q.originalAnswer.sourcePages,q.answerSheetPages]) if (JSON.stringify(refs.map(p=>p.page)) !== JSON.stringify(expectedPages)) errors.push(`afternoon answer mapping ${q.id}`);
          if ("officialAnswerNumber" in raw || "choices" in raw || "answer" in raw) errors.push(`descriptive must not be converted to choice ${q.id}`);
        }
      }
    }
    if (count !== 66) errors.push(`expected 66 originals, got ${count}`);
    return { count, errors };
  } catch (error) {
    return { count: 0, errors: [...errors, String(error)] };
  }
}
