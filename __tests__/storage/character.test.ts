import { describe, it, expect, beforeEach } from "vitest";
import {
  readCharacterState,
  writeCharacterId,
  writeCharacterEnabled,
} from "@/lib/storage/character";

/**
 * character.ts は AI コパイロットのキャラクター設定（id + enabled）の永続化。
 * id と enabled は別キーに分離保存され、id は isCharacterId で検証して不正値は
 * 既定 "haru" に落とす。enabled は文字列 "true" のみ真、未設定（null）は既定 false。
 * 破損すると無効キャラ ID で copilot 描画が壊れる恐れがある。
 */
const ID_KEY = "ipa-quiz:character:v1";
const ENABLED_KEY = "ipa-quiz:character-enabled:v1";

beforeEach(() => {
  window.localStorage.clear();
});

describe("readCharacterState", () => {
  it("未保存なら既定（id=haru・enabled=false）", () => {
    expect(readCharacterState()).toEqual({ id: "haru", enabled: false });
  });

  it("有効な id はそのまま読む", () => {
    window.localStorage.setItem(ID_KEY, "momo");
    expect(readCharacterState().id).toBe("momo");
  });

  it("未知の id は既定 haru に落とす", () => {
    window.localStorage.setItem(ID_KEY, "unknown-character");
    expect(readCharacterState().id).toBe("haru");
  });

  it('enabled は文字列 "true" のときのみ真', () => {
    window.localStorage.setItem(ENABLED_KEY, "true");
    expect(readCharacterState().enabled).toBe(true);
  });

  it('"true" 以外の文字列（"1"/"false"）は false', () => {
    window.localStorage.setItem(ENABLED_KEY, "1");
    expect(readCharacterState().enabled).toBe(false);
    window.localStorage.setItem(ENABLED_KEY, "false");
    expect(readCharacterState().enabled).toBe(false);
  });
});

describe("writeCharacterId / writeCharacterEnabled → read 往復", () => {
  it("id と enabled は独立に保存・読み戻しできる", () => {
    writeCharacterId("zan");
    writeCharacterEnabled(true);
    expect(readCharacterState()).toEqual({ id: "zan", enabled: true });
  });

  it("enabled のみ切り替えても id は既定のまま保持", () => {
    writeCharacterEnabled(true);
    expect(readCharacterState()).toEqual({ id: "haru", enabled: true });
  });
});
