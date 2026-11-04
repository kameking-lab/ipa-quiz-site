import { describe, expect, it } from "vitest";
import { getAllBlogPosts } from "@/data/blog";
import { BLOG_PRACTICE_MAP, getBlogPractice } from "@/lib/blog/practice";
import { filterQuestions } from "@/lib/questions/filter";
import { ALL_QUESTIONS } from "@/data/questions";

describe("article practice selections", () => {
  it("covers every published article with a valid single-choice question and a usable same-field continuation", () => {
    const posts = getAllBlogPosts();
    expect(Object.keys(BLOG_PRACTICE_MAP).sort()).toEqual(posts.map(post => post.slug).sort());
    for (const post of posts) {
      const practice = getBlogPractice(post.slug);
      expect(practice, post.slug).not.toBeNull();
      if (!practice) continue;
      const { question, reason, continueHref } = practice;
      if (post.exam) expect(question.exam, post.slug).toBe(post.exam);
      expect(reason).not.toMatch(/\?{2}|undefined/);
      expect(question.choices?.[question.answer as "ア"]).toBeTruthy();
      const url = new URL(continueHref, "https://local.test");
      expect(url.searchParams.get("exam")).toBe(question.exam);
      expect(url.searchParams.get("session")).toBe(question.session);
      const pool = filterQuestions(ALL_QUESTIONS, { mode: "topic", exam: question.exam, session: question.session, category: question.category });
      expect(pool.some(item => item.id !== question.id), post.slug).toBe(true);
    }
  });
  it("matches the search landing articles deliberately", () => {
    expect(getBlogPractice("nw-gogo-jikan-haibun")?.question.question).toContain("サブネット");
    expect(getBlogPractice("koudo-gozen1-taisaku")?.question.session).toBe("am1");
    expect(getBlogPractice("ipa-shiken-fukusuu-kubun-juken")?.question.session).toBe("am1");
    expect(getBlogPractice("it-shikaku-rirekisho-kakikata")?.reason).toContain("資格の学習を体験");
    expect(getBlogPractice("fe-kamoku-b-renketsu-list")?.question.question).toContain("連結リスト");
    expect(getBlogPractice("fe-kamoku-b-renketsu-list")?.question.id).toBe("fe-2009h-am-q6");
    expect(getBlogPractice("fe-kamoku-b-renketsu-list")?.question.answer).toBe("エ");
    expect(getBlogPractice("fe-kamoku-b-trace-renshu")?.question.question).toContain("maximum");
    expect(getBlogPractice("fe-kamoku-b-trace-renshu")?.question.session).toBe("kamoku-b");
    expect(getBlogPractice("sm-itil-storytelling")?.question.question).toContain("インシデント管理");
    expect(getBlogPractice("missing-article")).toBeNull();
  });
});
