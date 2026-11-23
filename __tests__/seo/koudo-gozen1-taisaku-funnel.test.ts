import { describe, expect, it } from "vitest";

import {
  getAllBlogSummaries,
  getBlogPostBySlug,
} from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// 「高度試験 午前I 対策 / 午前I 勉強法 / 午前I 範囲 / 午前I 落ちる」は高インテント・競合薄
// （道場系は高度試験を午前IIしか持たず、午前Iは区分ごとに分断）だが、コーパスには
// 午前I「免除」記事（ipa-gozen1-menjo-jouken）と合格基準記事（koudo-goukaku-ten-ashikiri）は
// あっても、免除がない人がどう午前Iを突破するかという「対策」の専用ページが不在だった。
// 新記事 koudo-gozen1-taisaku を追加した。この記事が
// (1) 高度試験/午前I/勉強法 の cross-区分記事として登録され、
// (2) 公式の核心事実（30問・50分・四択・基準点60点・出題範囲=応用情報の午前と同範囲）を正しく述べ、
// (3) 午前対策の土台=応用情報午前(/ap)・免除判断(menjo)・足切り(ashikiri)へ funnel し、
//     その先の午後は論述区分のみ旗艦/essayへ「参考評価」明記で送客（誇大回避）、
// (4) 既存の関連記事から inbound を受け orphan 化せず、
// (5) FAQPage 化でき blog サイトマップに掲載される、ことを pin する。

const SLUG = "koudo-gozen1-taisaku";
const INBOUND_PARENTS = ["ipa-gozen1-menjo-jouken", "koudo-goukaku-ten-ashikiri"];

describe("高度試験 午前I対策 記事の事実性と funnel", () => {
  it("記事が存在し 高度試験/午前I/勉強法 の cross-区分記事として登録されている", () => {
    const post = getBlogPostBySlug(SLUG);
    expect(post, `${SLUG} が存在しない`).toBeDefined();
    expect(post!.tags).toContain("高度試験");
    expect(post!.tags).toContain("午前I");
    // cross-区分（単一区分でない）ため exam / booksExam は未設定（索引送客）
    expect(post!.exam).toBeUndefined();
    expect(post!.booksExam).toBeUndefined();
  });

  it("科目A-1の形式と共通知識の位置付けを公式案内につないでいる", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("30問・50分");
    expect(body).toContain("共通知識");
    expect(body).toContain("記述式の科目と論述式の科目では評価方法が異なります");
    expect(getBlogPostBySlug(SLUG)!.sourceUrls).toContain("https://www.ipa.go.jp/shiken/kubun/nw.html");
  });

  it("共通問題の初回演習と履歴に基づく復習、免除判断・基準を区別する", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // 出題範囲が同じ応用情報の午前過去問へ
    expect(body).toContain("](/quiz?mode=random&exam=sc&session=am1)");
    expect(body).toContain("](/quiz?mode=review&exam=sc&session=am1)");
    expect(body).toContain("最初の一周は上の通常演習から始めます");
    // 免除という選択肢の判断記事
    expect(body).toContain("/blog/ipa-gozen1-menjo-jouken");
    // 足切り/合格基準の仕組み記事
    expect(body).toContain("/blog/koudo-goukaku-ten-ashikiri");
  });

  it("共通問題の後は受験区分の専門科目へつなぎ、論述採点を一律に案内しない", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // forward funnel として /essay を含むが
    expect(body).not.toContain("](/essay");
    for (const exam of ["nw", "db", "pm", "sa", "sc"]) expect(body).toContain(`](/${exam})`);
    expect(body).toContain("公式過去問の解答形式を確認");
  });

  it("既存の関連記事から inbound リンクがあり orphan 化しない", () => {
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
    expect(faqs.length).toBeGreaterThanOrEqual(2);
    for (const f of faqs) {
      expect(f.question).not.toContain("**");
      // FAQ 回答には markdown リンクを含めない（JSON-LD leak 回避）
      expect(f.answer).not.toMatch(/\]\(/);
    }
    const inSummaries = getAllBlogSummaries().some((p) => p.slug === SLUG);
    expect(inSummaries, "新記事が blog サマリ／サイトマップに無い").toBe(true);
  });
});
