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

  // 科目B 時間配分/時間切れ longtail article (新設). Pin its exam-format facts
  // (100分・600点, never the wrong 90分/4.5分), the 土台 pillar + algorithm topic
  // pool funnel links (so a broken link surfaces as a failure, not a silent
  // SEO/UX loss), and the FAQ section that powers its FAQPage JSON-LD.
  it("fe-kamoku-b-jikan-haibun: correct facts, funnel links, FAQ section", () => {
    const post = getBlogPostBySlug("fe-kamoku-b-jikan-haibun");
    expect(post).toBeDefined();
    const body = post!.body;
    expect(body).toContain("100分");
    expect(body).toContain("600点");
    expect(body).not.toContain("90分");
    expect(body).not.toContain("4.5");
    // 土台 pillar + algorithm topic pool funnel (links must resolve to 200 pages)
    expect(body).toContain("/blog/fe-kamoku-b-taisaku");
    expect(body).toContain("/fe/topic/");
    // FAQ section drives FAQPage structured data via lib/blog/faq.ts extractFaq
    expect(body).toContain("## よくある質問");
  });

  // 応用情報 午後 時間配分/時間切れ longtail article (新設). AP午後 is 150分/5問,
  // 60点合格; it funnels to the /ap hub + AI copilot (NOT the mock essay grader,
  // which is HD-4). Pin the exam-format facts and the /ap funnel link.
  it("ap-gogo-jikan-haibun: correct facts, /ap funnel, FAQ, no essay-grader claim", () => {
    const post = getBlogPostBySlug("ap-gogo-jikan-haibun");
    expect(post).toBeDefined();
    const body = post!.body;
    expect(body).toContain("150分");
    expect(body).toContain("60点");
    expect(body).toContain("(/ap)");
    // must not over-claim AP afternoon AI grading (mock data — HD-4)
    expect(body).not.toContain("/essay");
    expect(body).toContain("## よくある質問");
  });

  // FE 合格点/IRT 採点の仕組み longtail article (新設). 高ボリュームの混同
  // キーワード(「基本情報 何点で合格」「科目B 何点」「IRT」)向け。IPA公式
  // (kubun/fe.html + 採点方式PDF): 科目A 90分/60問/四肢択一, 科目B 100分/20問,
  // 評価点1000点満点/基準点600点/IRT/両科目で基準点が必要/CBT通年。誇大回避:
  // IRTは正答率≠得点で換算式非公開のため、特定の正答率→得点を断定しない。
  // 土台ピラー /blog/fe-kamoku-b-taisaku へ funnel。FE は essay 区分でないので
  // 旗艦 /essay には送らない。
  it("fe-goukaku-ten-irt: correct scoring facts, IRT framing, 土台 funnel, no /essay", () => {
    const post = getBlogPostBySlug("fe-goukaku-ten-irt");
    expect(post).toBeDefined();
    const body = post!.body;
    expect(body).toContain("600点");
    expect(body).toContain("1000点満点");
    expect(body).toContain("IRT");
    // both subjects must independently meet the reference point
    expect(body).toContain("科目A・科目Bともに600点以上");
    // 土台 pillar funnel; FE is not an essay exam → never the flagship grader
    expect(body).toContain("/blog/fe-kamoku-b-taisaku");
    expect(body).not.toContain("/essay");
    expect(body).toContain("## よくある質問");
  });

  // AP 合格点/ボーダー longtail article (新設). 「応用情報 何点で合格/合算?/
  // 午前落ち 午後 採点」の混同キーワード向け。IPA公式(案内書・採点方式資料,
  // WebSearch裏取り): 午前・午後とも100点満点/基準点60点、各時間区分で基準点
  // 以上が必要(別判定)、多段階選抜方式=午前が基準点未満なら午後不採点。
  // FE(IRT/1000点満点)とは別の素点方式。/ap ハブ + AP午後記事 + AIコパイロット
  // へ funnel。AP午後採点=モック(HD-4)のため旗艦 /essay には送らない。
  it("ap-goukaku-ten-border: correct scoring facts, 素点/多段階選抜, /ap funnel, no /essay", () => {
    const post = getBlogPostBySlug("ap-goukaku-ten-border");
    expect(post).toBeDefined();
    const body = post!.body;
    expect(body).toContain("100点満点");
    expect(body).toContain("基準点60点");
    expect(body).toContain("午前・午後ともに60点以上");
    // multi-stage selection: 午前 below benchmark → 午後 ungraded
    expect(body).toContain("多段階選抜方式");
    expect(body).toContain("午後試験は採点されず不合格");
    // AP is 素点方式 (it contrasts against FE's IRT in the body)
    expect(body).toContain("素点方式");
    // funnel to /ap hub + AP afternoon articles; never the mock flagship grader
    expect(body).toContain("(/ap)");
    expect(body).toContain("/blog/ap-gogo-sentaku");
    expect(body).not.toContain("/essay");
    expect(body).toContain("## よくある質問");
  });
});

