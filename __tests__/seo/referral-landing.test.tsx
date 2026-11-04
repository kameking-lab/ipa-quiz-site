import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import Listing from "@/app/e-learning/exams/page";
import Hub from "@/app/e-learning/exams/qualifications/[slug]/page";
import { filterReferralPapers, referralRedirectHref } from "@/lib/analytics/referral-query";
import { EXAM_CATALOG } from "@/lib/exam-library-catalog";
import { examPath } from "@/lib/exam-library-model";

describe("referral landing scope", () => {
  it("preserves UTM content, subject and year through a real legacy-to-hub redirect", async () => {
    const params = { group: "emkohyo", subject: "労働衛生一般", year: "2025", utm_source: "tsugino_shikaku", utm_content: "measurement.hero", callbackUrl: "private" };
    let destination = "";
    try { await Listing({ searchParams: Promise.resolve(params) }); }
    catch (error) { destination = (error as { digest: string }).digest; }
    expect(destination).toContain("NEXT_REDIRECT");
    expect(destination).toContain("/qualifications/sagyo-kankyo-sokuteishi?");
    expect(destination).toContain("utm_content=measurement.hero");
    expect(destination).toContain("year=2025");
    expect(destination).toContain("subject=");
    expect(destination).not.toContain("callbackUrl");
  });
  it("renders only the requested subject/year in a multi-subject hub", async () => {
    const scoped = EXAM_CATALOG.filter(entry => entry.group === "emkohyo" && entry.subject === "労働衛生一般");
    expect(scoped.length).toBeGreaterThan(0);
    const year = scoped[0].date.slice(0, 4);
    const jsx = await Hub({ params: Promise.resolve({ slug: "sagyo-kankyo-sokuteishi" }),
      searchParams: Promise.resolve({ subject: "労働衛生一般", year }) });
    const html = renderToStaticMarkup(jsx);
    const expected = filterReferralPapers(scoped, "労働衛生一般", year);
    expect(expected.length).toBeGreaterThan(0);
    expect(expected.some(entry => html.includes(examPath(entry.id)))).toBe(true);
    const excluded = EXAM_CATALOG.filter(entry => entry.group === "emkohyo" && (entry.subject !== "労働衛生一般" || !entry.date.startsWith(year)));
    expect(excluded.every(entry => !html.includes(`href="${examPath(entry.id)}"`))).toBe(true);
  });
  it("does not widen invalid scope and never preserves arbitrary redirect input", async () => {
    expect(filterReferralPapers([{ subject: "a", date: "2025-01" }], "b")).toEqual([]);
    expect(filterReferralPapers([{ subject: "a", date: "2025-01" }], "a", "invalid")).toEqual([]);
    expect(referralRedirectHref("/hub", { utm_source: ["tsugino", "note"], email: "private" })).toBe("/hub?utm_source=tsugino");
    await expect(Hub({ params: Promise.resolve({ slug: "sagyo-kankyo-sokuteishi" }), searchParams: Promise.resolve({ subject: "unknown" }) })).rejects.toThrow();
  });
});
