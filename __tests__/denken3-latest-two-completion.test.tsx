import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import Denken3Page from "@/app/denken3/page";
import { DENKEN3_QUESTIONS } from "@/data/questions/denken3";
import { DENKEN3_LATEST_TWO_COVERAGE } from "@/lib/denken3/coverage";
import { DENKEN3_NATIVE_PARTS, getDenken3NativeQuestion } from "@/lib/denken3/native";
import integration from "@/docs/evidence/denken3-latest-two-20261011/integration.json";

const content = (path: string) => readFileSync(join(process.cwd(), path), "utf8");
const digest = (text: string | Buffer) => createHash("sha256").update(text).digest("hex");
// Source packet hashes use Python json.dumps(ensure_ascii=False, sort_keys=True).
const packetJson = (value: unknown): string => {
  if (Array.isArray(value)) return `[${value.map(packetJson).join(", ")}]`;
  if (value !== null && typeof value === "object") {
    return `{${Object.entries(value).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0)
      .map(([key, item]) => `${JSON.stringify(key)}: ${packetJson(item)}`).join(", ")}}`;
  }
  return JSON.stringify(value);
};
const legacyLabels: Record<string, string> = { "1": "ア", "2": "イ", "3": "ウ", "4": "エ", "5": "オ" };
type Reviewed = { question: string; part?: string; choices: Record<string, string>; officialAnswer: string;
  explanation: string; choiceExplanations: Record<string, string> };

