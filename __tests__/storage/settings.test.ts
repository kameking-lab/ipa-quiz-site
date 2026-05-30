import { describe, it, expect, beforeEach } from "vitest";
import { readSettings, writeSettings, type AppSettings } from "@/lib/storage/settings";

/**
 * settings.ts はクイズ出題オプション（選択肢ランダム化・直近除外・計算問題のみ・
 * 履歴記録）の永続化 SSOT。readSettings は欠落フィールドを既定値で補完し、
 * `recordHistory` のみ既定 true（履歴記録はオプトアウト方式）という契約に依存する。
 * 破損すると出題プールの挙動や履歴記録の既定が静かに反転する。
 */
const KEY = "ipa-quiz:settings:v1";

beforeEach(() => {
  window.localStorage.clear();
});

describe("readSettings", () => {
  it("未保存なら既定値（recordHistory のみ true）", () => {
    expect(readSettings()).toEqual<AppSettings>({
      randomizeChoices: false,
      excludeRecent: false,
      calculationOnly: false,
      recordHistory: true,
    });
  });

  it("破損 JSON は既定値にフォールバック", () => {
    window.localStorage.setItem(KEY, "{broken");
    expect(readSettings().recordHistory).toBe(true);
  });

  it("部分保存は欠落フィールドのみ既定で補完する", () => {
    window.localStorage.setItem(KEY, JSON.stringify({ randomizeChoices: true }));
    expect(readSettings()).toEqual<AppSettings>({
      randomizeChoices: true,
      excludeRecent: false,
      calculationOnly: false,
      recordHistory: true,
    });
  });

  it("recordHistory:false を明示保存すれば既定 true で上書きされない", () => {
    window.localStorage.setItem(KEY, JSON.stringify({ recordHistory: false }));
    expect(readSettings().recordHistory).toBe(false);
  });

  it("既定オブジェクトはコピー返却（呼び出し側変更が次回 read に漏れない）", () => {
    const a = readSettings();
    a.recordHistory = false;
    expect(readSettings().recordHistory).toBe(true);
  });
});

describe("writeSettings → readSettings 往復", () => {
  it("保存した全フィールドがそのまま読み戻せる", () => {
    const s: AppSettings = {
      randomizeChoices: true,
      excludeRecent: true,
      calculationOnly: true,
      recordHistory: false,
    };
    writeSettings(s);
    expect(readSettings()).toEqual(s);
  });
});
