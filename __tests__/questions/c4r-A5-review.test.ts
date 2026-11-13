import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import generated from "@/mobile/src/generated/catalog.json";
import type { ChoiceKey, ExamCode, Question } from "@/lib/questions/types";

function question(exam: string, year: number, suffix: string): Question {
  const rows: Question[] = JSON.parse(readFileSync(`data/questions/${exam}/${year}-early.json`, "utf8"));
  return rows.find(q => q.id.endsWith(suffix))!;
}

// Expected wording was read from the cited official PDF, including incorrect distractors.
// The official answer stays unchanged when a distractor's transcription is corrected.
const cases: [string, number, string, ChoiceKey, string, string][] = [
  ["engei-soshoku1", 2024, "b-019", "イ", "シザンサス", "ハ"],
  ["sasshi2", 2023, "b-013", "エ", "一重サッシとして設計", "ニ"],
  ["sasshi2", 2023, "b-024", "ア", "1年", "ハ"],
  ["kyoka-plastic1", 2025, "b-006", "イ", "不飽和ポリエステル樹脂", "ニ"],
  ["kyoka-plastic1", 2025, "b-006", "ウ", "アセトン", "ニ"],
  ["kyoka-plastic1", 2025, "b-006", "エ", "塩酸", "ニ"],
  ["kyoka-plastic1", 2025, "b-017", "イ", "低圧の噴流水", "ロ"],
  ["kagaku-bunseki1", 2025, "b-004", "エ", "セシウムイオン", "ニ"],
  ["kagaku-bunseki1", 2025, "b-006", "ウ", "1 m³中", "ニ"],
  ["chikuro2", 2024, "b-007", "エ", "迎えとろ", "ロ"],
  ["chikuro2", 2023, "b-011", "エ", "所要空気量は、使用する器工具によって異なる。", "ハ"],
];

describe("c4r-A5 official-source corrections", () => {
  it.each(cases)("%s %i %s %s preserves the official choice and answer", (exam, year, suffix, key, text, official) => {
    const q = question(exam, year, suffix);
    expect(q.choices?.[key]).toContain(text);
    expect(q.officialAnswerNumber).toBe(official);
  });
  it("preserves the gondola original and key while explaining the statutory distinction", () => {
    const q = question("sasshi1", 2025, "b-011");
    expect(q.choices?.ア).toBe("ゴンドラ性能検査の検査証の有効期間は、1年未満である。");
    expect(q.officialAnswerNumber).toBe("ロ");
    expect(q.answer).toBe("イ");
    expect(q.explanation).toContain("原則1年");
    expect(q.explanation).toContain("1か月以内ごとに1回");
    expect(q.explanation).toContain("1年未満に短縮");
  });
  it("keeps the exact underlined scope in the dust concentration question", () => {
    expect(question("kagaku-bunseki1", 2025, "b-006").question).toContain("乾き排ガス（ハ）1 m³中");
  });
  it.each(["engei-soshoku1", "engei-soshoku3", "sasshi1", "sasshi2", "kyoka-plastic1", "kyoka-plastic2", "kagaku-bunseki1", "kagaku-bunseki3", "chikuro1", "chikuro2"] as ExamCode[])("%s mobile catalog matches corrected practice content", async exam => {
    const rows = (await getQuestionsForExam(exam)).filter(isPracticeReadyQuestion);
    const entry = generated.exams.find(e => e.code === exam)!;
    const serialized = JSON.stringify(rows);
    expect(entry.count).toBe(rows.length);
    expect(entry.bytes).toBe(Buffer.byteLength(serialized));
    expect(entry.revision).toBe(createHash("sha256").update(serialized).digest("hex"));
  });
});
