import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { CHIZAI2_QUESTIONS as questions } from "@/data/questions/chizai2";
import originals from "@/data/prepared-chizai2/questions.json";
import receipt from "@/reports/qchizai2-20261103/source-intake-receipt.json";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { filterQuestions, isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import { isNumericAnswerCorrect } from "@/lib/questions/numeric";
import { isAcceptedAnswer } from "@/lib/questions/answers";
import { ALL_EXAM_CODES, EXAM_CONFIGS } from "@/lib/exam-config";
import { isOfficialPastOnlyRequest } from "@/lib/questions/past-question-policy";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { buildQuestionJsonLd, sessionLabel } from "@/lib/seo/question-jsonld";
import { defaultPracticeSession, practiceSessionLabel } from "@/lib/questions/practice-session";

describe("知財2級 第53・54回の固定原問採用", () => {
  it("reuses the independently reviewed fixed bytes and original text, choices, explanations and sources", () => {
    expect(createHash("sha256").update(readFileSync("data/prepared-chizai2/questions.json")).digest("hex")).toBe("b4a9242837388454e5e3a53c7533e03ac1cced88d2416a3d61c9445328061323");
    expect(questions).toHaveLength(160);
    expect(new Set(questions.map(q => q.id)).size).toBe(160);
    for (const q of questions) {
      const original = originals.find(o => o.id === q.id)!;
      for (const field of ["question", "answer", "officialAnswerNumber", "explanation", "sourcePdfUrl", "sourceAnswerUrl", "sourceAttribution", "lawReferenceDate"] as const) {
        expect(q[field], `${q.id}.${field}`).toEqual(original[field]);
      }
      const fixed = receipt.questions.find(row => row.id === q.id)!;
      expect(q.officialAnswerNumber).toBe(fixed.officialAnswer);
      expect(q.answer).toBe(fixed.answer);
      expect(q.needsReview).toBe(false);
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(shuffleChoices(q)).toBe(q);
      if (q.type === "multiple-choice") {
        expect(q.choices).toEqual(original.choices);
        expect(q.choiceExplanations).toEqual(original.choiceExplanations);
        expect(Object.keys(q.choices!).sort()).toEqual(Object.keys(q.choiceExplanations!).sort());
        expect(Object.values(q.choiceExplanations!).every(reason => reason!.trim())).toBe(true);
        expect(isAcceptedAnswer(q.answer, String(q.answer))).toBe(true);
      } else {
        expect(q.choices).toBeUndefined();
        expect(q.choiceExplanations).toBeUndefined();
        expect(isNumericAnswerCorrect(q, String(q.answer))).toBe(true);
        expect(isNumericAnswerCorrect(q, "0")).toBe(false);
      }
    }
    expect(questions.reduce((sum,q) => sum + Object.keys(q.choiceExplanations ?? {}).length, 0)).toBe(651);
  });

  it("loads every numbered original through both real registries and the practice filter", async () => {
    expect(QUESTIONS_BY_EXAM.chizai2).toEqual(questions);
    expect(await getQuestionsForExam("chizai2")).toEqual(questions);
    expect(ALL_EXAM_CODES).not.toContain("chizai2");
    expect(EXAM_CONFIGS.chizai2.sessions.map(s => s.expectedQuestions)).toEqual([40,40]);
    for (const season of ["spring", "july"] as const) {
      for (const session of ["gakka", "practical"] as const) {
        const group = filterQuestions(questions, { mode: "year", exam: "chizai2", year: 2026, season, session, inOrder: true });
        expect(group.map(q => q.qNumber)).toEqual(Array.from({length:40},(_,i) => i+1));
      }
    }
    expect(isOfficialPastOnlyRequest("chizai2", undefined)).toBe(true);
    expect(isOfficialPastOnlyRequest(undefined, questions[0].id)).toBe(true);
    expect(defaultPracticeSession("chizai2")).toBe("gakka");
    expect(filterQuestions(questions,{mode:"random",exam:"chizai2",session:defaultPracticeSession("chizai2")})).toHaveLength(80);
    expect(practiceSessionLabel("practical","chizai2")).toBe("実技");
    expect(sessionLabel("practical","chizai2")).toBe("実技");
    expect(practiceSessionLabel("practical","yakuzaishi")).toBe("薬学実践問題");
  });

  it("keeps binary, nine-choice word banks, numeric originals and the fee table", () => {
    const binary = questions.filter(q => Object.keys(q.choices ?? {}).length === 2);
    expect(binary).toHaveLength(12);
    for (const q of binary) {
      expect(q.choices?.[q.answer as "ア" | "イ"]?.replace("○", "〇")).toBe(q.officialAnswerNumber?.replace("○", "〇"));
    }
    expect(Math.max(...questions.map(q => Object.keys(q.choices ?? {}).length))).toBe(9);
    expect(questions.filter(q => q.type === "numeric").map(q => q.answer).sort()).toEqual(["202612", "208000"]);
    const fee = questions.find(q => q.answer === "208000")!;
    expect(fee.question).toContain("| 納付しなければならない者 | 金額 |");
    expect(fee.question).toContain("138000円に1請求項につき4000円");
    expect(fee.explanation).toContain("208,000円");
  });

  it("labels the verified rounds and attributes the original author without claiming an IPA licence", () => {
    for (const q of questions) {
      expect(questionSourceEdition(q)).toBe(q.season === "spring" ? "第53回（2026年3月8日実施）" : "第54回（2026年7月12日実施）");
    }
    const graph = buildQuestionJsonLd({question:questions[0],pageUrlAbs:"https://www.kakomon-ai.jp/q/chizai2/2026-july/gakka/q1",title:"知財2級 問1",lastUpdatedISO:"2026-11-03"})["@graph"];
    const resource = graph[0] as {hasPart:{author:{name:string}},license?:string};
    expect(resource.hasPart.author.name).toBe("知的財産教育協会");
    expect(resource.license).toBeUndefined();
  });
});
