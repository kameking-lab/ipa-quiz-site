import { describe, expect, it } from "vitest";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { readKhk2026Sales, validateKhk2026Sales } from "@/scripts/lib/validate-khk-2026-sales";
import { KHK_2026_HEI_LPG_STAGING as lpg } from "@/scripts/lib/validate-khk-kagaku-2026-hei-lpg";
import { KHK_2026_KOU_STAGING as kou } from "@/scripts/lib/validate-khk-kagaku-2026-kou";
import { KHK_2026_HEI_SPECIAL_STAGING as special } from "@/scripts/lib/validate-khk-kagaku-2026-hei-special";
import { KHK_2026_OTSU_STAGING as otsu, KHK_2026_KIKAI_KOU_STAGING as kikaiKou } from "@/scripts/lib/validate-khk-2026-fill";
import { KHK_2026_KIKAI_OTSU_STAGING as kikaiOtsu, KHK_2026_REITO_FIRST_STAGING as reitoFirst } from "@/scripts/lib/validate-khk-2026-fill-2";
import { KHK_2026_REITO_SECOND_STAGING as reitoSecond, KHK_2026_REITO_THIRD_STAGING as reitoThird } from "@/scripts/lib/validate-khk-2026-fill-3";
import firstStored from "@/data/qualification-staging/khk-hanbai/2026-first/questions.json";
import secondStored from "@/data/qualification-staging/khk-hanbai/2026-second/questions.json";
import refs from "@/data/qualification-staging/khk-hanbai/2026-second/shared-question-references.json";

const first = readKhk2026Sales("first");
const second = readKhk2026Sales("second");
const at = (kind: "first" | "second", session: "houki" | "gas-technology", n: number) =>
  (kind === "first" ? first : second).find(q => q.session === session && q.qNumber === n)!;

describe("高圧ガス販売2026の非公開原本", () => {
  it("公式正答表の画像から独立転記した80正答と400肢解説に一致する", () => {
    expect(validateKhk2026Sales("first")).toEqual([]);
    expect(validateKhk2026Sales("second")).toEqual([]);
    // Independently transcribed from R8fy_kaitou.pdf, not generated from key JSON.
    for (const [paper, session, numbers] of [
      [first, "houki", "43213143233534452443"],
      [first, "gas-technology", "31555135513144232521"],
      [second, "houki", "43244432333445553511"],
      [second, "gas-technology", "23353415253114525442"],
    ] as const) {
      expect(paper.filter(q => q.session === session).sort((a, b) => a.qNumber - b.qNumber).map(q => q.officialAnswerNumber).join("")).toBe(numbers);
    }
    expect([...first, ...second].flatMap(q => Object.values(q.choiceExplanations!))).toHaveLength(400);
  });

  it("共通の法令問3は1本文だけを保持し、第二種の出典とIDを別に持つ", () => {
    expect(firstStored).toHaveLength(40);
    expect(secondStored).toHaveLength(39);
    expect(refs).toHaveLength(1);
    const a = at("first", "houki", 3); const b = at("second", "houki", 3);
    expect(b.originalContent).toEqual(a.originalContent);
    expect(b.explanation).toBe(a.explanation);
    expect(b.id).not.toBe(a.id);
    expect(b.sourcePdfUrl).toContain("/R8KX.pdf");
    expect(a.sourcePdfUrl).toContain("/R8JX.pdf");
  });

  it("第二種問10と問11で根拠法を切り替え、保安の絶対圧力条件を保持する", () => {
    expect(at("second", "houki", 10).questionNotice).toContain("高圧ガス保安法");
    expect(at("second", "houki", 11).questionNotice).toContain("液化石油ガス法");
    expect([...first, ...second].filter(q => q.session === "houki").every(q => q.lawReferenceDate === "2026-04-01")).toBe(true);
    expect([...first, ...second].filter(q => q.session === "gas-technology").every(q => q.questionNotice?.includes("圧力は絶対圧力"))).toBe(true);
    expect(at("second", "houki", 5).question).toContain("G = V / C");
    expect(at("first", "gas-technology", 1).question).toContain("kg/m³");
  });

  it("状態方程式・混合分子量とグラフの容器本数を再計算する", () => {
    expect(8.7 / 22.4 * 17).toBeCloseTo(6.6, 1);
    expect((28 + 7 * 44) / 8).toBe(42);
    expect((4.2 / 28) * .008314 * 298.15 / .04).toBeCloseTo(9.3, 1);
    expect(22 * (.1013 / (.56 + .1013)) * (298.15 / 273.15)).toBeCloseTo(3.7, 1);
    const demand = 60 * 23.3 * .27 * .7 * 1.1 / 14;
    expect(demand).toBeCloseTo(20.7603, 3);
    expect(Math.ceil(demand / 2.2) * 2).toBe(20);
    const graph = at("second", "gas-technology", 17);
    expect(graph.imageUrls).toEqual(["/api/qualification-assets/khk-hanbai2/2026-KY-q17.png"]);
    expect(graph.imageAltTexts![0]).toContain("60戸の最大ガス消費率は27%");
    expect(graph.explanation).toContain("切り上げて10本");
    expect(at("second", "gas-technology", 4).explanation).toContain("0.6613 MPa");
  });

  it.each(["answer", "originalContent", "publicAllowed", "questionNotice", "statementExplanations"] as const)("%sの破損を検出する", field => {
    const broken = structuredClone(second);
    if (field === "answer") broken[0].answer = "ア";
    else if (field === "originalContent") broken[0].originalContent!.body += "改変";
    else if (field === "publicAllowed") broken[0].publicAllowed = true;
    else if (field === "questionNotice") broken[0].questionNotice = "ゲージ圧力";
    else {
      const q = broken.find(q => q.session === "houki")!;
      q.statementExplanations!.イ = "正しい。改変した記述";
    }
    expect(validateKhk2026Sales("second", broken).length).toBeGreaterThan(0);
  });

  it("2026年度全11区分480出題をそろえ、公開プールへの混入を防ぐ", () => {
    const groups = [kou, otsu, lpg, special, kikaiKou, kikaiOtsu, reitoFirst, reitoSecond, reitoThird, first, second];
    expect(groups.map(g => g.length)).toEqual([35, 50, 60, 60, 35, 50, 35, 40, 35, 40, 40]);
    const all = groups.flat();
    expect(all).toHaveLength(480);
    const ids = new Set(all.map(q => q.id));
    expect(ids.size).toBe(480);
    expect(all.every(q => q.publicAllowed === false)).toBe(true);
    expect(ALL_QUESTIONS.some(q => ids.has(q.id))).toBe(false);
    expect(Object.values(QUESTIONS_BY_EXAM).flat().some(q => ids.has(q.id))).toBe(false);
  });

  it("選択に必要なグラフの欠落を検出する", () => {
    const broken = structuredClone(second);
    const graph = broken.find(q => q.session === "gas-technology" && q.qNumber === 17)!;
    graph.hasImage = false;
    graph.imageUrls = [];
    graph.imageAltTexts = [];
    expect(validateKhk2026Sales("second", broken)).toContain(`${graph.id}: required graph missing or unexpected image`);
  });
});
