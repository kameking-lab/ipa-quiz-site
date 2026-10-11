import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import sharp from "sharp";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { SecondaryReader } from "@/components/denken1/SecondaryReader";
import { SECONDARY_QUESTIONS, getSecondaryQuestion, secondaryQuestionPath, secondarySitemapPaths } from "@/lib/denken1/secondary";
import { DENKEN1_NATIVE_QUESTIONS, DENKEN1_PUBLISHED_ORIGINAL_COUNT } from "@/lib/denken1/native";
import { LS_KEYS } from "@/lib/storage/keys";
import { renderExamsSitemapXml } from "@/lib/seo/sitemap-xml";

beforeEach(() => localStorage.clear());
afterEach(cleanup);

describe("Denken1 secondary originals, latest two sittings", () => {
  it("counts 20 written originals separately from 39 published primary originals", () => {
    expect(SECONDARY_QUESTIONS).toHaveLength(20);
    expect(SECONDARY_QUESTIONS.reduce((sum, q) => sum + q.requestedSubparts.length, 0)).toBe(76);
    expect(SECONDARY_QUESTIONS.reduce((sum, q) => sum + q.solutions.length, 0)).toBe(78);
    expect(new Set(SECONDARY_QUESTIONS.map(q => q.id)).size).toBe(20);
    expect(DENKEN1_NATIVE_QUESTIONS.length).toBeGreaterThanOrEqual(36);
    expect(DENKEN1_PUBLISHED_ORIGINAL_COUNT).toBeGreaterThanOrEqual(39);
    for (const year of [2025, 2024]) {
      expect(SECONDARY_QUESTIONS.filter(q => q.year === year && q.subject === "power-management").map(q => q.number)).toEqual([1, 2, 3, 4, 5, 6]);
      expect(SECONDARY_QUESTIONS.filter(q => q.year === year && q.subject === "machine-control").map(q => q.number)).toEqual([1, 2, 3, 4]);
      expect(new Set(SECONDARY_QUESTIONS.filter(q => q.year === year).map(q => q.examDate))).toEqual(new Set([year === 2025 ? "2025-11-16" : "2024-11-10"]));
    }
    for (const q of SECONDARY_QUESTIONS) {
      expect([...new Set(q.solutions.flatMap(part => part.covers))].sort((a, b) => a - b)).toEqual(q.requestedSubparts);
      expect(q).not.toHaveProperty("choices");
      expect(q).not.toHaveProperty("correctIndex");
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.shiken\.or\.jp\/chief\/upload\//);
      expect(q.answerPdfUrl).toMatch(/^https:\/\/www\.shiken\.or\.jp\/chief\/upload\//);
    }
    expect(getSecondaryQuestion(2026, "power-management", 1)).toBeUndefined();
    expect(getSecondaryQuestion(2025, "machine-control", 5)).toBeUndefined();
  });


  it("binds each original to the independently read official page and subpart manifest", () => {
    const manifest = JSON.parse(readFileSync(join(process.cwd(), "docs/evidence/denken1-secondary-latest-two-20261011/EXACT-SOURCE-MANIFEST.json"), "utf8")) as Array<{ id: string; requestedSubparts: number[]; questionPhysicalPages: number[]; answerPhysicalPages: number[] }>;
    expect(manifest).toHaveLength(20);
    for (const expected of manifest) {
      const q = SECONDARY_QUESTIONS.find(item => item.id === expected.id)!;
      expect(q.requestedSubparts).toEqual(expected.requestedSubparts);
      expect(q.sourcePages.map(page => page.physicalPage)).toEqual(expected.questionPhysicalPages);
      expect(q.answerPages.map(page => page.physicalPage)).toEqual(expected.answerPhysicalPages);
    }
    const waveform = getSecondaryQuestion(2024, "machine-control", 3)!;
    expect(waveform.solutions[0]!.answer).toContain("α・βをそのまま用いる");
    expect(waveform.solutions[0]!.answer).not.toContain("π/5");
    expect(getSecondaryQuestion(2025, "machine-control", 4)!.solutions[2]!.answer).toContain("共通因子を消去");
  });

  it("matches every rendered official page to its recorded hash and dimensions", async () => {
    const pages = new Map(SECONDARY_QUESTIONS.flatMap(q => [...q.sourcePages, ...q.answerPages]).map(p => [p.url, p]));
    expect(pages.size).toBe(60);
    for (const page of pages.values()) {
      const bytes = readFileSync(join(process.cwd(), "public", page.url.slice(1)));
      expect(createHash("sha256").update(bytes).digest("hex")).toBe(page.sha256);
      const meta = await sharp(bytes).metadata();
      expect(meta.format).toBe("jpeg");
      expect([meta.width, meta.height]).toEqual([page.width, page.height]);
    }
  });

  it("keeps draft answers private until reveal and restores local notes and review status", () => {
    const q = SECONDARY_QUESTIONS[0]!;
    const part = q.requestedSubparts[0]!;
    const inputName = `小問（${part}）の解答`;
    const first = render(<SecondaryReader question={q} />);
    expect(screen.queryByRole("heading", { name: "小問ごとの解答と考え方" })).not.toBeInTheDocument();
    expect(screen.getAllByRole("textbox")).toHaveLength(q.requestedSubparts.length);
    fireEvent.change(screen.getByLabelText(inputName), { target: { value: "式と計算過程を記入" } });
    expect(localStorage.getItem(`${LS_KEYS.denken1WrittenPrefix}${q.id}`)).toContain("式と計算過程を記入");
    fireEvent.click(screen.getByRole("button", { name: "公式標準解答と解説を確認する" }));
    expect(screen.getByRole("heading", { name: "小問ごとの解答と考え方" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "要復習" }));
    first.unmount();
    render(<SecondaryReader question={q} />);
    expect(screen.getByLabelText(inputName)).toHaveValue("式と計算過程を記入");
    fireEvent.click(screen.getByRole("button", { name: "公式標準解答と解説を確認する" }));
    expect(screen.getByRole("button", { name: "要復習" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("link", { name: "公式問題PDF" })).toHaveAttribute("href", q.sourcePdfUrl);
  });

  it("hides prior answers and drafts when the reader receives the next original", () => {
    const first = SECONDARY_QUESTIONS[0]!;
    const second = SECONDARY_QUESTIONS[1]!;
    expect(second.id).not.toBe(first.id);
    const view = render(<SecondaryReader question={first} />);
    fireEvent.change(screen.getByLabelText(`小問（${first.requestedSubparts[0]}）の解答`), { target: { value: "前問の下書き" } });
    fireEvent.click(screen.getByRole("button", { name: "公式標準解答と解説を確認する" }));
    expect(screen.getByRole("heading", { name: "小問ごとの解答と考え方" })).toBeInTheDocument();
    view.rerender(<SecondaryReader question={second} />);
    expect(screen.queryByRole("heading", { name: "小問ごとの解答と考え方" })).not.toBeInTheDocument();
    expect(screen.getByLabelText(`小問（${second.requestedSubparts[0]}）の解答`)).toHaveValue("");
    expect(screen.getByRole("button", { name: "公式標準解答と解説を確認する" })).toHaveAttribute("aria-expanded", "false");
  });

  it("includes all 20 question routes and the secondary index in the sitemap", () => {
    const paths = secondarySitemapPaths();
    expect(paths).toHaveLength(21);
    expect(new Set(paths).size).toBe(21);
    const xml = renderExamsSitemapXml();
    for (const path of paths) expect(xml).toContain(path);
    expect(secondaryQuestionPath(SECONDARY_QUESTIONS[0]!)).toMatch(/^\/denken1\/secondary\/202[45]\/(power-management|machine-control)\/q[1-6]$/);
  });
});
