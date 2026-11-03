import { z } from "zod";
import raw2026 from "@/data/questions/denken2/native-2026-theory-machine.json";
import raw2025 from "@/data/questions/denken2/native-2025-theory-machine.json";
import raw2025PowerLaw from "@/data/questions/denken2/native-2025-power-law-go11.json";

const text = z.string().trim().min(1);
const hash = z.string().regex(/^[a-f0-9]{64}$/);
const answer = z.union([
  z.object({ slot: z.number().int().min(1).max(5), officialAnswer: text, explanation: text, derivation: text }).strict(),
  z.object({ slot: z.number().int().min(1).max(5), officialDefinition: text, officialUnit: text, explanation: text, derivation: text }).strict(),
]);
const image = z.object({
  physicalPage: z.number().int().positive(),
  url: z.string().startsWith("/images/denken2/"),
  sha256: hash,
}).strict();
const question = z.object({
  id: z.string().regex(/^denken2-20\d\d-primary-(theory|power|machine|law)-q0[1-8]$/),
  year: z.number().int(),
  season: z.literal("primary"),
  examDate: text,
  subject: z.enum(["theory", "power", "machine", "law"]),
  number: z.number().int().min(1).max(8),
  topic: text,
  questionText: text,
  choiceGroups: z.union([z.record(text, text), z.record(text, z.record(text, text))]),
  slots: z.array(answer).length(5),
  figures: z.array(text),
  sourcePages: z.array(image).min(1),
  sourcePdfUrl: z.url().startsWith("https://www.shiken.or.jp/"),
  sourcePdfSha256: hash,
  alternateQuestionRule: z.string().nullable(),
}).strict();
const edition = z.object({
  year: z.number().int(),
  season: z.literal("primary"),
  examDate: text,
  sourceIndexUrl: z.literal("https://www.shiken.or.jp/chief/second/qa/"),
  sourceAnswerUrl: z.url().startsWith("https://www.shiken.or.jp/"),
  sourceAnswerPdfSha256: hash,
  sourcePacketSha256: hash,
  questions: z.array(question).length(16),
}).strict();
const partialEdition = edition.safeExtend({
  excludedPrimaryHolds: z.array(z.string()).length(3),
  questions: z.array(question).length(11),
});

export type NativeQuestion = z.infer<typeof question>;
export type NativeSubject = NativeQuestion["subject"];
const normalize = (value: string) => value.replace(/[()（）]/g, "").normalize("NFKC");

function parseEdition(input: unknown, expectedYear: number): z.infer<typeof edition> {
  const parsed = edition.parse(input);
  if (parsed.year !== expectedYear || parsed.questions.length !== 16) throw new Error("Denken2 native edition mismatch");
  const expectedDate = expectedYear === 2026 ? "2026-08-30" : "2025-08-31";
  const expectedPacketSha = expectedYear === 2026
    ? "03f131de6d0b58bbfca2a395bef0a65bd6bf829688264c6f75419753103319e7"
    : "578baa876a3761d325d5b5069a4d1821c2f698694080695ba1c762b3f9b9f75f";
  if (parsed.examDate !== expectedDate || parsed.sourcePacketSha256 !== expectedPacketSha) {
    throw new Error("Denken2 native edition source mismatch");
  }
  for (const [subjectIndex, subject] of (["theory", "machine"] as const).entries()) {
    for (let number = 1; number <= 8; number += 1) {
      const q = parsed.questions[subjectIndex * 8 + number - 1];
      if (!q || q.year !== expectedYear || q.examDate !== expectedDate || q.subject !== subject || q.number !== number
        || q.id !== `denken2-${expectedYear}-primary-${subject}-q${String(number).padStart(2, "0")}`) {
        throw new Error(`Denken2 native original order mismatch: ${expectedYear} ${subject} Q${number}`);
      }
      const paired = expectedYear === 2026 && subject === "machine" && number === 7;
      if (q.slots.some((field, i) => field.slot !== i + 1 || ("officialDefinition" in field) !== paired)) {
        throw new Error(`Denken2 native answer field mismatch: ${q.id}`);
      }
      const groups = q.choiceGroups as Record<string, string | Record<string, string>>;
      if (paired) {
        const labels = Object.keys(groups);
        if (labels.length !== 3 || !labels[0]?.startsWith("A") || !labels[1]?.startsWith("B")
          || !labels[2]?.startsWith("C") || Object.values(groups).some(value => typeof value !== "object")) {
          throw new Error("Machine Q7 requires the original A/B/C tables");
        }
        const definitions = Object.keys(groups[labels[1]] as Record<string, string>).map(normalize);
        const units = Object.keys(groups[labels[2]] as Record<string, string>).map(normalize);
        for (const field of q.slots) {
          if (!("officialDefinition" in field) || !definitions.includes(normalize(field.officialDefinition))
            || !units.includes(normalize(field.officialUnit))) throw new Error("Machine Q7 official key missing from word bank");
        }
      } else if (expectedYear === 2025 && subject === "machine" && number === 8) {
        const banks = Object.entries(groups);
        if (banks.length !== 5 || banks.some(([label, bank], index) => label !== String(index + 1)
          || typeof bank !== "object" || Object.keys(bank).length !== 5)) {
          throw new Error("2025 machine Q8 requires five independent five-choice banks");
        }
        for (const field of q.slots) {
          const bank = groups[String(field.slot)] as Record<string, string>;
          if (!("officialAnswer" in field) || !Object.keys(bank).some(key => normalize(key) === normalize(field.officialAnswer))) {
            throw new Error("2025 machine Q8 official key missing from its own slot bank");
          }
        }
      } else {
        if (Object.keys(groups).length < 5 || Object.values(groups).some(value => typeof value !== "string")) {
          throw new Error(`Denken2 source word bank changed: ${q.id}`);
        }
        for (const field of q.slots) {
          if (!("officialAnswer" in field) || !Object.keys(groups).some(key => normalize(key) === normalize(field.officialAnswer))) {
            throw new Error(`Denken2 official answer missing from word bank: ${q.id}`);
          }
        }
      }
    }
  }
  const fields = parsed.questions.reduce((sum, q) => sum + (q.year === 2026 && q.subject === "machine" && q.number === 7 ? 10 : 5), 0);
  if (fields !== (expectedYear === 2026 ? 85 : 80)) throw new Error("Denken2 official answer field count mismatch");
  return parsed;
}

