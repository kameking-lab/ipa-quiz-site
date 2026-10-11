import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { SAGYO_RYOHOSHI_QUESTIONS } from "@/data/questions/sagyo-ryohoshi";
import { OT13_RECOVERED_QUESTIONS, OT13_OFFICIAL_EXCLUSIONS } from "@/data/qualification-staging/sagyo-ryohoshi/ot13-recovered";
import evidence from "@/docs/evidence/sagyo-ot13-recovered-20261011/SOURCE-EVIDENCE.json";
import integration from "@/docs/evidence/sagyo-ot13-recovered-20261011/INTEGRATION.json";
import { checkExplanationConsistency } from "@/lib/questions/explanation-consistency";

const keys = ["ア", "イ", "ウ", "エ", "オ"] as const;
const scope = [...OT13_RECOVERED_QUESTIONS, ...OT13_OFFICIAL_EXCLUSIONS];

function original(id: string) {
  const row = evidence.originals.find(source => source.id === id);
  if (!row) throw new Error(`Missing original receipt: ${id}`);
  return row;
}

describe("OT13 recovered originals and local integration candidates", () => {
  it("keeps exactly 11 gradable candidates and two official exclusions", () => {
    expect(OT13_RECOVERED_QUESTIONS).toHaveLength(11);
    expect(OT13_OFFICIAL_EXCLUSIONS).toHaveLength(2);
    expect(new Set(scope.map(question => question.id)).size).toBe(13);
    expect(scope.map(question => question.id).sort()).toEqual([...integration.reservedScopeIds].sort());
    expect(OT13_RECOVERED_QUESTIONS.flatMap(question => Object.values(question.choiceExplanations ?? {}))).toHaveLength(55);
    expect(evidence.sourcePacketSha256).toBe("16c71e4504ee46bebab508870e11a1cb1acc06eb761ebdf86c9c6abf2c2abbde");
  });

  it.each(scope.map(question => [question.id, question] as const))("%s preserves the original stem, all five choices, and year alias", (id, question) => {
    const source = original(id);
    expect(question.question).toBe(source.question);
    expect(question.year).toBe(source.canonicalSiteYear);
    expect(source.actualExamYear).toBe(source.canonicalSiteYear + 1);
    expect(question.qNumber).toBe(source.qNumber);
    expect(question.session).toBe(source.session);
    expect(Object.keys(question.choices ?? {})).toEqual([...keys]);
    keys.forEach((key, index) => {
      const printed = String(index + 1) as keyof typeof source.choices;
      expect(question.choices?.[key]).toBe(source.choices[printed]);
    });
    expect(question.sourcePdfUrl).toBe(source.questionPdf.url);
    expect(question.sourceAnswerUrl).toBe(source.answerPdf.url);
    expect(question.sourceAttribution).toContain(`第${source.edition}回`);
  });

  it("matches literal official answer cells, including both two-answer questions", () => {
    expect(OT13_RECOVERED_QUESTIONS.filter(question => question.requiredSelections === 2)).toHaveLength(2);
    for (const question of OT13_RECOVERED_QUESTIONS) {
      const source = original(question.id);
      const answers = Array.isArray(question.answer) ? question.answer : [question.answer];
      expect(answers).toHaveLength(source.requiredSelections);
      expect(new Set(answers).size).toBe(answers.length);
      const numeric = answers.map(answer => String(keys.indexOf(answer as typeof keys[number]) + 1));
      expect(numeric).toEqual(source.officialAnswer);
      expect(numeric.join("")).toBe(source.answerCell.cellPrintedLiteral);
      expect(question.officialAnswerNumber).toBe(source.officialAnswerNumber);
      expect(source.answerCell.isBlank).toBe(false);
      expect(question.explanationCoverage).toBe("full");
      expect(question.explanation.trim().length).toBeGreaterThan(80);
      keys.forEach(key => expect(question.choiceExplanations?.[key]?.trim().length).toBeGreaterThan(35));
      expect(checkExplanationConsistency(question)).toEqual([]);
    }
  });

  it("never creates a gradable key or clinical per-choice verdict for an excluded original", () => {
    for (const question of OT13_OFFICIAL_EXCLUSIONS) {
      const source = original(question.id);
      expect(question.type).toBe("official-scoring-exclusion");
      expect(question.gradable).toBe(false);
      expect(question.answer).toEqual([]);
      expect(question.officialAnswer).toBeNull();
      expect(question.officialAnswerNumber).toBeNull();
      expect(source.answerCell.isBlank).toBe(true);
      expect(question).not.toHaveProperty("choiceExplanations");
      expect(question.explanation).toContain(question.officialScoringTreatment.treatmentLiteral);
      expect(question.explanation).toContain(question.officialScoringTreatment.reasonLiteral);
      expect(question.officialScoringTreatment).toEqual(source.officialScoringTreatment);
    }
  });

  it("retains original image bytes and links every image to its PDF region", () => {
    expect(evidence.assets).toHaveLength(37);
    const urls = new Set(evidence.assets.map(asset => asset.url));
    expect(urls.size).toBe(evidence.assets.length);
    for (const asset of evidence.assets) {
      expect(asset.url).toMatch(/^\/questions\/sagyo-ryohoshi\/ot13-recovered\/[a-z0-9-]+\.png$/);
      const bytes = readFileSync(join(process.cwd(), "public", asset.url.slice(1)));
      expect(createHash("sha256").update(bytes).digest("hex")).toBe(asset.sha256);
      expect(asset.method).toBe("unaltered-native-PDF-region-render");
      expect(asset.clipRectPoints).toHaveLength(4);
      expect(asset.pdfUrl).toMatch(/^https:\/\/www\.mhlw\.go\.jp\//);
    }
    let choiceImages = 0;
    for (const question of OT13_RECOVERED_QUESTIONS) {
      expect(question.hasImage).toBe(true);
      const main = question.imageUrls ?? [];
      const choices = Object.values(question.choiceImageUrls ?? {});
      expect(main.length + choices.length).toBeGreaterThan(0);
      expect(main.length).toBe(question.imageAltTexts?.length ?? 0);
      [...main, ...choices].forEach(url => expect(urls.has(url)).toBe(true));
      choiceImages += choices.length;
      if (choices.length) expect(Object.keys(question.choiceImageUrls ?? {})).toEqual([...keys]);
    }
    expect(choiceImages).toBe(25);
  });

  it("keeps the handoff outside the registered public pool until coordinator integration", () => {
    const published = new Set(SAGYO_RYOHOSHI_QUESTIONS.map(question => question.id));
    scope.forEach(question => expect(published.has(question.id)).toBe(false));
    expect(integration.publicQuestionIncrement).toBe(0);
    expect(integration.publicGo).toBe(0);
    expect(integration.copyrightPermissionClaimed).toBe(false);
  });
});