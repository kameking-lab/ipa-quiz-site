import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { ExamPastQuestionGuide } from "@/components/exam/ExamPastQuestionGuide";
import { ADDITIONAL_PAST_QUESTION_GUIDES, ExamTopGuide } from "@/components/exam/ExamTopGuide";
import { getQuestionsByExamStrict, groupByYearSeason } from "@/lib/seo/exam-meta";
import { getBlogPostBySlug } from "@/data/blog";

describe.each(["sc", "nw", "sa", "ap"] as const)("%s past-question search guide", exam => {
  const questions = getQuestionsByExamStrict(exam);

  it("shows each published year's actual subject counts without treating missing subjects as cancelled exams", () => {
    const html = renderToStaticMarkup(<ExamPastQuestionGuide exam={exam} questions={questions} />);
    const rows = [...html.matchAll(/<tr[^>]*>(.*?)<\/tr>/g)].map(match => match[1]);
    for (const year of groupByYearSeason(questions)) {
      const row = rows.find(row => row.includes(`href="/${exam}/${year.key}"`));
      expect(row).toBeDefined();
      const cells = [...row!.matchAll(/<td[^>]*>(.*?)<\/td>/g)].map(match => match[1]);
      const expected = (exam === "ap" ? ["am"] : ["am1", "am2"]).map(session => {
        const count = questions.filter(q => q.year === year.year && q.season === year.season && q.session === session).length;
        return count ? `${count}問` : "未収録";
      });
      expect(cells).toEqual(expected);
    }
    expect(html).toContain("試験の未実施を意味しません");
    expect(html).toContain("https://www.ipa.go.jp/shiken/2026/ap_koudo_sc-cbt.html");
    expect(html).toContain(exam === "ap" ? "科目A" : "科目A-2");
    expect(html).toContain(exam === "sc" || exam === "ap" ? "科目B</td>" : "科目B-2</td>");
  });

  it("renders published exam-specific guides and the official afternoon workflow", () => {
    const html = renderToStaticMarkup(<ExamTopGuide exam={exam} />);
    for (const guide of ADDITIONAL_PAST_QUESTION_GUIDES[exam]) {
      const post = getBlogPostBySlug(guide.slug);
      expect(post).toBeDefined();
      expect([post!.exam, ...post!.tags.map(tag => tag.toLowerCase())]).toContain(exam);
      expect(html).toContain(`href="/blog/${guide.slug}"`);
    }
    expect(html).toContain("2025r07.html");
    expect(html).toContain("冊子冒頭の選択条件");
    expect(html).toContain("解答例・採点講評");
  });
});

it("explains the cancelled 2020 spring separately on the NW page", () => {
  const html = renderToStaticMarkup(<ExamPastQuestionGuide exam="nw" questions={getQuestionsByExamStrict("nw")} />);
  expect(html).toContain("ネットワークスペシャリスト（ネスペ）");
  expect(html).toContain("令和2年度春期試験を中止");
  expect(html).toContain("https://www.ipa.go.jp/shiken/mondai-kaiotu/2020r02.html");
});

it("connects the four SC afternoon topics to their official statement-of-purpose pages", () => {
  const html = renderToStaticMarkup(<ExamTopGuide exam="sc" />);
  for (const number of [1, 2, 3, 4]) {
    expect(html).toContain(`2025r07a_sc_pm_ans.pdf#page=${number}`);
    expect(html).toContain(`問${number}：`);
  }
  expect(html).toContain("2025r07a_sc_pm_qs.pdf");
  expect(html).toContain("2025r07a_sc_pm_cmnt.pdf");
  expect(html).toContain("全年度の一覧や独自の解答解説ではありません");
});
