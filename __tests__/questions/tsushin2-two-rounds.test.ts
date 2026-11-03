import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { TSUSHIN2_QUESTIONS, TSUSHIN2_ASSESSMENT_COUNTS } from "@/data/questions/tsushin2";
import official from "@/reports/qdentsu2-20261103/official-answers.json";
import receipt from "@/reports/qdentsu2-20261103/ACCEPTANCE.json";
import { filterQuestions, shuffleChoices } from "@/lib/questions/filter";
import { isAcceptedAnswer } from "@/lib/questions/answers";
import { createHistoryStore } from "@/lib/storage/history";
import { recordReview, getDueCards } from "@/lib/learning/spaced-repetition";

const keys = ["ア", "イ", "ウ", "エ"] as const;
describe("tsushin2 latest two separate sittings", () => {
  it.each(Object.entries(official))("%s has all 65 original question numbers and fixed official keys", (round, answers) => {
    const questions = TSUSHIN2_QUESTIONS.filter(q => `${q.year}-${q.season}` === round).sort((a,b) => a.qNumber-b.qNumber);
    expect(questions.map(q => q.qNumber)).toEqual(Array.from({length:65}, (_,i) => i+1));
    questions.forEach((q,i) => {
      expect(q.officialAnswerNumber).toBe(String(answers[i]));
      expect(q.answer).toBe(keys[answers[i]-1]);
      expect(shuffleChoices(q)).toBe(q);
      expect(keys.filter(key => isAcceptedAnswer(q.answer,key))).toEqual([keys[answers[i]-1]]);
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/www.jctc.jp\//);
      expect(q.sourceAnswerUrl).toMatch(/^https:\/\/www.jctc.jp\//);
      expect(q.sourceAttribution).toContain("全国建設研修センター");
      expect(q.explanationCoverage).toBe("full");
      expect(q.needsReview).toBe(false);
      expect(Object.keys(q.choices!)).toEqual(keys);
      for (const key of keys) expect(q.choiceExplanations?.[key]?.trim().length).toBeGreaterThan(15);
    });
  });
  it("binds inherited source blocks and all 16 figures to their accepted bytes", () => {
    expect(new Set(TSUSHIN2_QUESTIONS.map(q => q.id)).size).toBe(130);
    for (const file of receipt.files) expect(createHash("sha256").update(readFileSync(join(process.cwd(),file.path),"utf8").replace(/\r\n/g,"\n")).digest("hex")).toBe(file.normalizedLfSha256);
    expect(receipt.images).toHaveLength(16);
    for (const figure of receipt.images) {
      const q = TSUSHIN2_QUESTIONS.find(q => q.id === figure.id)!;
      expect(q.imageUrls).toContain(figure.url);
      expect(createHash("sha256").update(readFileSync(join(process.cwd(),"public",figure.url))).digest("hex")).toBe(figure.sha256);
    }
  });
  it("keeps 129 graded materials and one reference outside ordinary and review pools/storage", () => {
    expect(TSUSHIN2_ASSESSMENT_COUNTS).toEqual({materials:130,scored:129,referenceOnly:1});
    expect(filterQuestions(TSUSHIN2_QUESTIONS,{exam:"tsushin2",mode:"random"})).toHaveLength(129);
    const ref = TSUSHIN2_QUESTIONS.find(q=>q.id==="tsushin2-2025-late-gakka-q21")!;
    expect(ref.answer).toBe("エ");
    expect(ref.questionNotice).toContain("正答率には算入しません");
    localStorage.clear();
    const history=createHistoryStore();
    history.record({id:ref.id,selected:"エ",correct:true,at:1});
    history.toggleStar(ref.id);
    recordReview(ref.id,false);
    expect(history.getStats().total).toBe(0);
    expect(history.getStarredIds()).toEqual([]);
    expect(getDueCards()).toEqual([]);
    expect(filterQuestions([ref],{mode:"review"},history)).toEqual([]);
  });
  it("corrects R2 without altering the printed compiler proposition or official key", () => {
    const q=TSUSHIN2_QUESTIONS.find(q=>q.year===2026 && q.qNumber===9)!;
    expect(q.choices?.イ).toContain("コンパイラ");
    expect(q.answer).toBe("エ");
    expect(q.choiceExplanations?.イ).toContain("翻訳先は機械語に限らず");
    expect(q.choiceExplanations?.イ).not.toContain("プログラム全体を事前に");
  });
});
