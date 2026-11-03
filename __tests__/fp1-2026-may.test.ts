import { describe, expect, it } from "vitest";

import { FP1_QUESTIONS } from "@/data/questions/fp1";
import legacy from "@/data/questions/fp1/launch.json";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { defaultPracticeSession } from "@/lib/questions/practice-session";
import { getChoiceKeys } from "@/lib/questions/answers";
import { getQuestionsByExamStrict } from "@/lib/seo/exam-meta";
import { parseQuestionBlocks } from "@/components/quiz/QuestionBody";

describe("FP1 2026 May academic pilot", () => {
  it("exposes exactly the reviewed part of the official basic paper", () => {
    expect(legacy.map((q) => q.qNumber)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 20, 21, 22, 24, 25, 27, 28, 48]);
    expect(legacy.map((q) => q.officialAnswerNumber)).toEqual(["2", "1", "3", "3", "2", "3", "4", "4", "3", "4", "1", "4", "4", "2", "1", "3", "1", "3", "4", "2", "2", "3", "1", "3", "2"]);
    expect(legacy.map((q) => q.answer)).toEqual(["イ", "ア", "ウ", "ウ", "イ", "ウ", "エ", "エ", "ウ", "エ", "ア", "エ", "エ", "イ", "ア", "ウ", "ア", "ウ", "エ", "イ", "イ", "ウ", "ア", "ウ", "イ"]);
    expect((QUESTIONS_BY_EXAM.fp1 ?? []).filter((q) => q.year === 2026 && q.season === "may")).toHaveLength(50);
    expect(getQuestionsByExamStrict("fp1").filter((q) => q.year === 2026 && q.season === "may")).toHaveLength(50);
    expect(defaultPracticeSession("fp1")).toBe("gakka");
    expect(EXAM_CONFIGS.fp1.sessions[0]?.expectedQuestions).toBe(50);
  });

  it("preserves four options, per-option explanations, official provenance and the law date", () => {
    for (const q of FP1_QUESTIONS.filter(q => legacy.some(old => old.id === q.id))) {
      expect(getChoiceKeys(q.choices)).toEqual(["ア", "イ", "ウ", "エ"]);
      expect(Object.keys(q.choiceExplanations ?? {}).sort()).toEqual(["ア", "イ", "ウ", "エ"]);
      expect(q.choices?.[q.answer as "ア" | "イ" | "ウ" | "エ"]).toBeTruthy();
      expect(q.exam).toBe("fp1");
      expect(q.session).toBe("gakka");
      expect(q.season).toBe("may");
      expect(q.lawReferenceDate).toBe("2025-10-01");
      expect(q.sourceAttribution).toContain("学科試験 基礎編（2026年5月）");
      expect(q.sourcePdfUrl).toBe("https://www.kinzai.or.jp/fp/news-fp/50260.html");
      expect(q.sourceAnswerUrl).toBe("https://www.kinzai.or.jp/fp/news-fp/50274.html");
    }
    expect(getQualificationByExamCode("fp1")?.status).toBe("live");
    expect(getQualificationByExamCode("fp1")?.reuseSummary).toContain("2026年5月学科は基礎50問・応用15原問62回答欄");
    expect(getQualificationByExamCode("fp1")?.reuseSummary).toContain("2026年9月学科は基礎全50問と応用全15原問57回答欄");
  });

  it("renders the supplied coefficient table as a real table", () => {
    const blocks = parseQuestionBlocks(FP1_QUESTIONS[0]!.question);
    const table = blocks.find((block) => block.kind === "table");
    expect(table).toBeDefined();
    if (table?.kind === "table") {
      expect(table.header).toHaveLength(7);
      expect(table.rows).toHaveLength(3);
      expect(table.rows[2]?.[5]).toBe("14.8775");
    }
    expect(FP1_QUESTIONS[0]!.explanation).toContain("1,906.37578万円");
  });
});
