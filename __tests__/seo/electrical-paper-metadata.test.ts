import { describe, expect, it } from "vitest";
import { generateMetadata } from "@/app/[exam]/page";
import { DENKEN1_NATIVE_QUESTIONS, DENKEN1_PUBLISHED_ORIGINAL_COUNT } from "@/lib/denken1/native";
import {
  EXAM_DESCRIPTIONS,
  examMetaDescription,
  getQuestionsByExamStrict,
} from "@/lib/seo/exam-meta";

describe("electrical exam metadata matches the published papers", () => {
  it("counts distinct Denken1 originals across native papers and legacy quiz blanks", () => {
    const legacy = getQuestionsByExamStrict("denken1");
    expect(new Set(legacy.map((q) => `${q.year}/${q.season}`))).toEqual(new Set(["2026/primary"]));
    expect(legacy).toHaveLength(25);
    const subjectBySession: Record<string, string> = {
      riron: "theory", denryoku: "power", kikai: "machine", houki: "law",
    };
    const legacyOriginals = new Set(legacy.map((q) => `${q.year}/${subjectBySession[q.session]}/${q.qNumber}`));
    const nativeOriginals = new Set(DENKEN1_NATIVE_QUESTIONS.map((q) => `${q.year}/${q.subject}/${q.number}`));
    const nativeSlots = DENKEN1_NATIVE_QUESTIONS.reduce((count, q) => count + q.slots.length, 0);
    const overlap = [...legacyOriginals].filter((id) => nativeOriginals.has(id));
    const union = new Set([...legacyOriginals, ...nativeOriginals]);
    expect(legacyOriginals.size).toBe(5);
    expect(nativeOriginals.size).toBe(36);
    expect(nativeSlots).toBe(204);
    expect(overlap).toHaveLength(2);
    expect(union.size).toBe(DENKEN1_PUBLISHED_ORIGINAL_COUNT);
    expect(union.size).toBe(39);
    expect(new Set(DENKEN1_NATIVE_QUESTIONS.map((q) => q.year))).toEqual(new Set([2025, 2026]));

    const description = examMetaDescription("denken1", legacy.length);
    expect(description).toContain(`従来${legacyOriginals.size}原問・${legacy.length}空欄`);
    expect(description).toContain(`${nativeOriginals.size}原問・${nativeSlots}回答欄`);
    expect(description).toContain(`${union.size}件`);
    expect(EXAM_DESCRIPTIONS.denken1).toContain(`${nativeOriginals.size}原問・${nativeSlots}回答欄`);
    expect(EXAM_DESCRIPTIONS.denken1).toContain(`${union.size}件`);
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
