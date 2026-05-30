import { describe, it, expect } from "vitest";

import { examLabel, seasonLabel, formatYearSeason } from "@/lib/utils";

/**
 * 表示ヘルパーの文字列契約を固定する回帰テスト。
 * examLabel / seasonLabel / formatYearSeason は問題カード・年度別/分野別一覧など
 * ほぼ全画面の見出し描画に使われる純関数だが、これまで直接のユニットテストが無く、
 * 表示文字列の意図しない変化（区分名の崩れ・元号換算ミス・未知シーズンの欠落）を
 * 検知できなかった。崩れたらここが落ちる。
 */
describe("examLabel", () => {
  it("既知の区分 ID を日本語名へ変換する", () => {
    expect(examLabel("ap")).toBe("応用情報技術者");
    expect(examLabel("ip")).toBe("ITパスポート");
    expect(examLabel("sc")).toBe("情報処理安全確保支援士");
  });

  it("未知の区分 ID は大文字化してフォールバックする", () => {
    expect(examLabel("xyz")).toBe("XYZ");
  });
});

describe("seasonLabel", () => {
  it("spring / autumn を日本語へ変換する", () => {
    expect(seasonLabel("spring")).toBe("春期");
    expect(seasonLabel("autumn")).toBe("秋期");
  });

  it("cbt は CBT 表記を保つ", () => {
    expect(seasonLabel("cbt")).toBe("CBT");
  });

  it("未知のシーズンは入力をそのまま返す", () => {
    expect(seasonLabel("winter")).toBe("winter");
  });
});

describe("formatYearSeason", () => {
  it("令和元年(2019)以降は元号表記で整形する", () => {
    expect(formatYearSeason(2019, "spring")).toBe("令和1年度 春期");
    expect(formatYearSeason(2023, "autumn")).toBe("令和5年度 秋期");
  });

  it("2018 以前は西暦年度表記へフォールバックする", () => {
    expect(formatYearSeason(2018, "spring")).toBe("2018年度 春期");
    expect(formatYearSeason(2017, "autumn")).toBe("2017年度 秋期");
  });

  it("CBT シーズンも年度表記と組み合わせる", () => {
    expect(formatYearSeason(2024, "cbt")).toBe("令和6年度 CBT");
  });
});
