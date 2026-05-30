import { describe, it, expect } from "vitest";
import {
  CHARACTERS,
  CHARACTER_ORDER,
  DEFAULT_CHARACTER_ID,
  isCharacterId,
  getCharacter,
  type CharacterId,
} from "@/lib/ai/characters";

/**
 * ai/characters.ts は AI 学習バディのキャラクター定義 SSOT。
 * getCharacter は「有効 id はそのキャラ、null/undefined/不正は DEFAULT(haru) へフォールバック」
 * という門番契約に依存する（storage/character の検証層の土台）。
 * 崩れると AI ペルソナ選択が誤動作し、systemPrompt が想定と異なる人格で配信される。
 */
describe("isCharacterId", () => {
  it("3 つの正規 id を受理する", () => {
    for (const id of ["momo", "haru", "zan"] as const) {
      expect(isCharacterId(id)).toBe(true);
    }
  });

  it("未知の値・型違いを拒否する", () => {
    for (const v of ["", "HARU", "haru ", "tom", null, undefined, 123, {}, []]) {
      expect(isCharacterId(v)).toBe(false);
    }
  });
});

describe("getCharacter", () => {
  it("有効 id はそのキャラクター定義を返す", () => {
    expect(getCharacter("zan").id).toBe("zan");
    expect(getCharacter("momo").id).toBe("momo");
  });

  it("null / undefined は DEFAULT(haru) へフォールバック", () => {
    expect(getCharacter(null).id).toBe(DEFAULT_CHARACTER_ID);
    expect(getCharacter(undefined).id).toBe(DEFAULT_CHARACTER_ID);
    expect(DEFAULT_CHARACTER_ID).toBe("haru");
  });

  it("不正な id も DEFAULT へフォールバック", () => {
    expect(getCharacter("bogus" as CharacterId).id).toBe(DEFAULT_CHARACTER_ID);
  });
});

describe("データ不変条件", () => {
  it("CHARACTER_ORDER は CHARACTERS の全キーと一致する（集合として）", () => {
    expect([...CHARACTER_ORDER].sort()).toEqual(Object.keys(CHARACTERS).sort());
  });

  it("各定義の id フィールドはマップのキーと一致する", () => {
    for (const key of Object.keys(CHARACTERS) as CharacterId[]) {
      expect(CHARACTERS[key].id).toBe(key);
    }
  });

  it("DEFAULT_CHARACTER_ID は正規 id である", () => {
    expect(isCharacterId(DEFAULT_CHARACTER_ID)).toBe(true);
  });

  it("全キャラクターが必須テキスト（name / systemPrompt）を保持する", () => {
    for (const key of Object.keys(CHARACTERS) as CharacterId[]) {
      const c = CHARACTERS[key];
      expect(c.name.length).toBeGreaterThan(0);
      expect(c.systemPrompt.length).toBeGreaterThan(0);
    }
  });
});
