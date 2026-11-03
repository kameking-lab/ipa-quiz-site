import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ALL_EXAM_CODES, ALL_QUIZ_EXAM_CODES, EXAM_CONFIGS } from "@/lib/exam-config";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { isExamPublished } from "@/lib/qualifications/catalog";
import { defaultPracticeSession, practiceSessionLabel } from "@/lib/questions/practice-session";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import type { ExamCode, Question } from "@/lib/questions/types";

// Independently transcribed from the official answer tables. These must not be
// imported from the build script or generated question files.
const keys: Record<number, Record<number, Record<string, string>>> = {
  3: {
    2025: { houki: "35213134355412321544", hoan: "353125131524342" },
    2024: { houki: "42234155323135431335", hoan: "522451311233544" },
  },
  2: {
    2025: { houki: "31552153545414314142", hoan: "5243453212", kogaku: "2444513125" },
    2024: { houki: "31234233125244543424", hoan: "5253234441", kogaku: "1243415523" },
  },
  1: {
    2025: { houki: "31552153541132224413", hoan: "541431533221125" },
    2024: { houki: "31234233124143431152", hoan: "114435351242534" },
  },
};

for (const rank of [1, 2, 3]) {
  const code = `khk-reito-${rank}` as ExamCode;
  const questions = JSON.parse(readFileSync(join(process.cwd(), `data/questions/${code}/latest-two.json`), "utf8")) as Question[];
  describe(`${code} latest two official sittings, unpublished`, () => {
    it("contains complete consecutive papers and official answer sequences", () => {
      expect(questions).toHaveLength(rank === 3 ? 70 : 80);
      for (const year of [2025, 2024]) {
        for (const session of EXAM_CONFIGS[code].sessions) {
          const rows = questions.filter(q => q.year === year && q.session === session.session);
          expect(rows.map(q => q.qNumber)).toEqual(Array.from({ length: session.expectedQuestions }, (_, i) => i + 1));
          if (rank === 1 && session.session === "kogaku") {
            expect(rows.every(q => q.type === "descriptive" && (q.modelAnswer?.length ?? 0) > 100)).toBe(true);
          } else {
            expect(rows.map(q => q.officialAnswerNumber).join("")).toBe(keys[rank][year][session.session]);
          }
        }
      }
      expect(questions.filter(q => q.hasImage)).toHaveLength(rank === 1 ? 4 : rank === 2 ? 2 : 0);
      if (rank === 1) {
        const chart = questions.find(q => q.year === 2024 && q.session === "kogaku" && q.qNumber === 2)!;
        expect(chart.imageUrls).toHaveLength(2);
        expect(chart.imageUrls?.join(" ")).not.toContain("answer-diagram");
        expect(chart.modelAnswer).toContain("3.62");
        expect(chart.officialReferenceUrls?.[0]).toContain("R6ACGZK-W.pdf");
      }
      if (rank === 3) {
        expect(questions.find(q => q.year === 2025 && q.session === "houki" && q.qNumber === 6)?.question).toContain("Ｇ＝Ｖ／Ｃ");
        expect(questions.find(q => q.year === 2024 && q.session === "hoan" && q.qNumber === 5)?.question).toContain("汲み上げ");
      }
    });

    it("preserves each source, complete choice explanations, law dates and figures", () => {
      for (const q of questions) {
        expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.khk\.or\.jp\/Portals\/0\/khk\/exam\//);
        expect(q.sourceAnswerUrl).toMatch(/^https:\/\/www\.khk\.or\.jp\//);
        expect(q.needsReview).toBe(false);
        expect(isPracticeReadyQuestion(q), q.id).toBe(true);
        expect(q.question).not.toMatch(/\(cid:|[\uE000-\uF8FF]|iinndddd/);
        if (q.type === "multiple-choice") {
          expect(Object.keys(q.choices ?? {})).toEqual([..."アイウエオ"]);
          expect(Object.keys(q.choiceExplanations ?? {})).toEqual([..."アイウエオ"]);
          expect(q.answer).toBe("アイウエオ"[Number(q.officialAnswerNumber) - 1]);
          expect(new Set(Object.values(q.choiceExplanations ?? {})).size).toBe(5);
          for (const text of Object.values(q.choiceExplanations ?? {})) expect(text?.length).toBeGreaterThan(50);
        }
        if (q.session === "houki") {
          expect(q.lawReferenceDate).toBe(`${q.year}-04-01`);
          expect(q.questionNotice).toContain("出題時点");
        }
        expect(q.hasImage).toBe(Boolean(q.imageUrls?.length));
        for (const path of q.imageUrls ?? []) expect(existsSync(join(process.cwd(), "public", path))).toBe(true);
      }
      for (const year of [2025, 2024]) {
        // Shared legal cases are required to answer the dependent questions.
        for (const q of questions.filter(q => q.year === year && q.session === "houki" && q.qNumber >= 9 && rank !== 3)) {
          expect(q.question).toContain("製造設備");
        }
      }
    });

    it("keeps routes, public registries and lazy loading closed", async () => {
      expect(defaultPracticeSession(code)).toBe("houki");
      expect(practiceSessionLabel("houki", code)).toBe("法令");
      expect(practiceSessionLabel("hoan", code)).toBe("保安管理技術");
      expect(practiceSessionLabel("kogaku", code)).toBe("学識");
      expect(isExamPublished(code)).toBe(false);
      expect(ALL_EXAM_CODES).not.toContain(code);
      expect(ALL_QUIZ_EXAM_CODES).not.toContain(code);
      expect(getRegisteredExamCodes()).not.toContain(code);
      expect(QUESTIONS_BY_EXAM[code]).toBeUndefined();
      expect(await getQuestionsForExam(code)).toEqual([]);
      const resource = JSON.stringify(buildQuestionJsonLd({
        question: questions[0], pageUrlAbs: `https://example.test/q/${code}`,
        title: "出典確認", lastUpdatedISO: "2026-11-03T00:00:00+09:00",
      }));
      expect(resource).toContain("高圧ガス保安協会");
      expect(resource).not.toContain("https://www.ipa.go.jp/shiken/faq.html");
    });
  });
}