export const NATIVE_2026 = parseEdition(raw2026, 2026);
export const NATIVE_2025 = parseEdition(raw2025, 2025);
const GO_2025_POWER_LAW = partialEdition.parse(raw2025PowerLaw);
if (GO_2025_POWER_LAW.year !== 2025 || GO_2025_POWER_LAW.examDate !== NATIVE_2025.examDate
  || GO_2025_POWER_LAW.sourceIndexUrl !== NATIVE_2025.sourceIndexUrl
  || GO_2025_POWER_LAW.sourceAnswerUrl !== NATIVE_2025.sourceAnswerUrl
  || GO_2025_POWER_LAW.sourceAnswerPdfSha256 !== NATIVE_2025.sourceAnswerPdfSha256
  || GO_2025_POWER_LAW.sourcePacketSha256 !== "f0a20036710d21190064c6f2bb77a31db802488bdea0264bce42d69785ee3106"
  || GO_2025_POWER_LAW.excludedPrimaryHolds.join(",") !== "law-q03,law-q05,law-q06") {
  throw new Error("2025 power/law source or legal HOLD boundary changed");
}
const expectedPowerLaw = [...Array.from({ length: 7 }, (_, i) => ["power", i + 1] as const),
  ...[1, 2, 4, 7].map(number => ["law", number] as const)];
for (const [index, [subject, number]] of expectedPowerLaw.entries()) {
  const q = GO_2025_POWER_LAW.questions[index];
  if (!q || q.id !== `denken2-2025-primary-${subject}-q${String(number).padStart(2, "0")}`
    || q.subject !== subject || q.number !== number || q.year !== 2025 || q.examDate !== "2025-08-31"
    || q.alternateQuestionRule !== null || Object.keys(q.choiceGroups).length !== 15
    || Object.values(q.choiceGroups).some(value => typeof value !== "string")
    || q.slots.some((field, slot) => field.slot !== slot + 1 || !("officialAnswer" in field)
      || !Object.keys(q.choiceGroups).some(label => normalize(label) === normalize(field.officialAnswer)))) {
    throw new Error(`2025 power/law original or answer bank changed: ${subject} Q${number}`);
  }
}
export const NATIVE_EDITIONS = [NATIVE_2026, NATIVE_2025];
export const NATIVE_QUESTIONS = [...NATIVE_EDITIONS.flatMap(item => item.questions), ...GO_2025_POWER_LAW.questions];
export const nativeSubjectPath = (year: number, subject: NativeSubject) => `/denken2/${year}-primary/${subject}`;
export const nativeQuestionPath = (year: number, subject: NativeSubject, number: number) => `${nativeSubjectPath(year, subject)}/q${number}`;
export const nativeQuestionPaths = () => NATIVE_QUESTIONS.map(q => nativeQuestionPath(q.year, q.subject, q.number));
export const getNativeEdition = (year: number) => NATIVE_EDITIONS.find(item => item.year === year);
export const getNativeSubjectQuestions = (year: number, subject: NativeSubject) => NATIVE_QUESTIONS.filter(q => q.year === year && q.subject === subject);
export const getNativeQuestion = (year: number, subject: string, number: number) => NATIVE_QUESTIONS.find(q => q.year === year && q.subject === subject && q.number === number);
export const normalizeNativeChoiceLabel = normalize;