// ITストラテジスト(ST) 午後 structure (IPA official, st.html):
//   午後I  = 出題3問 / 解答2問 / 90分
//   午後II = 出題2問 / 解答1問 / 120分(2時間)
// EXAM_PROFILES.st.afternoonStrategy once stated "4問中2問" (午後I) and
// "3問中1問" (午後II) — both wrong question counts that propagate into every
// generator rendering p.afternoonStrategy (overview / lastMonth / practice).
// Pin the corrected counts so the stale figures can't silently regress.
describe("blog 旗艦 ST post — 午後 structure facts are correct (3問中2問 / 2問中1問)", () => {
  it("EXAM_PROFILES.st.afternoonStrategy states the correct selection counts", () => {
    const s = EXAM_PROFILES.st.afternoonStrategy;
    expect(s).toContain("3 問中 2 問");
    expect(s).toContain("2 問中 1 問");
    expect(s).not.toContain("4 問中 2 問");
    expect(s).not.toContain("3 問中 1 問");
  });

  it("st-goukaku-benkyouhou body carries the corrected counts", () => {
    const post = getBlogPostBySlug("st-goukaku-benkyouhou");
    expect(post).toBeDefined();
    const body = post!.body;
    expect(body).toContain("3 問中 2 問");
    expect(body).toContain("2 問中 1 問");
    expect(body).not.toContain("4 問中 2 問");
    expect(body).not.toContain("3 問中 1 問");
  });
});

