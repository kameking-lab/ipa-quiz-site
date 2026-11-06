import { describe, expect, it } from "vitest";
import { KHK_HANBAI_STAGING } from "@/data/qualification-staging/khk-hanbai";
import fixed from "@/data/qualification-staging/khk-hanbai/official-answers.json";
import manifest from "@/data/qualification-staging/khk-hanbai/manifest.json";
import { validateKhkHanbaiStaging } from "@/scripts/validate-khk-hanbai";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { EXAM_CONFIGS, ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";

const questions = KHK_HANBAI_STAGING.flatMap(s => [...s.questions]);

describe("KHK sales and equipment academic papers in isolated staging", () => {
  it("validates 230 source-matched questions and all 1150 choice explanations", () => {
    expect(validateKhkHanbaiStaging()).toEqual({ count: 230, errors: [] });
    expect(questions.reduce((n, q) => n + Object.keys(q.choiceExplanations).length, 0)).toBe(1150);
    expect(KHK_HANBAI_STAGING.map(s => s.questions.length)).toEqual([80, 80, 70]);
  });

  it("pins every annual subject answer to independently transcribed official rows", () => {
    expect(fixed).toEqual({
      "2025-JX": "45342325124455524321", "2025-JY": "53522134214244254135",
      "2025-KX": "45333244331334423152", "2025-KY": "42511235252351125544",
      "2025-LX": "412451134452232", "2025-LY": "12354351551423232325",
      "2024-JX": "32213314241142341225", "2024-JY": "53531521414251542234",
      "2024-KX": "32213324453143345143", "2024-KY": "33443312342412425554",
      "2024-LX": "355122543442151", "2024-LY": "52415435351324333542",
    });
    for (const entry of KHK_HANBAI_STAGING) {
      for (const year of [2025, 2024]) {
        for (const session of entry.slug === "khk-setsubishi" ? ["houki", "piping"] : ["houki", "gas-technology"]) {
          const rows = entry.questions.filter(q => q.year === year && q.session === session);
          const prefix = entry.slug === "khk-hanbai" ? "J" : entry.slug === "khk-hanbai2" ? "K" : "L";
          const code = `${year}-${prefix}${session === "houki" ? "X" : "Y"}` as keyof typeof fixed;
          expect(rows.map(q => q.qNumber)).toEqual(Array.from({ length: entry.slug === "khk-setsubishi" && session === "houki" ? 15 : 20 }, (_, i) => i + 1));
          expect(rows.map(q => q.officialAnswerNumber).join("")).toBe(fixed[code]);
        }
      }
    }
  });

  it("keeps unpublished slugs out of configuration and all public question registries", () => {
    for (const entry of KHK_HANBAI_STAGING) {
      expect(entry.publicAllowed).toBe(false);
      expect(entry.questions.every(q => q.publicAllowed === false && q.needsReview === true)).toBe(true);
      const catalog = QUALIFICATION_CATALOG.find(q => q.slug === entry.slug);
      // The catalog entry is applied by the parent from reports/khk-hanbai-registry.md; until then it may be absent.
      if (catalog) expect(catalog.status).toBe("ready-to-ingest");
      expect(catalog?.examCode).toBeUndefined();
      expect(Object.keys(EXAM_CONFIGS)).not.toContain(entry.slug);
      expect(Object.keys(QUESTIONS_BY_EXAM)).not.toContain(entry.slug);
      expect(ALL_QUIZ_EXAM_CODES).not.toContain(entry.slug);
      expect(ALL_QUESTIONS.some(q => String(q.exam) === entry.slug)).toBe(false);
    }
  });

  it("preserves law sections, differing pressure conventions, and the Qmax glyph", () => {
    const find = (id: string) => questions.find(q => q.id === id)!;
    expect(find("khk-hanbai-2025-gas-technology-q1").sharedContext).toContain("絶対圧力");
    expect(find("khk-hanbai2-2025-gas-technology-q1").sharedContext).toContain("ゲージ圧力");
    expect(find("khk-hanbai2-2024-houki-q1").sharedContext).toContain("高圧ガス保安法");
    expect(find("khk-hanbai2-2024-houki-q11").sharedContext).toContain("液化石油ガス法");
    expect(find("khk-hanbai2-2024-gas-technology-q8").question).toContain("Qmax");
    expect(find("khk-hanbai-2025-gas-technology-q1").question).toContain("ｍ³");
    expect(find("khk-hanbai-2024-gas-technology-q1").choices.ア).toContain("kg/m³");
    const withImages = questions.filter(q => q.hasImage).map(q => q.id).sort();
    expect(withImages).toEqual([
      "khk-setsubishi-2024-piping-q12", "khk-setsubishi-2024-piping-q20",
      "khk-setsubishi-2025-piping-q12", "khk-setsubishi-2025-piping-q20",
    ]);
  });

  it("keeps the previously reviewed explanation corrections", () => {
    const first = questions.find(q => q.id === "khk-hanbai-2025-houki-q19")!;
    const second = questions.find(q => q.id === "khk-hanbai-2024-gas-technology-q19")!;
    for (const text of [first.explanation, ...Object.values(first.choiceExplanations)]) {
      expect(text).toContain("周知対象になるのはロのアセチレンのみ");
      expect(text).not.toContain("水素とアセチレンは周知対象");
    }
    for (const text of [second.explanation, ...Object.values(second.choiceExplanations)]) {
      expect(text).toContain("大量の水を使用するニは正しい");
      expect(text).not.toContain("大量の水での除害に適さない");
    }
    const period = questions.find(q => q.id === "khk-hanbai2-2025-houki-q17")!;
    for (const text of [period.explanation, period.choiceExplanations.ア, period.choiceExplanations.イ, period.choiceExplanations.ウ]) {
      expect(text).toContain("充てん期間");
      expect(text).toContain("満了から6か月");
    }
  });

  it("preserves both R7 equipment cover instructions in all 15 questions", () => {
    const rows = KHK_HANBAI_STAGING[2].questions.filter(q => q.year === 2025 && q.session === "houki");
    expect(rows).toHaveLength(15);
    for (const q of rows) {
      expect(q.sharedContext).toContain("問題中において特に記述のない場合、圧力はゲージ圧力で表しています。");
      expect(q.sharedContext).toContain("およびその政省令に基づいて答えてください。");
      expect(q.sharedContext).toContain("令和7 年4 月1 日");
    }
    const broken = structuredClone(questions);
    const victim = broken.find(q => q.id === "khk-setsubishi-2025-houki-q8")!;
    // A substring of the original is still source-matching, but incomplete.
    victim.sharedContext = victim.sharedContext.split("\n\n")[1]!;
    expect(validateKhkHanbaiStaging(broken).errors.some(e => e.includes("required equipment cover instructions missing"))).toBe(true);
  });

  it("completes equipment piping (LY) from the recovered official -W-W.pdf papers", () => {
    expect(manifest.targetTotal).toBe(230);
    expect(manifest.remainingQuestions).toBe(0);
    expect(manifest.missingPdfUrls).toHaveLength(0);
    expect(manifest.qualifications.find(q => q.slug === "khk-setsubishi")?.complete).toBe(true);
    const piping = KHK_HANBAI_STAGING[2].questions.filter(q => q.session === "piping");
    expect(piping).toHaveLength(40);
    expect(piping.every(q => q.sourcePdfUrl.endsWith("ACLY-W-W.pdf") && q.category === "配管理論等")).toBe(true);
    const r7 = piping.find(q => q.id === "khk-setsubishi-2025-piping-q1")!;
    expect(r7.sharedContext).toContain("ゲージ圧力");
    const broken = structuredClone(questions);
    const victim = broken.find(q => q.id === "khk-setsubishi-2025-piping-q12")! as Record<string, unknown>;
    victim.imageSha256s = ["0".repeat(64)];
    expect(validateKhkHanbaiStaging(broken).errors.some(e => e.includes("image"))).toBe(true);
  });

  it.each([
    ["publication flag", (q: Record<string, unknown>) => { q.publicAllowed = true; }],
    ["official answer", (q: Record<string, unknown>) => { q.answer = "ア"; }],
    ["raw wording", (q: Record<string, unknown>) => { q.question = String(q.question) + "改変"; }],
    ["shared conditions", (q: Record<string, unknown>) => { q.sharedContext = "共通条件を省略した本文"; }],
    ["source URL", (q: Record<string, unknown>) => { q.sourcePdfUrl = "https://example.com/fake.pdf"; }],
  ])("rejects corrupted %s", (_name, mutate) => {
    const broken = structuredClone(questions);
    mutate(broken[0] as unknown as Record<string, unknown>);
    expect(validateKhkHanbaiStaging(broken).errors.length).toBeGreaterThan(0);
  });

  it("rejects gaps and duplicated question identities", () => {
    expect(validateKhkHanbaiStaging(questions.slice(1)).errors.length).toBeGreaterThan(0);
    expect(validateKhkHanbaiStaging([...questions.slice(1), questions[1]]).errors.length).toBeGreaterThan(0);
  });
});
