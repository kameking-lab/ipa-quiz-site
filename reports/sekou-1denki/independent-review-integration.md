- **P2 — Register `denki1` as using numbered choices.** [lib/questions/display.ts:23](C:/Users/kanet/20260522/wt-LQ6/lib/questions/display.ts:23) converts choice labels to `1–5`, but `usesNumberedChoices("denki1")` returns false. Consequently, `QuestionAnswerCard` and `QuizPlayer` display kana in answer feedback—for example, “正解は ウ” instead of “正解は 3.” Add `denki1` to `PLAIN_NUMBER_CHOICE_EXAMS` and test answer-feedback formatting for both four- and five-choice questions.

FAIL