describe("Denken3 latest two sittings completion", () => {
  it("provides the official missing-original route alongside accurate latest-sitting coverage", async () => {
    const page = await Denken3Page({ searchParams: Promise.resolve({}) });
    const doc = new DOMParser().parseFromString(renderToStaticMarkup(page), "text/html");
    const coverage = doc.querySelector('[aria-label="最新2回の収録状況"]')!;
    expect(coverage.textContent).toContain("2026年度上期（2026/08/30）：65/66原問");
    expect(coverage.textContent).toContain("2025年度下期（2026/03/22）：66/66原問");
    expect(coverage.querySelectorAll("li")).toHaveLength(2);
    expect(doc.querySelector('a[href="https://www.shiken.or.jp/chief/upload/20260830_ch_third_q04.pdf#page=16"]')).not.toBeNull();
    expect(doc.querySelector('a[href="https://www.shiken.or.jp/chief/upload/20260830_ch_third_a01.pdf"]')).not.toBeNull();
    expect(doc.body.textContent).toContain("全肢解説は未収録です");
    expect(doc.body.textContent).toContain("固有329原問");
  });
  it("counts each original once, requires both printed fields, and keeps both unresolved items visible", () => {
    expect(DENKEN3_LATEST_TWO_COVERAGE.map(q => [q.sitting, q.examDate, q.requiredOriginals,
      q.publishedOriginals, q.fullOriginals, q.requiredFields, q.publishedFields, q.fullFields]))
      .toEqual([
        ["2026-upper", "2026-08-30", 66, 65, 65, 80, 79, 79],
        ["2025-lower", "2026-03-22", 66, 66, 65, 80, 80, 79],
      ]);
    expect(DENKEN3_LATEST_TWO_COVERAGE.flatMap(q => q.missingOriginalIds)).toEqual(["denken3-2026-upper-law-q10"]);
    expect(DENKEN3_LATEST_TWO_COVERAGE.flatMap(q => q.incompleteOriginalIds)).toEqual(integration.remainingHolds);
    expect(DENKEN3_LATEST_TWO_COVERAGE.reduce((sum, q) => sum + q.publishedOriginals, 0)).toBe(131);
    expect(DENKEN3_LATEST_TWO_COVERAGE.reduce((sum, q) => sum + q.fullOriginals, 0)).toBe(130);
    expect(DENKEN3_LATEST_TWO_COVERAGE.filter(q => q.fullOriginals === q.requiredOriginals)).toHaveLength(0);
    const summary = DENKEN3_QUESTIONS.find(q => q.id === "denken3-2025-lower-power-q01")!;
    expect(summary.explanationCoverage).toBe("official-summary");
    expect(summary.choiceExplanations).toBeUndefined();
    expect(summary.officialAnswerNumber).toBe("3");
    expect(getDenken3NativeQuestion("2025-lower", "power", 1)).toBeUndefined();
    expect(getDenken3NativeQuestion("2026-upper", "law", 10)).toBeUndefined();
  });

  it("reuses all five accepted lower law originals and six fields without changing their explanations", () => {
    for (const binding of integration.lowerBindings) {
      const saved = JSON.parse(content(binding.reviewedPath)) as Reviewed[];
      const number = Number(binding.id.slice(-2));
      const q = getDenken3NativeQuestion("2025-lower", "law", number)!;
      expect(digest(content(binding.reviewedPath).replace(/\r\n/g, "\n")))
        .toBe(integration.reviewedLfSha256ByPath[binding.reviewedPath as keyof typeof integration.reviewedLfSha256ByPath]);
      expect(q.reviewedSha256).toBe(binding.reviewedSha256);
      expect(q.questionText).toBe([...new Set(saved.map(item => item.question))].join("\n\n"));
      expect(q.slots.map(slot => slot.officialAnswer)).toEqual(binding.officialAnswers);
      for (const [index, original] of saved.entries()) {
        const slot = q.slots[index]!;
        const bank = saved.length === 1 ? q.choiceGroups : q.choiceGroups[`(${original.part})`];
        expect(bank).toEqual(original.choices);
        expect(slot.explanation).toBe(original.explanation);
        expect(slot.choiceExplanations).toEqual(original.choiceExplanations);
        expect(slot.prompt).toBe(saved.length === 1 ? "" : original.question);
        const published = DENKEN3_QUESTIONS.find(item => item.year === 2025 && item.season === "second"
          && item.session === "houki" && item.qNumber === number && item.part === (original.part ?? undefined))!;
        expect(published.explanationCoverage).toBe("full");
        expect(published.question).toBe(original.question);
        expect(published.explanation).toBe(original.explanation);
        expect(published.answer).toBe(legacyLabels[original.officialAnswer]);
        for (const label of ["1", "2", "3", "4", "5"]) {
          const legacyLabel = legacyLabels[label] as keyof NonNullable<typeof published.choices>;
          expect(published.choices?.[legacyLabel]).toBe(original.choices[label]);
          expect(published.choiceExplanations?.[legacyLabel]).toBe(original.choiceExplanations[label]);
        }
      }
    }
    expect(getDenken3NativeQuestion("2025-lower", "law", 12)?.slots).toHaveLength(2);
    expect(getDenken3NativeQuestion("2025-lower", "law", 4)?.slots[0]?.explanation).toContain("対地電圧");
  });

  it("binds four upper originals and their twenty explanations to the official keys and dated primary text", () => {
    for (const [number, answer] of [[4, "3"], [6, "2"], [7, "4"], [9, "2"]] as const) {
      const q = getDenken3NativeQuestion("2026-upper", "law", number)!;
      expect(q.slots.map(slot => slot.officialAnswer)).toEqual([answer]);
      expect(Object.keys(q.slots[0]!.choiceExplanations).sort()).toEqual(["1", "2", "3", "4", "5"]);
      expect(q.slots[0]!.explanation).toContain("2026年4月1日");
      expect(q.slots[0]!.explanation).toContain("2025年11月20日改正版");
      expect(q.examDate).toBe("2026-08-30");
    }
    expect(getDenken3NativeQuestion("2026-upper", "law", 9)?.sourcePages.map(page => page.physicalPage)).toEqual([14, 15]);
    expect(getDenken3NativeQuestion("2026-upper", "law", 9)?.figures).toHaveLength(1);
    for (const [sitting, packetPath] of [
      ["2025-lower", "docs/evidence/denken3-latest-two-20261011/lower-reuse-packet.json"],
      ["2026-upper", "docs/evidence/denken3-latest-two-20261011/upper-source-packet.json"],
    ]) {
      const part = DENKEN3_NATIVE_PARTS.find(item => item.sitting === sitting && item.subject === "law"
        && item.questions.some(q => q.number === 4))!;
      expect(part.sourcePacketSha256).toBe(digest(packetJson(JSON.parse(content(packetPath!)))));
    }
    expect(digest(readFileSync(join(process.cwd(), "docs/evidence/denken3/input/review/meti-denki-interpretation-20251120.pdf"))))
      .toBe("7e0c8969263999fdfccf843d987ca8429ea2823aee1004e70471e6d4d812f7fd");
  });

  it("preserves every pre-existing published data file byte-for-byte after line-ending normalization", () => {
    for (const [path, sha256] of Object.entries(integration.oldPublishedFilesLfSha256)) {
      expect(digest(content(path).replace(/\r\n/g, "\n"))).toBe(sha256);
    }
  });
});
