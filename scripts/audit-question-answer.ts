import type { Question } from "@/lib/questions/types";
import { nativeBQuestionIssue } from "@/lib/questions/native-b";

interface AnswerFinding {
  category: "missing-field" | "native-b-invalid";
  message: string;
}

/** Native originals store answers in their five slots; legacy types keep answer. */
export function auditQuestionAnswer(question: Question): AnswerFinding[] {
  if (question.type === "native-b") {
    const issue = nativeBQuestionIssue(question);
    return issue ? [{ category: "native-b-invalid", message: `native-b 契約不正: ${issue}` }] : [];
  }

  const answer = question.answer;
  if (answer === undefined || answer === null || (typeof answer === "string" && answer.trim() === "")) {
    return [{ category: "missing-field", message: "必須フィールド欠落: answer" }];
  }
  return [];
}
