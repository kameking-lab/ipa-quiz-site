import type { ChoiceKey, Question } from "@/lib/questions/types";

const CHOICE_KEYS = new Set<ChoiceKey>(["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "コ"]);
const MIN_REASON_LENGTH = 40;

type ChoiceExplanationOverlay = Record<string, Record<string, string>>;

/**
 * 原文・公式正答から独立した全肢解説を問題へ重ねる。
 * 壊れた生成物を黙って公開しないため、肢の過不足と短文は読込時に拒否する。
 */
export function applyChoiceExplanationOverlay(
  questions: Question[],
  rawOverlay: unknown,
): Question[] {
  if (typeof rawOverlay !== "object" || rawOverlay === null || Array.isArray(rawOverlay)) {
    throw new Error("choice explanation overlay must be an object");
  }

  const overlay = rawOverlay as ChoiceExplanationOverlay;
  const knownIds = new Set(questions.map((question) => question.id));
  for (const id of Object.keys(overlay)) {
    if (!knownIds.has(id)) throw new Error(`orphan choice explanation: ${id}`);
  }

  return questions.map((question) => {
    const candidate = overlay[question.id];
    if (!candidate) return question;
    if (question.type !== "multiple-choice" || !question.choices) {
      throw new Error(`choice explanation targets a non-choice question: ${question.id}`);
    }

    const choiceKeys = Object.keys(question.choices).sort();
    const explanationKeys = Object.keys(candidate).sort();
    if (choiceKeys.join(",") !== explanationKeys.join(",")) {
      throw new Error(`choice explanation keys differ from choices: ${question.id}`);
    }

    const choiceExplanations: Partial<Record<ChoiceKey, string>> = {};
    for (const key of choiceKeys) {
      if (!CHOICE_KEYS.has(key as ChoiceKey)) {
        throw new Error(`unsupported choice key: ${question.id}/${key}`);
      }
      const reason = candidate[key];
      if (typeof reason !== "string" || reason.trim().length < MIN_REASON_LENGTH) {
        throw new Error(`short choice explanation: ${question.id}/${key}`);
      }
      choiceExplanations[key as ChoiceKey] = reason.trim();
    }

    return { ...question, choiceExplanations };
  });
}
