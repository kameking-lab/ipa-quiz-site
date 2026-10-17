import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ExamSourceNotes } from "@/components/exam-library/exam-source-notes";
import catalog from "@/data/exam-library/official-catalog.json";
import type { ExamCatalogEntry } from "@/lib/exam-library-model";
import { NOTE_CATALOG_URL, noteCatalogDestination } from "@/lib/note-catalog";

afterEach(cleanup);
const entry = catalog.find(item => item.id === "lckohyo-LC20260401-2") as ExamCatalogEntry;
const expected = noteCatalogDestination(entry.noteLinks![0]!.url, "exam_library");
describe("source-note guide catalog navigation", () => {
  it.each(["paper", "qualification hub"])("keeps the known qualification from the %s", mode => {
    const { container } = render(<ExamSourceNotes {...(mode === "paper" ? { entry } : { noteLinks: entry.noteLinks })} />);
    expect(container.querySelector(`a[href^="${NOTE_CATALOG_URL}"]`)?.getAttribute("href")).toBe(expected);
    expect(container.querySelector('a[href^="https://note.com/"]')).toBeNull();
  });
  it("uses the full catalog when no qualification context is known", () => {
    const { container } = render(<ExamSourceNotes />);
    expect(container.querySelector(`a[href="${NOTE_CATALOG_URL}"]`)).not.toBeNull();
    expect(container.querySelector('a[href^="https://note.com/"]')).toBeNull();
  });
  it("does not guess one qualification for a mixed context", () => {
    const noteLinks = [...entry.noteLinks!, { url: "https://note.com/ipa_quiz_ai/n/nc09b275bef06" }];
    const { container } = render(<ExamSourceNotes noteLinks={noteLinks} />);
    expect(container.querySelector(`a[href="${NOTE_CATALOG_URL}"]`)).not.toBeNull();
  });
});
