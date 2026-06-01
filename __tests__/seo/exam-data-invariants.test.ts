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

  // SC(情報処理安全確保支援士)午後は 2023年4月改定で午後I・午後IIが単一の午後(記述式)に
  // 統合済(IPA 公式 kubun/sc.html・exam-data SC profile・SC leadParagraph も単一午後)。
  // SC ロードマップは廃止済みの「午後 I」「午後 II」ステップを持たない。
  // (NW/DB/ES は午後I・IIが現存するため対象外＝SC のみの契約)。session20の sc-shikaku-merit
  // 同種是正と整合。/sc ハブ(indexable)に step.title が描画されるため誤構造の露出を防ぐ。
  it("sc ロードマップは統合後の午後（記述式）で、廃止済み 午後I/午後II を持たない", () => {
    const titles = EXAM_ROADMAP.sc.map((s) => s.title);
    expect(titles.some((t) => t.includes("午後 I") || t.includes("午後I"))).toBe(false);
    expect(titles.some((t) => t.includes("午後 II") || t.includes("午後II"))).toBe(false);
    // 統合後の午後記述ステップが存在する（non-vacuous）。
    expect(titles.some((t) => t.includes("午後 記述"))).toBe(true);
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

  // 高度試験の実施時期グルーピング（IPA 公式: 令和7年度春期 r07haru_exam.html ＝ list.html）。
  // 春期=ST/SA/NW/SM・秋期=PM/DB/ES/AU・SC=春秋両方。leadParagraph は /[exam] ハブ
  // （indexable）に描画されるため、誤った季が出ると「次に何を受けられるか」の判断を誤らせる。
  // 季の取り違え（NW/SM を秋期、ES/AU を春期 等）を回帰固定する。
  // ※ 2026年度の CBT 移行に伴う「春期/秋期」→「前期/後期」名称変更（HD-7）でも
  //   グルーピング自体は不変（前期=旧春期・後期=旧秋期）＝本契約は名称変更後も有効。
  it("leadParagraph の実施時期は IPA 公式グルーピングと一致する（高度8区分・SC=両期）", () => {
    const SPRING: ExamCode[] = ["st", "sa", "nw", "sm"];
    const AUTUMN: ExamCode[] = ["pm", "db", "es", "au"];
    for (const code of SPRING) {
      const lead = EXAM_DEEP_CONTENT[code].leadParagraph;
      expect(lead, `${code} は春期実施`).toContain("春期年 1 回実施");
      expect(lead, `${code} は秋期と誤記しない`).not.toContain("秋期年 1 回実施");
    }
    for (const code of AUTUMN) {
      const lead = EXAM_DEEP_CONTENT[code].leadParagraph;
      expect(lead, `${code} は秋期実施`).toContain("秋期年 1 回実施");
      expect(lead, `${code} は春期と誤記しない`).not.toContain("春期年 1 回実施");
    }
    // SC は春秋両方（年2回）。片方の季の「年1回実施」と誤記しない。
    const sc = EXAM_DEEP_CONTENT.sc.leadParagraph;
    expect(sc).toContain("年 2 回（春・秋）実施");
  });

  // SC 合格後に登録できる国家資格の正式名称は「情報処理安全確保支援士（登録セキスペ）」
  // (IPA 公式 kubun/sc.html)。RISS = Registered Information Security Specialist の英語名。
  // 「登録情報セキュリティスペシャリスト」は IPA が用いない逆翻訳で不正確
  // (session21 で faq.ts の同種誤称号を是正済)。/sc ハブの leadParagraph 称号を pin。
  it("sc の leadParagraph は正式名称（情報処理安全確保支援士・登録セキスペ）を使う", () => {
    const sc = EXAM_DEEP_CONTENT.sc.leadParagraph;
    expect(sc).toContain("情報処理安全確保支援士（登録セキスペ、英語名 RISS）");
    expect(sc).not.toContain("登録情報セキュリティスペシャリスト");
  });
});
