import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import manifest from "@/data/qualification-staging/khk-kagaku/2026-kou/manifest.json";
import review from "@/data/qualification-staging/khk-kagaku/2026-kou/review.json";
import ready from "@/data/questions/khk-kagaku/ready.json";
import publicQuestions from "@/data/questions/khk-kagaku/public-questions.json";
import imageAllowlist from "@/data/questions/khk-kagaku/image-assets.json";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { KHK_2026_KOU_STAGING, validateKhk2026KouStaging } from "@/scripts/lib/validate-khk-kagaku-2026-kou";

describe("2026 KHK kou private originals", () => {
  it("retains 35 reviewed source transcriptions and exact official keys", () => {
    expect(validateKhk2026KouStaging()).toEqual([]);
    expect(KHK_2026_KOU_STAGING.filter(q => q.session === "khk-ax")).toHaveLength(20);
    expect(KHK_2026_KOU_STAGING.filter(q => q.session === "khk-ay")).toHaveLength(15);
    expect(KHK_2026_KOU_STAGING.flatMap(q => Object.values(q.choiceExplanations!))).toHaveLength(175);
    expect(review.questions.every(q => q.transcriptionVerified && q.officialAnswerVerified)).toBe(true);
  });

  it("preserves the correct shared case and the printed formula, including its erroneous P factor", () => {
    const law = KHK_2026_KOU_STAGING.filter(q => q.session === "khk-ax");
    for (const q of law.filter(q => q.qNumber >= 8)) {
      const caseText = q.originalContent!.sharedPassages![0].text;
      expect(caseText).toContain(q.qNumber <= 12 ? "100,000,000" : "350,000");
      expect(caseText).toContain(q.qNumber <= 12 ? "コンビナート地域内" : "コンビナート地域外");
      expect(q.question).toContain(caseText);
      expect(q.imageUrls![0]).toContain(q.qNumber <= 12 ? "shared-1" : "shared-2");
    }
    const formula = law.find(q => q.qNumber === 6)!;
    expect(formula.originalContent!.body).toContain("G = P × V / C");
    expect(formula.answer).toBe("イ");
    expect(formula.choices!["イ"]).toBe("ロ");
    expect(formula.imageUrls![0]).toContain("q6-formula");
  });

  it("keeps the corpus and its source images out of every serving pool", async () => {
    const stagedIds = new Set(KHK_2026_KOU_STAGING.map(q => q.id));
    expect(manifest.publicAllowed).toBe(false);
    for (const pool of [ready, publicQuestions, QUESTIONS_BY_EXAM["khk-kagaku"], await getQuestionsForExam("khk-kagaku")]) {
      expect(pool!.some(q => stagedIds.has(q.id))).toBe(false);
    }
    for (const asset of review.assets) {
      expect(imageAllowlist).not.toContain(asset.file);
      expect(imageAllowlist).not.toContain(asset.file.split("/").at(-1));
    }
    const loader = readFileSync(resolve("data/questions/khk-kagaku/assets.server.ts"), "utf8");
    expect(loader).not.toContain("2026-AX-");
  });

  it("preserves AY9 scoring and explains the diagram distinction using public evidence", () => {
    const pending = KHK_2026_KOU_STAGING.filter(q => q.needsReview);
    expect(pending.map(q => q.id)).toEqual(manifest.technicalReviewPendingIds);
    expect(pending).toHaveLength(0);
    const q = KHK_2026_KOU_STAGING.find(q => q.id.endsWith("ay-q9"))!;
    expect(q.officialAnswerNumber).toBe("1");
    expect(q.answer).toBe("ア");
    expect(q.choices!["ア"]).toBe("イ、ロ");
    for (const text of [q.explanation, ...(["ウ", "エ", "オ"] as const).map(key => q.choiceExplanations![key])]) {
      expect(text).toContain("4Mで人・機械・作業環境・管理に整理する点は適切");
      expect(text).toContain("連関図との区別");
      expect(text).not.toContain("確認中");
    }
    expect(q.officialReferenceUrls).toContain("https://www.mlit.go.jp/toshi/content/001484354.pdf#page=20");
    expect(review.questions.filter(q => q.explanationReviewed)).toHaveLength(35);
  });
});
