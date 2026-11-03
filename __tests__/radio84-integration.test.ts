import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import { choiceDisplayLabel, usesNumberedChoices } from "@/lib/questions/display";
import { defaultPracticeSession, parsePracticeSession } from "@/lib/questions/practice-session";
import { findQuestionByRoute, parseQuestionRoute, questionPagePath } from "@/lib/seo/question-url";
import { searchQuestions } from "@/lib/search/question-index";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import type { ExamCode, Question } from "@/lib/questions/types";

const DOMESTIC = "riku-toku-kokunai" as ExamCode;
const SEA3 = "kai-toku3" as ExamCode;
const RADIO = [DOMESTIC, SEA3] as const;
const NIC = "https://www.nichimu.or.jp/";
const POLICY = "https://www.nichimu.or.jp/kshiken/siken/index.html";

// The period/paper boundaries and these sparse answer cells come from the
// published 日本無線協会 question-and-answer PDFs, not the production adapter.
// In the 2022/2023 sea-law papers q17 changes truth value; this catches a
// swapped answer key even when each paper still has the correct row count.
const papers = [
  { exam: DOMESTIC, year: 2026, season: "february", session: "houki", size: 12 },
  { exam: DOMESTIC, year: 2026, season: "june", session: "houki", size: 12 },
  { exam: SEA3, year: 2022, season: "october", session: "houki", size: 20 },
  { exam: SEA3, year: 2022, season: "october", session: "kogaku", size: 10 },
  { exam: SEA3, year: 2023, season: "february", session: "houki", size: 20 },
  { exam: SEA3, year: 2023, season: "february", session: "kogaku", size: 10 },
] as const;
const officialCells = [
  { exam: DOMESTIC, year: 2026, season: "june", session: "houki", qNumber: 1, answer: "ア" },
  { exam: DOMESTIC, year: 2026, season: "february", session: "houki", qNumber: 12, answer: "ウ" },
  { exam: SEA3, year: 2023, season: "february", session: "houki", qNumber: 1, answer: "イ" },
  { exam: SEA3, year: 2023, season: "february", session: "houki", qNumber: 2, answer: "ア" },
  { exam: SEA3, year: 2023, season: "february", session: "houki", qNumber: 17, answer: "イ" },
  { exam: SEA3, year: 2022, season: "october", session: "houki", qNumber: 17, answer: "ア" },
  { exam: SEA3, year: 2022, season: "october", session: "kogaku", qNumber: 2, answer: "イ" },
  { exam: SEA3, year: 2023, season: "february", session: "kogaku", qNumber: 2, answer: "ア" },
] as const;

function paperKey(q: Pick<Question, "exam" | "year" | "season" | "session">): string {
  return `${q.exam}/${q.year}/${q.season}/${q.session}`;
}
function routeParts(path: string) {
  const [, , exam, yearSeason, section, qnum] = path.split("/");
  return { exam: exam!, yearSeason: yearSeason!, section: section!, qnum: qnum! };
}
function findCell(pool: Question[], cell: (typeof officialCells)[number]): Question {
  const hit = pool.find((q) => q.exam === cell.exam && q.year === cell.year &&
    q.season === cell.season && q.session === cell.session && q.qNumber === cell.qNumber);
  expect(hit, JSON.stringify(cell)).toBeDefined();
  return hit!;
}

