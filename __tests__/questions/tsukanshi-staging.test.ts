import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { TSUKANSHI_QUESTIONS as questions } from "@/data/questions/tsukanshi";
import { ALL_QUESTIONS } from "@/data/questions";
import { ALL_EXAM_CODES, ALL_QUIZ_EXAM_CODES, EXAM_CONFIGS } from "@/lib/exam-config";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { getQualificationByExamCode, isExamPublished } from "@/lib/qualifications/catalog";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { isCompleteSelectionCorrect } from "@/lib/questions/answers";
import { isNumericAnswerCorrect } from "@/lib/questions/numeric";
import { getHomeDirectory } from "@/lib/home/home-directory";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { ChoiceKey } from "@/lib/questions/types";

const keys = [..."アイウエオカキクケコサシスセソ"] as ChoiceKey[];
const word = [
  [[1,10,9,12,13],[14,1,13,12,4],[5,10,2,1,6],[13,9,14,12,1],[7,14,6,1,9]],
  [[8,11,14,4,1],[10,6,7,2,12],[6,5,15,11,7],[13,4,5,15,6],[15,4,11,8,3]],
];
// Official answer table, checked against the PDF rendering as well as text.
const answers = [
  ["1,2,5","3,5","2,4","1,2,3","1,3,4","5","3","4","2","3","3","4","0","2","5"],
  ["1,3","2,4,5","2,5","1,4","1,4,5","1,3","3,5","3,5","1,3","3,5","2","4","5","4","3","3","3","5","3","4","4","5","2","3","3"],
  ["4,5","2,3","1,4,5","2,5","3,5","0039000","0055300","9580000","8498000","9020000","3","2","2","4","5"],
];
const sessions = ["tsukan-law", "customs-law", "tsukan-practical"];
const normalize = (s: string) => s.replace(/―\s*\d+\s*―/g, "").replace(/\s+/g, "");

describe("通関士 第59回 staged official paper", () => {
  it("keeps all supported original numbers and five separate real word-bank slots", () => {
    expect(questions).toHaveLength(105);
    expect(new Set(questions.map(q => q.id)).size).toBe(105);
    sessions.forEach((session, i) => {
      const subset = questions.filter(q => q.session === session);
      const numbers = [...new Set(subset.map(q => q.qNumber))];
      expect(numbers).toEqual(Array.from({length: [20,30,15][i]}, (_, n) => n + (i === 2 ? 3 : 1)));
    });
    expect(questions.filter(q => q.part)).toHaveLength(50);
    expect(questions.every(isPracticeReadyQuestion)).toBe(true);
  });
  it("matches every official answer, including multi-select, zero and numeric leading zeros", () => {
    for (const q of questions) {
      const i = sessions.indexOf(q.session);
      const official = q.part ? String(word[i][q.qNumber-1][Number(q.part)-1]) : answers[i][q.qNumber-(i===2 ? 3 : 6)];
      expect(q.officialAnswerNumber, q.id).toBe(official);
      if (q.type === "numeric") {
        expect(isNumericAnswerCorrect(q, official)).toBe(true);
      } else {
        const expected = official.split(",").map(n => n === "0" ? "カ" : keys[Number(n)-1]);
        expect(Array.isArray(q.answer) ? q.answer : [q.answer]).toEqual(expected);
        if (Array.isArray(q.answer)) {
          expect(isCompleteSelectionCorrect(q.answer, expected, q.requiredSelections)).toBe(true);
          expect(isCompleteSelectionCorrect(q.answer, expected.slice(1), q.requiredSelections)).toBe(false);
        }
      }
    }
  });
  it("retains PDF text for every printed choice and the normalized non-table stems", () => {
    for (const q of questions) {
      const i = sessions.indexOf(q.session);
      const raw = normalize(readFileSync(`reports/tsukanshi-sources/59-${i+1}.txt`, "utf8"));
      for (const [key, value] of Object.entries(q.choices ?? {})) {
        if (key === "カ" && !q.part) continue; // 0 is an instruction in the printed stem
        expect(raw.includes(normalize(value)), `${q.id}/${key}`).toBe(true);
      }
      if (!q.question.includes("|---|") && !(i===1 && q.qNumber===1) && !(i===2 && q.qNumber===9)) {
        expect(raw.includes(normalize(q.question)), q.id).toBe(true);
      }
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.customs\.go\.jp\//);
      expect(q.sourceAnswerUrl).toContain("59shiken_seikai.pdf");
      expect(q.explanation).toContain("出題時点");
      expect(q.sourceAttribution).toContain("独自作成");
    }
  });
  it("displays slot 6 and the special answer 0 without ambiguity", () => {
    const slot = questions.find(q => q.part === "1")!;
    const zero = questions.find(q => q.officialAnswerNumber === "0")!;
    expect(choiceDisplayLabel("tsukanshi", "カ", slot)).toBe("6");
    expect(choiceDisplayLabel("tsukanshi", "カ", zero)).toBe("0");
    expect(formatQuestionAnswerForDisplay(zero, zero.answer as string)).toBe("0");
    expect(questionSourceEdition(slot)).toBe("第59回（2025年実施）");
    expect(slot.questionNotice).toContain("空欄「イ」");
  });
  it("registers the qualification but exposes no public data, routes or IPA code", async () => {
    expect(EXAM_CONFIGS.tsukanshi.sessions).toHaveLength(3);
    expect(getQualificationByExamCode("tsukanshi")?.status).toBe("ready-to-ingest");
    expect(isExamPublished("tsukanshi")).toBe(false);
    expect(JSON.stringify(getHomeDirectory())).not.toContain("tsukanshi");
    expect(ALL_QUIZ_EXAM_CODES).not.toContain("tsukanshi");
    expect(ALL_EXAM_CODES).not.toContain("tsukanshi");
    expect(ALL_QUESTIONS.some(q => q.exam === "tsukanshi")).toBe(false);
    expect(await getQuestionsForExam("tsukanshi")).toEqual([]);
  });
});
