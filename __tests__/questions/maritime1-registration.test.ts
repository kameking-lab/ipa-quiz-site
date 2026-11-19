import { describe, expect, it, vi } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { MARITIME1_ALL_QUESTIONS, MARITIME1_QUESTIONS } from "@/data/questions/maritime1";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { gradeNativeB, nativeBQuestionIssue } from "@/lib/questions/native-b";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
vi.mock("server-only", () => ({}));
import { GET } from "@/app/api/search/questions/route";

describe("maritime1 accepted local registration", () => {
  it("retains exact sitting and official answer-cell counts", () => {
    const periods = [[2026, "march"], [2026, "september"], [2025, "september"]] as const;
    expect(MARITIME1_ALL_QUESTIONS).toHaveLength(95 * periods.length);
    expect(MARITIME1_QUESTIONS).toHaveLength(MARITIME1_ALL_QUESTIONS.length);
    expect(new Set(MARITIME1_ALL_QUESTIONS.map((q) => q.id)).size).toBe(MARITIME1_ALL_QUESTIONS.length);
    expect(MARITIME1_QUESTIONS.every((q) => q.needsReview === false)).toBe(true);
    for (const [year, season] of periods) {
      const sitting = MARITIME1_QUESTIONS.filter((q) => q.year === year && q.season === season);
      expect(sitting, `${year}/${season}`).toHaveLength(95);
      for (const [session, count] of [["kiso", 25], ["kogaku-a", 25], ["kogaku-b", 25], ["hoki", 20]] as const) {
        expect(sitting.filter((q) => q.session === session), `${season}/${session}`).toHaveLength(count);
      }
    }
    expect(MARITIME1_QUESTIONS.reduce((n, q) => n + (q.nativeB?.slots.length ?? 1), 0)).toBe(175 * periods.length);
  });

  it("preserves original figures and exact five-slot native B scoring", () => {
    const urls = MARITIME1_QUESTIONS.flatMap((q) => q.imageUrls ?? []);
    expect(urls).toHaveLength(247);
    for (const url of urls) {
      expect(url, url).toMatch(/^\/questions\/maritime1\/202[56]\//);
      expect(existsSync(join(process.cwd(), "public", url.slice(1))), url).toBe(true);
    }
    const native = MARITIME1_QUESTIONS.filter((q) => q.nativeB);
    expect(native).toHaveLength(60);
    for (const q of native) {
      const data = q.nativeB!;
      expect(data.slots).toHaveLength(5);
      expect(nativeBQuestionIssue(q), q.id).toBeNull();
      const answers = Object.fromEntries(data.slots.map((slot) => [slot.label, slot.answer]));
      expect(gradeNativeB(data, answers).correctSlots, q.id).toBe(5);
    }
  });

  it("connects all accepted originals to the local registry and route loader", async () => {
    expect(getQualificationByExamCode("maritime1")?.status).toBe("live");
    expect(QUESTIONS_BY_EXAM.maritime1).toEqual(MARITIME1_QUESTIONS);
    expect(await getQuestionsForExam("maritime1")).toEqual(MARITIME1_ALL_QUESTIONS);
  });

  it("accepts the hoki API session and searches every official original", async () => {
    const response = await GET(new Request("http://local/api/search/questions?exam=maritime1&session=hoki&limit=1"));
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.total).toBe(MARITIME1_QUESTIONS.filter((q) => q.session === "hoki").length);
    expect(body.hits).toHaveLength(1);
  });
});
