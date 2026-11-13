import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { TOBI1_QUESTIONS } from "@/data/questions/tobi1";
import { TOBI3_QUESTIONS } from "@/data/questions/tobi3";
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

  it("2023年度は養生期間と温度を区別し、パイプサポートの正答を保つ", () => {
    const qs = TOBI1_QUESTIONS.filter(q => q.year === 2023);
    expect(qs[6].answer).toBe("イ");
    expect(qs[6].explanation).toContain("打込み後5日間");
    expect(qs[6].explanation).toContain("温度が2℃");
    expect(qs[26].officialAnswerNumber).toBe("イ");
    expect(qs[26].answer).toBe("ア");
    expect(qs[26].choiceExplanations?.ア).toContain("高さ2m以内");
  });
});

describe("とび技能士3級 2025年度前期 原本30問", () => {
  const official = "×○××○○××○○×○×○○○×○×○○×○○○×××××";
  const questions2025 = TOBI3_QUESTIONS.filter(q => q.year === 2025 && q.season === "early");

  it("全30問の本文・番号・公式○×と内部採点キーを対応させる", () => {
    expect(questions2025).toHaveLength(30);
    expect(official).toHaveLength(30);
    expect(new Set(questions2025.map(questionPagePath)).size).toBe(30);
    questions2025.forEach((q, i) => {
      const symbol = official[i];
      const answer = symbol === "○" ? "ア" : "イ";
      expect(q.id).toBe(`tobi3-2025-early-gakka-${String(i + 1).padStart(3, "0")}`);
      expect(q.qNumber).toBe(i + 1);
      expect(q.officialQuestionLabel).toBe(String(i + 1));
      expect(q.officialAnswerNumber, q.id).toBe(symbol);
      expect(q.answer, q.id).toBe(answer);
      expect(formatQuestionAnswerForDisplay(q, answer)).toBe(symbol);
      expect(q.choices).toEqual({ ア: "正しい（○）", イ: "誤り（×）" });
      expect(Object.keys(q.choiceExplanations!).sort()).toEqual(["ア", "イ"]);
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(q.hasImage).toBe(false);
      expect(q.sourcePdfUrl).toMatch(/R07-1-D20-.*#page=[23]$/);
      expect(EXAM_CONFIGS.tobi3.sessions[0].categories).toContain(q.category);
      expect(findQuestionByRoute(questions2025, { exam: "tobi3", yearSeason: "2025-early", section: "gakka", qnum: `q${i + 1}` })).toBe(q);
    });
  });

  it("同期・遅延読込に全30問を接続し、1級とは混在させない", async () => {
    expect(QUESTIONS_BY_EXAM.tobi3).toEqual(TOBI3_QUESTIONS);
    expect(await getQuestionsForExam("tobi3")).toEqual(TOBI3_QUESTIONS);
    expect(EXAM_CONFIGS.tobi3.sessions[0].expectedQuestions).toBe(30);
    expect(TOBI3_QUESTIONS.every(q => q.exam === "tobi3")).toBe(true);
    expect(TOBI1_QUESTIONS.every(q => q.exam === "tobi1")).toBe(true);
    expect(["ア", "イ"].map(k => choiceDisplayLabel("tobi3", k as ChoiceKey))).toEqual(["○", "×"]);
  });
});
