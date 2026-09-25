import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { CIVIL2_QUESTIONS } from "@/data/questions/civil2";
import { examTopicPageExists } from "@/lib/seo/exam-meta";

const official = JSON.parse(readFileSync(resolve(process.cwd(), "reports/civil2-2026-completion-20260926/official-extract.json"), "utf8")) as {
  questionSha256: string;
  answerSha256: string;
  answerByNumber: Record<string, number>;
};

describe("2026年前期2級土木施工管理・公式66問", () => {
  it("問番号、公式正答、全肢解説が欠落・重複しない", () => {
    expect(CIVIL2_QUESTIONS.map((q) => q.qNumber)).toEqual(Array.from({ length: 66 }, (_, i) => i + 1));
    expect(Object.keys(official.answerByNumber)).toHaveLength(66);
    for (const q of CIVIL2_QUESTIONS) {
      expect(q.officialAnswerNumber).toBe(String(official.answerByNumber[String(q.qNumber)]));
      expect(Object.keys(q.choices ?? {})).toEqual(["ア", "イ", "ウ", "エ"]);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(["ア", "イ", "ウ", "エ"]);
      expect(Object.values(q.choiceExplanations ?? {}).every((reason) => reason.trim().length > 15)).toBe(true);
      expect(q.sourcePdfUrl).toContain("jctc.jp");
      expect(q.sourceAnswerUrl).toContain("jctc.jp");
    }
  });

  it("公式の選択群と必須群を5区分に整理する", () => {
    const groups = [
      [1, 5, "土木一般（必須）"],
      [17, 36, "専門土木（選択）"],
      [37, 47, "法規（選択）"],
      [48, 66, "施工管理（必須）"],
    ] as const;
    for (const [first, last, category] of groups) {
      expect(CIVIL2_QUESTIONS.filter((q) => q.qNumber >= first && q.qNumber <= last).every((q) => q.category === category)).toBe(true);
    }
    expect(CIVIL2_QUESTIONS.filter((q) => q.qNumber >= 6 && q.qNumber <= 16)).toHaveLength(11);
  });

  it("先行公開11問の旧8分野URLを保つ", () => {
    const originalCategories = [
      "土工・建設機械", "土質試験", "盛土", "軟弱地盤",
      "コンクリート材料", "コンクリート施工", "基礎工", "土留め",
    ];
    const publishedCategories = new Set(CIVIL2_QUESTIONS.map((q) => q.category));
    for (const category of originalCategories) {
      expect(publishedCategories.has(category), `/${"civil2"}/topic/${encodeURIComponent(category)}`).toBe(true);
      expect(examTopicPageExists("civil2", category)).toBe(true);
    }
  });

  it("公式図が必要な問には閲覧可能な固有画像がある", () => {
    const imageNumbers = [1, 2, 3, 4, 5, 48, 50, 62];
    for (const number of imageNumbers) {
      const q = CIVIL2_QUESTIONS[number - 1];
      expect(q?.hasImage).toBe(true);
      expect(q?.imageUrls).toHaveLength(1);
      expect(existsSync(resolve(process.cwd(), "public", q!.imageUrls![0]!.replace(/^\//, "")))).toBe(true);
    }
  });
});
