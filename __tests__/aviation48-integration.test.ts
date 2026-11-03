import { describe, expect, it, vi } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";

vi.mock("server-only", () => ({}));

import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import { choiceDisplayLabel, usesNumberedChoices } from "@/lib/questions/display";
import { defaultPracticeSession, parsePracticeSession } from "@/lib/questions/practice-session";
import { findQuestionByRoute, parseQuestionRoute, questionPagePath } from "@/lib/seo/question-url";
import { searchQuestions } from "@/lib/search/question-index";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";

const EXAM = "koku-toku" as const;
const NIC = "https://www.nichimu.or.jp/";
const POLICY = "https://www.nichimu.or.jp/kshiken/siken/index.html";
const papers = [
  ["february", "houki", 1, 12], ["february", "kogaku", 13, 24],
  ["june", "houki", 1, 12], ["june", "kogaku", 13, 24],
] as const;

describe("aviation special 48 product integration", () => {
  it("loads exactly the same 48 playable records eagerly and lazily", async () => {
    expect(getRegisteredExamCodes()).toContain(EXAM);
    const lazy = await getQuestionsForExam(EXAM);
    const eager = ALL_QUESTIONS.filter((q) => q.exam === EXAM);
    expect(QUESTIONS_BY_EXAM[EXAM]).toHaveLength(48);
    expect(lazy).toHaveLength(48);
    expect(eager).toHaveLength(48);
    expect(new Set(lazy.map((q) => q.id)).size).toBe(48);
    expect(lazy).toEqual(eager);
    expect(lazy.every(isPracticeReadyQuestion)).toBe(true);
    expect((await getQuestionsForExam("ap")).every((q) => q.exam !== EXAM)).toBe(true);
  });

  it("preserves four official paper boundaries, choice numbers, and keys through shuffle", async () => {
    const pool = await getQuestionsForExam(EXAM);
    expect(defaultPracticeSession(EXAM)).toBe("houki");
    expect(parsePracticeSession("kogaku")).toBe("kogaku");
    expect(usesNumberedChoices(EXAM)).toBe(true);
    expect(["ア", "イ", "ウ", "エ"].map((key) => choiceDisplayLabel(EXAM, key as "ア" | "イ" | "ウ" | "エ")))
      .toEqual(["1", "2", "3", "4"]);
    for (const [season, session, first, last] of papers) {
      const paper = pool.filter((q) => q.season === season && q.session === session);
      expect(paper).toHaveLength(12);
      expect(paper.map((q) => q.qNumber).sort((a, b) => a - b))
        .toEqual(Array.from({ length: 12 }, (_, i) => first + i));
      expect(paper.every((q) => q.qNumber >= first && q.qNumber <= last)).toBe(true);
    }
    for (const q of pool) {
      expect(q.officialAnswerNumber).toMatch(/^[1-4]$/);
      expect(Object.keys(q.choices ?? {})).toEqual(["ア", "イ", "ウ", "エ"]);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(["ア", "イ", "ウ", "エ"]);
      expect(q.answer).toBe(["ア", "イ", "ウ", "エ"][Number(q.officialAnswerNumber) - 1]);
      expect(Object.values(q.choiceExplanations ?? {}).every((reason) => reason.trim().length > 0)).toBe(true);
      expect(shuffleChoices(q)).toBe(q);
    }
  });

  it("resolves 48 canonical page routes and 48 search facet hits", async () => {
    const pool = await getQuestionsForExam(EXAM);
    const paths = pool.map(questionPagePath);
    expect(new Set(paths).size).toBe(48);
    for (const [index, url] of paths.entries()) {
      const q = pool[index]!;
      expect(url).toBe(`/q/${EXAM}/${q.year}-${q.season}/${q.session}/q${q.qNumber}`);
      const [, , exam, yearSeason, section, qnum] = url.split("/");
      const parts = { exam: exam!, yearSeason: yearSeason!, section: section!, qnum: qnum! };
      expect(parseQuestionRoute(parts)).toMatchObject({ exam: EXAM, year: 2026, season: q.season,
        session: q.session, qNumber: q.qNumber });
      expect(findQuestionByRoute(pool, parts)?.id).toBe(q.id);
    }
    const result = await searchQuestions({ exam: EXAM, limit: 1 });
    expect(result.total).toBe(48);
    expect(result.facets.exam[EXAM]).toBe(48);
    expect(result.hits[0]?.exam).toBe(EXAM);
  });

  it("keeps source attribution, original figure URLs and non-IPA JSON-LD for all records", async () => {
    const pool = await getQuestionsForExam(EXAM);
    let figures = 0;
    for (const q of pool) {
      expect(q.license).toBe("NICHIMU-educational-reuse");
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.nichimu\.or\.jp\//);
      expect(q.sourceAnswerUrl).toMatch(/^https:\/\/www\.nichimu\.or\.jp\//);
      expect(q.sourceAttribution).toContain("日本無線協会");
      if (q.session === "houki") expect(q.lawReferenceDate).toMatch(/^2026-(02|06)-01$/);
      if (q.hasImage) {
        figures++;
        expect(q.imageUrls).toHaveLength(1);
        const imageUrl = q.imageUrls![0]!;
        expect(imageUrl).toMatch(/^\/images\/questions\/koku-toku\/.*\.png$/);
        expect(existsSync(path.join(process.cwd(), "public", imageUrl.slice(1)))).toBe(true);
      }
      const resource = buildQuestionJsonLd({ question: q,
        pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`,
        title: "航空特殊無線技士の過去問", lastUpdatedISO: "2026-10-15" })["@graph"][0] as {
        creator: { name: string }; hasPart: { author: { name: string; url: string } };
        license?: string; isAccessibleForFree: boolean;
      };
      expect(resource.hasPart.author.name).toContain("日本無線協会");
      expect(resource.hasPart.author.url).toBe(NIC);
      expect(resource.creator.name).toContain("日本無線協会");
      expect(resource.license).toBe(POLICY);
      expect(resource.isAccessibleForFree).toBe(true);
    }
    expect(figures).toBe(11);
  });
});
