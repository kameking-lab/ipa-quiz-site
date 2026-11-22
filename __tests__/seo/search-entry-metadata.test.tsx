import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { generateMetadata } from "@/app/[exam]/page";
import BlogArticlePage from "@/app/blog/[slug]/page";
import { getAllBlogPosts } from "@/data/blog";
import { JsonLd } from "@/components/seo/JsonLd";
import { getExamQuestionCount } from "@/lib/constants/exam-question-counts";
import { examSearchMetadata } from "@/lib/seo/exam-search-metadata";
import { getAvailableExams, getQuestionsByExamStrict } from "@/lib/seo/exam-meta";
import { getSitemapQuestions } from "@/lib/seo/sitemap-pagination";
import { questionPagePath } from "@/lib/seo/question-url";
import { questionSnippet, questionTitle } from "@/lib/seo/question-meta";

const entries = ["kankoji2", "nw", "sa", "ap", "kikai-hozen", "kai-toku2", "tsushin2", "sc", "st"] as const;

describe("search entry metadata", () => {
  it("keeps every qualification title distinct, including both pneumatic assembly grades", () => {
    const exams = getAvailableExams();
    const metadata = exams.map(exam => examSearchMetadata(exam, getQuestionsByExamStrict(exam).length));
    expect(new Set(metadata.map(entry => entry.title)).size).toBe(exams.length);
    expect(exams.filter((_, i) => metadata[i].description.length < 80 || metadata[i].description.length > 110)).toEqual([]);
    for (const [exam, grade] of [["kuukiatsu-kumitate1", "1級"], ["kuukiatsu-kumitate2", "2級"]] as const) {
      const title = examSearchMetadata(exam, getQuestionsByExamStrict(exam).length).title;
      expect(title).toContain(`空気圧装置組立て技能士 ${grade}`);
      expect(title).not.toContain("シーケンス");
    }
  });

  it.each(entries)("%s advertises its usable count, free explanations and year browsing", async exam => {
    const count = getQuestionsByExamStrict(exam).length;
    const metadata = await generateMetadata({ params: Promise.resolve({ exam }) });
    expect(metadata.openGraph?.title).toContain(`${count.toLocaleString("ja-JP")}問`);
    expect(metadata.openGraph?.title).toContain("解説つき・無料");
    const years = new Set(getQuestionsByExamStrict(exam).map(q => q.year)).size;
    expect(metadata.openGraph?.title).toContain(years + "年分");
    expect(String(metadata.openGraph?.title).length).toBeLessThanOrEqual(43);
    expect(metadata.description).toContain("年度別・分野別");
    expect(metadata.description).toContain("無料");
    expect(metadata.description?.length).toBeGreaterThanOrEqual(80);
    expect(metadata.description?.length).toBeLessThanOrEqual(110);
    expect(metadata.title).toEqual({ absolute: metadata.openGraph?.title + "｜過去問AI" });
    expect(metadata.openGraph?.description).toBe(metadata.description);
    expect(metadata.twitter?.description).toBe(metadata.description);
    expect(metadata.alternates?.canonical).toBe(`/${exam}`);
  });

  it.each(["shika-ishi", "chosashi", "sharoushi"] as const)("preserves the existing partial coverage detail for %s", exam => {
    const count = getQuestionsByExamStrict(exam).length;
    const metadata = examSearchMetadata(exam, count);
    expect(metadata.description).toContain("収録");
    expect(metadata.description.length).toBeLessThanOrEqual(110);
    expect(metadata.title).not.toContain(`全${count.toLocaleString("ja-JP")}問`);
    expect(metadata.description).toContain("無料");
  });

  it.each([["rinsho-kensagishi", 929], ["shinryo-hoshasengishi", 995]] as const)("describes the expanded public corpus for %s", (exam, count) => {
    const questions = getQuestionsByExamStrict(exam);
    expect(questions).toHaveLength(count);
    const yearCount = new Set(questions.map(question => question.year)).size;
    const metadata = examSearchMetadata(exam, count);
    expect(metadata.title).toContain(`${count.toLocaleString("ja-JP")}問`);
    expect(metadata.description).toContain(yearCount + "年分");
    expect(metadata.description).toContain("無料");
  });

  it("keeps distinct indexable question titles and limits description length", () => {
    const titles = new Map<string, string>();
    const collisions: string[] = [];
    const outliers: string[] = [];
    for (const q of getSitemapQuestions()) {
      const path = questionPagePath(q);
      const title = questionTitle(q);
      const description = questionSnippet(q);
      const previous = titles.get(title);
      if (previous && previous !== path) collisions.push(previous + " / " + path);
      titles.set(title, path);
      if (description.length < 80 || description.length > 110 || title.length > 63) {
        outliers.push(path + " (" + title.length + " title, " + description.length + " description)");
      }
    }
    expect(collisions).toEqual([]);
    expect(outliers).toEqual([]);
  });
});

describe("article end practice card", () => {
  it("renders exactly one counted end card for each qualification article and keeps the opening practice link", async () => {
    for (const post of getAllBlogPosts().filter(post => post.exam)) {
      const html = renderToStaticMarkup(await BlogArticlePage({ params: Promise.resolve({ slug: post.slug }) }));
      const document = new DOMParser().parseFromString(html, "text/html");
      const cards = [...document.querySelectorAll("main > section")].filter(section => section.querySelector('a[href="/billing"]'));
      expect(cards, post.slug).toHaveLength(1);
      const cta = cards[0].querySelector("a[aria-label]");
      expect(cta, post.slug).not.toBeNull();
      const body = document.querySelector("#article-body");
      expect(body, post.slug).not.toBeNull();
      expect(body!.compareDocumentPosition(cards[0]) & Node.DOCUMENT_POSITION_FOLLOWING, post.slug).toBeTruthy();
      if (post.practicePlacement === "none") {
        expect(cta?.getAttribute("href"), post.slug).toBe(`/${post.exam}`);
      } else {
        const label = `この資格の過去問を解く（全${getExamQuestionCount(post.exam!).toLocaleString("ja-JP")}問・無料）`;
        expect(cta?.textContent, post.slug).toContain(label);
        expect(cta?.getAttribute("aria-label"), post.slug).toContain(label);
        expect(cta?.getAttribute("href"), post.slug).toBe(`/quiz?mode=random&exam=${post.exam}`);
      }
      const opening = document.querySelector('header a[href="#article-practice"]');
      if (opening && post.practicePlacement === "after-body") expect(opening.textContent).toBe("本文のあとに1問解く");
    }
  }, 120_000);
});

it("serializes script-like question and FAQ text into parseable JSON-LD without ending the script", () => {
  const data = { "@context": "https://schema.org", "@type": "Question", name: '比較 x < 5 </script><script>alert("test")</script>', acceptedAnswer: { "@type": "Answer", text: "解説" } };
  const html = renderToStaticMarkup(<JsonLd data={data} />);
  const document = new DOMParser().parseFromString(html, "text/html");
  expect(document.querySelectorAll("script")).toHaveLength(1);
  expect(JSON.parse(document.querySelector("script")!.textContent!)).toEqual(data);
});
