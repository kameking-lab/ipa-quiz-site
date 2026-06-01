import { describe, expect, it } from "vitest";

import {
  buildAnalysisPost,
  buildFrequentTopicsPost,
  buildLastMonthPost,
  buildOverviewPost,
  buildPracticePost,
} from "@/data/blog/generators";
import { getBlogPostBySlug } from "@/data/blog";
import { EXAM_PROFILES } from "@/data/blog/exam-data";
import { ESSAY_EXAM_CODES } from "@/lib/essay/load";
import { CURRENT_YEAR } from "@/lib/constants/current-year";
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

describe("blog template generators — flagship 午後論述AI採点(/essay) CTA gated to 論文区分", () => {
  // overview / lastMonth / practice each append a 旗艦 /essay grading CTA in
  // their 午後(・論文) section, but ONLY for exams whose afternoon essays have
  // real data (st/sa/pm/sm/au = ESSAY_EXAM_CODES). Emitting it for ap/sc/nw/db/es
  // (mock or 記述式) would be 誇大 (advertising AI grading the product doesn't
  // really back). The gate in generators.ts (ESSAY_FLAGSHIP_EXAMS) duplicates
  // ESSAY_EXAM_CODES to avoid importing heavy essay data; pin the equivalence so
  // a drift between the two surfaces here, across every generator that funnels.
  const essaySet = new Set<string>(ESSAY_EXAM_CODES);
  // Bare /essay hub link is the flagship target; /essays (plural) is noindex.
  const FLAGSHIP_LINK = "](/essay)";
  const FUNNELING = [
    { name: "overview", build: buildOverviewPost },
    { name: "lastMonth", build: buildLastMonthPost },
    { name: "practice", build: buildPracticePost },
  ] as const;

  for (const g of FUNNELING) {
    for (const exam of EXAMS) {
      const shouldHave = essaySet.has(exam);
      it(`${g.name}(${exam}) ${shouldHave ? "links" : "does NOT link"} to /essay in body`, () => {
        const body = g.build(exam, 0).body;
        expect(body.includes(FLAGSHIP_LINK)).toBe(shouldHave);
      });
    }

    it(`${g.name}: exactly the 論文区分 exercise the flagship CTA (non-vacuous)`, () => {
      const linked = EXAMS.filter((e) =>
        g.build(e, 0).body.includes(FLAGSHIP_LINK),
      );
      expect(linked.length).toBe(ESSAY_EXAM_CODES.length);
      expect(linked.length).toBeGreaterThan(0);
    });
  }
});

describe("blog template generators — 最新 titles stay evergreen (no frozen year)", () => {
  // The overview/analysis titles advertise themselves as 最新 and must track
  // CURRENT_YEAR (evaluated at build time, JST) rather than freeze a calendar
  // year — otherwise a "2024〜2025年" title silently rots while claiming 最新.
  // generators.ts line-10 comment documents this contract; pin it.
  const DATED = [
    { name: "overview", build: buildOverviewPost },
    { name: "analysis", build: buildAnalysisPost },
  ] as const;

  for (const g of DATED) {
    it(`${g.name} title references CURRENT_YEAR and freezes no other 4-digit year`, () => {
      const title = g.build("ap", 0).title;
      expect(title).toContain(`${CURRENT_YEAR}年最新`);
      // No stray 20xx that isn't CURRENT_YEAR (catches a re-frozen range).
      const years = title.match(/20\d{2}/g) ?? [];
      for (const y of years) {
        expect(y).toBe(String(CURRENT_YEAR));
      }
    });
  }
});

describe("blog template generators — 土台 科目B pillar funnel gated to FE", () => {
  // lastMonth / practice 午後 sections deep-link the 科目B 完全対策 pillar, but
  // ONLY for FE — because FE's 午後 IS 科目B (アルゴリズム・擬似言語). Emitting
  // it for any other exam would be off-topic. Guard the exact gate.
  const PILLAR_LINK = "](/blog/fe-kamoku-b-taisaku)";
  const FUNNELING = [
    { name: "lastMonth", build: buildLastMonthPost },
    { name: "practice", build: buildPracticePost },
  ] as const;

  for (const g of FUNNELING) {
    for (const exam of EXAMS) {
      const shouldHave = exam === "fe";
      it(`${g.name}(${exam}) ${shouldHave ? "links" : "does NOT link"} to the 科目B pillar`, () => {
        expect(g.build(exam, 0).body.includes(PILLAR_LINK)).toBe(shouldHave);
      });
    }
  }
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

// FE 科目B is 20 questions / 100 minutes (IPA official: 科目A=90分/60問,
// 科目B=100分/20問). The pillar fe-kamoku-b-taisaku once stated "90分・1問4.5分"
// (a stale/incorrect figure that also surfaced in its FAQPage JSON-LD). Pin the
// corrected exam-format facts so the wrong time can't silently regress —
// especially in structured data Google reads. 科目A's 90分 lives elsewhere and
// is unaffected; these posts must never claim 科目B is 90分 or 4.5 分/問.
describe("blog 土台 科目B posts — FE 科目B exam-format facts are correct (100分)", () => {
  it("fe-kamoku-b-taisaku states 100分 and never the wrong 90分 / 4.5分", () => {
    const post = getBlogPostBySlug("fe-kamoku-b-taisaku");
    expect(post).toBeDefined();
    const body = post!.body;
    expect(body).toContain("100分");
    expect(body).toContain("1問5分");
    expect(body).not.toContain("90分");
    expect(body).not.toContain("4.5");
  });

  it("fe-kamoku-b-wakaranai never states the wrong 4.5分/問", () => {
    const post = getBlogPostBySlug("fe-kamoku-b-wakaranai");
    expect(post).toBeDefined();
    expect(post!.body).not.toContain("4.5");
  });
});
