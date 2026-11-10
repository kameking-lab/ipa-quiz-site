import { describe, expect, it } from "vitest";
import overlay from "@/data/questions/sc/choice-explanations-cx-k2.json";
import existingOverlay from "@/data/questions/sc/choice-explanations-2024-2025.json";
import { SC_QUESTIONS } from "@/data/questions/sc";
import { BY_YEAR_QUESTIONS } from "@/data/questions/sc/by-year";
import { applyIpaCorrections } from "@/data/questions/corrections";

const original = new Map(applyIpaCorrections("sc", BY_YEAR_QUESTIONS).map(q => [q.id, q]));
const published = new Map(SC_QUESTIONS.map(q => [q.id, q]));

describe("SC cx-k2 choice explanations", () => {
  it("covers 196 older questions except four missing diagrams or tables", () => {
    const targets = [...original.values()].filter(q =>
      q.year >= 2009 && q.year <= 2013 && q.session === "am2"
      && q.type === "multiple-choice" && Object.keys(q.choices ?? {}).length === 4
      && !q.choiceExplanations && !(q.id in existingOverlay),
    );
    expect(targets).toHaveLength(200);
    expect(targets.filter(q => q.id in overlay)).toHaveLength(196);
    expect(targets.filter(q => !(q.id in overlay)).map(q => q.id).sort()).toEqual([
      "sc-2010h-am2-q18", // Missing topology locating the router and terminals.
      "sc-2011a-am2-q10", // Missing access requirements for tables X and Y.
      "sc-2013a-am2-q23", // Missing development policies for a–c, despite hasImage=false.
      "sc-2013h-am2-q4", // Missing WAF installation positions a–d.
    ]);
  });

  it("uses the original bandwidth and dates the patent exception explanations", () => {
    const reason = overlay["sc-2010a-am2-q17"].イ;
    expect(reason).toContain("0.08Mビット／秒");
    expect(reason).toContain("100×0.5＝50Mビット／秒");
    expect(reason).toContain("625台");
    for (const id of ["sc-2009a-am2-q23", "sc-2012h-am2-q23"] as const) {
      for (const explanation of Object.values(overlay[id])) {
        expect(explanation).toContain("出題当時の特許制度");
      }
    }
  });

  it("uses the 2017 autumn question's actual traffic conditions, even when scaled inputs give the same answer", () => {
    // IPA 2017h29a_sc_am2_qs.pdf p.10, Q19; official answer: イ (625).
    const id = "sc-2017a-am2-q19";
    const question = original.get(id)!;
    const bandwidth = Number(question.question.match(/(\d+)Mビット\/秒のLAN/u)?.[1]);
    const traffic = Number(question.question.match(/(\d+)kバイト/u)?.[1]);
    const efficiency = Number(question.question.match(/伝送効率は(\d+)%/u)?.[1]);
    expect([bandwidth, traffic, efficiency]).toEqual([100, 600, 50]);
    const perClient = traffic * 1_000 * 8 / 60 / 1_000_000;
    const usableBandwidth = bandwidth * efficiency / 100;
    const clients = usableBandwidth / perClient;
    expect([perClient, usableBandwidth, clients]).toEqual([0.08, 50, 625]);
    expect(question.answer).toBe("イ");
    expect(question.choices?.イ).toBe(String(clients));

    const reasons = published.get(id)!.choiceExplanations!;
    expect(reasons.イ).toContain("600kバイト／分");
    expect(reasons.イ).toContain("600,000×8÷60＝80,000ビット／秒＝0.08Mビット／秒");
    expect(reasons.イ).toContain("100×0.5＝50Mビット／秒");
    expect(reasons.イ).toContain("50÷0.08＝625台");
    for (const reason of Object.values(reasons)) {
      expect(reason).toContain("50Mビット／秒");
      expect(reason).toContain("625台");
      expect(reason).not.toMatch(/[1１]Gビット|[6６]Mバイト|500Mビット|0\.8Mビット/u);
    }
    expect(reasons.ウ).toContain("伝送効率50％を無視");
    expect(reasons.エ).toContain("1バイト＝8ビット");
  });

  it("covers 2014–2018 except three absent figures and two inconsistent transcriptions", () => {
    const targets = [...original.values()].filter(q =>
      q.year >= 2014 && q.year <= 2018 && q.session === "am2"
      && q.type === "multiple-choice" && Object.keys(q.choices ?? {}).length === 4
      && !q.choiceExplanations && !(q.id in existingOverlay),
    );
    expect(targets).toHaveLength(250);
    expect(targets.filter(q => q.id in overlay)).toHaveLength(245);
    expect(targets.filter(q => !(q.id in overlay)).map(q => q.id).sort()).toEqual([
      "sc-2014a-am2-q21", // Transcribed cycle is option ア, but the answer is イ.
      "sc-2016h-am2-q21", // SQL and input parameter quotations are incomplete.
      "sc-2018a-am2-q10", // Missing responsibility allocation table.
      "sc-2018a-am2-q18", // All four choices are figure placeholders.
      "sc-2018a-am2-q25", // Missing table of the three assurance parties.
    ]);
  });

  it("explains the standard edition in the older paper rather than the reuse source", () => {
    for (const id of ["sc-2014a-am2-q5", "sc-2017h-am2-q7", "sc-2018a-am2-q5"]) {
      for (const reason of Object.values(overlay[id as keyof typeof overlay])) {
        expect(reason, id).toContain("出題当時");
        expect(reason, id).not.toContain("140-3");
      }
    }
    for (const reason of Object.values(overlay["sc-2017a-am2-q12"])) {
      expect(reason).toContain("JIS Q 27000:2014");
      expect(reason).not.toContain("2019");
    }
  });

  it("covers all 225 previously unexplained questions except seven missing figures or tables", () => {
    const targets = [...original.values()].filter(q =>
      q.year >= 2019 && q.year <= 2025 && q.session === "am2"
      && q.type === "multiple-choice" && Object.keys(q.choices ?? {}).length === 4
      && !q.choiceExplanations && !(q.id in existingOverlay),
    );
    expect(targets).toHaveLength(225);
    expect(Object.keys(overlay).filter(id => original.get(id)!.year >= 2019)).toHaveLength(218);
    expect(targets.filter(q => !(q.id in overlay)).map(q => q.id).sort()).toEqual([
      "sc-2019a-am2-q22", // State diagram and device specification.
      "sc-2020a-am2-q11", // Responsibility allocation table.
      "sc-2020a-am2-q24", // TCO cost table.
      "sc-2021a-am2-q12", // Evidence items a–d.
      "sc-2021a-am2-q21", // Referenced database schema.
      "sc-2022a-am2-q21", // Source rows of tables R and S (despite hasImage=false).
      "sc-2022a-am2-q22", // Program flowchart.
    ]);
  });

  it("adds four substantive reasons without replacing existing explanations or answers", () => {
    for (const [id, reasons] of Object.entries(overlay)) {
      const before = original.get(id)!;
      const after = published.get(id)!;
      expect(before, id).toBeDefined();
      expect(before.year, id).toBeGreaterThanOrEqual(2009);
      expect(before.year, id).toBeLessThanOrEqual(2025);
      expect(before.session, id).toBe("am2");
      expect(existingOverlay, id).not.toHaveProperty(id);
      expect(before.choiceExplanations, id).toBeUndefined();
      expect(after.answer, id).toEqual(before.answer);
      expect(after.question, id).toEqual(before.question);
      expect(after.choices, id).toEqual(before.choices);
      expect(after.explanation, id).toEqual(before.explanation);
      expect(Object.keys(reasons).sort(), id).toEqual(Object.keys(before.choices!).sort());
      expect(new Set(Object.values(reasons)).size, id).toBe(4);
      for (const [key, reason] of Object.entries(reasons)) {
        expect(reason.length, `${id}/${key}`).toBeGreaterThanOrEqual(60);
        expect(reason.length, `${id}/${key}`).toBeLessThanOrEqual(180);
        expect(reason.startsWith(key === after.answer ? "正しいです。" : "誤りです。"), `${id}/${key}`).toBe(true);
      }
      expect(after.choiceExplanations, id).toEqual(reasons);
    }
  });

  it("uses the already corrected CRL and OCSP answers", () => {
    expect(published.get("sc-2019h-am2-q1")?.choiceExplanations?.エ).toMatch(/^正しいです。/u);
    expect(published.get("sc-2019h-am2-q2")?.choiceExplanations?.ウ).toMatch(/^正しいです。/u);
  });
});
