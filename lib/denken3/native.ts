import { z } from "zod";
import native_2021_annual_machine from "@/data/questions/denken3/native-2021-annual-machine.json";
import native_2021_annual_power from "@/data/questions/denken3/native-2021-annual-power.json";
import native_2021_annual_theory from "@/data/questions/denken3/native-2021-annual-theory.json";
import native_2021_primary_law from "@/data/questions/denken3/native-2021-primary-law.json";
import native_2022_lower_law from "@/data/questions/denken3/native-2022-lower-law.json";
import native_2022_lower_machine from "@/data/questions/denken3/native-2022-lower-machine.json";
import native_2022_lower_power from "@/data/questions/denken3/native-2022-lower-power.json";
import native_2022_lower_theory from "@/data/questions/denken3/native-2022-lower-theory.json";
import native_2022_upper_law from "@/data/questions/denken3/native-2022-upper-law.json";
import native_2022_upper_machine from "@/data/questions/denken3/native-2022-upper-machine.json";
import native_2022_upper_power from "@/data/questions/denken3/native-2022-upper-power.json";
import native_2022_upper_theory from "@/data/questions/denken3/native-2022-upper-theory.json";
import native_2023_lower_law from "@/data/questions/denken3/native-2023-lower-law.json";
import native_2023_lower_machine from "@/data/questions/denken3/native-2023-lower-machine.json";
import native_2023_lower_power from "@/data/questions/denken3/native-2023-lower-power.json";
import native_2023_lower_theory from "@/data/questions/denken3/native-2023-lower-theory.json";
import native_2023_upper_law from "@/data/questions/denken3/native-2023-upper-law.json";
import native_2023_upper_machine from "@/data/questions/denken3/native-2023-upper-machine.json";
import native_2023_upper_power from "@/data/questions/denken3/native-2023-upper-power.json";
import native_2023_upper_theory from "@/data/questions/denken3/native-2023-upper-theory.json";
import native_2026_upper_law_completion from "@/data/questions/denken3/native-2026-upper-law-completion.json";
import theory2026 from "@/data/questions/denken3/native-2026-upper-theory.json";
import power2026 from "@/data/questions/denken3/native-2026-upper-power.json";
import law2026 from "@/data/questions/denken3/native-2026-upper-law.json";
import law2025 from "@/data/questions/denken3/native-2025-lower-law.json";
import nextPower2026 from "@/data/questions/denken3/native-2026-upper-power-next.json";
import nextMachine2026 from "@/data/questions/denken3/native-2026-upper-machine-next.json";
import nextLaw2026 from "@/data/questions/denken3/native-2026-upper-law-next.json";
import nextLaw2025 from "@/data/questions/denken3/native-2025-lower-law-next.json";
import nextPower2025 from "@/data/questions/denken3/native-2025-lower-power-next.json";
import followMachine2026 from "@/data/questions/denken3/native-2026-upper-machine-follow.json";
import followTheory2025 from "@/data/questions/denken3/native-2025-lower-theory-follow.json";
import followMachine2025 from "@/data/questions/denken3/native-2025-lower-machine-follow.json";
import followPower2025 from "@/data/questions/denken3/native-2025-lower-power-follow.json";
import { DENKEN3_QUESTIONS } from "@/data/questions/denken3";

