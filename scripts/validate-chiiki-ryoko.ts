import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { z } from "zod";
import y2025 from "../data/qualification-staging/chiiki-ryoko/2025.json";
import y2026 from "../data/qualification-staging/chiiki-ryoko/2026.json";
import manifest from "../data/qualification-staging/chiiki-ryoko/manifest.json";
import official from "../data/qualification-staging/chiiki-ryoko/official-answers.json";
import audit from "../data/qualification-staging/chiiki-ryoko/source-audit.json";
import { QUALIFICATION_CATALOG } from "../lib/qualifications/catalog";
import { EXAM_CONFIGS } from "../lib/exam-config";

const keys = ["ア", "イ", "ウ", "エ"] as const;
const choice = z.enum(keys);
const text = z.string().trim().min(1);
const four = z.object({ ア: text, イ: text, ウ: text, エ: text }).strict();
const schema = z.object({
  id: text, slug: z.literal("chiiki-ryoko"), year: z.union([z.literal(2025), z.literal(2026)]),
  season: z.literal("annual"), session: z.enum(["hoki", "yakkan", "jitsumu"]), qNumber: z.number().int().positive(),
  officialQuestionLabel: text, publicationStatus: z.literal("staging"), publicAllowed: z.literal(false), needsReview: z.literal(true),
  lawReferenceDate: text, question: text, sharedContext: z.string(), choices: four,
  answer: z.array(choice).min(1).max(4), officialAnswerText: text, requiredSelections: z.number().int().min(1).max(4),
  scoring: z.enum(["all-selected-exactly", "single-choice"]), points: z.literal(4),
  sourcePdfUrl: z.string().url(), sourceAnswerUrl: z.string().url(), sourcePages: z.array(z.number().int().min(3)).min(1),
  sourceAnswerPage: z.literal(1), sourcePageImages: z.array(text).min(1), sourceAttribution: text,
  explanationAuthorship: z.literal("original"), sourceTextSha256: z.string().regex(/^[a-f0-9]{64}$/),
  choiceExplanations: four, explanation: text, officialReferenceUrls: z.array(z.string().url()).min(1),
}).strict();
export const CHIIKI_RYOKO_STAGING = [...y2025, ...y2026];
const digest = (bytes: string | Buffer) => createHash("sha256").update(bytes).digest("hex");

/** Kept outside Question/ExamCode: exact multiple selection must not become OR grading. */
export function validateChiikiRyokoRows(input: unknown): number {
  const rows = z.array(schema).length(118).parse(input);
  const seen = new Set<string>();
  for (const year of [2025, 2026] as const) {
    for (const [session, expected] of [["hoki", 25], ["yakkan", 24], ["jitsumu", 10]] as const) {
      const group = rows.filter(q => q.year === year && q.session === session);
      if (group.map(q => q.qNumber).join() !== Array.from({ length: expected }, (_, i) => i + 1).join()) throw Error("chiiki-ryoko: missing/duplicate question numbers");
    }
  }
  for (const q of rows) {
    if (seen.has(q.id) || q.id !== `chiiki-ryoko-${q.year}-${q.session}-q${q.qNumber}`) throw Error(`${q.id}: duplicate/invalid id`);
    seen.add(q.id);
    const expected = official[String(q.year) as "2025" | "2026"][q.session][q.qNumber - 1];
    if (JSON.stringify(q.answer) !== JSON.stringify(expected) || q.officialAnswerText !== expected.join("、")) throw Error(`${q.id}: official answer mismatch`);
    if (q.requiredSelections !== expected.length || q.scoring !== (expected.length === 1 ? "single-choice" : "all-selected-exactly")) throw Error(`${q.id}: exact selection semantics lost`);
    if (q.lawReferenceDate !== `${q.year}-06-01`) throw Error(`${q.id}: law date mismatch`);
    for (const k of keys) {
      if (q.choiceExplanations[k].length < 25 || /[\uE000-\uF8FF\uFFFD]/u.test(q.question + q.choices[k])) throw Error(`${q.id}/${k}: incomplete explanation/transcription`);
    }
    const textHash = digest(JSON.stringify([q.question, q.choices]));
    const receipt = audit.questions.find(item => item.id === q.id);
    if (textHash !== q.sourceTextSha256 || textHash !== receipt?.sourceTextSha256) throw Error(`${q.id}: source transcription hash mismatch`);
    if (JSON.stringify(q.sourcePages) !== JSON.stringify(receipt.sourcePages)) throw Error(`${q.id}: source page mapping mismatch`);
    for (const kind of ["questions", "answers"] as const) {
      const source = manifest.sourceFiles.find(s => s.year === q.year && s.kind === kind)!;
      if ((kind === "questions" ? q.sourcePdfUrl : q.sourceAnswerUrl) !== source.url) throw Error(`${q.id}: source URL mismatch`);
      if (kind === "questions" && q.sourcePages.some(p => p > source.pages)) throw Error(`${q.id}: source page out of range`);
    }
    const images = q.sourcePages.map(p => `assets/${q.year}-questions-p${String(p).padStart(2, "0")}.png`);
    if (JSON.stringify(images) !== JSON.stringify(q.sourcePageImages)) throw Error(`${q.id}: original figures/pages missing`);
    if (q.sharedContext && !q.question.startsWith(q.sharedContext)) throw Error(`${q.id}: shared context missing`);
  }
  return rows.length;
}

export function validateChiikiRyoko(exams: readonly string[] = []): number {
  if (exams.length && !exams.includes("chiiki-ryoko")) return 0;
  const catalog = QUALIFICATION_CATALOG.find(q => q.slug === "chiiki-ryoko");
  if (!catalog || catalog.status !== "ready-to-ingest" || catalog.examCode || "chiiki-ryoko" in EXAM_CONFIGS) throw Error("chiiki-ryoko: publication isolation broken");
  if (manifest.publicAllowed !== false || manifest.publicationStatus !== "staging" || manifest.expectedQuestions !== 118) throw Error("chiiki-ryoko: private manifest required");
  const count = validateChiikiRyokoRows(CHIIKI_RYOKO_STAGING);
  if (manifest.assets.length !== 51 || new Set(manifest.assets.map(a => a.file)).size !== 51) throw Error("chiiki-ryoko: incomplete source images");
  for (const asset of manifest.assets) {
    if (!/^assets\/202[56]-(questions|answers)-p\d{2}\.png$/.test(asset.file)) throw Error("chiiki-ryoko: invalid asset path");
    const bytes = readFileSync(resolve(process.cwd(), "data/qualification-staging/chiiki-ryoko", asset.file));
    if (digest(bytes) !== asset.sha256) throw Error(`${asset.file}: source image hash mismatch`);
  }
  console.log(`[chiiki-ryoko] private staging: ${count} questions, 472 choice explanations, 51 original page images validated`);
  return count;
}
