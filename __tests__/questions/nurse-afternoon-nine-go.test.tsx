import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { historicalNurseHash } from "./nurse-pm-category-hash";
import { QuestionFigures } from "@/components/quiz/QuestionFigures";
import { KANGOSHI_QUESTIONS } from "@/data/questions/kangoshi";
import go9 from "@/docs/evidence/nurse-pm-go9-20261010/INTEGRATION.json";
import pm4 from "@/docs/evidence/nurse-pm4-followup-20261010/INTEGRATION.json";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import proof from "@/docs/evidence/nurse-afternoon-nine-go-20261010/INTEGRATION.json";

const sha = (value: string | Buffer) => createHash("sha256").update(value).digest("hex");
const byId = new Map(KANGOSHI_QUESTIONS.map(question => [question.id, question]));

describe("nursing PM nine verified follow-up originals", () => {
  it("preserves all 418 earlier objects and adds exactly the nine frozen IDs", () => {
    expect(proof.baseCommit).toBe("79f7f333d2618ed19c033cf353b8ddc29d7ea2c9");
    expect(proof.previous418ObjectHashes).toHaveLength(418);
    for (const old of proof.previous418ObjectHashes) expect(historicalNurseHash(byId.get(old.id), old.id), old.id).toBe(old.sha256);
    expect(KANGOSHI_QUESTIONS).toHaveLength(pm4.totalOriginals + 3);
    expect(new Set(KANGOSHI_QUESTIONS.map(question => question.id)).size).toBe(pm4.totalOriginals + 3);
    expect(KANGOSHI_QUESTIONS.reduce((total, question) => total + Object.keys(question.choices ?? {}).length, 0)).toBe(pm4.totalChoices + 12);
    expect(KANGOSHI_QUESTIONS.filter(question => question.numericAnswer)).toHaveLength(2);
    expect(proof.sourceChecks).toHaveLength(9);
    expect(proof.figureAssets).toHaveLength(5);
    for (const id of proof.keptUnregistered) if (!go9.addedIds.includes(id)) expect(byId.has(id), id).toBe(false);
  });

  it("retains exact source text, all choices, multi-answer keys, year and PM section", () => {
    for (const check of proof.sourceChecks) {
      const question = byId.get(check.id)!;
      expect(historicalNurseHash(question, check.id), check.id).toBe(check.objectSha256);
      expect(question.year).toBe(check.year);
      expect(question.session).toBe("pm");
      expect(question.qNumber).toBe(check.qNumber);
      expect(question.question).toBe(check.sourceStem);
      expect(Object.values(question.choices ?? {})).toEqual(check.sourceChoices);
      const selected = Array.isArray(question.answer) ? question.answer : [question.answer];
      expect(selected.map(answer => String(Object.keys(question.choices ?? {}).indexOf(answer as string) + 1))).toEqual(check.officialKey);
      expect(question.requiredSelections ?? 1).toBe(check.officialKey.length);
      expect(Object.keys(question.choiceExplanations ?? {}).sort()).toEqual(Object.keys(question.choices ?? {}).sort());
      expect(question.sourcePdfUrl).toContain("mhlw.go.jp");
      expect(question.sourceAnswerUrl).toContain("mhlw.go.jp");
      expect(isPracticeReadyQuestion(question)).toBe(true);
    }
    expect(byId.get("kangoshi-2025-annual-pm-q85")?.answer).toEqual(["ア", "イ"]);
    expect(byId.get("kangoshi-2025-annual-pm-q89")?.answer).toEqual(["エ", "オ"]);
    expect(byId.get("kangoshi-2024-annual-pm-q86")?.answer).toEqual(["イ", "ウ"]);
    expect(byId.get("kangoshi-2024-annual-pm-q80")?.choices?.オ).toBe("悪性新生物〈腫瘍〉\nmalignant neoplasm");
  });

  it("uses byte-identical original PDF crops and visible accessible images", () => {
    for (const asset of proof.figureAssets) {
      const question = byId.get(asset.id)!;
      const bytes = readFileSync(asset.publicPath);
      expect(sha(bytes), asset.id).toBe(asset.assetSha256);
      expect(bytes.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
      expect(bytes.readUInt32BE(16)).toBeGreaterThan(390);
      expect(question.imageUrls).toEqual(["/" + asset.publicPath.replace(/^public\//, "")]);
      expect(question.imageAltTexts?.[0]?.length).toBeGreaterThan(30);
      expect(question.sourcePdfUrl).toContain(`#page=${asset.sourcePdfPhysicalPage}`);
      const html = renderToStaticMarkup(<QuestionFigures question={question} />);
      const image = new DOMParser().parseFromString(html, "text/html").querySelector("img");
      expect(image?.getAttribute("src")).toBe(question.imageUrls?.[0]);
      expect(image?.getAttribute("alt")).toBe(question.imageAltTexts?.[0]);
    }
  });

  it("shows matching partial-collection counts and the unchanged exclusion caveat on the exam home", () => {
    const home = readFileSync("app/[exam]/page.tsx", "utf8");
    expect(home).toContain("午前235問と午後229問");
    expect(home).toContain("計464原問");
    expect(home).toContain("全1918肢");
    expect(home).toContain("午前 問32は厚生労働省が採点対象から除外");
  });
});
