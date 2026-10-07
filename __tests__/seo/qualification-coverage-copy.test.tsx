import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import QualificationsPage from "@/app/qualifications/page";
import { KanriCoverageNote } from "@/components/exam/KanriCoverageNote";
import { KANRI_QUESTIONS } from "@/data/questions/kanri";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";
import { EXAM_DESCRIPTIONS, getQuestionsByExamStrict } from "@/lib/seo/exam-meta";
import { generateMetadata } from "@/app/[exam]/page";

const playable = KANRI_QUESTIONS.filter(isPracticeReadyQuestion);

describe("learner-facing qualification coverage", () => {
  it("does not advertise table questions excluded from the current exercise", () => {
    const excluded = KANRI_QUESTIONS.filter((question) => !isPracticeReadyQuestion(question));
    expect(excluded.map((question) => question.qNumber)).toEqual([10, 29]);
    expect(playable).toHaveLength(98);
    const doc = new DOMParser().parseFromString(renderToStaticMarkup(<QualificationsPage />), "text/html");
    const card = Array.from(doc.querySelectorAll("article")).find((article) => article.querySelector("h2")?.textContent === "管理業務主任者");
    expect(card?.textContent).toContain("収録 98問");
    expect(card?.textContent).not.toContain("収録 100問");
    expect(card?.textContent).not.toContain("16問");
    expect(card?.querySelector('a[href="/kanri"]')).not.toBeNull();
  });

  it("identifies both official papers, their legal dates and the omitted question numbers", () => {
    const doc = new DOMParser().parseFromString(renderToStaticMarkup(<KanriCoverageNote questions={playable} />), "text/html");
    expect(doc.body.textContent).toContain("計98問");
    expect(doc.body.textContent).toContain("令和6年度：48問／公式50問。法令基準日：2024年4月1日。");
    expect(doc.body.textContent).toContain("この演習に含まれない問題：問10・29。");
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
    expect(doc.body.textContent).toContain("計97問");
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
    expect(pool.filter((q) => q.year === 2024)).toHaveLength(48);
    expect(pool.filter((q) => q.year === 2025)).toHaveLength(50);
    expect(pool).toHaveLength(98);
    const metadata = await generateMetadata({ params: Promise.resolve({ exam: "kanri" }) });
    const description = String(metadata.description);
    expect(description).toContain("2024・2025年度公式問題");
    expect(description).toContain(`${pool.length}問を2回分`);
    expect(description).toContain("年度ごとの掲載範囲と法令基準日");
    expect(description).not.toContain("2025年度公式50問から");
    expect(metadata.openGraph?.description).toBe(description);
    expect(metadata.twitter?.description).toBe(description);
    expect(metadata.title).toBe("管理業務主任者 過去問一覧・AI解説");
    expect(metadata.alternates?.canonical).toBe("/kanri");
    expect(metadata.robots).toBeUndefined();
  });
});

describe("zoen2 hub metadata describes the playable subset of two official papers", () => {
  it("keeps the two sitting scopes, partial counts and social metadata aligned", async () => {
    const pool = getQuestionsByExamStrict("zoen2");
    expect(pool.filter((q) => q.year === 2026 && q.season === "early")).toHaveLength(10);
    expect(pool.filter((q) => q.year === 2025 && q.season === "late")).toHaveLength(27);
    expect(pool).toHaveLength(37);
    expect(new Set(pool.map((q) => q.session))).toEqual(new Set(["gakka"]));
    const metadata = await generateMetadata({ params: Promise.resolve({ exam: "zoen2" }) });
    const description = String(metadata.description);
    expect(description).toContain("令和8年度前期・令和7年度後期の第一次検定");
    expect(description).toContain("37問を2回分");
    expect(description).toContain("各回の公式40問のうち収録済みの設問");
    expect(description).toContain("未収録の設問は演習に含みません");
    expect(description).not.toContain("令和8年度前期第一次検定から37問");
    expect(metadata.openGraph?.description).toBe(description);
    expect(metadata.twitter?.description).toBe(description);
    expect(metadata.title).toBe("2級造園施工管理技士 過去問一覧・AI解説");
    expect(metadata.alternates?.canonical).toBe("/zoen2");
    expect(metadata.robots).toBeUndefined();
  });
});
