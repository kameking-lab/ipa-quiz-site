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
  it("retains exact two-sitting original and official answer-cell counts", () => {
    expect(MARITIME1_ALL_QUESTIONS).toHaveLength(190);
    expect(MARITIME1_QUESTIONS).toHaveLength(190);
    expect(new Set(MARITIME1_ALL_QUESTIONS.map((q) => q.id)).size).toBe(190);
    expect(MARITIME1_QUESTIONS.every((q) => q.needsReview === false)).toBe(true);
    for (const season of ["march", "september"]) {
      const sitting = MARITIME1_QUESTIONS.filter((q) => q.season === season);
      expect(sitting, season).toHaveLength(95);
      for (const [session, count] of [["kiso", 25], ["kogaku-a", 25], ["kogaku-b", 25], ["hoki", 20]] as const) {
        expect(sitting.filter((q) => q.session === session), `${season}/${session}`).toHaveLength(count);
      }
    }
    expect(MARITIME1_QUESTIONS.reduce((n, q) => n + (q.nativeB?.slots.length ?? 1), 0)).toBe(350);
  });

  it("preserves original figures and exact five-slot native B scoring", () => {
    const urls = MARITIME1_QUESTIONS.flatMap((q) => q.imageUrls ?? []);
    expect(urls).toHaveLength(209);
    for (const url of urls) {
      expect(url.startsWith("/questions/maritime1/2026/"), url).toBe(true);
      expect(existsSync(join(process.cwd(), "public", url.slice(1))), url).toBe(true);
    }
    const native = MARITIME1_QUESTIONS.filter((q) => q.nativeB);
    expect(native).toHaveLength(40);
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
    expect(QUESTIONS_BY_EXAM.maritime1).toHaveLength(190);
    expect(await getQuestionsForExam("maritime1")).toHaveLength(190);
  });

  it("accepts the hoki API session and searches exactly its 40 official originals", async () => {
    const response = await GET(new Request("http://local/api/search/questions?exam=maritime1&session=hoki&limit=1"));
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.total).toBe(40);
    expect(body.hits).toHaveLength(1);
  });
});
