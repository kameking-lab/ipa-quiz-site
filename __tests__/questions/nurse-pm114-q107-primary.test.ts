import primary11 from "@/docs/evidence/nurse-primary11-20261011/INTEGRATION.json";
import { describe, expect, it } from "vitest";
import { KANGOSHI_QUESTIONS } from "@/data/questions/kangoshi";
import proof from "@/docs/evidence/nurse-pm-q107-primary-20261010/INTEGRATION.json";
import { nurseObjectHash } from "./nurse-pm-category-hash";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";

describe("114th nursing PM Q107 primary-source adoption", () => {
  const question = KANGOSHI_QUESTIONS.find(q => q.id === proof.identity);

  it("adds only Q107 and preserves all 463 previously registered objects", () => {
    expect(KANGOSHI_QUESTIONS).toHaveLength(proof.newCount + primary11.preparedAdditionCount);
    expect(new Set(KANGOSHI_QUESTIONS.map(q => q.id)).size).toBe(proof.newCount + primary11.preparedAdditionCount);
    expect(
      KANGOSHI_QUESTIONS.reduce((sum, q) => sum + Object.keys(q.choices ?? {}).length, 0),
    ).toBe(proof.newChoices + primary11.preparedChoiceCount);
    expect(nurseObjectHash(KANGOSHI_QUESTIONS.filter(q => q.id !== proof.identity && !primary11.addedIds.includes(q.id)))).toBe(
      proof.oldCorpusCanonicalSha256,
    );
    for (const id of proof.individualStopsRetained) {
      expect(KANGOSHI_QUESTIONS.some(q => q.id === id), id).toBe(false);
    }
  });

  it("preserves the official stem, four choices, key 3, and shared case", () => {
    expect(question).toBeDefined();
    for (const [field, value] of Object.entries(proof.originalFixed)) {
      expect((question as unknown as Record<string, unknown>)[field], field).toEqual(value);
    }
    expect(question?.question).toContain("A君（5歳6か月、男児）");
    expect(question?.answer).toBe("ウ");
    expect(question?.officialAnswerNumber).toBe("3");
    expect(Object.keys(question?.choiceExplanations ?? {}).sort()).toEqual(
      Object.keys(question?.choices ?? {}).sort(),
    );
    expect(question?.needsReview).toBe(false);
    expect(isPracticeReadyQuestion(question!)).toBe(true);
  });

  it("states the limited clinical evidence without treating silence as prohibition", () => {
    expect(question?.explanation).toContain("2023年2月更新");
    expect(question?.explanation).toContain("2004年研究会資料");
    expect(question?.explanation).toContain("現行基準の根拠ではない");
    expect(question?.choiceExplanations?.イ).toContain("禁じる根拠ではなく");
    expect(question?.choiceExplanations?.ウ).toContain("男児");
    expect(question?.choiceExplanations?.ウ).toContain("女児");
    expect(question?.choiceExplanations?.エ).toContain("ゆっくり抜き");
  });
});