// NW(ネットワークスペシャリスト) is NOT an essay(論述) exam: IPA official
// (shiken/kubun/nw.html) lists both 午後I and 午後II as 記述式. This is consistent
// with the codebase SSOT — ESSAY_EXAM_CODES (lib/essay/load) excludes nw, and
// lib/essays/load.ts notes NW/DB/ES are 技術記述問題 only. nw-hinshutu-pattern
// once read "午後IIは論述です" (a hard factuality error that also conflicts with
// the deliberate flagship /essay funnel excluding NW). Pin 記述式 framing so the
// 論述 mischaracterization can't silently regress.
describe("blog NW post — 午後 is 記述式, not 論述", () => {
  it("nw-hinshutu-pattern frames NW 午後 as 記述式 and never as 論述/論文", () => {
    const post = getBlogPostBySlug("nw-hinshutu-pattern");
    expect(post).toBeDefined();
    const body = post!.body;
    expect(body).toContain("記述式");
    expect(body).not.toContain("午後IIは論述");
    expect(body).not.toMatch(/午後.{0,4}論述/);
    expect(body).not.toMatch(/午後.{0,4}論文/);
  });

  // NW is excluded from ESSAY_EXAM_CODES, so NW articles must not carry the
  // flagship 午後論述AI採点 hub CTA (bare "](/essay)"). nw-protocol-deep-
  // understanding once closed with "[論述添削（PM/SA 方面）](/essay)" — an ungated
  // off-topic funnel on a 記述式 exam page. Pin its absence on both NW articles.
  it("NW articles do not carry the flagship /essay hub CTA", () => {
    for (const slug of ["nw-protocol-deep-understanding", "nw-hinshutu-pattern"]) {
      const post = getBlogPostBySlug(slug);
      expect(post, slug).toBeDefined();
      expect(post!.body.includes("](/essay)"), slug).toBe(false);
    }
  });

  // 新設: NW午後 時間配分 longtail article. IPA official (nw.html):
  //   午後I  = 90分 / 3問中2問 / 記述式
  //   午後II = 120分 / 2問中1問 / 記述式
  // Funnels to the /nw hub + AI copilot only — NW is 記述式 (not 論述), so it must
  // NOT carry the flagship /essay grader CTA (ESSAY_EXAM_CODES excludes nw).
  it("nw-gogo-jikan-haibun: correct 午後 facts, /nw funnel, FAQ, no /essay", () => {
    const post = getBlogPostBySlug("nw-gogo-jikan-haibun");
    expect(post).toBeDefined();
    const body = post!.body;
    expect(body).toContain("90分");
    expect(body).toContain("120分");
    expect(body).toContain("3問中2問");
    expect(body).toContain("2問中1問");
    expect(body).toContain("記述式");
    expect(body).toContain("(/nw)");
    // NW is not an essay exam — must not funnel to the flagship grader
    expect(body).not.toContain("/essay");
    expect(body).toContain("## よくある質問");
    // 記述式 exam: must not mischaracterize 午後 as 論述/論文
    expect(body).not.toMatch(/午後.{0,4}論述/);
    expect(body).not.toMatch(/午後.{0,4}論文/);
  });

  // 新設: DB午後 時間配分 longtail article. IPA official (db.html):
  //   午後I  = 90分 / 3問中2問 / 記述式
  //   午後II = 120分 / 2問中1問 / 記述式
  // DB is 記述式 (not 論述, excluded from ESSAY_EXAM_CODES) — funnels to /db hub +
  // AI copilot only, never the flagship /essay grader.
  it("db-gogo-jikan-haibun: correct 午後 facts, /db funnel, FAQ, no /essay", () => {
    const post = getBlogPostBySlug("db-gogo-jikan-haibun");
    expect(post).toBeDefined();
    const body = post!.body;
    expect(body).toContain("90分");
    expect(body).toContain("120分");
    expect(body).toContain("3問中2問");
    expect(body).toContain("2問中1問");
    expect(body).toContain("記述式");
    expect(body).toContain("(/db)");
    // DB is not an essay exam — must not funnel to the flagship grader
    expect(body).not.toContain("/essay");
    expect(body).toContain("## よくある質問");
    // 記述式 exam: must not mischaracterize 午後 as 論述/論文
    expect(body).not.toMatch(/午後.{0,4}論述/);
    expect(body).not.toMatch(/午後.{0,4}論文/);
  });

  // The 合格率 ranking article once generalized "高度試験は…午後IIの論述が合格率を
  // 押し下げる" — false for the 記述式 区分 (NW/DB/ES/SC). Pin that it now frames the
  // 午後 difficulty driver as 記述・論述 and distinguishes the two exam families.
  it("ipa-shiken-goukakuritsu-ranking does not call all 高度 午後II 論述", () => {
    const post = getBlogPostBySlug("ipa-shiken-goukakuritsu-ranking");
    expect(post).toBeDefined();
    const body = post!.body;
    expect(body).not.toContain("特に午後IIの論述が");
    expect(body).toContain("午後の記述・論述");
    expect(body).toContain("記述式（NW・DB・ES・SC）");
  });
});

