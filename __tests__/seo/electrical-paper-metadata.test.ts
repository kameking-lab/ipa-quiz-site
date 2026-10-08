import { describe, expect, it } from "vitest";
import { generateMetadata } from "@/app/[exam]/page";
import {
  EXAM_DESCRIPTIONS,
  examMetaDescription,
  getQuestionsByExamStrict,
} from "@/lib/seo/exam-meta";

describe("electrical exam metadata matches the published papers", () => {
  it("counts original Denken1 questions separately from their five blanks", () => {
    const pool = getQuestionsByExamStrict("denken1");
    expect(new Set(pool.map((q) => `${q.year}/${q.season}`))).toEqual(new Set(["2026/primary"]));
    const originals = (session: string) => new Set(
      pool.filter((q) => q.session === session).map((q) => q.qNumber),
    ).size;
    expect([originals("riron"), originals("denryoku"), originals("kikai"), originals("houki")]).toEqual([2, 1, 1, 1]);
    expect(pool).toHaveLength(25);

    const description = examMetaDescription("denken1", pool.length);
    expect(description).toContain(`理論${originals("riron")}原問`);
    expect(description).toContain(`電力・機械・法規の各${originals("denryoku")}原問`);
    expect(description).toContain(`計${pool.length}空欄`);
    expect(description).toContain("他の原問、過年度、二次試験は未収録");
    expect(EXAM_DESCRIPTIONS.denken1).toContain(`理論${originals("riron")}原問`);
  });

  it("identifies both Denko1 papers across search and social metadata", async () => {
    const pool = getQuestionsByExamStrict("denko1");
    const papers = new Map<string, number>();
    for (const q of pool) {
      const key = `${q.year}/${q.season}`;
      papers.set(key, (papers.get(key) ?? 0) + 1);
    }
    expect(papers).toEqual(new Map([["2026/first", 50], ["2025/second", 50]]));
    expect(pool).toHaveLength(100);

    const metadata = await generateMetadata({ params: Promise.resolve({ exam: "denko1" }) });
    const description = String(metadata.description);
    expect(description).toContain("令和7年度下期の学科試験問題と令和8年度上期(CBT)公表出題例");
    expect(description).toContain(`計${pool.length}問・${papers.size}期分`);
    expect(description).toContain("高圧受電設備の配線図");
    expect(metadata.openGraph?.description).toBe(description);
    expect(metadata.twitter?.description).toBe(description);
    expect(metadata.alternates?.canonical).toBe("/denko1");
    expect(metadata.robots).toBeUndefined();
  });
});
