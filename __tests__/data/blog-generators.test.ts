import { describe, expect, it } from "vitest";

import {
  buildAnalysisPost,
  buildFrequentTopicsPost,
  buildLastMonthPost,
  buildOverviewPost,
  buildPracticePost,
} from "@/data/blog/generators";
import { EXAM_PROFILES } from "@/data/blog/exam-data";
import { ESSAY_EXAM_CODES } from "@/lib/essay/load";
import type { ExamCode } from "@/lib/questions/types";

// Characterization tests for the per-exam blog post generators
// (data/blog/generators.ts). data/blog/index.ts assembles their output and
// blog-index.test pins index-level invariants (uniqueness/ordering/related),
// but the generators themselves were uncovered per-name: nothing asserted each
// generator's slug shape, the exam<->post consistency, the in-body /[exam]
// practice CTA (a crawlable internal link that must not 404), or that the
// exam-scoped relatedSlugs round-trip to a slug a sibling generator for the
// same exam actually produces. Source is unchanged — these pin current behaviour.

const EXAMS = Object.keys(EXAM_PROFILES) as ExamCode[];

// The five per-exam generators, paired with the slug suffix each emits.
const GENERATORS = [
  { name: "overview", build: buildOverviewPost, suffix: "goukaku-benkyouhou" },
  { name: "lastMonth", build: buildLastMonthPost, suffix: "cyokusen-1kagetsu" },
  {
    name: "frequentTopics",
    build: buildFrequentTopicsPost,
    suffix: "hinnshutsu-ronten-toppu10",
  },
  { name: "practice", build: buildPracticePost, suffix: "yoru-tokurensyu" },
  { name: "analysis", build: buildAnalysisPost, suffix: "jisseki-mondai-bunseki" },
] as const;

describe("blog per-exam generators — shape & consistency", () => {
  for (const exam of EXAMS) {
    for (const g of GENERATORS) {
      it(`${g.name}(${exam}) carries the exam, the expected slug, and the /${exam} hub link`, () => {
        const post = g.build(exam, 0);
        expect(post.exam).toBe(exam);
        expect(post.slug).toBe(`${exam}-${g.suffix}`);
        expect(post.title.length).toBeGreaterThan(0);
        expect(post.description.length).toBeGreaterThan(0);
        expect(post.body.length).toBeGreaterThan(0);
        // The CTA deep-links to the exam hub; a wrong exam here would 404.
        expect(post.body).toContain(`](/${exam})`);
        // shortLabel is the exam-specific tag every generator attaches.
        expect(post.tags).toContain(EXAM_PROFILES[exam].shortLabel);
      });
    }
  }
});

describe("blog per-exam generators — publishedAt SEO contract", () => {
  for (const exam of EXAMS) {
    it(`${exam}: every generated post has a valid ISO publishedAt that is never in the future`, () => {
      const now = Date.now();
      for (const g of GENERATORS) {
        const iso = g.build(exam, 0).publishedAt;
        const t = Date.parse(iso);
        expect(Number.isNaN(t)).toBe(false);
        // Canonical ISO 8601 round-trip (not just any parseable string).
        expect(new Date(t).toISOString()).toBe(iso);
        // Google suppresses Article schema whose datePublished is in the future.
        expect(t).toBeLessThanOrEqual(now);
      }
    });

    it(`${exam}: publishedAt strictly increases across the generator series`, () => {
      // overview(idx) < lastMonth(13+idx) < frequent(26+idx) < practice(39+idx)
      // < analysis(52+idx). All five base offsets land in early 2026 (well
      // before "today"), so none clamp and the series is strictly ordered; a
      // regression in the per-generator base offsets would reorder or collapse it.
      const times = GENERATORS.map((g) =>
        Date.parse(g.build(exam, 0).publishedAt),
      );
      for (let i = 1; i < times.length; i++) {
        expect(times[i]).toBeGreaterThan(times[i - 1]);
      }
    });
  }
});

describe("blog overview — flagship 午後論述AI採点(/essay) CTA gated to 論文区分", () => {
  // buildOverviewPost appends a 旗艦 /essay grading CTA in its 午後 section,
  // but ONLY for exams whose afternoon essays have real data (st/sa/pm/sm/au =
  // ESSAY_EXAM_CODES). Emitting it for ap/sc/nw/db/es (mock or 記述式) would be
  // 誇大 (advertising AI grading the product doesn't really back). The CTA list
  // in generators.ts duplicates ESSAY_EXAM_CODES to avoid importing heavy essay
  // data; pin the equivalence so a drift between the two surfaces here.
  const essaySet = new Set<string>(ESSAY_EXAM_CODES);
  // Bare /essay hub link is the flagship target; /essays (plural) is noindex.
  const FLAGSHIP_LINK = "](/essay)";

  for (const exam of EXAMS) {
    const shouldHave = essaySet.has(exam);
    it(`overview(${exam}) ${shouldHave ? "links" : "does NOT link"} to /essay in body`, () => {
      const body = buildOverviewPost(exam, 0).body;
      expect(body.includes(FLAGSHIP_LINK)).toBe(shouldHave);
    });
  }

  it("at least one 論文区分 actually exercises the flagship CTA (non-vacuous)", () => {
    const linked = EXAMS.filter((e) =>
      buildOverviewPost(e, 0).body.includes(FLAGSHIP_LINK),
    );
    expect(linked.length).toBe(ESSAY_EXAM_CODES.length);
    expect(linked.length).toBeGreaterThan(0);
  });
});

describe("blog per-exam generators — exam-scoped relatedSlugs round-trip (no 404)", () => {
  for (const exam of EXAMS) {
    it(`${exam}: every exam-prefixed relatedSlug resolves to a sibling generator's slug`, () => {
      const family = new Set(GENERATORS.map((g) => `${exam}-${g.suffix}`));
      for (const g of GENERATORS) {
        const post = g.build(exam, 0);
        const examScoped = (post.relatedSlugs ?? []).filter((s) =>
          s.startsWith(`${exam}-`),
        );
        // Each generator wires at least one intra-family relation, and all of
        // them must resolve — otherwise the related-posts rail links to a 404.
        expect(examScoped.length).toBeGreaterThan(0);
        for (const s of examScoped) {
          expect(family.has(s)).toBe(true);
        }
      }
    });
  }
});