describe("radio84 product integration", () => {
  it("shows the official numbered choices and starts both exams in houki", () => {
    expect(["ア", "イ", "ウ", "エ"].map((key) => choiceDisplayLabel(DOMESTIC, key as "ア" | "イ" | "ウ" | "エ")))
      .toEqual(["1", "2", "3", "4"]);
    expect(["ア", "イ"].map((key) => choiceDisplayLabel(SEA3, key as "ア" | "イ")))
      .toEqual(["1", "2"]);
    expect(usesNumberedChoices(DOMESTIC)).toBe(true);
    expect(usesNumberedChoices(SEA3)).toBe(true);
    expect(parsePracticeSession("kogaku")).toBe("kogaku");
    expect(defaultPracticeSession(DOMESTIC)).toBe("houki");
    expect(defaultPracticeSession(SEA3)).toBe("houki");
  });

  it("registers two playable lazy pools and the same 84 unique eager records", async () => {
    expect(getRegisteredExamCodes()).toEqual(expect.arrayContaining([...RADIO]));
    const [domestic, sea3] = await Promise.all(RADIO.map((exam) => getQuestionsForExam(exam)));
    expect(domestic).toHaveLength(24);
    expect(sea3).toHaveLength(60);
    const lazy = [...domestic, ...sea3];
    expect(new Set(lazy.map((q) => q.id)).size).toBe(84);
    expect(lazy.every(isPracticeReadyQuestion)).toBe(true);
    const eager = ALL_QUESTIONS.filter((q) => RADIO.includes(q.exam as (typeof RADIO)[number]));
    expect(eager).toHaveLength(84);
    expect(new Set(eager.map((q) => q.id))).toEqual(new Set(lazy.map((q) => q.id)));
    expect(QUESTIONS_BY_EXAM[DOMESTIC]).toHaveLength(24);
    expect(QUESTIONS_BY_EXAM[SEA3]).toHaveLength(60);
    expect((await getQuestionsForExam("ap")).some((q) => RADIO.includes(q.exam as (typeof RADIO)[number]))).toBe(false);
  });

  it("preserves the six independently specified period and subject boundaries", async () => {
    const pool = (await Promise.all(RADIO.map((exam) => getQuestionsForExam(exam)))).flat();
    const actual = new Map<string, number>();
    for (const q of pool) actual.set(paperKey(q), (actual.get(paperKey(q)) ?? 0) + 1);
    expect(actual).toEqual(new Map(papers.map((p) => [paperKey(p), p.size])));
    for (const p of papers) {
      const numbers = pool.filter((q) => paperKey(q) === paperKey(p)).map((q) => q.qNumber).sort((a, b) => a - b);
      expect(numbers, paperKey(p)).toEqual(Array.from({ length: p.size }, (_, i) => i + 1));
    }
  });

  it("round-trips every month, subject and official qNumber through the real question route", async () => {
    const pool = (await Promise.all(RADIO.map((exam) => getQuestionsForExam(exam)))).flat();
    const paths = pool.map(questionPagePath);
    expect(new Set(paths).size).toBe(84);
    for (const [index, path] of paths.entries()) {
      const q = pool[index]!;
      expect(path).toBe(`/q/${q.exam}/${q.year}-${q.season}/${q.session}/q${q.qNumber}`);
      const parts = routeParts(path);
      expect(parseQuestionRoute(parts)).toMatchObject({ exam: q.exam, year: q.year, season: q.season,
        session: q.session, qNumber: q.qNumber });
      expect(findQuestionByRoute(pool, parts)?.id).toBe(q.id);
    }
  });

  it("matches sparse official answer cells, retaining true/false rather than four choices", async () => {
    const pool = (await Promise.all(RADIO.map((exam) => getQuestionsForExam(exam)))).flat();
    for (const cell of officialCells) expect(findCell(pool, cell).answer, JSON.stringify(cell)).toBe(cell.answer);
    for (const q of pool.filter((item) => item.exam === SEA3)) {
      expect(Object.keys(q.choices ?? {}), q.id).toEqual(["ア", "イ"]);
      expect(q.choices?.ア, q.id).toMatch(/^1\s*正(?:しい)?$/);
      expect(q.choices?.イ, q.id).toMatch(/^2\s*誤(?:り)?$/);
      expect(Object.keys(q.choiceExplanations ?? {}), q.id).toEqual(["ア", "イ"]);
      expect(q.choiceExplanations?.ア?.trim(), q.id).toBeTruthy();
      expect(q.choiceExplanations?.イ?.trim(), q.id).toBeTruthy();
      if (q.answer === "イ") {
        expect(q.explanation, q.id).toContain("正しくは");
        expect(q.choiceExplanations?.ア, q.id).toContain("正しくは");
        expect(q.choiceExplanations?.イ, q.id).toContain("正しくは");
      }
    }
    const falseShipLicence = findCell(pool, officialCells[2]);
    expect(falseShipLicence.question).toContain("船舶局");
    expect(falseShipLicence.explanation).toContain("免許");
    expect(falseShipLicence.explanation).not.toContain("届出だけで足りる");
  });

  it("keeps official numbered choices and answer metadata unchanged during quiz shuffle", async () => {
    const pool = (await Promise.all(RADIO.map((exam) => getQuestionsForExam(exam)))).flat();
    expect(pool).toHaveLength(84);
    for (const q of pool) {
      const before = { choices: structuredClone(q.choices), answer: q.answer,
        officialAnswerNumber: q.officialAnswerNumber, qNumber: q.qNumber, route: questionPagePath(q) };
      const shuffled = shuffleChoices(q);
      expect(shuffled, q.id).toBe(q);
      expect({ choices: shuffled.choices, answer: shuffled.answer,
        officialAnswerNumber: shuffled.officialAnswerNumber, qNumber: shuffled.qNumber,
        route: questionPagePath(shuffled) }, q.id).toEqual(before);
    }
  });

  it("keeps official provenance and exam-month law dates without IPA attribution", async () => {
    const pool = (await Promise.all(RADIO.map((exam) => getQuestionsForExam(exam)))).flat();
    for (const q of pool) {
      expect(q.license, q.id).toBe("NICHIMU-educational-reuse");
      expect(q.sourcePdfUrl, q.id).toMatch(/^https:\/\/www\.nichimu\.or\.jp\//);
      expect(q.sourceAnswerUrl, q.id).toMatch(/^https:\/\/www\.nichimu\.or\.jp\//);
      if (q.session === "houki") {
        expect(q.lawReferenceDate, q.id).toMatch(new RegExp(`^${q.year}-${q.season === "october" ? "10" : q.season === "june" ? "06" : "02"}-`));
      }
      expect(q.sourceAttribution, q.id).toContain("日本無線協会");
      const resource = buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`,
        title: "無線国家試験の過去問", lastUpdatedISO: "2026-10-15" })["@graph"][0] as {
        creator: { name: string; url: string }; hasPart: { author: { name: string; url: string } };
        license?: string; isAccessibleForFree: boolean;
      };
      expect(resource.hasPart.author.name, q.id).toContain("日本無線協会");
      expect(resource.hasPart.author.url, q.id).toBe(NIC);
      expect(resource.creator.name, q.id).toContain("日本無線協会");
      expect(resource.license, q.id).toBe(POLICY);
      expect(resource.isAccessibleForFree, q.id).toBe(true);
    }
  });

  it("exposes both new qualifications in search exam facets", async () => {
    for (const [exam, expected] of [[DOMESTIC, 24], [SEA3, 60]] as const) {
      const result = await searchQuestions({ exam, limit: 1 });
      expect(result.total).toBe(expected);
      expect(result.facets.exam[exam]).toBe(expected);
      expect(result.hits[0]?.exam).toBe(exam);
    }
  });
});
