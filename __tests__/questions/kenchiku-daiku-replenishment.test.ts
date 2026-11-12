import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { KENCHIKU_DAIKU1_QUESTIONS } from "@/data/questions/kenchiku-daiku1";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { choiceDisplayLabel, questionNumberLabel } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { EXAM_CONFIGS } from "@/lib/exam-config";

// Independent transcription of the official 2024-late answer sheet, in group order.
const tf = "○×○×○×○××○○×○○○○××××○○××○";
const mc = "ハイニニイニニロハニイニロロロロイロロニハロニハロ";

describe("建築大工2024年度1級後期の原本と演習接続", () => {
  const questions = KENCHIKU_DAIKU1_QUESTIONS.filter(q => q.year === 2024 && q.season === "late");
  it("A・B群の全50問を公式正答で採点し、原問番号を表示する", () => {
    expect(questions).toHaveLength(50);
    expect(tf).toHaveLength(25);
    expect(mc).toHaveLength(25);
    expect(new Set(questions.map(q => q.id)).size).toBe(50);
    questions.forEach((q, i) => {
      const a = i < 25;
      const n = i % 25 + 1;
      const official = (a ? tf : mc)[n - 1];
      expect(q.qNumber, q.id).toBe(i + 1);
      expect(questionNumberLabel(q)).toBe(`${a ? "A" : "B"}群 ${n}`);
      expect(q.officialAnswerNumber, q.id).toBe(official);
      expect(q.answer, q.id).toBe(a ? (official === "○" ? "ア" : "イ") : "アイウエ"["イロハニ".indexOf(official)]);
      expect(Object.keys(q.choices ?? {})).toHaveLength(a ? 2 : 4);
      expect(Object.keys(q.choiceExplanations ?? {}).sort()).toEqual(Object.keys(q.choices ?? {}).sort());
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(EXAM_CONFIGS[q.exam].sessions[0].categories).toContain(q.category);
    });
  });
  it("図が必要な10問に読める原図と代替テキストを持つ", () => {
    expect(questions.filter(q => q.hasImage).map(q => q.officialQuestionLabel)).toEqual([
      "A群 5", "A群 10", "A群 17", "A群 23", "B群 3", "B群 8", "B群 15", "B群 19", "B群 20", "B群 23",
    ]);
    for (const q of questions.filter(q => q.hasImage)) {
      expect(q.imageUrls).toHaveLength(1);
      expect(q.imageAltTexts?.[0].length).toBeGreaterThan(10);
      const path = join(process.cwd(), "public", q.imageUrls![0]);
      expect(existsSync(path)).toBe(true);
      expect(readFileSync(path).subarray(8, 12).toString()).toBe("WEBP");
    }
  });
  it("同期と遅延取得で同じ問題を返し、イロハニで解答を表示する", async () => {
    expect(QUESTIONS_BY_EXAM["kenchiku-daiku1"]).toEqual(KENCHIKU_DAIKU1_QUESTIONS);
    expect(await getQuestionsForExam("kenchiku-daiku1")).toEqual(KENCHIKU_DAIKU1_QUESTIONS);
    expect(["ア", "イ", "ウ", "エ"].map(k => choiceDisplayLabel("kenchiku-daiku1", k as "ア"))).toEqual(["イ", "ロ", "ハ", "ニ"]);
  });
});
