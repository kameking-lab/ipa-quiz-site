import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import ExamPage from "@/app/e-learning/exams/[id]/page";
import catalog from "@/data/exam-library/official-catalog.json";
import { EXAM_CATALOG } from "@/lib/exam-library-catalog";
import { examSourcePdfUrl, parseExamCatalogEntry } from "@/lib/exam-library-model";
import { loadExamPaper } from "@/lib/exam-library-papers";

const archiveEntries = catalog.filter((entry) => entry.sourceMode === "official-archive-copy");

beforeEach(() => {
  window.localStorage.clear();
  window.sessionStorage.clear();
});
afterEach(cleanup);

describe("archived consultant PDF links", () => {
  it("retains all eleven reviewed copies while preserving the old official URLs as provenance", () => {
    expect(archiveEntries).toHaveLength(11);
    for (const raw of archiveEntries) {
      const entry = EXAM_CATALOG.find((candidate) => candidate.id === raw.id)!;
      expect(entry.sourceMode).toBe("official-archive-copy");
      expect(entry.pdfUrl).toBe(raw.pdfUrl);
      expect(examSourcePdfUrl(entry)).toBe(raw.archiveSourceUrl);
    }
  });

  it.each(archiveEntries)("uses the saved PDF in the complete $id page and revealed answer", async (raw) => {
    const entry = EXAM_CATALOG.find((candidate) => candidate.id === raw.id)!;
    const question = loadExamPaper(entry.id)![0];
    render(await ExamPage({ params: Promise.resolve({ id: entry.id }) }));
    expect(screen.getByRole("link", { name: /この回の公表PDFの保存コピー/ }))
      .toHaveAttribute("href", raw.archiveSourceUrl);
    if (question.answerAuthority === "descriptive") {
      fireEvent.click(screen.getByRole("button", { name: "模範解答を見る" }));
    } else {
      fireEvent.click(screen.getAllByRole("radio")[0]);
    }
    const page = question.sourcePages?.[0];
    expect(screen.getByRole("link", { name: /公表PDFの保存コピーで問1を確認/ }))
      .toHaveAttribute("href", `${raw.archiveSourceUrl}${page ? `#page=${page}` : ""}`);
    expect(document.querySelector(`a[href^="${raw.pdfUrl}"]`)).toBeNull();
  });

  it("keeps current official sources on their official PDF", () => {
    const entry = EXAM_CATALOG.find((candidate) => candidate.id === "cskohyo-CS20251901")!;
    expect(entry.sourceMode).toBe("official-pdf");
    expect(examSourcePdfUrl(entry)).toBe(entry.pdfUrl);
  });

  it.each([
    undefined,
    "https://example.com/copy.pdf",
    "http://osh-lab.com/wp-content/uploads/2022/06/d9a26c02229b365fb9bf8dd2d81c7d37.pdf",
    "https://osh-lab.com.evil.example/wp-content/uploads/2022/06/d9a26c02229b365fb9bf8dd2d81c7d37.pdf",
    "javascript:alert(1)",
  ])("rejects an unreviewed archive destination: %s", (archiveSourceUrl) => {
    expect(parseExamCatalogEntry({ ...archiveEntries[0], archiveSourceUrl })).toBeNull();
  });

  it("rejects archive mode outside the reviewed year", () => {
    expect(parseExamCatalogEntry({ ...archiveEntries[0], id: "cskohyo-CS20221901" })).toBeNull();
  });
});
