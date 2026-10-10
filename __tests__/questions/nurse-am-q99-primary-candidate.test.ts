import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { KANGOSHI_QUESTIONS } from "@/data/questions/kangoshi";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { Question } from "@/lib/questions/types";

const relative = "docs/evidence/nurse-am-q99-primary-20261010/NURSE-115-AM-Q99-READY-CANDIDATE.json";
const bytes = readFileSync(path.join(process.cwd(), relative));
const candidate = JSON.parse(bytes.toString("utf8")) as Question;

describe("115th nurse AM Q99 primary-source adoption candidate", () => {
  it("keeps the official question and four-way single-answer key intact", () => {
    expect(candidate.id).toBe("kangoshi-2025-annual-am-q99");
    expect(candidate.session).toBe("am");
    expect(candidate.qNumber).toBe(99);
    expect(candidate.requiredSelections).toBe(1);
    expect(candidate.officialAnswerNumber).toBe("2");
    expect(candidate.answer).toBe("イ");
    expect(Object.keys(candidate.choices ?? {})).toEqual(["ア", "イ", "ウ", "エ"]);
    expect(candidate.choices?.イ).toBe("カリウムを含む食品の制限はない。");
    expect(candidate.question).toContain("K 3.8 mEq/L");
    expect(candidate.sourcePdfUrl).toContain("mhlw.go.jp/");
    expect(candidate.sourceAnswerUrl).toContain("mhlw.go.jp/");
  });

  it("explains all four options against the saved JSDT numeric table", () => {
    expect(candidate.needsReview).toBe(false);
    expect(candidate.explanationCoverage).toBe("full");
    expect(isPracticeReadyQuestion(candidate)).toBe(true);
    expect(Object.keys(candidate.choiceExplanations ?? {})).toEqual(Object.keys(candidate.choices ?? {}));
    expect(candidate.choiceExplanations?.ア).toContain("0.9～1.2");
    expect(candidate.choiceExplanations?.イ).toContain("高K血症");
    expect(candidate.choiceExplanations?.ウ).toContain("450＋900＝1,350");
    expect(candidate.choiceExplanations?.エ).toContain("30～35");
  });

  it("is registered once without changing the verified candidate", () => {
    const live = KANGOSHI_QUESTIONS.filter(q => q.id === candidate.id);
    expect(live).toHaveLength(1);
    expect(live[0]).toEqual({
      ...candidate,
      explanation: `${candidate.explanation}数値基準の参照：日本透析医学会『透析会誌』50巻11号（2017年）725–729頁。`,
      officialReferenceUrls: [
        ...candidate.officialReferenceUrls!,
        "https://www.jstage.jst.go.jp/article/jsdt/50/11/50_725/_pdf",
      ],
    });
    expect(createHash("sha256").update(bytes.toString("utf8").replace(/\r\n/g, "\n")).digest("hex")).toBe(
      "582cc97f801d8b72d7bf4b9655b6163a5f1dce37398a520535daa63e434c65b1",
    );
  });
});
