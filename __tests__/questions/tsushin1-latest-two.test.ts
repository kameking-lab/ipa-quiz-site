import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { TSUSHIN1_QUESTIONS } from "@/data/questions/tsushin1";
import source from "@/data/questions/tsushin1/2025-september.json";
import answers from "@/docs/evidence/tsushin1-2025/complete/OFFICIAL-ANSWERS.json";
import crops from "@/docs/evidence/tsushin1-2025/complete/CROP-RECEIPTS.json";
import provenance from "@/docs/evidence/tsushin1-2025/complete/provenance.json";
import preservation from "@/docs/evidence/tsushin1-2025/complete/2026-PRESERVATION.json";

const yearQuestions = TSUSHIN1_QUESTIONS.filter((q) => q.year === 2025);

describe("1級電気通信工事 最新2回全180原問", () => {
  it("2年度それぞれA55問B35問を重複・欠落なく収録する", () => {
    expect(TSUSHIN1_QUESTIONS).toHaveLength(180);
    expect(new Set(TSUSHIN1_QUESTIONS.map((q) => q.id)).size).toBe(180);
    expect(new Set(TSUSHIN1_QUESTIONS.map((q) => `${q.year}/${q.session}/${q.qNumber}`)).size).toBe(180);
    expect(yearQuestions).toHaveLength(90);
    for (const year of [2025, 2026]) {
      for (const [session, count] of [["mondai-a", 55], ["mondai-b", 35]] as const) {
        const questions = TSUSHIN1_QUESTIONS.filter((q) => q.year === year && q.session === session);
        expect(questions.map((q) => q.qNumber)).toEqual(Array.from({ length: count }, (_, i) => i + 1));
      }
    }
    expect(createHash("sha256").update(readFileSync(resolve(process.cwd(), preservation.file))).digest("hex")).toBe(preservation.sha256);
  });

  it("令和7年度の答表90肢と全4肢説明を原問の順序で保持する", () => {
    const keys = ["ア", "イ", "ウ", "エ"];
    for (const q of yearQuestions) {
      const session = q.session as keyof typeof answers;
      expect(q.answer).toBe(keys[answers[session][q.qNumber - 1]! - 1]);
      expect(q.officialAnswerNumber).toBe(String(answers[session][q.qNumber - 1]));
      expect(q.explanation.length).toBeGreaterThanOrEqual(50);
      expect(Object.values(q.choices ?? {})).toHaveLength(4);
      expect(new Set(Object.values(q.choices ?? {})).size).toBe(4);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(keys);
      expect(Object.values(q.choiceExplanations ?? {}).every((s) => s && s.length > 15)).toBe(true);
      expect(q.explanationCoverage).toBe("full");
      expect(q.sourceAttribution).toContain("公開保存コピー");
      expect(q.sourceAttribution).toContain("直接取得");
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/dobokujira\.com\//);
      expect([q.question, ...Object.values(q.choices ?? {})].join("\n")).not.toMatch(/[\x00-\x08\x0b\x0c\x0e-\x1f\ue000-\uf8ff]|姶|挨|文章中のの|※\s*問題番号/);
    }
  });

  it("実際の取得元とPDF・図表画像のSHA-256を照合する", () => {
    expect(source.papers.map((p) => p.publishedCount)).toEqual([55, 35]);
    for (const receipt of provenance.files) {
      const file = resolve(process.cwd(), "docs/evidence/tsushin1-2025", receipt.localPath);
      expect(createHash("sha256").update(readFileSync(file)).digest("hex")).toBe(receipt.sha256);
      expect(receipt.sourceUrl).toMatch(/^https:\/\/dobokujira\.com\//);
    }
    for (const crop of crops) {
      const q = yearQuestions.find((q) => q.session === crop.session && q.qNumber === crop.number);
      expect(q?.hasImage).toBe(true);
      expect(q?.imageUrls).toHaveLength(crop.images.length);
      expect(q?.imageAltTexts).toHaveLength(crop.images.length);
      for (const receipt of crop.images) {
        const file = resolve(process.cwd(), "public/images/tsushin1/2025", receipt.file);
        expect(existsSync(file)).toBe(true);
        expect(createHash("sha256").update(readFileSync(file)).digest("hex")).toBe(receipt.sha256);
      }
    }
    for (const q of yearQuestions) {
      if (/下図|図1|図2|図に示|右図|次の図|下表|表に示/.test(q.question)) expect(q.hasImage).toBe(true);
    }
  });
});
