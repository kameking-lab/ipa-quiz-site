import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import { NativeReader } from "@/components/denken2/NativeReader";
import { DENKEN2_QUESTIONS } from "@/data/questions/denken2";
import {
  NATIVE_EDITIONS, NATIVE_QUESTIONS, getNativeQuestion, nativeQuestionPaths,
} from "@/lib/denken2/native";
import { renderExamsSitemapXml } from "@/lib/seo/sitemap-xml";

describe("Denken2 native original boundary", () => {
  it("keeps the 2026 power/law 14 originals and 70 blank quizzes while adding 16+16 native originals", () => {
    expect(DENKEN2_QUESTIONS).toHaveLength(70);
    expect(new Set(DENKEN2_QUESTIONS.map(q => `${q.session}:${q.qNumber}`)).size).toBe(14);
    expect(NATIVE_EDITIONS.map(item => item.year)).toEqual([2026, 2025]);
    expect(NATIVE_QUESTIONS).toHaveLength(32);
    expect(NATIVE_EDITIONS.map(item => item.questions.reduce(
      (sum, q) => sum + (q.year === 2026 && q.subject === "machine" && q.number === 7 ? 10 : 5), 0,
    ))).toEqual([85, 80]);
    expect(new Set(NATIVE_QUESTIONS.map(q => q.id)).size).toBe(32);
  });

  it("preserves machine 2026 Q7 as one original with A/B/C tables and ten answer inputs", () => {
    const q = getNativeQuestion(2026, "machine", 7)!;
    expect(Object.keys(q.choiceGroups)).toHaveLength(3);
    expect(Object.keys(q.choiceGroups)).toEqual(["A（測光量）", "B（定義）", "C（単位）"]);
    const doc = new DOMParser().parseFromString(renderToStaticMarkup(<NativeReader question={q} />), "text/html");
    expect(doc.querySelectorAll('[aria-label="原本の表と解答群"] table')).toHaveLength(3);
    expect(doc.querySelectorAll('select')).toHaveLength(10);
    expect(doc.body.textContent).not.toContain("公式正答：");
    expect(doc.querySelectorAll('[aria-label="公式問題原本画像"] img').length).toBeGreaterThan(0);
  });

  it("uses five independent five-choice banks for machine 2025 Q8", () => {
    const q = getNativeQuestion(2025, "machine", 8)!;
    expect(Object.keys(q.choiceGroups)).toEqual(["1", "2", "3", "4", "5"]);
    const doc = new DOMParser().parseFromString(renderToStaticMarkup(<NativeReader question={q} />), "text/html");
    expect(doc.querySelectorAll('[aria-label="原本の表と解答群"] table')).toHaveLength(5);
    expect(doc.querySelectorAll("select")).toHaveLength(5);
    expect([...doc.querySelectorAll("select")].every(select => select.options.length === 6)).toBe(true);
  });

  it("has every source image byte-identical, decodable, and linked from native question routes", async () => {
    const pages = new Map(NATIVE_QUESTIONS.flatMap(q => q.sourcePages.map(page => [page.url, page] as const)));
    expect(pages.size).toBe(59);
    for (const page of pages.values()) {
      const data = readFileSync(join(process.cwd(), "public", page.url.slice(1)));
      expect(createHash("sha256").update(data).digest("hex")).toBe(page.sha256);
      const image = await sharp(data).metadata();
      expect(image.format).toBe("jpeg");
      expect(image.width).toBeGreaterThan(300);
      expect(image.height).toBeGreaterThan(300);
    }
    const routes = nativeQuestionPaths();
    expect(routes).toHaveLength(32);
    const sitemap = renderExamsSitemapXml();
    for (const route of routes) expect(sitemap).toContain(route);
  });
});
