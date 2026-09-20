import { describe, expect, it } from "vitest";

import { generateMetadata } from "@/app/q/[exam]/[yearSeason]/[section]/[qnum]/page";
import { ALL_QUESTIONS } from "@/data/questions";
import type { Question } from "@/lib/questions/types";
import {
  getQuestionCanonicalRepresentative,
  isQuestionCanonicalRepresentative,
} from "@/lib/seo/question-canonical";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import {
  getIndexableQuestions,
  getSitemapQuestions,
} from "@/lib/seo/sitemap-pagination";

function q(overrides: Partial<Question>): Question {
  return {
    id: "sc-2024a-am1-q1",
    exam: "sc",
    session: "am1",
    year: 2024,
    season: "autumn",
    qNumber: 1,
    type: "multiple-choice",
    category: "基礎理論",
    topicTags: [],
    difficulty: 3,
    question: "共通問題はどれか。",
    choices: { ア: "A", イ: "B", ウ: "C", エ: "D" },
    answer: "ア",
    explanation: "十分な解説です。",
    hasImage: false,
    sourcePdfUrl: "https://example.com/am1.pdf",
    license: "IPA-public",
    ...overrides,
  };
}

describe("morning-I canonical representative", () => {
  it("consolidates only identical source-question subgroups at the same coordinate", () => {
    const sc = q({});
    const pm = q({ id: "pm-2024a-am1-q1", exam: "pm", category: "経営戦略", explanation: "PM向けの解説です。" });
    const au = q({ id: "au-2024a-am1-q1", exam: "au", answer: "イ" });
    const older = q({ id: "nw-2023a-am1-q1", exam: "nw", year: 2023 });
    const pool = [au, older, pm, sc];

    expect(getQuestionCanonicalRepresentative(pool, pm)).toBe(sc);
    expect(getQuestionCanonicalRepresentative(pool, sc)).toBe(sc);
    expect(getQuestionCanonicalRepresentative(pool, au)).toBe(au);
    expect(getQuestionCanonicalRepresentative(pool, older)).toBe(older);
  });

  it("does not consolidate identical morning-II questions", () => {
    const sc = q({ session: "am2" });
    const pm = q({ id: "pm-2024a-am2-q1", exam: "pm", session: "am2" });
    const pool = [sc, pm];

    expect(getQuestionCanonicalRepresentative(pool, pm)).toBe(pm);
    expect(getQuestionCanonicalRepresentative(pool, sc)).toBe(sc);
  });

  it("chooses a playable representative deterministically, independent of pool order", () => {
    const unavailableSc = q({ explanation: "正解はアです。" });
    const pm = q({ id: "pm-2024a-am1-q1", exam: "pm" });

    expect(getQuestionCanonicalRepresentative([unavailableSc, pm], unavailableSc)).toBe(pm);
    expect(getQuestionCanonicalRepresentative([pm, unavailableSc], unavailableSc)).toBe(pm);
  });

  it("keeps the requested exam route resolvable while canonicalizing its metadata", () => {
    const sc = q({});
    const pm = q({ id: "pm-2024a-am1-q1", exam: "pm", category: "経営戦略", explanation: "PM向けの解説です。" });
    const pool = [pm, sc];
    const requested = findQuestionByRoute(pool, {
      exam: "pm",
      yearSeason: "2024-autumn",
      section: "am1",
      qnum: "q1",
    });

    expect(requested).toBe(pm);
    expect(requested?.category).toBe("経営戦略");
    expect(questionPagePath(getQuestionCanonicalRepresentative(pool, requested!))).toBe(
      "/q/sc/2024-autumn/am1/q1",
    );
    expect(isQuestionCanonicalRepresentative(pool, pm)).toBe(false);
    expect(isQuestionCanonicalRepresentative(pool, sc)).toBe(true);
  });

  it("lists every representative and no exact-duplicate alias in the sitemap pool", () => {
    const sitemapQuestions = getSitemapQuestions();
    const sitemapIds = new Set(sitemapQuestions.map((question) => question.id));
    const aliases = getIndexableQuestions().filter(
      (question) => !isQuestionCanonicalRepresentative(ALL_QUESTIONS, question),
    );

    expect(aliases.length).toBeGreaterThan(0);
    expect(aliases.filter((question) => sitemapIds.has(question.id))).toEqual([]);
    for (const alias of aliases) {
      expect(
        sitemapIds.has(getQuestionCanonicalRepresentative(ALL_QUESTIONS, alias).id),
      ).toBe(true);
    }
    for (const question of sitemapQuestions) {
      expect(isQuestionCanonicalRepresentative(ALL_QUESTIONS, question)).toBe(true);
    }
  });

  it("emits the representative canonical while retaining the requested exam's metadata", async () => {
    // These two pages have the same official source question but deliberately
    // different editorial categories in the corpus.
    const metadata = await generateMetadata({
      params: Promise.resolve({
        exam: "nw",
        yearSeason: "2009-autumn",
        section: "am1",
        qnum: "q2",
      }),
    });

    expect(metadata.alternates?.canonical).toBe("/q/sc/2009-autumn/am1/q2");
    expect(metadata.openGraph?.url).toBe("/q/sc/2009-autumn/am1/q2");
    expect(metadata.description).toContain("・ネットワーク");
    expect(metadata.description).not.toContain("・基礎理論");
  });
});
