import { createHash } from "node:crypto";
import { z } from "zod";
import y2024 from "../data/qualification-staging/juishi/2024.json";
import y2025 from "../data/qualification-staging/juishi/2025.json";
import manifest from "../data/qualification-staging/juishi/manifest.json";
import official from "../data/qualification-staging/juishi/official-answers.json";
import audit from "../data/qualification-staging/juishi/source-audit.json";

const text = z.string().trim().min(1);
const five = z.object({ "1": text, "2": text, "3": text, "4": text, "5": text }).strict();
const answerNumber = z.number().int().min(1).max(5);

const schema = z
  .object({
    id: text,
    slug: z.literal("juishi"),
    round: z.union([z.literal(76), z.literal(77)]),
    year: z.union([z.literal(2024), z.literal(2025)]),
    fiscalYearLabel: text,
    section: z.enum(["hissu", "a", "b"]),
    sectionLabel: text,
    qNumber: z.number().int().positive(),
    examDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    publicationStatus: z.literal("staging"),
    publicAllowed: z.literal(false),
    needsReview: z.literal(true),
    type: z.literal("multiple-choice"),
    question: text,
    choices: five,
    officialAnswerNumber: answerNumber,
    acceptedAnswerNumbers: z.array(answerNumber).min(1).max(2),
    scoring: z.enum(["single-choice", "any-of-accepted"]),
    category: text,
    statementExplanations: z.partialRecord(z.enum(["a", "b", "c", "d", "e"]), text),
    choiceExplanations: five,
    explanation: text,
    explanationAuthorship: z.literal("original"),
    lawRelated: z.boolean(),
    legalContextDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    lawReferenceDate: z.null(),
    sourcePdfUrl: z.string().url(),
    sourceAnswerUrl: z.string().url(),
    sourcePage: z.number().int().positive(),
    sourceAttribution: text,
    sourceTextSha256: z.string().regex(/^[a-f0-9]{64}$/),
    officialIndexUrl: z.string().url(),
    lastUpdated: text,
    reviewNotes: z
      .object({ uncertain: z.array(z.unknown()), concerns: z.array(z.unknown()) })
      .strict(),
  })
  .strict();

export const JUISHI_STAGING = [...y2025, ...y2024];

const digest = (value: string) => createHash("sha256").update(value).digest("hex");
const SECTION_COUNTS = { hissu: 50, a: 80, b: 80 } as const;

/** Kept out of the public registry: official answers include multi-answer and excluded items. */
export function validateJuishiStaging(exams: readonly string[] = []): number {
  if (exams.length && !exams.includes("juishi")) return 0;
  if (manifest.publicAllowed !== false || manifest.publicationStatus !== "staging") {
    throw new Error("juishi: private manifest required");
  }
  const rows = z.array(schema).parse(JUISHI_STAGING);
  if (rows.length !== manifest.expectedQuestions) {
    throw new Error(`juishi: expected ${manifest.expectedQuestions} rows, got ${rows.length}`);
  }
  const excludedIds = new Set(audit.excluded.map((item) => item.id));
  const seen = new Set<string>();
  for (const q of rows) {
    if (q.id !== `juishi-${q.round}-${q.section}-q${q.qNumber}`) throw new Error(`${q.id}: invalid id`);
    if (seen.has(q.id)) throw new Error(`${q.id}: duplicate id`);
    seen.add(q.id);
    if (excludedIds.has(q.id)) throw new Error(`${q.id}: excluded question must not be published`);
    if (q.round === 77 ? q.year !== 2025 : q.year !== 2024) throw new Error(`${q.id}: round/year mismatch`);
    if (q.qNumber > SECTION_COUNTS[q.section]) throw new Error(`${q.id}: question number out of range`);
    const expected = (official.answers as Record<string, Record<string, Record<string, number[]>>>)[
      String(q.round)
    ]?.[q.section]?.[String(q.qNumber)];
    if (!expected || JSON.stringify(expected) !== JSON.stringify(q.acceptedAnswerNumbers)) {
      throw new Error(`${q.id}: official answer mismatch`);
    }
    if (q.officialAnswerNumber !== expected[0]) throw new Error(`${q.id}: primary answer mismatch`);
    if (q.scoring !== (expected.length === 1 ? "single-choice" : "any-of-accepted")) {
      throw new Error(`${q.id}: multi-answer semantics lost`);
    }
    if (/[-�]/u.test(q.question + Object.values(q.choices).join(""))) {
      throw new Error(`${q.id}: unreadable glyph in transcription`);
    }
    const isCombination = Object.values(q.choices).every((choice) => /^[a-e](, [a-e])+$/.test(choice));
    if (isCombination && Object.keys(q.statementExplanations).length !== 5) {
      throw new Error(`${q.id}: statement-level explanations missing`);
    }
    for (const key of ["1", "2", "3", "4", "5"] as const) {
      if (q.choiceExplanations[key].length < (isCombination ? 8 : 15)) {
        throw new Error(`${q.id}/${key}: explanation too short`);
      }
    }
    if (q.explanation.length < 30) throw new Error(`${q.id}: summary explanation too short`);
    if (digest(JSON.stringify([q.question, q.choices])) !== q.sourceTextSha256) {
      throw new Error(`${q.id}: transcription hash mismatch`);
    }
    const sourceFile = manifest.files.find(
      (file) => file.round === q.round && file.kind === "questions" && file.label === q.sectionLabel,
    );
    const answerFile = manifest.files.find((file) => file.round === q.round && file.kind === "answers");
    if (!sourceFile || sourceFile.url !== q.sourcePdfUrl) throw new Error(`${q.id}: source URL mismatch`);
    if (!answerFile || answerFile.url !== q.sourceAnswerUrl) throw new Error(`${q.id}: answer URL mismatch`);
    if (q.sourcePage > sourceFile.pages) throw new Error(`${q.id}: source page out of range`);
  }
  for (const round of [76, 77] as const) {
    for (const section of ["hissu", "a", "b"] as const) {
      const group = rows.filter((q) => q.round === round && q.section === section);
      const excluded = audit.excluded.filter((item) =>
        item.id.startsWith(`juishi-${round}-${section}-q`),
      ).length;
      if (group.length + excluded !== SECTION_COUNTS[section]) {
        throw new Error(`juishi ${round}/${section}: ${group.length}+${excluded} !== ${SECTION_COUNTS[section]}`);
      }
    }
  }
  console.log(`[staging] juishi: ${rows.length} questions, ${rows.length * 5} choice explanations; publicAllowed=false`);
  return rows.length;
}

if (process.argv[1] && process.argv[1].endsWith("validate-juishi.ts")) {
  validateJuishiStaging();
}
