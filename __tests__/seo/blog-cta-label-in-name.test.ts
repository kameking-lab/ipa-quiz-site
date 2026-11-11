import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import BlogPostPage from "@/app/blog/[slug]/page";

// WCAG 2.5.3 Label in Name (Level A): 音声操作ユーザーは可視ラベルを発話して
// コントロールを起動する。ブログ記事末尾の「この試験を演習する（N問）→」CTA の
// aria-label が、可視テキストの中核「この試験を演習する」を含まなければ
// 発話しても起動できない。過去に aria-label="{exam}を無料で演習する（N問）" で
// 可視テキストを欠いていた回帰を防ぐ（source-read ガード）。
describe("ブログ CTA — Label in Name (WCAG 2.5.3)", () => {
  it.each([
    ["sc-digital-signature-key-reading", "この試験を演習する"],
    ["khk-hei-kagaku-free-question-selection", "受験区分・科目を選ぶ"],
  ])("%s の CTA の名前が可視ラベルを含む", async (slug, label) => {
    const page = await BlogPostPage({ params: Promise.resolve({ slug }) });
    const doc = new DOMParser().parseFromString(renderToStaticMarkup(page), "text/html");
    const cta = Array.from(doc.querySelectorAll("a[aria-label]")).find(link => link.textContent?.includes(label));
    expect(cta).toBeDefined();
    expect(cta?.getAttribute("aria-label")).toContain(label);
  });
});
