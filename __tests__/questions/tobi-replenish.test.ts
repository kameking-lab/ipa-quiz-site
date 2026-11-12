import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { TOBI1_QUESTIONS } from "@/data/questions/tobi1";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { questionPagePath, findQuestionByRoute } from "@/lib/seo/question-url";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { ChoiceKey } from "@/lib/questions/types";

// Independently transcribed from the official answer sheet image, in printed order.
const sittings = [
  { year: 2024, a: "×○○○○××○××○○××○○○×××○○×○○", b: "ハハイロイイハハイニロロニハイニロニロイイイニニロ", figures: ["B群 12", "B群 14", "B群 18"] },
  { year: 2023, a: "○×○○×××○×○×○×○××○×○○×○○×○", b: "ニイイロハニイイハニハロハハロイロニイニニハハニロ", figures: ["A群 11", "A群 15", "A群 16", "B群 13"] },
];
const keys: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];
const printed = ["イ", "ロ", "ハ", "ニ"];

describe("とび技能士1級 追加年度の原本・採点・表示", () => {
  for (const sitting of sittings) {
    it(`${sitting.year}年度50問を公式の群・問番号・正答どおりに演習できる`, () => {
      const qs = TOBI1_QUESTIONS.filter(q => q.year === sitting.year);
      expect(qs).toHaveLength(50);
      expect(sitting.a).toHaveLength(25);
      expect(sitting.b).toHaveLength(25);
      qs.forEach((q, index) => {
        const a = index < 25;
        const n = index % 25 + 1;
        const official = (a ? sitting.a : sitting.b)[n - 1];
        expect(q.id).toBe(`tobi1-${sitting.year}-early-gakka-${a ? "a" : "b"}-${String(n).padStart(3, "0")}`);
        expect(q.qNumber).toBe(index + 1);
        expect(q.officialQuestionLabel).toBe(`${a ? "A" : "B"}群 ${n}`);
        expect(q.officialAnswerNumber, q.id).toBe(official);
        const answer = a ? (official === "○" ? "ア" : "イ") : keys[printed.indexOf(official)];
        expect(q.answer, q.id).toBe(answer);
        expect(formatQuestionAnswerForDisplay(q, answer)).toBe(official);
        expect(isPracticeReadyQuestion(q), q.id).toBe(true);
        expect(Object.keys(q.choices!)).toHaveLength(a ? 2 : 4);
        expect(Object.keys(q.choiceExplanations!).sort()).toEqual(Object.keys(q.choices!).sort());
        expect(q.sourcePdfUrl).toMatch(/#page=\d+$/);
        expect(EXAM_CONFIGS.tobi1.sessions[0].categories).toContain(q.category);
        expect(findQuestionByRoute(qs, { exam: "tobi1", yearSeason: `${sitting.year}-early`, section: "gakka", qnum: `q${index + 1}` })).toBe(q);
      });
      expect(new Set(qs.map(questionPagePath)).size).toBe(50);
      expect(qs.filter(q => q.hasImage).map(q => q.officialQuestionLabel)).toEqual(sitting.figures);
      const source = JSON.parse(readFileSync(join(process.cwd(), `data/questions/tobi1/sources-${sitting.year}-early.json`), "utf8"));
      for (const figure of source.figures) {
        const bytes = readFileSync(join(process.cwd(), "public", figure.url));
        expect(createHash("sha256").update(bytes).digest("hex")).toBe(figure.sha256);
        expect(bytes.subarray(8, 12).toString()).toBe("WEBP");
      }
    });
  }

  it("同期・遅延読込が一致し、原本のイロハニを表示する", async () => {
    expect(QUESTIONS_BY_EXAM.tobi1).toEqual(TOBI1_QUESTIONS);
    expect(await getQuestionsForExam("tobi1")).toEqual(TOBI1_QUESTIONS);
    expect(keys.map(k => choiceDisplayLabel("tobi1", k))).toEqual(printed);
  });

  it("2024年度の滑車は荷を支える4本で計算し、部材名の誤りを対応づける", () => {
    const qs = TOBI1_QUESTIONS.filter(q => q.year === 2024);
    expect(qs[36].answer).toBe("イ");
    expect(qs[36].explanation).toContain("4P＝W");
    expect(qs[38].choices?.ウ).toBe("根太");
    expect(qs[38].answer).toBe("ウ");
    expect(qs[42].answer).toBe("エ");
  });
});
