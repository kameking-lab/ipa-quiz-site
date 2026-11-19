import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { HOIKUSHI_QUESTIONS } from "@/data/questions/hoikushi";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import officialAnswers from "@/reports/hoikushi-2rounds-20260929/official-answers.json";
import type { ChoiceKey } from "@/lib/questions/types";

describe("保育士の案内と公開年度の一致", () => {
  it("令和8年度前期154問、令和7年度後期158問・前期156問を九科目ずつ公開する", () => {
    const ready = HOIKUSHI_QUESTIONS.filter(isPracticeReadyQuestion);
    const rounds = [[2026, "early", 154], [2025, "late", 158], [2025, "early", 156]] as const;
    expect([...new Set(ready.map((q) => `${q.year}-${q.season}`))]).toEqual(rounds.map(([year, season]) => `${year}-${season}`));
    for (const [year, season, count] of rounds) {
      const round = ready.filter((q) => q.year === year && q.season === season);
      expect(round).toHaveLength(count);
      expect(new Set(round.map((q) => q.session)).size).toBe(9);
    }
  });

  it("令和7年度後期は全肢の解説と公式正答を持ち、原本図表を参照できる", () => {
    const keys: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ"];
    const round = HOIKUSHI_QUESTIONS.filter((q) => q.year === 2025 && q.season === "late");
    const answers = officialAnswers["r7-kouki"] as Record<string, string[]>;
    for (const q of round) {
      const official = answers[q.subject!][q.qNumber - 1];
      const expected = official.split(",").map((k) => keys[Number(k) - 1]);
      expect(q.officialAnswerNumber, q.id).toBe(official);
      expect(q.answer, q.id).toEqual(expected.length > 1 ? expected : expected[0]);
      expect(Object.keys(q.choiceExplanations ?? {}), q.id).toEqual(keys);
      expect(q.sourcePdfUrl, q.id).toMatch(/www\.hoyokyo\.or\.jp\/07AP[1-9]-2\.pdf$/);
      for (const image of q.imageUrls ?? []) expect(readFileSync(path.join(process.cwd(), "public", image)).length).toBeGreaterThan(0);
    }
    const practicum = round.filter((q) => q.session === "hoiku-jisshu-riron");
    expect(practicum.filter((q) => q.hasImage).map((q) => q.qNumber)).toEqual([3, 12]);
    expect(practicum.filter((q) => q.qNumber === 1 || q.qNumber === 5)).toEqual([]);
  });

  it("資格の案内に収録済みの回と件数を掲載する", () => {
    const entry = getQualificationByExamCode("hoikushi");
    expect(entry?.officialReuseTermsUrl).toBe("https://www.hoyokyo.or.jp/terms/");
    expect(entry?.reuseSummary).toContain("令和8年度前期154問");
    expect(entry?.reuseSummary).toContain("令和7年度後期158問・前期156問");
  });
});
