import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CBT_SOURCE, ExamCbtFaq, ExamCbtSummary } from "@/components/exam/ExamCbtGuide";
import { ExamPastQuestionGuide } from "@/components/exam/ExamPastQuestionGuide";
import { getAvailableExams } from "@/lib/seo/exam-meta";
import { SITE_BASE_URL } from "@/lib/seo/config";

describe.each(["sc", "ap", "nw", "sa"] as const)("%s CBT source and FAQ", exam => {
  it("emits exactly the visible questions and complete answers with a source and update date", () => {
    const html = renderToStaticMarkup(<ExamPastQuestionGuide exam={exam} questions={[]} />);
    const document = new DOMParser().parseFromString(html, "text/html");
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts).toHaveLength(1);
    const schema = JSON.parse(scripts[0].textContent!);
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema["@id"]).toBe(`${SITE_BASE_URL}/${exam}#cbt-faq`);
    expect(schema.citation).toBe(CBT_SOURCE);
    expect(schema.dateModified).toBe("2026-11-10");
    const faqs = document.querySelector("h3")!.parentElement!.querySelectorAll("details");
    expect(faqs).toHaveLength(2);
    schema.mainEntity.forEach((question: { "@type": string; name: string; acceptedAnswer: { "@type": string; text: string } }, index: number) => {
      expect(question["@type"]).toBe("Question");
      expect(question.name).toBe(faqs[index].querySelector("summary")?.textContent);
      expect(question.acceptedAnswer["@type"]).toBe("Answer");
      expect(question.acceptedAnswer.text).toBe(faqs[index].querySelector("p")?.textContent);
    });
    expect(document.querySelector(`a[href="${CBT_SOURCE}"]`)).not.toBeNull();
    expect(document.querySelector('time[datetime="2026-11-10"]')).not.toBeNull();
  });

  it("uses the exam's subject names in the opening answer", () => {
    const html = renderToStaticMarkup(<ExamCbtSummary exam={exam} />);
    expect(html).toContain(CBT_SOURCE);
    expect(html).toContain("知識・技能の範囲");
    expect(html).toContain(exam === "ap" ? "午前は科目A、午後は科目B" : "午前I・午前IIは科目A-1・科目A-2");
    if (exam === "nw" || exam === "sa") expect(html).toContain("科目B-1・科目B-2");
    if (exam === "sc") expect(html).not.toContain("科目B-2");
  });
});

it("keeps this verified guide scoped to the four reviewed pages", () => {
  expect(renderToStaticMarkup(<ExamCbtSummary exam="st" />)).toBe("");
  expect(renderToStaticMarkup(<ExamCbtFaq exam="st" />)).toBe("");
});

it("lists existing public destinations in llms.txt using the canonical host", () => {
  const content = readFileSync(path.join(process.cwd(), "public/llms.txt"), "utf8");
  const urls = [...content.matchAll(/\]\((https:\/\/[^)]+)\)/g)].map(match => new URL(match[1]));
  expect(urls).toHaveLength(16);
  const exams = new Set<string>(getAvailableExams());
  for (const url of urls) {
    expect(url.origin).toBe("https://www.kakomon-ai.jp");
    const route = url.pathname.replace(/^\//, "");
    expect(exams.has(route) || existsSync(path.join(process.cwd(), "app", route, "page.tsx")) || existsSync(path.join(process.cwd(), "app", route, "route.ts"))).toBe(true);
  }
  expect(content).toContain("robots.txt");
});
