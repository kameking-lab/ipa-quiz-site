import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import EssayHomePage, { metadata } from "@/app/essay/page";
import { getAllEssayQuestions } from "@/lib/essay/load";
import { ESSAY_EXAM_CODES, getEssayQuestionsByExam } from "@/lib/essays/load";

describe("official essay hub", () => {
  it("preserves original manuscripts but does not present them as official past papers", () => {
    expect(getAllEssayQuestions().length).toBeGreaterThan(0);
    expect(getAllEssayQuestions().every((question) => question.license === "original")).toBe(true);
    const references = ESSAY_EXAM_CODES.flatMap(getEssayQuestionsByExam);
    expect(references.length).toBeGreaterThan(0);
    expect(references.every((question) => question.license === "original")).toBe(true);
  });

  it("links to IPA's year pages without listing independent question titles", () => {
    const markup = renderToStaticMarkup(<EssayHomePage />);
    expect(markup).toContain("https://www.ipa.go.jp/shiken/mondai-kaiotu/2025r07.html");
    expect(markup).toContain("https://www.ipa.go.jp/shiken/mondai-kaiotu/2024r06.html");
    expect(markup).toContain("https://www.ipa.go.jp/shiken/mondai-kaiotu/2023r05.html");
    expect(markup).toContain("現在、このページでは論述の自動採点を受け付けていません");
    for (const question of getAllEssayQuestions()) {
      expect(markup).not.toContain(question.title);
    }
    expect(metadata.alternates).toEqual({ canonical: "/essay" });
  });

  it("does not import original manuscript data into the history client bundle", () => {
    const source = readFileSync(join(process.cwd(), "app/account/essay-history/EssayHistoryView.tsx"), "utf8");
    expect(source).not.toContain("@/lib/essay/load");
    expect(source).toContain("entry.questionId");
  });
});