const nonempty = z.string().trim().min(1);
const hash = z.string().regex(/^[a-f0-9]{64}$/);
const choiceBank = z.record(z.string().regex(/^[1-5]$/), nonempty);
const sourcePage = z.object({ physicalPage: z.number().int().positive(), url: z.string().startsWith("/images/denken3/"), sha256: hash }).strict();
const field = z.object({ slot: z.number().int().min(1).max(2), prompt: z.string(), officialAnswer: z.string().regex(/^[1-5]$/), explanation: nonempty, derivation: z.string(), choiceExplanations: choiceBank }).strict();
const question = z.object({
  id: z.string().regex(/^denken3-20\d\d-(upper|lower|annual|primary)-(theory|power|machine|law)-q\d\d$/),
  year: z.number().int(), sitting: z.string().regex(/^20\d\d-(upper|lower|annual|primary)$/), examDate: nonempty,
  subject: z.enum(["theory", "power", "machine", "law"]), number: z.number().int().min(1).max(18),
  topic: nonempty, questionText: nonempty,
  choiceGroups: z.union([choiceBank, z.record(nonempty, choiceBank)]),
  slots: z.array(field).min(1).max(2), figures: z.array(nonempty),
  sourcePages: z.array(sourcePage).min(1), sourcePdfUrl: z.url().startsWith("https://www.shiken.or.jp/"),
  sourcePdfSha256: hash, alternateQuestionRule: nonempty.nullable(), reviewedSha256: hash,
}).strict();
const part = z.object({
  sitting: z.string().regex(/^20\d\d-(upper|lower|annual|primary)$/), examDate: nonempty,
  subject: z.enum(["theory", "power", "machine", "law"]),
  sourceIndexUrl: z.literal("https://www.shiken.or.jp/chief/third/qa/"),
  sourceAnswerUrl: z.url().startsWith("https://www.shiken.or.jp/"),
  sourceAnswerPdfSha256: hash, sourcePacketSha256: hash,
  sourcePacketSha256ByRange: z.array(hash).min(1).optional(),
  questions: z.array(question).min(1),
}).strict();
export type Denken3NativeQuestion = z.infer<typeof question>;
const expected = [
  { sitting: "2026-upper", examDate: "2026-08-30", subject: "theory", numbers: Array.from({ length: 18 }, (_, i) => i + 1), fields: 22, packet: "99148d0be5116dcadd6f41e545d72ac121ac6df7d073b0d611784ccf049361a2" },
  { sitting: "2026-upper", examDate: "2026-08-30", subject: "power", numbers: Array.from({ length: 8 }, (_, i) => i + 1), fields: 8, packet: "efdb7910f564804d084d461154c5b9868074f6c6a89a8802661a9bcbd69fd848" },
  { sitting: "2026-upper", examDate: "2026-08-30", subject: "law", numbers: [1, 2, 3, 5, 8], fields: 5, packet: "b050d760ca6c0602a53f11822167cbdad6f980fe63ca581b34ffd27af7bced15" },
  { sitting: "2025-lower", examDate: "2026-03-22", subject: "law", numbers: [1, 2, 3, 5, 8], fields: 5, packet: "4f5d4b81c0f3eecd4d395ebaa2944e9295905c975986b8fac8326270b144ebf2" },
  { sitting: "2026-upper", examDate: "2026-08-30", subject: "power", numbers: [9, 10, 11, 12, 13, 14, 15, 16, 17], fields: 12, packet: "0918f2a4958e4e6d6a6abd5bb3c9c885ea41a48036398b985548eff042078e5b" },
  { sitting: "2026-upper", examDate: "2026-08-30", subject: "machine", numbers: [1, 2, 3, 4, 5, 6, 7, 8], fields: 8, packet: "e66f600c732c12d774370dde346bff0e2a4838def988800b76d56704def7fc45" },
  { sitting: "2026-upper", examDate: "2026-08-30", subject: "law", numbers: [11, 12, 13], fields: 6, packet: "3ae9e57ee1e17dae13255bf2dc902232d0025b9616d87093771e3b5fc78d8905" },
  { sitting: "2025-lower", examDate: "2026-03-22", subject: "law", numbers: [10, 11, 13], fields: 5, packet: "115faea0636f27159b30ae94bbcdeb604378eb121246edc6ee7db8bb0b006783" },
  { sitting: "2025-lower", examDate: "2026-03-22", subject: "power", numbers: [2, 3, 4, 5, 6, 7, 8], fields: 7, packet: "41b5a81b7086fa93c2f761c72501752eb046ac500769d04bce02da2f81e401a4" },
  { sitting: "2026-upper", examDate: "2026-08-30", subject: "machine", numbers: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18], fields: 14, packet: "6caba4e531c2f8b9ce7cbf0686f9a19aa7e63b470dc8859889f9e71a84d1eb28" },
  { sitting: "2025-lower", examDate: "2026-03-22", subject: "theory", numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], fields: 22, packet: "64bf57dd86f509f447bf6765d80ce832b50f6c87ce5f0b0ab96dc80888ade154" },
  { sitting: "2025-lower", examDate: "2026-03-22", subject: "machine", numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], fields: 22, packet: "64bf57dd86f509f447bf6765d80ce832b50f6c87ce5f0b0ab96dc80888ade154" },
  { sitting: "2025-lower", examDate: "2026-03-22", subject: "power", numbers: [9, 10, 11, 12, 13, 14, 15, 16, 17], fields: 12, packet: "a9980c1c7482214ddbf3522b604e6844787406d8518cb3d1305a1dcea0385b3f" },
  { sitting: "2021-annual", examDate: "2021-08-22", subject: "machine", numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], fields: 22, packet: "29ab00786ba1281d5b05ca353938af4cd440d7a955710c6398dc13134aee47ab" },
  { sitting: "2021-annual", examDate: "2021-08-22", subject: "power", numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], fields: 20, packet: "a2b90e82cc1842dfda3c8a9b3238c935fbaed889358080d4648e8845f9fb4a37" },
  { sitting: "2021-annual", examDate: "2021-08-22", subject: "theory", numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], fields: 22, packet: "ddd5cfe7cb0687a448dc3c03076726d85d457504139a331c2d1031eb41f93da3" },
  { sitting: "2021-primary", examDate: "2021-08-22", subject: "law", numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], fields: 16, packet: "64cfd4b104762325195d71cdbfd42ba84915515348ffb2e60e85f870883a0f69" },
  { sitting: "2022-lower", examDate: "2023-03-26", subject: "law", numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], fields: 16, packet: "e1a937532e497d36278b9add4b2e90481b5cd5068bb15399c260240b076f2eee" },
  { sitting: "2022-lower", examDate: "2023-03-26", subject: "machine", numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], fields: 22, packet: "bb696e4af913f127874bb529a55b62a81203abf24787d389abdf62d5220b9b0b" },
  { sitting: "2022-lower", examDate: "2023-03-26", subject: "power", numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], fields: 20, packet: "cdb5fca6bf0b2711af016c3cc1344d1e8c1c56d21175b66138aa94c9705562d5" },
  { sitting: "2022-lower", examDate: "2023-03-26", subject: "theory", numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], fields: 22, packet: "513c0e9dfc943687ba7b87700713da589765a474b8e47447d734d37a34b09748" },
  { sitting: "2022-upper", examDate: "2022-08-21", subject: "law", numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], fields: 16, packet: "43637ac7e9ddd69e37fd2ceb98f55a575d367abfd8f5f27fe0b396885f8f291b" },
  { sitting: "2022-upper", examDate: "2022-08-21", subject: "machine", numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], fields: 22, packet: "19eb5f8cd2a7877469d62fadde8fd5968774549b9a8158d28c6ba1144c3ed560" },
  { sitting: "2022-upper", examDate: "2022-08-21", subject: "power", numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], fields: 20, packet: "a5187af589db697d2a33986dab75e7373abfd434a80b1fb8d6c501b3754b4f86" },
  { sitting: "2022-upper", examDate: "2022-08-21", subject: "theory", numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], fields: 22, packet: "0dfce01ba80974d8606a2ae1b718c752754fac900c04cfcf80d9940084b3b843" },
  { sitting: "2023-lower", examDate: "2024-03-24", subject: "law", numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], fields: 16, packet: "aacd3f379738d6dde4e3436bdef7255a9b50b88a7db9ca3627eee68ae62d6d9b" },
  { sitting: "2023-lower", examDate: "2024-03-24", subject: "machine", numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], fields: 22, packet: "5266278bcc263bb902203777fba9b9d602ff0f0c8b91ccee8dfc3a639d5de26d" },
  { sitting: "2023-lower", examDate: "2024-03-24", subject: "power", numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], fields: 20, packet: "e04f17974cc55f1dd2fff8355e40ba3e393d689e83013dbd17d482be6e95efb6" },
  { sitting: "2023-lower", examDate: "2024-03-24", subject: "theory", numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], fields: 22, packet: "bab6c08ac4becacbfd4302ccd74e7e9722c6675753dac297e85ab17533d37332" },
  { sitting: "2023-upper", examDate: "2023-08-20", subject: "law", numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], fields: 16, packet: "00972f44c904ed98de580772a3766e6da5567b3700f4e8b3f1058e3e0ce16567" },
  { sitting: "2023-upper", examDate: "2023-08-20", subject: "machine", numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], fields: 22, packet: "6cdfadac3cbbd9091126cd2f59c3b87e48c0dc0d4d95c5f030227566093ba9d1" },
  { sitting: "2023-upper", examDate: "2023-08-20", subject: "power", numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], fields: 20, packet: "2676d7b18497d66fb0ae48bb5b2ceeab2d59389fcffabd2e9f86ad654e8461e9" },
  { sitting: "2023-upper", examDate: "2023-08-20", subject: "theory", numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], fields: 22, packet: "c987eae26689655b4556d4a650d28c5c1c8e7884fc0475b4595a5fbd4a7bd0bc" },
  { sitting: "2026-upper", examDate: "2026-08-30", subject: "law", numbers: [4, 6, 7, 9, 10], fields: 5, packet: "f2214e141856468ee64c4bd12a8918bb0779541c7375b43297cb3ec95e122c9a" },
] as const;
function parsePart(raw: unknown, rule: (typeof expected)[number]) {
  const item = part.parse(raw);
  const date = rule.examDate;
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
    if (q.slots.length !== (number >= 15 && (rule.subject === "theory" || rule.subject === "power" || rule.subject === "machine") || number >= 11 && rule.subject === "law" ? 2 : 1)) throw new Error(`Denken3 source field mismatch: ${q.id}`);
    for (const [fieldIndex, slot] of q.slots.entries()) {
      const bank = groups[groups.length === 1 ? 0 : fieldIndex];
      if (!bank || Object.keys(bank).length !== 5 || slot.slot !== fieldIndex + 1
        || !bank[slot.officialAnswer] || Object.keys(slot.choiceExplanations).length !== 5
        || Object.keys(slot.choiceExplanations).some(label => !bank[label])) {
        throw new Error(`Denken3 official choice mismatch: ${q.id} (${fieldIndex + 1})`);
      }
    }
    if (Boolean(q.alternateQuestionRule) !== ((rule.subject === "theory" || rule.subject === "machine") && (number === 17 || number === 18))) {
      throw new Error(`Denken3 alternative rule mismatch: ${q.id}`);
    }
  }
  if (item.questions.reduce((sum, q) => sum + q.slots.length, 0) !== rule.fields) throw new Error(`Denken3 source field count mismatch: ${rule.sitting}`);
  return item;
}
const raws: unknown[] = [theory2026, power2026, law2026, law2025, nextPower2026, nextMachine2026, nextLaw2026, nextLaw2025, nextPower2025, followMachine2026, followTheory2025, followMachine2025, followPower2025, native_2021_annual_machine, native_2021_annual_power, native_2021_annual_theory, native_2021_primary_law, native_2022_lower_law, native_2022_lower_machine, native_2022_lower_power, native_2022_lower_theory, native_2022_upper_law, native_2022_upper_machine, native_2022_upper_power, native_2022_upper_theory, native_2023_lower_law, native_2023_lower_machine, native_2023_lower_power, native_2023_lower_theory, native_2023_upper_law, native_2023_upper_machine, native_2023_upper_power, native_2023_upper_theory, native_2026_upper_law_completion];
export const DENKEN3_NATIVE_PARTS = raws.map((raw, index) => parsePart(raw, expected[index]!));
export const DENKEN3_NATIVE_QUESTIONS = DENKEN3_NATIVE_PARTS.flatMap(item => item.questions);
if (new Set(DENKEN3_NATIVE_QUESTIONS.map(q => q.id)).size !== DENKEN3_NATIVE_QUESTIONS.length) throw new Error("Denken3 native original count mismatch");
const subjectMap: Record<string, string> = { riron: "theory", denryoku: "power", kikai: "machine", houki: "law" };
const sittingMap: Record<string, string> = { first: "upper", second: "lower" };
const identity = (year: number, sitting: string, subject: string, number: number) =>
  [year, sitting === "annual" ? "primary" : sitting, subject, number].join(":");
