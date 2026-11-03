import { describe, expect, it } from "vitest";
import { generateMetadata, generateStaticParams } from "@/app/[exam]/[yearSeason]/page";
import { getQuestionsByExamStrict } from "@/lib/seo/exam-meta";
import type { ExamCode } from "@/lib/questions/types";

describe("common morning-I year pages", () => {
  it("distinguishes each exam context without claiming specialist questions", async () => {
    const routes = await generateStaticParams();
    const commonRoutes = routes.filter(({ exam, yearSeason }) => {
      const [year, season] = yearSeason.split("-");
      const pool = getQuestionsByExamStrict(exam as ExamCode)
        .filter(q => q.year === Number(year) && q.season === season);
      return pool.length > 0 && pool.every(q => q.session === "am1");
    });
    expect(commonRoutes.length).toBeGreaterThan(30);
    const titles: string[] = [];
    for (const route of commonRoutes) {
      const metadata = await generateMetadata({ params: Promise.resolve(route) });
      const title = String(metadata.title);
      titles.push(title);
      expect(title).toContain("向け 高度試験共通 午前I");
      expect(title).not.toContain("午前II");
      expect(metadata.openGraph?.title).toBe(title);
      expect(metadata.twitter?.title).toBe(title);
      expect(metadata.alternates?.canonical).toBe(`/${route.exam}/${route.yearSeason}`);
      expect(metadata.robots).toBeUndefined();
    }
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("keeps specialist-year identity and existing invalid-route exclusion", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ exam: "sc", yearSeason: "2025-spring" }) });
    expect(String(metadata.title)).toContain("情報処理安全確保支援士");
    expect(String(metadata.title)).not.toContain("向け");
    expect(metadata.alternates?.canonical).toBe("/sc/2025-spring");
    const invalid = await generateMetadata({ params: Promise.resolve({ exam: "sc", yearSeason: "invalid" }) });
    expect(invalid.robots).toEqual({ index: false });
  });
});
