import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { KAGU2_QUESTIONS } from "@/data/questions/kagu2";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { formatQuestionAnswerForDisplay, questionNumberLabel, choiceDisplayLabel } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";

// 公式正答表の画像から独立して転記。A群25問、B群25問の順。
const papers = [{
  exam: "kagu2" as const, year: 2023, season: "early", all: KAGU2_QUESTIONS,
  answers: "○××○×" + "○○○×○" + "×○××○" + "○○××○" + "○○×○×"
    + "ロロハニロ" + "ロイロニイ" + "イニハニロ" + "ハロイロロ" + "ハイニロロ",
  figures: 2,
}];

describe.each(papers)("$exam $year $season", ({ exam, year, season, all, answers, figures }) => {
  const questions = all.filter(q => q.year === year && q.season === season);
  it("全問の正答、原問番号、出典、経路、全肢解説を保持する", () => {
    expect(questions).toHaveLength(answers.length);
    expect(new Set(questions.map(q => q.id)).size).toBe(answers.length);
    expect(new Set(questions.map(questionPagePath)).size).toBe(answers.length);
    questions.forEach((q, i) => {
      const group = i < 25 ? "a" : "b";
      const number = i % 25 + 1;
      expect(q.id).toBe(`${exam}-${year}-${season}-gakka-${group}-${String(number).padStart(3, "0")}`);
      expect(q.qNumber).toBe(i + 1);
      expect(questionNumberLabel(q)).toBe(`${group.toUpperCase()}群 ${number}`);
      expect(q.officialAnswerNumber).toBe(answers[i]);
      expect(formatQuestionAnswerForDisplay(q, q.answer)).toBe(answers[i]);
      expect(questionSourceEdition(q)).toBe(`${year}年度${season === "late" ? "後期" : "前期"}`);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
      expect(EXAM_CONFIGS[exam].sessions[0].categories).toContain(q.category);
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.kentei\.javada\.or\.jp\/pdf\/.+#page=\d+$/);
      const [, , routeExam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(questions, { exam: routeExam, yearSeason, section, qnum })?.id).toBe(q.id);
    });
  });
  it("同期・遅延ローダー、資格一覧、構造化データに接続する", async () => {
    expect(QUESTIONS_BY_EXAM[exam]).toEqual(all);
    expect(await getQuestionsForExam(exam)).toEqual(all);
    expect(getQualificationByExamCode(exam)?.status).toBe("live");
    expect(EXAM_CONFIGS[exam].sessions[0].expectedQuestions).toBe(answers.length);
    const jsonld = JSON.stringify(buildQuestionJsonLd({ question: questions[0], pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(questions[0])}`, title: "家具製作技能士", lastUpdatedISO: "2026-11-13" }));
    expect(jsonld).toContain("中央職業能力開発協会");
    expect(jsonld).toContain(`${answers[0]}: ${questions[0].choices?.[questions[0].answer as "ア" | "イ"]}`);
    expect(choiceDisplayLabel(exam, "ア")).toBe("イ");
  });
  it("必要な原図をPNGで保持する", () => {
    expect(questions.filter(q => q.hasImage)).toHaveLength(figures);
    questions.filter(q => q.hasImage).forEach(q => {
      expect(q.imageUrls?.length).toBeGreaterThan(0);
      expect(q.imageAltTexts?.length).toBe(q.imageUrls?.length);
      q.imageUrls?.forEach(url => expect(readFileSync(`public${url}`).subarray(1, 4).toString()).toBe("PNG"));
    });
  });
});

it("2級の図の選択肢と研磨粒度を原本どおり保持する", () => {
  expect(KAGU2_QUESTIONS[27].choices?.ウ).toBe("細い一点鎖線");
  expect(KAGU2_QUESTIONS[48 - 1].choices?.エ).toBe("P320");
  expect(KAGU2_QUESTIONS[28].hasImage).toBe(true);
});
