import { describe, expect, it } from "vitest";
import { AP_QUESTIONS } from "@/data/questions/ap";
import { AP_BY_YEAR_QUESTIONS } from "@/data/questions/ap/by-year";
import { applyIpaCorrections } from "@/data/questions/corrections";
import overlay from "@/data/questions/ap/choice-explanations-cx-k3.json";

const target = AP_QUESTIONS.filter(q => q.session === "am" && q.year >= 2019 && q.year <= 2021);
const entries = Object.entries(overlay).filter(([id]) => /^ap-(2019|2020|2021)/.test(id));
const originals = new Map(applyIpaCorrections("ap", AP_BY_YEAR_QUESTIONS).map(q => [q.id, q]));

describe("AP 2019–2021 cx-k3 choice explanations", () => {
  it("retains all five papers and the reviewed coverage", () => {
    expect(target).toHaveLength(400);
    expect(entries).toHaveLength(356);
    const counts: Record<string, number> = {};
    for (const q of target) {
      const paper = `${q.year}/${q.season}`;
      counts[paper] = (counts[paper] ?? 0) + Number(Object.hasOwn(overlay, q.id));
    }
    expect(counts).toEqual({
      "2019/spring": 70, "2019/autumn": 79, "2020/autumn": 74,
      "2021/spring": 68, "2021/autumn": 65,
    });
  });

  it("loads complete explanations without changing questions, choices or answers", () => {
    for (const q of target) {
      const { choiceExplanations, ...rest } = q;
      const before = originals.get(q.id)!;
      const { choiceExplanations: originalReasons, ...originalFields } = before;
      expect(rest, q.id).toEqual(originalFields);
      const reviewed = overlay[q.id as keyof typeof overlay];
      expect(choiceExplanations, q.id).toEqual(reviewed ?? originalReasons);
      if (!reviewed || !choiceExplanations) continue;
      expect(Object.keys(choiceExplanations).sort(), q.id).toEqual(Object.keys(q.choices!).sort());
      expect(new Set(Object.values(choiceExplanations)).size, q.id).toBe(4);
      for (const [key, reason] of Object.entries(choiceExplanations)) {
        expect(reason.startsWith(q.answer === key ? "正しいです。" : "誤りです。"), `${q.id}/${key}`).toBe(true);
        expect(reason.length, `${q.id}/${key}`).toBeGreaterThanOrEqual(60);
        expect(reason.length, `${q.id}/${key}`).toBeLessThanOrEqual(180);
      }
    }
  });

  it("keeps the deferred questions outside the overlay and preserves any later source explanations", () => {
    for (const id of [
      "ap-2019a-am-q2", "ap-2019h-am-q31", "ap-2020a-am-q28",
      "ap-2021h-am-q9", "ap-2021h-am-q16", "ap-2021h-am-q45",
      "ap-2021h-am-q47", "ap-2021h-am-q52",
    ]) {
      expect(Object.hasOwn(overlay, id), id).toBe(false);
      expect(target.find(q => q.id === id)?.choiceExplanations, id).toEqual(originals.get(id)?.choiceExplanations);
    }
  });
});
