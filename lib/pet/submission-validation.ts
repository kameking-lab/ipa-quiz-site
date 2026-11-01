import { petLearningSubmissionSchema } from "./client/learning-submission-contracts";
import type { PetLearningSubmissionContext } from "./client/submission-router-contracts";
import { petRewardReferenceSchema } from "./reward-contracts";
import { getChoiceKeys, isAcceptedAnswer, isCompleteSelectionCorrect, requiredSelectionCount } from "@/lib/questions/answers";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { gradeNativeB } from "@/lib/questions/native-b";
import { isNumericAnswerCorrect, normalizeNumericAnswer } from "@/lib/questions/numeric";
import { isOrderingAnswerComplete, isOrderingAnswerCorrect } from "@/lib/questions/ordering";
import type { ChoiceKey } from "@/lib/questions/types";
import { gradeExamAnswer, isValidChoice } from "@/lib/exam-library-model";
import { isExamReferenceOnly } from "@/lib/exam-library/survey-assistant-reference-policy";

/** Device-only validation against the actually rendered context. The server
 * independently loads canonical content; this result is never account authority. */
export function validateLocalPetLearningSubmission(input: unknown, context: PetLearningSubmissionContext) {
  try {
    const parsed = petLearningSubmissionSchema.safeParse(input);
    if (!parsed.success) return null;
    const submission = parsed.data;
    const local = structuredClone(context);
    if (submission.source === "library") {
      if (local.source !== "library" || local.examId !== submission.examId || local.question.id !== submission.questionId ||
        !local.question.id.startsWith(`${local.examId}-`) || isExamReferenceOnly(local.question) || local.question.answerAuthority === "descriptive" ||
        !isValidChoice(local.question, submission.answer.choice)) return null;
      return { submission, reference: petRewardReferenceSchema.parse({ source: "library", examId: local.examId, questionId: local.question.id }),
        grade: gradeExamAnswer(local.question, submission.answer.choice) };
    }
    if (local.source !== "question" || local.question.id !== submission.questionId || !isPracticeReadyQuestion(local.question)) return null;
    const q = local.question, answer = submission.answer;
    let correct: boolean;
    switch (answer.kind) {
      case "multiple-choice": {
        if (q.type !== answer.kind) return null;
        const required = requiredSelectionCount(q), keys = getChoiceKeys(q.choices);
        if (answer.selected.length !== required || new Set(answer.selected).size !== required || !answer.selected.every(key => keys.some(choice => choice === key))) return null;
        correct = required > 1 ? isCompleteSelectionCorrect(q.answer, answer.selected, required) : isAcceptedAnswer(q.answer, answer.selected[0]);
        break;
      }
      case "numeric":
        if (q.type !== answer.kind || normalizeNumericAnswer(answer.value, q.numericAnswer) === undefined) return null;
        correct = isNumericAnswerCorrect(q, answer.value); break;
      case "ordering": {
        if (q.type !== answer.kind) return null;
        const selected = answer.selected, keys = getChoiceKeys(q.choices);
        if (!selected.every((key): key is ChoiceKey => keys.some(choice => choice === key)) || !isOrderingAnswerComplete(selected, q.choices)) return null;
        correct = isOrderingAnswerCorrect(q, selected); break;
      }
      case "native-b": {
        if (q.type !== answer.kind || !q.nativeB || Object.keys(answer.selections).some(label => !q.nativeB!.slots.some(slot => slot.label === label))) return null;
        const result = gradeNativeB(q.nativeB, answer.selections);
        if (!result.slotResults.every(slot => slot.status === "correct" || slot.status === "incorrect")) return null;
        correct = result.isCorrect; break;
      }
    }
    return { submission, reference: petRewardReferenceSchema.parse({ source: "question", exam: q.exam, questionId: q.id }),
      grade: correct ? "correct" as const : "incorrect" as const };
  } catch { return null; }
}
