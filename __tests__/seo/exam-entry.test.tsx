import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { ExamTopBrowse } from "@/components/exam/ExamTopBrowse";
import { FirstPracticeEntry } from "@/components/exam/FirstPracticeEntry";
import { ExamTopGuide } from "@/components/exam/ExamTopGuide";
import { EXAM_ENTRIES, type ExamEntryCode } from "@/lib/seo/exam-entry";
import { examMetaDescription, examTopDescription, getQuestionsByExamStrict, groupByCategory, groupByYearSeason } from "@/lib/seo/exam-meta";
import { getBlogPostBySlug } from "@/data/blog";

describe.each(Object.keys(EXAM_ENTRIES) as ExamEntryCode[])("%s search landing", exam => {
  const questions = getQuestionsByExamStrict(exam);
  const years = groupByYearSeason(questions);
  const categories = groupByCategory(questions);

  it("only advertises the morning questions actually included in the count", () => {
    expect(questions.length).toBeGreaterThan(0);
    expect(questions.every(q => ["am", "am1", "am2"].includes(q.session))).toBe(true);
    const description = examMetaDescription(exam, questions.length);
    expect(description).toContain(questions.length.toLocaleString("ja-JP"));
    expect(description).toContain("午前");
    expect(description).not.toContain("未対応");
    expect(description).toContain("AIに質問");
    expect(examTopDescription(exam, questions.length)).toBe(description);
  });

  it("renders every existing year and category link without client JavaScript", () => {
    const html = renderToStaticMarkup(<ExamTopBrowse exam={exam} years={years} categories={categories} />);
    for (const year of years) expect(html).toContain(`href="/${exam}/${year.key}"`);
    for (const item of categories) expect(html).toContain(`href="/${exam}/topic/${encodeURIComponent(item.category)}"`);
    expect(html).toContain('id="years"');
    expect(html).toContain('id="topics"');
    expect(html).toContain(`/mock-exam?exam=${exam}`);
    expect(html).toContain(`mode=review&amp;exam=${exam}&amp;scope=exam`);
    expect(years.reduce((sum, item) => sum + item.count, 0)).toBe(questions.length);
    expect(categories.reduce((sum, item) => sum + item.count, 0)).toBe(questions.length);
  });

  it("links a published guide for the correct exam", () => {
    const post = getBlogPostBySlug(EXAM_ENTRIES[exam].guide);
    expect(post).toBeDefined();
    expect([post!.exam, ...post!.tags.map(tag => tag.toLowerCase())]).toContain(exam);
  });

  it("names current subjects at the existing practice and guide links", () => {
    const html = renderToStaticMarkup(<><FirstPracticeEntry exam={exam} /><ExamTopGuide exam={exam} /></>);
    expect(html).toContain(exam === "ap" ? "科目A・旧午前" : "科目A-2・旧午前II");
    expect(html).toContain(exam === "ap" || exam === "sc" ? "科目B対策" : "科目B-1・科目B-2対策");
    expect(html).toContain(`href="/quiz?mode=random&amp;exam=${exam}${exam === "ap" ? "" : "&amp;session=am2"}"`);
    expect(html).toContain(`href="/blog/${EXAM_ENTRIES[exam].guide}"`);
  });
});
