import { z } from "zod";
import law2021 from "@/data/questions/denken1/native-2021-law.json";
import machine2021 from "@/data/questions/denken1/native-2021-machine.json";
import power2021 from "@/data/questions/denken1/native-2021-power.json";
import theory2021 from "@/data/questions/denken1/native-2021-theory.json";
import law2022 from "@/data/questions/denken1/native-2022-law.json";
import machine2022 from "@/data/questions/denken1/native-2022-machine.json";
import power2022 from "@/data/questions/denken1/native-2022-power.json";
import law2023 from "@/data/questions/denken1/native-2023-law.json";
import machine2023 from "@/data/questions/denken1/native-2023-machine.json";
import power2023 from "@/data/questions/denken1/native-2023-power.json";
import theory2023 from "@/data/questions/denken1/native-2023-theory.json";
import law2024 from "@/data/questions/denken1/native-2024-law.json";
import machine2024 from "@/data/questions/denken1/native-2024-machine.json";
import power2024 from "@/data/questions/denken1/native-2024-power.json";
import theory2024 from "@/data/questions/denken1/native-2024-theory.json";
import law2025 from "@/data/questions/denken1/native-2025-law.json";
import theory2022 from "@/data/questions/denken1/native-2022-theory.json";
import theory2025 from "@/data/questions/denken1/native-2025-theory.json";
import power2025 from "@/data/questions/denken1/native-2025-power.json";
import machine2025 from "@/data/questions/denken1/native-2025-machine.json";
import theory2026 from "@/data/questions/denken1/native-2026-theory.json";
import power2026 from "@/data/questions/denken1/native-2026-power.json";
import machine2026 from "@/data/questions/denken1/native-2026-machine.json";
import law2026 from "@/data/questions/denken1/native-2026-law.json";
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
type Expected = { year: number; examDate: string; subject: Denken1NativeSubject; numbers: number[]; fields: number; packetSha: string };
const expected: Expected[] = [
  { year: 2021, examDate: "2021-08-21", subject: "law", numbers: [1, 2, 3, 4, 5, 6], fields: 36, packetSha: "bf10286d4e3ae8962e8e927f73781414cac68b3c56b1c1295ff1507cdf92d021" },
  { year: 2021, examDate: "2021-08-21", subject: "machine", numbers: [1, 2, 3, 4, 5, 6, 7], fields: 39, packetSha: "8a26c86c2bd02d65d3a1f9491ca622673a0297b5761049b38ada2a09fbd0bac8" },
  { year: 2021, examDate: "2021-08-21", subject: "power", numbers: [1, 2, 3, 4, 5, 6], fields: 35, packetSha: "86e1869d63e19bba714a40fdb660ea370d0eca4c4bbc00e86f54db1cc9b8bce0" },
  { year: 2021, examDate: "2021-08-21", subject: "theory", numbers: [1, 2, 3, 4, 5, 6, 7], fields: 35, packetSha: "ff56c7d8c935c2ed26cd5ae2ba9adc3f1ad2e3ae15722fea71ba79038590cfe6" },
  { year: 2022, examDate: "2022-08-20", subject: "law", numbers: [1, 2, 3, 4, 5, 6], fields: 36, packetSha: "69f5a647385d67385e2041efb956f520ed48c7f11f4e1006baf10d35128bfc46" },
  { year: 2022, examDate: "2022-08-20", subject: "machine", numbers: [1, 2, 3, 4, 5, 6, 7], fields: 39, packetSha: "f815b10d53288fdbf46d99452f73b864aa69e5b653ea818c4b40e973f9548243" },
  { year: 2022, examDate: "2022-08-20", subject: "power", numbers: [1, 2, 3, 4, 5, 6], fields: 37, packetSha: "0fa41604c28ca1dfaae39ce7c6eba44112b1f2523bfeffcefd459d6ed03d9873" },
  { year: 2022, examDate: "2022-08-20", subject: "theory", numbers: [1, 2, 3, 4, 5, 6, 7], fields: 35, packetSha: "73918f090fd8c1a1cca90ba365a42bf8b5d6a49223538d0c7a41accbb498ab00" },
  { year: 2023, examDate: "2023-08-19", subject: "law", numbers: [1, 2, 3, 4, 5, 6], fields: 35, packetSha: "21072caa887f4e2666541b65742ac6fa2e6fd985c9f9b87d1fd000a970430337" },
  { year: 2023, examDate: "2023-08-19", subject: "machine", numbers: [1, 2, 3, 4, 5, 6, 7], fields: 40, packetSha: "1744ab5be39a1382792901166e20779e2717aa0bb616629a2c531dbd0fbc317c" },
  { year: 2023, examDate: "2023-08-19", subject: "power", numbers: [1, 2, 3, 4, 5, 6], fields: 35, packetSha: "5cc1ba5bc69ce0fb1b431b411513de3107dd16ca57a8173d5b10d54092e8c155" },
  { year: 2023, examDate: "2023-08-19", subject: "theory", numbers: [1, 2, 3, 4, 5, 6, 7], fields: 35, packetSha: "b5ffb469154383cbf97d617f11dbd80d2fcf9ed404f568cea654099fde14f562" },
  { year: 2024, examDate: "2024-08-18", subject: "law", numbers: [1, 2, 3, 4, 5, 6], fields: 36, packetSha: "3f56d81dc3b9cc9a313de34ad8c1e60c0e944ae2d209bfdf52642cfac5b4db94" },
  { year: 2024, examDate: "2024-08-18", subject: "machine", numbers: [1, 2, 3, 4, 5, 6, 7], fields: 39, packetSha: "a9af85df6820a04ec0562cffb1c0f32b2aa1f49777ead4b1363ed2effe84a5c9" },
  { year: 2024, examDate: "2024-08-18", subject: "power", numbers: [1, 2, 3, 4, 5, 6], fields: 34, packetSha: "327b4b4380f65938c53c5cde0e4eef393291de5180e27d114dad98daa10c41e0" },
  { year: 2024, examDate: "2024-08-18", subject: "theory", numbers: [1, 2, 3, 4, 5, 6, 7], fields: 41, packetSha: "82adf06e7fb2cf76c7f7b69080876d111096630f338664f334aebb38bbd19568" },
  { year: 2025, examDate: "2025-08-31", subject: "law", numbers: [1, 2, 3, 4, 5, 6], fields: 38, packetSha: "979604cb9b101d39209cae0edc9c2dc16ee3f55b10804b82385a55c16a0d320f" },
  { year: 2025, examDate: "2025-08-31", subject: "machine", numbers: [1, 2, 3, 4, 5, 6, 7], fields: 40, packetSha: "110a849f590d83e4a395d499ad751050ee5a4eb25c89c5cf829031334c2e04bb" },
  { year: 2025, examDate: "2025-08-31", subject: "power", numbers: [1, 2, 3, 4, 5, 6], fields: 35, packetSha: "6f995ed61dab59f620335e783920d755244cb75a32c8f85e8e840c968bda52c2" },
  { year: 2025, examDate: "2025-08-31", subject: "theory", numbers: [1, 2, 3, 4, 5, 6, 7], fields: 36, packetSha: "e7e07189690c73f4e79069c99ee846e1c66a42700b5b9547b12120ef00e715c9" },
  { year: 2026, examDate: "2026-08-30", subject: "law", numbers: [2, 3, 4, 5, 6], fields: 32, packetSha: "b2bec9e6c879024724ddabb367bde0d5536c929b77f47a23ff5f5296ebab06ff" },
  { year: 2026, examDate: "2026-08-30", subject: "machine", numbers: [1, 2, 3, 4, 5, 6, 7], fields: 41, packetSha: "25c21c4e0e7709bedbcc0c52acd1dc271241133c4da035e0907b8f9acf3b19e4" },
  { year: 2026, examDate: "2026-08-30", subject: "power", numbers: [1, 2, 3, 4, 5, 6], fields: 34, packetSha: "a2284768d0379b61679cd79379f3918688067b55e9aa48ac3f43dd73963c9550" },
  { year: 2026, examDate: "2026-08-30", subject: "theory", numbers: [1, 4, 5, 6, 7], fields: 28, packetSha: "80064471c45e9c7732e0b01e52ec7c69ee773c59ab026f7b172089ee9887810c" },
];
const normalize = (value: string) => value.replace(/[()（）]/g, "").normalize("NFKC");
function parseNativePart(raw: unknown, rules: Expected) {
  const parsed = part.parse(raw);
  const { examDate } = rules;
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

const raws: unknown[] = [law2021, machine2021, power2021, theory2021, law2022, machine2022, power2022, theory2022, law2023, machine2023, power2023, theory2023, law2024, machine2024, power2024, theory2024, law2025, machine2025, power2025, theory2025, law2026, machine2026, power2026, theory2026];
export const DENKEN1_NATIVE_PARTS = raws.map((raw, index) => parseNativePart(raw, expected[index]!));
export const DENKEN1_NATIVE_QUESTIONS = DENKEN1_NATIVE_PARTS.flatMap(item => item.questions);
export const DENKEN1_NATIVE_FIELD_COUNT = DENKEN1_NATIVE_QUESTIONS.reduce((count, question) => count + question.slots.length, 0);
export const DENKEN1_NATIVE_YEARS_LABEL = [...new Set(DENKEN1_NATIVE_PARTS.map(part => part.year))].sort((a, b) => a - b).join("・");
if (new Set(DENKEN1_NATIVE_QUESTIONS.map(q => q.id)).size !== DENKEN1_NATIVE_QUESTIONS.length) {
  throw new Error("Denken1 native original count mismatch");
}
const legacySessionSubject: Record<string, Denken1NativeSubject> = {
  riron: "theory", denryoku: "power", kikai: "machine", houki: "law",
};
const publishedOriginals = new Set(DENKEN1_QUESTIONS.map(q => `${q.year}:${q.season}:${legacySessionSubject[q.session] ?? q.session}:${q.qNumber}`));
for (const q of DENKEN1_NATIVE_QUESTIONS) publishedOriginals.add(`${q.year}:primary:${q.subject}:${q.number}`);
export const DENKEN1_PUBLISHED_ORIGINAL_COUNT = publishedOriginals.size;
export const denken1NativeSubjectPath = (year: number, subject: Denken1NativeSubject) => `/denken1/${year}-primary/${subject}`;
export const denken1NativeQuestionPath = (year: number, subject: Denken1NativeSubject, number: number) => `${denken1NativeSubjectPath(year, subject)}/q${number}`;
export const denken1NativeQuestionPaths = () => DENKEN1_NATIVE_QUESTIONS.map(q => denken1NativeQuestionPath(q.year, q.subject, q.number));
export const getDenken1NativePart = (year: number, subject: string) => DENKEN1_NATIVE_PARTS.find(p => p.year === year && p.subject === subject);
export const getDenken1NativeQuestions = (year: number, subject: string) => DENKEN1_NATIVE_QUESTIONS.filter(q => q.year === year && q.subject === subject);
export const getDenken1NativeQuestion = (year: number, subject: string, number: number) => DENKEN1_NATIVE_QUESTIONS.find(q => q.year === year && q.subject === subject && q.number === number);
