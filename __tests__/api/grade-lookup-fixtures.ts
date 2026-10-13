import { AP_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/ap";
import { ALL_ESSAY_QUESTIONS } from "@/data/questions/essay";
import type { AfternoonQuestion } from "@/lib/afternoon/types";

// Isolate grader internals in tests. Production lookups still hide every original question.
export function findPublishedAfternoonFixture(id: string): AfternoonQuestion | undefined {
  const question = AP_AFTERNOON_QUESTIONS.find((item) => item.id === id);
  return question ? { ...question, license: "IPA-public" } : undefined;
}

export function findPublishedEssayFixture(id: string) {
  const question = ALL_ESSAY_QUESTIONS.find((item) => item.id === id);
  return question ? { ...question, license: "IPA-public" } : undefined;
}
