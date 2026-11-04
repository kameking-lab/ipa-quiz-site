import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { z } from "zod";
import y2025 from "../../data/qualification-staging/jokaso-setsubishi/2025.json";
import y2026 from "../../data/qualification-staging/jokaso-setsubishi/2026.json";
import manifest from "../../data/qualification-staging/jokaso-setsubishi/manifest.json";
import official from "../../data/qualification-staging/jokaso-setsubishi/official-answers.json";
import sourceAudit from "../../data/qualification-staging/jokaso-setsubishi/source-audit.json";

const sha256 = (value: string | Buffer) => createHash("sha256").update(value).digest("hex");
const root = path.resolve(process.cwd(), "data/qualification-staging/jokaso-setsubishi");
const evidence = new Map(sourceAudit.questions.map((q) => [q.id, q]));
const fourStrings = (min: number) => z.object({
  "1": z.string().min(min), "2": z.string().min(min),
  "3": z.string().min(min), "4": z.string().min(min),
}).strict();

// Deliberately separate from Question/ExamCode: these records have no public loader.
export const JokasoSetsubishiStagingSchema = z.object({
  id: z.string(), slug: z.literal("jokaso-setsubishi"),
  year: z.union([z.literal(2025), z.literal(2026)]),
  season: z.literal("annual"), session: z.literal("gakka"),
  qNumber: z.number().int().min(1).max(50),
  publicationStatus: z.literal("staging"), publicAllowed: z.literal(false),
  type: z.literal("multiple-choice"), category: z.literal("浄化槽設備士学科"),
  question: z.string().min(10), choices: fourStrings(1),
  officialAnswerNumber: z.number().int().min(1).max(4),
  choiceExplanations: fourStrings(20), explanation: z.string().min(40),
  explanationCoverage: z.literal("full"), explanationAuthorship: z.literal("original"),
  sourcePdfUrl: z.string().url(), sourceAnswerUrl: z.string().url(),
  sourcePage: z.number().int().min(1).max(21),
  sourceImage: z.string().regex(/^images\/(2025|2026)-q\d{2}-original\.png$/),
  sourceImageSha256: z.string().regex(/^[a-f0-9]{64}$/),
  sourceTextSha256: z.string().regex(/^[a-f0-9]{64}$/),
  sourceImageAlt: z.string().min(10), sourceAttribution: z.string().min(30),
  officialReferenceUrls: z.array(z.string().url()),
  lawReferenceDate: z.null(), legalContextDate: z.string(),
  lastUpdated: z.literal("2026-11-04"), transcriptionNote: z.string().min(10),
  requiresOriginalImage: z.literal(true).optional(),
  choiceColumnLabels: z.array(z.string().min(1)).min(2).optional(),
  sourceTable: z.array(z.array(z.string())).optional(),
  diagramExplanations: z.object({
    ア: z.string().min(20), イ: z.string().min(20),
    ウ: z.string().min(20), エ: z.string().min(20),
  }).strict().optional(),
}).strict().superRefine((q, ctx) => {
  const fail = (message: string) => ctx.addIssue({ code: "custom", message });
  if (q.id !== `jokaso-setsubishi-${q.year}-annual-gakka-q${q.qNumber}`) fail("ID/year/question mismatch");
  if (q.legalContextDate !== `${q.year}-07-${q.year === 2025 ? "13" : "12"}`) fail("wrong examination context date");
  const expectedAnswer = official.answers[String(q.year) as "2025" | "2026"][q.qNumber - 1];
  if (q.officialAnswerNumber !== expectedAnswer) fail("answer differs from the official PDF answer ledger");
  for (const [field, kind] of [["sourcePdfUrl", "questions"], ["sourceAnswerUrl", "answers"]] as const) {
    if (q[field] !== manifest.files.find((f) => f.name === `${q.year}-${kind}`)?.url) fail(`${field} has wrong source edition`);
  }
  const printed = evidence.get(q.id);
  // Same stable serialization as the Python receipt (choices precedes question).
  const text = `{"choices": {${Object.entries(q.choices).map(([k, v]) => `${JSON.stringify(k)}: ${JSON.stringify(v)}`).join(", ")}}, "question": ${JSON.stringify(q.question)}}`;
  if (!printed || printed.sourcePage !== q.sourcePage || printed.officialAnswerNumber !== q.officialAnswerNumber ||
      printed.sourceTextSha256 !== q.sourceTextSha256 || sha256(text) !== q.sourceTextSha256 ||
      printed.sourceImageSha256 !== q.sourceImageSha256) fail("source audit receipt mismatch");
  const expectedImage = `images/${q.year}-q${String(q.qNumber).padStart(2, "0")}-original.png`;
  if (q.sourceImage !== expectedImage) fail("wrong question image");
  const file = path.join(root, q.sourceImage);
  if (!existsSync(file)) fail("missing original image");
  else {
    const bytes = readFileSync(file);
    if (sha256(bytes) !== q.sourceImageSha256) fail("modified original image");
    if (!bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) fail("original image must be PNG");
  }
  if (q.year === 2026 && q.qNumber === 16 && !q.diagramExplanations) fail("all four inner diagrams require explanations");
  if (Object.values(q.choices).some((s) => /^[⑴⑵⑶⑷]$/.test(s)) && !q.requiresOriginalImage) fail("diagram choices must require the original image");
});

export const JOKASO_SETSUBISHI_STAGING = z.array(JokasoSetsubishiStagingSchema).parse([...y2025, ...y2026]);

export function validateJokasoSetsubishiStaging(): number {
  if (manifest.publicAllowed !== false || manifest.publicationStatus !== "staging" || manifest.expectedQuestions !== 100)
    throw new Error("jokaso-setsubishi publication gate mismatch");
  if (sourceAudit.questionCount !== 100 || evidence.size !== 100) throw new Error("incomplete source audit");
  z.array(JokasoSetsubishiStagingSchema).length(100).parse(JOKASO_SETSUBISHI_STAGING);
  if (new Set(JOKASO_SETSUBISHI_STAGING.map((q) => q.id)).size !== 100) throw new Error("duplicate staging ID");
  for (const year of [2025, 2026]) {
    const numbers = JOKASO_SETSUBISHI_STAGING.filter((q) => q.year === year).map((q) => q.qNumber);
    if (JSON.stringify(numbers) !== JSON.stringify(Array.from({ length: 50 }, (_, i) => i + 1)))
      throw new Error(`jokaso-setsubishi ${year}: missing, duplicated or unordered question numbers`);
  }
  return 100;
}
