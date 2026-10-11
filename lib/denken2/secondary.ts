import { z } from "zod";
import raw from "@/data/questions/denken2/secondary-latest-two.json";

const text = z.string().trim().min(1);
const hash = z.string().regex(/^[a-f0-9]{64}$/);
const subject = z.enum(["power-management", "machine-control"]);
const page = z.object({
  year: z.number().int(), subject: z.enum(["power-management", "machine-control", "answer"]),
  physicalPage: z.number().int().positive(), url: z.string().startsWith("/images/denken2/secondary/"),
  sha256: hash, width: z.number().int().positive(), height: z.number().int().positive(),
}).strict();
const question = z.object({
  id: z.string().regex(/^denken2-202[45]-secondary-(power-management|machine-control)-q0[1-6]$/),
  year: z.union([z.literal(2025), z.literal(2024)]), stage: z.literal("secondary"), examDate: text,
  subject, number: z.number().int().min(1).max(6), topic: text,
  requestedSubparts: z.array(z.number().int().positive()).min(1),
  sourcePdfUrl: z.url().startsWith("https://www.shiken.or.jp/chief/upload/"), sourcePdfSha256: hash,
  answerPdfUrl: z.url().startsWith("https://www.shiken.or.jp/chief/upload/"), answerPdfSha256: hash,
  sourcePages: z.array(page).min(1), answerPages: z.array(page).min(1),
  solutions: z.array(z.object({ label: text, covers: z.array(z.number().int().positive()).min(1), answer: text, explanation: text }).strict()).min(1),
}).strict();
const packet = z.object({ sourceIndexUrl: z.literal("https://www.shiken.or.jp/chief/second/qa/"), questions: z.array(question).length(20) }).strict().parse(raw);

export type SecondaryQuestion = z.infer<typeof question>;
export type SecondarySubject = SecondaryQuestion["subject"];
export const SECONDARY_SUBJECT_NAMES: Record<SecondarySubject, string> = { "power-management": "電力・管理", "machine-control": "機械・制御" };
export const SECONDARY_SOURCE_INDEX = packet.sourceIndexUrl;
export const SECONDARY_QUESTIONS = packet.questions;
export const secondaryQuestionPath = (q: Pick<SecondaryQuestion, "year" | "subject" | "number">) => `/denken2/secondary/${q.year}/${q.subject}/q${q.number}`;
export const secondarySitemapPaths = () => ["/denken2/secondary", ...SECONDARY_QUESTIONS.map(secondaryQuestionPath)];
export const getSecondaryQuestion = (year: number, subject: string, number: number) => SECONDARY_QUESTIONS.find(q => q.year === year && q.subject === subject && q.number === number);

const identities = new Set<string>();
for (const q of SECONDARY_QUESTIONS) {
  const expectedDate = q.year === 2025 ? "2025-11-16" : "2024-11-10";
  const expectedId = `denken2-${q.year}-secondary-${q.subject}-q${String(q.number).padStart(2, "0")}`;
  const covered = [...new Set(q.solutions.flatMap(part => part.covers))].sort((a, b) => a - b);
  if (q.id !== expectedId || q.examDate !== expectedDate || identities.has(q.id)
    || (q.subject === "machine-control" && q.number > 4)
    || q.requestedSubparts.some((part, index) => part !== index + 1)
    || covered.join(",") !== q.requestedSubparts.join(",")) throw new Error(`Denken2 secondary original/coverage mismatch: ${q.id}`);
  identities.add(q.id);
  for (const [kind, pages] of [[q.subject, q.sourcePages], ["answer", q.answerPages]] as const) {
    for (const p of pages) {
      if (p.year !== q.year || p.subject !== kind || p.url !== `/images/denken2/secondary/${q.year}/${kind}/p${String(p.physicalPage).padStart(2, "0")}.jpg`) {
        throw new Error(`Denken2 secondary source page mismatch: ${q.id}`);
      }
    }
  }
}
for (const year of [2025, 2024]) {
  for (const s of ["power-management", "machine-control"] as const) {
    const numbers = SECONDARY_QUESTIONS.filter(q => q.year === year && q.subject === s).map(q => q.number);
    if (numbers.join(",") !== (s === "power-management" ? "1,2,3,4,5,6" : "1,2,3,4")) throw new Error("Denken2 secondary sitting incomplete");
  }
}
