import { describe, it, expect } from "vitest";
import {
  DEFAULT_LAST_UPDATED,
  getLastUpdatedISO,
  formatLastUpdatedJa,
} from "@/lib/questions/last-updated";

// 解説の最終更新日は /q ページの可視表示と JSON-LD(dateModified) の双方を駆動する。
// フォールバック判定とゼロ詰め除去の日本語整形が崩れると SEO の更新日表記が壊れる。
// 純関数の契約を回帰固定する（source 無変更）。

describe("getLastUpdatedISO", () => {
  it("個別 lastUpdated があればそれを返す", () => {
    expect(getLastUpdatedISO({ lastUpdated: "2025-01-02" })).toBe("2025-01-02");
  });

  it("未設定なら DEFAULT_LAST_UPDATED にフォールバックする", () => {
    expect(getLastUpdatedISO({ lastUpdated: undefined })).toBe(DEFAULT_LAST_UPDATED);
    expect(getLastUpdatedISO({})).toBe(DEFAULT_LAST_UPDATED);
  });
});

describe("formatLastUpdatedJa", () => {
  it("ISO 日付を和暦表記に変換し、月日の先頭ゼロを除去する", () => {
    expect(formatLastUpdatedJa("2026-05-05")).toBe("2026年5月5日");
    expect(formatLastUpdatedJa("2024-10-21")).toBe("2024年10月21日");
    expect(formatLastUpdatedJa("2024-01-09")).toBe("2024年1月9日");
  });

  it("YYYY-MM-DD 形式でない入力はそのまま返す", () => {
    expect(formatLastUpdatedJa("2026/05/05")).toBe("2026/05/05");
    expect(formatLastUpdatedJa("not-a-date")).toBe("not-a-date");
    expect(formatLastUpdatedJa("")).toBe("");
  });
});
