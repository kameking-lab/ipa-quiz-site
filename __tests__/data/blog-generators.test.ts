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

describe("blog template generators — every per-exam post carries a FAQ (FAQPage source)", () => {
  // All five per-exam generators emit a `## よくある質問` section, which
  // lib/blog/faq.ts::extractFaq turns into FAQPage JSON-LD on the rendered page.
  // overview/lastMonth/frequentTopics were FAQ-ified earlier; practice & analysis
  // were the last two templates without it. Pin that none silently loses its FAQ
  // across all 13 区分 (a dropped section = lost structured data for 13 pages).
  for (const g of GENERATORS) {
    for (const exam of EXAMS) {
      it(`${g.name}(${exam}) contains the FAQ section`, () => {
        expect(g.build(exam, 0).body).toContain("## よくある質問");
      });
    }
  }
});

describe("blog template generators — analysis never funnels to flagship /essay", () => {
  // buildAnalysisPost has no 論述 writing section (it's a 出題傾向 analysis), so it
  // funnels to 分野別モード + the /[exam] hub only — never the flagship grader,
  // for any exam (mirrors frequentTopics). Guard against a stray /essay link
  // sneaking into the FAQ or body for the 論文区分.
  for (const exam of EXAMS) {
    it(`analysis(${exam}) does NOT link to /essay`, () => {
      expect(buildAnalysisPost(exam, 0).body).not.toContain("](/essay)");
    });
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
    // IPA official (henkou/2022/20220425.html): from 2023年4月 the 午前/午後 split was
    // abolished and replaced by 科目A/科目B (CBT 通年). Legacy searchers still query
    // "基本情報 午後" — pin the transition clarification so it can't silently drop.
    expect(body).toContain("2023年4月から「午前・午後」という区分は廃止");
    expect(body).toContain("旧 午後 → 現 **科目B**");
    // 合格点 cluster cross-link: FE(IRT) ↔ AP(素点) comparison intent
    expect(body).toContain("/blog/ap-goukaku-ten-border");
    // 合格点 cluster cross-link: FE(IRT/科目A・B) ↔ IP(IRT/分野別足切り) comparison intent
    expect(body).toContain("/blog/ip-goukaku-ten-bunyabetsu");
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
    // 合格点 cluster cross-link: AP(素点) ↔ FE(IRT) comparison intent
    expect(body).toContain("/blog/fe-goukaku-ten-irt");
  });

  // IP 合格点 longtail article (新設). 「ITパスポート 何点で合格/総合評価点/
  // 分野別評価点」の混同キーワード向け。IPA公式(iパス評価方法 range.html WebFetch
  // 裏取り): 総合評価点1000点満点/600点以上 かつ 分野別評価点(ストラテジ/マネジメント
  // /テクノロジ)各1000点満点/各300点以上、IRTで算出、出題100問のうち採点対象 約92問。
  // /ip ハブ + 分野別モード + AIコパイロット + IPクラスタへ funnel。
  // IPは非essay区分のため旗艦 /essay には送らない。
  it("ip-goukaku-ten-bunyabetsu: 総合600/分野別300, IRT, 採点92問, /ip funnel, no /essay", () => {
    const post = getBlogPostBySlug("ip-goukaku-ten-bunyabetsu");
    expect(post).toBeDefined();
    const body = post!.body;
    // total score: 600/1000
    expect(body).toContain("600点");
    expect(body).toContain("1000点満点");
    // per-field cutoff: each of 3 fields must reach 300 (the easily-missed twist)
    expect(body).toContain("300点");
    expect(body).toContain("分野別評価点");
    expect(body).toContain("1分野でも300点未満なら不合格");
    // IRT scoring; not a simple raw-count
    expect(body).toContain("IRT");
    // only ~92 of 100 questions are scored (IPA official)
    expect(body).toContain("92問");
    // funnel to /ip hub + IP cluster; IP is not an essay exam → never the flagship grader
    expect(body).toContain("/blog/ip-3shukan-goukaku");
    expect(body).not.toContain("/essay");
    expect(body).toContain("## よくある質問");
    // 合格点 cluster cross-link: IP(IRT/分野別) ↔ FE(IRT/科目A・B) comparison intent
    expect(body).toContain("/blog/fe-goukaku-ten-irt");
  });

  // IPA official (iパス評価方法 range.html): scored questions are ストラテジ32 /
  // マネジメント18 / テクノロジ42 → テクノロジ系が最多。ip-3shukan-goukaku once
  // claimed "配点はストラテジ系が最多" which is factually wrong (ストラテジ is ~35%
  // but not the largest). Pin the correction so the false superlative can't regress.
  it("ip-3shukan-goukaku: ストラテジは最多と誤記しない (テクノロジ系が最多)", () => {
    const post = getBlogPostBySlug("ip-3shukan-goukaku");
    expect(post).toBeDefined();
    const body = post!.body;
    expect(body).not.toContain("ストラテジ系が最多");
    expect(body).toContain("テクノロジ系が最多");
  });

  // 「ITパスポート 意味ない」objection cluster. IP は入門・非論文区分のため
  // 旗艦 /essay へは送らず(s27/s65 precedent)、入口=/ip と土台=FE科目B へ funnel。
  // 合格基準は SSOT(ip-goukaku-ten-bunyabetsu)と一致させ、誇大な年収/断定を入れない。
  // inbound は ip-goukaku-ten-bunyabetsu / ip-3shukan-goukaku の relatedSlugs から
  // 受ける(orphan回避)。崩れたら落ちる。
  it("ip-shiken-meritto-imi-aru: ip exam, FAQ source, /ip+FE funnel, no /essay, inbound wired", () => {
    const post = getBlogPostBySlug("ip-shiken-meritto-imi-aru");
    expect(post).toBeDefined();
    expect(post!.exam).toBe("ip");
    const body = post!.body;
    // FAQPage source section present
    expect(body).toContain("## よくある質問");
    // entry funnel to /ip hub and foundation (FE 科目B); never the flagship grader
    expect(body).toContain("(/ip)");
    expect(body).toContain("/blog/fe-kamoku-b-taisaku");
    expect(body).not.toContain("/essay");
    // 合格基準は SSOT と一致(総合600/分野別300・1000点満点)
    expect(body).toContain("600 点");
    expect(body).toContain("300 点");
    // 入門レベルの事実(レベル 1)を明示
    expect(body).toContain("レベル 1");
    // 誇大回避: 具体的な年収額の断定を入れない
    expect(body).not.toMatch(/年収\s*\d/);
    // inbound wiring (non-orphan): listed in IP-cluster siblings' relatedSlugs
    for (const sib of ["ip-goukaku-ten-bunyabetsu", "ip-3shukan-goukaku"]) {
      const s = getBlogPostBySlug(sib);
      expect(s?.relatedSlugs).toContain("ip-shiken-meritto-imi-aru");
    }
  });

  // FE objection/value article (foundation exam). inbound は fe-goukaku-ten-irt /
  // ip-shiken-meritto-imi-aru の relatedSlugs から受ける(orphan回避)。崩れたら落ちる。
  it("fe-shiken-meritto-imi-aru: fe exam, FAQ source, /fe+科目B funnel, no /essay, inbound wired", () => {
    const post = getBlogPostBySlug("fe-shiken-meritto-imi-aru");
    expect(post).toBeDefined();
    expect(post!.exam).toBe("fe");
    const body = post!.body;
    // FAQPage source section present
    expect(body).toContain("## よくある質問");
    // entry funnel to /fe hub and foundation (FE 科目B pillar); never the flagship grader
    expect(body).toContain("(/fe)");
    expect(body).toContain("/blog/fe-kamoku-b-taisaku");
    expect(body).not.toContain("/essay");
    // 合格基準は SSOT と一致(科目A・科目B各600点・1000点満点)
    expect(body).toContain("600 点");
    expect(body).toContain("1000 点満点");
    // FE のレベル(レベル 2)を明示
    expect(body).toContain("レベル 2");
    // 誇大回避: 具体的な年収額の断定を入れない
    expect(body).not.toMatch(/年収\s*\d/);
    // inbound wiring (non-orphan): listed in FE/IP-cluster siblings' relatedSlugs
    for (const sib of ["fe-goukaku-ten-irt", "ip-shiken-meritto-imi-aru"]) {
      const s = getBlogPostBySlug(sib);
      expect(s?.relatedSlugs).toContain("fe-shiken-meritto-imi-aru");
    }
  });

  // AP objection/value article. AP午後=記述式(mock/HD-4)ゆえ旗艦/essay非送客(s25/s28)。
  // inbound は ap-goukaku-ten-border / ap-benkyou-jikan-meyasu の relatedSlugs から。
  it("ap-shiken-meritto-imi-aru: ap exam, FAQ source, /ap funnel, no /essay, inbound wired", () => {
    const post = getBlogPostBySlug("ap-shiken-meritto-imi-aru");
    expect(post).toBeDefined();
    expect(post!.exam).toBe("ap");
    const body = post!.body;
    // FAQPage source section present
    expect(body).toContain("## よくある質問");
    // entry funnel to /ap hub; never the flagship grader (AP午後=mock, HD-4)
    expect(body).toContain("(/ap)");
    expect(body).not.toContain("/essay");
    // 合格基準は SSOT と一致(午前・午後 各100点満点中60点・素点方式)
    expect(body).toContain("100 点満点中 60 点");
    // AP のレベル(レベル 3)を明示
    expect(body).toContain("レベル 3");
    // 高度試験 午前I免除(合格後2年)の実利を明示
    expect(body).toContain("午前 I が");
    // 誇大回避: 具体的な年収額の断定を入れない
    expect(body).not.toMatch(/年収\s*\d/);
    // inbound wiring (non-orphan): listed in AP-cluster siblings' relatedSlugs
    for (const sib of ["ap-goukaku-ten-border", "ap-benkyou-jikan-meyasu"]) {
      const s = getBlogPostBySlug(sib);
      expect(s?.relatedSlugs).toContain("ap-shiken-meritto-imi-aru");
    }
  });

  // FE→AP の受験順を飛ばす判断記事。制度=採点無関係ゆえ旗艦/essay非送客。
  // 受験資格制限なし/FE合格でAP免除なしは durable fact。崩れたら落ちる。
  it("fe-tobashite-ap: ap exam, FAQ source, /fe+/ap funnel, no /essay, durable facts, inbound wired", () => {
    const post = getBlogPostBySlug("fe-tobashite-ap");
    expect(post).toBeDefined();
    expect(post!.exam).toBe("ap");
    const body = post!.body;
    // FAQPage source section present
    expect(body).toContain("## よくある質問");
    // entry funnel to both hubs; decision article never sends to the grader
    expect(body).toContain("(/fe)");
    expect(body).toContain("(/ap)");
    expect(body).not.toContain("/essay");
    // durable facts: 受験資格制限なし / FE合格でAP免除なし
    expect(body).toContain("受験資格に制限は");
    expect(body).toContain("免除されません");
    // SSOT: FE=レベル2 / AP=レベル3 を早見表で明示
    expect(body).toContain("レベル 2");
    expect(body).toContain("レベル 3");
    // 誇大回避: 具体的な年収額の断定を入れない
    expect(body).not.toMatch(/年収\s*\d/);
    // inbound wiring (non-orphan): siblings' relatedSlugs + 親FAQの本文リンク
    for (const sib of ["ap-shiken-meritto-imi-aru", "fe-shiken-meritto-imi-aru"]) {
      const s = getBlogPostBySlug(sib);
      expect(s?.relatedSlugs).toContain("fe-tobashite-ap");
    }
    expect(getBlogPostBySlug("ap-benkyou-jikan-meyasu")!.body).toContain(
      "/blog/fe-tobashite-ap",
    );
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

// 情報処理安全確保支援士(登録セキスペ/RISS)は「名称独占」資格であり「業務独占」ではない
// (IPA seido/shikumi.html・METI 資料: 独占業務は存在せず、登録者だけが名称を名乗れる)。
// EXAM_PROFILES.sc.career はかつて「業務独占に近い」と誤記し、overview/lastMonth/practice の
// 生成記事(sc-goukaku-benkyouhou 等・indexable)に伝播していた。さらに rirekisho 記事は IPA
// 試験を「能力認定試験」と正しく対比している(業務独占=弁護士/税理士/建築士)ため、「業務独占に
// 近い」は自サイト内でも不整合だった(session21-32 の称号/事実性是正と同系)。名称独占の表記を pin。
describe("blog SC career — RISS は名称独占であり業務独占ではない", () => {
  it("EXAM_PROFILES.sc.career states 名称独占, not 業務独占に近い", () => {
    const c = EXAM_PROFILES.sc.career;
    expect(c).toContain("名称独占");
    expect(c).not.toContain("業務独占に近い");
  });

  it("sc-goukaku-benkyouhou body carries the corrected 名称独占 framing", () => {
    const post = getBlogPostBySlug("sc-goukaku-benkyouhou");
    expect(post).toBeDefined();
    const body = post!.body;
    expect(body).toContain("名称独占");
    expect(body).not.toContain("業務独占に近い");
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

  // IPA official (about/koudo_menjo.html): 午前I免除 has THREE qualifying routes —
  // (1) AP 合格, (2) いずれかの高度試験・支援士に合格, (3) 高度・支援士の午前I で
  // 基準点以上 (午前I通過). The article originally explained only route 1, leaving the
  // other two routes (and the 午前I通過者番号 application path) absent site-wide. Pin
  // all three routes + the application numbers so the 条件 coverage can't silently drop.
  it("covers all three IPA exemption routes (AP合格 / 高度合格 / 午前I通過) and the application numbers", () => {
    const post = getBlogPostBySlug("ap-goukaku-go-koudo-senryaku");
    const body = post!.body;
    expect(body).toContain("3つの条件");
    expect(body).toContain("午前I通過者");
    expect(body).toContain("午前I通過者番号");
    expect(body).toContain("合格証書番号");
    expect(body).toContain("基準点（100点満点中60点）以上");
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

// sg-shiken-meritto-imi-aru once described the abolished pre-2023 structure
// (「午前 50 問の四択 + 午後の長文事例（CBT 化以降は科目B として統合）」).
// IPA 公式 kubun/sg.html: 現行 SG は 科目A（四肢択一）＋科目B（多肢選択）の 2 科目・
// 計 60 問・120 分の CBT 通年方式で、午前・午後の区分は廃止済。exam-config.ts も
// SG CBT を 科目A(48問) として保持。pre-2023 の「午前 50 問」「科目B として統合」が
// silently regress しないよう現行形式を pin。
describe("blog SG merit post — 現行形式は 科目A・科目B の CBT (午前/午後は廃止)", () => {
  it("sg-shiken-meritto-imi-aru describes the post-2023 科目A・科目B CBT format, not 午前 50 問", () => {
    const post = getBlogPostBySlug("sg-shiken-meritto-imi-aru");
    expect(post).toBeDefined();
    const body = post!.body;
    expect(body).toContain("科目 A（四肢択一）と科目 B（多肢選択の事例問題）の 2 科目");
    expect(body).toContain("計 60 問を 120 分");
    // The abolished pre-2023 framing must be gone from this SG-specific article.
    expect(body).not.toContain("午前 50 問の四択");
    expect(body).not.toContain("科目B として統合");
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
