import { describe, it, expect, beforeEach } from "vitest";
import {
  comboLevel,
  readMotivationSettings,
  writeMotivationSettings,
} from "@/lib/motivation/combo";

// combo.ts は連続正解コンボの演出レベル（none/small/big）と、サウンド/モーション低減の
// ユーザー設定を司る。閾値や既定値が崩れると演出の発火タイミングや初期設定が静かにずれる。
// 崩れたら落ちる契約として現挙動を回帰固定する（source 無変更）。

beforeEach(() => {
  window.localStorage.clear();
});

describe("comboLevel", () => {
  it("3未満は none", () => {
    expect(comboLevel(0)).toBe("none");
    expect(comboLevel(1)).toBe("none");
    expect(comboLevel(2)).toBe("none");
  });

  it("3以上5未満は small（境界 3 を含む）", () => {
    expect(comboLevel(3)).toBe("small");
    expect(comboLevel(4)).toBe("small");
  });

  it("5以上は big（境界 5 を含む）", () => {
    expect(comboLevel(5)).toBe("big");
    expect(comboLevel(12)).toBe("big");
  });

  it("負値も none に倒れる", () => {
    expect(comboLevel(-1)).toBe("none");
  });
});

describe("readMotivationSettings / writeMotivationSettings", () => {
  it("未設定では既定（sound 有効・motion 低減なし）を返す", () => {
    expect(readMotivationSettings()).toEqual({
      soundEnabled: true,
      reduceMotion: false,
    });
  });

  it("書き込んだ設定をそのまま読み戻す", () => {
    writeMotivationSettings({ soundEnabled: false, reduceMotion: true });
    expect(readMotivationSettings()).toEqual({
      soundEnabled: false,
      reduceMotion: true,
    });
  });

  it("部分的に欠けた保存値は欠落フィールドのみ既定で補完する", () => {
    window.localStorage.setItem(
      "ipa-quiz:motivation:v1",
      JSON.stringify({ soundEnabled: false }),
    );
    expect(readMotivationSettings()).toEqual({
      soundEnabled: false,
      reduceMotion: false,
    });
  });

  it("壊れた JSON は既定にフォールバックする", () => {
    window.localStorage.setItem("ipa-quiz:motivation:v1", "{not json");
    expect(readMotivationSettings()).toEqual({
      soundEnabled: true,
      reduceMotion: false,
    });
  });

  it("既定の返却はミューテーション分離されている（共有参照を返さない）", () => {
    const a = readMotivationSettings();
    a.soundEnabled = false;
    expect(readMotivationSettings().soundEnabled).toBe(true);
  });
});
