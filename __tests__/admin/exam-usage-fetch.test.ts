import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  __resetExamUsageCacheForTests,
  buildQualificationMaster,
  computeExamUsageData,
  fetchExamUsageData,
  isExamUsageConfigured,
} from "@/lib/admin/exam-usage/posthog";

/**
 * Characterization + contract tests for lib/admin/exam-usage/posthog.ts —
 * the source gate behind /admin/exam-usage (資格別回答数ランキング). Contracts:
 *   1. no PostHog credentials → source "unavailable" / reason "not_configured",
 *      and fetch is NOT called (never fabricate rows).
 *   2. any of the 3 current-window queries failing → "unavailable" / "query_failed",
 *      even if the others would have succeeded.
 *   3. a qualification row without an examCode/hubSlug is "not-instrumented"
 *      (count/total = null), NEVER the same shape as a real 0.
 *   4. question_answered (properties.exam) and exam_library_answered
 *      (properties.hubSlug) are attributed to the right row without double
 *      counting, since a row never has both examCode and hubSlug.
 *   5. page_view path → qualification mapping for /q/, /e-learning/exams/... ,
 *      and the app/[exam] catch-all; unmapped paths land in unattributedPageViews.
 *   6. previous-period comparison (changePct), including previousTotal=0 and
 *      range="all" (no previous period).
 *   7. fetchExamUsageData caches per range.
 */

function setEnv(present: boolean) {
  if (present) {
    vi.stubEnv("POSTHOG_API_KEY", "phk_test");
    vi.stubEnv("POSTHOG_PROJECT_ID", "4242");
  } else {
    vi.stubEnv("POSTHOG_API_KEY", "");
    vi.stubEnv("POSTHOG_PROJECT_ID", "");
  }
}

type Row = unknown[];

/** Routes a HogQL POST body to canned results based on distinctive substrings in the query text. */
function routedFetch(routes: {
  examPropertyCurrent?: Row[];
  examPropertyPrevious?: Row[];
  pageView?: Row[];
  examLibraryCurrent?: Row[];
  examLibraryPrevious?: Row[];
  /** query text substring -> null means "this call fails" */
  fail?: "examProperty" | "pageView" | "examLibrary";
  /** only the previous-window queries fail (current ones succeed) */
  failPrevious?: boolean;
}) {
  return vi.fn(async (_url: string, init: RequestInit) => {
    const body = JSON.parse(String(init.body)) as { query: { query: string } };
    const q = body.query.query;
    const isPrevious = q.includes("timestamp <");
    if (isPrevious && routes.failPrevious) return { ok: false, json: async () => ({}) };
    if (q.includes("properties.exam AS exam")) {
      if (routes.fail === "examProperty") return { ok: false, json: async () => ({}) };
      const results = isPrevious ? (routes.examPropertyPrevious ?? []) : (routes.examPropertyCurrent ?? []);
      return { ok: true, json: async () => ({ results }) };
    }
    if (q.includes("properties.hubSlug AS hubSlug")) {
      if (routes.fail === "examLibrary") return { ok: false, json: async () => ({}) };
      const results = isPrevious ? (routes.examLibraryPrevious ?? []) : (routes.examLibraryCurrent ?? []);
      return { ok: true, json: async () => ({ results }) };
    }
    if (q.includes("event = 'page_view'")) {
      if (routes.fail === "pageView") return { ok: false, json: async () => ({}) };
      return { ok: true, json: async () => ({ results: routes.pageView ?? [] }) };
    }
    throw new Error(`unexpected HogQL query: ${q}`);
  });
}

beforeEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  __resetExamUsageCacheForTests();
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  __resetExamUsageCacheForTests();
});

describe("isExamUsageConfigured", () => {
  it("reflects whether both credentials are present", () => {
    setEnv(true);
    expect(isExamUsageConfigured()).toBe(true);
    setEnv(false);
    expect(isExamUsageConfigured()).toBe(false);
  });
});

