import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";

import { ALL_QUESTIONS } from "@/data/questions";
import { ST_QUESTIONS_2025_SPRING_AM2 } from "@/data/questions/st/by-year/2025-spring-am2";
import {
  filterQuestions,
  isPlaceholderExplanation,
  isPracticeReadyQuestion,
} from "@/lib/questions/filter";
import type { ExamCode, Season, Session } from "@/lib/questions/types";
import { getQuestionsByExamStrict } from "@/lib/seo/exam-meta";
import { ALL_EXAM_CODES } from "@/lib/exam-config";

type Paper = {
  exam: ExamCode;
  year: number;
  season: Season;
  session: Session;
};

function paperKey({ exam, year, season, session }: Paper): string {
  return `${exam}/${year}/${season}/${session}`;
}

const ipaQuestions = ALL_QUESTIONS.filter((q) =>
  ALL_EXAM_CODES.includes(q.exam as (typeof ALL_EXAM_CODES)[number]),
);

const papers = [
  ...new Map(
    ipaQuestions.map((q) => [
      paperKey(q),
      { exam: q.exam, year: q.year, season: q.season, session: q.session },
    ]),
  ).values(),
].sort((a, b) => paperKey(a).localeCompare(paperKey(b)));

describe("IPA paper listing and quiz pool parity", () => {
  it("recovers detailed explanations that start with the answer sentence", () => {
    const legacyPrefixMatches = ipaQuestions.filter((q) =>
      /^正解は[アイウエ]です[。.]/.test(q.explanation),
    );

    expect(ipaQuestions).toHaveLength(14_412);
    expect(legacyPrefixMatches).toHaveLength(1_455);
    expect(legacyPrefixMatches.every((q) => q.explanation.trim().length > 30)).toBe(true);
    expect(legacyPrefixMatches.every((q) => !isPlaceholderExplanation(q))).toBe(true);
    expect(legacyPrefixMatches.every((q) => q.explanation.trim() !== `正解は${q.answer}です。`)).toBe(true);
  });

  it("uses the same playable IDs for every exam/year/season/session", () => {
    expect(ALL_EXAM_CODES).toHaveLength(13);
    expect(papers.length).toBeGreaterThan(100);

    for (const paper of papers) {
      const listingIds = getQuestionsByExamStrict(paper.exam)
        .filter(
          (q) =>
            q.year === paper.year &&
            q.season === paper.season &&
            q.session === paper.session,
        )
        .sort((a, b) => a.qNumber - b.qNumber)
        .map((q) => q.id);
      const quizIds = filterQuestions(ALL_QUESTIONS, {
        mode: "year",
        exam: paper.exam,
        year: paper.year,
        season: paper.season,
        session: paper.session,
        inOrder: true,
      }).map((q) => q.id);

      expect(quizIds, paperKey(paper)).toEqual(listingIds);
      expect(
        quizIds.every((id) => {
          const q = ALL_QUESTIONS.find((candidate) => candidate.id === id);
          return q?.session === paper.session && isPracticeReadyQuestion(q);
        }),
        paperKey(paper),
      ).toBe(true);
    }
  });

  it("makes all 25 ST 2025 spring AM II questions playable with official answers and figures", () => {
    const questions = filterQuestions(ALL_QUESTIONS, {
      mode: "year",
      exam: "st",
      year: 2025,
      season: "spring",
      session: "am2",
      inOrder: true,
    });

    expect(questions).toHaveLength(25);
    expect(questions.map((q) => q.qNumber)).toEqual(
      Array.from({ length: 25 }, (_, index) => index + 1),
    );
    expect(questions.map((q) => q.qNumber)).toContain(7);
    expect(questions.find((q) => q.qNumber === 7)?.answer).toBe("ウ");
    expect(questions.find((q) => q.qNumber === 11)?.answer).toBe("エ");
    expect(questions.every((q) => q.session === "am2")).toBe(true);
    expect(ST_QUESTIONS_2025_SPRING_AM2.find((q) => q.qNumber === 7)?.answer).toBe("ウ");
    expect(ST_QUESTIONS_2025_SPRING_AM2.find((q) => q.qNumber === 11)?.answer).toBe("エ");

    const figureQuestions = [4, 5, 8, 10, 21, 24];
    for (const qNumber of figureQuestions) {
      const q = questions.find((candidate) => candidate.qNumber === qNumber);
      expect(q?.imageUrls, `q${qNumber} imageUrls`).toEqual([
        `/questions/ipa/2025-spring-am2/q${qNumber}-figure.png`,
      ]);
      expect(
        existsSync(join(process.cwd(), "public", q!.imageUrls![0].slice(1))),
        `q${qNumber} figure asset`,
      ).toBe(true);
    }
  });
});
