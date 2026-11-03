import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { DB_QUESTIONS } from "@/data/questions/db";
import { PM_QUESTIONS } from "@/data/questions/pm";
import { ST_QUESTIONS } from "@/data/questions/st";
import { SM_QUESTIONS } from "@/data/questions/sm";
import { AU_QUESTIONS } from "@/data/questions/au";
import { ES_QUESTIONS } from "@/data/questions/es";
import papers from "@/reports/cloud-ipa-am2-latest2-sources.json";

const questions = [...DB_QUESTIONS, ...PM_QUESTIONS, ...ST_QUESTIONS,
  ...SM_QUESTIONS, ...AU_QUESTIONS, ...ES_QUESTIONS];

describe("IPA official latest two public morning II papers", () => {
  for (const paper of papers) {
    it(`${paper.exam}/${paper.year}: retains all 25 official answers`, () => {
      const actual = questions.filter(q => q.exam === paper.exam && q.year === paper.year
        && q.season === paper.season && q.session === "am2")
        .sort((a, b) => a.qNumber - b.qNumber);
      expect(actual.map(q => q.qNumber)).toEqual(Array.from({ length: 25 }, (_, i) => i + 1));
      expect(actual.map(q => q.answer).join("")).toBe(paper.answers);
      expect(new Set(actual.map(q => q.id)).size).toBe(25);
      for (const q of actual) {
        expect(q.sourcePdfUrl, q.id).toBe(paper.questionUrl);
        expect(q.license, q.id).toBe("IPA-public");
        if (paper.contentAudit !== "complete") continue;
        expect(q.sourceAnswerUrl, q.id).toBe(paper.answerUrl);
        if (q.hasImage) expect(q.imageUrls?.length, q.id).toBeGreaterThan(0);
        for (const url of [...(q.imageUrls ?? []), ...Object.values(q.choiceImageUrls ?? {})]) {
          expect(existsSync(join(process.cwd(), "public", url!)), `${q.id}: ${url}`).toBe(true);
        }
      }
    });
  }

  it("keeps the corrected RSA verification choice and total productivity formula", () => {
    const signature = DB_QUESTIONS.find(q => q.id === "db-2025a-am2-q20")!;
    expect(signature.choices?.ウ).toBe("送信者の公開鍵であり，受信者がデジタル署名からメッセージダイジェストを取り出す際に使用する。");
    const productivity = PM_QUESTIONS.find(q => q.id === "pm-2024a-am2-q10")!;
    expect(productivity.choices?.ウ).toBe("1/X+1/Y+1/Z");
    expect(productivity.choices?.エ).toBe("1/(1/X+1/Y+1/Z)");
    expect(productivity.explanation).toContain("分子を3にはしません");
  });

  it("keeps the wait graph and EVM values readable without loading images", () => {
    const wait = DB_QUESTIONS.find(q => q.id === "db-2024a-am2-q13")!;
    expect(wait.question).toContain("待ちグラフの全ての矢印：C→A，C→B，B→D，D→C，D→E，F→D，F→E，E→G。");
    expect(wait.choices).toEqual({ ア: "A，B，C，D", イ: "B，C，D", ウ: "B，C，D，F", エ: "C，D，E，F，G" });
    const evm = PM_QUESTIONS.find(q => q.id === "pm-2024a-am2-q4")!;
    expect(evm.question).toContain("完成時総予算BAC=100。現時点のPV=50，AC=40，EV=34。");
    expect(evm.question).toContain("PVは開始日から完了予定日まで直線状に増加し，現時点は期間の半分。");
    expect(evm.choices).toEqual({ ア: "0.6", イ: "0.9", ウ: "1.1", エ: "1.3" });
    for (const q of [wait, evm]) {
      expect(q.hasImage, q.id).toBe(true);
      expect(q.imageUrls, q.id).toHaveLength(1);
      expect(q.imageAltTexts?.[0], q.id).toContain("本文に記載");
    }
  });

  it("retains text stems and choices throughout DB and PM", () => {
    for (const q of [...DB_QUESTIONS, ...PM_QUESTIONS]) {
      expect(q.question.replace(/!\[[^\]]*\]\([^)]*\)|<[^>]*>/g, "").trim(), q.id).not.toBe("");
      for (const [key, text] of Object.entries(q.choices ?? {})) {
        expect(text.trim(), `${q.id}/${key}`).not.toBe("");
      }
    }
  });

  it("preserves the distinct primary-key underlines and graphical choices", () => {
    for (const id of ["db-2025a-am2-q4", "db-2024a-am2-q3", "db-2024a-am2-q6",
      "db-2024a-am2-q9", "pm-2025a-am2-q9", "pm-2025a-am2-q18"]) {
      const q = questions.find(q => q.id === id)!;
      expect(q.hasImage, id).toBe(true);
      expect(Object.keys(q.choiceImageUrls ?? {}), id).toEqual(["ア", "イ", "ウ", "エ"]);
      expect(new Set(Object.values(q.choiceImageUrls ?? {})).size, id).toBe(4);
    }
  });
});
