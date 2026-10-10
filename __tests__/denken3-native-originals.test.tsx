import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import { NativeReader } from "@/components/denken2/NativeReader";
import { DENKEN3_QUESTIONS } from "@/data/questions/denken3";
import {
  DENKEN3_NATIVE_PARTS, DENKEN3_NATIVE_QUESTIONS, DENKEN3_NEW_ORIGINAL_COUNT,
  DENKEN3_PUBLISHED_ORIGINAL_COUNT, denken3NativeQuestionPaths, getDenken3NativeQuestion,
} from "@/lib/denken3/native";
import { renderExamsSitemapXml } from "@/lib/seo/sitemap-xml";

describe("Denken3 reviewed native originals", () => {
  it("keeps legacy units and counts the five 2025 lower law overlaps once", () => {
    expect(DENKEN3_QUESTIONS).toHaveLength(320);
    expect(DENKEN3_NATIVE_PARTS.map(p => `${p.sitting}:${p.subject}:${p.questions.length}:${p.questions.reduce((n, q) => n + q.slots.length, 0)}`))
      .toEqual(["2026-upper:theory:18:22", "2026-upper:power:8:8", "2026-upper:law:5:5", "2025-lower:law:5:5"]);
    expect(DENKEN3_NATIVE_QUESTIONS).toHaveLength(36);
    expect(DENKEN3_NEW_ORIGINAL_COUNT).toBe(31);
    expect(DENKEN3_PUBLISHED_ORIGINAL_COUNT).toBe(295);
    expect(getDenken3NativeQuestion("2026-upper", "law", 4)).toBeUndefined();
    expect(getDenken3NativeQuestion("2026-upper", "law", 6)).toBeUndefined();
    expect(getDenken3NativeQuestion("2026-upper", "law", 7)).toBeUndefined();
    expect(getDenken3NativeQuestion("2025-lower", "power", 1)).toBeUndefined();
  });

  it("preserves every printed choice, both B-part stems, and the Q17/Q18 alternative rule", () => {
    for (const q of DENKEN3_NATIVE_QUESTIONS) {
      expect(q.slots).toHaveLength(q.subject === "theory" && q.number >= 15 ? 2 : 1);
      for (const slot of q.slots) {
        expect(Object.keys(slot.choiceExplanations)).toHaveLength(5);
        expect(slot.choiceExplanations[slot.officialAnswer]).toBeTruthy();
      }
    }
    for (const number of [15, 16, 17, 18]) {
      const q = getDenken3NativeQuestion("2026-upper", "theory", number)!;
      expect(q.slots.every(slot => slot.prompt && Object.keys(slot.choiceExplanations).length === 5)).toBe(true);
      expect(Boolean(q.alternateQuestionRule)).toBe(number >= 17);
    }
    const q = getDenken3NativeQuestion("2026-upper", "theory", 17)!;
    const part = DENKEN3_NATIVE_PARTS[0]!;
    const doc = new DOMParser().parseFromString(renderToStaticMarkup(<NativeReader question={q} readerConfig={{
      examName: "電験三種", examPath: "/denken3", editionSlug: "2026-upper", editionLabel: "2026年度上期 一次試験",
      sourceAnswerUrl: part.sourceAnswerUrl, sourceIndexUrl: part.sourceIndexUrl,
    }} />), "text/html");
    expect(doc.querySelectorAll("select")).toHaveLength(2);
    expect(doc.body.textContent).toContain("選択問題の一方だけを本試験で解答します");
    expect(doc.body.textContent).not.toContain("正答：");
  });

  it("matches and decodes all official page images, and indexes only GO routes", async () => {
    const pages = new Map(DENKEN3_NATIVE_QUESTIONS.flatMap(q => q.sourcePages.map(p => [p.url, p] as const)));
    expect(pages.size).toBe(41);
    for (const page of pages.values()) {
      const data = readFileSync(join(process.cwd(), "public", page.url.slice(1)));
      expect(createHash("sha256").update(data).digest("hex")).toBe(page.sha256);
      const image = await sharp(data).metadata();
      expect(["jpeg", "png"]).toContain(image.format);
      expect(image.width).toBeGreaterThan(300);
    }
    const routes = denken3NativeQuestionPaths();
    expect(routes).toHaveLength(36);
    const xml = renderExamsSitemapXml();
    for (const path of routes) expect(xml).toContain(path);
    for (const number of [4, 6, 7]) expect(xml).not.toContain(`/denken3/2026-upper/law/q${number}`);
    expect(xml).not.toContain("/denken3/2025-lower/power/q1");
  });
});
