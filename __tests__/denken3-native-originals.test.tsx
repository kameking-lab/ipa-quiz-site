import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import { NativeReader } from "@/components/denken2/NativeReader";
import { DENKEN3_QUESTIONS } from "@/data/questions/denken3";
import {
  DENKEN3_NATIVE_PARTS, DENKEN3_NATIVE_QUESTIONS, DENKEN3_NATIVE_SUBJECTS, DENKEN3_NEW_ORIGINAL_COUNT,
  DENKEN3_PUBLISHED_ORIGINAL_COUNT, denken3NativeQuestionPaths, getDenken3NativeQuestion,
} from "@/lib/denken3/native";
import { renderExamsSitemapXml } from "@/lib/seo/sitemap-xml";
import powerFollowProof from "@/docs/evidence/denken3-lower-power-native9-20261010/INTEGRATION.json";
import lineEndingProof from "@/docs/evidence/next75-line-ending-reconciliation-20261010.json";

describe("Denken3 reviewed native originals", () => {
  it("keeps legacy units and counts the sixty-five 2025 lower native overlaps once", () => {
    expect(DENKEN3_QUESTIONS).toHaveLength(320);
    expect(DENKEN3_NATIVE_PARTS.map(p => `${p.sitting}:${p.subject}:${p.questions.length}:${p.questions.reduce((n, q) => n + q.slots.length, 0)}`))
      .toEqual(["2026-upper:theory:18:22", "2026-upper:power:8:8", "2026-upper:law:5:5", "2025-lower:law:5:5", "2026-upper:power:9:12", "2026-upper:machine:8:8", "2026-upper:law:3:6", "2025-lower:law:3:5", "2025-lower:power:7:7", "2026-upper:machine:10:14", "2025-lower:theory:18:22", "2025-lower:machine:18:22", "2025-lower:power:9:12", "2025-lower:law:5:6", "2026-upper:law:4:4"]);
    expect(DENKEN3_NATIVE_QUESTIONS).toHaveLength(130);
    expect(DENKEN3_NATIVE_QUESTIONS.reduce((n, q) => n + q.slots.length, 0)).toBe(158);
    expect(DENKEN3_NATIVE_SUBJECTS.map(p => `${p.sitting}:${p.subject}:${p.questions.length}`))
      .toEqual(["2026-upper:theory:18", "2026-upper:power:17", "2026-upper:law:12", "2025-lower:law:13", "2026-upper:machine:18", "2025-lower:power:16", "2025-lower:theory:18", "2025-lower:machine:18"]);
    expect(DENKEN3_NEW_ORIGINAL_COUNT).toBe(65);
    expect(DENKEN3_PUBLISHED_ORIGINAL_COUNT).toBe(329);
    expect(getDenken3NativeQuestion("2026-upper", "law", 10)).toBeUndefined();
    expect(getDenken3NativeQuestion("2025-lower", "power", 1)).toBeUndefined();
    for (const [filename, digest] of Object.entries({
      "native-2026-upper-theory.json": "af5caaca4b8c472ab2284b1f3db3699b1f4bc8bb09bd897b80ed0a5be0b8cbd7",
      "native-2026-upper-power.json": "685c5bacaac1a5723419bc1a6356874c5a6fbca2039ec97c58ed7b05cd8889fa",
      "native-2026-upper-law.json": "ba655e87f4da67592ac843352a48fd6b64658d936f5ec1c54434491594d5a8d9",
      "native-2025-lower-law.json": "00801e99aa5c5be49b65381548a5eaa52a4b9a96ba6e83bf3eb6ad690e0405b0",
    })) {
      const path = `data/questions/denken3/${filename}`;
      const bytes = readFileSync(join(process.cwd(), path));
      const recorded = lineEndingProof.files.find(file => file.path === path)!;
      expect(recorded.originalWorkingSha256).toBe(digest);
      expect(createHash("sha256").update(bytes.toString("utf8").replace(/\r\n/g, "\n")).digest("hex"))
        .toBe(recorded.gitBlobSha256);
    }
  });

  it("preserves every printed choice, both B-part stems, and the Q17/Q18 alternative rule", () => {
    for (const q of DENKEN3_NATIVE_QUESTIONS) {
      expect(q.slots).toHaveLength((q.subject === "theory" || q.subject === "machine") && q.number >= 15 || q.subject === "power" && q.number >= 15 || q.subject === "law" && q.number >= 11 ? 2 : 1);
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
    const machine = getDenken3NativeQuestion("2026-upper", "machine", 8)!;
    expect(machine.sourcePages[0]?.sha256).toMatch(/^[a-f0-9]{64}$/);
    expect(Object.keys(machine.slots[0]!.choiceExplanations)).toHaveLength(5);
  });

  it("matches and decodes all official page images, and indexes only GO routes", async () => {
    const pages = new Map(DENKEN3_NATIVE_QUESTIONS.flatMap(q => q.sourcePages.map(p => [p.url, p] as const)));
    expect(pages.size).toBe(153);
    for (const page of pages.values()) {
      const data = readFileSync(join(process.cwd(), "public", page.url.slice(1)));
      expect(createHash("sha256").update(data).digest("hex")).toBe(page.sha256);
      const image = await sharp(data).metadata();
      expect(["jpeg", "png"]).toContain(image.format);
      expect(image.width).toBeGreaterThan(300);
    }
    const routes = denken3NativeQuestionPaths();
    expect(routes).toHaveLength(130);
    const xml = renderExamsSitemapXml();
    for (const path of routes) expect(xml).toContain(path);
    for (const number of [4, 6, 7, 9]) expect(xml).toContain(`/denken3/2026-upper/law/q${number}</loc>`);
    expect(xml).not.toContain("/denken3/2026-upper/law/q10</loc>");
    expect(xml).not.toContain("/denken3/2025-lower/power/q1</loc>");
  });
  it("uses the corrected machine Q15 key and keeps each theory/machine alternative unanswered", () => {
    expect(getDenken3NativeQuestion("2026-upper", "machine", 15)?.slots.map(field => field.officialAnswer)).toEqual(["3", "3"]);
    for (const sitting of ["2026-upper", "2025-lower"] as const) {
      for (const subject of ["theory", "machine"] as const) {
        const questions = DENKEN3_NATIVE_QUESTIONS.filter(q => q.sitting === sitting && q.subject === subject);
        expect(questions).toHaveLength(18);
        expect(questions.reduce((sum, q) => sum + q.slots.length, 0)).toBe(22);
        expect(questions.filter(q => q.alternateQuestionRule).map(q => q.number)).toEqual([17, 18]);
        const q = questions.find(item => item.number === 17)!;
        const part = DENKEN3_NATIVE_PARTS.find(item => item.sitting === sitting && item.subject === subject)!;
        const doc = new DOMParser().parseFromString(renderToStaticMarkup(<NativeReader question={q} readerConfig={{
          examName: "電験三種", examPath: "/denken3", editionSlug: sitting, editionLabel: sitting,
          sourceAnswerUrl: part.sourceAnswerUrl, sourceIndexUrl: part.sourceIndexUrl,
        }} />), "text/html");
        expect(doc.querySelectorAll("select")).toHaveLength(2);
        expect([...doc.querySelectorAll("select")].every(select => select.value === "")).toBe(true);
        expect(doc.body.textContent).toContain("選択問題の一方だけを本試験で解答します");
        expect(doc.body.textContent).not.toContain("公式正答：");
      }
    }
  });
  it("reuses nine accepted lower power originals without changing old native or legacy data", () => {
    for (const [path, digest] of Object.entries(powerFollowProof.old112NativeAnd320LegacyFilesGitBlobSha256)) {
      const content = readFileSync(join(process.cwd(), path), "utf8").replace(/\r\n/g, "\n");
      expect(createHash("sha256").update(content).digest("hex")).toBe(digest);
    }
    const added = DENKEN3_NATIVE_QUESTIONS.filter(q => q.sitting === "2025-lower" && q.subject === "power" && q.number >= 9);
    expect(added.map(q => q.number)).toEqual([9, 10, 11, 12, 13, 14, 15, 16, 17]);
    expect(added.reduce((sum, q) => sum + q.slots.length, 0)).toBe(12);
    for (const q of added) {
      const saved = JSON.parse(readFileSync(join(process.cwd(), `data/questions/denken3/reviewed/20260322-power-q${String(q.number).padStart(2, "0")}-${String(q.number).padStart(2, "0")}.json`), "utf8")) as Array<{ question: string; choices: Record<string, string>; officialAnswer: string; explanation: string; choiceExplanations: Record<string, string>; part?: string }>;
      expect(q.questionText).toBe([...new Set(saved.map(item => item.question))].join("\n\n"));
      expect(q.alternateQuestionRule).toBeNull();
      for (const [index, original] of saved.entries()) {
        const field = q.slots[index]!;
        expect(field.officialAnswer).toBe(original.officialAnswer);
        expect(field.explanation).toBe(original.explanation);
        expect(field.choiceExplanations).toEqual(original.choiceExplanations);
        expect(saved.length === 1 ? q.choiceGroups : q.choiceGroups[`(${original.part})`]).toEqual(original.choices);
        expect(field.prompt).toBe(saved.length === 1 ? "" : original.question);
      }
      const doc = new DOMParser().parseFromString(renderToStaticMarkup(<NativeReader question={q} readerConfig={{
        examName: "電験三種", examPath: "/denken3", editionSlug: "2025-lower", editionLabel: "2025年度下期",
        sourceAnswerUrl: "https://www.shiken.or.jp/chief/upload/20260322_ch_third_a01.pdf", sourceIndexUrl: "https://www.shiken.or.jp/chief/third/qa/",
      }} />), "text/html");
      expect(doc.querySelectorAll("select")).toHaveLength(saved.length);
      expect([...doc.querySelectorAll("select")].every(select => select.value === "")).toBe(true);
      expect(doc.body.textContent).not.toContain("公式正答：");
      expect(doc.body.textContent).not.toContain("選択問題の一方だけを本試験で解答します");
      expect(doc.querySelector(`img[src="${q.sourcePages[0]!.url}"]`)).not.toBeNull();
    }
  });
});
