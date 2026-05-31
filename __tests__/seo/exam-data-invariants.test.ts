import { describe, it, expect } from "vitest";
import { EXAM_STATS } from "@/lib/seo/exam-stats";
import { EXAM_OFFICIAL_LINKS, EXAM_ROADMAP } from "@/lib/seo/exam-resources";
import { EXAM_DEEP_CONTENT } from "@/lib/seo/exam-content";
import type { ExamCode } from "@/lib/questions/types";

// 試験区分ごとの静的データ（合格率/学習時間・公式リンク・ロードマップ・関連試験）は
// 全試験ハブ /[exam]（indexable）で描画される。Record<ExamCode,_> の型はキー網羅を
// 強制するが、値の不変条件（学習時間レンジの大小・合格率の表記形式・ロードマップの月数
// 降順・relatedExams の自己参照/重複/内部リンク健全性）は型では守れず、人手の編集で
// 静かに壊れて「逆転したレンジ表示」「自分自身への循環リンク」「React キー衝突」等の
// 実害になりうる。値の不変条件を回帰固定する。

// EXAM_STATS は Record<ExamCode,_> なので全 ExamCode キーを保持する（型保証）。
// それを唯一の真実のキー集合として他データと突き合わせる。
const EXAM_CODES = Object.keys(EXAM_STATS) as ExamCode[];

describe("EXAM_STATS の値不変条件", () => {
  it("学習時間は正で low <= high（/[exam] でレンジ表示される）", () => {
    for (const code of EXAM_CODES) {
      const s = EXAM_STATS[code];
      expect(s.studyHoursLow, code).toBeGreaterThan(0);
      expect(s.studyHoursHigh, code).toBeGreaterThanOrEqual(s.studyHoursLow);
    }
  });

  it("合格率レンジは NN-NN 形式で low <= high", () => {
    for (const code of EXAM_CODES) {
      const recent = EXAM_STATS[code].passRateRecent;
      expect(recent, code).toMatch(/^\d+-\d+$/);
      const [lo, hi] = recent.split("-").map(Number);
      expect(hi, code).toBeGreaterThanOrEqual(lo);
    }
  });

  it("トレンド・出題分野コメントは非空", () => {
    for (const code of EXAM_CODES) {
      expect(EXAM_STATS[code].passRateTrend.trim().length, code).toBeGreaterThan(0);
      expect(EXAM_STATS[code].topicTrend.trim().length, code).toBeGreaterThan(0);
    }
  });
});

describe("EXAM_OFFICIAL_LINKS の値不変条件", () => {
  it("overview/syllabus/pastQuestions は IPA 公式ドメインの https URL", () => {
    for (const code of EXAM_CODES) {
      const links = EXAM_OFFICIAL_LINKS[code];
      for (const url of [links.overview, links.syllabus, links.pastQuestions]) {
        expect(url, code).toMatch(/^https:\/\/www\.ipa\.go\.jp\/shiken\//);
      }
    }
  });
});

describe("EXAM_ROADMAP の値不変条件", () => {
  it("各試験はステップを持ち、monthsBefore は厳密降順かつ非負（試験が近づくほど小さい）", () => {
    // 注: 全試験が 0 に着地するわけではない（例: fe は最終ステップが 1ヶ月前）。
    // 契約は「厳密降順・非負・先頭 > 末尾」であり、0 着地は強制しない。
    for (const code of EXAM_CODES) {
      const steps = EXAM_ROADMAP[code];
      expect(steps.length, code).toBeGreaterThan(0);
      for (let i = 1; i < steps.length; i++) {
        expect(steps[i].monthsBefore, `${code} step ${i}`).toBeLessThan(steps[i - 1].monthsBefore);
      }
      expect(steps[steps.length - 1].monthsBefore, code).toBeGreaterThanOrEqual(0);
      expect(steps[0].monthsBefore, code).toBeGreaterThan(steps[steps.length - 1].monthsBefore);
    }
  });

  it("各ステップの title / body は非空", () => {
    for (const code of EXAM_CODES) {
      for (const step of EXAM_ROADMAP[code]) {
        expect(step.title.trim().length, code).toBeGreaterThan(0);
        expect(step.body.trim().length, code).toBeGreaterThan(0);
      }
    }
  });
});

describe("EXAM_DEEP_CONTENT の値不変条件", () => {
  const codeSet = new Set<string>(EXAM_CODES);

  it("リード文・主要分野は非空で description を伴う", () => {
    for (const code of EXAM_CODES) {
      const c = EXAM_DEEP_CONTENT[code];
      expect(c.leadParagraph.trim().length, code).toBeGreaterThan(0);
      expect(c.mainTopics.length, code).toBeGreaterThan(0);
      for (const t of c.mainTopics) {
        expect(t.name.trim().length, code).toBeGreaterThan(0);
        expect(t.description.trim().length, code).toBeGreaterThan(0);
      }
    }
  });

  it("relatedExams は自己参照せず・重複せず・実在の ExamCode を指す（/[exam] 内部リンク健全性）", () => {
    for (const code of EXAM_CODES) {
      const related = EXAM_DEEP_CONTENT[code].relatedExams;
      const seen = new Set<string>();
      for (const r of related) {
        expect(codeSet.has(r.exam), `${code} -> ${r.exam} は実在コード`).toBe(true);
        expect(r.exam, `${code} は自分自身を関連試験にしない`).not.toBe(code);
        expect(seen.has(r.exam), `${code} の relatedExams ${r.exam} は重複しない`).toBe(false);
        seen.add(r.exam);
        expect(r.reason.trim().length, `${code} -> ${r.exam}`).toBeGreaterThan(0);
      }
    }
  });
});
