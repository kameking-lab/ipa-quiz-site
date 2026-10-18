import { describe, expect, it } from "vitest";
import type { Question } from "@/lib/questions/types";
import { nativeBQuestion } from "@/__tests__/fixtures/native-b-question";
import { auditQuestionAnswer } from "@/scripts/audit-question-answer";

function multipleChoice(): Question {
  const question = nativeBQuestion();
  delete question.nativeB;
  return { ...question, type: "multiple-choice", answer: "ア", choices: { ア: "TOKEN_A", イ: "TOKEN_B" } };
}

describe("question auditor answer contract", () => {
  it.each(["binary", "shared-bank"] as const)("accepts a valid %s original with the required empty shim", (mode) => {
    expect(auditQuestionAnswer(nativeBQuestion(mode))).toEqual([]);
  });

  it.each(["", " ", undefined, null])("retains the legacy missing-answer finding for %s", (answer) => {
    const question = { ...multipleChoice(), answer } as unknown as Question;
    expect(auditQuestionAnswer(question)).toEqual([{ category: "missing-field", message: "必須フィールド欠落: answer" }]);
  });

  it("accepts an existing MC answer without interpreting it as native metadata", () => {
    expect(auditQuestionAnswer(multipleChoice())).toEqual([]);
  });

  it("rejects a native original with fewer than five slots", () => {
    const question = nativeBQuestion();
    question.nativeB!.slots.pop();
    expect(auditQuestionAnswer(question)).toEqual([expect.objectContaining({ category: "native-b-invalid" })]);
  });

  it("rejects an official slot key absent from the shared bank", () => {
    const question = nativeBQuestion("shared-bank");
    question.nativeB!.slots[0]!.answer = "99";
    expect(auditQuestionAnswer(question)).toEqual([expect.objectContaining({ category: "native-b-invalid", message: expect.stringContaining("Unknown answer ID") })]);
  });

  it("rejects a truncated ten-candidate bank and missing slot explanation", () => {
    const bank = nativeBQuestion("shared-bank");
    bank.nativeB!.candidates.pop();
    expect(auditQuestionAnswer(bank)[0]?.category).toBe("native-b-invalid");
    const binary = nativeBQuestion();
    binary.nativeB!.slots[0]!.explanation = " ";
    expect(auditQuestionAnswer(binary)[0]?.category).toBe("native-b-invalid");
  });

  it("rejects duplicate slot labels and candidate IDs through the shared validator", () => {
    const slots = nativeBQuestion();
    slots.nativeB!.slots[0]!.label = slots.nativeB!.slots[1]!.label;
    expect(auditQuestionAnswer(slots)[0]?.category).toBe("native-b-invalid");
    const candidates = nativeBQuestion("shared-bank");
    candidates.nativeB!.candidates[0]!.id = candidates.nativeB!.candidates[1]!.id;
    expect(auditQuestionAnswer(candidates)[0]?.category).toBe("native-b-invalid");
  });

  it("does not accept a nonempty legacy shim or flattened native choices", () => {
    const answer = nativeBQuestion();
    answer.answer = "ア";
    expect(auditQuestionAnswer(answer)[0]?.category).toBe("native-b-invalid");
    const choices = nativeBQuestion();
    choices.choices = { ア: "FLATTENED" };
    expect(auditQuestionAnswer(choices)[0]?.category).toBe("native-b-invalid");
  });
});