// 応用情報(AP) exam-day schedule in ipa-shiken-moushikomi-nagare: 午前/午後 are
// each 150分 (IPA official). The clock windows once read 10:00〜11:30 (午前) and
// 12:30〜14:00 (午後) — both 90-minute spans contradicting their own "（150 分）"
// labels. Pin the corrected 150-minute windows so a 90-min span labelled 150分
// can't silently regress.
describe("blog 申込の流れ — AP exam-day schedule windows match 150分", () => {
  it("ipa-shiken-moushikomi-nagare shows 150-minute 午前/午後 windows", () => {
    const post = getBlogPostBySlug("ipa-shiken-moushikomi-nagare");
    expect(post).toBeDefined();
    const body = post!.body;
    expect(body).toContain("10:00〜12:30 午前試験（150 分）");
    expect(body).toContain("13:30〜16:00 午後試験（150 分）");
    expect(body).not.toContain("10:00〜11:30 午前試験");
    expect(body).not.toContain("12:30〜14:00 午後試験");
  });
});

// 午前I免除制度 (IPA official, about/koudo_menjo.html): AP 合格による免除は
// 「条件を満たした試験から 2 年後の同時期試験まで」有効＝合格した季を起点に
// 春・秋で最大 4 回。ap-goukaku-go-koudo-senryaku once stated "翌年度から 2 年間
// （2回分）" and an example that ended 免除 at 2028年春 — both wrong (免除 starts the
// SAME 年度's next exam, gives 4 回, and 2028年春 IS the final 免除 round). Pin the
// corrected facts so the understated window/count can't silently regress.
describe("blog 午前I免除 post — exemption window facts are correct (2年後の同時期・最大4回)", () => {
  it("ap-goukaku-go-koudo-senryaku states 2年後の同時期 / 最大4回, never 翌年度から / 2回分", () => {
    const post = getBlogPostBySlug("ap-goukaku-go-koudo-senryaku");
    expect(post).toBeDefined();
    const body = post!.body;
    expect(body).toContain("2 年後の同時期試験まで");
    expect(body).toContain("最大4回");
    expect(body).not.toContain("翌年度から");
    expect(body).not.toContain("2回分");
  });

  it("the worked example keeps 2028年春 as 免除可能 (the final round), not 免除終了", () => {
    const post = getBlogPostBySlug("ap-goukaku-go-koudo-senryaku");
    const body = post!.body;
    expect(body).toContain("2028 年春（4月）の高度試験：午前I免除可能");
    expect(body).toContain("2028 年秋（10月）以降：免除期間終了");
    expect(body).not.toContain("2028 年春（4月）以降：免除期間終了");
  });
});

// 高度試験の春期/秋期 区分グルーピング (IPA official, 令和7年度春期 r07haru_exam.html
// ＝2026年度前期/後期と同一グルーピング):
//   春期(前期): ST / SA / NW / SM      秋期(後期): PM / DB / ES / AU      SC: 春・秋とも
// ap-goukaku-go-koudo-senryaku once put NW in 秋期 and PM・AU in 春期 — wrong groupings
// that misdirect "what can I take next" planning. Pin the correct sets so they can't
// silently regress. (The 春秋→前後期 rename / CBT 日程変更 is a separate site-wide
// matter tracked in growth-human-decisions.md; this only fixes the exam grouping.)
describe("blog 午前I免除 post — 高度試験 spring/autumn grouping is correct", () => {
  it("ap-goukaku-go-koudo-senryaku groups NW into 春期 and PM/AU into 秋期", () => {
    const post = getBlogPostBySlug("ap-goukaku-go-koudo-senryaku");
    const body = post!.body;
    expect(body).toContain("**春期（4月）のみ**：ST、SA、NW、SM");
    expect(body).toContain("**秋期（10月）のみ**：PM、DB、ES、AU");
    // The old wrong groupings must be gone.
    expect(body).not.toContain("AU、ST、SA、PM、SM");
    expect(body).not.toContain("秋期受験なら SC・NW・DB・ES");
    expect(body).not.toContain("秋期の SC・NW・DB・ES");
  });
});

