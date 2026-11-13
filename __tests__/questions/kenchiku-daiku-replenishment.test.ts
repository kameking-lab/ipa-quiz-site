import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { KENCHIKU_DAIKU1_QUESTIONS } from "@/data/questions/kenchiku-daiku1";
import { KENCHIKU_DAIKU3_QUESTIONS } from "@/data/questions/kenchiku-daiku3";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { choiceDisplayLabel, questionNumberLabel } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import type { ChoiceKey } from "@/lib/questions/types";

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
    expect((["ア", "イ", "ウ", "エ"] as ChoiceKey[]).map(k => choiceDisplayLabel("kenchiku-daiku1", k))).toEqual(["イ", "ロ", "ハ", "ニ"]);
  });
});

describe("建築大工3級2024年度後期の原本と前後期の区別", () => {
  const questions = KENCHIKU_DAIKU3_QUESTIONS.filter(q => q.year === 2024 && q.season === "late");
  const official = "○××○○×××××○○○○×○×○○○×××○××××○○";
  it("後期30問を公式正答で採点し、前期と同じ番号でも区別する", () => {
    expect(questions).toHaveLength(30);
    expect(official).toHaveLength(30);
    questions.forEach((q, i) => {
      expect(q.id).toBe(`kenchiku-daiku3-2024-late-gakka-${String(i + 1).padStart(3, "0")}`);
      expect(q.qNumber).toBe(i + 1);
      expect(q.officialAnswerNumber, q.id).toBe(official[i]);
      expect(q.answer, q.id).toBe(official[i] === "○" ? "ア" : "イ");
      expect(Object.keys(q.choiceExplanations ?? {}).sort()).toEqual(["ア", "イ"]);
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(EXAM_CONFIGS[q.exam].sessions[0].categories).toContain(q.category);
    });
    const both = KENCHIKU_DAIKU3_QUESTIONS.filter(q => q.year === 2024);
    expect(both).toHaveLength(60);
    expect(new Set(both.map(q => q.id)).size).toBe(60);
    expect(EXAM_CONFIGS["kenchiku-daiku3"].seasons).toEqual(["early", "late"]);
  });
  it("後期の図を必要とする9問に原図を持つ", () => {
    expect(questions.filter(q => q.hasImage).map(q => q.qNumber)).toEqual([6, 7, 8, 9, 16, 17, 25, 27, 28]);
    for (const q of questions.filter(q => q.hasImage)) {
      expect(q.imageAltTexts?.[0].length).toBeGreaterThan(10);
      const path = join(process.cwd(), "public", q.imageUrls![0]);
      expect(existsSync(path)).toBe(true);
      expect(readFileSync(path).subarray(8, 12).toString()).toBe("WEBP");
    }
  });
});

describe("建築大工3級2024年度前期の原本と演習接続", () => {
  const questions = KENCHIKU_DAIKU3_QUESTIONS.filter(q => q.year === 2024 && q.season === "early");
  const official = "○○○○×○×○○○×○×××○○××○××○×○○○××○";
  it("真偽法30問を群なしの原問番号と公式正答で演習できる", async () => {
    expect(questions).toHaveLength(30);
    expect(official).toHaveLength(30);
    questions.forEach((q, i) => {
      expect(q.id).toBe(`kenchiku-daiku3-2024-early-gakka-${String(i + 1).padStart(3, "0")}`);
      expect(q.qNumber).toBe(i + 1);
      expect(questionNumberLabel(q)).toBe(String(i + 1));
      expect(q.officialAnswerNumber, q.id).toBe(official[i]);
      expect(q.answer, q.id).toBe(official[i] === "○" ? "ア" : "イ");
      expect(Object.keys(q.choiceExplanations ?? {}).sort()).toEqual(["ア", "イ"]);
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(EXAM_CONFIGS[q.exam].sessions[0].categories).toContain(q.category);
    });
    expect(QUESTIONS_BY_EXAM["kenchiku-daiku3"]).toEqual(KENCHIKU_DAIKU3_QUESTIONS);
    expect(await getQuestionsForExam("kenchiku-daiku3")).toEqual(KENCHIKU_DAIKU3_QUESTIONS);
    expect(choiceDisplayLabel("kenchiku-daiku3", "ア")).toBe("○");
    expect(choiceDisplayLabel("kenchiku-daiku3", "イ")).toBe("×");
  });
  it("図が必要な6問に原図と代替テキストを備える", () => {
    expect(questions.filter(q => q.hasImage).map(q => q.qNumber)).toEqual([5, 8, 22, 26, 27, 28]);
    for (const q of questions.filter(q => q.hasImage)) {
      expect(q.imageAltTexts?.[0].length).toBeGreaterThan(10);
      const path = join(process.cwd(), "public", q.imageUrls![0]);
      expect(existsSync(path)).toBe(true);
      expect(readFileSync(path).subarray(8, 12).toString()).toBe("WEBP");
    }
  });
});
