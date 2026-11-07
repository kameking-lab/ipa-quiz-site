import { describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { KHK_KIKAI_STAGING } from "@/data/qualification-staging/khk-kikai";
import { ALL_QUESTIONS } from "@/data/questions";
import { ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";
import { validateKhkKikai } from "@/scripts/validate-khk-kikai";

const kou = KHK_KIKAI_STAGING[0].questions;
const otsu = KHK_KIKAI_STAGING[1].questions;
const q = (year: number, session: string, n: number) => kou.find(item => item.year === year && item.session === session && item.qNumber === n)!;

describe("高圧ガス 甲種機械・乙種機械の未公開データ", () => {
  it("全180原問と原本・SHA256・公式正答・必要図を検証する", () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    try { expect(validateKhkKikai()).toBe(180); } finally { log.mockRestore(); }
    expect(kou).toHaveLength(80);
    expect(otsu).toHaveLength(100);
  });

  it("batch1公開後: 両資格を分離し、問題・資格一覧・試験資料の公開登録から隔離する", () => {
    for (const qualification of KHK_KIKAI_STAGING) {
      const entry = QUALIFICATION_CATALOG.find(row => row.slug === qualification.slug)!;
      expect(entry.status).toBe("live");
      expect(entry.examCode).toBeDefined();
      expect(ALL_QUIZ_EXAM_CODES as readonly string[]).toContain(qualification.slug);
    }
    expect(ALL_QUESTIONS.some(item => item.id.startsWith("khk-kikai-"))).toBe(true);
    expect(readFileSync("data/exam-library/official-catalog.json", "utf8")).not.toContain('"khk-kikai-');
    expect([...kou, ...otsu].every(item => item.publicAllowed === false && item.needsReview === true)).toBe(true);
  });

  it("甲種機械と甲種化学で異なる正答を取り違えない", () => {
    expect(q(2024, "hoan", 7).officialAnswerNumber).toBe(5);
    expect(q(2024, "hoan", 7).answer).toBe("オ");
    expect(q(2025, "hoki", 12).officialAnswerNumber).toBe(4);
    expect(otsu.find(item => item.year === 2025 && item.session === "hoki" && item.qNumber === 12)?.officialAnswerNumber).toBe(5);
  });

  it("共通設例と法令基準日を本文から失わない", () => {
    expect(q(2025, "hoki", 8).question).toContain("100,000,000");
    expect(q(2024, "hoki", 20).question).toContain("350,000");
    for (const item of [...kou, ...otsu].filter(item => item.session === "hoki")) {
      expect(item.lawReferenceDate).toBe(`${item.year}-04-01`);
      expect(item.explanation).toContain("出題時点");
    }
  });

  it("数値問題の表を五つの選択肢へ転記し、計算結果と対応させる", () => {
    const item = otsu.find(item => item.year === 2024 && item.session === "gakushiki" && item.qNumber === 9)!;
    expect(item.choices?.ウ).toBe("σθ=25.0 MPa、σz=12.5 MPa");
    expect(item.answer).toBe("ウ");
    expect(2.5 * 200 / (2 * 10)).toBe(25);
    expect(2.5 * 200 / (4 * 10)).toBe(12.5);
    expect(otsu.find(item => item.year === 2025 && item.session === "gakushiki" && item.qNumber === 2)?.explanation).toContain("5.0 MPa");
  });

  it("記述式は10原問を維持し、計算・作図の解答例を示す", () => {
    const descriptive = kou.filter(item => item.type === "descriptive");
    expect(descriptive).toHaveLength(10);
    expect(descriptive.every(item => item.officialAnswerKind === "example" && item.modelAnswer && item.scoringCriteria)).toBe(true);
    expect(q(2024, "gakushiki", 1).modelAnswer).toContain("261 W/(m²·K)");
    expect(q(2025, "gakushiki", 1).modelAnswer).toContain("56.8 m");
    expect(q(2025, "gakushiki", 2).modelAnswer).toContain("5.00×10⁴");
    expect(q(2025, "gakushiki", 3).answerImageUrls).toHaveLength(1);
    expect(q(2025, "gakushiki", 5).modelAnswer).toContain("（ハ）");
  });

  it.each([
    ["answer", "ア", "公式正答不一致"],
    ["publicAllowed", true, "公開不可"],
    ["sharedContext", "", "共通設例欠落"],
  ])("%sを壊したデータは検証に失敗する", (field, value, error) => {
    const item = q(2025, "hoki", 8) as unknown as Record<string, unknown>;
    const original = item[field];
    item[field] = value;
    try { expect(() => validateKhkKikai()).toThrow(String(error)); }
    finally { item[field] = original; }
  });
});
