import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { OT61_PM_REMAINING14_QUESTIONS, OT61_PM34_SCORING_EXCLUSIONS } from "@/data/qualification-staging/sagyo-ryohoshi/ot61-pm-remaining15";
import { SAGYO_RYOHOSHI_QUESTIONS } from "@/data/questions/sagyo-ryohoshi";
import source from "@/docs/evidence/ot61-pm-remaining15-20261011/SOURCE.json";
import integration from "@/docs/evidence/ot61-pm-remaining15-20261011/INTEGRATION.json";
import { isCompleteSelectionCorrect } from "@/lib/questions/answers";
import { hasUnrenderableContent } from "@/lib/questions/content-quality";
import { detectAnswerDispute } from "@/lib/questions/explanation-consistency";

const kana = ["ア", "イ", "ウ", "エ", "オ"] as const;
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 57, 68, 75];
// Independently read from the official B001–B075 answer cells and scoring notices.
const officialAnswers = ["24", "3", "5", "3", "3", "5", "2", "3", "4", "4", "5", "1・4", "2・4", "2・3"];
const evidenceRoot = "docs/evidence/ot61-pm-remaining15-20261011";

describe("第61回作業療法士午後・未割当15問の独立候補", () => {
  it("14採点問と1採点除外を分離し、既存集合・保存7問・旧キューとの重複を防ぐ", () => {
    const ids = OT61_PM_REMAINING14_QUESTIONS.map(q => q.id);
    expect(ids).toEqual(integration.gradableIds);
    expect(OT61_PM_REMAINING14_QUESTIONS.map(q => q.qNumber)).toEqual(numbers);
    expect(new Set(ids).size).toBe(14);
    expect(ids.filter(id => SAGYO_RYOHOSHI_QUESTIONS.some(q => q.id === id))).toEqual([]);
    expect(ids.filter(id => integration.existingSavedSevenExcluded.includes(id))).toEqual([]);
    expect(integration.mainOverlap).toEqual([]);
    expect(integration.queuedOverlap).toEqual([]);
    expect(integration.registrationDelta).toBe(0);
    expect(integration.publicGo).toBe(0);
    expect(integration.sourceHolds).toEqual([]);
  });

  it.each(OT61_PM_REMAINING14_QUESTIONS)("$id の原問・全5肢・公式正答と実施年を維持する", q => {
    const packet = source.packets.find(p => p.identity === q.id);
    expect(packet).toBeDefined();
    if (!packet) return;
    expect(q.question).toBe(packet.stem);
    expect(q.officialAnswerNumber).toBe(officialAnswers[numbers.indexOf(q.qNumber)]);
    expect(q.officialAnswerNumber).toBe(packet.acceptedAnswerLiterals.join("・"));
    expect(q.answer).toEqual(packet.answer.length === 1 ? kana[Number(packet.answer[0]) - 1] : packet.answer.map(n => kana[Number(n) - 1]));
    expect(q.requiredSelections).toBe(packet.requiredSelections);
    expect(q.year).toBe(2025);
    expect(q.examDate).toBe("2026-02-23");
    expect(q.sourceAttribution).toContain("2026年実施・午後");
    expect(q.sourcePdfUrl).toBe(packet.officialQuestionPdf.url);
    expect(q.sourceAnswerUrl).toBe(packet.officialAnswerPdf.url);
    for (const [i, key] of kana.entries()) {
      expect(q.choices?.[key]).toBe(packet.choices[String(i + 1) as keyof typeof packet.choices]);
      expect(q.choiceExplanations?.[key]?.length).toBeGreaterThanOrEqual(35);
    }
    expect(q.explanation.length).toBeGreaterThanOrEqual(100);
    expect(q.explanationCoverage).toBe("full");
    expect(q.needsReview).toBe(false);
    expect(hasUnrenderableContent(q)).toBe(false);
    expect(detectAnswerDispute(q)).toBeNull();
    expect(packet.visualReview.questionAndAllChoicesAgainstOriginalPage).toBe("pass");
    expect(packet.visualReview.officialAnswerCellAgainstOriginalPdf).toBe("pass");
  });

  it("57・68・75のいずれか単一回答を受け入れ、2肢同時選択を拒否する", () => {
    for (const n of [57, 68, 75]) {
      const q = OT61_PM_REMAINING14_QUESTIONS.find(q => q.qNumber === n)!;
      expect(q.requiredSelections).toBe(1);
      expect(Array.isArray(q.answer)).toBe(true);
      if (!Array.isArray(q.answer)) continue;
      for (const key of q.answer) expect(isCompleteSelectionCorrect(q.answer, [key], q.requiredSelections)).toBe(true);
      expect(isCompleteSelectionCorrect(q.answer, q.answer, q.requiredSelections)).toBe(false);
      expect(isCompleteSelectionCorrect(q.answer, [], q.requiredSelections)).toBe(false);
      for (const key of kana.filter(key => !q.answer.includes(key))) expect(isCompleteSelectionCorrect(q.answer, [key], q.requiredSelections)).toBe(false);
    }
    const rom = OT61_PM_REMAINING14_QUESTIONS[0]!;
    expect(isCompleteSelectionCorrect(rom.answer, ["イ", "エ"], rom.requiredSelections)).toBe(true);
    expect(isCompleteSelectionCorrect(rom.answer, ["イ"], rom.requiredSelections)).toBe(false);
    expect(isCompleteSelectionCorrect(rom.answer, ["イ", "イ"], rom.requiredSelections)).toBe(false);
  });

  it("34は公式正答空欄・採点除外のまま参考5肢を保存する", () => {
    expect(OT61_PM34_SCORING_EXCLUSIONS).toHaveLength(1);
    const excluded = OT61_PM34_SCORING_EXCLUSIONS[0]!;
    const packet = source.packets.find(p => p.number === 34)!;
    expect(excluded.gradable).toBe(false);
    expect(excluded.officialAnswer).toBeNull();
    expect(excluded.officialAnswerNumber).toBeNull();
    expect(excluded.answer).toEqual([]);
    expect(packet.acceptedAnswerLiterals).toEqual([]);
    expect(packet.answerCellLiteral).toBeNull();
    expect(excluded.officialScoringTreatment.treatmentLiteral).toBe("採点対象から除外する。");
    expect(excluded.officialScoringTreatment.reasonLiteral).toBe("設問および選択肢が不十分なため。");
    for (const key of kana) expect(excluded.choiceExplanations?.[key]).toMatch(/^参考説明/);
    expect(OT61_PM_REMAINING14_QUESTIONS.some(q => q.id === excluded.id)).toBe(false);
  });

  it("共通症例2・3に症例文とBIT図をともに保持し、図選択4問の全20肢を対応付ける", () => {
    for (const n of [2, 3]) {
      const q = OT61_PM_REMAINING14_QUESTIONS.find(q => q.qNumber === n)!;
      expect(q.question).toContain("右頭頂葉");
      expect(q.question).toContain("MMSE 19/30");
      expect(q.imageUrls?.[0]).toContain("no1-bit.png");
      expect(q.imageAltTexts?.[0]).toContain("32/146");
    }
    for (const n of [1, 7, 10, 11]) {
      const q = OT61_PM_REMAINING14_QUESTIONS.find(q => q.qNumber === n)!;
      expect(Object.keys(q.choiceImageUrls ?? {})).toEqual(kana);
      for (const [i, key] of kana.entries()) expect(q.choiceImageUrls?.[key]).toContain(`q${n}-choice-${i + 1}.png`);
    }
    expect(OT61_PM_REMAINING14_QUESTIONS.reduce((count, q) => count + Object.keys(q.choiceExplanations ?? {}).length, 0)).toBe(70);
    expect(source.assets).toHaveLength(26);
    for (const q of OT61_PM_REMAINING14_QUESTIONS.filter(q => q.hasImage)) expect(q.imageUrls?.length).toBe(q.imageAltTexts?.length);
  });

  it("原本ページ・正答セル・全図版のSHA256を保存時と照合する", () => {
    for (const packet of source.packets) {
      for (const [path, digest] of [[packet.questionPagePng, packet.questionPagePngSha256], [packet.answerCellPng, packet.answerCellPngSha256]]) {
        expect(createHash("sha256").update(readFileSync(join(process.cwd(), evidenceRoot, path))).digest("hex")).toBe(digest);
      }
    }
    for (const asset of source.assets) {
      expect(createHash("sha256").update(readFileSync(join(process.cwd(), "public", asset.url))).digest("hex")).toBe(asset.sha256);
    }
  });
});
