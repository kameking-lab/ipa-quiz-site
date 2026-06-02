import { describe, expect, it } from "vitest";

import {
  getAllBlogSummaries,
  getBlogPostBySlug,
} from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// 「午後 記述 書き方 / 答え方 / 部分点」「記述式 解答 減点」は高インテント・競合薄
// （道場は午後記述を採点しない）だが、論述（論文）の書き方記事はあっても、記述式
// （AP午後・NW/DB/SC/ES）の答案の書き方＝部分点の取り方を扱う専用ページが不在で、
// 既存記事では時間配分記事内の一行アドバイスに散在するだけだった。新記事
// gogo-kijutsu-buhanten を追加した。この記事が
// (1) 午後対策/記述式/部分点の記事として登録され、
// (2) 核心（本文に根拠がある減点方式・部分点の書き方・字数の目安・減点の典型）を述べ、
// (3) 記述式区分のハブ + AIコパイロットへ funnel し（旗艦 /essay には送らず誇大回避。
//     /essay は論文5区分の採点で、記述式とは別。論述区分は別記事へ scope 分離）、
// (4) 既存の午後時間配分記事（AP/NW/DB）から inbound を受け orphan 化せず、
// (5) FAQPage 化でき blog サイトマップに掲載される、ことを pin する。

const SLUG = "gogo-kijutsu-buhanten";
const INBOUND_PARENTS = [
  "ap-gogo-jikan-haibun",
  "nw-gogo-jikan-haibun",
  "db-gogo-jikan-haibun",
];

describe("午後 記述式 部分点記事の事実性と funnel", () => {
  it("記事が存在し 午後対策/記述式/部分点の記事として登録されている", () => {
    const post = getBlogPostBySlug(SLUG);
    expect(post, `${SLUG} が存在しない`).toBeDefined();
    expect(post!.tags).toContain("記述式");
    expect(post!.tags).toContain("部分点");
  });

  it("核心（本文に根拠がある減点方式・部分点の書き方・字数の目安・減点の典型）を述べている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // 本文に根拠がある減点方式
    expect(body).toContain("本文に根拠がある");
    // 部分点の書き方
    expect(body).toContain("部分点");
    expect(body).toContain("空欄を作らない");
    expect(body).toContain("本文の表現を流用");
    // 字数の目安
    expect(body).toContain("8割");
    // 減点の典型
    expect(body).toContain("減点される");
  });

  it("記述式区分のハブへ funnel し、旗艦 /essay には送らない（記述式≠論文・誇大回避）", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // 記述式区分のハブへ送客
    for (const hub of ["](/ap", "](/nw", "](/db", "](/sc", "](/es"]) {
      expect(body, `${hub} へのリンクが無い`).toContain(hub);
    }
    // /essay（論文5区分の採点）には送らない＝記述式を論文採点へ誤誘導しない
    expect(
      body.includes("](/essay"),
      "記述式記事から旗艦 /essay へ送客している（記述式≠論文・誇大）",
    ).toBe(false);
  });

  it("既存の午後時間配分記事（AP/NW/DB）から inbound リンクがあり orphan 化しない", () => {
    for (const parentSlug of INBOUND_PARENTS) {
      const parent = getBlogPostBySlug(parentSlug);
      expect(parent, `${parentSlug} が存在しない`).toBeDefined();
      expect(
        parent!.body.includes(`/blog/${SLUG}`),
        `${parentSlug} から ${SLUG} への inbound リンクが無い`,
      ).toBe(true);
    }
  });

  it("FAQPage 化できる Q&A を持ち、blog サイトマップに掲載される", () => {
    const post = getBlogPostBySlug(SLUG)!;
    const faqs = extractFaq(post.body);
    expect(faqs.length).toBeGreaterThanOrEqual(4);
    for (const f of faqs) {
      expect(f.question).not.toContain("**");
      expect(f.answer).not.toMatch(/\]\(/);
    }
    const inSummaries = getAllBlogSummaries().some((p) => p.slug === SLUG);
    expect(inSummaries, "新記事が blog サマリ／サイトマップに無い").toBe(true);
  });
});
