import { z } from "zod";
import theory2026 from "@/data/questions/denken3/native-2026-upper-theory.json";
import power2026 from "@/data/questions/denken3/native-2026-upper-power.json";
import law2026 from "@/data/questions/denken3/native-2026-upper-law.json";
import law2025 from "@/data/questions/denken3/native-2025-lower-law.json";
import { DENKEN3_QUESTIONS } from "@/data/questions/denken3";

const nonempty = z.string().trim().min(1);
const hash = z.string().regex(/^[a-f0-9]{64}$/);
const choiceBank = z.record(z.string().regex(/^[1-5]$/), nonempty);
const sourcePage = z.object({ physicalPage: z.number().int().positive(), url: z.string().startsWith("/images/denken3/"), sha256: hash }).strict();
const field = z.object({ slot: z.number().int().min(1).max(2), prompt: z.string(), officialAnswer: z.string().regex(/^[1-5]$/), explanation: nonempty, derivation: z.string(), choiceExplanations: choiceBank }).strict();
const question = z.object({
  id: z.string().regex(/^denken3-20\d\d-(upper|lower)-(theory|power|law)-q\d\d$/),
  year: z.number().int(), sitting: z.enum(["2026-upper", "2025-lower"]), examDate: nonempty,
  subject: z.enum(["theory", "power", "law"]), number: z.number().int().min(1).max(18),
  topic: nonempty, questionText: nonempty,
  choiceGroups: z.union([choiceBank, z.record(nonempty, choiceBank)]),
  slots: z.array(field).min(1).max(2), figures: z.array(nonempty),
  sourcePages: z.array(sourcePage).min(1), sourcePdfUrl: z.url().startsWith("https://www.shiken.or.jp/"),
  sourcePdfSha256: hash, alternateQuestionRule: nonempty.nullable(), reviewedSha256: hash,
}).strict();
const part = z.object({
  sitting: z.enum(["2026-upper", "2025-lower"]), examDate: nonempty,
  subject: z.enum(["theory", "power", "law"]),
  sourceIndexUrl: z.literal("https://www.shiken.or.jp/chief/third/qa/"),
  sourceAnswerUrl: z.url().startsWith("https://www.shiken.or.jp/"),
  sourceAnswerPdfSha256: hash, sourcePacketSha256: hash,
  questions: z.array(question).min(1),
}).strict();
export type Denken3NativeQuestion = z.infer<typeof question>;
const expected = [
  { sitting: "2026-upper", subject: "theory", numbers: Array.from({ length: 18 }, (_, i) => i + 1), fields: 22, packet: "99148d0be5116dcadd6f41e545d72ac121ac6df7d073b0d611784ccf049361a2" },
  { sitting: "2026-upper", subject: "power", numbers: Array.from({ length: 8 }, (_, i) => i + 1), fields: 8, packet: "efdb7910f564804d084d461154c5b9868074f6c6a89a8802661a9bcbd69fd848" },
  { sitting: "2026-upper", subject: "law", numbers: [1, 2, 3, 5, 8], fields: 5, packet: "b050d760ca6c0602a53f11822167cbdad6f980fe63ca581b34ffd27af7bced15" },
  { sitting: "2025-lower", subject: "law", numbers: [1, 2, 3, 5, 8], fields: 5, packet: "4f5d4b81c0f3eecd4d395ebaa2944e9295905c975986b8fac8326270b144ebf2" },
] as const;
function parsePart(raw: unknown, rule: (typeof expected)[number]) {
  const item = part.parse(raw);
  const date = rule.sitting === "2025-lower" ? "2026-03-22" : "2026-08-30";
  if (item.sitting !== rule.sitting || item.subject !== rule.subject || item.examDate !== date
    || item.sourcePacketSha256 !== rule.packet || item.questions.length !== rule.numbers.length) {
    throw new Error(`Denken3 source part mismatch: ${rule.sitting} ${rule.subject}`);
  }
  for (const [index, number] of rule.numbers.entries()) {
    const q = item.questions[index];
    if (!q || q.id !== `denken3-${rule.sitting}-${rule.subject}-q${String(number).padStart(2, "0")}`
      || q.year !== Number(rule.sitting.slice(0, 4)) || q.sitting !== rule.sitting
      || q.subject !== rule.subject || q.examDate !== date || q.number !== number) {
      throw new Error(`Denken3 source original mismatch: ${rule.sitting} ${rule.subject} Q${number}`);
    }
    const groups = Object.values(q.choiceGroups).every(value => typeof value === "string")
      ? [q.choiceGroups as Record<string, string>]
      : Object.values(q.choiceGroups) as Record<string, string>[];
    if (groups.length !== q.slots.length && groups.length !== 1) throw new Error(`Denken3 source bank mismatch: ${q.id}`);
    if (q.slots.length !== (number >= 15 && rule.subject === "theory" ? 2 : 1)) throw new Error(`Denken3 source field mismatch: ${q.id}`);
    for (const [fieldIndex, slot] of q.slots.entries()) {
      const bank = groups[groups.length === 1 ? 0 : fieldIndex];
      if (!bank || Object.keys(bank).length !== 5 || slot.slot !== fieldIndex + 1
        || !bank[slot.officialAnswer] || Object.keys(slot.choiceExplanations).length !== 5
        || Object.keys(slot.choiceExplanations).some(label => !bank[label])) {
        throw new Error(`Denken3 official choice mismatch: ${q.id} (${fieldIndex + 1})`);
      }
    }
    if (Boolean(q.alternateQuestionRule) !== (rule.subject === "theory" && (number === 17 || number === 18))) {
      throw new Error(`Denken3 alternative rule mismatch: ${q.id}`);
    }
  }
  if (item.questions.reduce((sum, q) => sum + q.slots.length, 0) !== rule.fields) throw new Error(`Denken3 source field count mismatch: ${rule.sitting}`);
  return item;
}
const raws: unknown[] = [theory2026, power2026, law2026, law2025];
export const DENKEN3_NATIVE_PARTS = raws.map((raw, index) => parsePart(raw, expected[index]!));
export const DENKEN3_NATIVE_QUESTIONS = DENKEN3_NATIVE_PARTS.flatMap(item => item.questions);
if (DENKEN3_NATIVE_QUESTIONS.length !== 36 || new Set(DENKEN3_NATIVE_QUESTIONS.map(q => q.id)).size !== 36) throw new Error("Denken3 native original count mismatch");
const subjectMap: Record<string, string> = { riron: "theory", denryoku: "power", kikai: "machine", houki: "law" };
const sittingMap: Record<string, string> = { first: "upper", second: "lower" };
const identity = (year: number, sitting: string, subject: string, number: number, examDate: string) => `${year}:${sitting}:${subject}:${number}:${examDate}`;
const old = new Set(DENKEN3_QUESTIONS.map(q => {
  if (!q.examDate) throw new Error(`Denken3 legacy exam date missing: ${q.id}`);
  return identity(q.year, sittingMap[q.season]!, subjectMap[q.session]!, q.qNumber, q.examDate);
}));
if (old.size !== 264) throw new Error("Denken3 legacy original identity changed");
const combined = new Set(old);
for (const q of DENKEN3_NATIVE_QUESTIONS) combined.add(identity(q.year, q.sitting.split("-")[1]!, q.subject, q.number, q.examDate));
export const DENKEN3_PUBLISHED_ORIGINAL_COUNT = combined.size;
export const DENKEN3_NEW_ORIGINAL_COUNT = combined.size - old.size;
if (combined.size !== 295 || DENKEN3_NEW_ORIGINAL_COUNT !== 31) throw new Error("Denken3 native/legacy overlap changed");
export const denken3NativeSubjectPath = (sitting: string, subject: string) => `/denken3/${sitting}/${subject}`;
export const denken3NativeQuestionPath = (sitting: string, subject: string, number: number) => `${denken3NativeSubjectPath(sitting, subject)}/q${number}`;
export const denken3NativeQuestionPaths = () => DENKEN3_NATIVE_QUESTIONS.map(q => denken3NativeQuestionPath(q.sitting, q.subject, q.number));
export const getDenken3NativePart = (sitting: string, subject: string) => DENKEN3_NATIVE_PARTS.find(p => p.sitting === sitting && p.subject === subject);
export const getDenken3NativeQuestions = (sitting: string, subject: string) => DENKEN3_NATIVE_QUESTIONS.filter(q => q.sitting === sitting && q.subject === subject);
export const getDenken3NativeQuestion = (sitting: string, subject: string, number: number) => DENKEN3_NATIVE_QUESTIONS.find(q => q.sitting === sitting && q.subject === subject && q.number === number);
