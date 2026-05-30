import { describe, it, expect } from "vitest";
import { examLabelAt, getExamNameHistory } from "@/lib/exam-naming/history";
import { ALL_EXAM_CODES } from "@/lib/exam-config";
import { EXAM_LABELS } from "@/lib/utils";

// exam-naming/history.ts は、問題が出題された「当時」の試験正式名称を返す純関数。
// /q タイトル・パンくず・OGP・JSON-LD が全てこれを使う。名称改正の境界（年×期）や
// 期の順序（春<秋）が崩れると、史料性が損なわれた誤った試験名が全問題ページに出る。
// 崩れたら落ちる契約として現挙動を回帰固定する（source 無変更・監査で実害バグ無し）。

describe("examLabelAt — SC（3世代の改名）", () => {
  it("2006春〜2008秋は テクニカルエンジニア(情報セキュリティ)", () => {
    expect(examLabelAt("sc", 2006, "spring")).toBe("テクニカルエンジニア(情報セキュリティ)");
    expect(examLabelAt("sc", 2008, "autumn")).toBe("テクニカルエンジニア(情報セキュリティ)");
  });

  it("2009春の改名境界（含む）で 情報セキュリティスペシャリスト へ切替", () => {
    expect(examLabelAt("sc", 2009, "spring")).toBe("情報セキュリティスペシャリスト");
    expect(examLabelAt("sc", 2016, "autumn")).toBe("情報セキュリティスペシャリスト");
  });

  it("2017春の改名境界（含む）で 情報処理安全確保支援士 へ切替", () => {
    expect(examLabelAt("sc", 2017, "spring")).toBe("情報処理安全確保支援士");
    expect(examLabelAt("sc", 2024, "autumn")).toBe("情報処理安全確保支援士");
  });
});

describe("examLabelAt — 期の順序（春 < 秋）が改名境界を分ける", () => {
  it("NW は 2009秋 改名：同年春は旧名・同年秋は新名", () => {
    // 改名境界が autumn のため、同じ 2009 年でも春と秋で名称が変わる。
    expect(examLabelAt("nw", 2009, "spring")).toBe("テクニカルエンジニア(ネットワーク)");
    expect(examLabelAt("nw", 2009, "autumn")).toBe("ネットワークスペシャリスト");
  });

  it("AP は 2009春 改名：2008秋は旧名・2009春は新名", () => {
    expect(examLabelAt("ap", 2008, "autumn")).toBe("ソフトウェア開発技術者");
    expect(examLabelAt("ap", 2009, "spring")).toBe("応用情報技術者");
  });
});

describe("examLabelAt — フォールバック", () => {
  it("最古エントリより前の年は現行 EXAM_LABELS へフォールバック", () => {
    // ip の最古は 2009春。それ以前は履歴に無く現行名称へフォールバックする。
    expect(examLabelAt("ip", 2005, "spring")).toBe(EXAM_LABELS["ip"]);
  });

  it("単一エントリの試験は開始以降ずっと同じ名称", () => {
    expect(examLabelAt("ip", 2009, "spring")).toBe("ITパスポート");
    expect(examLabelAt("ip", 2030, "autumn")).toBe("ITパスポート");
  });
});

describe("getExamNameHistory", () => {
  it("古い順のエントリ配列を返す（SC は3世代）", () => {
    const h = getExamNameHistory("sc");
    expect(h.map((e) => e.label)).toEqual([
      "テクニカルエンジニア(情報セキュリティ)",
      "情報セキュリティスペシャリスト",
      "情報処理安全確保支援士",
    ]);
    // from は昇順（古い順）
    expect(h[0].from.year).toBeLessThan(h[2].from.year);
  });

  // EXAM_NAME_HISTORY は Record<ExamCode, ExamNameEntry[]> 型でキー網羅と各値の型は
  // 守れるが、examLabelAt の検索ループ（from 以降の「最後にマッチした」エントリを採用）が
  // 正しく機能する前提＝**各区分のエントリが from 昇順に並んでいること**は型で表現できない。
  // 既存テストは SC の昇順しか pin していなかったが、改名 2 世代以上を持つ
  // ap/st/sa/nw/db/es/sc/sm すべてが同じ前提に依存する。並び替え（typo / コピペ）で
  // 旧名と新名が入れ替わると、当時名称が全問題ページ（タイトル・パンくず・OGP・JSON-LD）で
  // 史実と食い違う。canonical ALL_EXAM_CODES 全 13 区分で昇順と非空ラベルを固定する。
  it("全区分のエントリが from 昇順（春<秋）かつラベル非空", () => {
    const rank = (e: { from: { year: number; season: "spring" | "autumn" } }) =>
      e.from.year * 2 + (e.from.season === "spring" ? 0 : 1);
    for (const exam of ALL_EXAM_CODES) {
      const h = getExamNameHistory(exam);
      expect(h.length).toBeGreaterThan(0);
      for (let i = 0; i < h.length; i++) {
        expect(h[i].label.length).toBeGreaterThan(0);
        if (i > 0) {
          // strictly ascending: 後のエントリほど新しい改名であること。
          expect(rank(h[i])).toBeGreaterThan(rank(h[i - 1]));
        }
      }
    }
  });
});
