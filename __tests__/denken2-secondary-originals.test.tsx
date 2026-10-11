import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import sharp from "sharp";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { SecondaryReader } from "@/components/denken2/SecondaryReader";
import { SECONDARY_QUESTIONS, getSecondaryQuestion, secondaryQuestionPath, secondarySitemapPaths } from "@/lib/denken2/secondary";
import { NATIVE_QUESTIONS, getNativeQuestion } from "@/lib/denken2/native";
import { DENKEN2_QUESTIONS } from "@/data/questions/denken2";
import { renderExamsSitemapXml } from "@/lib/seo/sitemap-xml";

beforeEach(() => localStorage.clear());
afterEach(cleanup);

describe("Denken2 written originals, latest two sittings", () => {
  it("counts 20 originals once, separately from 83 top-level subparts and primary originals", () => {
    expect(SECONDARY_QUESTIONS).toHaveLength(20);
    expect(new Set(SECONDARY_QUESTIONS.map(q => q.id)).size).toBe(20);
    expect(SECONDARY_QUESTIONS.reduce((sum, q) => sum + q.requestedSubparts.length, 0)).toBe(83);
    for (const year of [2025, 2024]) {
      expect(SECONDARY_QUESTIONS.filter(q => q.year === year && q.subject === "power-management").map(q => q.number)).toEqual([1, 2, 3, 4, 5, 6]);
      expect(SECONDARY_QUESTIONS.filter(q => q.year === year && q.subject === "machine-control").map(q => q.number)).toEqual([1, 2, 3, 4]);
      expect(new Set(SECONDARY_QUESTIONS.filter(q => q.year === year).map(q => q.examDate))).toEqual(new Set([year === 2025 ? "2025-11-16" : "2024-11-10"]));
    }
    for (const q of SECONDARY_QUESTIONS) {
      expect([...new Set(q.solutions.flatMap(part => part.covers))].sort((a, b) => a - b)).toEqual(q.requestedSubparts);
      expect(q).not.toHaveProperty("choices");
      expect(q).not.toHaveProperty("correctIndex");
    }
    expect(NATIVE_QUESTIONS).toHaveLength(43);
    expect(DENKEN2_QUESTIONS).toHaveLength(70); // 14 primary originals; blank drills are not original counts.
    for (const number of [3, 5, 6]) expect(getNativeQuestion(2025, "law", number)).toBeUndefined();
    expect(getSecondaryQuestion(2026, "machine-control", 1)).toBeUndefined();
    expect(getSecondaryQuestion(2025, "machine-control", 5)).toBeUndefined();
  });

  it("pins official source hashes and physical question/answer page boundaries", () => {
    const expected = {
      "2025-power-management": { hash: "b35d4eb94e3b7024761c72d9af58108f0e9bfa6160f9e659c0b50bed8a0bdaad", questions: [[3,4],[5,6],[7],[8],[9,10],[11]], answers: [[1],[2],[3,4],[5],[6],[7]] },
      "2025-machine-control": { hash: "7f881a1fa861b4b7d0fb83799bfe7a06d5a2bb1c713552c2b2b80206f98b2ba2", questions: [[3,4],[5],[6,7],[8]], answers: [[8,9],[10,11],[12,13],[14,15,16]] },
      "2024-power-management": { hash: "c40ff2a55d9249d9b7b763e19c8918260adc7b5e362e373186e6d6346a112a6f", questions: [[3],[4],[5,6],[7,8],[9],[10]], answers: [[1],[1,2],[2],[3,4],[5],[6]] },
      "2024-machine-control": { hash: "e753df68e0492fff7b0adef043957c8363f00a4f1b8cd5e59886a80c1470fd69", questions: [[3],[4],[5,6],[7,8]], answers: [[7],[8,9],[10,11],[12,13,14]] },
    };
    for (const [group, source] of Object.entries(expected)) {
      const questions = SECONDARY_QUESTIONS.filter(q => `${q.year}-${q.subject}` === group);
      expect(questions.map(q => q.sourcePages.map(p => p.physicalPage))).toEqual(source.questions);
      expect(questions.map(q => q.answerPages.map(p => p.physicalPage))).toEqual(source.answers);
      for (const q of questions) {
        expect(q.sourcePdfSha256).toBe(source.hash);
        expect(q.answerPdfSha256).toBe(q.year === 2025 ? "25e98f20db905f395b096c45abb8dc557b7f4533717d0e289012aa77048841df" : "ec35151ff401889cb4b4c17fce21b85d466923c32595786d9723a6c9bd977906");
      }
    }
  });

  it("has all 59 rendered source pages byte-identical and decodable", async () => {
    const pages = new Map(SECONDARY_QUESTIONS.flatMap(q => [...q.sourcePages, ...q.answerPages]).map(p => [p.url, p]));
    expect(pages.size).toBe(59);
    for (const page of pages.values()) {
      const bytes = readFileSync(join(process.cwd(), "public", page.url.slice(1)));
      expect(createHash("sha256").update(bytes).digest("hex")).toBe(page.sha256);
      const meta = await sharp(bytes).metadata();
      expect(meta.format).toBe("jpeg");
      expect([meta.width, meta.height]).toEqual([page.width, page.height]);
    }
  });

  it("keeps the corrected induction current, phase labels and step-input explanation", () => {
    const induction = getSecondaryQuestion(2024, "power-management", 3)!;
    const answer = induction.solutions.find(part => part.covers.includes(3))!;
    expect(answer.answer).toBe("許容地絡電流342 A");
    expect(430 / (2 * 3.14 * 50 * .005 * .8)).toBeCloseTo(342.3566879, 6);
    const sync = getSecondaryQuestion(2025, "machine-control", 1)!;
    expect(sync.solutions[0].answer).toContain("(b)θ、(c)δ");
    const control = getSecondaryQuestion(2025, "machine-control", 4)!;
    expect(control.solutions.find(part => part.covers.includes(5))!.explanation).toContain("単位ステップ入力");
    expect(1 - 2 / 3 * .3679 - 1 / 3 * .3679 ** 4).toBeCloseTo(.7486267555, 9);
  });

  it("reveals written solutions only on request and restores local notes and review status", () => {
    const q = getSecondaryQuestion(2024, "power-management", 3)!;
    const first = render(<SecondaryReader question={q} next="/denken2/secondary/2024/power-management/q4" />);
    expect(screen.queryByText("許容地絡電流342 A")).not.toBeInTheDocument();
    expect(screen.getAllByRole("textbox")).toHaveLength(3);
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("小問（3）の解答"), { target: { value: "430/(2πfMD) = 342 A" } });
    fireEvent.click(screen.getByRole("button", { name: "公式標準解答と解説を確認する" }));
    expect(screen.getByText("許容地絡電流342 A")).toBeInTheDocument();
    expect(screen.getByText("自動採点は行いません。", { exact: false })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "要復習" }));
    first.unmount();
    render(<SecondaryReader question={q} />);
    expect(screen.getByLabelText("小問（3）の解答")).toHaveValue("430/(2πfMD) = 342 A");
    fireEvent.click(screen.getByRole("button", { name: "公式標準解答と解説を確認する" }));
    expect(screen.getByRole("button", { name: "要復習" })).toHaveAttribute("aria-pressed", "true");
  });

  it("includes every written route in the exams sitemap and uses the question source links", () => {
    const paths = secondarySitemapPaths();
    expect(paths).toHaveLength(21);
    expect(new Set(paths).size).toBe(21);
    const xml = renderExamsSitemapXml();
    for (const path of paths) expect(xml).toContain(path);
    const q = getSecondaryQuestion(2025, "machine-control", 4)!;
    render(<SecondaryReader question={q} />);
    expect(screen.getByRole("link", { name: "公式問題PDF" })).toHaveAttribute("href", q.sourcePdfUrl);
    expect(secondaryQuestionPath(q)).toBe("/denken2/secondary/2025/machine-control/q4");
  });
});
