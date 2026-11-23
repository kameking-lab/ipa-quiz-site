import { expect } from "vitest";
import { KANGOSHI_QUESTIONS } from "@/data/questions/kangoshi";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { Question } from "@/lib/questions/types";

const completionKeys = new Map<string, string>([
  ["kangoshi-2024-annual-am-q98", "3"],
  ["kangoshi-2024-annual-am-q112", "35"],
  ["kangoshi-2024-annual-pm-q38", "1"],
  ["kangoshi-2024-annual-pm-q60", "2"],
  ["kangoshi-2024-annual-pm-q62", "3"],
  ["kangoshi-2024-annual-pm-q70", "3"],
  ["kangoshi-2024-annual-pm-q89", "24"],
  ["kangoshi-2024-annual-pm-q113", "1"],
  ["kangoshi-2025-annual-am-q79", "5"],
  ["kangoshi-2025-annual-am-q103", "2"],
  ["kangoshi-2025-annual-pm-q7", "2"],
  ["kangoshi-2025-annual-pm-q77", "4"],
  ["kangoshi-2025-annual-pm-q82", "35"],
  ["kangoshi-2025-annual-pm-q87", "34"],
  ["kangoshi-2025-annual-pm-q88", "14"],
]);

export const KANGOSHI_BEFORE_COMPLETION = KANGOSHI_QUESTIONS.filter(question =>
  (question.year === 2024 || question.year === 2025) && !completionKeys.has(question.id),
);

export function expectKangoshiCompletion(): void {
  const current = KANGOSHI_QUESTIONS.filter(question => question.year === 2024 || question.year === 2025);
  expect(current).toHaveLength(479);
  for (const [year, session, count] of [[2024, "am", 120], [2024, "pm", 120], [2025, "am", 119], [2025, "pm", 120]] as const) {
    expect(current.filter(question => question.year === year && question.session === session)).toHaveLength(count);
  }
  for (const [id, key] of completionKeys) {
    const originals = current.filter(question => question.id === id);
    expect(originals, id).toHaveLength(1);
    const original = originals[0]!;
    expect(original.officialAnswerNumber, id).toBe(key);
    expect(original.sourceAnswerUrl, id).toContain(original.year === 2024 ? "tp250428-05seitou.pdf" : "tp260424-05seitou.pdf");
    expect(isPracticeReadyQuestion(original), id).toBe(true);
  }
  expect(current.some(question => question.id === "kangoshi-2025-annual-am-q32")).toBe(false);
}

export function beforeNurseSourceLineBreak(question: Question | undefined): Question | undefined {
  if (question?.id !== "kangoshi-2024-annual-pm-q45") return question;
  const originalStem = "成人の心肺蘇生法における圧迫部位を図に示す。\n正しいのはどれか。";
  expect(question.question).toBe(originalStem.replace("\n", "\n\n"));
  return { ...question, question: originalStem };
}
