import { test, expect, type APIRequestContext } from "@playwright/test";

async function pickQuestionUrl(request: APIRequestContext): Promise<string> {
  const xml = await (await request.get("/sitemap/questions/0.xml")).text();
  const locs = [...xml.matchAll(/<loc>([^<]+\/q\/[^<]+)<\/loc>/g)].map((m) => m[1]);
  expect(locs.length).toBeGreaterThan(0);
  const recent = locs.find((url) => /\/q\/[^/]+\/(202[4-9]|20[3-9]\d)-/.test(url));
  return new URL(recent ?? locs[0]).pathname;
}

interface AnswerNode {
  "@type": string;
  text?: string;
  url?: string;
}

interface QuestionNode {
  "@type": string;
  acceptedAnswer?: AnswerNode | AnswerNode[];
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
    expectEducationalAnswers(question, path);
    expect(question?.suggestedAnswer).toBeUndefined();
    expect(question?.answerCount).toBeUndefined();
    expect(html).not.toContain('"@type":"QAPage"');
  });

  for (const { path, count } of [
    { path: "/q/ap/2023-spring/am/q1", count: 1 },
    { path: "/q/unko-kanrisha-ryokaku/2024-cbt/gakka/q1", count: 2 },
  ]) {
    test(`SSR preserves ${count === 1 ? "single-choice" : "multi-select"} accepted answers at ${path}`, async ({ request }) => {
      const response = await request.get(path);
      expect(response.status()).toBe(200);
      const html = await response.text();
      const question = findLearningQuestion(html);
      const answers = expectEducationalAnswers(question, path);
      expect(Array.isArray(question?.acceptedAnswer)).toBe(count > 1);
      expect(answers).toHaveLength(count);
      expect(new Set(answers.map(answer => answer.text)).size).toBe(count);
      expect(question?.suggestedAnswer).toBeUndefined();
      expect(question?.answerCount).toBeUndefined();
      expect(html).not.toContain('"@type":"QAPage"');
    });
  }
});

function expectEducationalAnswers(question: QuestionNode | null, path: string): AnswerNode[] {
  expect(question?.["@type"]).toBe("Question");
  expect(question?.acceptedAnswer).toBeDefined();
  const accepted = question!.acceptedAnswer!;
  const answers = Array.isArray(accepted) ? accepted : [accepted];
  expect(answers.length).toBeGreaterThan(0);
  for (const answer of answers) {
    expect(answer).toMatchObject({ "@type": "Answer", url: `https://www.kakomon-ai.jp${path}#explanation` });
    expect(answer.text?.trim()).toBeTruthy();
  }
  return answers;
}
