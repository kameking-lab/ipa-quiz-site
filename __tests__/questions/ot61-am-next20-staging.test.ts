import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { OT61_AM_NEXT20_QUESTIONS } from "@/data/qualification-staging/sagyo-ryohoshi/ot61-am-next20";
import { SAGYO_RYOHOSHI_QUESTIONS } from "@/data/questions/sagyo-ryohoshi";
import source from "@/docs/evidence/ot61-am-next20-20261011/SOURCE.json";
import integration from "@/docs/evidence/ot61-am-next20-20261011/INTEGRATION.json";
import { hasUnrenderableContent } from "@/lib/questions/content-quality";
import { detectAnswerDispute } from "@/lib/questions/explanation-consistency";

const kana = ["ア", "イ", "ウ", "エ", "オ"] as const;
const numbers = [51, 52, 53, 54, 55, 56, 57, 59, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 73];
const officialKeys = ["1", "4", "5", "3", "3", "2", "5", "3", "3", "2", "2", "5", "3", "45", "14", "5", "1", "12", "3", "12"];

describe("第61回作業療法士午前・独立候補20問", () => {
  it("割当範囲を保ち、既存の公開集合と重複しない", () => {
    const ids = OT61_AM_NEXT20_QUESTIONS.map(question => question.id);
    expect(ids).toEqual(integration.exactIds);
    expect(ids).toHaveLength(20);
    expect(new Set(ids).size).toBe(20);
    expect(OT61_AM_NEXT20_QUESTIONS.map(question => question.qNumber)).toEqual(numbers);
    expect(ids.filter(id => SAGYO_RYOHOSHI_QUESTIONS.some(question => question.id === id))).toEqual([]);
    expect(integration.registrationDelta).toBe(0);
    expect(integration.publicGo).toBe(0);
    expect(integration.sourceHolds).toEqual([]);
  });

  it.each(source.packets)("$identity の原問・5肢・公式正答を維持する", packet => {
    const question = OT61_AM_NEXT20_QUESTIONS.find(candidate => candidate.id === packet.identity);
    expect(question).toBeDefined();
    if (!question) return;
    expect(question.question).toBe(packet.stem);
    expect(question.qNumber).toBe(packet.number);
    expect(question.year).toBe(2025);
    expect(question.examDate).toBe("2026-02-23");
    expect(question.session).toBe("am");
    expect(question.sourceAttribution).toContain("第61回");
    expect(question.sourceAttribution).toContain("2026年実施・午前");
    expect(question.sourcePdfUrl).toBe(packet.officialQuestionPdf.url);
    expect(question.sourceAnswerUrl).toBe(packet.officialAnswerPdf.url);
    expect(question.officialAnswerNumber).toBe(packet.answerCellLiteral);
    expect(question.officialAnswerNumber).toBe(officialKeys[numbers.indexOf(packet.number)]);
    for (const [index, key] of kana.entries()) {
      expect(question.choices?.[key]).toBe(packet.choices[String(index + 1) as keyof typeof packet.choices]);
      expect(question.choiceExplanations?.[key]?.length).toBeGreaterThanOrEqual(35);
    }
    const actualAnswers = Array.isArray(question.answer) ? question.answer : [question.answer];
    expect(actualAnswers).toEqual(packet.answer.map(answer => kana[Number(answer) - 1]));
    expect(actualAnswers).toHaveLength(packet.requiredSelections);
    expect(question.requiredSelections).toBe(packet.requiredSelections);
    expect(question.explanation.length).toBeGreaterThanOrEqual(100);
    expect(question.explanationCoverage).toBe("full");
    expect(question.hasImage).toBe(false);
    expect(question.needsReview).toBe(false);
    expect(hasUnrenderableContent(question)).toBe(false);
    expect(detectAnswerDispute(question)).toBeNull();
    expect(packet.visualReview.questionAndAllChoicesAgainstOriginalPage).toBe("pass");
    expect(packet.visualReview.officialAnswerCellAgainstOriginalPdf).toBe("pass");
  });

  it("二つ選ぶ4問の選択数を保ち、全100肢に説明を持つ", () => {
    expect(OT61_AM_NEXT20_QUESTIONS.filter(question => question.requiredSelections === 2).map(question => question.qNumber))
      .toEqual([66, 67, 70, 73]);
    expect(OT61_AM_NEXT20_QUESTIONS.reduce((count, question) => count + Object.keys(question.choiceExplanations ?? {}).length, 0))
      .toBe(100);
  });

  it("触覚の肢を嗅覚へ取り違えず、力学の否定形を明示する", () => {
    const sensation = OT61_AM_NEXT20_QUESTIONS.find(question => question.qNumber === 57);
    expect(sensation?.choices?.["エ"]).toBe("触 覚");
    expect(sensation?.choiceExplanations?.["エ"]).toContain("触覚");
    expect(sensation?.choiceExplanations?.["エ"]).not.toContain("嗅覚");
    const mechanics = OT61_AM_NEXT20_QUESTIONS.find(question => question.qNumber === 69);
    expect(mechanics?.question).toContain("誤っている");
    expect(mechanics?.answer).toBe("ア");
    expect(mechanics?.choiceExplanations?.["ア"]).toContain("誤りなので本問の正答");
    for (const key of kana.slice(1)) expect(mechanics?.choiceExplanations?.[key]).toMatch(/^正しい/);
  });

  it("原本ページと正答セルの保存画像を改変せず保持する", () => {
    for (const packet of source.packets) {
      for (const [path, digest] of [
        [packet.questionPagePng, packet.questionPagePngSha256],
        [packet.answerCellPng, packet.answerCellPngSha256],
      ]) {
        const image = readFileSync(join(process.cwd(), "docs/evidence/ot61-am-next20-20261011", path));
        expect(createHash("sha256").update(image).digest("hex")).toBe(digest);
      }
      expect(packet.officialQuestionPdf.sha256).toMatch(/^[a-f0-9]{64}$/);
      expect(packet.officialAnswerPdf.sha256).toMatch(/^[a-f0-9]{64}$/);
    }
  });
});
