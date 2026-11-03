import { describe, it, expect } from "vitest";
import { YAMAGUCHI_SEIKA_QUESTIONS } from "@/data/questions/yamaguchi-seika";
import { YAMAGUCHI_FUGU_QUESTIONS } from "@/data/questions/yamaguchi-fugu";
import groups2025 from "@/data/questions/yamaguchi-fugu/2025-original-groups.json";
import groups2026 from "@/data/questions/yamaguchi-fugu/2026-original-groups.json";
import { existsSync } from "node:fs";
import { YAMAGUCHI_CHORI_QUESTIONS } from "@/data/questions/yamaguchi-chori";
import { isExamPublished } from "@/lib/qualifications/catalog";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { ALL_QUESTIONS } from "@/data/questions";

const papers = [
  { year: 2025, questions: YAMAGUCHI_CHORI_QUESTIONS.filter(q => q.year === 2025), answers: "141123342222324444123314323442433443122412434112324234231342" },
  { year: 2026, questions: YAMAGUCHI_CHORI_QUESTIONS.filter(q => q.year === 2026), answers: "131233344132134123311322332333224331333231424342413124431324" },
];

describe("山口県食品資格のステージング", () => {
  for (const paper of papers) it(`調理師 ${paper.year}: 60問・公式正答・全肢解説・原図`, () => {
    expect(paper.questions).toHaveLength(60);
    expect(paper.questions.map(q => q.qNumber)).toEqual(Array.from({ length: 60 }, (_, i) => i + 1));
    expect(paper.questions.map(q => q.officialAnswerNumber).join("")).toBe(paper.answers);
    for (const q of paper.questions) {
      expect(q.answer).toBe("アイウエ"[Number(q.officialAnswerNumber) - 1]);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/www.pref.yamaguchi.lg.jp\/uploaded\/attachment\/\d+.pdf#page=\d+$/);
      expect(q.sourceAnswerUrl).toBeTruthy();
      expect(q.explanation).toContain("出題時点");
      if (q.hasImage) for (const image of q.imageUrls ?? []) expect(existsSync(`public${image}`)).toBe(true);
    }
  });
  it("資格登録済みでも公開一覧・ローダーには出さない", async () => {
    expect(isExamPublished("yamaguchi-chori")).toBe(false);
    expect(await getQuestionsForExam("yamaguchi-chori")).toEqual([]);
    expect(ALL_QUESTIONS.some(q => q.exam === "yamaguchi-chori")).toBe(false);
  });
});


describe("製菓衛生師: 全選択科目と公式正答", () => {
  const answers: Record<number, string> = {
    2025: "412141123342222324323442433443234232121422142441314132134411122321",
    2026: "433131233344132134332333224331134212324232214342213114334321114124",
  };
  for (const year of [2025, 2026]) it(`${year}: 共通57問＋選択3科目各3問`, () => {
    const qs = YAMAGUCHI_SEIKA_QUESTIONS.filter(q => q.year === year);
    expect(qs).toHaveLength(66);
    expect(qs.map(q => q.officialAnswerNumber).join("")).toBe(answers[year]);
    expect(new Set(qs.map(q => q.id)).size).toBe(66);
    for (const session of ["wagashi", "yogashi", "seipan"]) {
      expect(qs.filter(q => q.session === session).map(q => q.qNumber)).toEqual([58, 59, 60]);
    }
    for (const q of qs) {
      expect(q.answer).toBe("アイウエ"[Number(q.officialAnswerNumber) - 1]);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
      if (q.hasImage) for (const image of q.imageUrls ?? []) expect(existsSync(`public${image}`)).toBe(true);
    }
  });
  it("公開ゲートを維持する", async () => {
    expect(isExamPublished("yamaguchi-seika")).toBe(false);
    expect(await getQuestionsForExam("yamaguchi-seika")).toEqual([]);
    expect(ALL_QUESTIONS.some(q => q.exam === "yamaguchi-seika")).toBe(false);
  });
});


describe("ふぐ処理師: 原大問を保持した解答欄別演習", () => {
  const answers: Record<number, string> = {
    2025: "コアクカキキコイクエ××○○○○×○○×○○○×○イキオエウイウアオエ×○○×○×○×○○××○×○ウアエオイウイエオア×○×○キオエアカイクウ×○○○×○○××○×××○×○×○○×○○○×○×○○",
    2026: "キイコカオキイコアカ××○○○イ×○×○キカクオケキカオエコ×○××○○○×○×○○×○×××××○オウエアイエアウオイ××○○○○ウカアイク××○○×○××○○×○○×○×○×エウオイカア×○×○○",
  };
  for (const year of [2025, 2026]) it(`${year}: 100欄の正答・全語群解説と原大問`, () => {
    const qs = YAMAGUCHI_FUGU_QUESTIONS.filter(q => q.year === year);
    expect(qs).toHaveLength(100);
    expect(qs.map(q => q.qNumber)).toEqual(Array.from({ length: 100 }, (_, i) => i + 1));
    expect(qs.map(q => q.officialAnswerNumber).join("")).toBe(answers[year]);
    const groups = year === 2025 ? groups2025 : groups2026;
    expect(groups).toHaveLength(year === 2025 ? 18 : 19);
    expect(groups.flatMap(g => g.slots)).toEqual(qs.map(q => q.qNumber));
    for (const q of qs) {
      const group = groups.find(g => g.slots.includes(q.qNumber))!;
      expect(q.originalContent?.body).toBe(group.body);
      expect(q.question).toContain(`解答する欄は（${q.qNumber}）`);
      const official = q.officialAnswerNumber!;
      expect(q.answer).toBe(official === "○" ? "ア" : official === "×" ? "イ" : official);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
      if (q.hasImage) for (const image of q.imageUrls ?? []) expect(existsSync(`public${image}`)).toBe(true);
    }
  });
  it("6分岐の図と条件テキストを保持し非公開とする", async () => {
    expect(YAMAGUCHI_FUGU_QUESTIONS.filter(q => q.hasImage).map(q => q.qNumber)).toEqual([90,91,92,93,94,95]);
    for (const q of YAMAGUCHI_FUGU_QUESTIONS.filter(q => q.hasImage)) {
      expect(q.question).toContain("小棘なし");
      expect(q.question).toContain("尾ひれの下縁は白い");
      expect(Object.keys(q.choices ?? {})).toHaveLength(6);
    }
    expect(isExamPublished("yamaguchi-fugu")).toBe(false);
    expect(await getQuestionsForExam("yamaguchi-fugu")).toEqual([]);
    expect(ALL_QUESTIONS.some(q => q.exam === "yamaguchi-fugu")).toBe(false);
  });
});
