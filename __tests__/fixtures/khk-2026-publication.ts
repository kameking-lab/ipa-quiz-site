import { expect } from "vitest";
import type { Question } from "@/lib/questions/types";

export function expectPublishedKhk2026(staged: readonly Question[], pool: readonly Question[]): void {
  const released = new Map(pool.map(question => [question.id, question]));
  for (const original of staged) {
    const id = original.exam === "khk-reito-2" && original.session === "gakushiki"
      ? original.id.replace("-gakushiki-", "-kogaku-")
      : original.id;
    const question = released.get(id);
    expect(question, id).toBeDefined();
    expect(question?.qNumber, id).toBe(original.qNumber);
    expect(question?.answer, id).toEqual(original.answer);
    expect(question?.choices, id).toEqual(original.choices);
    expect(question?.officialAnswerNumber, id).toBe(original.officialAnswerNumber);
    expect(question?.sourcePdfUrl?.split("#")[0], id).toBe(original.sourcePdfUrl?.split("#")[0]);
    expect(question?.sourceAnswerUrl, id).toBe(original.sourceAnswerUrl);
  }
}
