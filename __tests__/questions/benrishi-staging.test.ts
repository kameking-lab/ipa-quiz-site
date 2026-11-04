import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { BENRISHI_REGISTRATION, BENRISHI_STAGED_QUESTIONS as questions } from "@/data/qualification-staging/benrishi";
import paper2025 from "@/data/qualification-staging/benrishi/2025.json";
import paper2026 from "@/data/qualification-staging/benrishi/2026.json";
import keys from "@/data/qualification-staging/benrishi/official-answer-keys.json";
import manifest from "@/data/qualification-staging/benrishi/source-manifest.json";
import proof from "@/data/qualification-staging/benrishi/source-audit.json";
import { validateBenrishiPaper, validateBenrishiStaging } from "../../scripts/lib/validate-benrishi-staging";
import { ALL_QUESTIONS } from "@/data/questions";
import { EXAM_CONFIGS, ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";
import { getHomeDirectory } from "@/lib/home/home-directory";

// Independently read from the two saved official answer-page images.
const official = {
  2025: [4,2,5,1,5,2,4,3,2,4,5,2,3,1,3,5,4,5,4,3,1,4,3,3,2,1,1,5,5,4,1,5,2,5,4,2,3,4,2,5,3,1,4,3,2,2,2,1,3,3,2,3,4,3,3,5,5,1,5,2],
  2026: [4,2,2,2,4,3,3,1,5,1,4,2,5,4,2,3,3,5,5,2,5,4,1,1,2,4,5,3,1,5,2,1,5,4,1,3,5,2,3,2,4,4,2,3,2,2,4,2,2,5,1,4,5,3,5,4,3,4,2,5],
};

describe("弁理士短答式・直近2回の未公開収録", () => {
  it("全120原問・全600肢と公式正答120件、独立転記フィンガープリントを検証する", () => {
    expect(validateBenrishiStaging()).toBe(120);
    expect(new Set(questions.map(q => q.id)).size).toBe(120);
    for (const year of [2025,2026] as const) {
      const round = questions.filter(q => q.id.startsWith(`benrishi-${year}-`));
      expect(round).toHaveLength(60);
      expect(round.map(q => q.correctChoice)).toEqual(official[year]);
      expect(round.map(q => q.officialAnswerNumber)).toEqual(official[year].map(String));
    }
    expect(proof.questions.filter(q => q.mode === "independent-pypdf-text")).toHaveLength(119);
    expect(proof.questions.filter(q => q.mode === "visual-table-and-text")).toHaveLength(1);
    expect(proof.mismatches).toEqual([]);
  });

  it("全肢の固有説明、個数・組合せ問題の内部記述の理由、出典と人手校閲の保留を保持する", () => {
    for (const q of questions) {
      expect(q.publicAllowed).toBe(false);
      expect(q.needsReview).toBe(true);
      expect(q.choiceExplanations).toHaveLength(5);
      expect(new Set(q.choiceExplanations.map(c => c.explanation)).size).toBe(5);
      expect(q.explanationCoverage).toBe("all-choices");
      expect(q.officialReferenceUrls.length).toBeGreaterThan(0);
      expect(q.originalText).toContain(q.category);
      for (const c of q.choiceExplanations) expect(c.explanation.length).toBeGreaterThanOrEqual(20);
      if (/\([ｲﾛﾊﾆﾎ]\)/.test(q.text)) expect(q.statementExplanations.map(s => s.label)).toEqual(["イ","ロ","ハ","ニ","ホ"]);
    }
  });

  it("罰金刑の有無と副本送達前の補正許可を誤らない（2026特許20）", () => {
    const q = questions.find(q => q.id === "benrishi-2026-patent-20")!;
    expect(q.statementExplanations.filter(s => s.correct).map(s => s.label)).toEqual(["イ","ニ"]);
    expect(q.statementExplanations[1].explanation).toContain("第3項");
    expect(q.statementExplanations[3].explanation).toContain("罰金刑は規定されていない");
  });

  it("通常返還と職権返還を区別する（2025特許15）", () => {
    const q = questions.find(q => q.id === "benrishi-2025-patent-15")!;
    expect(q.statementExplanations.filter(s => s.correct).map(s => s.label)).toEqual(["イ","ニ"]);
    expect(q.statementExplanations[0].explanation).toContain("請求を要件としていない");
    expect(q.statementExplanations[1].explanation).toContain("含まれない");
  });

  it("独立レビュー指摘の個数だけ一致する誤判定と条番号誤引用を固定する", () => {
    const split = questions.find(q => q.id === "benrishi-2025-patent-09")!;
    expect(split.correctChoice).toBe(2);
    expect(split.statementExplanations.filter(s => !s.correct).map(s => s.label)).toEqual(["イ","ニ"]);
    expect(split.statementExplanations[0].explanation).toContain("Ｂの出願日は遡及しない");
    expect(split.statementExplanations[1].explanation).toContain("期間を例外とする");
    const evidence = questions.find(q => q.id === "benrishi-2025-patent-05")!;
    expect(evidence.choiceExplanations[3].explanation).toContain("151条で準用する民訴法238条");
    const suspension = questions.find(q => q.id === "benrishi-2026-patent-03")!;
    expect(suspension.statementExplanations[4].correct).toBe(true);
    expect(suspension.statementExplanations[4].explanation).toContain("民訴法131条1項");
    const damages = questions.find(q => q.id === "benrishi-2026-patent-07")!;
    expect(damages.statementExplanations[3].explanation).toContain("105条の2の12");
    const renewal = questions.find(q => q.id === "benrishi-2026-trademark-07")!;
    expect(renewal.choiceExplanations[1].explanation).toContain("直ちに消滅せず");
    const opposition = questions.find(q => q.id === "benrishi-2026-trademark-09")!;
    expect(opposition.choiceExplanations[4].explanation).toContain("通知義務は異議手続には定められていない");
    const name = questions.find(q => q.id === "benrishi-2025-trademark-05")!;
    expect(name.choiceExplanations[0].explanation).toContain("略称自体にも必要");
    expect(name.choiceExplanations[3].explanation).toContain("商標法38条の2");
    expect(name.choiceExplanations[2].explanation).toContain("特許法77条4項");
    expect(name.choiceExplanations[4].explanation).toContain("抗弁の提出者は");
    expect(name.choiceExplanations[4].explanation).toContain("者だけに限定されない");
    const invalidity = questions.find(q => q.id === "benrishi-2026-patent-10")!;
    expect(invalidity.statementExplanations[3].correct).toBe(false);
    expect(invalidity.statementExplanations[3].explanation).toContain("請求できない者も、無効の抗弁を提出できる");
    const utility = questions.find(q => q.id === "benrishi-2025-patent-16")!;
    expect(utility.statementExplanations[4].explanation).toContain("実用新案法6条の2");
    const unfair = questions.find(q => q.id === "benrishi-2025-copyright-unfair-competition-08")!;
    expect(unfair.choiceExplanations[2].explanation).toContain("19条1項9号ロ");
    expect(unfair.choiceExplanations[4].explanation).toContain("19条1項7号");
    const examination = questions.find(q => q.id === "benrishi-2025-patent-17")!;
    expect(examination.statementExplanations[2].explanation).toContain("請求前にしたものを対象から除く");
    expect(examination.statementExplanations[3].explanation).toContain("54条1項");
    const costs = questions.find(q => q.id === "benrishi-2026-patent-20")!;
    expect(costs.statementExplanations[4].explanation).toContain("費用額は請求により");
  });

  it("原表・語群20語・番号付き空欄と番号なし空欄を省略しない", () => {
    const q = paper2025.questions[18];
    expect(q.sourcePages).toEqual([23,24]);
    expect(q.sourceImages).toHaveLength(2);
    expect(q.text.split("【語群】").at(-1)!.split("／")).toHaveLength(20);
    expect(q.text.match(/［空欄］/g)).toHaveLength(5);
    expect(q.choices[3].text).toBe("①無期限・無制限に／②要旨を変更／③職権探知／④合理的理由");
    expect(manifest.visualObjectAudit).toEqual([{year:2025,page:23,images:0,drawings:176},{year:2025,page:24,images:0,drawings:97}]);
    expect(manifest.assets).toHaveLength(130);
  });

  it.each(["answer","publication","source","choice-order","missing-statement","explanation","page"])("破損を拒否する: %s", kind => {
    const p = structuredClone(paper2025);
    if (kind === "answer") p.questions[0].correctChoice = 1;
    if (kind === "publication") p.publicAllowed = true;
    if (kind === "source") p.questions[0].sourceAnswerUrl = paper2026.questions[0].sourceAnswerUrl;
    if (kind === "choice-order") p.questions[0].choices.reverse();
    if (kind === "missing-statement") p.questions[1].statementExplanations.pop();
    if (kind === "explanation") p.questions[0].choiceExplanations[4].explanation = "";
    if (kind === "page") p.questions[0].sourceImages = [];
    expect(() => validateBenrishiPaper(p,keys["2025"])).toThrow();
  });

  it("公開設定・問題プール・ナビゲーションへ接続しない", () => {
    expect(BENRISHI_REGISTRATION.publicAllowed).toBe(false);
    const entry = QUALIFICATION_CATALOG.find(q => q.slug === "benrishi")!;
    expect(entry.status).toBe("terms-review-required");
    expect(entry.examCode).toBeUndefined();
    expect(entry.stagingDataPath).toBe("data/qualification-staging/benrishi");
    expect(Object.keys(EXAM_CONFIGS)).not.toContain("benrishi");
    expect(ALL_QUIZ_EXAM_CODES).not.toContain("benrishi");
    expect(ALL_QUESTIONS.some(q => q.id.startsWith("benrishi-"))).toBe(false);
    expect(getHomeDirectory().flatMap(d => [...d.featured,...d.compact]).some(c => c.href.includes("benrishi"))).toBe(false);
    expect(readFileSync("lib/questions/get-questions.ts","utf8")).not.toContain("benrishi");
    expect(existsSync("public/questions/benrishi")).toBe(false);
    expect(existsSync("app/benrishi")).toBe(false);
  });
});
