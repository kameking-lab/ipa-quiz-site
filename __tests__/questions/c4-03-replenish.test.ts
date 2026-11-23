import { describe, expect, it } from "vitest";
import { TOBI3_QUESTIONS } from "@/data/questions/tobi3";
import { KENCHIKU_DAIKU2_QUESTIONS } from "@/data/questions/kenchiku-daiku2";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { questionPagePath, findQuestionByRoute } from "@/lib/seo/question-url";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { ChoiceKey } from "@/lib/questions/types";

describe("Q4-007 とび3級2023年度前期", () => {
  // 公式正答表の画像を、印刷順に独立転記。
  const official = "○○×○○××○○××○××○○○×××○×××○○○××○";
  const qs = TOBI3_QUESTIONS.filter(q => q.year === 2023 && q.season === "early");

  it("原本30問の正答・表示・採点・公開URLを一致させる", () => {
    expect(qs).toHaveLength(30);
    expect(official).toHaveLength(30);
    expect(new Set(qs.map(questionPagePath)).size).toBe(30);
    qs.forEach((q, i) => {
      expect(q.officialQuestionLabel).toBe(String(i + 1));
      expect(q.officialAnswerNumber, q.id).toBe(official[i]);
      expect(q.answer, q.id).toBe(official[i] === "○" ? "ア" : "イ");
      expect(formatQuestionAnswerForDisplay(q, q.answer!)).toBe(official[i]);
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(Object.keys(q.choiceExplanations!)).toEqual(["ア", "イ"]);
      expect(EXAM_CONFIGS.tobi3.sessions[0].categories).toContain(q.category);
      expect(findQuestionByRoute(qs, { exam: "tobi3", yearSeason: "2023-early", section: "gakka", qnum: `q${i + 1}` })).toBe(q);
    });
  });

  it("同期・遅延読込に接続し、てこの距離と資格の区別を説明する", async () => {
    expect(QUESTIONS_BY_EXAM.tobi3).toEqual(TOBI3_QUESTIONS);
    expect(await getQuestionsForExam("tobi3")).toEqual(TOBI3_QUESTIONS);
    expect(qs[5].explanation).toContain("大きくなり");
    expect(qs[21].explanation).toContain("SRC");
    expect(qs[28].explanation).toContain("技能講習");
  });
});

for (const sitting of [
  { year: 2024, a: "○○××○×○○×○×○○×○○○○×○×○×○○", b: "ハイハロハニニイハハイハニイロロロイロイロニハロロ", figures: ["A群 5", "A群 6", "A群 8", "A群 14", "A群 18", "A群 19", "B群 5", "B群 6", "B群 8", "B群 15", "B群 18", "B群 22"] },
  { year: 2023, a: "○○○○×○×○×××××××○××××○○×○○", b: "ニロニロハハロニハイイハイイロロニロハニハイイイロ", figures: ["A群 5", "A群 6", "A群 7", "A群 14", "B群 6", "B群 9", "B群 13", "B群 15", "B群 18", "B群 22"] },
]) {
describe(`建築大工2級${sitting.year}年度後期`, () => {
  const { year, a, b } = sitting;
  const keys: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];
  const printed = ["イ", "ロ", "ハ", "ニ"];
  const qs = KENCHIKU_DAIKU2_QUESTIONS.filter(q => q.year === year && q.season === "late");

  it("A・B群各25問を原本どおり採点し、全肢解説と公開URLを利用できる", () => {
    expect(qs).toHaveLength(50);
    expect(a).toHaveLength(25);
    expect(b).toHaveLength(25);
    qs.forEach((q, i) => {
      const tf = i < 25;
      const n = i % 25 + 1;
      const symbol = (tf ? a : b)[n - 1];
      expect(q.id).toBe(`kenchiku-daiku2-${year}-late-gakka-${tf ? "a" : "b"}-${String(n).padStart(3, "0")}`);
      expect(q.qNumber).toBe(i + 1);
      expect(q.officialQuestionLabel).toBe(`${tf ? "A" : "B"}群 ${n}`);
      expect(q.officialAnswerNumber, q.id).toBe(symbol);
      expect(q.answer, q.id).toBe(tf ? (symbol === "○" ? "ア" : "イ") : keys[printed.indexOf(symbol)]);
      expect(formatQuestionAnswerForDisplay(q, q.answer!)).toBe(symbol);
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(Object.keys(q.choiceExplanations!).sort()).toEqual(Object.keys(q.choices!).sort());
      expect(EXAM_CONFIGS["kenchiku-daiku2"].sessions[0].categories).toContain(q.category);
      expect(findQuestionByRoute(qs, { exam: "kenchiku-daiku2", yearSeason: `${year}-late`, section: "gakka", qnum: `q${i + 1}` })).toBe(q);
    });
    expect(new Set(qs.map(questionPagePath)).size).toBe(50);
  });

  it("全図と数式を出典の記録と一致させ、同期・遅延読込に接続する", async () => {
    expect(qs.filter(q => q.hasImage).map(q => q.officialQuestionLabel)).toEqual(sitting.figures);
    const source = JSON.parse(readFileSync(join(process.cwd(), `data/questions/kenchiku-daiku2/sources-${year}-late.json`), "utf8"));
    for (const f of source.figures) {
      const bytes = readFileSync(join(process.cwd(), "public", f.url));
      expect(bytes.subarray(8, 12).toString()).toBe("WEBP");
      expect(createHash("sha256").update(bytes).digest("hex")).toBe(f.sha256);
    }
    expect(QUESTIONS_BY_EXAM["kenchiku-daiku2"]).toEqual(KENCHIKU_DAIKU2_QUESTIONS);
    expect(await getQuestionsForExam("kenchiku-daiku2")).toEqual(KENCHIKU_DAIKU2_QUESTIONS);
    if (year === 2024) {
      expect(qs[22].explanation).toContain("ミリメートル");
      expect(qs[47].answer).toBe("ウ");
      expect(qs[48].explanation).toContain("23cm以下");
    } else {
      expect(qs[42].question).toContain("ぎんなん面");
      expect(qs[38].explanation).toContain("D13以上");
      expect(qs[47].explanation).toContain("1/7以上");
    }
  });
});
}