const old = new Set(DENKEN3_QUESTIONS.map(q => identity(
  q.year, sittingMap[q.season] ?? q.season, subjectMap[q.session] ?? q.session, q.qNumber,
)));
const combined = new Set(old);
for (const q of DENKEN3_NATIVE_QUESTIONS) {
  combined.add(identity(q.year, q.sitting.split("-")[1]!, q.subject, q.number));
}
export const DENKEN3_PUBLISHED_ORIGINAL_COUNT = combined.size;
export const DENKEN3_NEW_ORIGINAL_COUNT = combined.size - old.size;
export const DENKEN3_NATIVE_SUBJECTS = [...new Set(DENKEN3_NATIVE_PARTS.map(p => `${p.sitting}:${p.subject}`))].map(key => {
  const [sitting, subject] = key.split(":");
  return getDenken3NativePart(sitting!, subject)!;
});
export const denken3NativeSubjectPath = (sitting: string, subject: string) => `/denken3/${sitting}/${subject}`;
export function denken3NativeSittingLabel(sitting: string) {
  const [year, term] = sitting.split("-");
  return `${year}年度${term === "upper" ? "上期" : term === "lower" ? "下期" : ""}`;
}
export const denken3NativeQuestionPath = (sitting: string, subject: string, number: number) => `${denken3NativeSubjectPath(sitting, subject)}/q${number}`;
export const denken3NativeQuestionPaths = () => DENKEN3_NATIVE_QUESTIONS.map(q => denken3NativeQuestionPath(q.sitting, q.subject, q.number));
export function getDenken3NativePart(sitting: string, subject: string) {
  const matching = DENKEN3_NATIVE_PARTS.filter(p => p.sitting === sitting && p.subject === subject);
  return matching.length ? { ...matching[0]!, questions: matching.flatMap(p => p.questions).sort((a, b) => a.number - b.number) } : undefined;
}
export const getDenken3NativeQuestions = (sitting: string, subject: string) => DENKEN3_NATIVE_QUESTIONS.filter(q => q.sitting === sitting && q.subject === subject);
export const getDenken3NativeQuestion = (sitting: string, subject: string, number: number) => DENKEN3_NATIVE_QUESTIONS.find(q => q.sitting === sitting && q.subject === subject && q.number === number);
