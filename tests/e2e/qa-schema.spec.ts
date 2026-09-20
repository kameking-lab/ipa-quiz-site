import { test, expect, type APIRequestContext } from "@playwright/test";

async function pickQuestionUrl(request: APIRequestContext): Promise<string> {
  const xml = await (await request.get("/sitemap/questions/0.xml")).text();
  const locs = [...xml.matchAll(/<loc>([^<]+\/q\/[^<]+)<\/loc>/g)].map((m) => m[1]);
  expect(locs.length).toBeGreaterThan(0);
  const recent = locs.find((url) => /\/q\/[^/]+\/(202[4-9]|20[3-9]\d)-/.test(url));
  return new URL(recent ?? locs[0]).pathname;
}

interface QuestionNode {
  "@type": string;
  acceptedAnswer?: { "@type": string; text?: string; url?: string };
  suggestedAnswer?: unknown;
  answerCount?: number;
}

function findLearningQuestion(html: string): QuestionNode | null {
  const blocks = [
    ...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs),
  ].map((match) => match[1]);
  for (const raw of blocks) {
    try {
      const parsed = JSON.parse(raw) as { "@graph"?: Array<Record<string, unknown>> };
      for (const node of parsed["@graph"] ?? []) {
        if (node["@type"] === "LearningResource" && node.hasPart) {
          return node.hasPart as QuestionNode;
        }
      }
    } catch {
      // Ignore unrelated malformed third-party JSON-LD blocks.
    }
  }
  return null;
}

test.describe("question structured-data semantics", () => {
  test("SSR uses an educational Question and does not claim user-generated Q&A", async ({
    request,
  }) => {
    const path = await pickQuestionUrl(request);
    const html = await (await request.get(path)).text();
    const question = findLearningQuestion(html);

    expect(question).not.toBeNull();
    expect(question?.["@type"]).toBe("Question");
    expect(question?.acceptedAnswer).toMatchObject({
      "@type": "Answer",
      url: expect.stringMatching(/#explanation$/),
    });
    expect(question?.acceptedAnswer?.text).toBeTruthy();
    expect(question?.suggestedAnswer).toBeUndefined();
    expect(question?.answerCount).toBeUndefined();
    expect(html).not.toContain('"@type":"QAPage"');
  });
});
