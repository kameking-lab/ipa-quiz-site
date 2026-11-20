import { describe, expect, it } from "vitest";
import { generateMetadata } from "@/app/[exam]/page";
import { DENKEN1_NATIVE_QUESTIONS, DENKEN1_PUBLISHED_ORIGINAL_COUNT } from "@/lib/denken1/native";
import {
  EXAM_DESCRIPTIONS,
  examMetaDescription,
  getQuestionsByExamStrict,
  groupByYearSeason,
} from "@/lib/seo/exam-meta";

describe("electrical exam metadata matches the published papers", () => {
  it("counts distinct Denken1 originals across native papers and legacy quiz blanks", () => {
    const legacy = getQuestionsByExamStrict("denken1");
    const primary = legacy.filter(q => q.year === 2026 && q.season === "primary");
    expect(primary).toHaveLength(25);
    const subjectBySession: Record<string, string> = {
      riron: "theory", denryoku: "power", kikai: "machine", houki: "law",
    };
    const sourceIdentity = (q: typeof legacy[number]) => `${q.year}/${q.season}/${subjectBySession[q.session] ?? q.session}/${q.qNumber}`;
    const legacyOriginals = new Set(legacy.map(sourceIdentity));
    const nativeOriginals = new Set(DENKEN1_NATIVE_QUESTIONS.map((q) => `${q.year}/primary/${q.subject}/${q.number}`));
    const nativeSlots = DENKEN1_NATIVE_QUESTIONS.reduce((count, q) => count + q.slots.length, 0);
    const overlap = [...legacyOriginals].filter((id) => nativeOriginals.has(id));
    const union = new Set([...legacyOriginals, ...nativeOriginals]);
    expect(new Set(primary.map(sourceIdentity)).size).toBe(5);
    expect(new Set(primary.map(sourceIdentity).filter(id => nativeOriginals.has(id))).size).toBe(2);
    expect(overlap.length).toBeGreaterThanOrEqual(2);
    expect(union.size).toBe(DENKEN1_PUBLISHED_ORIGINAL_COUNT);
    expect(new Set(DENKEN1_NATIVE_QUESTIONS.map((q) => q.year))).toEqual(new Set([2021, 2022, 2023, 2024, 2025, 2026]));

    const description = examMetaDescription("denken1", legacy.length);
    expect(description).toContain(`${nativeOriginals.size}原問・${nativeSlots}回答欄`);
    expect(description).toContain(`${union.size}件`);
    expect(EXAM_DESCRIPTIONS.denken1).toContain(`${nativeOriginals.size}原問・${nativeSlots}回答欄`);
    expect(EXAM_DESCRIPTIONS.denken1).toContain(`${union.size}件`);
  });

  it("retains both Denko1 launch papers and reports the complete public scope in social metadata", async () => {
    const pool = getQuestionsByExamStrict("denko1");
    const academicPapers = new Map<string, number>();
    for (const q of pool.filter((question) => question.session !== "practical")) {
      const key = `${q.year}/${q.season}`;
      academicPapers.set(key, (academicPapers.get(key) ?? 0) + 1);
    }
    expect(academicPapers.get("2026/first")).toBe(50);
    expect(academicPapers.get("2025/second")).toBe(50);

    const metadata = await generateMetadata({ params: Promise.resolve({ exam: "denko1" }) });
    const description = String(metadata.description);
    const years = pool.map(q => q.year);
    expect(description).toContain(`${Math.min(...years)}〜${Math.max(...years)}年度`);
    expect(description).toContain(`${pool.length.toLocaleString("ja-JP")}問収録`);
    const coverage = examMetaDescription("denko1", pool.length);
    expect(coverage).toContain(`${pool.length.toLocaleString("ja-JP")}問・${groupByYearSeason(pool).length}期分`);
    expect(coverage).toContain("高圧受電設備の配線図");
    expect(metadata.openGraph?.description).toBe(description);
    expect(metadata.twitter?.description).toBe(description);
    expect(metadata.alternates?.canonical).toBe("/denko1");
    expect(metadata.robots).toBeUndefined();
  });
});
