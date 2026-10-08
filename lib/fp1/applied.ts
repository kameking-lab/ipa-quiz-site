import { z } from "zod";
import raw from "@/data/questions/fp1/applied-2026-may.json";

const text = z.string().min(1);
const person = z.object({
  label: text, birthAndAge: text, pensionHeading: text,
  pensionPeriods: z.array(text).min(1), otherInsurance: z.array(text).min(1),
}).strict();
const blank = <T extends string>(label: T) => z.object({
  label: z.literal(label), officialAnswer: text, explanation: text,
}).strict();
const choice = <T extends string>(label: T) => z.object({
  label: z.literal(label), text, correct: z.boolean(), explanation: text,
}).strict();

const calculationAnswer = <T extends string>(label: T) => z.object({
  label: z.literal(label), officialAnswer: text,
  calculationSteps: z.array(text).min(1), explanation: text,
}).strict();
const sharedCase = z.object({
      number: z.literal(1), instruction: text, paragraphs: z.array(text).min(1),
      dataHeading: text, persons: z.tuple([person, person]), conditions: z.array(text).min(1),
    }).strict();

/** The official mixed cloze format stays separate from the MCQ question pool. */
export const fp1AppliedEditionSchema = z.object({
  edition: z.literal("202605"), examDate: z.literal("2026-05-24"), label: text,
  lawReferenceDate: z.literal("2025-10-01"),
  sourceQuestionUrl: z.string().url(), sourceAnswerUrl: z.string().url(),
  sourceIndexUrl: z.string().url(), sourceAnswerIndexUrl: z.string().url(),
  reuseConditionsUrl: z.string().url(), sourceAttribution: text, processingDisclosure: text,
  questions: z.tuple([z.object({
    id: z.literal("fp1-2026-may-applied-q51"), type: z.literal("originalcloze"),
    number: z.literal(51), title: text,
    sourcePages: z.tuple([z.literal(3), z.literal(4)]),
    sourcePrintedPages: z.tuple([z.literal(2), z.literal(3)]), sourceAnswerPage: z.literal(2),
    sharedCase,
    instruction: text, paragraphs: z.array(text).min(1), choicesHeading: text,
    blanks: z.tuple([blank("①"), blank("②"), blank("③"), blank("④")]),
    choicesForBlank4: z.tuple([choice("イ"), choice("ロ"), choice("ハ")]),
    officialReferenceUrls: z.array(z.string().url()).min(1),
  }).strict().refine((question) => {
    const correct = question.choicesForBlank4.filter((item) => item.correct);
    return correct.length === 1 && correct[0]?.label === question.blanks[3].officialAnswer;
  }, { message: "空欄④の公式正答と元の3肢が一致する必要があります" }), z.object({
    id: z.literal("fp1-2026-may-applied-q52"), type: z.literal("originalcalculation"),
    number: z.literal(52), title: text,
    sourcePages: z.tuple([z.literal(3), z.literal(5)]),
    sourcePrintedPages: z.tuple([z.literal(2), z.literal(4)]), sourceAnswerPage: z.literal(2),
    sharedCase, instruction: text, paragraphs: z.array(text).min(1),
    prompts: z.tuple([z.object({ label: z.literal("①"), text }).strict(), z.object({ label: z.literal("②"), text }).strict()]),
    conditions: z.array(z.object({ heading: text, lines: z.array(text).min(1) }).strict()).length(5),
    answers: z.tuple([calculationAnswer("①"), calculationAnswer("②")]),
    sourceAttribution: text, processingDisclosure: text,
    references: z.array(z.object({ label: text, url: z.string().url() }).strict()).min(1),
  }).strict(), z.object({
    id: z.literal("fp1-2026-may-applied-q53"), type: z.literal("originalnumericcloze"),
    number: z.literal(53), title: text,
    sourcePages: z.tuple([z.literal(3), z.literal(6)]),
    sourcePrintedPages: z.tuple([z.literal(2), z.literal(5)]), sourceAnswerPage: z.literal(2),
    sharedCase, instruction: text,
    sections: z.tuple([
      z.object({ heading: text, number: z.literal("Ⅰ"), paragraphs: z.array(text).length(2) }).strict(),
      z.object({ heading: text, number: z.literal("Ⅱ"), paragraphs: z.array(text).length(3) }).strict(),
    ]),
    blanks: z.tuple([blank("①"), blank("②"), blank("③"), blank("④"), blank("⑤"), blank("⑥"), blank("⑦")]),
    sourceAttribution: text, processingDisclosure: text,
    references: z.array(z.object({ label: text, url: z.string().url() }).strict()).min(1),
  }).strict()]),
}).strict();

export type Fp1AppliedEdition = z.infer<typeof fp1AppliedEditionSchema>;
export type Fp1AppliedQuestion = Fp1AppliedEdition["questions"][number];

const MAY_EDITION = fp1AppliedEditionSchema.parse(raw);
export const FP1_APPLIED_EDITIONS = [MAY_EDITION.edition] as const;

export function getFp1AppliedEdition(edition: string): Fp1AppliedEdition | null {
  return edition === MAY_EDITION.edition ? MAY_EDITION : null;
}

export function fp1AppliedQuestionPath(edition: string, number: number): string {
  return `/fp1/applied/${edition}/${number}`;
}
