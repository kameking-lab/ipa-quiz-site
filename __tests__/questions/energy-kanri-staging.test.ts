import { describe, expect, it } from "vitest";
import { ENERGY_KANRI_STAGED_QUESTIONS as questions } from "@/data/questions/energy-kanri";
import sources from "@/data/qualification-staging/energy-kanri/sources.json";
import tables from "@/data/qualification-staging/energy-kanri/official-answers.json";
import excluded from "@/data/qualification-staging/energy-kanri/excluded-items.json";
import { isNumericAnswerCorrect, numericQuestionIssue } from "@/lib/questions/numeric";
import type { Question } from "@/lib/questions/types";
import type { ChoiceKey } from "@/lib/questions/types";
import { isCompleteSelectionCorrect } from "@/lib/questions/answers";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";

describe("エネルギー管理士の未公開収録", () => {
  it("公式2回の全28資料と全62原問の正答表を保持する", () => {
    expect(sources.downloadedSources).toHaveLength(28);
    expect(new Set(sources.downloadedSources.map((s) => s.url)).size).toBe(28);
    expect(sources.unavailablePdfUrls).toEqual([]);
    expect(sources.publicAllowed).toBe(false);
    expect(tables.flatMap((t) => t.questions)).toHaveLength(62);
    expect(tables.flatMap((t) => t.questions.flatMap((q) => q.slots))).toHaveLength(842);
    for (const source of sources.downloadedSources) {
      expect(source.sha256).toMatch(/^[a-f0-9]{64}$/);
      expect(source.bytes).toBeGreaterThan(0);
      expect(new URL(source.url).hostname).toBe("www.eccj.or.jp");
    }
    for (const table of tables) for (const q of table.questions) {
      const points = q.slots.reduce((sum, slot) => sum + (slot.points ?? 0), 0);
      const expected = table.packet === 1 && q.questionNumber === 3 ? 100
        : table.packet === 3 && [8, 9].includes(q.questionNumber) ? 30
        : table.packet === 4 && q.questionNumber >= 15 ? 40 : 50;
      expect(points, `${table.year}/${table.packet}/${q.questionNumber}`).toBe(expected);
    }
  });

  it("収録済み62原問841公式解答欄を照合し、全肢解説・原問指示・図を保持する", () => {
    expect(questions).toHaveLength(837);
    expect(new Set(questions.map((q) => q.id)).size).toBe(837);
    for (const q of questions) {
      const packet = Number(q.sourcePdfUrl!.match(/r0[78]_(\d)\.pdf/)![1]);
      const original = tables.find((t) => t.year === q.year && t.packet === packet)!
        .questions.find((p) => p.questionNumber === q.qNumber)!;
      expect(q.originalContent?.body).toBe(q.question);
      expect(q.originalContent?.choices).toEqual(q.choices);
      const labels = q.officialAnswerNumber!.split(",");
      const expected = labels.flatMap((label) => original.slots.find((slot) => slot.label === label)!.answerText.split("、")).map((value) => q.type === "numeric" ? value.replaceAll(",", "") : value);
      expect(Array.isArray(q.answer) ? q.answer : [q.answer]).toEqual(expected);
      if (labels.length > 1) {
        expect(q.requiredSelections).toBe(labels.length);
        expect("unorderedSlotGroups" in original && original.unorderedSlotGroups).toContainEqual(labels);
        expect(q.questionNotice).toContain("順序不問");
      } else expect(q.requiredSelections ?? 1).toBe(1);
      if (q.type === "numeric") {
        const numeric = q as unknown as Question;
        expect(numericQuestionIssue(numeric)).toBeUndefined();
        expect(isNumericAnswerCorrect(numeric, String(q.answer))).toBe(true);
        expect(isNumericAnswerCorrect(numeric, `${q.answer}foo`)).toBe(false);
        expect(q.explanation.length).toBeGreaterThan(20);
        expect(q.choices).toBeUndefined();
      } else {
        expect(Object.keys(q.choiceExplanations!).sort()).toEqual(Object.keys(q.choices!).sort());
        for (const reason of Object.values(q.choiceExplanations!)) expect(reason!.length).toBeGreaterThan(10);
      }
      expect(q.originalContent?.sharedPassages?.[0].text).toContain(`問題${q.qNumber}`);
      if (q.session === "kyotsu" && q.qNumber === 3) {
        expect(q.originalContent?.sharedPassages?.[0].text).toContain(`${q.year === 2025 ? "令和7" : "令和8"}年4月1日`);
        expect(q.lawReferenceDate).toBe(`${q.year}-04-01`);
      }
      if (q.hasImage) {
        expect(q.imageUrls?.length).toBe(q.imageAltTexts?.length);
        expect(q.imageUrls?.[0]).toContain("/images/energy-kanri/");
        for (const url of q.imageUrls!) expect(existsSync(join(process.cwd(), "public", url))).toBe(true);
      }
    }
  });

  it("原問ごとの全解答欄を過不足なく保持し、順序不問ペアを重複なく採点する", () => {
    const manifest = [
      [2025, 5, 4], [2025, 6, 8], [2026, 6, 8],
      [2026, 5, 5],
      [2025, 5, 5],
      [2026, 5, 4],
      [2025, 2, 4], [2025, 2, 5], [2026, 2, 4], [2025, 7, 11],
      [2025, 2, 6], [2025, 2, 7], [2026, 2, 5], [2026, 2, 6], [2026, 2, 7],
      [2025, 3, 10], [2025, 4, 13], [2025, 4, 15], [2025, 7, 15], [2025, 6, 9],
      [2025, 7, 12], [2025, 1, 1], [2026, 1, 1], [2026, 3, 10], [2026, 7, 11], [2026, 7, 12],
      [2025, 6, 7], [2025, 6, 10], [2026, 6, 7], [2026, 6, 9], [2026, 6, 10],
      [2025, 7, 13], [2026, 7, 13],
      [2025, 4, 16], [2025, 4, 18], [2026, 4, 15], [2026, 4, 16], [2026, 4, 18],
      [2025, 4, 12], [2025, 7, 14], [2025, 7, 16],
      [2026, 4, 12], [2026, 4, 13], [2026, 7, 14], [2026, 7, 15], [2026, 7, 16],
      [2025, 4, 11], [2025, 4, 14], [2025, 4, 17], [2025, 1, 2], [2025, 1, 3], [2025, 3, 8], [2025, 3, 9], [2025, 5, 6],
      [2026, 4, 11], [2026, 4, 14], [2026, 4, 17], [2026, 1, 2], [2026, 1, 3], [2026, 3, 8], [2026, 3, 9], [2026, 5, 6],
    ];
    let slotCount = 0;
    for (const [year, packet, num] of manifest) {
      const url = `r${String(year - 2018).padStart(2, "0")}_${packet}.pdf#`;
      const records = questions.filter((q) => q.year === year && q.qNumber === num && q.sourcePdfUrl?.includes(url));
      const labels = records.flatMap((q) => q.officialAnswerNumber!.split(","));
      const official = tables.find((t) => t.year === year && t.packet === packet)!.questions.find((q) => q.questionNumber === num)!;
      expect(labels).toEqual(official.slots.filter((s) => !("scoring" in s && s.scoring === "all-correct")).map((s) => s.label));
      expect(new Set(labels).size).toBe(labels.length);
      slotCount += labels.length;
    }
    expect(slotCount).toBe(841);
    const pairs = questions.filter((q) => q.requiredSelections === 2);
    expect(pairs).toHaveLength(4);
    for (const q of pairs) {
      const answers = q.answer as ChoiceKey[];
      expect(isCompleteSelectionCorrect(answers, answers, 2)).toBe(true);
      expect(isCompleteSelectionCorrect(answers, [...answers].reverse(), 2)).toBe(true);
      expect(isCompleteSelectionCorrect(answers, [answers[0]], 2)).toBe(false);
      expect(isCompleteSelectionCorrect(answers, [answers[0], answers[0]], 2)).toBe(false);
      expect(isCompleteSelectionCorrect(answers, ["ア", "イ"], 2)).toBe(false);
    }
    const infrared = pairs.find((q) => q.year === 2026 && q.officialAnswerNumber === "7,8")!;
    expect(infrared.choiceFactTruth?.オ).toBe(true);
    expect(infrared.choiceExplanations?.オ).toContain("H₂Oにも赤外線吸収");
  });

  it("熱課目Ⅳの図と判断基準の出題時点を保持する", () => {
    const thermocouples = questions.filter((q) => q.year === 2026 && q.qNumber === 11 && q.category === "計測及び制御" && Number(q.officialAnswerNumber) <= 7);
    expect(thermocouples).toHaveLength(7);
    for (const q of thermocouples) {
      expect(q.hasImage).toBe(true);
      expect(q.imageAltTexts?.[0]).toContain("基準接点0℃");
      if (Number(q.officialAnswerNumber) >= 5) {
        expect(q.originalContent?.sharedPassages?.[1].text).toContain("Ⅰ～Ⅳ");
      }
    }
    const standards = questions.filter((q) => q.year === 2026 && q.category === "工業炉・熱設備材料" && ["5", "6", "7", "8"].includes(q.officialAnswerNumber!));
    expect(standards).toHaveLength(4);
    for (const q of standards) {
      expect(q.explanation).toContain("出題時点の法令・判断基準");
      expect(q.questionNotice).toContain("出題時点");
    }
  });

  it("制御図を参照する解答欄と計算表の前提を失わない", () => {
    for (const year of [2025, 2026]) {
      const records = questions.filter((q) => q.year === year && q.qNumber === 12 && q.category === "計測及び制御");
      const illustratedSlots = year === 2025 ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : [1, 2, 3, 4, 8, 13, 14, 15];
      expect(records.filter((q) => q.hasImage).map((q) => Number(q.officialAnswerNumber))).toEqual(illustratedSlots);
      for (const q of records.filter((q) => q.hasImage)) expect(q.imageAltTexts![0].length).toBeGreaterThan(40);
    }
    const boiler = questions.filter((q) => q.year === 2026 && q.qNumber === 13 && q.category === "ボイラ・蒸気輸送配管" && Number(q.officialAnswerNumber) >= 11);
    expect(boiler).toHaveLength(3);
    for (const q of boiler) {
      const premises = q.originalContent!.sharedPassages!.map((p) => p.text).join(" ");
      expect(premises).toContain("2681");
      expect(premises).toContain("428.1");
      expect(q.isCalculation).toBe(true);
      if (Number(q.officialAnswerNumber) >= 12) {
        expect(premises).toContain("1450.3");
        expect(premises).toContain("2756.1");
      }
    }
    const lighting = questions.find((q) => q.year === 2026 && q.category === "照明" && q.officialAnswerNumber === "12")!;
    expect(lighting.originalContent!.sharedPassages!.map((p) => p.text).join(" ")).toContain("750/π");
    const ventilation = questions.filter((q) => q.year === 2025 && q.category === "空気調和" && ["8", "9", "10"].includes(q.officialAnswerNumber!));
    expect(ventilation).toHaveLength(3);
    for (const q of ventilation) expect(q.question).toContain("| 第三種機械換気設備 |");
    const laws = questions.filter((q) => q.category === "空気調和" && ((q.year === 2025 && ["15", "16"].includes(q.officialAnswerNumber!)) || (q.year === 2026 && ["8", "9"].includes(q.officialAnswerNumber!))));
    expect(laws).toHaveLength(4);
    for (const q of laws) {
      expect(q.questionNotice).toContain("出題時点");
      expect(q.explanation).toContain("出題時点");
    }
  });

  it("冷凍・空調・蒸留・乾燥の図と計算条件を保持する", () => {
    for (const [year, number, slots] of [
      [2025, 16, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
      [2025, 18, [6, 7, 8, 9, 10]],
      [2026, 16, [8, 9, 10]],
      [2026, 18, [3, 4, 5, 6, 7, 8, 9, 10, 11]],
    ] as const) {
      const records = questions.filter((q) => q.year === year && q.qNumber === number && q.sourcePdfUrl?.includes("_4.pdf#"));
      expect(records.filter((q) => q.hasImage).map((q) => Number(q.officialAnswerNumber))).toEqual(slots);
      for (const q of records) {
        const shared = q.originalContent!.sharedPassages!;
        expect(shared.find((p) => p.label === "課目Ⅳ 選択問題の指示")!.text).toContain("4問題中2問題");
      }
    }
    const dryer = questions.filter((q) => q.year === 2026 && q.qNumber === 18 && Number(q.officialAnswerNumber) >= 7 && Number(q.officialAnswerNumber) <= 11);
    expect(dryer).toHaveLength(5);
    for (const q of dryer) {
      const premises = q.originalContent!.sharedPassages!.map((p) => p.text).join(" ");
      expect(premises).toContain("5000 kg/h");
      expect(premises).toContain("500 kg-無水材料/h");
      expect(q.isCalculation).toBe(true);
      if (Number(q.officialAnswerNumber) >= 9) expect(premises).toContain("200 kg-水/h");
      if (q.officialAnswerNumber === "11") expect(premises).toContain("2400 kJ/kg");
    }
  });

  it("電気加熱の計算で全電気効率と電力区間の前提を保持する", () => {
    const heating = questions.filter((q) => q.qNumber === 13 && q.category === "電気加熱");
    expect(heating).toHaveLength(29);
    for (const q of heating) {
      expect(q.originalContent!.sharedPassages!.find((p) => p.label === "課目Ⅳ 選択問題の指示")!.text).toContain("問題13から問題16");
      if (Number(q.officialAnswerNumber) >= 11) {
        expect(q.question).toContain("全電気効率");
        expect(q.isCalculation).toBe(true);
      }
    }
    const melting = heating.filter((q) => q.year === 2026 && Number(q.officialAnswerNumber) >= 11);
    expect(melting).toHaveLength(4);
    for (const q of melting) {
      expect(q.hasImage).toBe(true);
      expect(q.question).toContain("0.792");
      expect(q.question).toContain("214 kJ/kg");
      const premises = q.originalContent!.sharedPassages!.map((p) => p.text).join(" ");
      expect(premises).toContain("1650 kWで10分");
      expect(premises).toContain("1800 kWで15分");
      expect(premises).toContain("1500 kWで10分");
      expect(premises).toContain("1800 kWで20分");
      if (q.officialAnswerNumber === "14") expect(premises).toContain("110 kW");
    }
  });

  it("配電計算の回路図と三相・一次換算の計算条件を保持する", () => {
    for (const year of [2025, 2026]) {
      const distribution = questions.filter((q) => q.year === year && q.qNumber === 7 && q.sourcePdfUrl?.includes("_6.pdf#"));
      expect(distribution).toHaveLength(year === 2025 ? 15 : 13);
      const firstImageSlot = year === 2025 ? 10 : 8;
      for (const q of distribution) {
        expect(q.hasImage).toBe(Number(q.officialAnswerNumber) >= firstImageSlot);
        if (q.hasImage) expect(q.isCalculation).toBe(true);
      }
    }
    const pv = questions.find((q) => q.year === 2026 && q.qNumber === 7 && q.officialAnswerNumber === "13")!;
    expect(pv.question).toContain("50 kvar×5台");
    expect(pv.question).toContain("系統から見て進み");
    const transformer = questions.filter((q) => q.year === 2026 && q.qNumber === 9 && Number(q.officialAnswerNumber) >= 12);
    expect(transformer).toHaveLength(5);
    for (const q of transformer) {
      expect(q.hasImage).toBe(true);
      expect(q.question).toContain("0.038 mS");
      expect(q.question).toContain("1.356 Ω");
      if (["13", "14"].includes(q.officialAnswerNumber!)) {
        expect(q.originalContent!.sharedPassages!.map((p) => p.text).join(" ")).toContain("力率80％");
      }
    }
    const copper = questions.filter((q) => q.year === 2025 && q.qNumber === 10 && ["14", "15"].includes(q.officialAnswerNumber!));
    expect(copper).toHaveLength(2);
    for (const q of copper) expect(q.originalContent!.sharedPassages!.map((p) => p.text).join(" ")).toContain("23.3 A");
    const standards = questions.filter((q) => q.year === 2026 && q.qNumber === 10 && q.sourcePdfUrl?.includes("_6.pdf#") && Number(q.officialAnswerNumber) <= 4);
    expect(standards).toHaveLength(4);
    for (const q of standards) {
      expect(q.questionNotice).toContain("出題時点");
      expect(q.explanation).toContain("出題時点の法令・JIS");
    }
  });

  it("法規の基準日と、燃焼・電動力計算の前提及び図を保持する", () => {
    for (const year of [2025, 2026]) {
      const law = questions.filter((q) => q.year === year && q.session === "kyotsu" && q.qNumber === 1);
      expect(law).toHaveLength(12);
      for (const q of law) {
        expect(q.lawReferenceDate).toBe(`${year}-04-01`);
        expect(q.originalContent!.sharedPassages![0].text).toContain(`令和${year - 2018}年4月1日`);
        expect(q.questionNotice).toContain("出題時点");
        for (const explanation of Object.values(q.choiceExplanations!)) expect(explanation).toContain("出題時点の法令");
      }
      const staffing = law.find((q) => q.officialAnswerNumber === "12")!;
      expect(staffing.question).toContain(year === 2025 ? "22000" : "19000");
      expect(staffing.question).toContain("| 本社 |");
    }
    const combustion = questions.filter((q) => q.year === 2026 && q.category === "燃焼計算");
    expect(combustion).toHaveLength(14);
    for (const q of combustion) {
      const premise = q.originalContent!.sharedPassages!.map((p) => p.text).join(" ");
      expect(premise).toContain("9.4％");
      expect(premise).toContain("25℃");
      expect(premise).toContain("1.41");
      if (Number(q.officialAnswerNumber) >= 12) expect(q.question).toContain("5 m³ₙ");
    }
    const power = questions.filter((q) => q.sourcePdfUrl?.includes("_7.pdf#") && [11, 12].includes(q.qNumber!) && !(q.year === 2025 && q.qNumber === 11));
    expect(power).toHaveLength(43);
    for (const q of power) {
      const slot = Number(q.officialAnswerNumber);
      const expectedImage = q.year === 2025 ? [1, 2, 5, 6, 9, 12, 15].includes(slot)
        : q.qNumber === 11 || [10, 11].includes(slot);
      expect(q.hasImage).toBe(expectedImage);
      const premise = q.originalContent!.sharedPassages!.map((p) => p.text).join(" ");
      if (q.year === 2025 && slot <= 6) expect(premise).toContain("Mᴡ");
      if (q.year === 2025 && [3, 4, 5, 6].includes(slot)) expect(premise + q.question).toContain("1550 kg");
      if (q.year === 2026 && q.qNumber === 11 && slot >= 8) expect(premise).toContain("12·g×10⁻³");
      if (q.year === 2026 && q.qNumber === 12 && slot >= 10) expect(premise).toContain("r＝0.5＋0.5q²");
    }
  });

  it("公式の複数正答と全員正解を区別する", () => {
    expect(questions.find((q) => q.year === 2025 && q.session === "kyotsu" && q.qNumber === 3 && q.officialAnswerNumber === "2")!.answer).toEqual(["ア", "カ"]);
    const allCorrect = tables.find((t) => t.year === 2026 && t.packet === 6)!
      .questions.find((q) => q.questionNumber === 8)!.slots.find((s) => s.label === "8")!;
    expect(allCorrect.answerText).toBe("");
    expect("scoring" in allCorrect && allCorrect.scoring).toBe("all-correct");
  });

  it("数値記入46欄は原問の精度・倍率を保持して採点する", () => {
    const entries = questions.filter((q) => q.type === "numeric");
    expect(entries).toHaveLength(46);
    expect(entries.filter((q) => q.numericAnswer?.format === "decimal" && q.numericAnswer.precision === 2)).toHaveLength(13);
    expect(entries.filter((q) => q.numericAnswer?.format === "scientific")).toHaveLength(6);
    const lighting = entries.filter((q) => q.category === "照明");
    expect(lighting.map((q) => q.answer)).toEqual(["7.85", "5.0", "6.7", "38", "41"]);
    expect(lighting.slice(0, 3).map((q) => q.numericAnswer?.unit)).toEqual(["×10³ lm/m²", "×10² lm", "×10⁻¹（照明率）"]);
    expect(lighting.find((q) => q.officialAnswerNumber === "D")!.explanation).toContain("切り上げ");
    const boiler = entries.find((q) => q.qNumber === 13 && q.officialAnswerNumber === "B")!;
    expect(boiler.originalContent!.sharedPassages!.map((p) => p.text).join(" ")).toContain("17.2");
    const water = entries.find((q) => q.category === "熱交換器・熱回収装置" && q.officialAnswerNumber === "C")!;
    expect(water.originalContent!.sharedPassages!.map((p) => p.text).join(" ")).toContain("80℃");
  });

  it("熱課目Ⅱの流量・伝熱計算で単位、前提と図を保持する", () => {
    const basics = questions.filter((q) => q.sourcePdfUrl?.includes("_2.pdf#"));
    expect(basics).toHaveLength(116);
    const imageSlots = new Map<string, readonly (number | string)[]>([
      ["2025/6", [1, 2, 3, 4, 9, 10, 11, 12, 13]],
      ["2025/7", [7, 8, 9, 10, "A", 11, "B", "C"]],
      ["2026/5", Array.from({ length: 17 }, (_, i) => i + 1)],
      ["2026/6", [11, 12, 13, 14, 15]],
      ["2026/7", [8, 9, 10, 11, 12]],
    ]);
    for (const [group, slots] of imageSlots) {
      const records = basics.filter((q) => `${q.year}/${q.qNumber}` === group);
      expect(records.filter((q) => q.hasImage).map((q) => q.officialAnswerNumber)).toEqual(slots.map(String));
    }
    const orifice = basics.find((q) => q.year === 2026 && q.qNumber === 6 && q.officialAnswerNumber === "15")!;
    expect(orifice.question).toContain("0.85");
    expect(orifice.explanation).toContain("1471.5");
    const reynolds = basics.find((q) => q.year === 2025 && q.qNumber === 6 && q.officialAnswerNumber === "8")!;
    const premise = reynolds.originalContent!.sharedPassages!.map((p) => p.text).join(" ");
    expect(premise).toContain("43 mm");
    expect(premise).toContain("0.019");
    for (const q of basics.filter((q) => q.year === 2026 && q.qNumber === 5 && Number(q.officialAnswerNumber) >= 13)) {
      const text = q.originalContent!.sharedPassages!.map((p) => p.text).join(" ");
      for (const value of ["400.9", "275.4", "431.7", "60.04", "0.315", "1.400"]) expect(text).toContain(value);
    }
    const exchanger = basics.filter((q) => q.year === 2025 && q.qNumber === 7 && q.type === "numeric");
    expect(exchanger.map((q) => q.answer)).toEqual(["62", "14", "6.5"]);
    expect(exchanger[1].explanation).toContain("算術平均");
    const radiation = basics.find((q) => q.year === 2025 && q.qNumber === 7 && q.officialAnswerNumber === "10")!;
    expect(radiation.choices?.カ).toBe("ασT₁⁴＋(k/t)(T₁−T₂)");
  });

  it("熱力学の指定表・仮数と指数・倍率、同期機の座標と回生損失を保持する", () => {
    const slot = (year: number, packet: number, number: number, label: string) => questions.find((q) => q.year === year && q.qNumber === number && q.officialAnswerNumber === label && q.sourcePdfUrl?.includes(`_${packet}.pdf#`))!;
    const otto = slot(2026, 2, 4, "8");
    const table = otto.originalContent!.sharedPassages!.map((p) => p.text).join(" ");
    for (const value of ["0.8 kJ/(kg·K)", "0.72 kJ/(kg·K)", "3.037", "9.063", "下段の値をそのまま"]) expect(table).toContain(value);
    expect(otto.explanation).toContain("2200/3.037");
    const air = slot(2025, 2, 4, "G");
    expect(air.answer).toBe("6.03×10^3");
    expect(air.numericAnswer?.format).toBe("scientific");
    expect(air.originalContent!.sharedPassages!.map((p) => p.text).join(" ")).toContain("正の値");
    expect(slot(2025, 2, 4, "J").originalContent!.sharedPassages!.map((p) => p.text).join(" ")).toContain("1.099");
    expect(slot(2025, 2, 4, "D").numericAnswer?.unit).toBe("×10⁻¹ kJ/(kg·K)");
    const dryness = slot(2025, 2, 5, "D");
    expect(dryness.numericAnswer?.unit).toBe("×10⁻¹（乾き度）");
    const steam = dryness.originalContent!.sharedPassages!.map((p) => p.text).join(" ");
    for (const value of ["6.4934", "1.0910", "7.5930", "255.3", "3095.6"]) expect(steam).toContain(value);
    const circuit = slot(2026, 5, 4, "9");
    const circuitConditions = circuit.originalContent!.sharedPassages!.map((p) => p.text).join(" ");
    expect(circuitConditions).toContain("相順はa→b→c");
    expect(circuitConditions).toContain("110＋j0");
    expect(circuit.choices?.イ).toBe("25−j15√3");
    for (const q of questions.filter((q) => q.year === 2026 && q.qNumber === 4 && q.sourcePdfUrl?.includes("_5.pdf#"))) expect(q.hasImage).toBe(true);
    const drive = questions.filter((q) => q.year === 2025 && q.qNumber === 11 && q.category === "電動力応用");
    expect(drive).toHaveLength(13);
    expect(drive.filter((q) => q.hasImage).map((q) => q.officialAnswerNumber)).toEqual(["1", "2", "3", "4", "5", "6", "7", "8", "13"]);
    expect(slot(2025, 7, 11, "5").choices?.イ).toBe("−L_qi_q");
    const regeneration = slot(2025, 7, 11, "13");
    expect(regeneration.explanation).toContain("(30−2.94)×0.75");
    expect(regeneration.originalContent!.sharedPassages!.map((p) => p.text).join(" ")).toContain("30g×10⁻⁴");
  });

  it("制御系の極零相殺・外乱応答と倒立振子の図を区別する", () => {
    const record = (year: number, slot: string) => questions.find((q) => q.year === year && q.qNumber === 5 && q.sourcePdfUrl?.includes("_5.pdf#") && q.officialAnswerNumber === slot)!;
    expect(record(2025, "4").answer).toBe("イ");
    expect(record(2025, "5").explanation).toContain("(s−3)(s＋2)²");
    expect(record(2025, "6").explanation).toContain("e³ᵗ");
    for (const slot of ["4", "5", "6"]) expect(record(2025, slot).hasImage).toBe(true);
    expect(record(2026, "2").choices?.エ).toBe("1/(Js²−mgl)");
    expect(record(2026, "5").imageUrls).toHaveLength(3);
    expect(record(2026, "11").answer).toBe("イ");
    expect(record(2026, "11").explanation).toContain("254−256＝−2");
  });

  it("全842公式解答欄の原文を通常演習と全員正解の別台帳で過不足なく保持する", () => {
    expect(excluded).toHaveLength(1);
    const item = excluded[0]!;
    expect(item.officialAnswerNumber).toBe("8");
    expect(item.scoring).toBe("all-correct");
    expect(item.publicAllowed).toBe(false);
    expect("answer" in item).toBe(false);
    expect(item.question).toContain("負荷端の相電圧が6.6 kV");
    expect(item.originalContent.body).toBe(item.question);
    expect(item.originalContent.choices).toEqual(item.choices);
    expect(Object.keys(item.choiceExplanations).sort()).toEqual(Object.keys(item.choices).sort());
    expect(item.imageUrls.length).toBe(item.imageAltTexts.length);
    for (const url of item.imageUrls) expect(existsSync(join(process.cwd(), "public", url))).toBe(true);
    for (const year of [2025, 2026]) for (const table of tables.filter((t) => t.year === year)) for (const original of table.questions) {
      const url = `r${String(year - 2018).padStart(2, "0")}_${table.packet}.pdf#`;
      const pool = [...questions, ...excluded].filter((q) => q.year === year && q.qNumber === original.questionNumber && q.sourcePdfUrl?.includes(url));
      const labels = pool.flatMap((q) => q.officialAnswerNumber!.split(","));
      expect([...labels].sort()).toEqual(original.slots.map((s) => s.label).sort());
      expect(new Set(labels).size).toBe(labels.length);
    }
  });

  it("工場配電の原表・日負荷曲線・不等率と中性線の条件を保持する", () => {
    const record = (year: number, slot: string) => questions.find((q) => q.year === year && q.qNumber === 8 && q.sourcePdfUrl?.includes("_6.pdf#") && q.officialAnswerNumber === slot)!;
    expect(record(2025, "4").question).toContain("| Δ−Δ結線 |");
    expect(record(2025, "5").question).toContain("励磁電流の［5］");
    expect(record(2025, "B").answer).toBe("750");
    expect(record(2025, "C").explanation).toContain("1200/14");
    expect(record(2025, "E").explanation).toContain("1375−750−400＝225");
    expect(record(2025, "E").answer).toBe("1523");
    for (const slot of ["A", "B", "C", "D", "E"]) expect(record(2025, slot).imageUrls).toHaveLength(2);
    expect(record(2026, "9").explanation).toContain("中性線");
    expect(record(2026, "11").explanation).toContain("60²＋20²＋80²");
    expect(record(2026, "12").explanation).toContain("14700/6600");
    const ratio = questions.find((q) => q.year === 2025 && q.qNumber === 4 && q.sourcePdfUrl?.includes("_5.pdf#") && q.officialAnswerNumber === "6")!;
    expect(ratio.answer).toBe("ア");
    expect(ratio.choiceExplanations?.エ).toContain("0/0");
  });

  it("batch1公開後: 収録済み資格の未公開登録を維持する", () => {
    const entry = QUALIFICATION_CATALOG.find((q) => q.slug === "energy-kanri")!;
    expect(entry.status).toBe("live");
    expect(entry.examCode).toBeDefined();

    expect(entry.remainingWork.join(" ")).not.toContain("未収録");
  });
});
