import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen, within } from "@testing-library/react";
import YearPage from "@/app/[exam]/[yearSeason]/page";
import { ALL_QUESTIONS } from "@/data/questions";
import { filterQuestions } from "@/lib/questions/filter";
import { getAnnotatedNote } from "@/lib/st-annotated-notes/catalog";

const noteId = "st-2009a-am2-q23";
const notePath = `/st/past-papers/notes/${noteId}`;
const noteLabel = "午前Ⅱ 問23：注記付き・非採点教材";

describe("ST 2009 autumn annotated Q23 entry", () => {
  it("offers one explicitly non-scoring entry beside the ordinary quiz entry", async () => {
    render(await YearPage({ params: Promise.resolve({ exam: "st", yearSeason: "2009-autumn" }) }));

    const note = screen.getByRole("complementary", { name: "午前Ⅱ 問23の別教材" });
    const link = within(note).getByRole("link", { name: noteLabel });
    expect(link).toBeVisible();
    expect(link).toHaveAttribute("href", notePath);
    expect(screen.getAllByRole("link", { name: noteLabel })).toHaveLength(1);
    expect(link.closest('section[aria-label="クイズを始める"]')).toBeNull();
    expect(note).toHaveTextContent("通常の採点問題とは別に、留保を確認しながら学べます。");
  });

  it("keeps the note outside the 24 ordinary AMII entries and grading pool", async () => {
    const { container } = render(await YearPage({ params: Promise.resolve({ exam: "st", yearSeason: "2009-autumn" }) }));
    const playable = filterQuestions(ALL_QUESTIONS, {
      mode: "year", exam: "st", year: 2009, season: "autumn", session: "am2", inOrder: true,
    });
    expect(playable.map((q) => q.qNumber)).toEqual(
      Array.from({ length: 25 }, (_, index) => index + 1).filter((number) => number !== 23),
    );
    const renderedOrdinaryIds = [...container.querySelectorAll<HTMLAnchorElement>('a[href^="/quiz?"]')]
      .map((link) => new URL(link.getAttribute("href")!, "https://www.kakomon-ai.jp").searchParams)
      .filter((query) => query.get("session") === "am2" && query.has("question"))
      .map((query) => query.get("question"));
    expect(renderedOrdinaryIds).toEqual(playable.map((q) => q.id));
    expect(ALL_QUESTIONS.some((q) => q.id === noteId)).toBe(false);
    expect(getAnnotatedNote(noteId)).toMatchObject({
      kind: "st-annotated-non-scoring", registerInQuestionPool: false, scoringEnabled: false,
    });
  });

  it.each([
    { exam: "st", yearSeason: "2010-autumn" },
    { exam: "sc", yearSeason: "2009-autumn" },
  ])("does not offer the Q23 note on $exam/$yearSeason", async (params) => {
    const { container } = render(await YearPage({ params: Promise.resolve(params) }));
    expect(screen.queryByRole("link", { name: noteLabel })).not.toBeInTheDocument();
    expect(container.querySelector(`a[href="${notePath}"]`)).toBeNull();
  });
});
