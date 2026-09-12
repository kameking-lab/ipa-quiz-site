import type { ExamQuestion, ExamQuestionPresentation } from "./exam-library-model";

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** A display overlay can never change the official answer or canonical source text. */
export function parseExamPresentation(raw: unknown, question: ExamQuestion, sourceHash: string): ExamQuestionPresentation | null {
  if (!record(raw)) return null;
  const value = raw[question.id];
  if (!record(value) || value.sourceHash !== sourceHash || typeof value.prompt !== "string" || !value.prompt.trim()) return null;
  if (!Array.isArray(value.choices) || value.choices.length !== question.choiceCount || !Array.isArray(value.figures)) return null;
  const choices: ExamQuestionPresentation["choices"] = [];
  for (const [index, choice] of value.choices.entries()) {
    if (!record(choice) || choice.number !== index + 1 || typeof choice.text !== "string" || !choice.text.trim()) return null;
    choices.push({ number: index + 1, text: choice.text });
  }
  const figures: ExamQuestionPresentation["figures"] = [];
  for (const figure of value.figures) {
    if (!record(figure) || typeof figure.src !== "string" || !/^\/exam-library\/[A-Za-z0-9-]+\/text-[A-Za-z0-9-]+\.webp$/.test(figure.src) || typeof figure.alt !== "string" || typeof figure.width !== "number" || figure.width <= 0 || typeof figure.height !== "number" || figure.height <= 0) return null;
    figures.push({ src: figure.src, alt: figure.alt, width: figure.width, height: figure.height });
  }
  return { sourceHash, prompt: value.prompt, choices, figures };
}
