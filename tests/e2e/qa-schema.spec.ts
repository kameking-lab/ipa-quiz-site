import { test, expect, type APIRequestContext } from "@playwright/test";

/**
 * Q&A structured-data rich-result compliance on /q/* (致命傷⑥).
 *
 * Google's Rich Results Test reported 1 critical error (missing required
 * Question.answerCount) + 18 warnings (missing recommended author / datePublished
 * / upvoteCount / url across the Question and its Answers). This parses the real
 * server-rendered QAPage JSON-LD and asserts the required + recommended fields
 * are present so the page is eligible for the Q&A rich result.
 */

async function pickQuestionUrl(request: APIRequestContext): Promise<string> {
  const xml = await (await request.get("/sitemap/questions/0.xml")).text();
  const locs = [...xml.matchAll(/<loc>([^<]+\/q\/[^<]+)<\/loc>/g)].map((m) => m[1]);
  expect(locs.length).toBeGreaterThan(0);
  const recent = locs.find((u) => /\/q\/[^/]+\/(202[4-9]|20[3-9]\d)-/.test(u));
  return new URL(recent ?? locs[0]).pathname;
}

interface AnswerNode {
  "@type": string;
  text?: string;
  url?: string;
  author?: { "@type": string; name: string };
  datePublished?: string;
  upvoteCount?: number;
}
interface QuestionNode {
  "@type": string;
  answerCount?: number;
  author?: { "@type": string; name: string };
  datePublished?: string;
  dateCreated?: string;
  upvoteCount?: number;
  url?: string;
  acceptedAnswer?: AnswerNode;
  suggestedAnswer?: AnswerNode[];
}

/** Extract the QAPage's mainEntity Question from a page's JSON-LD blocks. */
function findQuestion(html: string): QuestionNode | null {
  const blocks = [
    ...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs),
  ].map((m) => m[1]);
  for (const raw of blocks) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      continue;
    }
    const graph = (parsed as { "@graph"?: unknown[] })["@graph"] ?? [parsed];
    for (const node of graph as Array<Record<string, unknown>>) {
      if (node["@type"] === "QAPage" && node.mainEntity) {
        return node.mainEntity as QuestionNode;
      }
    }
  }
  return null;
}

test.describe("Q&A schema compliance", () => {
  test("server-rendered QAPage Question has the required answerCount + recommended fields", async ({
    request,
  }) => {
    const path = await pickQuestionUrl(request);
    const html = await (await request.get(path)).text();
    const q = findQuestion(html);
    expect(q, "QAPage mainEntity Question must be present in SSR JSON-LD").not.toBeNull();

    // Critical fix: answerCount is required and must be >= 1.
    expect(typeof q!.answerCount).toBe("number");
    expect(q!.answerCount!).toBeGreaterThanOrEqual(1);

    // Recommended fields on the Question (clears warnings).
    expect(q!.author?.["@type"]).toBe("Organization");
    expect(q!.author?.name).toBeTruthy();
    expect(q!.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}/);
    expect(q!.dateCreated).toMatch(/^\d{4}-\d{2}-\d{2}/);
    expect(typeof q!.upvoteCount).toBe("number");
    expect(q!.url).toMatch(/^https?:\/\/.+\/q\//);

    // acceptedAnswer carries text + recommended fields.
    const a = q!.acceptedAnswer!;
    expect(a.text).toBeTruthy();
    expect(a.url).toMatch(/#explanation$/);
    expect(a.author?.name).toBeTruthy();
    expect(a.datePublished).toBeTruthy();
    expect(typeof a.upvoteCount).toBe("number");
  });

  test("every suggested answer also carries the recommended fields", async ({ request }) => {
    const path = await pickQuestionUrl(request);
    const html = await (await request.get(path)).text();
    const q = findQuestion(html);
    expect(q).not.toBeNull();
    const suggested = q!.suggestedAnswer ?? [];
    // Multiple-choice questions have distractors; if present they must comply.
    for (const a of suggested) {
      expect(a.text).toBeTruthy();
      expect(a.url).toBeTruthy();
      expect(a.author?.name).toBeTruthy();
      expect(a.datePublished).toBeTruthy();
      expect(typeof a.upvoteCount).toBe("number");
    }
    // answerCount must reconcile with the answers actually present.
    expect(q!.answerCount).toBe(1 + suggested.length);
  });
});
