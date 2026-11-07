import { ENERGY_KANRI_STAGED_QUESTIONS, type StagedEnergyKanriQuestion } from "@/data/questions/energy-kanri";
import { isAcceptedAnswer, isCompleteSelectionCorrect } from "@/lib/questions/answers";
import { normalizeNumericAnswer } from "@/lib/questions/numeric";
import excluded from "./excluded-items.json";
import answers from "./official-answers.json";

/** 全員正解欄に架空の正答を付与しない。通常の演習レジストリとは別の型で扱う。 */
export type EnergyKanriAllCorrectQuestion = Omit<typeof excluded[number], "scoring"> & {
  scoring: "all-correct";
  answer?: never;
};

type OfficialSlot = { label: string; points: number };
export type RegisteredEnergyKanriItem = {
  officialSlots: readonly OfficialSlot[];
} & (
  | { scoring: "answer"; question: StagedEnergyKanriQuestion }
  | { scoring: "all-correct"; question: EnergyKanriAllCorrectQuestion }
);

function officialSlots(question: { year: number; qNumber: number; sourcePdfUrl: string; officialAnswerNumber?: string }): OfficialSlot[] {
  const packet = Number(question.sourcePdfUrl.match(/r0[78]_(\d)\.pdf#/)?.[1]);
  const original = answers.find((table) => table.year === question.year && table.packet === packet)
    ?.questions.find((item) => item.questionNumber === question.qNumber);
  return (question.officialAnswerNumber ?? "").split(",").map((label) => {
    const slot = original?.slots.find((item) => item.label === label);
    if (!slot || !Number.isFinite(slot.points)) throw new Error(`Missing official slot: ${question.year}/${packet}/${question.qNumber}/${label}`);
    return { label, points: slot.points };
  });
}

/** 未公開の全件登録。公開資格コード・公開ルートへは接続しない。 */
export const ENERGY_KANRI_REGISTRATION = {
  slug: "energy-kanri",
  status: "ready-to-ingest",
  publicAllowed: false,
  records: [
    ...ENERGY_KANRI_STAGED_QUESTIONS.map((question): RegisteredEnergyKanriItem => ({
      scoring: "answer", question, officialSlots: officialSlots(question),
    })),
    ...excluded.map((item): RegisteredEnergyKanriItem => ({
      scoring: "all-correct", question: { ...item, scoring: "all-correct" }, officialSlots: officialSlots(item),
    })),
  ] as readonly RegisteredEnergyKanriItem[],
} as const;

/** 順序不問の統合欄は従来どおり全体一致。全員正解欄は未回答も満点とする。 */
export function scoreEnergyKanriItem(record: RegisteredEnergyKanriItem, response?: string | readonly string[]) {
  const maxPoints = record.officialSlots.reduce((sum, slot) => sum + slot.points, 0);
  let correct: boolean;
  if (record.scoring === "all-correct") {
    correct = true;
  } else {
    const question = record.question;
    if (question.type === "numeric") {
      const normalized = typeof response === "string" ? normalizeNumericAnswer(response, question.numericAnswer) : undefined;
      correct = normalized !== undefined && normalized === question.answer;
    } else if ((question.requiredSelections ?? 1) > 1) {
      correct = Array.isArray(response) && isCompleteSelectionCorrect(question.answer, response, question.requiredSelections);
    } else {
      const selected = typeof response === "string" ? response : response?.length === 1 ? response[0] : undefined;
      correct = isAcceptedAnswer(question.answer, selected);
    }
  }
  return { correct, earnedPoints: correct ? maxPoints : 0, maxPoints };
}
