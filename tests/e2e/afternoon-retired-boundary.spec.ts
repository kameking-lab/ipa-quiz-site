import { expect, test } from "@playwright/test";

// Run against the candidate's existing CI build -> Playwright webServer only.
// No remote E2E_BASE_URL: a retired ID could still be supplied by an old deployment.
function anchorHrefs(html: string): string[] {
  return Array.from(html.matchAll(/<a\b[^>]*\bhref="([^"]*)"/g), match => match[1]!);
}

test("retired afternoon supply is empty over HTTP and its scoring target returns 404", async ({ request, baseURL }) => {
  expect(process.env.E2E_BASE_URL, "Use the candidate-built CI webServer, never a remote/old deployment").toBeUndefined();
  expect(baseURL).toBe("http://127.0.0.1:3000");
  expect(process.env.CI, "POST is restricted to the CI-owned webServer").toBe("true");

  const index = await request.get("/ap/afternoon");
  expect(index.status()).toBe(200);
  const indexHtml = await index.text();
  expect(indexHtml).toContain("このページで公開できる午後の過去問は現在ありません。");
  const indexLinks = anchorHrefs(indexHtml);
  expect(indexLinks).toContain("/ap");
  expect(indexLinks.filter(href => href.startsWith("/ap/afternoon/"))).toEqual([]);

  const retiredSitting = await request.get("/ap/afternoon/2024/spring");
  expect(retiredSitting.status()).toBe(404);

  const essays = await request.get("/essays");
  expect(essays.status()).toBe(200);
  const essayLinks = anchorHrefs(await essays.text()).filter(href => href.startsWith("/essays/"));
  expect(essayLinks).toEqual([]); // The separately retired SC originals are no longer supplied.
  for (const exam of ["sc", "st", "sa", "pm", "sm", "au"]) {
    expect(essayLinks).not.toContain(`/essays/${exam}`);
    const unavailableCollection = await request.get(`/essays/${exam}`);
    expect(unavailableCollection.status(), exam).toBe(404);
  }

  const stats = await request.get("/api/stats/content-count");
  expect(stats.status()).toBe(200);
  const counts = await stats.json() as {
    morning: number; afternoon: number; essay: number; total: number;
    byExam: { afternoon: number }[];
  };
  expect(counts.afternoon).toBe(0);
  expect(counts.essay).toBe(0);
  expect(Array.isArray(counts.byExam)).toBe(true);
  expect(counts.byExam.length).toBeGreaterThan(0);
  for (const row of counts.byExam) expect(row.afternoon).toBe(0);
  expect(counts.total).toBe(counts.morning + counts.essay);

  // All GET preconditions must pass before this non-personal POST. The fixed
  // handler resolves the missing target before admission/provider/cost calls.
  // HTTP checks the real status/body; unit spies separately prove non-consumption.
  const scoring = await request.post("/api/scoring", {
    data: {
      questionId: "ap-2024h-pm-q1",
      answers: [{ label: "設問1", text: "境界検収専用の固定入力" }],
    },
  });
  expect(scoring.status()).toBe(404);
  const body = await scoring.json();
  expect(body.error).toBe("not_found");
  for (const key of ["totalScore", "subResults", "overallComment", "gradedAt"]) {
    expect(body).not.toHaveProperty(key);
  }
  expect(scoring.headers()["x-provider"]).toBeUndefined();
});
