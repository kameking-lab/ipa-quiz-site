import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { ALL_QUESTIONS } from "@/data/questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQuestionById } from "@/lib/questions/load";
import { getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";
import { JOKASO_SETSUBISHI_STAGING as questions, JokasoSetsubishiStagingSchema as schema, validateJokasoSetsubishiStaging } from "../../scripts/lib/jokaso-setsubishi-staging";

// Independently transcribed from the rendered official answer tables, not from question JSON.
const answerRows = {
  2025: ["1344221443", "1212131121", "1432243243", "4221321323", "3144431343"],
  2026: ["4333232442", "3112224341", "2111141114", "1332331423", "2241444123"],
};

describe("CQ4 浄化槽設備士学科 private staging", () => {
  it("validates both complete rounds, all 400 choice explanations and all original crops", () => {
    expect(validateJokasoSetsubishiStaging()).toBe(100);
    for (const year of [2025, 2026] as const) {
      const round = questions.filter((q) => q.year === year);
      expect(round.map((q) => q.officialAnswerNumber).join("")).toBe(answerRows[year].join(""));
    }
  });

  it("rejects publication, source-edition, answer, text and image regressions", () => {
    const q = questions[0]!;
    for (const change of [
      { publicAllowed: true }, { publicationStatus: "live" },
      { officialAnswerNumber: 4 }, { question: `${q.question}変更` },
      { choices: { ...q.choices, "1": "別の選択肢" } },
      { choiceExplanations: { "1": "公式正答のとおり" } },
      { sourceAnswerUrl: questions[50]!.sourceAnswerUrl },
      { sourceImage: "images/2025-q02.webp" },
      { sourceImageSha256: "0".repeat(64) }, { lawReferenceDate: "2025-04-01" },
    ]) expect(schema.safeParse({ ...q, ...change }).success, JSON.stringify(change)).toBe(false);
  });

  it("retains original diagrams, inner labels, formulas and tables without relabelling statements as answer choices", () => {
    const find = (year: number, n: number) => questions.find((q) => q.year === year && q.qNumber === n)!;
    expect(find(2025, 4).sourceTable).toEqual([
      ["", "水量（m³/日）", "BOD濃度（mg/L）"], ["流入水 水洗便所汚水", "30", "260"],
      ["流入水 雑排水", "90", "180"], ["放流水", "120", "10"],
    ]);
    for (const [year, n] of [[2025, 7], [2025, 15], [2025, 34], [2026, 7], [2026, 17]]) {
      expect(find(year!, n!).requiresOriginalImage).toBe(true);
    }
    const inner = find(2026, 16);
    expect(inner.choices).toEqual({ "1": "ア、イ", "2": "ア、エ", "3": "イ、ウ", "4": "ウ、エ" });
    expect(Object.keys(inner.diagramExplanations ?? {})).toEqual(["ア", "イ", "ウ", "エ"]);
    expect(schema.safeParse({ ...inner, diagramExplanations: undefined }).success).toBe(false);
    expect(find(2026, 12).choices["1"]).toBe("V_A = V × (100 − P)/(100 − P_A)");
    expect(find(2025, 48).choices["3"]).toContain("温度の上昇");
    expect(find(2026, 47).choices["4"]).toContain("800コロニー形成単位");
  });

  it("never exposes the new qualification in public question registries, config or ID lookup", () => {
    expect(getRegisteredExamCodes()).not.toContain("jokaso-setsubishi");
    expect(EXAM_CONFIGS).not.toHaveProperty("jokaso-setsubishi");
    expect(ALL_QUESTIONS.some((q) => q.id.startsWith("jokaso-setsubishi-"))).toBe(false);
    for (const q of questions) {
      expect(getQuestionById(q.id)).toBeUndefined();
      expect(q.publicAllowed).toBe(false);
      expect(existsSync(path.join(process.cwd(), "public", "images", "jokaso-setsubishi", path.basename(q.sourceImage)))).toBe(false);
    }
    const entries = QUALIFICATION_CATALOG.filter((q) => q.slug === "jokaso-setsubishi");
    expect(entries).toHaveLength(1);
    expect(entries[0]!.examCode).toBeUndefined();
    expect(entries[0]!.status).not.toBe("live");
    // Public runtime modules must not gain imports of private staging files.
    for (const file of ["data/questions/index.ts", "lib/questions/get-questions.ts", "lib/questions/load.ts"]) {
      expect(readFileSync(file, "utf8")).not.toContain("jokaso-setsubishi");
    }
  });
});