// SC(情報処理安全確保支援士)午後 (IPA official, kubun/sc.html): 2023年4月の改定で
// 午後I・午後II が 1 つの「午後試験」へ統合された＝150分・記述式・出題4問/解答2問。
// sc-shikaku-merit once described the abolished pre-2023 structure
// (「午前I・午前II・午後I・午後II の 4 部構成」「午後I：90分で2問選択」
// 「午後II：120分で1問選択」). exam-data の SC profile は既に単一午後・記述で正。
// Pin the unified 午後 so the abolished 午後I/午後II split can't silently regress.
describe("blog SC merit post — 午後 structure is the unified 記述式 test (post-2023)", () => {
  it("sc-shikaku-merit describes 午前I・午前II・午後 の 3部構成, not the old 4部構成", () => {
    const post = getBlogPostBySlug("sc-shikaku-merit");
    expect(post).toBeDefined();
    const body = post!.body;
    expect(body).toContain("午前 I・午前 II・午後（記述式）の 3 部構成");
    expect(body).toContain("午後：150 分で 4 問中 2 問選択（記述式）");
    // The abolished pre-2023 split must be gone from this SC-specific article.
    expect(body).not.toContain("午前 I・午前 II・午後 I・午後 II の 4 部構成");
    expect(body).not.toContain("午後 I：90 分で 2 問選択");
    expect(body).not.toContain("午後 II：120 分で 1 問選択");
  });

  // 登録セキスペの更新講習費用 (IPA / 各種公開情報): オンライン講習 約2万円/年
  // (3年で約6万円) ＋ 実践講習 約8万円〜 (3年に1回) ＝ 更新講習だけで 3年で約14万円〜。
  // sc-shikaku-merit once understated this as「3年で約8万円程度」「3年で約9万円」
  // (オンライン講習分を取りこぼし)。費用対効果の判断材料を過小提示する誤りなので、
  // 約14万円〜の維持費を pin して過小値への regression を防ぐ。
  it("sc-shikaku-merit states the ~14万円 3-year 更新講習 cost, not the understated 8〜9万円", () => {
    const post = getBlogPostBySlug("sc-shikaku-merit");
    const body = post!.body;
    expect(body).toContain("3 年で約 14 万円〜の維持費");
    expect(body).toContain("オンライン講習：約 2 万円／年");
    expect(body).not.toContain("3 年で約 8 万円程度");
    expect(body).not.toContain("3 年で約 9 万円の維持費");
    expect(body).not.toContain("維持費 3 年 9 万円");
  });

  // 2026 参考書ガイドの SC 節も、廃止済み「午後I・II」書名フレーミングではなく
  // 統合後の「午後問題」フレーミングを使う (上記 sc-shikaku-merit と同じ事実)。
  it("ipa-sanko-mondaishu-2026 references SC 午後問題, not the abolished 午後I・II", () => {
    const post = getBlogPostBySlug("ipa-sanko-mondaishu-2026");
    expect(post).toBeDefined();
    const body = post!.body;
    expect(body).toContain("「SC 午後問題演習」");
    expect(body).not.toContain("「SC 午後I・II 問題演習」");
  });
});

// SC 合格後に登録できる国家資格の正式名称は「情報処理安全確保支援士（登録セキスペ）」
// (IPA 公式 kubun/sc.html)。RISS = Registered Information Security Specialist (英語名)。
// 「登録情報セキュリティスペシャリスト」は IPA が用いない英語の逆翻訳で不正確
// (session21 で faq.ts の同種誤称号を是正済)。career path 記事の称号誤りを pin。
describe("blog SC career post — 登録資格の正式名称 (情報処理安全確保支援士/登録セキスペ)", () => {
  it("shikaku-career-path uses 情報処理安全確保支援士, not the inaccurate 登録情報セキュリティスペシャリスト", () => {
    const post = getBlogPostBySlug("shikaku-career-path");
    expect(post).toBeDefined();
    const body = post!.body;
    expect(body).toContain("「情報処理安全確保支援士（登録セキスペ）」として登録可能");
    expect(body).not.toContain("登録情報セキュリティスペシャリスト");
  });
});
