import { describe, it, expect, beforeEach } from "vitest";
import {
  readApiKeys,
  generateApiKey,
  appendApiKey,
  deleteApiKey,
} from "@/lib/api-keys/storage";
import type { ApiKey } from "@/lib/api-keys/types";

/**
 * api-keys/storage.ts は /account/api-keys（APIキー管理）の LocalStorage 永続層。
 * 守る契約:
 *  - readApiKeys は破損・非配列・secret 欠落エントリを取り除く fail-soft バリデーション。
 *  - appendApiKey は「先頭挿入（新しい順）＋ MAX_KEYS=5 で最古退避」。
 *  - deleteApiKey は id 一致のみ除去。
 *  - generateApiKey は name の trim/60字切詰め/空→"Untitled key"・prefix/secret/id 形式。
 * 崩れると、ユーザーのキー一覧の並び順・上限・残存が壊れる。
 */
const KEY = "ipa-quiz:api-keys:v1";

function makeKey(id: string, overrides: Partial<ApiKey> = {}): ApiKey {
  return {
    id,
    name: `key-${id}`,
    prefix: "kk_live_dead",
    secret: `kk_live_dead_${id}`,
    createdAt: "2024-01-01T00:00:00.000Z",
    ...overrides,
  };
}

beforeEach(() => {
  window.localStorage.clear();
});

describe("readApiKeys / fail-soft バリデーション", () => {
  it("未保存なら空配列", () => {
    expect(readApiKeys()).toEqual([]);
  });

  it("破損 JSON なら空配列", () => {
    window.localStorage.setItem(KEY, "{not json");
    expect(readApiKeys()).toEqual([]);
  });

  it("非配列ペイロードなら空配列", () => {
    window.localStorage.setItem(KEY, JSON.stringify({ id: "x" }));
    expect(readApiKeys()).toEqual([]);
  });

  it("secret が文字列でないエントリは除外する", () => {
    const valid = makeKey("a");
    const invalid = { id: "b", name: "bad" }; // secret 欠落
    window.localStorage.setItem(KEY, JSON.stringify([valid, invalid, null]));
    const got = readApiKeys();
    expect(got).toHaveLength(1);
    expect(got[0].id).toBe("a");
  });
});

describe("appendApiKey", () => {
  it("新しいキーを先頭に挿入する（新しい順）", () => {
    appendApiKey(makeKey("a"));
    const next = appendApiKey(makeKey("b"));
    expect(next.map((k) => k.id)).toEqual(["b", "a"]);
    expect(readApiKeys().map((k) => k.id)).toEqual(["b", "a"]);
  });

  it("MAX_KEYS=5 を超えると最古を退避する", () => {
    for (const id of ["1", "2", "3", "4", "5", "6"]) {
      appendApiKey(makeKey(id));
    }
    const ids = readApiKeys().map((k) => k.id);
    expect(ids).toHaveLength(5);
    // 先頭挿入なので最新の 6 が先頭、最古の 1 が退避される
    expect(ids).toEqual(["6", "5", "4", "3", "2"]);
    expect(ids).not.toContain("1");
  });
});

describe("deleteApiKey", () => {
  it("id 一致のキーのみ除去する", () => {
    appendApiKey(makeKey("a"));
    appendApiKey(makeKey("b"));
    const next = deleteApiKey("a");
    expect(next.map((k) => k.id)).toEqual(["b"]);
    expect(readApiKeys().map((k) => k.id)).toEqual(["b"]);
  });

  it("未知 id では何も削除しない", () => {
    appendApiKey(makeKey("a"));
    expect(deleteApiKey("zzz").map((k) => k.id)).toEqual(["a"]);
  });
});

describe("generateApiKey 形式契約", () => {
  it("id は kid_ プレフィックス・prefix は kk_live_・secret は prefix で始まる", () => {
    const key = generateApiKey("my key");
    expect(key.id).toMatch(/^kid_/);
    expect(key.prefix).toMatch(/^kk_live_[0-9a-f]{4}$/);
    expect(key.secret.startsWith(`${key.prefix}_`)).toBe(true);
    expect(key.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it("name を trim し 60 字に切り詰める", () => {
    const key = generateApiKey(`  ${"x".repeat(80)}  `);
    expect(key.name).toBe("x".repeat(60));
  });

  it("空・空白のみの name は 'Untitled key' になる", () => {
    expect(generateApiKey("   ").name).toBe("Untitled key");
    expect(generateApiKey("").name).toBe("Untitled key");
  });
});
