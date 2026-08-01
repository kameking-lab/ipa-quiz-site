import { describe, expect, it } from "vitest";

import { getBlogPostBySlug } from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// 「あと一歩」高可視 seed it-shikaku-nendaibetsu-roadmap（年代別ロードマップ）は
// 在職エンジニア向けの取得順序を厚く扱う一方、「リスキリング／学び直し／異業種転職で
// 年代別にどの IPA 資格から始めるか」という高インテント サブクエリが
// コーパス全体でゼロカバレッジだった（リスキリング言及は IP の企業導入文脈のみ・
// 学び直し/セカンドキャリアの専用節は不在）。本記事に焦点節 + FAQ 1問を additive 追加した。
// この content 深掘りが正しく入り、誇大回避（career 記事ゆえ旗艦 /essay へは送らない）と
// 既存内部リンクのみ（新規 404 を作らない）を守っていることを pin する（崩れたら落ちる）。

const SLUG = "it-shikaku-nendaibetsu-roadmap";

describe("年代別ロードマップ記事のリスキリング深掘り節", () => {
  it("リスキリング・学び直しの焦点節が追加されている", () => {
    const post = getBlogPostBySlug(SLUG);
    expect(post, `${SLUG} が存在しない`).toBeDefined();
    expect(post!.body).toContain("リスキリング・学び直し・異業種転職での資格選び");
    // 入口の決め方の核心（年齢でなく現在の IT 知識のベースで選ぶ）
    expect(post!.body).toContain("いま持っている IT 知識のベース");
  });

  it("入口は受験資格不問の事実に紐づけ、既存ページへのみ内部リンクする（新規404を作らない）", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // 受験資格に制限がない事実（既存記事へ）
    expect(body).toContain("/blog/ipa-juken-shikaku-nenrei");
    // 入門区分ハブ
    expect(body).toContain("(/ip)");
    expect(body).toContain("(/fe)");
    // 土台＝科目B ピラー
    expect(body).toContain("/blog/fe-kamoku-b-taisaku");
  });

  it("リスキリング節は career 記事ゆえ旗艦 /essay へは送らない（誇大回避）", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    const section = body
      .split(/(?=^## )/m)
      .find((s) => /^## リスキリング/.test(s));
    expect(section, "リスキリング節が見つからない").toBeDefined();
    expect(section!).not.toContain("/essay");
  });

  it("FAQ にリスキリングの Q&A が追加され FAQPage として抽出できる", () => {
    const post = getBlogPostBySlug(SLUG)!;
    const faqs = extractFaq(post.body);
    // 既存4問 + リスキリング1問 = 5問
    expect(faqs).toHaveLength(5);
    const reskilling = faqs.find((f) => f.question.includes("リスキリング"));
    expect(reskilling, "リスキリングの FAQ が無い").toBeDefined();
    // 抽出後の質問は "Q." マーカや markdown 強調を残さない
    for (const f of faqs) {
      expect(f.question.startsWith("Q")).toBe(false);
      expect(f.question).not.toContain("**");
      expect(f.answer).not.toMatch(/\]\(/);
    }
  });
});
