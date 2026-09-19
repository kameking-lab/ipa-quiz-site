import { describe, expect, it } from "vitest";

import { getAllTopics, getQuestionsByTopic } from "@/lib/seo/topics";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";

/**
 * /topics/[slug] links every pooled question via questionPagePath. needsReview
 * questions 404 at /q/* (their page notFound()s), so they must never appear in
 * the topic index — otherwise the indexable hub pages ship dead links (this was
 * 4 dead links corpus-wide before the buildIndex fix). Placeholder questions are
 * intentionally kept (the page badges them 「解説準備中」 and links a real 200
 * noindex page), so this guard only forbids needsReview.
 */
describe("/topics index — only pools practice-ready questions", () => {
  it("no topic pool contains a question whose detail route is unavailable", () => {
    const dead: string[] = [];
    for (const t of getAllTopics()) {
      for (const q of getQuestionsByTopic(t.tag)) {
        if (!isPracticeReadyQuestion(q)) dead.push(`${t.slug} -> ${q.id}`);
      }
    }
    expect(dead).toEqual([]);
  });

  it("has a non-trivial topic index (guards against an empty-index false pass)", () => {
    expect(getAllTopics().length).toBeGreaterThan(0);
  });
});
