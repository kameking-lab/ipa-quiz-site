import { describe, it, expect } from "vitest";
import {
  MOCK_EXAM_CONFIGS,
  getMockConfig,
} from "@/lib/mock-exam/config";
import type { ExamCode } from "@/lib/questions/types";

// config.ts は各試験区分の模試設定（出題数・制限時間・合格閾値）の単一情報源。
// getMockConfig は該当区分の設定を返し、未知区分は ap にフォールバックする。
// これらの値はそのまま模試 UI（問題数・タイマー・合否表示）を駆動するため、
// 値のドリフト（例: ap の 80問/150分が変わる、exam フィールドがキーとズレる、
// passThreshold が範囲外になる）が静かに UX を壊す。崩れたら落ちる契約として
// 現挙動とデータ不変条件を回帰固定する（source 無変更・監査で実害バグ無し）。

const EXAM_CODES = Object.keys(MOCK_EXAM_CONFIGS) as ExamCode[];

describe("getMockConfig — フォールバックと参照", () => {
  it("既知区分はその区分の設定を返す", () => {
    expect(getMockConfig("ip")).toBe(MOCK_EXAM_CONFIGS.ip);
    expect(getMockConfig("ap")).toBe(MOCK_EXAM_CONFIGS.ap);
  });

  it("未知区分は ap 設定にフォールバックする", () => {
    expect(getMockConfig("zzz" as ExamCode)).toBe(MOCK_EXAM_CONFIGS.ap);
  });
});

describe("MOCK_EXAM_CONFIGS — データ不変条件", () => {
  it("全エントリで exam フィールドがキーと一致する（コピペズレ検出）", () => {
    for (const code of EXAM_CODES) {
      expect(MOCK_EXAM_CONFIGS[code].exam).toBe(code);
    }
  });

  it("全エントリで questions/minutes は正・passThreshold は (0,1]・label 非空", () => {
    for (const code of EXAM_CODES) {
      const c = MOCK_EXAM_CONFIGS[code];
      expect(c.questions).toBeGreaterThan(0);
      expect(c.minutes).toBeGreaterThan(0);
      expect(c.passThreshold).toBeGreaterThan(0);
      expect(c.passThreshold).toBeLessThanOrEqual(1);
      expect(c.label.length).toBeGreaterThan(0);
    }
  });

  it("基準値を pin: ap=80問/150分, ip=100問/120分, 合格閾値は全区分 0.6", () => {
    expect(MOCK_EXAM_CONFIGS.ap.questions).toBe(80);
    expect(MOCK_EXAM_CONFIGS.ap.minutes).toBe(150);
    expect(MOCK_EXAM_CONFIGS.ip.questions).toBe(100);
    expect(MOCK_EXAM_CONFIGS.ip.minutes).toBe(120);
    for (const code of EXAM_CODES) {
      expect(MOCK_EXAM_CONFIGS[code].passThreshold).toBe(0.6);
    }
  });
});
