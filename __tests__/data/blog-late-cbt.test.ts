import { describe, expect, it } from "vitest";
import { ALL_QUESTIONS } from "@/data/questions";
import { getBlogPostBySlug } from "@/data/blog";
import counts from "@/data/blog/late-cbt-counts.json";
import { aggregateLateCbtQuestions } from "@/data/blog/late-cbt-statistics";
import { LATE_CBT_EXAMS, LATE_CBT_SOURCE } from "@/data/blog/late-cbt";
import { questionPagePath } from "@/lib/seo/question-url";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";

describe("late CBT editorial refresh", () => {
  it("keeps every published count reproducible from the shipped question corpus", () => {
    for (const exam of LATE_CBT_EXAMS) {
      expect(counts[exam], exam).toEqual(aggregateLateCbtQuestions(ALL_QUESTIONS, exam));
      expect(counts[exam].categories.reduce((sum, row) => sum + row.count, 0)).toBe(counts[exam].total);
      expect(counts[exam].papers.reduce((sum, row) => sum + row.count, 0)).toBe(counts[exam].total);
    }
  });

  const slugs = [
    ...LATE_CBT_EXAMS.map(exam => `${exam}-hinnshutsu-ronten-toppu10`),
    "ipa-shiken-cbt-vs-pbt", "ipa-gozen1-menjo-jouken", "ap-gogo-jikan-haibun",
  ];
  it("cites official timing and links all nine updated articles to real practice papers", () => {
    const questionPaths = new Set(ALL_QUESTIONS.filter(isPracticeReadyQuestion).map(questionPagePath));
    for (const slug of slugs) {
      const post = getBlogPostBySlug(slug)!;
      expect(post, slug).toBeDefined();
      expect(post.sourceUrls, slug).toContain(LATE_CBT_SOURCE);
      expect(post.body).toContain(`](${LATE_CBT_SOURCE})`);
      expect(post.editorialDates?.lastEditedAt).toBe("2026-11-10");
      const links = [...post.body.matchAll(/\]\((\/[^)]+)\)/g)].map(m => m[1]);
      expect(links.some(link => /^\/(ap|pm|db|es|au|sc)\/2025-autumn$/.test(link)), slug).toBe(true);
      for (const link of links) {
        if (link.startsWith("/q/")) expect(questionPaths.has(link), `${slug} -> ${link}`).toBe(true);
        const paper = /^\/(ap|pm|db|es|au|sc)\/(\d{4})-(spring|autumn)$/.exec(link);
        if (paper) expect(ALL_QUESTIONS.some(q => q.exam === paper[1] && q.year === Number(paper[2]) && q.season === paper[3] && isPracticeReadyQuestion(q)), link).toBe(true);
      }
    }
  });

  it("distinguishes late-period exemption eligibility and proposed timing from official requirements", () => {
    const exemption = getBlogPostBySlug("ipa-gozen1-menjo-jouken")!.body;
    expect(exemption).toContain("2024年度春期は、この後期の対象一覧には含まれていません");
    expect(exemption).toContain("官報公示日");
    expect(exemption).toContain("APの科目Aだけの成績");
    const ap = getBlogPostBySlug("ap-gogo-jikan-haibun")!.body;
    expect(ap).toContain("公式が指定した配分ではありません");
    expect(ap).toContain("3月3日〜15日");
    expect(ap).toContain("[2025年度秋期のAP旧午前問題一覧](/ap/2025-autumn)は科目A対策");
    expect(ap).toContain("科目B対策には、[IPA公式の2025年度問題・解答一覧](https://www.ipa.go.jp/shiken/mondai-kaiotu/2025r07.html)");
    expect(ap).toContain("「応用情報技術者試験（AP）」→「午後」");
    expect(ap).not.toContain("旧午前・午後を選び");
    expect(getBlogPostBySlug("ap-gogo-jikan-haibun")!.sourceUrls).toContain("https://www.ipa.go.jp/shiken/mondai-kaiotu/2025r07.html");
    for (const exam of LATE_CBT_EXAMS) {
      const body = getBlogPostBySlug(`${exam}-hinnshutsu-ronten-toppu10`)!.body;
      expect(body).toContain("タグ未付与");
      expect(body).toContain("次回の出題確率は示していません");
      expect(body).toContain("収録データには演習対象外の問題も含むため、この集計件数は問題一覧・演習の件数とは異なります");
    }
  });
});
