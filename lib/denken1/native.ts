import { z } from "zod";
import theory2025 from "@/data/questions/denken1/native-2025-theory.json";
import power2025 from "@/data/questions/denken1/native-2025-power.json";
import machine2025 from "@/data/questions/denken1/native-2025-machine.json";
import theory2026 from "@/data/questions/denken1/native-2026-theory.json";
import power2026 from "@/data/questions/denken1/native-2026-power.json";
import machine2026 from "@/data/questions/denken1/native-2026-machine.json";
import { DENKEN1_QUESTIONS } from "@/data/questions/denken1";

const text = z.string().trim().min(1);
const hash = z.string().regex(/^[a-f0-9]{64}$/);
const answer = z.object({
  slot: z.number().int().positive(),
  officialAnswer: text,
  explanation: text,
  derivation: text,
  choiceExplanations: z.record(text, text).optional(),
}).strict();
const question = z.object({
  id: z.string().regex(/^denken1-20\d\d-primary-(theory|power|machine|law)-q0[1-7]$/),
  year: z.number().int(),
  season: z.literal("primary"),
  examDate: text,
  subject: z.enum(["theory", "power", "machine", "law"]),
  number: z.number().int().min(1).max(7),
  topic: text,
  questionText: text,
  choiceGroups: z.record(text, text),
  slots: z.array(answer).min(5),
  figures: z.array(text),
  sourcePages: z.array(z.object({
    physicalPage: z.number().int().positive(),
    url: z.string().startsWith("/images/denken1/"),
    sha256: hash,
  }).strict()).min(1),
  sourcePdfUrl: z.url().startsWith("https://www.shiken.or.jp/"),
  sourcePdfSha256: hash,
  alternateQuestionRule: z.string().nullable(),
}).strict();
const part = z.object({
  year: z.number().int(),
  season: z.literal("primary"),
  examDate: text,
  subject: z.enum(["theory", "power", "machine", "law"]),
  sourceIndexUrl: z.literal("https://www.shiken.or.jp/chief/first/qa/"),
  sourceAnswerUrl: z.url().startsWith("https://www.shiken.or.jp/"),
  sourceAnswerPdfSha256: hash,
  sourcePacketSha256: hash,
  questions: z.array(question).min(1),
}).strict();

export type Denken1NativeQuestion = z.infer<typeof question>;
export type Denken1NativeSubject = Denken1NativeQuestion["subject"];
type Expected = { year: number; subject: Denken1NativeSubject; numbers: number[]; fields: number; packetSha: string };
const expected: Expected[] = [
  { year: 2025, subject: "power", numbers: [1, 2, 3, 4, 5, 6], fields: 35, packetSha: "6f995ed61dab59f620335e783920d755244cb75a32c8f85e8e840c968bda52c2" },
  { year: 2025, subject: "machine", numbers: [1, 2, 3, 4, 5, 6, 7], fields: 40, packetSha: "110a849f590d83e4a395d499ad751050ee5a4eb25c89c5cf829031334c2e04bb" },
  { year: 2026, subject: "machine", numbers: [1, 2, 3, 4, 5, 6, 7], fields: 41, packetSha: "25c21c4e0e7709bedbcc0c52acd1dc271241133c4da035e0907b8f9acf3b19e4" },
  { year: 2026, subject: "power", numbers: [1, 2, 3, 4, 5, 6], fields: 34, packetSha: "a2284768d0379b61679cd79379f3918688067b55e9aa48ac3f43dd73963c9550" },
  { year: 2025, subject: "theory", numbers: [1, 2, 3, 4, 5, 6, 7], fields: 36, packetSha: "e7e07189690c73f4e79069c99ee846e1c66a42700b5b9547b12120ef00e715c9" },
  { year: 2026, subject: "theory", numbers: [5, 6, 7], fields: 18, packetSha: "e7e07189690c73f4e79069c99ee846e1c66a42700b5b9547b12120ef00e715c9" },
];
const normalize = (value: string) => value.replace(/[()（）]/g, "").normalize("NFKC");
function parseNativePart(raw: unknown, rules: Expected) {
  const parsed = part.parse(raw);
  const examDate = `${rules.year}-08-${rules.year === 2026 ? "30" : "31"}`;
  if (parsed.year !== rules.year || parsed.subject !== rules.subject || parsed.examDate !== examDate
    || parsed.sourcePacketSha256 !== rules.packetSha || parsed.questions.length !== rules.numbers.length) {
    throw new Error(`Denken1 native part source mismatch: ${rules.year} ${rules.subject}`);
  }
  for (const [index, number] of rules.numbers.entries()) {
    const q = parsed.questions[index];
    if (!q || q.id !== `denken1-${rules.year}-primary-${rules.subject}-q${String(number).padStart(2, "0")}`
      || q.number !== number || q.subject !== rules.subject || q.year !== rules.year || q.examDate !== examDate) {
      throw new Error(`Denken1 native original mismatch: ${rules.year} ${rules.subject} Q${number}`);
    }
    const bank = new Set(Object.keys(q.choiceGroups).map(normalize));
    for (const [slotIndex, field] of q.slots.entries()) {
      const reasons = field.choiceExplanations;
      const missingReason = reasons && (Object.keys(reasons).length !== bank.size
        || Object.keys(reasons).some(label => !bank.has(normalize(label))));
      if (field.slot !== slotIndex + 1 || !bank.has(normalize(field.officialAnswer)) || missingReason) {
        throw new Error(`Denken1 official field or choice reason mismatch: ${q.id} (${slotIndex + 1})`);
      }
    }
  }
  if (parsed.questions.reduce((sum, q) => sum + q.slots.length, 0) !== rules.fields) {
    throw new Error(`Denken1 answer field count mismatch: ${rules.year} ${rules.subject}`);
  }
  return parsed;
}