describe("buildQualificationMaster", () => {
  it("lists every IPA exam code, every qualification-catalog slug and every exam-library hub, with disjoint key spaces", () => {
    const master = buildQualificationMaster();
    const ipaRows = master.filter((m) => m.source === "ipa");
    const qualRows = master.filter((m) => m.source === "qualification-catalog");
    const hubRows = master.filter((m) => m.source === "exam-library-hub");
    expect(ipaRows.length).toBeGreaterThan(0);
    expect(qualRows.length).toBeGreaterThan(0);
    expect(hubRows.length).toBeGreaterThan(0);
    // no row carries both examCode and hubSlug (used to prove no double counting)
    for (const row of master) {
      expect(Boolean(row.examCode) && Boolean(row.hubSlug)).toBe(false);
    }
    const keys = master.map((m) => m.key);
    expect(new Set(keys).size).toBe(keys.length);
  });
});

describe("computeExamUsageData — unavailable", () => {
  it("returns unavailable/not_configured without calling fetch when credentials are absent", async () => {
    setEnv(false);
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const res = await computeExamUsageData(30);

    expect(res.source).toBe("unavailable");
    expect(res.reason).toBe("not_configured");
    expect(res.rows).toEqual([]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns unavailable/query_failed when the page_view query fails, even though the others would succeed", async () => {
    setEnv(true);
    vi.stubGlobal("fetch", routedFetch({ fail: "pageView", examPropertyCurrent: [["quiz_started", "ap", "5", "3"]] }));

    const res = await computeExamUsageData(7);

    expect(res.source).toBe("unavailable");
    expect(res.reason).toBe("query_failed");
    expect(res.rows).toEqual([]);
  });

  it("returns unavailable/query_failed when the exam-property query fails", async () => {
    setEnv(true);
    vi.stubGlobal("fetch", routedFetch({ fail: "examProperty" }));
    const res = await computeExamUsageData(7);
    expect(res.source).toBe("unavailable");
    expect(res.reason).toBe("query_failed");
  });

  it("returns unavailable/query_failed when the exam-library query fails", async () => {
    setEnv(true);
    vi.stubGlobal("fetch", routedFetch({ fail: "examLibrary" }));
    const res = await computeExamUsageData(7);
    expect(res.source).toBe("unavailable");
    expect(res.reason).toBe("query_failed");
  });
});

describe("computeExamUsageData — measured vs not-instrumented", () => {
  it("marks a qualification-catalog row without an examCode as not-instrumented across all metrics and answered", async () => {
    setEnv(true);
    vi.stubGlobal("fetch", routedFetch({}));
    const res = await computeExamUsageData(30);
    expect(res.source).toBe("posthog");

    // A qualifications/catalog.ts entry with no examCode (e.g. sekou-kenchiku1) has no
    // event stream that could ever carry its exam code.
    const noCode = buildQualificationMaster().find((m) => m.source === "qualification-catalog" && !m.examCode);
    expect(noCode).toBeDefined();
    const uninstrumented = res.rows.find((r) => r.key === noCode!.key);
    expect(uninstrumented).toBeDefined();
    expect(uninstrumented!.answered.status).toBe("not-instrumented");
    expect(uninstrumented!.answered.total).toBeNull();
    expect(uninstrumented!.metrics.pageViews.status).toBe("not-instrumented");
    expect(uninstrumented!.metrics.quizStarted.status).toBe("not-instrumented");
  });

  it("marks a real 0 as measured, never the same shape as not-instrumented", async () => {
    setEnv(true);
    vi.stubGlobal("fetch", routedFetch({ examPropertyCurrent: [] }));
    const res = await computeExamUsageData(30);

    const ap = res.rows.find((r) => r.key === "ipa:ap");
    expect(ap).toBeDefined();
    expect(ap!.answered.status).toBe("measured");
    expect(ap!.answered.total).toBe(0);
    expect(ap!.metrics.quizStarted).toEqual({ status: "measured", count: 0 });
  });
});

describe("computeExamUsageData — attribution without double counting", () => {
  it("attributes question_answered (properties.exam) to the matching IPA row", async () => {
    setEnv(true);
    vi.stubGlobal(
      "fetch",
      routedFetch({
        examPropertyCurrent: [
          ["question_answered", "ap", "42", "30"],
          ["quiz_started", "ap", "10", "9"],
        ],
      }),
    );
    const res = await computeExamUsageData(30);
    const ap = res.rows.find((r) => r.key === "ipa:ap")!;
    expect(ap.answered).toMatchObject({ status: "measured", total: 42, uniqueUsers: 30 });
    expect(ap.metrics.quizStarted).toEqual({ status: "measured", count: 10 });
    // a different IPA row is untouched (measured zero, not leaked totals)
    const fe = res.rows.find((r) => r.key === "ipa:fe")!;
    expect(fe.answered).toMatchObject({ status: "measured", total: 0 });
  });

  it("attributes exam_library_answered (properties.hubSlug) to the matching hub row only", async () => {
    setEnv(true);
    const master = buildQualificationMaster();
    const hub = master.find((m) => m.source === "exam-library-hub")!;
    vi.stubGlobal(
      "fetch",
      routedFetch({
        examLibraryCurrent: [["exam_library_answered", hub.hubSlug, "12", "8"]],
      }),
    );
    const res = await computeExamUsageData(30);
    const row = res.rows.find((r) => r.key === hub.key)!;
    expect(row.answered).toMatchObject({ status: "measured", total: 12, uniqueUsers: 8 });
    expect(row.metrics.examLibraryAnswered).toEqual({ status: "measured", count: 12 });
    // hub rows never receive quiz_started etc. (not-instrumented, not merged)
    expect(row.metrics.quizStarted.status).toBe("not-instrumented");
  });
});

describe("computeExamUsageData — answered total combines every answer source", () => {
  it("sums question_answered rows for the same exam (QuizPlayer + /q/ inline answers share the event) into one total", async () => {
    setEnv(true);
    vi.stubGlobal(
      "fetch",
      routedFetch({
        // HogQL normally returns one row per (event, exam); duplicates must still be summed, not overwritten.
        examPropertyCurrent: [
          ["question_answered", "ap", "40", "20"],
          ["question_answered", "ap", "2", "1"],
        ],
      }),
    );
    const res = await computeExamUsageData(30);
    const ap = res.rows.find((r) => r.key === "ipa:ap")!;
    expect(ap.answered.total).toBe(42);
    expect(ap.metrics.questionAnswered).toEqual({ status: "measured", count: 42 });
  });

  it("ranks IPA rows (question_answered) and exam-library hubs (exam_library_answered) on the same answered scale", async () => {
    setEnv(true);
    const hub = buildQualificationMaster().find((m) => m.source === "exam-library-hub")!;
    vi.stubGlobal(
      "fetch",
      routedFetch({
        examPropertyCurrent: [["question_answered", "fe", "5", "5"]],
        examLibraryCurrent: [["exam_library_answered", hub.hubSlug, "9", "4"]],
      }),
    );
    const res = await computeExamUsageData(30);
    const byTotal = res.rows
      .filter((r) => r.answered.status === "measured" && (r.answered.total ?? 0) > 0)
      .sort((a, b) => (b.answered.total ?? 0) - (a.answered.total ?? 0))
      .map((r) => r.key);
    expect(byTotal).toEqual([hub.key, "ipa:fe"]);
  });
});

describe("computeExamUsageData — page_view path attribution", () => {
  it("maps /q/{exam}/{yearSeason}/... , the [exam] catch-all, and unmapped paths correctly", async () => {
    setEnv(true);
    vi.stubGlobal(
      "fetch",
      routedFetch({
        pageView: [
          ["/q/ap/2024-spring/am/q42", "7"],
          ["/ap", "3"],
          ["/blog/some-post", "5"], // unmapped → unattributed
        ],
      }),
    );
    const res = await computeExamUsageData(7);
    const ap = res.rows.find((r) => r.key === "ipa:ap")!;
    expect(ap.metrics.pageViews).toEqual({ status: "measured", count: 10 });
    expect(res.unattributedPageViews).toBe(5);
  });

  it("maps an exam-library qualification hub URL", async () => {
    setEnv(true);
    const master = buildQualificationMaster();
    const hub = master.find((m) => m.source === "exam-library-hub")!;
    vi.stubGlobal(
      "fetch",
      routedFetch({ pageView: [[`/e-learning/exams/qualifications/${hub.hubSlug}`, "4"]] }),
    );
    const res = await computeExamUsageData(7);
    const row = res.rows.find((r) => r.key === hub.key)!;
    expect(row.metrics.pageViews).toEqual({ status: "measured", count: 4 });
  });
});

describe("computeExamUsageData — previous-period comparison", () => {
  it("computes changePct from the prior equal-length window", async () => {
    setEnv(true);
    vi.stubGlobal(
      "fetch",
      routedFetch({
        examPropertyCurrent: [["question_answered", "ap", "150", "100"]],
        examPropertyPrevious: [["question_answered", "ap", "100", "80"]],
      }),
    );
    const res = await computeExamUsageData(7);
    const ap = res.rows.find((r) => r.key === "ipa:ap")!;
    expect(ap.answered.total).toBe(150);
    expect(ap.answered.previousTotal).toBe(100);
    expect(ap.answered.changePct).toBe(50); // (150-100)/100*100
  });

  it("shows changePct null when the previous period was 0 (avoid dividing by zero / fake infinity)", async () => {
    setEnv(true);
    vi.stubGlobal(
      "fetch",
      routedFetch({
        examPropertyCurrent: [["question_answered", "ap", "5", "5"]],
        examPropertyPrevious: [],
      }),
    );
    const res = await computeExamUsageData(7);
    const ap = res.rows.find((r) => r.key === "ipa:ap")!;
    expect(ap.answered.previousTotal).toBe(0);
    expect(ap.answered.changePct).toBeNull();
  });

  it("keeps the current-period ranking but shows no comparison when only the previous-period query fails", async () => {
    setEnv(true);
    vi.stubGlobal(
      "fetch",
      routedFetch({ examPropertyCurrent: [["question_answered", "ap", "7", "7"]], failPrevious: true }),
    );
    const res = await computeExamUsageData(30);
    expect(res.source).toBe("posthog");
    const ap = res.rows.find((r) => r.key === "ipa:ap")!;
    expect(ap.answered.total).toBe(7);
    expect(ap.answered.previousTotal).toBeNull();
    expect(ap.answered.changePct).toBeNull();
  });

  it('has no previous period for range "all" (previousTotal and changePct are null)', async () => {
    setEnv(true);
    vi.stubGlobal(
      "fetch",
      routedFetch({ examPropertyCurrent: [["question_answered", "ap", "9", "9"]] }),
    );
    const res = await computeExamUsageData("all");
    const ap = res.rows.find((r) => r.key === "ipa:ap")!;
    expect(ap.answered.total).toBe(9);
    expect(ap.answered.previousTotal).toBeNull();
    expect(ap.answered.changePct).toBeNull();
  });

  it("a not-instrumented row never gets a previousTotal/changePct either", async () => {
    setEnv(true);
    vi.stubGlobal("fetch", routedFetch({}));
    const res = await computeExamUsageData(30);
    const noCode = buildQualificationMaster().find((m) => m.source === "qualification-catalog" && !m.examCode)!;
    const uninstrumented = res.rows.find((r) => r.key === noCode.key)!;
    expect(uninstrumented.answered.previousTotal).toBeNull();
    expect(uninstrumented.answered.changePct).toBeNull();
  });
});

describe("fetchExamUsageData — caching", () => {
  it("caches per range within the TTL (fetch called once for two calls)", async () => {
    setEnv(true);
    const fetchMock = routedFetch({});
    vi.stubGlobal("fetch", fetchMock);

    await fetchExamUsageData(30);
    await fetchExamUsageData(30);

    expect(fetchMock.mock.calls.length).toBeGreaterThan(0);
    const firstCallCount = fetchMock.mock.calls.length;
    await fetchExamUsageData(30);
    expect(fetchMock.mock.calls.length).toBe(firstCallCount);
  });

  it("keeps a separate cache entry per range", async () => {
    setEnv(true);
    const fetchMock = routedFetch({});
    vi.stubGlobal("fetch", fetchMock);

    await fetchExamUsageData(7);
    const afterFirst = fetchMock.mock.calls.length;
    await fetchExamUsageData(30);
    expect(fetchMock.mock.calls.length).toBeGreaterThan(afterFirst);
  });
});
