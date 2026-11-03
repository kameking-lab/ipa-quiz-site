import { describe, expect, it } from "vitest";
import { nurseDecimalQuestion as question } from "@/__tests__/fixtures/nurse-decimal-question";
import { nurseNumericQuestion as integer } from "@/__tests__/fixtures/nurse-numeric-question";
import { normalizeNumericAnswer, isNumericAnswerCorrect, numericQuestionIssue, formatNumericAnswer } from "@/lib/questions/numeric";
import { isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import type { Question } from "@/lib/questions/types";
import source from "@/docs/evidence/nurse-decimal-bmi-20261010/pm114-q90-numeric-verification.json";

describe("original decimal BMI entry", () => {
  it.each(["23.4","２３．４"," 23.4 ","　２３.４　","023.4"])("normalizes the complete original value %j", input => {
    expect(normalizeNumericAnswer(input,question.numericAnswer)).toBe("23.4");
    expect(isNumericAnswerCorrect(question,input)).toBe(true);
  });
  it.each(["","　 ","23.4foo","23.4BMI","23.40","23.4375","23.",".4","2 3.4","23,4","+23.4","-23.4","2.34e1","0x17","⅔"])("rejects incomplete or extra precision %j without implicit rounding", input => {
    expect(normalizeNumericAnswer(input,question.numericAnswer)).toBeUndefined();
    expect(isNumericAnswerCorrect(question,input)).toBe(false);
  });
  it("keeps a valid incorrect decimal distinct and does not round large values", () => {
    expect(normalizeNumericAnswer("23",question.numericAnswer)).toBe("23.0");
    expect(isNumericAnswerCorrect(question,"23.3")).toBe(false);
    expect(normalizeNumericAnswer("9007199254740993.4",question.numericAnswer)).toBe("9007199254740993.4");
    expect(formatNumericAnswer(question)).toBe("23.4 BMI");
    expect(shuffleChoices(question)).toBe(question);
    expect(isPracticeReadyQuestion(question)).toBe(true);
    expect(normalizeNumericAnswer("42.0",integer.numericAnswer)).toBeUndefined();
    expect(normalizeNumericAnswer("４２",integer.numericAnswer)).toBe("42");
  });
  it.each([{answer:"23.40"},{answer:"２３．４"},{numericAnswer:{format:"decimal",precision:2,unit:"BMI"}},{numericAnswer:{format:"decimal",unit:"BMI"}},{numericAnswer:{format:"decimal",precision:1,unit:""}},{choices:{ア:"23.4"}}])("fails closed on unsupported metadata %j", change => {
    const invalid={...question,...change} as Question;
    expect(numericQuestionIssue(invalid)).toBeTruthy();
    expect(isPracticeReadyQuestion(invalid)).toBe(false);
  });
  it("matches the preserved original height, weight, rounding instruction and final key", () => {
    expect(question.question).toContain(`${source.heightCm}cm`);
    expect(question.question).toContain(`${source.weightKg}kg`);
    expect(question.question).toContain("小数点以下第2位を四捨五入");
    // Exact rational arithmetic: kg *10000 /cm², then one-place half-up rounding.
    const denominator=BigInt(source.heightCm)**2n;
    const tenths=(BigInt(source.weightKg)*100000n+denominator/2n)/denominator;
    const answer=`${tenths/10n}.${tenths%10n}`;
    expect(answer).toBe(source.verifiedNumericAnswer);
    expect(question.answer).toBe(answer);
    expect(source.officialAnswerDigits).toEqual(["2","3","4"]);
    expect(question.choices).toBeUndefined();
  });
});
