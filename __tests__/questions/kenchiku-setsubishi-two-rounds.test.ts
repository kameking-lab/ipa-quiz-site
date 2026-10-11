import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { KENCHIKU_SETSUBISHI_QUESTIONS as corpus } from "@/data/questions/kenchiku-setsubishi";
import manifest from "@/data/questions/kenchiku-setsubishi/figures/manifest.json";
import officialKeys from "./fixtures/kenchiku-setsubishi-official-keys.json";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";

const CHOICES = ["ア", "イ", "ウ", "エ"] as const;
const HOLD = "kenchiku-setsubishi-2026-annual-am2-q18";
const base = "data/questions/kenchiku-setsubishi";

describe("建築設備士2025・2026第一次の私的候補", () => {
  it("preserves all six source sequences and all 210 official answer cells", () => {
    expect(corpus).toHaveLength(210);
    expect(new Set(corpus.map(q => q.id)).size).toBe(210);
    expect(new Set(corpus.map(q => `${q.year}-${q.session}-${q.qNumber}`)).size).toBe(210);
    for (const year of [2025, 2026] as const) {
      for (const session of ["am1", "am2", "pm"] as const) {
        const questions = corpus.filter(q => q.year === year && q.session === session);
        const expected = officialKeys[year][session];
        expect(questions.map(q => q.qNumber)).toEqual(expected.map((_, index) => index + 1));
        for (const q of questions) {
          expect(q.id).toBe(`kenchiku-setsubishi-${year}-annual-${session}-q${q.qNumber}`);
          expect(q.answer, q.id).toBe(CHOICES[expected[q.qNumber - 1]! - 1]);
          expect(q.officialAnswerNumber, q.id).toBe(String(expected[q.qNumber - 1]));
          expect(q.season).toBe("annual");
          expect(q.type).toBe("multiple-choice");
          expect(q.requiredSelections).toBe(1);
        }
      }
    }
  });

  it("provides 840 substantive choice explanations with official source attribution", () => {
    let total = 0;
    for (const q of corpus) {
      expect(Object.keys(q.choices ?? {}), q.id).toEqual(CHOICES);
      expect(Object.keys(q.choiceExplanations ?? {}), q.id).toEqual(CHOICES);
      expect(q.explanationCoverage).toBe("full");
      expect(q.explanation.trim().length, q.id).toBeGreaterThan(20);
      expect(q.license).toBe("JAEIC-permission-required");
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.jaeic\.or\.jp\/.*1st-mondai[12]\.pdf#page=\d+$/);
      expect(q.sourceAnswerUrl).toMatch(/^https:\/\/www\.jaeic\.or\.jp\/.*1st-kijyun\.pdf$/);
      expect(q.sourceAttribution).toContain("公益財団法人建築技術教育普及センター");
      expect(q.sourceAttribution).toContain("解説は当サイト独自作成");
      for (const key of CHOICES) {
        expect(q.choices?.[key]?.trim().length, q.id + key).toBeGreaterThan(0);
        const explanation = q.choiceExplanations?.[key] ?? "";
        expect(explanation.trim().length, q.id + key).toBeGreaterThan(10);
        expect(explanation).not.toMatch(/TODO|未作成|解説を作成|要生成/);
        total++;
      }
    }
    expect(total).toBe(840);
  });

  it("retains the booklet's April 2025 legal exception and the 2026 legal cutoff", () => {
    for (const q of corpus.filter(q => q.year === 2026)) {
      expect(q.lawReferenceDate, q.id).toBe("2026-01-01");
      expect(q.examDate).toBe("2026-06-21");
    }
    const exceptions = new Set(["am1-q4", "am2-q1", "am2-q6", "am2-q13", "am2-q18"]);
    for (const q of corpus.filter(q => q.year === 2025)) {
      expect(q.lawReferenceDate, q.id).toBe(exceptions.has(`${q.session}-q${q.qNumber}`) ? "2025-04-01" : "2025-01-01");
    }
    const scope = corpus.find(q => q.year === 2025 && q.session === "am2" && q.qNumber === 13)!;
    expect(scope.choiceExplanations?.エ).toMatch(/16\s*m|16メートル|16ｍ/);
    expect(scope.choiceExplanations?.エ).toMatch(/4階|４階|四階/);
  });

  it("keeps the verified official-key conflict visible and excludes it from practice", () => {
    expect(corpus.filter(q => q.needsReview).map(q => q.id)).toEqual([HOLD]);
    const held = corpus.find(q => q.id === HOLD)!;
    expect(held.answer).toBe("ア");
    expect(held.choices?.イ).toMatch(/450/);
    expect(held.choiceExplanations?.イ).toMatch(/500/);
    expect(held.choiceExplanations?.イ).toMatch(/不整合|整合しない|矛盾|衝突/);
    expect(held.choiceExplanations?.イ).not.toMatch(/別の増築基準/);
    expect(isPracticeReadyQuestion(held)).toBe(false);
    for (const q of corpus.filter(q => q.id !== HOLD)) expect(isPracticeReadyQuestion(q), q.id).toBe(true);
  });

  it("accounts for every source figure without shipping originals in public assets", () => {
    expect(manifest).toHaveLength(32);
    const referenced = new Set<string>();
    for (const q of corpus) {
      const assets = [...(q.imageUrls ?? []), ...Object.values(q.choiceImageUrls ?? {}).filter((v): v is string => Boolean(v))];
      expect(q.hasImage, q.id).toBe(assets.length > 0);
      expect(q.imageAltTexts?.length ?? 0, q.id).toBe(q.imageUrls?.length ?? 0);
      for (const url of assets) referenced.add(url);
    }
    expect(referenced.size).toBe(32);
    for (const asset of manifest) {
      expect(asset.state).toBe("VISUALLY_VERIFIED");
      expect(referenced.has(asset.futureImageUrl)).toBe(true);
      const bytes = readFileSync(resolve(process.cwd(), asset.privateAssetPath));
      expect(createHash("sha256").update(bytes).digest("hex")).toBe(asset.sha256);
      expect(existsSync(resolve(process.cwd(), "public" + asset.futureImageUrl))).toBe(false);
      expect(asset.page).toBeGreaterThan(0);
      expect(asset.sourcePdfSha256).toMatch(/^[a-f0-9]{64}$/);
    }
    for (const [year, number] of [[2025, 32], [2025, 42], [2026, 32]]) {
      const q = corpus.find(q => q.year === year && q.session === "pm" && q.qNumber === number)!;
      expect(Object.keys(q.choiceImageUrls ?? {}), q.id).toEqual(CHOICES);
    }
    expect(existsSync(resolve(process.cwd(), base, "index.ts"))).toBe(true);
  });
});
