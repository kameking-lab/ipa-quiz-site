import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { CHIIKI_RYOKO_STAGING, validateChiikiRyoko, validateChiikiRyokoRows } from "../../scripts/validate-chiiki-ryoko";

// Independently transcribed from the official 全科目 正解及び配点, in section order.
const answers = {
  2025: {
    hoki: "イエ アイウ エ エ ウ ア イ イ アイエ イ ウ ウ アイウ ア エ イ イ ウ アウ エ イ アイエ ウ イ エ",
    yakkan: "ウ ア ア ウ エ アエ ウ エ アイエ イウ エ ウ イ ア ウ ア エ ア イ ウ イ エ ア エ",
    jitsumu: "エ エ ウ ア イ ア ア エ ウ ウ",
  },
  2026: {
    hoki: "イウ エ イ ア ア ウ アイウ ウ イ ア アウエ イ エ イウ ア イ エ アウエ エ エ イ アウエ エ イ ア",
    yakkan: "エ ウ エ ア アイ ウ ウ エ エ イウエ ウ エ イ ア ウ ア ア エ エ イ ア イ エ エ",
    jitsumu: "ア ア エ イ ウ エ ウ エ ア エ",
  },
};

describe("chiiki-ryoko two private official sittings", () => {
  it("validates every question, explanation, original image and source pin", () => {
    expect(validateChiikiRyoko()).toBe(118);
    expect(validateChiikiRyoko(["ap"])).toBe(0);
  });

  it("matches all 118 official answers, including mandatory multi-selection", () => {
    for (const year of [2025, 2026] as const) {
      for (const session of ["hoki", "yakkan", "jitsumu"] as const) {
        const rows = CHIIKI_RYOKO_STAGING.filter(q => q.year === year && q.session === session);
        expect(rows.map(q => q.answer.join(""))).toEqual(answers[year][session].split(" "));
        expect(rows.reduce((n, q) => n + q.points, 0)).toBe(session === "hoki" ? 100 : session === "yakkan" ? 96 : 40);
      }
    }
  });

  it("keeps canonical question text, shared tables and original page images private", () => {
    const catalog = QUALIFICATION_CATALOG.find(q => q.slug === "chiiki-ryoko");
    expect(catalog?.examCode).toBe("chiiki-ryoko");
    expect(catalog?.status).toBe("live");
    expect(EXAM_CONFIGS).toHaveProperty("chiiki-ryoko");
    expect(readFileSync("data/questions/index.ts", "utf8")).not.toContain("qualification-staging/chiiki-ryoko");
    expect(readFileSync("lib/questions/get-questions.ts", "utf8")).not.toContain("qualification-staging/chiiki-ryoko");
    const bus = CHIIKI_RYOKO_STAGING.find(q => q.id === "chiiki-ryoko-2026-jitsumu-q2")!;
    expect(bus.sharedContext).toContain("190 キロ");
    expect(bus.sourcePageImages).toContain("assets/2026-questions-p19.png");
    const jr = CHIIKI_RYOKO_STAGING.find(q => q.id === "chiiki-ryoko-2025-jitsumu-q9")!;
    expect(jr.sharedContext).toContain("8,360 円");
    expect(jr.sourcePageImages).toContain("assets/2025-questions-p25.png");
    expect(jr.sourcePageImages).toContain("assets/2025-questions-p26.png");
  });

  it("keeps the following JR heading out of the hotel's final choice", () => {
    for (const year of [2025, 2026]) {
      const hotel = CHIIKI_RYOKO_STAGING.find(q => q.year === year && q.session === "jitsumu" && q.qNumber === 5)!;
      expect(hotel.choices.エ).not.toContain("旅客鉄道会社");
      expect(hotel.sourcePages).toEqual([22]);
      const jr = CHIIKI_RYOKO_STAGING.find(q => q.year === year && q.session === "jitsumu" && q.qNumber === 6)!;
      expect(jr.sharedContext).toContain("旅客鉄道会社");
    }
  });

  it.each(["answer", "publication", "context", "explanation", "image", "duplicate"])("rejects %s corruption", kind => {
    const rows = structuredClone(CHIIKI_RYOKO_STAGING);
    if (kind === "answer") rows[0].answer = ["ア"];
    if (kind === "publication") Object.assign(rows[0], { publicAllowed: true });
    if (kind === "context") rows.find(q => q.id === "chiiki-ryoko-2026-jitsumu-q2")!.question = "共通行程なし";
    if (kind === "explanation") rows[0].choiceExplanations.ア = "";
    if (kind === "image") rows[0].sourcePageImages = [];
    if (kind === "duplicate") rows[1] = structuredClone(rows[0]);
    expect(() => validateChiikiRyokoRows(rows)).toThrow();
  });
});
