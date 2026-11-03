import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { BIYOSHI_QUESTIONS } from "@/data/questions/biyoshi";
import { QUESTIONS as OT1 } from "@/data/questions/kikenbutsu-otsu1";
import { QUESTIONS as OT2 } from "@/data/questions/kikenbutsu-otsu2";
import { QUESTIONS as OT6 } from "@/data/questions/kikenbutsu-otsu6";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { filterQuestions } from "@/lib/questions/filter";
import { isAcceptedAnswer } from "@/lib/questions/answers";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import holds from "@/reports/lq5-20261104/holds.json";
import type { ExamCode } from "@/lib/questions/types";

describe("LQ5 accepted packets in the public registries", () => {
  it("serves exactly 53+53 beauty originals while all four recorded holds stay absent", async () => {
    const questions = await getQuestionsForExam("biyoshi");
    expect(questions).toEqual(BIYOSHI_QUESTIONS);
    expect(questions).toHaveLength(106);
    expect(filterQuestions(questions, { mode: "random", exam: "biyoshi" })).toHaveLength(106);
    for (const season of ["first", "second"]) expect(questions.filter(q => q.season === season)).toHaveLength(53);
    for (const hold of holds.filter(h => h.id.startsWith("biyoshi"))) expect(questions.some(q => q.id === hold.id)).toBe(false);
    expect(questionSourceEdition(questions[0])).toContain("第53回");
    expect(questionSourceEdition(questions.find(q => q.season === "second")!)).toContain("第54回");
  });
  it.each([["kikenbutsu-otsu1", OT1], ["kikenbutsu-otsu2", OT2], ["kikenbutsu-otsu6", OT6]] as const)("%s keeps excerpt identity, five official keys and all accepted reasons", async (exam, expected) => {
    const qs = await getQuestionsForExam(exam);
    expect(qs).toEqual(expected);
    expect(qs.map(q => q.qNumber)).toEqual(Array.from({length:10}, (_,i) => i+26));
    expect(filterQuestions(qs, {mode:"random", exam})).toHaveLength(10);
    const accepted = JSON.parse(readFileSync(resolve("data/questions",exam,"accepted-source.json"),"utf8"));
    const original = Array.isArray(accepted) ? accepted : accepted.questions;
    for (const [i, q] of qs.entries()) {
      expect(q.id).toBe(original[i].id);
      expect(q.explanation).toBe(original[i].explanation);
      expect(q.choiceExplanations).toEqual(original[i].choiceExplanations);
      expect(q.choices).toEqual(original[i].choices);
      expect(q.question).toBe(original[i].question);
      expect(q.year).toBe(2026); // Public edition routing year, not an invented exam year.
      expect(q.sourceExamYear).toBeNull();
      expect(q.sourceExamSession).toBeNull();
      expect(q.publicationVersion).toBe("2026-06");
      expect(q.season).toBe("published");
      expect(questionSourceEdition(q)).toContain("個別の出題年・回は非公表");
      expect(q.questionNotice).toContain("令和7年度以前");
      expect(Object.keys(q.choices!)).toEqual(["ア","イ","ウ","エ","オ"]);
      expect(choiceDisplayLabel(q.exam, q.answer as "ア")).toBe(q.officialAnswerNumber);
      expect(isAcceptedAnswer(q.answer, q.answer as string)).toBe(true);
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.shoubo-shiken\.or\.jp\//);
      for (const reason of Object.values(q.choiceExplanations!)) expect(reason!.length).toBeGreaterThan(15);
      for (const url of q.imageUrls ?? []) expect(readFileSync(resolve("public", "."+url)).length).toBeGreaterThan(1000);
    }
  });
  it("registers all four qualified pools", () => {
    for(const exam of ["biyoshi","kikenbutsu-otsu1","kikenbutsu-otsu2","kikenbutsu-otsu6"] as ExamCode[]) expect(getRegisteredExamCodes()).toContain(exam);
  });
});
