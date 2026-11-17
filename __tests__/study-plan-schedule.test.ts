import { describe, expect, it, vi } from "vitest";
import { fallbackSessions, parseRegistration, qualificationIdsForExam } from "@/lib/study-plan/schedule";
import { getExamSchedule } from "@/lib/study-plan/schedule-server";
import { GET } from "@/app/api/exam-schedule/[exam]/route";

const session = { id: "next", label: "次回", applicationStart: "2026-11-01", applicationDeadline: "2026-11-30",
  examDate: "2026-12-01", examDateEnd: "2026-12-10", resultDate: "2027-01-05", verifiedDate: "2026-11-17",
  scheduleStatus: "official", sourceUrl: "https://www.ipa.go.jp/shiken/", examPhaseWindows: [{ label: "科目B", start: "2026-12-05", end: "2026-12-10" }] };
const okFetcher = () => vi.fn<typeof fetch>().mockResolvedValue(Response.json({ id: "ap", sessions: [session] }));

describe("schedule mapping and API contract", () => {
  it("preserves survey crosslink ids, multiple targets and unknown manual entry", () => {
    expect(qualificationIdsForExam("ip")).toEqual(["itpassport"]);
    expect(qualificationIdsForExam("civil1")).toContain("doboku-sekou-1kyu");
    expect(qualificationIdsForExam("khk-kagaku")).toHaveLength(3);
    expect(qualificationIdsForExam("future-exam")).toEqual([]);
    expect(qualificationIdsForExam("__proto__")).toEqual([]);
  });
  it("retains registration, result, periods, phase windows and official source", async () => {
    const fetcher = okFetcher();
    const result = await getExamSchedule("ap", fetcher);
    expect(result.source).toBe("tsugino");
    expect(result.sessions[0]).toMatchObject(session);
    expect(fetcher).toHaveBeenCalledWith("https://tsugino-shikaku.jp/api/qualification-registration/ap", expect.objectContaining({
      cache: "force-cache", next: { revalidate: 3600 }, redirect: "error", signal: expect.any(AbortSignal),
    }));
  });
  it.each(["tentative", "ondemand"])("preserves %s and missing dates", scheduleStatus => {
    const parsed = parseRegistration({ id: "ap", sessions: [{ ...session, scheduleStatus, examDate: null,
      applicationStart: null, applicationDeadline: "tbd" }] }, "ap")[0];
    expect(parsed.scheduleStatus).toBe(scheduleStatus);
    expect(parsed.examDate).toBeNull();
    expect(parsed.applicationDeadline).toBeNull();
  });
  it.each([500, 404])("falls back without registration dates on upstream %i", async status => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status }));
    const result = await getExamSchedule("ap", fetcher);
    expect(result.source).toBe("fallback");
    expect(result.sessions.length).toBeGreaterThan(0);
    expect(result.sessions.every(item => item.applicationStart === null && item.applicationDeadline === null && item.resultDate === null)).toBe(true);
  });
  it.each(["network", "timeout", "invalid-json", "wrong-id", "bad-date", "bad-source"])("handles %s with fallback", async failure => {
    const fetcher = vi.fn<typeof fetch>();
    if (failure === "network" || failure === "timeout") fetcher.mockRejectedValue(new Error(failure));
    else if (failure === "invalid-json") fetcher.mockResolvedValue(new Response("{broken"));
    else fetcher.mockResolvedValue(Response.json({ id: failure === "wrong-id" ? "fe" : "ap", sessions: [{ ...session,
      ...(failure === "bad-date" ? { examDate: "2026-02-30" } : {}), ...(failure === "bad-source" ? { sourceUrl: "javascript:alert(1)" } : {}) }] }));
    expect((await getExamSchedule("ap", fetcher)).source).toBe("fallback");
  });
  it("does not fetch unknown exams or accept arbitrary upstream URLs", async () => {
    const fetcher = vi.fn<typeof fetch>();
    expect(await getExamSchedule("future-exam", fetcher)).toMatchObject({ source: "manual", sessions: [] });
    expect(fetcher).not.toHaveBeenCalled();
    const response = await GET(new Request("http://localhost/api/exam-schedule/x"), { params: Promise.resolve({ exam: "https://evil.invalid" }) });
    expect(response.status).toBe(400);
  });
  it("returns a manual-entry response for an unknown well-formed exam", async () => {
    const response = await GET(new Request("http://localhost/api/exam-schedule/future"), { params: Promise.resolve({ exam: "future" }) });
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ source: "manual", sessions: [] });
    expect(response.headers.get("cache-control")).toContain("s-maxage=60");
  });
  it("never manufactures missing fallback data", () => {
    expect(fallbackSessions("ap", { checkedAt: "2026-11-17", exams: [{ key: "ap" }] })).toEqual([]);
    expect(fallbackSessions("ap", { checkedAt: "2026-11-17", exams: [{ key: "ap", dates: [{ date: "tbd", sourceUrl: "https://www.ipa.go.jp/" }] }] })).toEqual([]);
  });
  it("rejects dated upstream sessions with no source", () => {
    expect(() => parseRegistration({ id: "ap", sessions: [{ ...session, sourceUrl: null }] }, "ap")).toThrow("missing_schedule_source");
  });
  it("retains sourced on-demand fallback metadata with no invented dates", async () => {
    const result = await getExamSchedule("ip", vi.fn<typeof fetch>().mockRejectedValue(new Error("offline")));
    expect(result.source).toBe("fallback");
    expect(result.sessions[0]).toMatchObject({ scheduleStatus: "ondemand", examDate: null, applicationDeadline: null });
  });
  it("retains valid sessions when the upstream also contains an unannounced next year", () => {
    const parsed = parseRegistration({ id: "ap", sessions: [session, { ...session, id: "unannounced", scheduleStatus: "missing",
      examDate: null, examDateEnd: null, applicationStart: null, applicationDeadline: null, resultDate: null, examPhaseWindows: [] }] }, "ap");
    expect(parsed).toHaveLength(2);
    expect(parsed[0].scheduleStatus).toBe("official");
    expect(parsed[1]).toMatchObject({ scheduleStatus: "tentative", unannounced: true, examDate: null });
  });
});
