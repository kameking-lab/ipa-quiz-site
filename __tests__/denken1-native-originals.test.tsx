import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import Denken1Page from "@/app/denken1/page";
import { NativeReader } from "@/components/denken2/NativeReader";
import { DENKEN1_PRIMARY_QUESTIONS } from "@/data/questions/denken1";
import {
  DENKEN1_NATIVE_PARTS, DENKEN1_NATIVE_QUESTIONS,
  denken1NativeQuestionPaths, getDenken1NativeQuestion,
} from "@/lib/denken1/native";
import { renderExamsSitemapXml } from "@/lib/seo/sitemap-xml";

describe("Denken1 source-reviewed native originals", () => {
  it("keeps the 25 launch blanks and unique originals for all four subjects in six years", () => {
    expect(DENKEN1_PRIMARY_QUESTIONS).toHaveLength(25);
    expect(new Set(DENKEN1_NATIVE_PARTS.map(p => p.year))).toEqual(new Set([2021, 2022, 2023, 2024, 2025, 2026]));
    expect(new Set(DENKEN1_NATIVE_PARTS.map(p => `${p.year}:${p.subject}`)).size).toBe(24);
    expect(DENKEN1_NATIVE_QUESTIONS).toHaveLength(153);
    expect(new Set(DENKEN1_NATIVE_QUESTIONS.map(q => q.id)).size).toBe(153);
    expect(getDenken1NativeQuestion(2026, "theory", 4)).toBeDefined();
    expect(getDenken1NativeQuestion(2025, "law", 1)).toBeDefined();
    expect(getDenken1NativeQuestion(2026, "law", 1)).toBeUndefined();
  });

  it("preserves the original choice banks, alternative rules, and per-choice reasons", () => {
    const theory = getDenken1NativeQuestion(2026, "theory", 5)!;
    expect(theory.slots).toHaveLength(6);
    expect(Object.keys(theory.choiceGroups)).toHaveLength(18);
    expect(theory.slots.every(slot => Object.keys(slot.choiceExplanations ?? {}).length === 18)).toBe(true);
    expect(getDenken1NativeQuestion(2025, "theory", 7)?.slots).toHaveLength(6);
    for (const year of [2025, 2026]) {
      expect(getDenken1NativeQuestion(year, "machine", 6)?.alternateQuestionRule).toBeTruthy();
      expect(getDenken1NativeQuestion(year, "machine", 7)?.alternateQuestionRule).toBeTruthy();
    }
    const part = DENKEN1_NATIVE_PARTS.find(p => p.year === 2026 && p.subject === "theory")!;
    const doc = new DOMParser().parseFromString(renderToStaticMarkup(<NativeReader question={theory} readerConfig={{
      examName: "電験一種", examPath: "/denken1", sourceAnswerUrl: part.sourceAnswerUrl, sourceIndexUrl: part.sourceIndexUrl,
    }} />), "text/html");
    expect(doc.querySelectorAll("select")).toHaveLength(6);
    expect(doc.body.textContent).not.toContain("公式正答：");
    expect(doc.querySelectorAll('img[src^="/images/denken1/"]')).toHaveLength(2);
    expect(doc.querySelectorAll("button")).toHaveLength(1);
  });

  it("uses ordinary blank labels for Denken1 machine Q7 despite its shared year and number", () => {
    const question = getDenken1NativeQuestion(2026, "machine", 7)!;
    const part = DENKEN1_NATIVE_PARTS.find(p => p.year === 2026 && p.subject === "machine")!;
    const doc = new DOMParser().parseFromString(renderToStaticMarkup(<NativeReader question={question} readerConfig={{
      examName: "電験一種", examPath: "/denken1", sourceAnswerUrl: part.sourceAnswerUrl, sourceIndexUrl: part.sourceIndexUrl,
    }} />), "text/html");
    expect(doc.body.textContent).toMatch(/文中の\s*□\s*に/);
    expect(doc.body.textContent).not.toMatch(/文中の\s*\(0\)\s*に/);
    expect([...doc.querySelectorAll("select")].map(select => select.getAttribute("aria-label")))
      .toEqual(question.slots.map(field => `空欄${field.slot}`));
    expect(doc.querySelectorAll('select[aria-label$="・定義"], select[aria-label$="・単位"]')).toHaveLength(0);
    expect(doc.body.textContent).not.toContain("公式正答：");
  });

  it("has byte-identical, decodable official images and an exact native sitemap", async () => {
    const pages = new Map(DENKEN1_NATIVE_QUESTIONS.flatMap(q => q.sourcePages.map(p => [p.url, p] as const)));
    expect(pages.size).toBe(272);
    for (const page of pages.values()) {
      const data = readFileSync(join(process.cwd(), "public", page.url.slice(1)));
      expect(createHash("sha256").update(data).digest("hex")).toBe(page.sha256);
      const decoded = await sharp(data).metadata();
      expect(["jpeg", "png"]).toContain(decoded.format);
      expect(decoded.width).toBeGreaterThan(300);
      expect(decoded.height).toBeGreaterThan(300);
    }
    const routes = denken1NativeQuestionPaths();
    expect(routes).toHaveLength(153);
    const xml = renderExamsSitemapXml();
    for (const route of routes) expect(xml).toContain(route);
    expect(xml).not.toContain("/denken1/2026-primary/law/q1</loc>");
  });

  it("links the available native subject indexes from the qualification hub", () => {
    const doc = new DOMParser().parseFromString(renderToStaticMarkup(<Denken1Page />), "text/html");
    expect(doc.body.textContent).toContain("153原問");
    expect(doc.querySelectorAll('#denken1-native-subjects ~ div a[href^="/denken1/"]')).toHaveLength(24);
  });
});
