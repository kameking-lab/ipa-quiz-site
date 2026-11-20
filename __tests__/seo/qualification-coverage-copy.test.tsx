import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import QualificationsPage from "@/app/qualifications/page";
import { KanriCoverageNote } from "@/components/exam/KanriCoverageNote";
import { KANRI_QUESTIONS } from "@/data/questions/kanri";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";
import { EXAM_DESCRIPTIONS, getQuestionsByExamStrict, groupByYearSeason } from "@/lib/seo/exam-meta";
import { generateMetadata } from "@/app/[exam]/page";

const playable = KANRI_QUESTIONS.filter(isPracticeReadyQuestion);

describe("learner-facing qualification coverage", () => {
  it("includes both restored table questions in the current exercise count", () => {
    const excluded = KANRI_QUESTIONS.filter((question) => !isPracticeReadyQuestion(question));
    expect(excluded).toEqual([]);
    expect(playable.filter(q => q.year === 2024 || q.year === 2025)).toHaveLength(100);
    expect(playable.filter((question) => question.year === 2024 && [10, 29].includes(question.qNumber))).toHaveLength(2);
    const doc = new DOMParser().parseFromString(renderToStaticMarkup(<QualificationsPage />), "text/html");
    const card = Array.from(doc.querySelectorAll("article")).find((article) => article.querySelector("h2")?.textContent === "管理業務主任者");
    expect(card?.textContent).toContain(`収録 ${playable.length}問`);
    expect(card?.textContent).not.toContain("収録 98問");
    expect(card?.textContent).not.toContain("16問");
    const source = QUALIFICATION_CATALOG.find(entry => entry.examCode === "kanri")!.officialQuestionsUrl;
    expect(card?.querySelector(`a[href="${source}"]`)).not.toBeNull();
  });

  it("identifies both complete official papers and their legal dates", () => {
    const doc = new DOMParser().parseFromString(renderToStaticMarkup(<KanriCoverageNote questions={playable} />), "text/html");
    expect(doc.body.textContent).toContain("計100問");
    expect(doc.body.textContent).toContain("令和6年度：50問／公式50問。法令基準日：2024年4月1日。");
    expect(doc.body.textContent).not.toContain("この演習に含まれない問題");
    expect(doc.body.textContent).toContain("令和7年度：50問／公式50問。法令基準日：2025年4月1日。");
    expect(Array.from(doc.querySelectorAll("a")).map((link) => link.href)).toEqual([
      "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r06.pdf",
      "https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r07.pdf",
    ]);
    expect(doc.body.textContent).toContain("協会の公式解説ではありません");
  });

  it("updates the annual count and omitted numbers when the playable pool changes", () => {
    const reduced = playable.filter((question) => !(question.year === 2025 && question.qNumber === 1));
    const doc = new DOMParser().parseFromString(renderToStaticMarkup(<KanriCoverageNote questions={reduced} />), "text/html");
    expect(doc.body.textContent).toContain("計99問");
    expect(doc.body.textContent).toContain("令和7年度：49問／公式50問。法令基準日：2025年4月1日。この演習に含まれない問題：問1。");
  });

  it("keeps catalog and hub summaries free of stale availability claims", () => {
    const summaries = [QUALIFICATION_CATALOG.find((entry) => entry.examCode === "kanri")?.reuseSummary, EXAM_DESCRIPTIONS.kanri].join(" ");
    expect(summaries).not.toMatch(/16問|残り34問|各50問、計100問収録/);
  });
});

describe("管理業務主任者 hub metadata matches the playable two-paper coverage", () => {
  it("advertises both official years and the strict published count across social metadata", async () => {
    const pool = getQuestionsByExamStrict("kanri");
    expect(pool.filter((q) => q.year === 2024)).toHaveLength(50);
    expect(pool.filter((q) => q.year === 2025)).toHaveLength(50);
    const metadata = await generateMetadata({ params: Promise.resolve({ exam: "kanri" }) });
    const description = String(metadata.description);
    const years = pool.map(q => q.year);
    expect(description).toContain(`${Math.min(...years)}〜${Math.max(...years)}年度の公式問題`);
    expect(description).toContain(`${pool.length}問を${groupByYearSeason(pool).length}回分`);
    expect(description).toContain("各年度の法令基準日");
    expect(description).not.toContain("2025年度公式50問から");
    expect(metadata.openGraph?.description).toBe(description);
    expect(metadata.twitter?.description).toBe(description);
    expect(metadata.title).toBe(`管理業務主任者 過去問 全${pool.length}問｜無料・解説つき`);
    expect(metadata.alternates?.canonical).toBe("/kanri");
    expect(metadata.robots).toBeUndefined();
  });
});

describe("zoen2 hub metadata describes both complete official papers", () => {
  it("keeps the two sitting scopes, complete counts and social metadata aligned", async () => {
    const pool = getQuestionsByExamStrict("zoen2");
    expect(pool.filter((q) => q.year === 2026 && q.season === "early")).toHaveLength(40);
    expect(pool.filter((q) => q.year === 2025 && q.season === "late")).toHaveLength(40);
    expect(pool.filter(q => q.year === 2026 && q.season === "late")).toHaveLength(40);
    expect(new Set(pool.map((q) => q.session))).toEqual(new Set(["gakka"]));
    const metadata = await generateMetadata({ params: Promise.resolve({ exam: "zoen2" }) });
    const description = String(metadata.description);
    expect(description).toContain("令和8年度前期・後期と令和7年度後期の第一次検定");
    expect(description).toContain(`${pool.length}問・${groupByYearSeason(pool).length}回分`);
    expect(description).toContain("各回の公式全40問");
    expect(description).not.toContain("未収録の設問");
    expect(description).not.toContain("令和8年度前期第一次検定から37問");
    expect(metadata.openGraph?.description).toBe(description);
    expect(metadata.twitter?.description).toBe(description);
    expect(metadata.title).toBe(`2級造園施工管理技士 過去問 全${pool.length}問｜無料・解説つき`);
    expect(metadata.alternates?.canonical).toBe("/zoen2");
    expect(metadata.robots).toBeUndefined();
  });
});
