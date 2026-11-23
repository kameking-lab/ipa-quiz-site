import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { ExamCode } from "@/lib/questions/types";

// Official answer sheets independently checked against their rendered tables.
const sets: { code: ExamCode; season: string; answers: string }[] = [
  { code: "kikai-hozen-denki3", season: "round1", answers: "○×○××○×○○×○○○×○××○○○○××○○××○×○" },
  { code: "kikai-hozen3", season: "round2", answers: "○○○×○○○××○×○×××○○○○×○×○×××○○×○" },
  { code: "kikai-hozen-denki3", season: "round2", answers: "○○○×○○○××○×○×××○××○○○×○○×○×××○" },
];

describe.each(sets)("c4-15 $code 2023 $season", ({ code, season, answers }) => {
  const manifest = JSON.parse(readFileSync(`data/questions/${code}/sources-2023-${season}.json`, "utf8"));
  const questions = QUESTIONS_BY_EXAM[code]!.filter(q => q.year === 2023 && q.season === season);

  it("loads the complete sitting and preserves the published answers", async () => {
    expect(questions.map(q => q.qNumber)).toEqual(Array.from({ length: 30 }, (_, i) => i + 1));
    expect(new Set(questions.map(q => q.id)).size).toBe(30);
    expect(questions.map(q => q.officialAnswerNumber).join("")).toBe(answers);
    expect(manifest.officialAnswers.join("")).toBe(answers);
    expect((await getQuestionsForExam(code)).filter(q => q.year === 2023 && q.season === season)).toEqual(questions);
    expect(EXAM_CONFIGS[code].yearRange.start).toBeLessThanOrEqual(2023);
    expect(EXAM_CONFIGS[code].seasons).toContain(season);
    for (const q of questions) {
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(q.answer, q.id).toBe(answers[q.qNumber - 1] === "○" ? "ア" : "イ");
      expect(Object.keys(q.choiceExplanations!), q.id).toEqual(["ア", "イ"]);
      for (const [key, text] of Object.entries(q.choiceExplanations!)) {
        expect(text!.startsWith(key === q.answer ? "正解。" : "不正解。"), q.id).toBe(true);
        expect(text!.length, q.id).toBeGreaterThan(30);
      }
      expect(q.sourcePdfUrl).toContain("/2023/");
      expect(q.sourceAnswerUrl).toContain("/2023/");
      if (/下図/.test(q.question)) expect(q.hasImage, q.id).toBe(true);
    }
  });

  it("retains all source figures with their verified bytes", () => {
    expect(questions.filter(q => q.hasImage)).toHaveLength(manifest.figures.length);
    for (const figure of manifest.figures) {
      const bytes = readFileSync(`public${figure.url}`);
      expect(createHash("sha256").update(bytes).digest("hex")).toBe(figure.sha256);
      expect(figure.cropPdfPoints).toHaveLength(4);
      expect(questions.find(q => q.qNumber === figure.qNumber)?.imageUrls).toContain(figure.url);
    }
  });
});

it("shares the second sitting's common questions while retaining electrical citations", () => {
  const mechanical = QUESTIONS_BY_EXAM["kikai-hozen3"]!.filter(q => q.year === 2023 && q.qNumber <= 15);
  const electrical = QUESTIONS_BY_EXAM["kikai-hozen-denki3"]!.filter(q => q.year === 2023 && q.season === "round2" && q.qNumber <= 15);
  expect(electrical).toHaveLength(15);
  electrical.forEach((q, index) => {
    expect(q.question).toBe(mechanical[index].question);
    expect(q.choiceExplanations).toBe(mechanical[index].choiceExplanations);
    expect(q.imageUrls).toBe(mechanical[index].imageUrls);
    expect(q.sourcePdfUrl).toContain("2023__3kyu_denki_mondai_2.pdf");
    expect(q.sourceAnswerUrl).toContain("2023__3kyu_denki_kaitou_2.pdf");
  });
});

it("keeps the two electrical sittings and diagram-dependent explanations distinct", () => {
  const first = QUESTIONS_BY_EXAM["kikai-hozen-denki3"]!.filter(q => q.year === 2023 && q.season === "round1");
  const second = QUESTIONS_BY_EXAM["kikai-hozen-denki3"]!.filter(q => q.year === 2023 && q.season === "round2");
  expect(first[22].question).toContain("NOR");
  expect(second[22].question).toContain("AND");
  expect(first[22].answer).toBe("イ");
  expect(second[22].answer).toBe("ア");
  expect(first[29].explanation).toContain("PNP");
  expect(second[26].explanation).toContain("二股");
  expect(second[29].explanation).toContain("WL→YL→GL");
  expect(second[29].answer).toBe("ア");
  const mechanical = QUESTIONS_BY_EXAM["kikai-hozen3"]!.filter(q => q.year === 2023);
  expect(mechanical[8].explanation).toContain("特性要因図");
  expect(mechanical[2].explanation).toContain("4A");
  expect(mechanical[3].explanation).toContain("5/6");
});
