import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ExamSourceNotes } from "@/components/exam-library/exam-source-notes";
import { EXAM_CATALOG } from "@/lib/exam-library-catalog";
import { examSourcePdfUrl } from "@/lib/exam-library-model";

afterEach(cleanup);
describe("official source notices after article retirement", () => {
  it("keeps the official source and grading notices without article catalog dependencies", () => {
    const entry = EXAM_CATALOG.find(item => item.id === "lckohyo-LC20260401-2")!;
    const { container } = render(<ExamSourceNotes entry={entry} />);
    expect(container.querySelector(`a[href="${examSourcePdfUrl(entry)}"]`)).not.toBeNull();
    expect(screen.getByRole("heading", { name: "出典・日付・採点について" })).toBeInTheDocument();
    expect(screen.getByText(/正答表示を確認できた問題だけ/)).toBeInTheDocument();
    expect(container.querySelector('a[href*="tsugino-shikaku.jp/articles"], a[href^="https://note.com/"]')).toBeNull();
  });
});
