import type { Question } from "@/lib/questions/types";
import residualEight from "./residual-eight-corrections-20261014.json";

const patches: Record<string, Partial<Pick<Question,
  "question" | "choices" | "explanation" | "choiceExplanations" | "imageUrls"
>>> = residualEight;
const exactIDs = new Set(Object.keys(patches));
if (exactIDs.size !== 8) throw new Error("ST residual eight scope mismatch");

export function applyResidualEight(questions: Question[]): Question[] {
  let applied = 0;
  const result = questions.map((question) => {
    const patch = patches[question.id];
    if (patch === undefined) return question;
    applied++;
    return { ...question, ...patch };
  });
  if (applied !== 8) throw new Error("ST residual eight target mismatch");
  return result;
}
