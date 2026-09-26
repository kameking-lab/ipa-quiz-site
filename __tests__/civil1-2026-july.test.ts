import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { CIVIL1_2026_A_QUESTIONS, CIVIL1_2026_B_QUESTIONS, CIVIL1_QUESTIONS } from "@/data/questions/civil1";
import paperA from "@/data/questions/civil1/2026-july-a.json";
import paperB from "@/data/questions/civil1/2026-july-b.json";
import { isExamPublished } from "@/lib/qualifications/catalog";
import { defaultPracticeSession, practiceSessionLabel } from "@/lib/questions/practice-session";
import { questionPagePath } from "@/lib/seo/question-url";
import { formatYearSeason } from "@/lib/utils";

const report = (name: string) => JSON.parse(readFileSync(resolve(process.cwd(), "reports/civil1-2026-july", name), "utf8"));
const answerKey = report("official-answer-key.json") as { answersA: Record<string, number>; answersB: Record<string, number> };
const ledger = report("acceptance-ledger.json") as { held: string[]; accepted: string[] };
const figures = report("figures-ledger.json") as Record<string, { sha256: string }>;
const keys = ["ア", "イ", "ウ", "エ"] as const;

describe("civil1 2026 July first-stage exam", () => {
  it("publishes every official paper A question and paper B except the held No.7", () => {
    expect(CIVIL1_2026_A_QUESTIONS.map((q) => q.qNumber)).toEqual(Array.from({ length: 66 }, (_, i) => i + 1));
    expect(CIVIL1_2026_B_QUESTIONS.map((q) => q.qNumber)).toEqual(Array.from({ length: 35 }, (_, i) => i + 1).filter((n) => n !== 7));
    expect(paperA.publishedCount).toBe(66);
    expect(paperB.publishedCount).toBe(34);
    expect(ledger.held).toEqual(["B7"]);
    expect(ledger.accepted).toHaveLength(100);
    expect(new Set(CIVIL1_QUESTIONS.map((q) => q.id)).size).toBe(100);
  });

  it("matches the SHA-pinned official answer PDF for every published question", () => {
    expect(paperA.answerSha256).toBe("aebeaf4a0fbb5f758afa9952d128b35a961119ea5dafb44923e1ec78187c6e46");
    expect(paperA.questionSha256).toBe("a0835f57e998d5e00235fb40e3fda329cbcf3f9d7daca90a30f323dcd5a6d302");
    expect(paperB.questionSha256).toBe("6e8ee05d9773b4be548d34ace43ce5043445bcebeadbd3a8e6298e15800f495f");
    for (const q of CIVIL1_QUESTIONS) {
      const key = q.session === "mondai-a" ? answerKey.answersA : answerKey.answersB;
      const official = key[String(q.qNumber)];
      expect(q.officialAnswerNumber, q.id).toBe(String(official));
      expect(q.answer, q.id).toBe(keys[official! - 1]);
    }
  });

  it("keeps four choices, four reasons and source metadata on every question", () => {
    for (const q of CIVIL1_QUESTIONS) {
      expect(Object.keys(q.choices ?? {}), q.id).toEqual([...keys]);
      expect(Object.values(q.choiceExplanations ?? {}).filter((text) => text.trim().length >= 20), q.id).toHaveLength(4);
      expect(q.explanationCoverage).toBe("full");
      expect(q.license).toBe("JCTC-authorized-reuse");
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.jctc\.jp\/wjctcp\/wp-content\/uploads\/2026\/07\/20260706d_mondai[ab]\.pdf$/);
      expect(q.sourceAnswerUrl).toBe("https://www.jctc.jp/wjctcp/wp-content/uploads/2026/07/20260706d_seitou.pdf");
      expect(q.sourceAttribution).toContain("全国建設研修センター");
      expect(q.question).not.toMatch(/【No\./);
    }
  });

  it("serves SHA-pinned official figures for the figure questions", () => {
    const withImages = CIVIL1_QUESTIONS.filter((q) => q.hasImage);
    expect(withImages.map((q) => `${q.session === "mondai-a" ? "A" : "B"}${q.qNumber}`).sort()).toEqual(["A1", "A2", "A3", "A39", "A4", "A5", "B3", "B32", "B6"].sort());
    for (const q of withImages) {
      const path = q.imageUrls![0]!;
      const label = path.match(/\/([ab]\d+)-official-figure\.png$/)![1]!.toUpperCase();
      const bytes = readFileSync(resolve(process.cwd(), "public", path.slice(1)));
      expect(createHash("sha256").update(bytes).digest("hex"), path).toBe(figures[label]!.sha256);
    }
  });

  it("is routed as a published exam with paper A/B practice sessions", () => {
    expect(isExamPublished("civil1")).toBe(true);
    expect(defaultPracticeSession("civil1")).toBe("mondai-a");
    expect(practiceSessionLabel("mondai-a")).toBe("問題A");
    expect(practiceSessionLabel("mondai-b")).toBe("問題B");
    expect(formatYearSeason(2026, "july")).toBe("令和8年度 7月試験");
    expect(questionPagePath(CIVIL1_2026_B_QUESTIONS[0]!)).toBe("/q/civil1/2026-july/mondai-b/q1");
  });
});
