import { describe, expect, it } from "vitest";

import { ALL_QUESTIONS } from "@/data/questions";
import {
  examTopicPageExists,
  getAvailableExams,
  getQuestionsByExamStrict,
  groupByCategory,
} from "@/lib/seo/exam-meta";

/**
 * no-404: 問題詳細ページ (/q/[exam]/[yearSeason]/[section]/[qnum]) は、
 * needsReview 以外のすべての問題（解説プレースホルダの noindex 問題を含む）を
 * レンダリングする。分野見出しは examTopicPageExists が true のときだけ
 * `/${q.exam}/topic/${q.category}` へリンクする。
 *
 * リンク先 /[exam]/topic/[topicSlug] は dynamicParams=false で、空の strict
 * プールでは notFound() する。過去にプレースホルダ問題にしか存在しない分野
 * （例: ap-2013a-am-q75 の「品質管理」）への分野リンクが 404 を出していた。
 * examTopicPageExists を単一の判定源として、/q の分野リンクが必ず実在する
 * topic ページを指す（=死リンクゼロ）ことを保証する。
 */
describe("examTopicPageExists gates /q topic links to resolvable pages", () => {
  it("returns false for a category that lives only in a placeholder question", () => {
    // ap-2013a-am-q75「品質管理」は AP 唯一の同分野問題でプレースホルダ解説
    // （`正解はアです。…`）のため strict プールから除外され、topic ページが
    // 実在しない。ここが false でないと /q から 404 リンクが復活する。
    expect(examTopicPageExists("ap", "品質管理")).toBe(false);
  });

  it("returns true for a category backed by at least one non-placeholder question", () => {
    // 任意の strict プール内の分野は topic ページが実在する。
    const exam = getAvailableExams()[0];
    const cat = groupByCategory(getQuestionsByExamStrict(exam))[0]?.category;
    expect(cat).toBeTruthy();
    expect(examTopicPageExists(exam, cat!)).toBe(true);
  });

  it("examTopicPageExists agrees with the topic route's static params for every (exam, category)", () => {
    // 詳細ページの分野リンク判定 (examTopicPageExists) と、topic ルートの
    // generateStaticParams が拾う (exam, category) 集合が一致することを確認。
    // getAvailableExams / groupByCategory が将来食い違うと死リンク or 取りこぼし
    // が生じるため、両者の整合をピンする。
    const staticPairs = new Set<string>();
    for (const exam of getAvailableExams()) {
      for (const c of groupByCategory(getQuestionsByExamStrict(exam))) {
        staticPairs.add(`${exam}::${c.category}`);
      }
    }

    const mismatch: string[] = [];
    for (const q of ALL_QUESTIONS) {
      const pageLinks = examTopicPageExists(q.exam, q.category);
      const hasStatic = staticPairs.has(`${q.exam}::${q.category}`);
      if (pageLinks !== hasStatic) {
        mismatch.push(`${q.exam}::${q.category} link=${pageLinks} static=${hasStatic}`);
      }
    }
    expect(mismatch).toEqual([]);
  });

  it("at least one rendered question is gated to plain text (the branch is real)", () => {
    // 「分野が見つからずプレーンテキスト化」する分岐が実データで発火している
    // ことを保証（=回帰固定の対象が消えていない）。
    const gated = ALL_QUESTIONS.filter(
      (q) => !q.needsReview && !examTopicPageExists(q.exam, q.category),
    );
    expect(gated.length).toBeGreaterThan(0);
  });
});
