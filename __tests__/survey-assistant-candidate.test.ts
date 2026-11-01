import { describe, expect, it } from "vitest";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import candidate from "@/data/exam-library/survey-assistant/candidate.json";
import { gradeExamAnswer, isScorableQuestion } from "@/lib/exam-library-model";
import { loadSurveyAssistantPaper, SURVEY_ASSISTANT_CATALOG, surveyAssistantPracticeQuestions } from "@/lib/exam-library/survey-assistant-candidate";
import { excludeSurveyAssistantReferenceAnswers, isExamReferenceOnly, SURVEY_ASSISTANT_REFERENCE_ID } from "@/lib/exam-library/survey-assistant-reference-policy";

describe("survey assistant local app adapter (not manuscript re-review)", () => {
  it("publishes only assets referenced by question data, keeping internal review metadata private", () => {
    const paperData = JSON.stringify(candidate.papers);
    expect(candidate.assets).toHaveLength(59);
    for (const asset of candidate.assets) {
      expect(paperData).toContain(asset.url);
      expect(asset.url).toMatch(/\.(png|pdf)$/);
    }
  });
  it("rejects stale Q12 answers by canonical identity at a storage boundary", () => {
    const normal = "private-gsi-survey-assistant-20261021-2026-q11";
    const poisoned = { [SURVEY_ASSISTANT_REFERENCE_ID]: { choice: 3, submitted: true, memo: "stale" }, [normal]: { choice: 2, submitted: true, memo: "" } };
    expect(Object.keys(excludeSurveyAssistantReferenceAnswers(poisoned))).toEqual([normal]);
    expect(isExamReferenceOnly({ id: SURVEY_ASSISTANT_REFERENCE_ID })).toBe(true);
    expect(isExamReferenceOnly({ id: normal })).toBe(false);
  });
  it("maps the two existing papers and preserves canonical source IDs and ordinal keys", () => {
    expect(candidate.publication).toBe("HOLD");
    expect(SURVEY_ASSISTANT_CATALOG.map(entry => [entry.id, entry.questionCount, entry.scoredCount])).toEqual([
      ["survey-assistant-2025", 28, 28], ["survey-assistant-2026", 28, 27],
    ]);
    for (const paper of candidate.papers) {
      const questions = loadSurveyAssistantPaper(paper.id)!;
      expect(questions).toHaveLength(28);
      questions.forEach((question, index) => {
        expect(question.id).toBe(`private-gsi-survey-assistant-20261021-${paper.year}-q${index + 1}`);
        expect(question.sourceQuestionNumber).toBe(index + 1);
        if (question.referenceOnly) return;
        expect(question.presentation?.choices.map(choice => choice.number)).toEqual([1, 2, 3, 4, 5]);
        expect(question.choiceExplanation?.choices.map(choice => choice.number)).toEqual([1, 2, 3, 4, 5]);
        expect(question.correctChoice).toBe(paper.questions[index].officialKey);
        expect(gradeExamAnswer(question, question.correctChoice)).toBe("correct");
      });
    }
    expect(loadSurveyAssistantPaper("../survey-assistant-2026")).toBeNull();
  });

  it("keeps Q12 reference-only with key3 and calculation5 unchanged", () => {
    const questions = loadSurveyAssistantPaper("survey-assistant-2026")!;
    const q12 = questions[11];
    expect(q12.referenceOnly).toBe(true);
    expect(q12.officialKey).toBe(3);
    expect(q12.correctChoice).toBeNull();
    expect(q12.choiceCount).toBe(0);
    expect(q12.choiceExplanation).toBeUndefined();
    expect(q12.referenceReasons).toHaveLength(5);
    expect(q12.explanation).toContain("5「再測の必要はない」");
    expect(q12.referenceNotice).toContain("解答履歴");
    for (const choice of [null, 0, 1, 2, 3, 4, 5]) expect(gradeExamAnswer(q12, choice)).toBe("unscored");
    expect(isScorableQuestion(q12)).toBe(false);
    expect(surveyAssistantPracticeQuestions(questions)).toHaveLength(27);
    expect(surveyAssistantPracticeQuestions(questions).some(question => question.id === q12.id)).toBe(false);
  });

  it("binds locally copied original images to dimensions and page/question labels", () => {
    for (const paper of candidate.papers) for (const question of loadSurveyAssistantPaper(paper.id)!) {
      for (const figure of question.presentation!.figures) {
        const bytes = readFileSync(join(process.cwd(), "public", figure.src));
        const asset = candidate.assets.find(item => item.url === figure.src)!;
        expect(createHash("sha256").update(bytes).digest("hex")).toBe(asset.sha256);
        expect([figure.width, figure.height]).toEqual([bytes.readUInt32BE(16), bytes.readUInt32BE(20)]);
        expect(figure.alt).toContain(`No.${question.number}`);
      }
    }
    expect(loadSurveyAssistantPaper("survey-assistant-2026")![11].presentation!.figures).toHaveLength(2);
  });
});