const raws: unknown[] = [power2025, machine2025, machine2026, power2026, theory2025, theory2026];
export const DENKEN1_NATIVE_PARTS = raws.map((raw, index) => parseNativePart(raw, expected[index]!));
export const DENKEN1_NATIVE_QUESTIONS = DENKEN1_NATIVE_PARTS.flatMap(item => item.questions);
if (DENKEN1_NATIVE_QUESTIONS.length !== 36 || new Set(DENKEN1_NATIVE_QUESTIONS.map(q => q.id)).size !== 36) {
  throw new Error("Denken1 native original count mismatch");
}
const legacySessionSubject: Record<string, Denken1NativeSubject> = {
  riron: "theory", denryoku: "power", kikai: "machine", houki: "law",
};
const publishedOriginals = new Set(DENKEN1_QUESTIONS.map(q => `${q.year}:${legacySessionSubject[q.session]}:${q.qNumber}`));
for (const q of DENKEN1_NATIVE_QUESTIONS) publishedOriginals.add(`${q.year}:${q.subject}:${q.number}`);
export const DENKEN1_PUBLISHED_ORIGINAL_COUNT = publishedOriginals.size;
if (DENKEN1_PUBLISHED_ORIGINAL_COUNT !== 39) throw new Error("Denken1 legacy/native original overlap changed");
export const denken1NativeSubjectPath = (year: number, subject: Denken1NativeSubject) => `/denken1/${year}-primary/${subject}`;
export const denken1NativeQuestionPath = (year: number, subject: Denken1NativeSubject, number: number) => `${denken1NativeSubjectPath(year, subject)}/q${number}`;
export const denken1NativeQuestionPaths = () => DENKEN1_NATIVE_QUESTIONS.map(q => denken1NativeQuestionPath(q.year, q.subject, q.number));
export const getDenken1NativePart = (year: number, subject: string) => DENKEN1_NATIVE_PARTS.find(p => p.year === year && p.subject === subject);
export const getDenken1NativeQuestions = (year: number, subject: string) => DENKEN1_NATIVE_QUESTIONS.filter(q => q.year === year && q.subject === subject);
export const getDenken1NativeQuestion = (year: number, subject: string, number: number) => DENKEN1_NATIVE_QUESTIONS.find(q => q.year === year && q.subject === subject && q.number === number);
