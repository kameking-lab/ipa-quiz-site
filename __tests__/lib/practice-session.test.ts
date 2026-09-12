import { describe, expect, it, vi } from "vitest";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { filterQuestions } from "@/lib/questions/filter";
import { defaultPracticeSession, parsePracticeSession, quizBackHref, SPECIALIST_EXAMS } from "@/lib/questions/practice-session";
import { getMockConfig } from "@/lib/mock-exam/config";
import { GET } from "@/app/api/mock-exam/[exam]/route";

vi.mock("server-only", () => ({}));
import { getPoolIds } from "@/lib/questions/pool-server";

describe("IPA paper separation across the complete registered corpus", () => {
  it("every exam index, question ID and named source PDF agrees with the stored session", () => {
    expect(Object.keys(QUESTIONS_BY_EXAM)).toHaveLength(13);
    for (const [exam, questions] of Object.entries(QUESTIONS_BY_EXAM)) {
      for (const q of questions ?? []) {
        expect(q.exam, q.id).toBe(exam);
        const idSession = q.id.match(/-(am1|am2|am|pm1|pm2|pm|kamoku-a|kamoku-b)-q\d+$/)?.[1];
        if (idSession) expect(q.session, q.id).toBe(idSession);
        const sourceSession = q.sourcePdfUrl.match(/_(am1|am2|am|pm1|pm2|pm)_qs\.pdf$/)?.[1];
        if (sourceSession) expect(q.session, q.id).toBe(sourceSession);
      }
    }
  });

  it.each(SPECIALIST_EXAMS)("%s keeps AM I and AM II disjoint in both player filters", async (exam) => {
    const am1 = filterQuestions(ALL_QUESTIONS, { mode: "year", exam, session: "am1" });
    const am2 = filterQuestions(ALL_QUESTIONS, { mode: "year", exam, session: "am2" });
    expect(am1.length).toBeGreaterThan(0);
    expect(am2.length).toBeGreaterThan(0);
    expect(am1.every((q) => q.session === "am1")).toBe(true);
    expect(am2.every((q) => q.session === "am2")).toBe(true);
    const serverIds = await getPoolIds({ mode: "year", exam, session: "am2" });
    expect(new Set(serverIds)).toEqual(new Set(am2.map((q) => q.id)));
    expect(defaultPracticeSession(exam)).toBe("am2");
  });

  it.each(SPECIALIST_EXAMS)("%s AM II mock API never returns common AM I questions", async (exam) => {
    const response = await GET(new Request(`https://example.test/api/mock-exam/${exam}`), { params: Promise.resolve({ exam }) });
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.total).toBe(25);
    expect(body.questions.every((q: { id: string }) => q.id.includes("-am2-"))).toBe(true);
  });

  it("SG practice contains its complete advertised subject A pool without legacy substitutions", async () => {
    const response = await GET(new Request("https://example.test/api/mock-exam/sg"), { params: Promise.resolve({ exam: "sg" }) });
    const body = await response.json();
    expect(body.total).toBe(getMockConfig("sg").questions);
    expect(body.questions.every((q: { id: string }) => q.id.includes("-kamoku-a-"))).toBe(true);
  });

  it("FE subject A excludes legacy morning and subject B from its mock", () => {
    const config = getMockConfig("fe");
    const pool = filterQuestions(ALL_QUESTIONS, { mode: "year", exam: "fe", session: config.session });
    expect(pool.length).toBeGreaterThan(0);
    expect(pool.every((q) => q.session === "kamoku-a")).toBe(true);
    expect(defaultPracticeSession("fe", 2019)).toBe("am");
    expect(parsePracticeSession("am2")).toBe("am2");
    expect(parsePracticeSession("pm2")).toBeUndefined();
  });
});

describe("contextual return destinations", () => {
  it("returns to the exact originating paper or category including its selection", () => {
    expect(quizBackHref({ exam: "st", mode: "year", returnTo: "/st/2025-spring" })).toBe("/st/2025-spring");
    expect(quizBackHref({ exam: "st", mode: "topic", returnTo: "/modes/topic?exam=st&session=am1" })).toBe("/modes/topic?exam=st&session=am1");
  });
  it("has useful direct-entry fallbacks without bouncing to the site homepage", () => {
    expect(quizBackHref({ exam: "st", mode: "year" })).toBe("/modes/year?exam=st");
    expect(quizBackHref({ exam: "st", mode: "topic" })).toBe("/modes/topic?exam=st");
    expect(quizBackHref({ exam: "st", mode: "random" })).toBe("/st");
  });
  it.each(["https://evil.test", "//evil.test", "/\\evil.test", "/quiz?mode=random", "/quiz/stream", "/\nevil.test"])("rejects external or looping return path %s", (returnTo) => {
    expect(quizBackHref({ exam: "st", returnTo })).toBe("/st");
  });
});
