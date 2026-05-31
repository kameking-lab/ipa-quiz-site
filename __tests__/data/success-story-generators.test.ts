import { describe, expect, it } from "vitest";

import { examLabel } from "@/lib/utils";

import { buildSuccessStory } from "@/data/success-stories/generators";
import { ALL_PERSONAS, type PersonaInput } from "@/data/success-stories/personas";

// Characterization tests for the success-story builder (consumed by the
// /success-stories routes + sitemap/robots). buildSuccessStory turns a curated
// PersonaInput into a rendered SuccessStory. Pin: faithful field mapping, the
// title/description/body templates, the score-conditional body line, and the
// "never publish in the future" clamp on publishedAt.

const BASE: PersonaInput = ALL_PERSONAS[0];

describe("buildSuccessStory — field mapping", () => {
  it("preserves identity and related-content pointers for every persona", () => {
    for (const p of ALL_PERSONAS) {
      const s = buildSuccessStory(p);
      expect(s.slug).toBe(p.slug);
      expect(s.exam).toBe(p.exam);
      // relatedQuizExam is always the story's own exam.
      expect(s.relatedQuizExam).toBe(p.exam);
      expect(s.relatedBlogSlug).toBe(p.relatedBlogSlug);
      expect(s.relatedEssayExam).toBe(p.relatedEssayExam);
      expect(s.strugglePoint).toBe(p.strugglePoint);
      expect(s.keyTakeaways).toEqual(p.keyTakeaways);
      // persona sub-object mirrors the input profile fields.
      expect(s.persona.occupation).toBe(p.occupation);
      expect(s.persona.ageRange).toBe(p.ageRange);
      expect(s.persona.studyMonths).toBe(p.studyMonths);
      expect(s.persona.totalStudyHours).toBe(p.totalStudyHours);
      expect(s.persona.score).toBe(p.score);
    }
  });
});

describe("buildSuccessStory — title / description templates", () => {
  it("formats the title as 【{examLabel}合格体験記】{titleHook}", () => {
    for (const p of ALL_PERSONAS) {
      const s = buildSuccessStory(p);
      expect(s.title).toBe(`【${examLabel(p.exam)}合格体験記】${p.titleHook}`);
    }
  });

  it("embeds the profile and truncates the motivation to 50 chars in the description", () => {
    const longMotivation = "あ".repeat(80);
    const s = buildSuccessStory({ ...BASE, motivation: longMotivation });
    expect(s.description).toContain(examLabel(BASE.exam));
    expect(s.description).toContain(BASE.occupation);
    expect(s.description).toContain(`${BASE.studyMonths}か月`);
    expect(s.description).toContain(`計${BASE.totalStudyHours}時間`);
    // first 50 chars kept, the 51st onward dropped.
    expect(s.description).toContain("あ".repeat(50) + "…");
    expect(s.description).not.toContain("あ".repeat(51));
  });
});

describe("buildSuccessStory — body", () => {
  it("renders persona narrative fields, key takeaways as bullets, and the quiz link", () => {
    for (const p of ALL_PERSONAS) {
      const body = buildSuccessStory(p).body;
      expect(body).toContain(p.strugglePoint);
      expect(body).toContain(p.breakthroughMethod);
      for (const t of p.keyTakeaways) {
        expect(body).toContain(`- ${t}`);
      }
      // closing CTA links to the exam's quiz route.
      expect(body).toContain(`(/${p.exam})`);
    }
  });

  it("includes the score line only when a score is present", () => {
    const withScore = buildSuccessStory({ ...BASE, score: "午前 92点 / 午後 88点" });
    expect(withScore.body).toContain("- 結果: 午前 92点 / 午後 88点");

    const withoutScore = buildSuccessStory({ ...BASE, score: undefined });
    expect(withoutScore.body).not.toContain("- 結果:");
  });
});

describe("buildSuccessStory — publishedAt clamp", () => {
  function todayUtcMidnightMs(): number {
    const now = new Date();
    return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  }

  it("never dates a story in the future", () => {
    const today = todayUtcMidnightMs();
    for (const p of ALL_PERSONAS) {
      const s = buildSuccessStory(p);
      expect(Number.isNaN(Date.parse(s.publishedAt))).toBe(false);
      expect(Date.parse(s.publishedAt)).toBeLessThanOrEqual(today);
    }
  });

  it("clamps a far-future offset down to today's UTC midnight", () => {
    // Real personas all sit in early 2026, so the clamp is inert for them —
    // a synthetic future offset is needed to exercise (and protect) the Math.min.
    const s = buildSuccessStory({ ...BASE, publishedOffsetDays: 1_000_000 });
    expect(Date.parse(s.publishedAt)).toBe(todayUtcMidnightMs());
  });
});
