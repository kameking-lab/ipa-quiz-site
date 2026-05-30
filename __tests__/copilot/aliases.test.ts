import { describe, it, expect } from "vitest";
import { GLOSSARY_ALIASES, matchAliasGlossaryTerms } from "@/lib/copilot/aliases";

/**
 * matchAliasGlossaryTerms は RAG リトリーバルで glossary doc をピン留めする際の
 * 用語マッチ判定。和洋・略称・別名（ASCII/カナ）を含むクエリから、対応する
 * glossary term 名の集合を返す純関数。崩れると「RSA 暗号の鍵長」のような略称
 * クエリで公開鍵暗号 doc が取れなくなる（または誤ピン留め）。
 */
describe("matchAliasGlossaryTerms", () => {
  it("空クエリは空集合（早期 return）", () => {
    expect(matchAliasGlossaryTerms("").size).toBe(0);
  });

  it("どのエイリアスにも一致しなければ空集合", () => {
    expect(matchAliasGlossaryTerms("こんにちは世界").size).toBe(0);
  });

  it("ASCII 略称エイリアスで対応 term を返す（RSA → 公開鍵暗号）", () => {
    const m = matchAliasGlossaryTerms("RSA 暗号の鍵長は");
    expect(m.has("公開鍵暗号")).toBe(true);
  });

  it("エイリアス照合は大文字小文字を無視する（xss 小文字でも一致）", () => {
    const m = matchAliasGlossaryTerms("反射型 xss の対策");
    expect(m.has("XSS")).toBe(true);
  });

  it("日本語別名でも一致する（機械学習 → マシン学習）", () => {
    const m = matchAliasGlossaryTerms("機械学習の教師あり学習について");
    expect(m.has("マシン学習")).toBe(true);
  });

  it("複数 term を同時に拾う（RSA と クロスサイトスクリプティング を含むクエリ）", () => {
    // 照合対象はエイリアスのみ（term キー名そのものは見ない）。
    // bare "XSS" は term キーでありエイリアスに無いため、XSS の別名を使う。
    const m = matchAliasGlossaryTerms("RSA と クロスサイトスクリプティング の違い");
    expect(m.has("公開鍵暗号")).toBe(true);
    expect(m.has("XSS")).toBe(true);
  });

  it("同一 term の別名が複数一致しても term は 1 回だけ（重複なし）", () => {
    // OAuth 2.0 のエイリアスに "OIDC" と "JWT" の両方を含めても term は単一。
    const m = matchAliasGlossaryTerms("OIDC と JWT を使う OAuth2 フロー");
    const oauthCount = [...m].filter((t) => t === "OAuth 2.0").length;
    expect(oauthCount).toBe(1);
  });

  it("部分文字列一致（docstring 通りの substring 契約・語境界は見ない）", () => {
    // "IP"（TCP/IP の別名）は小文字化して "ip" として substring 照合される。
    // docstring が「完全部分文字列として含まれる」と明記する意図的な挙動を pin。
    const m = matchAliasGlossaryTerms("description");
    expect(m.has("TCP/IP")).toBe(true);
  });

  it("辞書のキーは全て glossary term・各値は非空のエイリアス配列", () => {
    for (const [term, aliases] of Object.entries(GLOSSARY_ALIASES)) {
      expect(term.length).toBeGreaterThan(0);
      expect(Array.isArray(aliases)).toBe(true);
      expect(aliases.length).toBeGreaterThan(0);
    }
  });
});
