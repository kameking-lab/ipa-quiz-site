import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { getAllQuestions, getQuestionById, getQuestionsByExam } from "@/lib/questions/load";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { getHomeDirectory } from "@/lib/home/home-directory";
import { examMetaDescription } from "@/lib/seo/exam-meta";
import { PRACTICE_SESSIONS, practiceSessionLabel } from "@/lib/questions/practice-session";
import { questionSourceEdition } from "@/lib/questions/source-label";

type AuditRow = { id: string; status: "COMPLETE" | "OFFICIAL_EXCLUDED" };
const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const audit = JSON.parse(readFileSync(path.join(repo, "data/questions/shika-ishi/official-audit.json"), "utf8")) as { records: AuditRow[] };
const expectedIds = audit.records.filter((r) => r.status === "COMPLETE").map((r) => r.id).sort();
const excludedIds = audit.records.filter((r) => r.status === "OFFICIAL_EXCLUDED").map((r) => r.id);

describe("dentist integration against the published registry", () => {
  it("connects every scored ID through eager and lazy loaders without duplicates", async () => {
    const lazy = await getQuestionsForExam("shika-ishi");
    const eager = getQuestionsByExam("shika-ishi");
    expect(getRegisteredExamCodes()).toContain("shika-ishi");
    expect(expectedIds).toHaveLength(696);
    expect(lazy.map((q) => q.id).sort()).toEqual(expectedIds);
    expect(eager.map((q) => q.id).sort()).toEqual(expectedIds);
    const ids = new Set(expectedIds);
    expect(getAllQuestions().filter((q) => ids.has(q.id))).toHaveLength(696);
    for (const year of [2025, 2026]) {
      for (const paper of ["a", "b", "c", "d"]) {
        const q = lazy.find((r) => r.year === year && r.session === `mondai-${paper}`)!;
        expect(getQuestionById(q.id)?.id).toBe(q.id);
        expect(questionSourceEdition(q)).toBe(`第${year - 1907}回（${year}年実施）`);
      }
    }
  });

  it("passes the real practice acceptance predicate and leaves official exclusions unregistered", async () => {
    const loaded = await getQuestionsForExam("shika-ishi");
    expect(loaded.filter((q) => q.needsReview).map((q) => q.id)).toEqual([]);
    expect(loaded.filter((q) => !isPracticeReadyQuestion(q)).map((q) => q.id)).toEqual([]);
    expect(excludedIds).toHaveLength(24);
    for (const id of excludedIds) expect(getQuestionById(id), id).toBeUndefined();
  });

  it("advertises the same complete count and retains both dentist and main's new paper sessions", async () => {
    const count = (await getQuestionsForExam("shika-ishi")).length;
    const card = getHomeDirectory().flatMap((d) => [...d.featured, ...d.compact]).find((c) => c.key === "shika-ishi");
    expect(card?.questionCount).toBe(count);
    expect(card?.href).toBe("/shika-ishi");
    const description = examMetaDescription("shika-ishi", count);
    expect(description).toContain("696問");
    expect(description).toContain("採点除外24問");
    expect(description).not.toMatch(/整備中|掲載範囲は確認/);
    expect(PRACTICE_SESSIONS).toEqual(expect.arrayContaining(["mondai-a", "mondai-b", "mondai-c", "mondai-d", "keizai", "zaimu", "kigyo", "unei", "keiei-houmu", "keiei-joho", "chusho-seisaku"]));
    expect(practiceSessionLabel("mondai-c")).toBe("問題C");
    expect(practiceSessionLabel("chusho-seisaku")).toBe("中小企業経営・中小企業政策");
  });
});
