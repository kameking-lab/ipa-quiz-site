import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { TOBI2_QUESTIONS } from "@/data/questions/tobi2";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { choiceDisplayLabel, questionNumberLabel } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import type { ChoiceKey, Question } from "@/lib/questions/types";

// Official answer sheets, independently transcribed in printed group order.
const papers: { questions: Question[]; tf: string; mc: string; figures: string[] }[] = [
  {
    questions: TOBI2_QUESTIONS.filter(q => q.year === 2024),
    tf: "○××○○×○○○○××○×○×××○×○××××",
    mc: "ハロロハハロロニハイイロニニロニイハイハロハロロハ",
    figures: ["B群 3", "B群 8", "B群 21"],
  },
];
const keys: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];
const printed = ["イ", "ロ", "ハ", "ニ"];

describe("とび技能士 追加原本の採点・原図・演習接続", () => {
  for (const paper of papers) {
    it(`${paper.questions[0]?.exam} ${paper.questions[0]?.year}: 全原問と公式正答の対応を保つ`, () => {
      const n = paper.tf.length;
      expect(paper.mc).toHaveLength(n);
      expect(paper.questions).toHaveLength(n * 2);
      expect(new Set(paper.questions.map(q => q.id)).size).toBe(n * 2);
      paper.questions.forEach((q, i) => {
        const group = i < n ? "A" : "B";
        const number = i % n + 1;
        const official = (i < n ? paper.tf : paper.mc)[number - 1];
        expect(q.qNumber, q.id).toBe(i + 1);
        expect(questionNumberLabel(q)).toBe(`${group}群 ${number}`);
        expect(q.id).toBe(`${q.exam}-${q.year}-early-gakka-${group.toLowerCase()}-${String(number).padStart(3, "0")}`);
        expect(q.officialAnswerNumber, q.id).toBe(official);
        expect(q.answer, q.id).toBe(i < n ? (official === "○" ? "ア" : "イ") : keys[printed.indexOf(official)]);
        expect(Object.keys(q.choices ?? {})).toHaveLength(i < n ? 2 : 4);
        expect(Object.keys(q.choiceExplanations ?? {}).sort()).toEqual(Object.keys(q.choices ?? {}).sort());
        expect(isPracticeReadyQuestion(q), q.id).toBe(true);
        expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.kentei\.javada\.or\.jp\/pdf\/.+#page=\d+$/);
        expect(q.sourceAnswerUrl).toContain("%E6%AD%A3%E8%A7%A3%E8%A1%A8");
        expect(EXAM_CONFIGS[q.exam].sessions[0].categories).toContain(q.category);
      });
      expect(paper.questions.filter(q => q.hasImage).map(q => q.officialQuestionLabel)).toEqual(paper.figures);
      for (const q of paper.questions.filter(q => q.hasImage)) {
        expect(q.imageUrls).toHaveLength(1);
        expect(q.imageAltTexts?.[0].length).toBeGreaterThan(10);
        const file = join(process.cwd(), "public", q.imageUrls![0]);
        expect(existsSync(file), file).toBe(true);
        const header = readFileSync(file).subarray(0, 12).toString("ascii");
        expect(header.slice(0, 4)).toBe("RIFF");
        expect(header.slice(8)).toBe("WEBP");
      }
    });
  }
  it("同期と遅延ロードが同じ原本問題を返し、イロハニ表示で解ける", async () => {
    expect(QUESTIONS_BY_EXAM.tobi2).toEqual(TOBI2_QUESTIONS);
    expect(await getQuestionsForExam("tobi2")).toEqual(TOBI2_QUESTIONS);
    expect(keys.map(k => choiceDisplayLabel("tobi2", k))).toEqual(printed);
    expect(TOBI2_QUESTIONS[0].choices).toEqual({ ア: "正しい（○）", イ: "誤り（×）" });
  });
  it("図面の種類を問う文字問題を演習でき、実際の図参照には画像を要求する", () => {
    const q = TOBI2_QUESTIONS.find(q => q.year === 2024 && q.officialQuestionLabel === "B群 12")!;
    expect(q.question).toContain("次の図面");
    expect(q.hasImage).toBe(false);
    expect(isPracticeReadyQuestion(q)).toBe(true);
    expect(isPracticeReadyQuestion({ ...q, question: "次の図に示すものはどれか。" })).toBe(false);
  });
});
