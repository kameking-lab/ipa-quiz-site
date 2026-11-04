import { describe, expect, it } from "vitest";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { SOKURYOSHI_STAGED_QUESTIONS, SOKURYOSHI_STAGING } from "@/data/qualification-staging/sokuryoshi";
import source from "@/data/qualification-staging/sokuryoshi/source-manifest.json";
import keys from "@/data/qualification-staging/sokuryoshi/official-answer-keys.json";
import descriptiveKeys from "@/data/qualification-staging/sokuryoshi/official-descriptive-sections.json";
import { validateSokuryoshiStaging } from "@/scripts/qualification-ingestion/validate-sokuryoshi";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";
import { ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
import { getRegisteredExamCodes } from "@/lib/questions/get-questions";

// Independently fixed against the official one-page answer PDFs, not generated from question records.
const official2025 = [2,4,1,2,2,2,3,1,5,4,2,5,5,3,2,1,3,3,3,4,4,5,4,2,2,4,3,2];
const official2026 = [4,4,4,4,3,5,3,5,3,4,3,1,4,2,2,1,2,1,2,3,4,5,3,3,4,5,5,2];

describe("sokuryoshi: two complete private source-image rounds", () => {
  it("matches 56 official answers and covers every original exactly once", () => {
    expect(SOKURYOSHI_STAGED_QUESTIONS).toHaveLength(66);
    expect(new Set(SOKURYOSHI_STAGED_QUESTIONS.map(q=>q.id)).size).toBe(66);
    for (const [year, answers] of [[2025,official2025],[2026,official2026]] as const) {
      const questions = SOKURYOSHI_STAGED_QUESTIONS.filter(q=>q.year===year);
      const am = questions.filter(q=>q.type==="multiple-choice");
      expect(am.map(q=>q.officialQuestionNumber)).toEqual(Array.from({length:28},(_,i)=>i+1));
      expect(am.map(q=>q.officialAnswerNumber)).toEqual(answers);
      expect(keys[String(year) as keyof typeof keys].answers).toEqual(answers);
      expect(questions.filter(q=>q.type==="descriptive").map(q=>q.officialQuestionNumber)).toEqual([1,2,3,4,5]);
      for (const q of am) {
        expect(q.choices!.map(c=>c.officialNumber)).toEqual([1,2,3,4,5]);
        expect(new Set(q.choices!.map(c=>c.explanation)).size).toBe(5);
        for (const c of q.choices!) expect(c.explanation.length).toBeGreaterThan(25);
      }
    }
  });

  it("keeps questions, maps and answer diagrams out of public registries", () => {
    expect(SOKURYOSHI_STAGING.publicAllowed).toBe(false);
    for (const q of SOKURYOSHI_STAGED_QUESTIONS) {
      expect(q.publicAllowed).toBe(false);
      expect(q.needsReview).toBe(true); // human source review remains a separate publication prerequisite
    }
    expect(QUALIFICATION_CATALOG.some(q=>q.slug==="sokuryoshi")).toBe(false);
    expect(ALL_QUIZ_EXAM_CODES as readonly string[]).not.toContain("sokuryoshi");
    expect(getRegisteredExamCodes()).not.toContain("sokuryoshi");
    for (const p of ["public/questions/sokuryoshi","public/exam-library/sokuryoshi"]) expect(existsSync(p)).toBe(false);
    for (const file of ["data/questions/index.ts","lib/questions/get-questions.ts","lib/exam-library-catalog.ts"]) {
      expect(readFileSync(file,"utf8")).not.toContain("qualification-staging/sokuryoshi");
    }
  });

  it("verifies all 186 lossless source pages, retrieval records and page mappings", () => {
    expect(source.documents).toHaveLength(13);
    expect(source.documents.reduce((n,d)=>n+d.pages.length,0)).toBe(186);
    expect(source.missingPdfUrls).toEqual([]);
    expect(validateSokuryoshiStaging()).toEqual({count:66,errors:[]});
    const q21 = SOKURYOSHI_STAGED_QUESTIONS.filter(q=>q.session==="am"&&q.officialQuestionNumber===21);
    for (const q of q21) expect(q.originalQuestion.sourcePages).toHaveLength(2);
    for (const year of [2025,2026]) {
      const q3 = SOKURYOSHI_STAGED_QUESTIONS.find(q=>q.year===year&&q.session==="pm"&&q.officialQuestionNumber===3)!;
      expect(new Set(q3.originalQuestion.sourcePages.map(p=>p.documentId)).size).toBe(2);
    }
  });

  it("preserves descriptive answers as official examples with every question's two answer pages", () => {
    const pm = SOKURYOSHI_STAGED_QUESTIONS.filter(q=>q.type==="descriptive");
    expect(pm).toHaveLength(10);
    for (const q of pm) {
      expect(q.automaticScoringAllowed).toBe(false);
      expect(q.originalAnswer.format).toBe("official-example-images");
      expect(q.originalAnswer.sourcePages.map(p=>p.page)).toEqual([2*q.officialQuestionNumber-1,2*q.officialQuestionNumber]);
      expect(q.answerSheetPages).toHaveLength(2);
      expect(q.explanationSections!.length).toBeGreaterThanOrEqual(8);
      const table = descriptiveKeys[String(q.year) as keyof typeof descriptiveKeys].questions;
      const official = table[String(q.officialQuestionNumber) as keyof typeof table];
      expect(q.explanationSections!.map(s=>s.label.replace(/^問/,""))).toEqual(official.labels);
      expect(q).not.toHaveProperty("officialAnswerNumber");
      expect(q).not.toHaveProperty("choices");
    }
    for (const round of SOKURYOSHI_STAGING.rounds) expect(round.instructions).toEqual({
      morningQuestionCount:28,mandatoryAfternoonNumber:1,optionalAfternoonNumbers:[2,3,4,5],requiredOptionalCount:2,
    });
  });

  it("retains no downloaded PDF binaries in the staging archive", () => {
    const files = readdirSync(join(process.cwd(),"data/qualification-staging/sokuryoshi"),{recursive:true});
    expect(files.filter(f=>String(f).endsWith(".pdf"))).toEqual([]);
  });

  it("locks the reviewed calculation and subquestion mappings to the official examples", () => {
    const find = (year: number, session: string, number: number) => SOKURYOSHI_STAGED_QUESTIONS.find(
      q=>q.year===year&&q.session===session&&q.officialQuestionNumber===number,
    )!;
    const uav = find(2026,"am",20);
    expect(uav.officialAnswerNumber).toBe(3);
    expect(uav.explanation).toContain("45度以上");
    expect(uav.choices![2].explanation).toContain("全て正しい");
    expect(uav.choices![4].explanation).toContain("数値写真");
    // Independently solve equal triangle areas; the diagram's 150 degrees is an exterior angle.
    const ap = 37*74/(74*Math.cos(Math.PI/6)+37*Math.sin(Math.PI/6));
    expect(ap).toBeCloseTo(33.1529,3);
    const boundary = find(2026,"am",27);
    expect(boundary.explanation).toContain("148/(2√3+1)");
    expect(boundary.explanation).toContain("∠PAB=30度");
    const section = (year: number, number: number, label: string) => find(year,"pm",number).explanationSections!.find(s=>s.label===label)!.text;
    for (const [label, value] of [["問A-1","1820m"],["問A-2","8コース"],["問A-3","248枚"],["問A-4","2100m"]]) {
      expect(section(2025,3,label)).toContain(value);
    }
    expect(section(2025,3,"問B-4")).toContain("3460m以下");
    expect(section(2025,2,"問B-3")).toContain("1.5km");
    expect(section(2025,2,"問A-4")).toContain("全ての既知点");
    expect(section(2026,1,"問D-2")).toContain("新技術を公共測量に用いる際");
    expect(section(2026,3,"問C-1")).toContain("aは○");
    expect(section(2025,4,"問B-4")).toContain("座標系");
    expect(section(2025,5,"問A-4")).toContain("別の既知点");
    expect(section(2025,5,"問A-4")).toContain("対辺測定");
    expect(section(2025,5,"問B-1")).toContain("条件点");
    expect(section(2025,5,"問B-1")).toContain("線形図データファイル");
    expect(SOKURYOSHI_STAGING.manifest.afternoonExplanationSectionCount).toBe(104);
    const river = find(2026,"am",28);
    expect(river.choices![1].explanation).toContain("両岸");
    expect(river.choices![2].explanation).toContain("水準基標");
    expect(river.choices![3].explanation).toContain("定期縦断測量");
    expect(river.choices![3].explanation).toContain("平地");
    expect(section(2025,5,"問C-2")).toContain("左右各12m");
    for (const token of ["公共団体","補助","土地の測量","測量の重複","測量の正確さ","測量用写真の撮影","測量成果","局地的","基本測量以外の測量","測量士","測量成果の正確さ"]) expect(section(2025,1,"問A")).toContain(token);
    for (const token of ["測量の基礎","測量成果","測量記録","基本測量以外の測量","営業所"]) expect(section(2026,1,"問A")).toContain(token);
    expect(section(2026,1,"問B-3")).toContain("セキュリティ対策の施されていないパソコンの使用");
    for (const token of ["自律飛行","解除できる","航空法","人口集中"]) expect(section(2025,3,"問B-1")).toContain(token);
    for (const token of ["グラウンドデータ","オリジナルデータ","最近隣法","補備測量","精度管理表"]) expect(section(2026,1,"問D-3")).toContain(token);
    for (const token of ["直接測量費","間接測量費","直接経費","技術管理費","成果検定費"]) expect(section(2026,1,"問C-2")).toContain(token);
    for (const token of ["緑色","反射","近赤外","透過","屈折"]) expect(section(2026,5,"問C-1")).toContain(token);
    expect(section(2026,5,"問C-1")).toContain("水中をほとんど透過しない");
    expect(section(2025,3,"問B-1")).toContain("ブレ");
    expect(section(2025,3,"問B-1")).not.toContain("ひずみ");
  });
});
